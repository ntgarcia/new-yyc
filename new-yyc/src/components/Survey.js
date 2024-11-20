import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuadrantMap from "./QuadrantMap";
import { getTranslation } from "../utils/translations";
import { ReactComponent as NewYYCLogo } from "../assets/newyyc-logo.svg";

function Survey({ preferences, onUpdate, onComplete }) {
  const navigate = useNavigate();

  const interests = [
    "🏊‍♂️ Swimming",
    "⛸️ Skating & Hockey",
    "💪 Fitness",
    "🎨 Arts & Crafts",
    "🧘‍♀️ Yoga & Wellness",
    "🏃‍♂️ Sports",
    "🥋 Martial Arts",
    "💃 Dance",
    "👨‍👧 Parent & Child",
    "🎓 Early Learning",
  ];

  const [errors, setErrors] = useState({});

  const validateQuadrant = () => {
    if (!preferences.quadrant) {
      setErrors({ quadrant: "Please select your quadrant" });
      return false;
    }
    return true;
  };

  const handleNext = (currentStep) => {
    if (currentStep === "quadrant" && !validateQuadrant()) return;

    if (currentStep === "interests") {
      onComplete(preferences);
      navigate("/results");
    } else {
      navigate(
        `/survey/${currentStep === "language" ? "quadrant" : "interests"}`
      );
    }
  };

  const handleBack = (currentStep) => {
    if (currentStep === "quadrant") {
      navigate("/");
    } else {
      navigate("/survey/quadrant");
    }
  };

  const handleSkip = () => {
    navigate("/survey/quadrant");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen bg-background">
      <div className="bg-card rounded-card p-4 mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <NewYYCLogo className="w-12 h-12" />
          <div className="inline-flex items-center px-2 py-0.5 border border-accent rounded-full bg-accent/10 text-text-accent uppercase text-xs font-medium">
            {window.location.pathname === "/survey/quadrant"
              ? "STEP 1 OF 2"
              : "STEP 2 OF 2"}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            className="py-2 px-4 border border-border rounded-card text-text-primary hover:bg-gray-50 transition-colors"
            onClick={() =>
              handleBack(
                window.location.pathname === "/survey/quadrant"
                  ? "quadrant"
                  : "interests"
              )
            }
          >
            Back
          </button>
          <button
            className={`py-2 px-4 rounded-card transition-all
              ${
                window.location.pathname === "/survey/quadrant"
                  ? preferences.quadrant
                    ? "bg-accent text-white hover:opacity-90"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-accent text-white hover:opacity-90"
              }`}
            onClick={() =>
              handleNext(
                window.location.pathname === "/survey/quadrant"
                  ? "quadrant"
                  : "interests"
              )
            }
            disabled={
              window.location.pathname === "/survey/quadrant" &&
              !preferences.quadrant
            }
          >
            {window.location.pathname === "/survey/interests"
              ? "Show Results"
              : "Next"}
          </button>
        </div>
      </div>

      {window.location.pathname === "/survey/quadrant" && (
        <div className="space-y-4">
          <div className="bg-card rounded-card p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-text-primary">
                {getTranslation(
                  "Which quadrant of Calgary do you live in?",
                  preferences.language
                )}
              </h2>
              <p className="text-text-secondary mt-2">
                Select your quadrant to help us find programs near you.
              </p>
            </div>

            <QuadrantMap
              selectedQuadrant={preferences.quadrant}
              onQuadrantSelect={(quadrant) => onUpdate({ quadrant })}
            />
            {errors.quadrant && (
              <p className="text-accent text-sm mt-2">{errors.quadrant}</p>
            )}
          </div>
        </div>
      )}

      {window.location.pathname === "/survey/interests" && (
        <div className="space-y-4">
          <div className="bg-card rounded-card p-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-text-primary">
                {getTranslation("What interests you?", preferences.language)}
              </h2>
              <p className="text-text-secondary mt-2">
                Select all activities that interest you.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {interests.map((interest) => (
                <label
                  key={interest}
                  className={`flex items-center p-4 border border-border rounded-lg cursor-pointer transition-colors group relative
                    ${
                      preferences.interests.includes(interest)
                        ? "bg-success/10 border-success"
                        : "hover:bg-background"
                    }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={preferences.interests.includes(interest)}
                    onChange={(e) => {
                      const newInterests = e.target.checked
                        ? [...preferences.interests, interest]
                        : preferences.interests.filter((i) => i !== interest);
                      onUpdate({ interests: newInterests });
                    }}
                  />
                  <span className="flex-1 text-text-primary">{interest}</span>
                  {preferences.interests.includes(interest) && (
                    <div className="flex items-center justify-center w-5 h-5 bg-success rounded-full">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Survey;

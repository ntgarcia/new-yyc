import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as NewYYCLogo } from "../assets/newyyc-logo.svg";
import { getTranslation } from "../utils/translations";

function LandingPage({ preferences = { language: "en" }, onUpdate }) {
  const navigate = useNavigate();
  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
  ];

  const currentLanguage = preferences?.language || "en";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg space-y-4">
        <div className="bg-card rounded-card p-6">
          <div className="flex justify-center mb-6">
            <NewYYCLogo className="w-24 h-24" />
          </div>

          <h1 className="text-3xl text-accent text-center font-bold mb-4">
            {getTranslation("Welcome to newYYC", currentLanguage)}
          </h1>

          <div className="mb-6 p-3 max-w-md mx-auto">
            <p className="text-base text-text-primary leading-relaxed mb-3 min-h-[48px]">
              {getTranslation(
                "Find programs & activities in your area that match your interests.",
                currentLanguage
              )}
            </p>
            <p className="text-base text-text-primary leading-relaxed min-h-[48px]">
              {getTranslation(
                "Take a quick survey to discover what Calgary has to offer!",
                currentLanguage
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`p-4 rounded-card transition-colors
                  ${
                    currentLanguage === lang.code
                      ? "bg-accent/10 border border-accent text-text-accent"
                      : "border border-border hover:bg-gray-50"
                  }`}
                onClick={() => onUpdate({ language: lang.code })}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <button
          className={`w-full py-4 px-8 rounded-card font-medium transition-opacity
            ${
              currentLanguage
                ? "bg-accent text-white hover:opacity-90"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          onClick={() => navigate("/survey/quadrant")}
          disabled={!currentLanguage}
        >
          {getTranslation("Start Survey", currentLanguage)}
        </button>
      </div>
    </div>
  );
}

export default LandingPage;

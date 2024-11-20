import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Survey from "./components/Survey";
import Results from "./components/Results";

function App() {
  const [userPreferences, setUserPreferences] = useState({
    language: "en",
    quadrant: "",
    interests: [],
  });

  const handleSurveyUpdate = (newPreferences) => {
    setUserPreferences((prevPreferences) => ({
      ...prevPreferences,
      ...newPreferences,
    }));
  };

  const handleSurveyComplete = (preferences) => {
    console.log("Survey completed with preferences:", preferences);
    setUserPreferences(preferences);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="App container mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                preferences={userPreferences}
                onUpdate={handleSurveyUpdate}
              />
            }
          />
          <Route
            path="/survey/:step"
            element={
              <Survey
                preferences={userPreferences}
                onUpdate={handleSurveyUpdate}
                onComplete={handleSurveyComplete}
              />
            }
          />
          <Route
            path="/results"
            element={<Results preferences={userPreferences} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getTranslation } from "../utils/translations";
import { ReactComponent as NewYYCLogo } from "../assets/newyyc-logo.svg";

const getFirstSentence = (text) => {
  if (!text) return "";
  const periodIndex = text.indexOf(".");
  return periodIndex !== -1 ? text.slice(0, periodIndex + 1) : text;
};

function Results({ preferences }) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(3);
  const [sortBy, setSortBy] = useState("relevance");
  const [ageFilter, setAgeFilter] = useState("all");
  const navigate = useNavigate();
  const language = preferences?.language || "en";

  const doesProgramMatchInterest = (program, interest) => {
    if (!program.brochure_section) return false;
    const section = program.brochure_section.toUpperCase();
    const name = (program.course_name || "").toUpperCase();
    const description = (
      program.course_type_web_description || ""
    ).toUpperCase();

    switch (interest) {
      case "🏊‍♂️ Swimming":
        return section.includes("SWIM") || section.includes("AQUA");
      case "⛸️ Skating & Hockey":
        return section.includes("SKAT") || section.includes("HOCKEY");
      case "💪 Fitness":
        return section.includes("FITNESS") || section.includes("EXERCISE");
      case "🎨 Arts & Crafts":
        return section.includes("ART") || section.includes("CERAMIC");
      case "🧘‍♀️ Yoga & Wellness":
        return section.includes("YOGA") || section.includes("WELLNESS");
      case "🏃‍♂️ Sports":
        return section.includes("SPORT") || section.includes("ATHLETIC");
      case "🥋 Martial Arts":
        return section.includes("MARTIAL") || name.includes("KARATE");
      case "💃 Dance":
        return section.includes("DANCE") || name.includes("DANCE");
      case "👨‍👧 Parent & Child":
        return name.includes("PARENT") || description.includes("PARENT");
      case "🎓 Early Learning":
        return section.includes("PRESCHOOL") || section.includes("EARLY");
      default:
        return false;
    }
  };

  useEffect(() => {
    console.log("Current preferences:", preferences);
  }, [preferences]);

  const quadrantFacilities = {
    NW: [
      "MOUNT PLEASANT",
      "SHOULDICE",
      "CHURCHILL",
      "THORNHILL",
      "BOWNESS",
      "CONFEDERATION",
    ],
    NE: ["VILLAGE SQUARE", "RENFREW", "GENESIS", "SADDLETOWNE"],
    SW: ["KILLARNEY", "GLENMORE", "SOUTHLAND", "CANYON MEADOWS", "WESTSIDE"],
    SE: ["ACADIA", "QUARRY PARK", "TRICO", "BOB BAHAN"],
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        console.log("Fetching programs...");
        const response = await axios.get(
          "https://data.calgary.ca/resource/q9hh-gfbx.json?$limit=1000"
        );
        console.log("API Response length:", response.data.length);
        console.log("First two programs:", response.data.slice(0, 2));
        setPrograms(response.data);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch programs");
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const getFilteredAndSortedPrograms = () => {
    console.log("Programs state:", programs.length);
    console.log("Preferences:", preferences);

    if (!programs || !preferences || !preferences.quadrant) {
      console.log("Missing required data:", {
        programs: !!programs,
        preferences: !!preferences,
        quadrant: preferences?.quadrant,
      });
      return [];
    }

    const today = new Date();
    console.log("Filtering programs for quadrant:", preferences.quadrant);

    // First filter the programs
    const filtered = programs.filter((program) => {
      if (!program) return false;

      // Check facility match
      const facilityMatches =
        program.venue_name &&
        quadrantFacilities[preferences.quadrant]?.some((facility) =>
          program.venue_name.toUpperCase().includes(facility)
        );

      // Check interests match
      const interestMatches = preferences.interests?.some((interest) => {
        if (!program.brochure_section) return false;

        const section = program.brochure_section.toUpperCase();
        const name = (program.course_name || "").toUpperCase();
        const description = (
          program.course_type_web_description || ""
        ).toUpperCase();

        switch (interest) {
          case "🏊‍♂️ Swimming":
            return section.includes("SWIM") || section.includes("AQUA");
          case "⛸️ Skating & Hockey":
            return section.includes("SKAT") || section.includes("HOCKEY");
          case "💪 Fitness":
            return section.includes("FITNESS") || section.includes("EXERCISE");
          case "🎨 Arts & Crafts":
            return section.includes("ART") || section.includes("CERAMIC");
          case "🧘‍♀️ Yoga & Wellness":
            return section.includes("YOGA") || section.includes("WELLNESS");
          case "🏃‍♂️ Sports":
            return section.includes("SPORT") || section.includes("ATHLETIC");
          case "🥋 Martial Arts":
            return section.includes("MARTIAL") || name.includes("KARATE");
          case "💃 Dance":
            return section.includes("DANCE") || name.includes("DANCE");
          case "👨‍👧 Parent & Child":
            return name.includes("PARENT") || description.includes("PARENT");
          case "🎓 Early Learning":
            return section.includes("PRESCHOOL") || section.includes("EARLY");
          default:
            return false;
        }
      });

      const startDate = program.course_schedule_start_date
        ? new Date(program.course_schedule_start_date)
        : null;
      const isUpcoming = startDate ? startDate > today : false;

      return facilityMatches && interestMatches && isUpcoming;
    });

    console.log("Filtered count before deduplication:", filtered.length);

    // Create a Map to store unique programs
    const uniquePrograms = new Map();

    filtered.forEach((program) => {
      const key = `${program.course_name}-${program.venue_name}-${program.course_schedule_start_date}`;
      if (!uniquePrograms.has(key)) {
        uniquePrograms.set(key, program);
      }
    });

    const result = Array.from(uniquePrograms.values());
    const shuffled = result.sort((a, b) => {
      if (a.venue_name === b.venue_name) {
        return Math.random() - 0.5; // Randomize same venues
      }
      return (
        new Date(a.course_schedule_start_date || "") -
        new Date(b.course_schedule_start_date || "")
      );
    });

    // Ensure no consecutive same locations
    for (let i = 1; i < shuffled.length; i++) {
      if (shuffled[i].venue_name === shuffled[i - 1].venue_name) {
        // Find next different venue
        for (let j = i + 1; j < shuffled.length; j++) {
          if (shuffled[j].venue_name !== shuffled[i].venue_name) {
            // Swap positions
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            break;
          }
        }
      }
    }

    console.log("Final filtered and unique count:", shuffled.length);
    return shuffled;
  };

  const formatAgeRange = (min, max) => {
    if (!min && !max) return null;
    const roundedMin = Math.round(parseFloat(min));
    const roundedMax = Math.round(parseFloat(max));
    if (roundedMax >= 99) return `${roundedMin}+`;
    return `${roundedMin} - ${roundedMax} years`;
  };

  const getAgeCategory = (min) => {
    if (!min) return "all";
    if (min <= 12) return "kids";
    if (min <= 17) return "teens";
    return "adults";
  };

  const sortPrograms = (programs) => {
    let sorted = [...programs];

    switch (sortBy) {
      case "date":
        sorted.sort((a, b) => {
          const dateA = new Date(a.course_schedule_start_date || "");
          const dateB = new Date(b.course_schedule_start_date || "");
          return dateA - dateB;
        });
        break;
      case "price":
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.course_default_price) || 0;
          const priceB = parseFloat(b.course_default_price) || 0;
          return priceA - priceB;
        });
        break;
      case "relevance":
        // Group programs by interest category
        const programsByInterest = new Map();

        sorted.forEach((program) => {
          // Find which interest category this program matches
          const matchedInterest = preferences.interests.find((interest) => {
            const section = program.brochure_section?.toUpperCase() || "";
            const name = program.course_name?.toUpperCase() || "";
            const description =
              program.course_type_web_description?.toUpperCase() || "";

            switch (interest) {
              case "🏊‍♂️ Swimming":
                return section.includes("SWIM") || section.includes("AQUA");
              case "⛸️ Skating & Hockey":
                return section.includes("SKAT") || section.includes("HOCKEY");
              case "💪 Fitness":
                return (
                  section.includes("FITNESS") || section.includes("EXERCISE")
                );
              case "🎨 Arts & Crafts":
                return section.includes("ART") || section.includes("CERAMIC");
              case "🧘‍♀️ Yoga & Wellness":
                return section.includes("YOGA") || section.includes("WELLNESS");
              case "🏃‍♂️ Sports":
                return (
                  section.includes("SPORT") || section.includes("ATHLETIC")
                );
              case "🥋 Martial Arts":
                return section.includes("MARTIAL") || name.includes("KARATE");
              case "💃 Dance":
                return section.includes("DANCE") || name.includes("DANCE");
              case "👨‍👧 Parent & Child":
                return (
                  name.includes("PARENT") || description.includes("PARENT")
                );
              case "🎓 Early Learning":
                return (
                  section.includes("PRESCHOOL") || section.includes("EARLY")
                );
              default:
                return false;
            }
          });

          if (matchedInterest) {
            if (!programsByInterest.has(matchedInterest)) {
              programsByInterest.set(matchedInterest, []);
            }
            programsByInterest.get(matchedInterest).push(program);
          }
        });

        // Interleave programs from different categories
        sorted = [];
        let maxLength = Math.max(
          ...Array.from(programsByInterest.values()).map((arr) => arr.length)
        );

        for (let i = 0; i < maxLength; i++) {
          for (const [_, programs] of programsByInterest) {
            if (programs[i]) {
              sorted.push(programs[i]);
            }
          }
        }
        break;
      default:
        break;
    }

    // Apply age filter
    if (ageFilter !== "all") {
      sorted = sorted.filter((program) => {
        const category = getAgeCategory(program.course_min_age_allowed);
        return category === ageFilter;
      });
    }

    return sorted;
  };

  const filteredAndSortedPrograms = sortPrograms(
    getFilteredAndSortedPrograms()
  );
  const displayedPrograms = filteredAndSortedPrograms.slice(0, displayCount);
  const hasMorePrograms = displayCount < filteredAndSortedPrograms.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 3);
  };

  const handleBack = () => {
    navigate("/survey/interests");
  };

  const handleRestart = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="max-w-lg mx-auto p-4 bg-white min-h-screen">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">
            {getTranslation("Loading programs...", language)}
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto p-4 bg-white min-h-screen">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">
            {getTranslation("Error", language)}
          </h2>
          <p>{getTranslation(error, language)}</p>
        </div>
      </div>
    );
  }

  if (filteredAndSortedPrograms.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4 min-h-screen bg-background">
        <div className="space-y-8 pt-8">
          <div className="bg-card rounded-card p-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-text-primary">
                {getTranslation("No Programs Found", language)}
                <span className="text-text-secondary text-xl ml-2">
                  ({preferences.quadrant})
                </span>
              </h2>

              <div className="mt-6 space-y-4">
                <p className="text-text-primary font-medium">
                  {getTranslation(
                    "No upcoming programs match your interests",
                    language
                  )}
                </p>
                <p className="text-text-secondary">
                  {getTranslation(
                    "Try selecting different interests",
                    language
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {preferences.interests.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-text-accent text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 max-w-sm mx-auto">
          <button
            onClick={handleBack}
            className="w-full py-4 px-6 border border-border rounded-card text-text-primary hover:bg-gray-50 transition-colors"
          >
            {getTranslation("Back", language)}
          </button>
          <button
            onClick={handleRestart}
            className="w-full py-4 px-6 bg-accent text-white rounded-card hover:opacity-90 transition-opacity"
          >
            {getTranslation("Restart Quiz", language)}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen bg-background">
      <div className="bg-card rounded-card p-4 mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <NewYYCLogo className="w-12 h-12" />
          <div className="inline-flex items-center px-2 py-0.5 border border-accent rounded-full bg-accent/10 text-text-accent uppercase text-xs font-medium">
            RESULTS
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleBack}
            className=" py-2 px-4 border border-border rounded-card text-text-primary hover:bg-gray-50 transition-colors"
          >
            {getTranslation("Back", language)}
          </button>
          <button
            onClick={handleRestart}
            className="py-2 px-4 bg-accent text-white rounded-card hover:opacity-90 transition-opacity"
          >
            {getTranslation("Restart Quiz", language)}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-card rounded-card p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-text-primary mb-3">
              {getTranslation("Available Programs in", language)}{" "}
              {preferences.quadrant}
              <span className="text-text-secondary ml-2">
                ({filteredAndSortedPrograms.length})
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-2 w-full">
              <select
                className="w-full p-2 border border-border rounded-card text-text-primary hover:border-accent focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors bg-background"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevance">
                  {getTranslation("Sort by Relevance", language)}
                </option>
                <option value="date">
                  {getTranslation("Sort by Date", language)}
                </option>
                <option value="price">
                  {getTranslation("Sort by Price", language)}
                </option>
              </select>
              <select
                className="w-full p-2 border border-border rounded-card text-text-primary hover:border-accent focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors bg-background"
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
              >
                <option value="all">
                  {getTranslation("All Ages", language)}
                </option>
                <option value="kids">
                  {getTranslation("Kids (0-12)", language)}
                </option>
                <option value="teens">
                  {getTranslation("Teens (13-17)", language)}
                </option>
                <option value="adults">
                  {getTranslation("Adults (18+)", language)}
                </option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {displayedPrograms.map((program, index) => (
              <div
                key={index}
                className="bg-background rounded-card border border-border p-4 hover:border-accent transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-text-primary">
                          {program.course_name || "Program Name Not Available"}
                        </h3>
                        <div className="flex items-center">
                          {preferences.interests.map((interest) => {
                            const matches = doesProgramMatchInterest(
                              program,
                              interest
                            );
                            if (matches) {
                              return (
                                <span key={interest} className="text-lg">
                                  {interest.split(" ")[0]}
                                </span>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                      <p className="text-text-secondary text-sm">
                        {program.venue_name || "Venue Not Specified"}
                      </p>
                    </div>
                    {program.course_default_price && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-success/10 text-success text-lg font-medium">
                        ${program.course_default_price}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4 text-sm">
                    {program.course_min_age_allowed && (
                      <div className="inline-flex items-center p-2 bg-gray-50 border border-gray-100 rounded-card">
                        <span className="text-text-secondary">Age:</span>
                        <span className="text-text-primary ml-3">
                          {formatAgeRange(
                            program.course_min_age_allowed,
                            program.course_max_age_allowed
                          )}
                        </span>
                      </div>
                    )}
                    {program.course_schedule_start_date && (
                      <div className="inline-flex items-center p-2 bg-gray-50 border border-gray-100 rounded-card">
                        <span className="text-text-secondary">Start:</span>
                        <span className="text-text-primary ml-3">
                          {new Date(
                            program.course_schedule_start_date
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-text-secondary">
                    {program.course_type_web_description && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getFirstSentence(
                            program.course_type_web_description
                          ),
                        }}
                      />
                    )}
                  </div>

                  <div className="flex justify-end">
                    {program.course_web_url && (
                      <a
                        href={program.course_web_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <button className="py-2 px-4 bg-accent text-white rounded-card hover:opacity-90 transition-opacity text-sm">
                          Register Now
                        </button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMorePrograms && (
            <button
              onClick={handleLoadMore}
              className="w-full py-3 px-6 bg-accent/10 text-text-accent border border-accent rounded-card hover:opacity-90 transition-opacity mt-4"
            >
              Load More Programs
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Results;

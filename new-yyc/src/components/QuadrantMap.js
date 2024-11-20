import React from "react";
import { ReactComponent as NEFill } from "../assets/map/fill/NE-fill.svg";
import { ReactComponent as NWFill } from "../assets/map/fill/NW-fill.svg";
import { ReactComponent as SEFill } from "../assets/map/fill/SE-fill.svg";
import { ReactComponent as SWFill } from "../assets/map/fill/SW-fill.svg";
import { ReactComponent as NEOutline } from "../assets/map/outline/NE-outline.svg";
import { ReactComponent as NWOutline } from "../assets/map/outline/NW-outline.svg";
import { ReactComponent as SEOutline } from "../assets/map/outline/SE-outline.svg";
import { ReactComponent as SWOutline } from "../assets/map/outline/SW-outline.svg";

function QuadrantMap({ selectedQuadrant, onQuadrantSelect }) {
  const quadrantStyle = (isSelected) => ({
    cursor: "pointer",
    fill: isSelected ? "#C8102E" : "transparent",
    stroke: isSelected ? "none" : "#D9D9D9",
    strokeWidth: "3",
  });

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <svg viewBox="0 0 450 420" className="w-full">
        {/* NW Quadrant */}
        <g
          className="transition-colors duration-200 hover:opacity-90"
          onClick={() => onQuadrantSelect("NW")}
          transform="translate(70, 13) scale(0.5)"
        >
          {selectedQuadrant === "NW" ? (
            <NWFill style={quadrantStyle(true)} />
          ) : (
            <NWOutline style={quadrantStyle(false)} />
          )}
          <text
            x="175"
            y="230"
            className="text-4xl font-bold select-none pointer-events-none"
            fill={selectedQuadrant === "NW" ? "white" : "black"}
          >
            NW
          </text>
        </g>

        {/* NE Quadrant */}
        <g
          className="cursor-pointer transition-opacity hover:opacity-90"
          onClick={() => onQuadrantSelect("NE")}
          transform="translate(216, 13) scale(0.5)"
        >
          {selectedQuadrant === "NE" ? (
            <NEFill style={quadrantStyle(true)} />
          ) : (
            <NEOutline style={quadrantStyle(false)} />
          )}
          <text
            x="78"
            y="220"
            className="text-4xl font-bold select-none pointer-events-none"
            fill={selectedQuadrant === "NE" ? "white" : "black"}
          >
            NE
          </text>
        </g>

        {/* SW Quadrant */}
        <g
          className="cursor-pointer transition-opacity hover:opacity-90"
          onClick={() => onQuadrantSelect("SW")}
          transform="translate(58, 138) scale(0.5)"
        >
          {selectedQuadrant === "SW" ? (
            <SWFill style={quadrantStyle(true)} />
          ) : (
            <SWOutline style={quadrantStyle(false)} />
          )}
          <text
            x="130"
            y="160"
            className="text-4xl font-bold select-none pointer-events-none"
            fill={selectedQuadrant === "SW" ? "white" : "black"}
          >
            SW
          </text>
        </g>

        {/* SE Quadrant */}
        <g
          className="cursor-pointer transition-opacity hover:opacity-90"
          onClick={() => onQuadrantSelect("SE")}
          transform="translate(192, 206) scale(0.5)"
        >
          {selectedQuadrant === "SE" ? (
            <SEFill style={quadrantStyle(true)} />
          ) : (
            <SEOutline style={quadrantStyle(false)} />
          )}
          <text
            x="160"
            y="180"
            className="text-4xl font-bold select-none pointer-events-none"
            fill={selectedQuadrant === "SE" ? "white" : "black"}
          >
            SE
          </text>
        </g>
      </svg>
    </div>
  );
}

export default QuadrantMap;

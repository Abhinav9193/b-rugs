import React from "react";
import "./HeritageIndicator.css";

export default function HeritageIndicator({
  current,
  total,
  progress,
  onSelect,
}) {
  return (
    <div className="heritage-indicator">
      <span className="heritage-indicator__count">
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(total).padStart(2, "0")}
      </span>
      <div className="heritage-indicator__bars">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            className={`heritage-indicator__bar-btn ${index === current ? "is-active" : ""} ${index < current ? "is-passed" : ""}`}
            onClick={() => onSelect(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="heritage-indicator__bar-bg">
              {index === current && (
                <div
                  className="heritage-indicator__bar-fill"
                  style={{ width: `${progress}%` }}
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

import React from "react";
import "./SustainabilityStep.css";

export default function SustainabilityStep({ item }) {
  return (
    <div className="sustainability-step">
      {/* 1. Image */}
      <div className="sustainability-step__img-col">
        <div className="sustainability-step__img-wrapper">
          <img
            src={item.image}
            alt={item.title}
            className="sustainability-step__img"
            loading="lazy"
          />
        </div>
      </div>

      {/* 2. Number + Diamond Motif */}
      <div className="sustainability-step__num-col">
        <span className="sustainability-step__num">{item.step}</span>
        <div className="sustainability-step__motif">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              transform="rotate(45 12 12)"
              stroke="currentColor"
              fill="none"
            />
            <rect
              x="7"
              y="7"
              width="10"
              height="10"
              transform="rotate(45 12 12)"
              stroke="currentColor"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* 3. Vertical Separator Bar */}
      <div className="sustainability-step__vbar" />

      {/* 4. Title with Bronze Underline */}
      <div className="sustainability-step__title-col">
        <h3 className="sustainability-step__title">{item.title}</h3>
        <div className="sustainability-step__line" />
      </div>

      {/* 5. Editorial Description */}
      <div className="sustainability-step__desc-col">
        <p className="sustainability-step__desc">{item.description}</p>
      </div>
    </div>
  );
}

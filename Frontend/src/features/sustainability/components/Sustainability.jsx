import React from "react";
import {
  sustainabilitySteps,
  SUSTAINABILITY_PAGE_COPY,
} from "../data/sustainabilitySteps";
import SustainabilityStep from "./SustainabilityStep";
import "./Sustainability.css";

export default function Sustainability() {
  return (
    <section id="sustainability" className="sustainability-section">
      <div className="container">
        {/* Section Top Header */}
        <div className="sustainability-header">
          <div className="sustainability-header__left">
            <span className="section-label">
              {SUSTAINABILITY_PAGE_COPY.eyebrow}
            </span>
            <div className="sustainability-header__line" />
          </div>
        </div>

        {/* 5 Full-Width Step Rows */}
        <div className="sustainability-list">
          {sustainabilitySteps.map((step) => (
            <SustainabilityStep key={step.step} item={step} />
          ))}
        </div>
      </div>

      {/* Floating Right-Side Vertical Badge */}
      <div className="sustainability-floating-badge" aria-hidden="true">
        <span className="sust-v-text">
          {SUSTAINABILITY_PAGE_COPY.verticalMotif.line1}
        </span>
        <div className="sust-v-line" />
        <div className="sust-diamond-icon">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
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
        <div className="sust-v-line" />
        <span className="sust-v-text">
          {SUSTAINABILITY_PAGE_COPY.verticalMotif.line2}
        </span>
      </div>
    </section>
  );
}

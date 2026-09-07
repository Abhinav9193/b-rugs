import React from 'react';
import './ProcessVideoCard.css';

export default function ProcessVideoCard({ item, isActive, onClick }) {
  return (
    <button
      className={`process-card ${isActive ? 'is-active' : ''}`}
      onClick={onClick}
      aria-label={`Select process step ${item.step}: ${item.title}`}
    >
      <div className="process-card__thumb-wrap">
        <img
          src={item.poster}
          alt={item.title}
          className="process-card__img"
        />
        <div className="process-card__thumb-overlay">
          <div className="process-card__play-icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="process-card__info">
        <span className="process-card__num">{item.step}</span>
        <span className="process-card__title">{item.title}</span>
      </div>

      <div className="process-card__active-line" />
    </button>
  );
}

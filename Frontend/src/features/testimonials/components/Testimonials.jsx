import React, { useState } from 'react';
import { partnersData, PARTNERS_PAGE_COPY } from '../data/testimonialsData';
import './Testimonials.css';

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);

  const infinitePartners = [...partnersData, ...partnersData, ...partnersData];

  return (
    <section 
      id="testimonials" 
      className="testimonials-section"
      aria-label="Our Partners"
    >
      <div className="testimonials-glow-orb testimonials-glow-orb--left" aria-hidden="true" />
      <div className="testimonials-glow-orb testimonials-glow-orb--right" aria-hidden="true" />

      <div className="container">
        <div className="testimonials-header">
          <div className="testimonials-header__left">
            <span className="section-label">{PARTNERS_PAGE_COPY.eyebrow}</span>
            <div className="testimonials-header__line" />
          </div>

          <div className="testimonials-header__status">
            <span className="testimonials-live-dot" />
            <span className="testimonials-live-text">{PARTNERS_PAGE_COPY.badge}</span>
          </div>
        </div>

        <div className="partners-title-block">
          <h2 className="partners-title">{PARTNERS_PAGE_COPY.title}</h2>
          <p className="partners-subtitle">{PARTNERS_PAGE_COPY.subtitle}</p>
        </div>
      </div>

      <div 
        className="testimonials-marquee-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="testimonials-edge-fade testimonials-edge-fade--left" aria-hidden="true" />
        <div className="testimonials-edge-fade testimonials-edge-fade--right" aria-hidden="true" />

        <div className={`testimonials-marquee-track ${isPaused ? 'is-paused' : ''}`}>
          {infinitePartners.map((partner, idx) => (
            <div 
              key={`${partner.id}-${idx}`}
              className="partner-card"
            >
              <div className="partner-card__accent-bar" aria-hidden="true" />

              <div className="partner-card__logo-area">
                <span className={`partner-card__brand-name ${partner.fontClass}`}>
                  {partner.name}
                </span>
              </div>

              <div className="partner-card__divider" />

              <span className="partner-card__category">
                {partner.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonials-floating-badge" aria-hidden="true">
        <span className="test-v-text">{PARTNERS_PAGE_COPY.verticalMotif.line1}</span>
        <div className="test-v-line" />
        <div className="test-diamond-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="3" y="3" width="18" height="18" transform="rotate(45 12 12)" stroke="currentColor" fill="none" />
            <rect x="7" y="7" width="10" height="10" transform="rotate(45 12 12)" stroke="currentColor" fill="none" />
          </svg>
        </div>
        <div className="test-v-line" />
        <span className="test-v-text">{PARTNERS_PAGE_COPY.verticalMotif.line2}</span>
      </div>
    </section>
  );
}

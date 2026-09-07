import React, { useState, useEffect, useRef, useCallback } from 'react';
import { heritageVideos, HERITAGE_PAGE_COPY } from '../data/heritageVideos';
import HeritageVideo from './HeritageVideo';
import HeritageIndicator from './HeritageIndicator';
import { scrollToSection } from '../../../lib/utils';
import './HeritageHero.css';

const SLIDE_DURATION = 7000;

export default function HeritageHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const heroRef = useRef(null);
  const startTimeRef = useRef(0);
  const animationFrameRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heritageVideos.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const selectSlide = useCallback((index) => {
    setCurrentIndex(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  // When video reports progress, update directly. Fallback interval only for non-video slides.
  const handleVideoProgress = useCallback((prog) => {
    setProgress(prog);
  }, []);

  const handleVideoEnded = useCallback(() => {
    nextSlide();
  }, [nextSlide]);

  useEffect(() => {
    const currentItem = heritageVideos[currentIndex];
    // If the slide has no video file, use fallback animation frame
    if (!currentItem.video && isPlaying) {
      startTimeRef.current = Date.now();
      const tick = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const currentProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          nextSlide();
        } else {
          animationFrameRef.current = requestAnimationFrame(tick);
        }
      };
      animationFrameRef.current = requestAnimationFrame(tick);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }
  }, [currentIndex, isPlaying, nextSlide]);

  return (
    <section 
      id="heritage" 
      ref={heroRef} 
      className="heritage-hero"
    >
      <div className="heritage-hero__split">
        {/* Left: Manufacturing Video / Media Area */}
        <div className="heritage-hero__media-col">
          <HeritageVideo
            currentItem={heritageVideos[currentIndex]}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onProgressUpdate={handleVideoProgress}
            onVideoEnded={handleVideoEnded}
          />
          
          {/* Progress Indicator docked inside bottom-left of hero */}
          <div className="heritage-hero__indicator-dock">
            <HeritageIndicator
              current={currentIndex}
              total={heritageVideos.length}
              progress={progress}
              onSelect={selectSlide}
            />
          </div>
        </div>

        {/* Right: Editorial Typography & Content */}
        <div className="heritage-hero__content-col">
          <div className="heritage-hero__content-inner">
            {/* Eyebrow Label */}
            <div className="heritage-hero__label-wrap">
              <span className="section-label">{HERITAGE_PAGE_COPY.eyebrow}</span>
              <div className="heritage-hero__label-line" />
            </div>

            {/* Headline (Cormorant Garamond 64–76px / 400) */}
            <div className="heritage-hero__heading-group">
              <h1 className="heritage-hero__heading">
                {HERITAGE_PAGE_COPY.headline.line1}<br />
                {HERITAGE_PAGE_COPY.headline.line2}<br />
                <span className="heritage-hero__heading-italic">
                  {HERITAGE_PAGE_COPY.headline.line3Italic}
                </span>
              </h1>
              
              {/* Body (Montserrat 16–17px / 400) */}
              <p className="heritage-hero__desc">
                {HERITAGE_PAGE_COPY.body}
              </p>
            </div>

            {/* Watch CTA */}
            <div className="heritage-hero__actions">
              <button 
                className="heritage-hero__cta-btn"
                onClick={() => scrollToSection('manufacturing')}
              >
                <span className="heritage-hero__cta-play-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </span>
                <span className="heritage-hero__cta-text">{HERITAGE_PAGE_COPY.cta}</span>
                <span className="heritage-hero__cta-arrow">→</span>
              </button>
            </div>
          </div>

          {/* Vertical Tradition / In Motion treatment on far right edge */}
          <div className="heritage-hero__vertical-badge" aria-hidden="true">
            <span className="heritage-hero__v-text">{HERITAGE_PAGE_COPY.verticalMotif.line1}</span>
            <div className="heritage-hero__v-line" />
            <div className="heritage-hero__diamond-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" transform="rotate(45 12 12)" stroke="currentColor" fill="none" />
                <rect x="7" y="7" width="10" height="10" transform="rotate(45 12 12)" stroke="currentColor" fill="none" />
              </svg>
            </div>
            <div className="heritage-hero__v-line" />
            <span className="heritage-hero__v-text">{HERITAGE_PAGE_COPY.verticalMotif.line2}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

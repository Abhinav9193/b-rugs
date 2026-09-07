import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { processVideos, MANUFACTURING_PAGE_COPY } from '../data/processVideos';
import ProcessVideoCarousel from './ProcessVideoCarousel';
import ProcessVideoModal from './ProcessVideoModal';
import './ManufacturingProcess.css';

const STEP_DURATION = 6500;

export default function ManufacturingProcess() {
  const [activeIndex, setActiveIndex] = useState(0); // Start at Step 01 sequence
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [modalItem, setModalItem] = useState(null);

  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const startTimeRef = useRef(0);
  const animationFrameRef = useRef(null);

  const prevIndex = (activeIndex > 0 ? activeIndex - 1 : processVideos.length - 1);
  const nextIndex = (activeIndex + 1) % processVideos.length;

  const prevStep = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : processVideos.length - 1));
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const nextStep = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % processVideos.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  // When user clicks on bottom thumbnail card, open popup modal with that step's video
  const handleSelectIndex = useCallback((index) => {
    const selectedItem = processVideos[index];
    setModalItem(selectedItem);
    // Also sync the active step in background
    setActiveIndex(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  // Timer loop - advances sequentially one step after another in 1-5 sequence
  useEffect(() => {
    if (!isPlaying) return;

    startTimeRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentProgress = Math.min((elapsed / STEP_DURATION) * 100, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        nextStep();
      } else {
        animationFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [activeIndex, isPlaying, nextStep]);

  // Video play/pause effect
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, activeIndex]);

  const activeItem = processVideos[activeIndex];
  const prevItem = processVideos[prevIndex];
  const nextItem = processVideos[nextIndex];

  return (
    <section 
      id="manufacturing" 
      ref={sectionRef} 
      className="mfg-section"
    >
      <div className="container">
        {/* Header Block */}
        <div className="mfg-header">
          <div className="mfg-header__left">
            <span className="section-label">{MANUFACTURING_PAGE_COPY.eyebrow}</span>
            <div className="mfg-header__label-line" />
            <h2 className="mfg-header__title">{MANUFACTURING_PAGE_COPY.headline}</h2>
            <p className="mfg-header__subtitle">
              {MANUFACTURING_PAGE_COPY.intro}
            </p>
          </div>
        </div>

        {/* Main 4-Column Player Area (Left Peek | Step Info | Large Center Video | Right Peek) */}
        <div className="mfg-player-area">
          {/* 1. Left Peek Thumbnail with Circular Arrow Button */}
          <div className="mfg-player__left-peek" onClick={prevStep}>
            <img src={prevItem.poster} alt={prevItem.title} />
            <button
              className="mfg-peek-arrow"
              onClick={(e) => {
                e.stopPropagation();
                prevStep();
              }}
              aria-label="Previous step"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* 2. Step Info */}
          <div className="mfg-player__step-info-col">
            <div className="mfg-player__step-num">
              <span className="mfg-player__num-active">{activeItem.step}</span>
              <span className="mfg-player__num-divider">/</span>
              <span className="mfg-player__num-total">05</span>
            </div>
            <div className="mfg-player__step-line" />
            <h3 className="mfg-player__step-name">{activeItem.title}</h3>
            <p className="mfg-player__step-desc">{activeItem.description}</p>
          </div>

          {/* 3. Center Active Video Box */}
          <div className="mfg-player__center-video">
            <div className="mfg-video-box">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  className="mfg-video-wrapper"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {activeItem.video ? (
                    <video
                      ref={videoRef}
                      src={activeItem.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controlsList="nodownload noplaybackrate"
                      disablePictureInPicture
                      onContextMenu={(e) => e.preventDefault()}
                      className="mfg-video-element"
                    />
                  ) : (
                    <img
                      src={activeItem.poster}
                      alt={activeItem.title}
                      className="mfg-video-element"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Central Play/Pause button (reveals on hover or when paused) */}
              <button
                className={`mfg-center-play-btn ${!isPlaying ? 'is-paused' : ''}`}
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                <div className="mfg-center-play-circle">
                  {isPlaying ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}>
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* 4. Right Peek Thumbnail with Circular Arrow Button */}
          <div className="mfg-player__right-peek" onClick={nextStep}>
            <img src={nextItem.poster} alt={nextItem.title} />
            <button
              className="mfg-peek-arrow"
              onClick={(e) => {
                e.stopPropagation();
                nextStep();
              }}
              aria-label="Next step"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Central Segment Progress Bar & Pause Button below center video */}
        <div className="mfg-center-progress-wrap">
          <div className="mfg-video-bar__segments">
            {processVideos.map((_, idx) => (
              <div key={idx} className="mfg-bar-segment">
                <div
                  className="mfg-bar-segment-fill"
                  style={{
                    width: idx === activeIndex ? `${progress}%` : idx < activeIndex ? '100%' : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          <button
            className="mfg-pause-toggle-btn"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <span className="mfg-pause-icon-circle">
              {isPlaying ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </span>
            <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>
        </div>

        {/* Bottom 5 Thumbnails Strip - clicking opens video popup modal in big view */}
        <div className="mfg-thumbnails-wrapper">
          <ProcessVideoCarousel
            items={processVideos}
            activeIndex={activeIndex}
            onSelectIndex={handleSelectIndex}
          />
        </div>
      </div>

      {/* Video Popup Modal with blurred background */}
      {modalItem && (
        <ProcessVideoModal
          item={modalItem}
          onClose={() => setModalItem(null)}
        />
      )}

      {/* Floating Right-Side Vertical Badge */}
      <div className="mfg-floating-badge" aria-hidden="true">
        <span className="mfg-v-text">{MANUFACTURING_PAGE_COPY.verticalMotif.line1}</span>
        <div className="mfg-v-line" />
        <div className="mfg-diamond-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="3" y="3" width="18" height="18" transform="rotate(45 12 12)" stroke="currentColor" fill="none" />
            <rect x="7" y="7" width="10" height="10" transform="rotate(45 12 12)" stroke="currentColor" fill="none" />
          </svg>
        </div>
        <div className="mfg-v-line" />
        <span className="mfg-v-text">{MANUFACTURING_PAGE_COPY.verticalMotif.line2}</span>
      </div>
    </section>
  );
}

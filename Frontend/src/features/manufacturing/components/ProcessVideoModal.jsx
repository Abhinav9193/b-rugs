import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './ProcessVideoModal.css';

export default function ProcessVideoModal({ item, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef(null);

  // Keyboard navigation: Escape to close, Space to toggle play/pause
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock scroll when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Sync play/pause with video element
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, item]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 0;
      setCurrentTime(current);
      setDuration(total);
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current && duration > 0) {
      const newTime = clickPos * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(clickPos * 100);
    }
  };

  const stageRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlay = (e) => {
    e?.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  const toggleFullscreen = (e) => {
    e?.stopPropagation();
    const elem = stageRef.current;
    if (!elem) return;

    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {});
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!(document.fullscreenElement || document.webkitFullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!item) return null;

  return (
    <AnimatePresence>
      <div 
        className="process-modal-backdrop"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="process-modal-title"
      >
        <motion.div
          className="process-modal-dialog"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="process-modal-header">
            <div className="process-modal-step-tag">
              <span className="process-modal-step-badge">{item.step}</span>
              <div className="process-modal-step-divider" />
              <span id="process-modal-title" className="process-modal-step-title">
                {item.title}
              </span>
            </div>

            <button
              className="process-modal-close-btn"
              onClick={onClose}
              aria-label="Close process video modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Video Stage with Interactive Hover Controls */}
          <div 
            ref={stageRef}
            className={`process-modal-video-stage ${!isPlaying ? 'is-paused' : ''} ${isFullscreen ? 'is-fullscreen' : ''}`}
            onClick={togglePlay}
          >
            {item.video ? (
              <video
                ref={videoRef}
                src={item.video}
                autoPlay
                playsInline
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                className="process-modal-video-el"
              />
            ) : (
              <img
                src={item.poster}
                alt={item.title}
                className="process-modal-video-el"
              />
            )}

            {/* Hover Center Play/Pause button */}
            <button
              className={`process-modal-center-btn ${!isPlaying ? 'is-paused' : ''}`}
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              <div className="process-modal-center-circle">
                {isPlaying ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}>
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </div>
            </button>

            {/* Bottom Controls Bar on Hover */}
            {item.video && (
              <div className="process-modal-controls" onClick={(e) => e.stopPropagation()}>
                {/* Scrubbable Timeline */}
                <div className="process-modal-timeline-wrap" onClick={handleSeek}>
                  <div className="process-modal-timeline-bg">
                    <div 
                      className="process-modal-timeline-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="process-modal-controls-row">
                  <div className="process-modal-controls-left">
                    <button 
                      className="process-modal-btn" 
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      )}
                    </button>

                    <span className="process-modal-time">
                      {formatTime(currentTime)} / {formatTime(duration || 30)}
                    </span>
                  </div>

                  <div className="process-modal-controls-right">
                    <button 
                      className="process-modal-btn" 
                      onClick={toggleFullscreen}
                      aria-label="Fullscreen"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 3 21 3 21 9" />
                        <polyline points="9 21 3 21 3 15" />
                        <line x1="21" y1="3" x2="14" y2="10" />
                        <line x1="3" y1="21" x2="10" y2="14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer with stage description */}
          <div className="process-modal-footer">
            <p className="process-modal-desc">{item.description}</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

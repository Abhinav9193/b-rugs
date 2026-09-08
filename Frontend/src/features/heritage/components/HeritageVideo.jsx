import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./HeritageVideo.css";

export default function HeritageVideo({
  currentItem,
  isPlaying,
  onTogglePlay,
  onProgressUpdate,
  onVideoEnded,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentItem]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const prog =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      if (onProgressUpdate) onProgressUpdate(prog);
    }
  };

  return (
    <div className="heritage-video-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          className="heritage-video-wrapper"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          {currentItem.video ? (
            <video
              ref={videoRef}
              src={currentItem.video}
              autoPlay
              muted
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={onVideoEnded}
              className="heritage-video-element"
            />
          ) : (
            <img
              src={currentItem.poster}
              alt={currentItem.title}
              className="heritage-video-element"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="heritage-video-overlay" />

      {/* Play/Pause Button Overlay (reveals on hover or when paused) */}
      <button
        className={`heritage-video-play-btn ${!isPlaying ? "is-paused" : ""}`}
        onClick={onTogglePlay}
        aria-label={
          isPlaying ? "Pause manufacturing video" : "Play manufacturing video"
        }
      >
        <div className="heritage-video-play-circle">
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ marginLeft: "3px" }}
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </div>
      </button>

      {/* Bottom left editorial tagline */}
      {currentItem.tagline && (
        <div className="heritage-video-tagline">
          <div className="heritage-video-tagline-bar" />
          <p className="heritage-video-tagline-text">
            {currentItem.tagline.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}

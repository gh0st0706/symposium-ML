import { useEffect, useRef } from "react";
import heroVideo from "../assets/techlynx-reel.mp4";

const INTRO_DURATION_MS = 2000;

function IntroLoader({ phase }) {
  const videoRef = useRef(null);
  const stopTimerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const startPlayback = () => {
      try {
        video.currentTime = 0;
      } catch {
        // ignore seek errors for not-yet-loaded video
      }

      video.muted = true;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    const onPlay = () => {
      if (stopTimerRef.current) {
        clearTimeout(stopTimerRef.current);
      }
      stopTimerRef.current = window.setTimeout(() => {
        video.pause();
      }, INTRO_DURATION_MS);
    };

    const onVisibility = () => {
      if (!document.hidden) startPlayback();
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("loadeddata", startPlayback);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("pointerdown", startPlayback, { once: true });
    document.addEventListener("touchstart", startPlayback, { once: true });

    startPlayback();

    return () => {
      if (stopTimerRef.current) {
        clearTimeout(stopTimerRef.current);
      }
      video.removeEventListener("play", onPlay);
      video.removeEventListener("loadeddata", startPlayback);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("pointerdown", startPlayback);
      document.removeEventListener("touchstart", startPlayback);
    };
  }, []);

  return (
    <div className={`intro-loader ${phase === "exit" ? "is-exiting" : ""}`} aria-hidden="true">
      <video
        ref={videoRef}
        className="intro-loader__video"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="intro-loader__overlay" />
      <div className="intro-loader__label">TechLynx 2026</div>
    </div>
  );
}

export default IntroLoader;

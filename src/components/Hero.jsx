import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroVideo from "../assets/techlynx-reel.mp4";
import CountdownTimer from "./CountdownTimer";

const particleConfig = [
  { top: "12%", left: "10%", delay: 0.1 },
  { top: "24%", left: "72%", delay: 0.35 },
  { top: "66%", left: "15%", delay: 0.6 },
  { top: "74%", left: "78%", delay: 0.9 },
  { top: "48%", left: "58%", delay: 1.15 },
  { top: "38%", left: "30%", delay: 1.4 }
];

function Hero() {
  const videoRef = useRef(null);
  const introPlayedRef = useRef(false);
  const introTimeoutRef = useRef(null);
  const [blendOut, setBlendOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const introDuration = 2;
    const blendOutDuration = 0.7;

    const startIntro = () => {
      if (introPlayedRef.current) return;
      introPlayedRef.current = true;
      setBlendOut(false);

      try {
        video.currentTime = 0;
      } catch {
        // ignore seek errors for not-yet-loaded video
      }

      const onTimeUpdate = () => {
        if (video.currentTime >= introDuration - blendOutDuration) {
          setBlendOut(true);
        }
        if (video.currentTime >= introDuration) {
          video.pause();
          video.removeEventListener("timeupdate", onTimeUpdate);
        }
      };

      video.addEventListener("timeupdate", onTimeUpdate);

      if (introTimeoutRef.current) {
        clearTimeout(introTimeoutRef.current);
      }
      introTimeoutRef.current = window.setTimeout(() => {
        setBlendOut(true);
        video.pause();
        video.removeEventListener("timeupdate", onTimeUpdate);
      }, (introDuration + 0.2) * 1000);
    };

    const tryPlayIntro = () => {
      if (introPlayedRef.current) return;
      video.muted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(startIntro).catch(() => {
          introPlayedRef.current = false;
        });
      } else {
        startIntro();
      }
    };

    const onVisibility = () => {
      if (!document.hidden) tryPlayIntro();
    };

    tryPlayIntro();

    video.addEventListener("loadeddata", tryPlayIntro);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("pointerdown", tryPlayIntro, { once: true });
    document.addEventListener("touchstart", tryPlayIntro, { once: true });

    return () => {
      if (introTimeoutRef.current) {
        clearTimeout(introTimeoutRef.current);
      }
      video.removeEventListener("loadeddata", tryPlayIntro);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("pointerdown", tryPlayIntro);
      document.removeEventListener("touchstart", tryPlayIntro);
    };
  }, []);

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          className="h-full w-full object-cover saturate-90 transition-opacity duration-1000 ease-out"
          style={{ opacity: blendOut ? 0.06 : 0.22 }}
          autoPlay
          muted
          loop={false}
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/75" />
        <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-ink/80 via-ink/45 to-transparent" />
        <div className="absolute inset-0 bg-ink/18" />
      </div>
      <div className="absolute inset-0 z-10 bg-hero-grid bg-[size:48px_48px] opacity-10" />
      {particleConfig.map((particle) => (
        <motion.span
          key={`${particle.top}-${particle.left}`}
          className="absolute z-20 h-2 w-2 rounded-full bg-cyan-300/70 shadow-[0_0_20px_rgba(34,211,238,0.9)]"
          style={{ top: particle.top, left: particle.left }}
          animate={{ y: [0, -22, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 5.2, repeat: Infinity, delay: particle.delay }}
        />
      ))}

      <div className="section-wrap relative z-20 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="absolute -inset-6 -z-10 rounded-[28px] bg-ink/55 blur-[1px]" />
          <div className="mb-4 flex flex-wrap gap-2">
            <p className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1 text-xs uppercase tracking-[0.22em] text-cyan-200">
              CSI College of Engineering | AI &amp; ML Department
            </p>
            <p className="inline-flex rounded-full border border-violet-300/40 bg-violet-300/10 px-4 py-1 text-xs uppercase tracking-[0.22em] text-violet-200">
              Presented by Skynetics Students Association
            </p>
          </div>
          <h1 className="font-display text-4xl font-semibold leading-tight text-white md:text-6xl xl:text-7xl">
            TechLynx 2026
            <span className="mt-2 block bg-premium-gradient bg-clip-text text-transparent">National AI/ML Technical Symposium</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
            A national-level symposium by the Department of AI &amp; ML at CSI College of Engineering, presented for high-caliber
            builders, researchers, and creators. Expect rigorous challenges, applied research showcases, and industry-grade
            problem statements.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/register" className="gradient-btn">Register Now</Link>
            <p className="rounded-full border border-violet-300/30 px-4 py-2 text-sm text-violet-200">Date: April 1-2, 2026</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass-panel rounded-3xl border-white/10 bg-white/4 p-5 shadow-[0_12px_30px_rgba(2,8,23,0.45)]"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Symposium Countdown</p>
          <CountdownTimer targetDate="2026-04-01T09:00:00+05:30" />
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Venue</p>
              <p className="mt-2">Department of AIML</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Department</p>
              <p className="mt-2">AI &amp; ML Department</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;

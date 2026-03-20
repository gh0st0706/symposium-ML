import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroVideo from "../assets/techlynx-reel.mp4";

const particleConfig = [
  { top: "12%", left: "10%", delay: 0.1 },
  { top: "24%", left: "72%", delay: 0.35 },
  { top: "66%", left: "15%", delay: 0.6 },
  { top: "74%", left: "78%", delay: 0.9 },
  { top: "48%", left: "58%", delay: 1.15 },
  { top: "38%", left: "30%", delay: 1.4 }
];

const heroPanels = [
  {
    title: "Event Categories",
    items: ["Technical Events", "Non-Technical Events", "Pre-Events"]
  },
  {
    title: "Event Window",
    items: ["April 1-2, 2026", "CSI College of Engineering", "On-campus symposium experience"]
  },
  {
    title: "Symposium Highlights",
    items: ["Competitive rounds", "Creative showcases", "On-ground challenges"]
  }
];

function Hero() {
  const videoRef = useRef(null);
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 800], [0, 120]);
  const contentY = useTransform(scrollY, [0, 800], [0, -18]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlayLoop = () => {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {});
      }
    };

    const onVisibility = () => {
      if (!document.hidden) tryPlayLoop();
    };

    tryPlayLoop();

    video.addEventListener("loadeddata", tryPlayLoop);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("pointerdown", tryPlayLoop, { once: true });
    document.addEventListener("touchstart", tryPlayLoop, { once: true });

    return () => {
      video.removeEventListener("loadeddata", tryPlayLoop);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("pointerdown", tryPlayLoop);
      document.removeEventListener("touchstart", tryPlayLoop);
    };
  }, []);

  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-16 sm:pt-28">
      <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ y: videoY }}>
        <video
          ref={videoRef}
          className="hero-video h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/90" />
        <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-ink/90 via-ink/60 to-transparent" />
        <div className="absolute inset-0 bg-ink/20" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink/95 via-ink/70 to-transparent" />
      </motion.div>
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

      <motion.div
        className="section-wrap relative z-20 grid items-center gap-12 text-center lg:grid-cols-[1.1fr_0.9fr] lg:text-left"
        style={{ y: contentY }}
      >
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
            <span className="mt-2 block bg-premium-gradient bg-clip-text text-transparent">National Level Techno-Cultural Symposium</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
            A national-level symposium by the Department of AI &amp; ML at CSI College of Engineering, presented for high-caliber
            builders, researchers, and creators. Expect rigorous challenges, applied research showcases, and industry-grade
            problem statements.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link to="/register" className="gradient-btn">Register Now</Link>
            <Link to={{ pathname: "/", hash: "#events" }} className="ghost-btn">View Events</Link>
          </div>
          <p className="mt-5 text-sm uppercase tracking-[0.26em] text-slate-300">
            April 1-2, 2026 - CSI College of Engineering
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
        >
          {heroPanels.map((panel) => (
            <article key={panel.title} className="hero-glass p-5 text-left">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">{panel.title}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {panel.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;

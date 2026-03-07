import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 -z-10 bg-hero-grid bg-[size:48px_48px] opacity-15" />
      {particleConfig.map((particle) => (
        <motion.span
          key={`${particle.top}-${particle.left}`}
          className="absolute h-2 w-2 rounded-full bg-cyan-300/70 shadow-[0_0_20px_rgba(34,211,238,0.9)]"
          style={{ top: particle.top, left: particle.left }}
          animate={{ y: [0, -22, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 5.2, repeat: Infinity, delay: particle.delay }}
        />
      ))}

      <div className="section-wrap grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1 text-xs uppercase tracking-[0.22em] text-cyan-200">
            CSI College of Engineering
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-tight text-white md:text-6xl xl:text-7xl">
            CSE - Artificial Intelligence and Machine Learning
            <span className="mt-2 block bg-premium-gradient bg-clip-text text-transparent">Technical Symposium 2026</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
            A high-impact engineering showcase inspired by premier IIT festivals with curated competitions,
            technical workshops, and innovation-driven collaboration.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/register" className="gradient-btn">Register Now</Link>
            <p className="rounded-full border border-violet-300/30 px-4 py-2 text-sm text-violet-200">Date: 18 September 2026</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass-panel rounded-3xl p-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Symposium Countdown</p>
          <CountdownTimer targetDate="2026-09-18T09:00:00+05:30" />
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Venue</p>
              <p className="mt-2">CSI College of Engineering</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Department</p>
              <p className="mt-2">CSE - AI&ML</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;

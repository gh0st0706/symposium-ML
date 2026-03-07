import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function RegisterCTA() {
  return (
    <section className="section-wrap py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-cyan-300/30 bg-slate-900/70 p-8 md:p-12"
      >
        <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />
        <p className="relative text-xs uppercase tracking-[0.24em] text-cyan-300">Registration Open | TechLynx 2026</p>
        <h2 className="relative mt-4 font-display text-3xl font-bold text-white md:text-5xl">
          Choose your arena: Technical or Non-Technical.
        </h2>
        <p className="relative mt-4 max-w-2xl text-slate-300">
          Register now for competitive coding, research, AI workshops, and crowd-favorite non-technical challenges.
        </p>
        <div className="relative mt-8 flex flex-wrap items-center gap-4">
          <Link to="/register" className="gradient-btn">Proceed to Register</Link>
          <span className="rounded-full border border-rose-300/35 bg-rose-400/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-rose-200">
            Limited slots
          </span>
        </div>
      </motion.div>
    </section>
  );
}

export default RegisterCTA;

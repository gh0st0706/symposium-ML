import { motion } from "framer-motion";

function EventCard({ event }) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-lg"
    >
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/80 text-2xl">
        {event.icon}
      </div>
      <h3 className="font-display text-2xl font-semibold text-white">{event.title}</h3>
      <p className="mt-3 text-slate-300">{event.description}</p>
      <div className="mt-6 inline-flex rounded-full border border-violet-300/35 bg-violet-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200">
        Prize Pool: {event.prize}
      </div>
    </motion.article>
  );
}

export default EventCard;

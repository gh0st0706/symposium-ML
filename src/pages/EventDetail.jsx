import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { eventBySlug } from "../data/events";

const floatPositions = [
  { top: "8%", left: "8%" },
  { top: "12%", right: "12%" },
  { top: "28%", left: "62%" },
  { bottom: "18%", left: "18%" },
  { bottom: "14%", right: "16%" },
  { top: "56%", right: "18%" }
];

function FloatingElements({ items }) {
  if (!items?.length) return null;

  const [positions, setPositions] = useState(() =>
    items.map((_, index) => index % floatPositions.length)
  );

  useEffect(() => {
    setPositions(items.map((_, index) => index % floatPositions.length));
  }, [items]);

  const pickNewIndex = (current) => {
    if (floatPositions.length <= 1) return current;
    let next = current;
    while (next === current) {
      next = Math.floor(Math.random() * floatPositions.length);
    }
    return next;
  };

  const onShuffle = (index) => {
    setPositions((prev) => prev.map((value, i) => (i === index ? pickNewIndex(value) : value)));
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {items.map((item, index) => {
        const position = floatPositions[positions[index] ?? 0];
        const sharedProps = {
          key: `${item.type}-${item.label || item.src}-${index}`,
          style: position,
          animate: { y: [0, -12, 0], x: [0, 8, -6], rotate: [0, 4, -4], opacity: [0.45, 0.9, 0.45] },
          transition: { duration: 12 + index * 1.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 },
          className: "absolute pointer-events-auto cursor-pointer"
        };

        if (item.type === "image") {
          return (
            <motion.img
              {...sharedProps}
              src={item.src}
              alt=""
              className="absolute h-20 w-20 rounded-2xl object-cover opacity-85 shadow-[0_0_28px_rgba(34,211,238,0.35)]"
              onClick={() => onShuffle(index)}
              whileTap={{ scale: 0.96 }}
            />
          );
        }

        return (
          <motion.div
            {...sharedProps}
            className="absolute rounded-full border border-cyan-300/40 bg-cyan-300/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200"
            onClick={() => onShuffle(index)}
            whileTap={{ scale: 0.96 }}
          >
            {item.label}
          </motion.div>
        );
      })}
    </div>
  );
}

function EventDetail() {
  const { slug } = useParams();
  const event = eventBySlug[slug];

  if (!event) {
    return (
      <section className="section-wrap min-h-[80vh] pt-32 pb-20">
        <div className="rounded-2xl border border-rose-300/30 bg-rose-400/10 p-8 text-rose-100">
          <h1 className="font-display text-3xl font-bold">Event not found</h1>
          <p className="mt-3">This event page does not exist.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full border border-white/25 px-5 py-2 text-sm text-white">Back to Home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-wrap min-h-[86vh] pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-950/70 p-8 md:p-10"
      >
        <FloatingElements items={event.floaters} />

        <p className="relative inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 px-4 py-1 text-xs uppercase tracking-[0.22em] text-cyan-200">
          {event.category}
        </p>
        <h1 className="relative mt-4 font-display text-4xl font-bold text-white md:text-5xl">{event.title}</h1>
        <p className="relative mt-4 max-w-3xl text-slate-300">{event.description}</p>

        <div className="relative mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/15 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Mode</p>
            <p className="mt-2 text-lg font-semibold text-white">{event.mode}</p>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Venue</p>
            <p className="mt-2 text-lg font-semibold text-white">{event.venue}</p>
          </div>
        </div>

        <div className="relative mt-10 flex flex-wrap gap-4">
          <Link to="/register" state={{ fromRegisterButton: true }} className="gradient-btn">
            Register for {event.title}
          </Link>
          <Link to="/#events" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 hover:border-cyan-300/60 hover:text-cyan-200">
            Back to Events
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default EventDetail;

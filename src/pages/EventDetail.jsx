import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { eventBySlug } from "../data/events";

const floatPositions = [
  { top: "8%", left: "8%" },
  { top: "12%", right: "12%" },
  { bottom: "18%", left: "18%" },
  { bottom: "14%", right: "16%" }
];

function FloatingElements({ items }) {
  if (!items?.length) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((item, index) => {
        const position = floatPositions[index % floatPositions.length];
        const sharedProps = {
          key: `${item.type}-${item.label || item.src}-${index}`,
          style: position,
          animate: { y: [0, -20, 0], opacity: [0.4, 0.95, 0.4] },
          transition: { duration: 6 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 },
          className: "absolute"
        };

        if (item.type === "image") {
          return (
            <motion.img
              {...sharedProps}
              src={item.src}
              alt=""
              className="absolute h-16 w-16 rounded-2xl object-cover opacity-80 shadow-[0_0_24px_rgba(34,211,238,0.35)]"
            />
          );
        }

        return (
          <motion.div
            {...sharedProps}
            className="absolute rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200"
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

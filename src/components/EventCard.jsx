import { motion } from "framer-motion";

function EventCard({ event }) {
  const floatPositions = [
    { top: "12%", left: "10%" },
    { top: "18%", right: "12%" },
    { bottom: "18%", left: "22%" }
  ];

  const iconContent = event.image ? (
    <img src={event.image} alt={`${event.title} icon`} className="h-10 w-10 object-contain" />
  ) : (
    <span className="font-display text-lg font-semibold text-white">{event.icon}</span>
  );

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-lg"
    >
      {event.floaters?.length ? (
        <div className="pointer-events-none absolute inset-0 z-0">
          {event.floaters
            .filter((item) => item?.type === "image" && item?.src)
            .map((item, index) => {
            const position = floatPositions[index % floatPositions.length];
            return (
              <motion.img
                key={`${event.title}-float-${index}`}
                src={item.src}
                alt=""
                className="absolute h-12 w-12 rounded-xl object-cover opacity-70 shadow-[0_0_18px_rgba(34,211,238,0.35)]"
                style={position}
                animate={{ y: [0, -14, 0], x: [0, 6, -4], rotate: [0, 6, -6] }}
                transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
              />
            );
          })}
        </div>
      ) : null}
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/80 text-2xl">
          {iconContent}
        </div>
        <h3 className="font-display text-2xl font-semibold text-white">{event.title}</h3>
        <p className="mt-3 text-slate-300">{event.description}</p>
        <div className="mt-6 inline-flex rounded-full border border-violet-300/35 bg-violet-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200">
          Prize Pool: {event.prize}
        </div>
      </div>
    </motion.article>
  );
}

export default EventCard;

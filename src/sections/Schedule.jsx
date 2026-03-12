import { motion } from "framer-motion";

const schedule = [
  { time: "09:00 AM", title: "Inauguration | TechLynx Opening", note: "Welcome address by AI & ML Department" },
  { time: "10:00 AM", title: "Technical Arena Opens", note: "IdeathonX + Prompting challenges begin" },
  { time: "12:30 PM", title: "Non-Technical Arena Opens", note: "eSports brackets and Talent Show rounds" },
  { time: "02:30 PM", title: "Pre-Event Highlights", note: "Short Film, Meme Making, Reels Making showcases" },
  { time: "04:00 PM", title: "Demo and Showcase Session", note: "Team pitches, prototype walk-throughs" },
  { time: "05:30 PM", title: "Valediction and Awards", note: "Prize distribution and closing ceremony" }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

function Schedule() {
  return (
    <section id="schedule" className="section-wrap py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
      >
        <h2 className="section-title">Event Timeline</h2>
        <p className="section-subtitle">
          A tightly orchestrated two-day flow designed for technical depth, showcase energy, and audience engagement.
        </p>
      </motion.div>

      <motion.div
        className="relative mt-12 space-y-5 border-l border-cyan-300/35 pl-7"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {schedule.map((item, index) => (
          <motion.article
            key={item.time}
            variants={itemVariants}
            className="glass-panel rounded-2xl p-5"
          >
            <span className="absolute -left-[9px] mt-2 h-4 w-4 rounded-full border-2 border-cyan-300 bg-ink" />
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{item.time}</p>
            <h3 className="mt-2 font-display text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-300">{item.note}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

export default Schedule;

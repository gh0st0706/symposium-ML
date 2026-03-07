import { motion } from "framer-motion";

const schedule = [
  { time: "09:00 AM", title: "Inauguration & Keynote", note: "Opening by HOD, CSE-AI&ML" },
  { time: "10:00 AM", title: "Paper Presentation", note: "Parallel technical tracks begin" },
  { time: "12:00 PM", title: "AI Workshop", note: "Hands-on industry session" },
  { time: "02:00 PM", title: "Technical Quiz", note: "Team elimination rounds" },
  { time: "03:30 PM", title: "Hackathon Demo Sprint", note: "Rapid prototype showcase" },
  { time: "05:00 PM", title: "Valediction & Awards", note: "Prize distribution and closing" }
];

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
        <p className="section-subtitle">A professionally sequenced day designed for momentum, depth, and maximum participation.</p>
      </motion.div>

      <div className="relative mt-12 space-y-5 border-l border-cyan-300/35 pl-7">
        {schedule.map((item, index) => (
          <motion.article
            key={item.time}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="glass-panel rounded-2xl p-5"
          >
            <span className="absolute -left-[9px] mt-2 h-4 w-4 rounded-full border-2 border-cyan-300 bg-ink" />
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{item.time}</p>
            <h3 className="mt-2 font-display text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-300">{item.note}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Schedule;

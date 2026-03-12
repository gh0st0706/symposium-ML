import { motion } from "framer-motion";

const highlights = [
  {
    title: "Future-Focused Innovation",
    description: "Build practical ideas into deployable products through guided challenges and demos.",
    icon: "AI"
  },
  {
    title: "AI/ML Core",
    description: "Experience applied machine learning, software systems, and intelligent automation workflows.",
    icon: "ML"
  },
  {
    title: "Technical + Non-Technical Tracks",
    description: "Compete in coding and research events, then switch gears into strategy, design, and fun arenas.",
    icon: "NX"
  }
];

function About() {
  return (
    <section id="about" className="section-wrap py-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="grid gap-10 lg:grid-cols-[1fr_1.15fr]"
      >
        <div>
          <h2 className="section-title">About The Symposium</h2>
          <p className="section-subtitle">
            TechLynx is the national-level AI &amp; ML symposium at CSI College of Engineering, presented by the Skynetics
            Students Association. It blends research-grade challenges, product-level execution, and creative showcases with a
            focus on depth, originality, and measurable impact.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((item) => (
            <article key={item.title} className="glass-panel rounded-2xl p-5 sm:last:col-span-2">
              <p className="text-2xl">{item.icon}</p>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default About;

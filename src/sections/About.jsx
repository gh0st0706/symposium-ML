import { motion } from "framer-motion";

const highlights = [
  {
    title: "Innovation-Driven",
    description: "Projects and prototypes designed for real-world impact and scalable systems.",
    icon: "??"
  },
  {
    title: "AI-Centric",
    description: "Deep dives into applied ML, intelligent automation, and data-driven design.",
    icon: "??"
  },
  {
    title: "Engineering Excellence",
    description: "Structured challenges and mentorship inspired by premier IIT technical events.",
    icon: "??"
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
            The AI&ML technical symposium brings together aspiring engineers, researchers, and creators for a high-energy day
            of ideas, execution, and technical competition.
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

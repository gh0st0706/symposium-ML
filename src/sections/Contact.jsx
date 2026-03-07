import { motion } from "framer-motion";

const contacts = [
  { label: "Department", value: "CSE - Artificial Intelligence and Machine Learning" },
  { label: "Email", value: "aiml.symposium@csice.edu.in" },
  { label: "Coordinator", value: "+91 98765 43210" },
  { label: "Support", value: "+91 91234 56789" }
];

function Contact() {
  return (
    <section id="contact" className="section-wrap py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
      >
        <h2 className="section-title">Contact</h2>
        <p className="section-subtitle">Reach out to the organizing team for registrations, sponsorships, and event support.</p>
      </motion.div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {contacts.map((entry) => (
          <article key={entry.label} className="glass-panel rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{entry.label}</p>
            <p className="mt-2 text-lg font-medium text-slate-100">{entry.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Contact;

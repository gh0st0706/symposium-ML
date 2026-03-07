import { motion } from "framer-motion";
import EventCard from "../components/EventCard";

const events = [
  {
    title: "Hackathon",
    description: "Build impactful AI products in a 12-hour sprint with mentor checkpoints and final jury review.",
    icon: "??",
    prize: "INR 50,000"
  },
  {
    title: "Paper Presentation",
    description: "Present cutting-edge research and engineering concepts before domain experts and faculty panel.",
    icon: "??",
    prize: "INR 20,000"
  },
  {
    title: "AI Workshop",
    description: "Hands-on sessions on model deployment, prompt engineering, and practical ML pipelines.",
    icon: "??",
    prize: "Certification"
  },
  {
    title: "Technical Quiz",
    description: "A rapid-fire intelligence challenge covering AI trends, computing fundamentals, and innovation.",
    icon: "??",
    prize: "INR 10,000"
  }
];

function Events() {
  return (
    <section id="events" className="section-wrap py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
      >
        <h2 className="section-title">Flagship Events</h2>
        <p className="section-subtitle">Premium competitive tracks crafted for innovation, technical depth, and team execution.</p>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <EventCard key={event.title} event={event} />
        ))}
      </div>
    </section>
  );
}

export default Events;

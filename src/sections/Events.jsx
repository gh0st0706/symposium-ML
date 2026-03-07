import { motion } from "framer-motion";
import EventCard from "../components/EventCard";

const technicalEvents = [
  {
    title: "Hackathon",
    description: "Build AI-first solutions in a timed sprint with mentor checkpoints and final jury rounds.",
    icon: "T1",
    prize: "INR 50,000"
  },
  {
    title: "Paper Presentation",
    description: "Present research ideas, system designs, and novel approaches before expert panels.",
    icon: "T2",
    prize: "INR 20,000"
  },
  {
    title: "AI Workshop",
    description: "Hands-on sessions on model building, deployment, and real-world ML workflow design.",
    icon: "T3",
    prize: "Certificates"
  },
  {
    title: "Technical Quiz",
    description: "High-speed rounds on AI, coding fundamentals, data science, and engineering trends.",
    icon: "T4",
    prize: "INR 10,000"
  }
];

const nonTechnicalEvents = [
  {
    title: "Design Sprint",
    description: "Rapid UI/UX challenge focused on storytelling, product thinking, and visual clarity.",
    icon: "N1",
    prize: "INR 8,000"
  },
  {
    title: "Brand Battle",
    description: "Pitch and defend a creative campaign strategy in front of judges and peer audience.",
    icon: "N2",
    prize: "INR 7,000"
  },
  {
    title: "Cine Quiz",
    description: "A crowd-favorite non-technical quiz with cinema, pop-culture, and logic twists.",
    icon: "N3",
    prize: "INR 5,000"
  },
  {
    title: "Treasure Hunt",
    description: "Team-based puzzle and clue chase across campus zones with live checkpoints.",
    icon: "N4",
    prize: "INR 6,000"
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
        <h2 className="section-title">Event Arenas</h2>
        <p className="section-subtitle">
          TechLynx blends deep technical competitions with high-energy non-technical tracks for a complete fest experience.
        </p>
      </motion.div>

      <div className="mt-12">
        <h3 className="font-display text-2xl font-semibold text-cyan-200">Technical Events</h3>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {technicalEvents.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="font-display text-2xl font-semibold text-violet-200">Non-Technical Events</h3>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {nonTechnicalEvents.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;

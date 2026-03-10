import { motion } from "framer-motion";
import EventCard from "../components/EventCard";

const technicalEvents = [
  {
    title: "IdeathonX",
    description: "Pitch bold problem statements and solution blueprints with rapid validation rounds.",
    icon: "T1",
    prize: "TBA"
  },
  {
    title: "Prompting",
    description: "Solve real-world challenges with prompt engineering, evaluation, and refinement.",
    icon: "T2",
    prize: "TBA"
  }
];

const nonTechnicalEvents = [
  {
    title: "eSports",
    description: "Competitive brackets with live shoutcasts and high-energy matchups.",
    icon: "N1",
    prize: "TBA"
  },
  {
    title: "Talent Show",
    description: "Stage performances that celebrate creativity, confidence, and showmanship.",
    icon: "N2",
    prize: "TBA"
  }
];

const preEvents = [
  {
    title: "Short Film",
    description: "Tell a story in under time with impactful visuals and narrative clarity.",
    icon: "P1",
    prize: "TBA"
  },
  {
    title: "Meme Making",
    description: "Create sharp, tech-flavored memes with originality and timing.",
    icon: "P2",
    prize: "TBA"
  },
  {
    title: "Reels Making",
    description: "Craft fast, engaging reels that capture TechLynx energy.",
    icon: "P3",
    prize: "TBA"
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
          TechLynx blends cybersecurity and AI/ML competitions with high-energy non-technical tracks and creative pre-events.
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

      <div className="mt-12">
        <h3 className="font-display text-2xl font-semibold text-rose-200">Pre-Events</h3>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {preEvents.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;

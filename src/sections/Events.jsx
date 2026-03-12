import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { technicalEvents, nonTechnicalEvents, preEvents } from "../data/events";

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
          Curated arenas across technical, non-technical, and pre-event tracks built to reward depth, originality, and execution.
        </p>
      </motion.div>

      <div className="mt-12">
        <h3 className="font-display text-2xl font-semibold text-cyan-200">Technical Events</h3>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {technicalEvents.map((event) => (
            <Link key={event.slug} to={`/events/${event.slug}`} className="block">
              <EventCard event={event} />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="font-display text-2xl font-semibold text-amber-200">Non-Technical Events</h3>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {nonTechnicalEvents.map((event) => (
            <Link key={event.slug} to={`/events/${event.slug}`} className="block">
              <EventCard event={event} />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="font-display text-2xl font-semibold text-rose-200">Pre-Events</h3>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {preEvents.map((event) => (
            <Link key={event.slug} to={`/events/${event.slug}`} className="block">
              <EventCard event={event} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;

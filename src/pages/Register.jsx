import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { eventBySlug, events } from "../data/events";

const isConfiguredFormUrl = (url) => Boolean(url && !url.includes("REPLACE_"));
const openRegistrationForm = (url) => {
  const openedWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (!openedWindow) {
    window.location.href = url;
  }
};

function Register() {
  const location = useLocation();
  const initialSlugFromState = location.state?.eventSlug;
  const defaultSlug = eventBySlug[initialSlugFromState] ? initialSlugFromState : events[0]?.slug || "";

  const [selectedSlug, setSelectedSlug] = useState(defaultSlug);
  const [statusMessage, setStatusMessage] = useState("");
  const selectedEvent = eventBySlug[selectedSlug];

  useEffect(() => {
    const stateSlug = location.state?.eventSlug;
    if (stateSlug && eventBySlug[stateSlug]) {
      setSelectedSlug(stateSlug);
    }
  }, [location.state]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!selectedEvent) {
      setStatusMessage("Please choose an event first.");
      return;
    }

    if (!isConfiguredFormUrl(selectedEvent.registrationUrl)) {
      setStatusMessage(
        `Form link for ${selectedEvent.title} is not configured yet. Update registrationUrl in src/data/events.js.`
      );
      return;
    }

    setStatusMessage("");
    openRegistrationForm(selectedEvent.registrationUrl);
  };

  return (
    <section className="section-wrap min-h-[92vh] pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="mx-auto w-full max-w-3xl rounded-3xl border border-white/15 bg-slate-950/70 p-8 backdrop-blur-xl md:p-10"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">TechLynx Registration Pool</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">Choose Your Event</h1>
        <p className="mt-3 text-slate-300">
          Select an event to continue to its dedicated registration form.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-5">
          <label className="text-sm text-slate-200">
            Event
            <select
              className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-cyan-300/40 focus:ring"
              name="eventSlug"
              value={selectedSlug}
              onChange={(event) => {
                setSelectedSlug(event.target.value);
                setStatusMessage("");
              }}
              required
            >
              {events.map((eventItem) => (
                <option key={eventItem.slug} value={eventItem.slug} className="bg-slate-900">
                  {eventItem.title} ({eventItem.category})
                </option>
              ))}
            </select>
          </label>

          {selectedEvent ? (
            <div className="rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Selected Event</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-white">{selectedEvent.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{selectedEvent.description}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <p className="rounded-lg border border-white/10 bg-slate-900/45 px-3 py-2 text-sm text-slate-200">
                  Mode: {selectedEvent.mode}
                </p>
                <p className="rounded-lg border border-white/10 bg-slate-900/45 px-3 py-2 text-sm text-slate-200">
                  Venue: {selectedEvent.venue}
                </p>
              </div>
            </div>
          ) : null}

          {statusMessage ? (
            <p className="text-sm text-rose-300">{statusMessage}</p>
          ) : null}

          <div className="mt-2 flex flex-wrap gap-4">
            <button type="submit" className="gradient-btn">
              Continue to Event Form
            </button>
            <Link to="/" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 hover:border-cyan-300/60 hover:text-cyan-200">
              Back Home
            </Link>
          </div>
        </form>
      </motion.div>
    </section>
  );
}

export default Register;

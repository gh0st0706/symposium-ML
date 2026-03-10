import { useEffect, useMemo, useState } from "react";

const EVENT_TIMEZONE = "Asia/Kolkata";

function isSameDateInTimezone(date, year, month, day, timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const y = Number(parts.find((p) => p.type === "year").value);
  const m = Number(parts.find((p) => p.type === "month").value);
  const d = Number(parts.find((p) => p.type === "day").value);
  return y === year && m === month && d === day;
}

function CountdownTimer({ targetDate }) {
  const target = useMemo(() => new Date(targetDate), [targetDate]);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - new Date());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTime({ days, hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const now = new Date();
  const isDay1 = isSameDateInTimezone(now, 2026, 4, 1, EVENT_TIMEZONE);
  const isDay2 = isSameDateInTimezone(now, 2026, 4, 2, EVENT_TIMEZONE);
  const dayLabel = isDay1 ? "Day 1 is live now!" : isDay2 ? "Day 2 is live now!" : "";

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Object.entries(time).map(([key, value]) => (
          <div key={key} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center">
            <p className="font-display text-2xl font-semibold text-cyan-200">{String(value).padStart(2, "0")}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-300">{key}</p>
          </div>
        ))}
      </div>
      {dayLabel ? <p className="mt-4 text-sm font-semibold text-emerald-200">{dayLabel}</p> : null}
    </div>
  );
}

export default CountdownTimer;

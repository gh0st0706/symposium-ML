import { useEffect, useMemo, useState } from "react";

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

  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {Object.entries(time).map(([key, value]) => (
        <div key={key} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center">
          <p className="font-display text-2xl font-semibold text-cyan-200">{String(value).padStart(2, "0")}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-300">{key}</p>
        </div>
      ))}
    </div>
  );
}

export default CountdownTimer;

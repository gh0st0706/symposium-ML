const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const eventDateTextEl = document.getElementById('eventDateText');
const EVENT_TIMEZONE = 'Asia/Kolkata';

function isSameDateInTimezone(date, year, month, day, timeZone) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);
  const y = Number(parts.find((p) => p.type === 'year').value);
  const m = Number(parts.find((p) => p.type === 'month').value);
  const d = Number(parts.find((p) => p.type === 'day').value);
  return y === year && m === month && d === day;
}

function formatUnit(value) {
  return String(value).padStart(2, '0');
}

function formatEventText(targetDate, eventName) {
  return `${eventName} starts on ${targetDate.toLocaleString('en-IN', {
    timeZone: EVENT_TIMEZONE,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })}`;
}

function updateCountdown(targetDate, eventName) {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    const isDay1 = isSameDateInTimezone(now, 2026, 4, 1, EVENT_TIMEZONE);
    const isDay2 = isSameDateInTimezone(now, 2026, 4, 2, EVENT_TIMEZONE);
    if (isDay1) {
      eventDateTextEl.textContent = 'Day 1 is live now!';
    } else if (isDay2) {
      eventDateTextEl.textContent = 'Day 2 is live now!';
    } else {
      eventDateTextEl.textContent = `${eventName} is live now!`;
    }
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = formatUnit(days);
  hoursEl.textContent = formatUnit(hours);
  minutesEl.textContent = formatUnit(minutes);
  secondsEl.textContent = formatUnit(seconds);
  const isDay1 = isSameDateInTimezone(now, 2026, 4, 1, EVENT_TIMEZONE);
  const isDay2 = isSameDateInTimezone(now, 2026, 4, 2, EVENT_TIMEZONE);
  if (isDay1) {
    eventDateTextEl.textContent = 'Day 1 is live now!';
  } else if (isDay2) {
    eventDateTextEl.textContent = 'Day 2 is live now!';
  } else {
    eventDateTextEl.textContent = formatEventText(targetDate, eventName);
  }
}

function startCountdown(targetDate, eventName) {
  updateCountdown(targetDate, eventName);
  setInterval(() => updateCountdown(targetDate, eventName), 1000);
}

async function initCountdown() {
  const fallbackDate = new Date('2026-04-01T09:00:00+05:30');
  const fallbackEventName = 'TechLynx 2026 (Apr 1-2)';

  try {
    const response = await fetch('/api/v1/event', { headers: { Accept: 'application/json' } });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const event = await response.json();
    const targetDate = new Date(event.starts_at);
    const eventName = event.name || fallbackEventName;
    startCountdown(targetDate, eventName);
  } catch (_) {
    startCountdown(fallbackDate, fallbackEventName);
  }
}

initCountdown();

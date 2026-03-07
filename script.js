const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const eventDateTextEl = document.getElementById('eventDateText');

function formatUnit(value) {
  return String(value).padStart(2, '0');
}

function formatEventText(targetDate, eventName) {
  return `${eventName} starts on ${targetDate.toLocaleString('en-IN', {
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
    eventDateTextEl.textContent = `${eventName} is live now!`;
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
  eventDateTextEl.textContent = formatEventText(targetDate, eventName);
}

function startCountdown(targetDate, eventName) {
  updateCountdown(targetDate, eventName);
  setInterval(() => updateCountdown(targetDate, eventName), 1000);
}

async function initCountdown() {
  const fallbackDate = new Date('2026-09-18T09:00:00+05:30');
  const fallbackEventName = 'SympX 2026';

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

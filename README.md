# CSI CSE AI&ML Technical Symposium Website

Premium React + Tailwind + Framer Motion frontend for:
- Department: CSE - Artificial Intelligence and Machine Learning
- College: CSI College of Engineering

## Tech Stack
- React (Vite)
- Tailwind CSS
- Framer Motion
- React Router
- Google Apps Script + Google Sheets (registrations)

## Routes
- `/` Home
- `/register` Register

## Google Sheets registration endpoint
This project sends registration form data to:
`https://script.google.com/macros/s/AKfycbxmWwxZoreYhgcEG5JhQcridAKwCWYzWrY97PEDqHdMgnuTO5-YVkzKDrOVZ-thl0Tl/exec`

Set this in `.env` (optional, already in `.env.example`):
- `VITE_GOOGLE_SCRIPT_URL=...`

## Registration workaround (recommended)
This project now uses a Vercel serverless proxy:
- `POST /api/register` -> forwards payload to Apps Script -> returns real success/failure.

For production on Vercel, add environment variable:
- `GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec`

## Important for Sheets writes
1. In your Google Sheet, sheet tab name must be exactly: `registrations`.
2. Paste `google-apps-script/Code.gs` into Apps Script editor.
3. In `Code.gs`, set `SPREADSHEET_ID` from your sheet URL (between `/d/` and `/edit`).
4. Deploy as Web App:
   - Execute as: `Me`
   - Who has access: `Anyone`
5. After code changes, click `Deploy > Manage deployments > Edit > Deploy` again.
6. Quick check: open `/exec?ping=1` and confirm JSON response.

## Run locally
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5173`

## Build
- `npm run build`
- `npm run preview`

## Project structure
- `src/components/Navbar.jsx`
- `src/components/Hero.jsx`
- `src/components/EventCard.jsx`
- `src/components/CountdownTimer.jsx`
- `src/components/Footer.jsx`
- `src/sections/About.jsx`
- `src/sections/Events.jsx`
- `src/sections/Schedule.jsx`
- `src/sections/RegisterCTA.jsx`
- `src/sections/Contact.jsx`
- `src/pages/Home.jsx`
- `src/pages/Register.jsx`
- `src/App.jsx`

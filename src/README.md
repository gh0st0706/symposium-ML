# CSI CSE AI&ML Symposium Registration

Simple React + Google Apps Script registration system.

## 1) Frontend (React + Vite)

### Install and run
1. `npm install`
2. Copy env file:
   - Windows PowerShell: `Copy-Item .env.example .env`
3. Update `.env`:
   - `VITE_GOOGLE_SCRIPT_URL=YOUR_WEB_APP_EXEC_URL`
4. `npm run dev`
5. Open `http://localhost:5173`

### Build for production
1. `npm run build`
2. Output folder: `dist/`

## Vercel deployment (recommended)
1. Push this repo to GitHub.
2. In Vercel, click `Add New > Project` and import this repository.
3. Framework preset: `Vite` (auto-detected).
4. Build command: `npm run build`
5. Output directory: `dist`
6. In `Settings > Environment Variables`, add:
   - `VITE_GOOGLE_SCRIPT_URL=YOUR_WEB_APP_EXEC_URL`
7. Deploy.

This repo includes:
- `vercel.json` for SPA routing (`/register`, `/success` work on refresh/deep-link).
- `.vercelignore` to keep deployment package clean.

### Routes
- `/` Home page
- `/register` Registration form
- `/success` Success page

## 2) Google Sheet setup
1. Create a Google Sheet.
2. Rename one sheet tab to `registrations`.
3. Add header row exactly as:
   - `Timestamp | Full Name | College | Department | Email | Phone | Event | Payment Status`

## 3) Google Apps Script setup
1. In the sheet, click `Extensions > Apps Script`.
2. Replace default code with contents from `google-apps-script/Code.gs`.
3. Save project.

## 4) Deploy Apps Script API
1. Click `Deploy > New deployment`.
2. Type: `Web app`.
3. Execute as: `Me`.
4. Who has access: `Anyone`.
5. Deploy and authorize.
6. Copy Web App URL ending in `/exec`.
7. Put that URL in `.env` as `VITE_GOOGLE_SCRIPT_URL`.

## 5) Form submission flow
Home (`/`) -> Register (`/register`) -> POST to Apps Script -> row appended in Google Sheet -> redirect to `/success`.

## Run with Streamlit (Python-only)
1. `pip install -r requirements-streamlit.txt`
2. Optional env var:
   - PowerShell: `$env:GOOGLE_SCRIPT_URL=\"YOUR_WEB_APP_EXEC_URL\"`
3. `streamlit run streamlit_app.py`

## Project structure
- `src/components/Navbar.jsx`
- `src/components/RegistrationForm.jsx`
- `src/pages/Home.jsx`
- `src/pages/Register.jsx`
- `src/pages/Success.jsx`
- `src/App.jsx`
- `src/main.jsx`

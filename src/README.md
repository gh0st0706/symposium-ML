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

## Project structure
- `src/components/Navbar.jsx`
- `src/components/RegistrationForm.jsx`
- `src/pages/Home.jsx`
- `src/pages/Register.jsx`
- `src/pages/Success.jsx`
- `src/App.jsx`
- `src/main.jsx`

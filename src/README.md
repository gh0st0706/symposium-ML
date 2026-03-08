# TechLynx 2026 | AIML Department Symposium

Premium React + Tailwind + Framer Motion website for TechLynx at CSI College of Engineering.

## Stack
- React (Vite)
- Tailwind CSS
- Framer Motion
- Vercel Serverless API (`/api/register`)
- Google Sheets API (service account)

## Routes
- `/` Home
- `/register` Register
- `/api/register` Registration API

## New registration backend (no Apps Script)
Registration is saved by `api/register.js` directly into Google Sheets.

### 1) Create/prepare Google Sheet
- Create a sheet with tab name: `registrations`
- Header row (A-H):
  - `Timestamp | Full Name | College | Department | Email | Phone | Event | Payment Status`
- Copy sheet ID from URL: `https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`

### 2) Create Google service account
- In Google Cloud Console, enable **Google Sheets API**.
- Create a service account and generate a JSON key.
- Copy these from JSON:
  - `client_email`
  - `private_key`

### 3) Share sheet with service account
- Open the sheet -> Share
- Add service account `client_email` as **Editor**

### 4) Configure Vercel env vars
Set in Vercel Project -> Settings -> Environment Variables:
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
  - Keep escaped newlines: `\n`
- `GOOGLE_SHEET_ID`
- `GOOGLE_SHEET_RANGE` = `registrations!A:H`

### 5) Deploy and test
- Redeploy Vercel.
- Diagnostics:
  - `/api/register?action=diag`
  - `/api/register?action=testWrite`

If `testWrite` succeeds, form submissions will write to sheet.

## Local run
1. `npm install`
2. Set same env vars in local shell or `.env.local`
3. `npm run dev`

## Build
- `npm run build`
- `npm run preview`

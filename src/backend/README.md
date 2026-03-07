# SympX Backend

Production-oriented FastAPI backend for the symposium site.

## Features
- API versioning at `/api/v1`
- Security middleware: CORS, trusted hosts, basic secure headers
- GZip compression
- In-memory rate limiting per IP and path
- Health/readiness probes: `/healthz`, `/readyz`
- Static serving for the frontend from `src/`
- Structured request logging with `X-Request-ID`

## Project layout
- `main.py`: app startup, routers, middleware, exception handlers
- `config.py`: environment-driven settings
- `services.py`: event and countdown logic
- `schemas.py`: response models
- `middleware.py`: request context and rate-limiter middleware

## Local run
1. Create and activate virtual environment.
2. Install dependencies:
   `pip install -r requirements.txt`
3. Start dev server:
   `uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000`

Open `http://localhost:8000`.

## Production run
Use Gunicorn with Uvicorn workers:
`gunicorn -c backend/gunicorn_conf.py backend.main:app`

## Environment
Copy `.env.example` to `.env` and adjust values as needed.

Important env vars:
- `APP_ALLOWED_ORIGINS`
- `APP_ALLOWED_HOSTS`
- `APP_RATE_LIMIT_PER_MINUTE`
- `APP_EVENT_START_AT`

## Test
From `src/`:
`python -m unittest discover -s backend/tests`

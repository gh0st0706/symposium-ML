import logging
from datetime import datetime, timezone
from pathlib import Path

from fastapi import APIRouter, FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.middleware.trustedhost import TrustedHostMiddleware

from .config import get_settings
from .middleware import RequestContextMiddleware, SimpleRateLimitMiddleware
from .schemas import CountdownResponse, EventResponse, FeaturesResponse, HealthResponse
from .services import FEATURES, countdown_parts, parse_event_start

settings = get_settings()
logger = logging.getLogger("sympx")
logging.basicConfig(
    level=getattr(logging, settings.app_log_level, logging.INFO),
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)

app = FastAPI(title=settings.app_name)
api = APIRouter(prefix="/api/v1", tags=["public"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.app_allowed_origins,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)
app.add_middleware(TrustedHostMiddleware, allowed_hosts=settings.app_allowed_hosts)
app.add_middleware(GZipMiddleware, minimum_size=512)
app.add_middleware(SimpleRateLimitMiddleware, requests_per_minute=settings.app_rate_limit_per_minute)
app.add_middleware(RequestContextMiddleware, logger=logger)


@api.get("/event", response_model=EventResponse)
def get_event() -> EventResponse:
    starts_at = parse_event_start(settings)
    _, _, _, _, is_live, seconds_to_start = countdown_parts(starts_at)
    return EventResponse(
        name=settings.app_event_name,
        location=settings.app_event_location,
        starts_at=starts_at,
        is_live=is_live,
        seconds_to_start=seconds_to_start,
    )


@api.get("/countdown", response_model=CountdownResponse)
def get_countdown() -> CountdownResponse:
    starts_at = parse_event_start(settings)
    days, hours, minutes, seconds, is_live, _ = countdown_parts(starts_at)
    return CountdownResponse(
        days=days,
        hours=hours,
        minutes=minutes,
        seconds=seconds,
        is_live=is_live,
    )


@api.get("/features", response_model=FeaturesResponse)
def get_features() -> FeaturesResponse:
    return FeaturesResponse(items=FEATURES)


@app.get("/healthz", response_model=HealthResponse, tags=["ops"])
def healthz() -> HealthResponse:
    return HealthResponse(timestamp=datetime.now(timezone.utc))


@app.get("/readyz", response_model=HealthResponse, tags=["ops"])
def readyz() -> HealthResponse:
    _ = parse_event_start(settings)
    return HealthResponse(timestamp=datetime.now(timezone.utc))


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "detail": exc.detail,
            "request_id": getattr(request.state, "request_id", None),
        },
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "detail": "Validation failed",
            "errors": exc.errors(),
            "request_id": getattr(request.state, "request_id", None),
        },
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.exception("unhandled_exception", extra={"request_id": getattr(request.state, "request_id", None)})
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error",
            "request_id": getattr(request.state, "request_id", None),
        },
    )


app.include_router(api)

static_dir = Path(__file__).resolve().parents[1]
app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")

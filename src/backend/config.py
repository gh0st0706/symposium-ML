import json
import os
from dataclasses import dataclass
from functools import lru_cache


def _get_env(name: str, default: str) -> str:
    value = os.getenv(name)
    return value if value not in (None, "") else default


def _get_int(name: str, default: int) -> int:
    raw = _get_env(name, str(default))
    try:
        return int(raw)
    except ValueError:
        return default


def _get_str_list(name: str, default: list[str]) -> list[str]:
    raw = _get_env(name, "")
    if not raw:
        return default
    try:
        parsed = json.loads(raw)
        if isinstance(parsed, list) and all(isinstance(item, str) for item in parsed):
            return parsed
    except json.JSONDecodeError:
        pass
    return [item.strip() for item in raw.split(",") if item.strip()]


@dataclass(frozen=True)
class Settings:
    app_name: str
    app_env: str
    app_host: str
    app_port: int
    app_log_level: str
    app_allowed_origins: list[str]
    app_allowed_hosts: list[str]
    app_rate_limit_per_minute: int

    app_event_name: str
    app_event_location: str
    app_event_start_at: str


@lru_cache
def get_settings() -> Settings:
    return Settings(
        app_name=_get_env("APP_NAME", "SympX Backend"),
        app_env=_get_env("APP_ENV", "production"),
        app_host=_get_env("APP_HOST", "0.0.0.0"),
        app_port=_get_int("APP_PORT", 8000),
        app_log_level=_get_env("APP_LOG_LEVEL", "INFO").upper(),
        app_allowed_origins=_get_str_list("APP_ALLOWED_ORIGINS", ["*"]),
        app_allowed_hosts=_get_str_list("APP_ALLOWED_HOSTS", ["localhost", "127.0.0.1"]),
        app_rate_limit_per_minute=_get_int("APP_RATE_LIMIT_PER_MINUTE", 120),
        app_event_name=_get_env("APP_EVENT_NAME", "TechLynx 2026 (Apr 1-2)"),
        app_event_location=_get_env("APP_EVENT_LOCATION", "AI & ML Department"),
        app_event_start_at=_get_env("APP_EVENT_START_AT", "2026-04-01T09:00:00+05:30"),
    )

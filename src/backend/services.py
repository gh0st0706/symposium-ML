from datetime import datetime

from .config import Settings

FEATURES = [
    {
        "title": "IdeathonX",
        "description": "Pitch bold ideas with rapid validation rounds and mentor feedback.",
    },
    {
        "title": "Prompting",
        "description": "Solve real-world tasks with prompt engineering and evaluation challenges.",
    },
    {
        "title": "eSports",
        "description": "Competitive brackets with high-energy gameplay and live shoutcasts.",
    },
]


def parse_event_start(settings: Settings) -> datetime:
    return datetime.fromisoformat(settings.app_event_start_at)


def countdown_parts(start_at: datetime, now: datetime | None = None) -> tuple[int, int, int, int, bool, int]:
    now = now or datetime.now(start_at.tzinfo)
    diff = start_at - now
    seconds_total = max(int(diff.total_seconds()), 0)
    is_live = seconds_total == 0

    days = seconds_total // (24 * 3600)
    hours = (seconds_total % (24 * 3600)) // 3600
    minutes = (seconds_total % 3600) // 60
    seconds = seconds_total % 60
    return days, hours, minutes, seconds, is_live, seconds_total

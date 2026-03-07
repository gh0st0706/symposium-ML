from datetime import datetime

from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str = "ok"
    timestamp: datetime


class EventResponse(BaseModel):
    name: str
    location: str
    starts_at: datetime
    timezone: str = Field(default="Asia/Kolkata")
    is_live: bool
    seconds_to_start: int


class CountdownResponse(BaseModel):
    days: int
    hours: int
    minutes: int
    seconds: int
    is_live: bool


class Feature(BaseModel):
    title: str
    description: str


class FeaturesResponse(BaseModel):
    items: list[Feature]

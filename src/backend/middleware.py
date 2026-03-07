import logging
import time
import uuid
from collections import defaultdict, deque
from datetime import datetime, timedelta, timezone
from threading import Lock

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse, Response


class RequestContextMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, logger: logging.Logger):
        super().__init__(app)
        self.logger = logger

    async def dispatch(self, request: Request, call_next) -> Response:
        request_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())
        request.state.request_id = request_id
        start = time.perf_counter()
        response = await call_next(request)
        duration_ms = int((time.perf_counter() - start) * 1000)
        response.headers["X-Request-ID"] = request_id
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        self.logger.info(
            "request_completed",
            extra={
                "request_id": request_id,
                "method": request.method,
                "path": request.url.path,
                "status_code": response.status_code,
                "duration_ms": duration_ms,
                "client": request.client.host if request.client else "unknown",
            },
        )
        return response


class SimpleRateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, requests_per_minute: int = 120):
        super().__init__(app)
        self.requests_per_minute = requests_per_minute
        self.window = timedelta(minutes=1)
        self.hits: dict[str, deque[datetime]] = defaultdict(deque)
        self.lock = Lock()

    async def dispatch(self, request: Request, call_next):
        if request.url.path in {"/healthz", "/readyz"}:
            return await call_next(request)

        now = datetime.now(timezone.utc)
        client_ip = request.client.host if request.client else "unknown"
        key = f"{client_ip}:{request.url.path}"

        with self.lock:
            queue = self.hits[key]
            cutoff = now - self.window
            while queue and queue[0] < cutoff:
                queue.popleft()

            if len(queue) >= self.requests_per_minute:
                return JSONResponse(
                    status_code=429,
                    content={"detail": "Rate limit exceeded. Try again later."},
                )

            queue.append(now)

        return await call_next(request)

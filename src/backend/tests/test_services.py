import unittest
from datetime import datetime, timezone, timedelta
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[3]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

try:
    from backend.services import countdown_parts
    HAS_SERVICE_DEPS = True
except Exception:  # pragma: no cover
    HAS_SERVICE_DEPS = False


@unittest.skipUnless(HAS_SERVICE_DEPS, "Install backend dependencies to run service tests.")
class CountdownServiceTests(unittest.TestCase):
    def test_countdown_parts_future(self):
        start_at = datetime(2030, 1, 2, 5, 30, 0, tzinfo=timezone.utc)
        now = start_at - timedelta(days=1, hours=2, minutes=3, seconds=4)

        days, hours, minutes, seconds, is_live, seconds_to_start = countdown_parts(start_at, now)

        self.assertEqual(days, 1)
        self.assertEqual(hours, 2)
        self.assertEqual(minutes, 3)
        self.assertEqual(seconds, 4)
        self.assertFalse(is_live)
        self.assertEqual(seconds_to_start, 93784)

    def test_countdown_parts_live(self):
        start_at = datetime.now(timezone.utc)
        now = start_at + timedelta(seconds=1)

        days, hours, minutes, seconds, is_live, seconds_to_start = countdown_parts(start_at, now)

        self.assertEqual((days, hours, minutes, seconds), (0, 0, 0, 0))
        self.assertTrue(is_live)
        self.assertEqual(seconds_to_start, 0)


if __name__ == "__main__":
    unittest.main()

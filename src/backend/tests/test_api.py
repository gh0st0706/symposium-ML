import unittest
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[3]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

try:
    from fastapi.testclient import TestClient
    from backend.main import app
    HAS_TEST_DEPS = True
except Exception:  # pragma: no cover
    HAS_TEST_DEPS = False


@unittest.skipUnless(HAS_TEST_DEPS, "Install backend dependencies to run API tests.")
class ApiTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_healthz(self):
        response = self.client.get("/healthz")
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["status"], "ok")
        self.assertIn("timestamp", body)

    def test_event_endpoint(self):
        response = self.client.get("/api/v1/event")
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertIn("name", body)
        self.assertIn("starts_at", body)
        self.assertIn("seconds_to_start", body)


if __name__ == "__main__":
    unittest.main()

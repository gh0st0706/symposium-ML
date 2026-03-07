const DEFAULT_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxmWwxZoreYhgcEG5JhQcridAKwCWYzWrY97PEDqHdMgnuTO5-YVkzKDrOVZ-thl0Tl/exec";

function normalizePayload(body) {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch (_) {
      return {};
    }
  }
  if (typeof body === "object") return body;
  return {};
}

export default async function handler(req, res) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL || DEFAULT_SCRIPT_URL;

  if (req.method === "GET") {
    const action = req.query?.action;
    if (!action) {
      return res.status(200).json({
        success: true,
        message: "Registration API online",
        hint: "Use ?action=diag or ?action=testWrite",
      });
    }

    try {
      const upstream = await fetch(`${scriptUrl}?action=${encodeURIComponent(action)}`, {
        method: "GET",
      });
      const raw = await upstream.text();
      let parsed = {};
      try {
        parsed = JSON.parse(raw);
      } catch (_) {
        parsed = { success: upstream.ok, raw };
      }

      return res.status(upstream.ok ? 200 : 502).json({
        success: upstream.ok && parsed.success !== false,
        message: parsed.message || "Diagnostic call finished",
        upstreamStatus: upstream.status,
        upstream: parsed,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Diagnostic call failed",
        error: String(error),
      });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const payload = normalizePayload(req.body);

  if (!payload.fullName || !payload.email || !payload.phone) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const body = new URLSearchParams({
      payload: JSON.stringify(payload),
      ...payload
    });

    const upstream = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: body.toString()
    });

    const rawText = await upstream.text();
    let parsed = {};
    try {
      parsed = JSON.parse(rawText);
    } catch (_) {
      parsed = { success: upstream.ok };
    }

    if (!upstream.ok || parsed.success === false) {
      return res.status(502).json({
        success: false,
        message: parsed.message || "Apps Script rejected the submission",
        status: upstream.status,
        upstream: parsed,
      });
    }

    return res.status(200).json({ success: true, message: "Saved to Google Sheets" });
  } catch (error) {
    return res.status(500).json({ success: false, message: String(error) });
  }
}

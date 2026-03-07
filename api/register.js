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
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const payload = normalizePayload(req.body);
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL || DEFAULT_SCRIPT_URL;

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
        status: upstream.status
      });
    }

    return res.status(200).json({ success: true, message: "Saved to Google Sheets" });
  } catch (error) {
    return res.status(500).json({ success: false, message: String(error) });
  }
}

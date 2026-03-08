import { google } from "googleapis";

const DEFAULT_RANGE = "registrations!A:H";

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

function getConfig() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const range = process.env.GOOGLE_SHEET_RANGE || DEFAULT_RANGE;

  if (!clientEmail || !privateKeyRaw || !spreadsheetId) {
    throw new Error("Missing env vars: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID");
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

  return { clientEmail, privateKey, spreadsheetId, range };
}

async function getSheetsApi() {
  const { clientEmail, privateKey } = getConfig();
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  await auth.authorize();
  return google.sheets({ version: "v4", auth });
}

async function appendRow(values) {
  const { spreadsheetId, range } = getConfig();
  const sheets = await getSheetsApi();

  return sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values],
    },
  });
}

export default async function handler(req, res) {
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
      const { spreadsheetId, range } = getConfig();
      const sheets = await getSheetsApi();

      if (action === "diag") {
        const meta = await sheets.spreadsheets.get({ spreadsheetId });
        return res.status(200).json({
          success: true,
          message: "Diagnostics ok",
          spreadsheetId,
          spreadsheetTitle: meta.data.properties?.title,
          range,
        });
      }

      if (action === "testWrite") {
        const result = await appendRow([
          new Date().toISOString(),
          "TEST ENTRY",
          "CSI College of Engineering",
          "AIML Department",
          "test@example.com",
          "9999999999",
          "Diagnostic",
          "Pending",
        ]);

        return res.status(200).json({
          success: true,
          message: "Test row appended",
          updatedRange: result.data.updates?.updatedRange,
        });
      }

      return res.status(400).json({ success: false, message: "Unknown action" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Diagnostic failed",
        error: String(error),
      });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const payload = normalizePayload(req.body);

    if (!payload.fullName || !payload.email || !payload.phone) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const result = await appendRow([
      payload.submittedAt || new Date().toISOString(),
      payload.fullName || "",
      payload.collegeName || "",
      payload.department || "",
      payload.email || "",
      payload.phone || "",
      payload.eventSelected || "",
      payload.paymentStatus || "",
    ]);

    return res.status(200).json({
      success: true,
      message: "Saved to Google Sheets",
      updatedRange: result.data.updates?.updatedRange,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to save registration",
      error: String(error),
    });
  }
}

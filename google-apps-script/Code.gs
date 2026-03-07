const SPREADSHEET_ID = "17YH1AbpkKnbjUzbd9Vk0bVbBXDPk_4vjE1UK3TWRLSkrLPVCsUbYAu8";
const SHEET_NAME = "registrations";

function doPost(e) {
  try {
    const sheet = getSheet_();
    if (!sheet) {
      return jsonResponse({ success: false, message: "Sheet not found" }, 400);
    }

    const payload = parsePayload(e);
    const now = new Date();

    if (!payload.fullName || !payload.email || !payload.phone) {
      return jsonResponse({ success: false, message: "Missing required fields" }, 400);
    }

    sheet.appendRow([
      now,
      payload.fullName || "",
      payload.collegeName || "",
      payload.department || "",
      payload.email || "",
      payload.phone || "",
      payload.eventSelected || "",
      payload.paymentStatus || "",
    ]);

    return jsonResponse({ success: true, message: "Saved" }, 200);
  } catch (error) {
    return jsonResponse({ success: false, message: error.message }, 500);
  }
}

function doGet(e) {
  if (e && e.parameter && e.parameter.action === "diag") {
    try {
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = ss.getSheetByName(SHEET_NAME);
      return jsonResponse(
        {
          success: true,
          message: "Diagnostics ok",
          spreadsheetId: SPREADSHEET_ID,
          spreadsheetName: ss.getName(),
          sheetName: SHEET_NAME,
          sheetFound: Boolean(sheet),
          idLength: SPREADSHEET_ID.length,
        },
        200
      );
    } catch (error) {
      return jsonResponse(
        {
          success: false,
          message: "Diagnostics failed",
          error: String(error),
          spreadsheetId: SPREADSHEET_ID,
          idLength: SPREADSHEET_ID.length,
        },
        500
      );
    }
  }

  if (e && e.parameter && e.parameter.action === "testWrite") {
    try {
      const sheet = getSheet_();
      if (!sheet) {
        return jsonResponse({ success: false, message: "Sheet not found" }, 400);
      }
      sheet.appendRow([
        new Date(),
        "TEST ENTRY",
        "CSI College of Engineering",
        "CSE - Artificial Intelligence and Machine Learning",
        "test@example.com",
        "9999999999",
        "Diagnostic",
        "Pending",
      ]);
      return jsonResponse({ success: true, message: "Test row appended" }, 200);
    } catch (error) {
      return jsonResponse({ success: false, message: String(error) }, 500);
    }
  }

  if (e && e.parameter && e.parameter.ping === "1") {
    return jsonResponse({ success: true, message: "Web app is live" }, 200);
  }
  return jsonResponse({ success: true, message: "API is running" }, 200);
}

function getSheet_() {
  try {
    return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  } catch (_) {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (!active) return null;
    return active.getSheetByName(SHEET_NAME);
  }
}

function parsePayload(e) {
  if (!e) return {};

  // 1) Raw JSON body
  if (e.postData && e.postData.contents) {
    try {
      const body = JSON.parse(e.postData.contents);
      if (body && typeof body === "object") return body;
    } catch (_) {}
  }

  // 2) Form-encoded payload=<json>
  if (e.parameter && e.parameter.payload) {
    try {
      const parsed = JSON.parse(e.parameter.payload);
      if (parsed && typeof parsed === "object") return parsed;
    } catch (_) {}
  }

  // 3) Direct form fields
  if (e.parameter) {
    return {
      fullName: e.parameter.fullName || "",
      collegeName: e.parameter.collegeName || "",
      department: e.parameter.department || "",
      email: e.parameter.email || "",
      phone: e.parameter.phone || "",
      eventSelected: e.parameter.eventSelected || "",
      paymentStatus: e.parameter.paymentStatus || "",
    };
  }

  return {};
}

function jsonResponse(data, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify({ ...data, statusCode: statusCode }))
    .setMimeType(ContentService.MimeType.JSON);
}

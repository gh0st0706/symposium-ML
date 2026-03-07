const SPREADSHEET_ID = "PASTE_YOUR_SHEET_ID_HERE";
const SHEET_NAME = "registrations";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
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
  if (e && e.parameter && e.parameter.ping === "1") {
    return jsonResponse({ success: true, message: "Web app is live" }, 200);
  }
  return jsonResponse({ success: true, message: "API is running" }, 200);
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

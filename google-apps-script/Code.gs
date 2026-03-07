const SHEET_NAME = "registrations";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return jsonResponse({ success: false, message: "Sheet not found" }, 400);
    }

    const payload = JSON.parse(e.postData.contents || "{}");
    const now = new Date();

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

function doGet() {
  return jsonResponse({ success: true, message: "API is running" }, 200);
}

function jsonResponse(data, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify({ ...data, statusCode: statusCode }))
    .setMimeType(ContentService.MimeType.JSON);
}

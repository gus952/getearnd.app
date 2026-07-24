// ============================================
// Earnd Waitlist — Google Apps Script
// ============================================
// SETUP:
// 1. Go to https://script.google.com and create a new project
// 2. Paste this entire file into Code.gs
// 3. Run the "setup" function once (it creates the spreadsheet & sheets)
// 4. Deploy → New deployment → Web app → Execute as "Me", Access "Anyone"
// 5. Copy the web app URL and paste it into index.html (APPS_SCRIPT_URL)
// ============================================

const SPREADSHEET_NAME = 'Earnd Waitlist';
let ss;

function getOrCreateSpreadsheet() {
  if (ss) return ss;
  const files = DriveApp.getFilesByName(SPREADSHEET_NAME);
  while (files.hasNext()) {
    try {
      ss = SpreadsheetApp.open(files.next());
      return ss;
    } catch (e) {
      // skip files that can't be opened (trashed, corrupt, etc.)
    }
  }
  ss = SpreadsheetApp.create(SPREADSHEET_NAME);
  const waitlistSheet = ss.getActiveSheet();
  waitlistSheet.setName('Waitlist');
  waitlistSheet.appendRow(['Timestamp', 'Name', 'Email', 'Language', 'Source']);
  waitlistSheet.getRange('1:1').setFontWeight('bold');

  const questionnaireSheet = ss.insertSheet('Questionnaire');
  questionnaireSheet.appendRow(['Timestamp', 'Name', 'Email', 'Language', 'Exercise Frequency', '5-Day Commitment', 'Reward Value']);
  questionnaireSheet.getRange('1:1').setFontWeight('bold');

  const partnersSheet = ss.insertSheet('Partners');
  partnersSheet.appendRow(['Timestamp', 'Venue Name', 'Contact Name', 'Email', 'Neighbourhood', 'Message', 'Language']);
  partnersSheet.getRange('1:1').setFontWeight('bold');
  return ss;
}

function setup() {
  const spreadsheet = getOrCreateSpreadsheet();
  Logger.log('Spreadsheet created/found: ' + spreadsheet.getUrl());
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const spreadsheet = getOrCreateSpreadsheet();

    if (data.type === 'partner') {
      let sheet = spreadsheet.getSheetByName('Partners');
      if (!sheet) {
        sheet = spreadsheet.insertSheet('Partners');
        sheet.appendRow(['Timestamp', 'Venue Name', 'Contact Name', 'Email', 'Neighbourhood', 'Message', 'Language']);
        sheet.getRange('1:1').setFontWeight('bold');
      }
      sheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.venue_name || '',
        data.contact_name || '',
        data.email || '',
        data.location || '',
        data.message || '',
        data.language || 'en'
      ]);
    } else if (data.type === 'questionnaire') {
      const sheet = spreadsheet.getSheetByName('Questionnaire');
      sheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.name || '',
        data.email || '',
        data.language || 'en',
        data.exercise_frequency || '',
        data.five_day_commitment || '',
        data.reward_value || ''
      ]);
    } else {
      const sheet = spreadsheet.getSheetByName('Waitlist');
      sheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.name || '',
        data.email || '',
        data.language || 'en',
        data.source || 'unknown'
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok', message: 'Earnd waitlist API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

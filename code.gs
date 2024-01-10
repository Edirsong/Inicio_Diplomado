const DATA_ENTRY_SHEET_NAME = "Hoja 1";
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_ENTRY_SHEET_NAME);
const doPost = (request = {}) => {
const { postData: { contents, type } = {} } = request;
var data = parseFormData(contents);
appendToGoogleSheet(data);
return ContentService.createTextOutput(contents).setMimeType(ContentService.MimeType.JSON);
};
function parseFormData(postData) {
var data = [];
  // Verificar si postData está definido y no es null
  if (postData) {
    var parameters = postData.split('&');
    for (var i = 0; i < parameters.length; i++) {
      var keyValue = parameters[i].split('=');
      data[keyValue[0]] = decodeURIComponent(keyValue[1]);
    }
  }
return data;
}
function appendToGoogleSheet (data) {
var headers = sheet.getRange (1, 1, 1, sheet.getLastColumn()).getValues()[0];
var rowData = headers.map(headerFld => data[headerFld]);
sheet.appendRow(rowData);
}
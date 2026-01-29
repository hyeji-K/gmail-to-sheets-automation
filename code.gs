function saveGmailToSheets() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var searchTerm = "특정단어"; // 여기에 찾고 싶은 단어를 입력하세요.
  var threads = GmailApp.search(searchTerm);
  
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var m = messages[j];
      sheet.appendRow([m.getDate(), m.getFrom(), m.getSubject(), m.getPlainBody().substring(0, 500)]);
    }
  }
}
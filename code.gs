function saveGmailToSheets() {
  var sheet = SpreadsheetApp.getActiveSheet();

  // 1. 머리글이 없는 경우(첫 실행 시) 머리글 추가
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["수신 날짜", "발신자", "메일 제목", "본문 내용"]);
    sheet.setFrozenRows(1);
    
    // 머리글 스타일 적용 (굵게, 배경색)
    var headerRange = sheet.getRange(1, 1, 1, 4);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#f3f3f3");
    headerRange.setHorizontalAlignment("center");
  }

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
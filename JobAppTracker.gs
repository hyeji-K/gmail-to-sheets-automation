function saveGmailToSheets() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var searchTerm = "특정단어"; // 여기에 찾고 싶은 단어를 입력하세요.
  var threads = GmailApp.search(searchTerm);

  // 1. 머리글이 없는 경우(첫 실행 시) 머리글 추가
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["수신 날짜", "발신자", "메일 제목", "기업명", "공고 제목", "지원 현황 링크"]);
    sheet.setFrozenRows(1);
    
    // 머리글 스타일 적용 (굵게, 배경색)
    var headerRange = sheet.getRange(1, 1, 1, 6);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#f3f3f3");
    headerRange.setHorizontalAlignment("center");
  }

  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var m = messages[j];
      var body = m.getPlainBody();
      var lines = body.split("\n").map(line => line.trim()).filter(line => line.length > 0);

      var company = "확인 불가";
      var title = "확인 불가";
      
      // 1. 기업명 & 공고 제목 추출
      for (var k = 0; k < lines.length; k++) {
        // 1. "입사지원이 완료되었습니다." 문구를 찾음
        if (lines[k].includes("입사지원이 완료되었습니다.")) {
          // 그 다음 줄에 있는 [image: 기업명]을 건너뛰고 실제 텍스트 기업명을 가져옴
          // 보통 [image: ...] 태그가 k+1 혹은 k+2 근처에 위치함
          for (var l = k + 1; l < lines.length; l++) {
            if (lines[l].includes("[image:")) {
              company = lines[l+1]; // [image: ...] 바로 다음 줄이 기업명
              title = lines[l+2];   // 기업명 바로 다음 줄이 공고 제목
              break;
            }
          }
          break;
        }
      }

      // 3. 지원 현황 링크 추출
      var linkMatch = body.match(/https:\/\/www\.jobkorea\.co\.kr\/Text_User\/Apply_Chart\/Basic_Chart\.asp\?GI_NO=[0-9]+/);
      var link = linkMatch ? linkMatch[0] : "링크 없음";

      // --- 시트에 행 추가 (설정하신 6개 컬럼 순서) ---
      sheet.appendRow([
        m.getDate(),      // 수신 날짜
        m.getFrom(),      // 발신자
        m.getSubject(),   // 메일 제목
        company,          // 기업명
        title,            // 공고 제목
        link              // 지원 현황 링크
      ]);
    }
  }
}
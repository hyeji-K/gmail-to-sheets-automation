function saveGmailToSheets() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var searchTerm = '"[지원완료]"';

  // 1. 시트 상태에 따라 검색 쿼리 자동 결정
  // 데이터가 하나도 없거나 머리글만 있다면 전체 검색, 아니면 7일치만 검색
  var finalQuery = (lastRow <= 1) ? searchTerm : searchTerm + ' newer_than:7d';
  
  // (로그 확인용) 어떤 모드로 실행되는지 확인 가능
  console.log("현재 실행 모드: " + (lastRow <= 1 ? "전체 수집" : "주간 업데이트"));
  
  var threads = GmailApp.search(finalQuery);

  // 2. 머리글 설정 (시트가 완전히 비어있을 때만)
  if (lastRow === 0) {
    sheet.appendRow(["수신 날짜", "발신자", "메일 제목", "기업명", "공고 제목", "지원 현황 링크", "메일 ID"]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#f3f3f3").setHorizontalAlignment("center");
    lastRow = 1; // 머리글을 추가했으므로 값을 1로 업데이트
  }

  // 3. 기존 시트의 ID 목록 가져오기 (중복 방지)
  var existingIds = [];
  if (lastRow > 1) {
    existingIds = sheet.getRange(2, 7, lastRow - 1, 1).getValues().flat();
  }

  // 4. 메일 처리 (오래된 순서대로 루프)
  for (var i = threads.length - 1; i >= 0; i--) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var m = messages[j];
      var messageId = m.getId();

      if (existingIds.indexOf(messageId) !== -1) continue;

      var body = m.getPlainBody();
      var lines = body.split("\n").map(line => line.trim()).filter(line => line.length > 0);
      var company = "확인 불가", title = "확인 불가";

      // --- 기업명 및 제목 추출 로직 ---
      for (var k = 0; k < lines.length; k++) {
        // "입사지원이 완료되었습니다." 문구를 찾음
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
      
      // --- 지원 현황 링크 추출 ---
      var linkMatch = body.match(/https:\/\/www\.jobkorea\.co\.kr\/Text_User\/Apply_Chart\/Basic_Chart\.asp\?GI_NO=[0-9]+/);
      var link = linkMatch ? linkMatch[0] : "링크 없음";

      // 5. 최신 데이터를 상단(2행)에 삽입
      sheet.insertRowAfter(1); 
      var formattedDate = Utilities.formatDate(m.getDate(), Session.getScriptTimeZone(), "yyyy. MM. dd HH:mm:ss");

      var rowData = [formattedDate, m.getFrom(), m.getSubject(), company, title, link, messageId];
      var newRowRange = sheet.getRange(2, 1, 1, 7);
      newRowRange.setValues([rowData]);

      // --- 서식 초기화 코드 추가 ---
      newRowRange.setBackground(null);     // 배경색 없앰 (투명)
      newRowRange.setFontWeight("normal"); // 글자 굵기 정상으로
      newRowRange.setHorizontalAlignment("left"); // 왼쪽 정렬 (취향에 따라)
      
      existingIds.push(messageId);
    }
  }
}
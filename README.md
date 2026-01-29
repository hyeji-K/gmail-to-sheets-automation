# Gmail to Sheets Automation

![Google Apps Script](https://img.shields.io/badge/google%20apps%20script-%234285F4.svg?style=for-the-badge&logo=google-apps-script&logoColor=white)

특정 키워드가 포함된 Gmail을 구글 스프레드시트에 자동으로 기록하는 스크립트입니다.

## ✨ 주요 기능
- 특정 키워드 기반 메일 검색 및 자동 수집
- 메일 수신 일시, 발신자, 제목, 본문 내용 추출
- 구글 스프레드시트 행(Row) 추가를 통한 데이터 아카이빙
- 트리거 설정을 통한 주기적 자동 업데이트

## ⚙️ 설정 방법 (Setup)
1. 대상이 될 **구글 스프레드시트**를 생성합니다.
2. `확장 프로그램` > `Apps Script`를 선택합니다.
3. 이 저장소의 `code.gs` 코드를 복사하여 편집기에 붙여넣습니다.
4. `searchTerm` 변수를 원하는 키워드로 수정합니다.
5. 상단의 **실행(Run)** 버튼을 눌러 Gmail 및 시트 접근 권한을 승인합니다.
6. (선택사항) 왼쪽의 **트리거(시계 아이콘)** 메뉴에서 정기적 실행 시간을 설정합니다.

## 📂 업데이트 히스토리

<details>
<summary>v1.0 (2026-01-29) - 초기 버전 </summary>

- 기본 추출 기능 구현
</details>

## ⚠️ 주의사항
- 본 스크립트는 개인적인 용도로 제작되었습니다.
- 너무 짧은 주기의 트리거 설정은 Google API 할당량 제한에 걸릴 수 있습니다.
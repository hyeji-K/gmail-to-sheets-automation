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

## 📂 프로젝트 구조 (Project Structure)
- `code.gs`: 특정 키워드 조합을 통한 Gmail 검색 엔진 로직
- `JobAppTracker.gs`: 잡코리아 입사지원 메일 본문 파싱 및 시트 자동화

## 📂 업데이트 히스토리

<details>
<summary>v1.3 (2026-01-29) - 중복 방지 로직 및 주간 자동 업데이트 시스템 완성 </summary>

- 중복 방지: Gmail Message ID를 활용하여 동일 메일의 중복 기록 완벽 차단
- 데이터 정렬: 최신 지원 내역이 시트 상단(2행)에 삽입되도록 로직 변경
- 성능 최적화: 시트 상태에 따라 '전체 수집'과 '주간 업데이트(newer_than:7d)' 모드 자동 전환
- UI/UX 개선: 
  * 행 삽입 시 머리글 서식 상속 버그 수정 및 서식 초기화 적용
  * 수신 날짜를 한국형 커스텀 포맷(yyyy. M. d HH:mm:ss)으로 표준화
- 데이터 무결성: 메일 ID 열 추가 및 머리글 범위 일치화
</details>

<details>
<summary>v1.2 (2026-01-29) - 시트 컬럼 확장 및 메일 파싱 최적화 </summary>

- 시트 구조 최적화: 6개 컬럼 체제로 변경 (수신 날짜, 발신자, 메일 제목, 기업명, 공고 제목, 지원 현황 링크)
- 데이터 매핑: Gmail API 기본 정보와 정규표현식 추출 정보를 결합하여 기록
</details>

<details>
<summary>v1.1 (2026-01-29) - 첫 실행 시 머리글(Header) 자동 생성 기능 </summary>

- 추가: 첫 실행 시 머리글(Header) 자동 생성 기능
- 개선: 머리글 행에 볼드체 및 배경색 스타일 적용
</details>

<details>
<summary>v1.0 (2026-01-29) - 초기 버전 </summary>

- 기본 추출 기능 구현
</details>

## ⚠️ 주의사항
- 본 스크립트는 개인적인 용도로 제작되었습니다.
- 너무 짧은 주기의 트리거 설정은 Google API 할당량 제한에 걸릴 수 있습니다.
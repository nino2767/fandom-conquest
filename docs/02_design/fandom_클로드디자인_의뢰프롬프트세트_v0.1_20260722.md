# 팬덤 땅따먹기 — 클로드 디자인(Claude Design) 단계별 의뢰 프롬프트 세트

> 본 문서는 '팬덤 땅따먹기' 전체 38개 화면(User View 26개 + Admin 12개)을 클로드 디자인(Claude Design / AI UI Agent)에 모듈/화면 그룹별로 단계적으로 의뢰하기 위한 **전용 의뢰 프롬프트 가이드 마크다운 문서**이다.

---

## 1. 📁 클로드 디자인에 첨부/전달할 핵심 문서 목록

클로드 디자인에 프로젝트 맥락과 전체 화면 구조를 전달하기 위해 첨부하거나 참고할 **핵심 문서 리스트**입니다.

| 구분 | 문서명 및 위치 | 전달 목적 및 내용 |
| :--- | :--- | :--- |
| **1. 통합 정보구조도 (IA)** | 📄 [fandom_전체_정보구조도_IA_v0.1_20260722.md](file:///Users/jmk/develop/fandom-conquest/docs/01_planning/01_overview/fandom_전체_정보구조도_IA_v0.1_20260722.md) | **[최종] 총 38개 화면** (User View 26개 + Admin 12개) 계층 구조, Screen ID, 진입 경로 명세 |
| **2. 화면 레이아웃 오버뷰** | 📄 [fandom_디자인_화면목업오버뷰_v0.1_20260722.md](file:///Users/jmk/develop/fandom-conquest/docs/02_design/fandom_디자인_화면목업오버뷰_v0.1_20260722.md) | 주요 핵심 화면의 레이아웃, 컴포넌트(포디움, 지도 채색, OCR 애니메이션 등) 명세 |
| **3. 상세기획 문서군** | 📁 `docs/01_planning/02_detail/` <br> (유저뷰 7개 + 어드민 5개) | 각 화면별 폼 입력 항목, 탭 상태, 예외 처리 및 팝업/모달 수치 사양 |
| **4. 핵심 정책 & PRD** | 📄 [fandom_기능명세_v0.1_20260722.md](file:///Users/jmk/develop/fandom-conquest/docs/01_planning/01_overview/fandom_기능명세_v0.1_20260722.md) <br> 📄 [fandom_PRD_v0.1_20260722.md](file:///Users/jmk/develop/fandom-conquest/docs/01_planning/01_overview/fandom_PRD_v0.1_20260722.md) | 영수증 OCR 인증 정책, 25개 구 점령전, 수호신 제도, 7일 쿨다운 등 비즈니스 로직 |

---

## 2. 📱 상세기획 기준 전체 화면 리스트 (총 38개 화면)

### 🔹 PART 1. User View App (26개 화면)
1. **Auth & Onboarding (6개)**: `UV-AUTH-00` 스플래시, `UV-AUTH-01` 소셜로그인 모달, `UV-AUTH-02` 약관 동의, `UV-AUTH-03` 프로필 설정, `UV-AUTH-04` 선호 팬덤 선택, `UV-AUTH-05` 가입 완료 웰컴 모달
2. **Main Map & Spot (5개)**: `UV-MAIN-01` 메인 지도, `UV-MAIN-02` 성지 상세 모달, `UV-MAIN-03` 주변 성지 바텀시트, `UV-MAIN-04` IP 팬덤 필터 시트, `UV-SPOT-04` 성지 제보 모달
3. **Verification (6개)**: `UV-VERIF-01` 영수증 촬영/선택, `UV-VERIF-02` AI OCR 스캐닝, `UV-VERIF-03` 인증 성공 피드백, `UV-VERIF-04` 수동 검수 대기, `UV-VERIF-05` 인증 반려 모달, `UV-SHARE-01` 점령 승리 공유 카드
4. **War Status & Leaderboard (3개)**: `UV-WAR-01` 영토 전황 보드, `UV-RANK-01` 랭킹 보드 메인, `UV-RANK-02` 개인 기여도 상세
5. **My Page & Settings (6개)**: `UV-MY-01` 마이 프로필 메인, `UV-MY-02` 선호 팬덤 관리, `UV-MY-03` 인증 내역 히스토리, `UV-NOTIF-01` 알림 센터, `UV-MY-05` 서비스 설정, `UV-MY-06` 알림 세부 설정

### 🔹 PART 2. Admin Back-Office (12개 화면)
1. **Auth & Dashboard (2개)**: `ADM-AUTH-01` 어드민 로그인, `ADM-DASH-01` 전황 & 운영 대시보드
2. **Spot Master (3개)**: `ADM-SPOT-01` 장소 가맹점 관리, `ADM-SPOT-02` 성지 핀 이벤트 관리, `ADM-SPOT-03` 유저 제보 승인 큐
3. **Verification OMS (3개)**: `ADM-VERIF-01` 인증 내역 테이블, `ADM-VERIF-02` 수동 검수 큐, `ADM-VERIF-03` 반려 사유 프리셋
4. **Anti-Abuse & Users (3개)**: `ADM-ABUSE-01` 이상 탐지 모니터링, `ADM-USER-01` 유저 목록 & 수동 제재, `ADM-USER-02` 자동 임시정지 검수 큐
5. **System (1개)**: `ADM-SYS-01` 팬덤 IP & 대표 컬러 관리

---

## 3. 📌 이용 가이드 및 권장 순서

1. 클로드 디자인 대화창에 아래 **`1단계: 메인 지도 & 성지 거점`** 프롬프트를 먼저 복사하여 전달합니다.
2. 1단계 디자인 시안과 디자인 시스템(컬러, 폰트, 버튼 토큰)이 확정되면 이어서 **2단계 ➔ 3단계 ➔ 4단계** 프롬프트를 순서대로 전달하여 38개 전체 화면의 디자인 퀄리티를 유지하며 완성합니다.

---

## 🚀 1단계: 메인 지도 & 성지 거점 (핵심 코어 화면 5개)

```markdown
[Role & Goal]
당신은 최고 수준의 K-POP 트렌디 웹/앱 UI/UX 디자이너입니다.
'팬덤 땅따먹기 (Fandom Conquest)' 서비스의 코어 화면인 [메인 지도 & 성지 거점] 그룹 5개 화면의 High-Fidelity UI 디자인 및 인터랙션을 제작해 주세요.

[Visual Identity & Tone & Manner]
- Theme: Cyberpunk Fandom Dark Mode (`#0B0E14`, `#121721`)
- Accent Neons: Electric Purple (`#9D4EDD`), Cyan Glow (`#00F5D4`), Hot Pink (`#FF007A`)
- Target Viewport: Mobile WebApp (390px ~ 430px)

[Target Screens to Design]
1. [UV-MAIN-01] 메인 성지 지도 (Home Map View)
   - 서울시 25개 구(區) GeoJSON 단위 팬덤 1위 대표 색상 40% 채색 폴리곤 (`fillOpacity: 0.4`)
   - 개별 성지 마커 핀 & D-Day 뱃지, 상단 선호 IP 토글 필터 시트버튼, 🔔 알림 아이콘
   - 하단 고정 Floating CTA: '[ 📸 땅 뺏어오기 ]' 및 주변 성지 스와이프 바텀시트 손잡이
2. [UV-MAIN-02] 성지 상세 모달 (Spot Detail Modal)
   - 히어로 이미지 슬라이더 (포스터/매장 전경, 🔍 전체화면 확대 뷰어 아이콘)
   - 팬덤별 실시간 점유율 프로그래스 바 (예: 뉴진스 60% vs 아이브 40%)
   - 탭 2종: [탭 1: 팬덤 기여 현황 (수호신 & Top 3 포디움)] / [탭 2: 과거 장소 히스토리 타임라인]
   - 하단 고정 CTA: '[ 📸 이 성지에 내 팬덤 기여하기 ]'
3. [UV-MAIN-03] 주변 성지 바텀시트 (Nearby Spots Sheet)
   - 3단 접이식 스와이프 바텀시트, 내 위치 반경 200m 성지 카드리스트 (거리, 현재 점령 팬덤 뱃지)
4. [UV-MAIN-04] IP 팬덤 필터 시트 (Fandom Filter Sheet)
   - 상단 내 선호 IP 칩 선택, 팬덤/아티스트 검색창 및 인기 팬덤 순위 리스트
5. [UV-SPOT-04] 유저 성지 제보 모달 (User Spot Proposal Modal)
   - 장소 유형(팝업/카페/이벤트), 귀속 팬덤 선택, 상호명, 카카오 주소 API 폼, 기간 픽커, 영수증/사진 첨부 UI

[Deliverables]
- 5개 화면 모바일 UI 목업 레이아웃 및 주요 컴포넌트(포디움, 프로그레스바, 지도 마커 핀) 스타일 가이드
```

---

## ⚡ 2단계: 영수증 AI OCR 인증 & 승리 공유 (인증 플로우 6개)

```markdown
[Role & Goal]
'팬덤 땅따먹기' 서비스의 핵심 게임화 요소인 [영수증 AI OCR 인증 & 결과/공유] 그룹 6개 화면을 디자인해 주세요.

[Visual Tone]
1단계에서 정립된 사이버펑크 네온 다크모드 스타일 유지, AI 비전 스캐닝 및 폭죽/승리 피드백 강조

[Target Screens to Design]
1. [UV-VERIF-01] 영수증 촬영/선택 (Camera & Photo Picker)
   - 카메라 뷰파인더 영수증 사각형 가이드 프레임, 갤러리 불러오기 버튼, 플래시 토글
2. [UV-VERIF-02] AI OCR 스캐닝 (AI OCR Scanning Progress)
   - 영수증 스캐닝 레이저 비전 애니메이션 UI, 4개 필드(사업자번호, 일시, 금액, 승인번호) 실시간 추출 파싱 파이프라인 피드백
3. [UV-VERIF-03] 인증 성공 피드백 (Verification Success Result)
   - 🎉 승인 폭죽 팝업 피드백: "인증 완료! 마포구 뉴진스 점유율이 +0.4% 상승했습니다!"
   - 획득 수호신/기여 뱃지 애니메이션, CTA: '[지도에서 내 땅 확인]' / '[승리 카드 공유]'
4. [UV-VERIF-04] 수동 검수 대기 시트 (Manual Review Pending Sheet)
   - ⏳ 검수 대기 캐릭터 프로필 카피: "10분 내로 관리자 확인 후 반영됩니다" 안내 보드
5. [UV-VERIF-05] 인증 반려 모달 (Verification Rejection Modal)
   - ⚠️ 반려 경고 아이콘, 반려 사유 텍스트(최신성 만료 7일 초과, 중복 영수증 등), CTA: '[다시 촬영하기]'
6. [UV-SHARE-01] 점령 승리 공유 카드 (Conquest Victory Share Card)
   - 닉네임, 역전된 구(區) 이름, 팬덤 비주얼 대표 로고, 점유율 상승 그래픽, 인스타그램 스토리/X 최적화 9:16 비율 카드 디자인

[Deliverables]
- 스캐닝 프로그레스 UI, 팝업 피드백, 9:16 SNS 공유 카드 High-Fidelity 목업
```

---

## 🏆 3단계: 전황 보드, 랭킹, 온보딩 & 마이페이지 (유저 뷰 15개)

```markdown
[Role & Goal]
'팬덤 땅따먹기' 서비스의 [영토 전황 보드, 랭킹, 온보딩 & 마이페이지] 유저 뷰 15개 화면을 디자인해 주세요.

[Target Screens to Design]
1. [UV-WAR-01] 영토 전황 보드 (Territory War Dashboard)
   - 서울시 25개 구 점령 현황 카토그램(Cartogram), 실시간 영토 뒤집힘 타임라인 로그, 치열한 ⚔️ 경합구 Top 3 카드리스트
2. [UV-RANK-01] 랭킹 보드 메인 & [UV-RANK-02] 개인 기여도 상세
   - 탭 2종: [누적 개인 랭킹] / [팬덤 영토 랭킹], Top 3 포디움 그래픽 UI
   - 개인 상세: 내 수호신 뱃지 수집함, 누적 인증 횟수, 주요 구별 기여 지분율 카드
3. [UV-AUTH-00 ~ 05] 온보딩 세트 (6개)
   - 스플래시(UV-AUTH-00), 소셜로그인 모달(UV-AUTH-01), 약관동의(UV-AUTH-02), 프로필 설정(UV-AUTH-03), 선호 팬덤 선택(UV-AUTH-04), 웰컴 모달(UV-AUTH-05)
4. [UV-MY-01 ~ 06] 마이페이지 & 알림 센터 (6개)
   - 마이 프로필 메인(UV-MY-01), 선호 팬덤 관리 7일 쿨다운 동의(UV-MY-02), 영수증 인증 내역 히스토리 탭 4종(UV-MY-03), 알림 센터(UV-NOTIF-01), 서비스 및 푸시 세부 설정(UV-MY-05, 06)

[Deliverables]
- 카토그램 전황 보드, 랭킹 포디움, 온보딩 흐름 UI 및 마이페이지 프로필 카드 목업
```

---

## 🛡️ 4단계: 어드민 백오피스 (Admin Back-Office 12개 화면)

```markdown
[Role & Goal]
'팬덤 땅따먹기' 운영자 및 관리자를 위한 [어드민 백오피스 (Desktop Viewport: 1440px 이상)] 12개 화면을 디자인해 주세요.

[Visual Tone & Layout]
- Desktop Dark Dashboard Theme (`#0F131C`, `#161B26`), 고대비 시각화 차트 & 좌/우 2분할 검수 레이아웃

[Target Screens to Design]
1. [ADM-DASH-01] 전황 & 운영 대시보드
   - 서울 25개 구 카토그램 현황, 실시간 뒤집힘 로그, 일간 승인/검수/반려 건수 (DAU/인증 지표 차트)
2. [ADM-VERIF-02] 영수증 수동 검수 큐 (Manual Review Queue)
   - 좌/우 2분할 뷰: (좌측) 원본 영수증 캡처 이미지 vs (우측) AI OCR 파싱 4개 필드값 & 최신성/GPS 대조 판정 레이아웃
   - CTA: '[승인 확정 (+0.4%)]' 및 '[반려 사유 선택]' 팝오버
3. [ADM-SPOT-03] 유저 제보 성지 승인 큐 (User Spot Proposal Queue)
   - 좌/우 2분할 뷰: (좌측) 유저 제보 폼 상세 내용 vs (우측) 카카오/구글 지오코딩 및 사업자등록번호 정합성 대조
4. [ADM-ABUSE-01 / ADM-USER-02] 이상 탐지 모니터링 & 자동 임시정지 검수 큐
   - 10분간 인증 급증 핫스팟 경고 그래프, 동일 IP 다계정 제출 감시 및 유저 수동 제재 팝업
5. [ADM-SPOT-01, 02 / ADM-SYS-01, 02] 성지/가맹점 마스터 관리 및 팬덤 IP 대표 컬러 지정 관리 폼

[Deliverables]
- Desktop 1440px+ 기준 어드민 2분할 검수 레이아웃 및 대시보드 카토그램 UI 목업
```

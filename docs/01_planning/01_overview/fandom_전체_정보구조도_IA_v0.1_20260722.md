# 팬덤 땅따먹기 상세기획 — 전체 통합 정보구조도 (Full System Information Architecture)

> 본 문서는 '팬덤 땅따먹기' 전체 시스템(**User View App 및 Admin Back-Office**)의 **통합 정보 구조도(IA Tree), 메뉴 계층, 화면 ID(총 39개) 및 화면별 주요 UI 요소·동작 명세**를 다루는 상위 마스터 개요 문서이다.
> 
> 🔗 **관련 문서**: [fandom_핵심정책_v0.1_20260722.md](file:///Users/jmk/develop/fandom-conquest/docs/01_planning/01_overview/fandom_핵심정책_v0.1_20260722.md) | [fandom_추후개선_로드맵_v0.1_20260722.md](file:///Users/jmk/develop/fandom-conquest/docs/01_planning/01_overview/fandom_추후개선_로드맵_v0.1_20260722.md)

---

## 1. 전체 통합 정보 구조도 (Full Integrated IA Tree)

```
Fandom Conquest System
├── 📱 PART 1. User View App (유저 전용 웹/앱)
│   ├── 1.0 Auth & Onboarding (인증 및 온보딩)
│   │   ├── 1.1 스플래시 (Splash Screen) [UV-AUTH-00]
│   │   ├── 1.2 소셜 로그인 모달 (Social Login Modal) [UV-AUTH-01]
│   │   ├── 1.3 약관 동의 (Terms & LBS Agreement) [UV-AUTH-02]
│   │   ├── 1.4 프로필 설정 (Profile & Nickname Setup) [UV-AUTH-03]
│   │   ├── 1.5 선호 팬덤 선택 (Fandom Preference Selection) [UV-AUTH-04]
│   │   └── 1.6 가입 완료 웰컴 모달 (Welcome Celebration Modal) [UV-AUTH-05]
│   │
│   ├── 2.0 Main Map & Spot (성지 지도 및 거점)
│   │   ├── 2.1 메인 지도 (Home Map View) [UV-MAIN-01]
│   │   ├── 2.2 성지 상세 모달 (Spot Detail Modal) [UV-MAIN-02]
│   │   ├── 2.3 주변 성지 바텀시트 (Nearby Spots Sheet) [UV-MAIN-03]
│   │   ├── 2.4 IP 팬덤 필터 바텀시트 (Fandom Filter Sheet) [UV-MAIN-04]
│   │   └── 2.5 성지 제보 모달 (User Spot Proposal Modal) [UV-SPOT-04]
│   │
│   ├── 3.0 Verification (영수증 인증 플로우)
│   │   ├── 3.1 영수증 촬영/선택 (Camera & Photo Picker) [UV-VERIF-01]
│   │   ├── 3.2 AI OCR 스캐닝 (AI OCR Scanning Progress) [UV-VERIF-02]
│   │   ├── 3.3 인증 성공 피드백 (Verification Success Result) [UV-VERIF-03]
│   │   ├── 3.4 수동 검수 대기 (Manual Review Pending Sheet) [UV-VERIF-04]
│   │   ├── 3.5 인증 반려 모달 (Verification Rejection Modal) [UV-VERIF-05]
│   │   └── 3.6 점령 승리 공유 카드 (Conquest Victory Share Card) [UV-SHARE-01]
│   │
│   ├── 4.0 War Status & Leaderboard (전황 및 랭킹)
│   │   ├── 4.1 영토 전황 보드 (Territory War Dashboard) [UV-WAR-01]
│   │   ├── 4.2 랭킹 보드 메인 (Leaderboard Main) [UV-RANK-01]
│   │   └── 4.3 개인 기여도 상세 (My Territory Contribution Detail) [UV-RANK-02]
│   │
│   └── 5.0 My Page & Settings (마이페이지 및 설정)
│       ├── 5.1 마이 프로필 메인 (My Profile Main) [UV-MY-01]
│       ├── 5.2 선호 팬덤 관리 (Edit Fandom Preferences) [UV-MY-02]
│       ├── 5.3 인증 내역 히스토리 (Verification Log History) [UV-MY-03]
│       ├── 5.4 알림 센터 (Notification Center) [UV-NOTIF-01]
│       ├── 5.5 서비스 설정 (App Settings & i18n) [UV-MY-05]
│       └── 5.6 알림 설정 화면 (Notification Preferences) [UV-MY-06]
│
└── 🛡️ PART 2. Admin Back-Office (백오피스 어드민)
    ├── 6.0 Auth (어드민 인증) [ADM-SYS-03] (어드민 보안 로그인 `/login`)
    ├── 7.0 Dashboard (전황 & 운영 대시보드) [ADM-DASH-01]
    ├── 8.0 Fandom IP & Brand Master (팬덤 IP & 대표 컬러 브랜드 관리)
    │   ├── 8.1 팬덤 IP 브랜드 마스터 (3계층/장르/HEX컬러) [ADM-IP-01]
    │   └── 8.2 유저 신규 팬덤 신청 전용 심사 수신함 [ADM-IP-REQUEST-01]
    ├── 9.0 Spot Master (거점 & 성지 관리)
    │   ├── 9.1 장소 가맹점 관리 (Place Management) [ADM-SPOT-01]
    │   ├── 9.2 성지 핀 이벤트 관리 (Spot Management) [ADM-SPOT-02]
    │   └── 9.3 유저 제보 성지 승인 큐 (User Spot Proposal Queue) [ADM-SPOT-03]
    ├── 10.0 Verification Management (영수증 인증 검수 관리)

    │   ├── 10.1 인증 내역 테이블 (Verification Data Table) [ADM-VERIF-01]
    │   ├── 10.2 수동 검수 큐 (Manual Review Queue) [ADM-VERIF-02]
    │   └── 10.3 반려 사유 관리 (Rejection Preset Management) [ADM-VERIF-03]
    ├── 11.0 User & Abuse Monitoring (유저 관리 및 어뷰징 모니터링)
    │   ├── 11.1 유저 목록 & PII 마스킹 관리 (User Management) [ADM-USER-01]
    │   ├── 11.2 디폴트 캐릭터/아바타 관리 [ADM-USER-02]
    │   ├── 11.3 실시간 어뷰징 탐지 모니터링 대시보드 [ADM-ABUSE-01]
    │   ├── 11.4 제재 유저 목록 & 몰수 관리 [ADM-SANCTION-01]
    │   └── 11.5 유저 인앱 소명 심사 큐 [ADM-SANCTION-02]
    ├── 12.0 Push & Notification (푸시 및 알림 관리)
    │   ├── 12.1 푸시 발송 & 템플릿 관리 [ADM-PUSH-01]
    │   └── 12.2 발송 이력 및 수신 통계 [ADM-PUSH-02]
    └── 13.0 System & Global Settings (시스템 설정)
        ├── 13.1 공통 금칙어 관리 [ADM-SYSTEM-01]
        └── 13.2 어드민 계정 & 권한 관리 [ADM-SYS-02]
```

---

## 2. PART 1. User View 화면별 세부 기능 명세 (26개 화면)

(기존 User View 명세 유지)

---

## 3. PART 2. Admin Back-Office 화면별 세부 기능 명세 (13개 화면)

| 화면 ID | 화면명 | 메뉴 위치 | 주요 UI 구성요소 | 주요 동작 및 인터랙션 |
| :--- | :--- | :--- | :--- | :--- |
| **`ADM-SYS-03`** | 어드민 보안 로그인 | `/login` | 이메일, 비밀번호, 2FA OTP 입력 폼 | 백오피스 로그인, 60분 세션 발급, 5회 실패 계정 잠금 |
| **`ADM-DASH-01`** | 전황 & 운영 대시보드 | `1.0 Dashboard` | 서울 25개 구 점령 카토그램, 실시간 뒤집힘 타임라인, DAU KPI | 운영 핵심 KPI 및 실시간 뒤집힘 현황 모니터링 |
| **`ADM-SPOT-01`** | 장소 가맹점 관리 | `2.1 Spot Master` | 사업자등록번호(10자리), 상호명, 주소 API, 좌표 지오코딩 | 가맹점 등록/수정, 폐업 매장 변경 시 인증 하드 차단 |
| **`ADM-SPOT-02`** | 성지 핀 이벤트 관리 | `2.2 Spot Master` | 연동 장소, 귀속 팬덤, 이벤트 타이틀, 운영 기간 픽커 | 지도 성지 마커 생성/수정, 자정 후 자동 `ARCHIVED` |
| **`ADM-SPOT-03`** | 유저 제보 승인 큐 | `2.3 Spot Master` | 좌/우 2분할 뷰 (좌: 제보 폼 / 우: 지오코딩 & 사업자번호 대조) | 유저 제보 검토 후 `[정식 핀 승인]` 또는 `[제보 반려]` |
| **`ADM-VERIF-01`** | 인증 내역 데이터 테이블 | `3.1 Verification` | 탭 4종(전체/자동승인/수동검수/최종반려), 엑셀/CSV 추출 | 전체 영수증 인증 로그 조회 및 엑셀 다운로드 |

| **`ADM-VERIF-02`** | 수동 검수 큐 | `3.2 Verification` | 좌/우 2분할 뷰 (좌: 원본 영수증 캡처 / 우: AI OCR 판정값) | 단축키(`Space`/`R`)로 `[승인 (+0.4%)]` 또는 `[반려]` 처리 |
| **`ADM-VERIF-03`** | 반려 사유 프리셋 | `3.3 Verification` | 반려 사유 코드(`REJ-01`~`05`) 및 유저 알림 템플릿 | 영수증 반려 사유 템플릿 등록 및 수정 |
| **`ADM-ABUSE-01`** | 이상 탐지 모니터링 | `4.1 Anti-Abuse` | 10분간 인증 급증 핫스팟 경고, 동일 IP 다계정 탐지 | 실시간 어뷰징 징후 탐지 및 자동 임시정지 감시 |
| **`ADM-USER-01`** | 유저 목록 & 수동 제재 | `4.2 Anti-Abuse` | 유저 닉네임 검색, 3단계 제재 수위 선택 모달 | 어뷰징 유저 조회 및 `[블랙회원 수동 지정]` 제재 처리 |
| **`ADM-USER-02`** | 자동 정지 & 소명 관리 | `4.3 Anti-Abuse` | 자동 정지 계정 리스트, 유저 인앱 소명 제출건 심사 | 운영자 심사 후 `[소명 인용 - ACTIVE]` 또는 `[기각]` |
| **`ADM-IP-01`** | 팬덤 IP & 브랜드 마스터 | `5.0 Fandom IP` | 팬덤 이름, 대표 아티스트, Primary Hex Color 픽커, 가중치 | 팬덤 팀 추가/수정, 고유 색상 지정 및 대비(4.5:1) 검수 |
| **`ADM-SYS-02`** | 어드민 계정 관리 | `6.0 System IAM` | 백오피스 운영자 리스트, `[➕ 신규 운영자 발급]` 모달 | 최고 관리자가 운영자 발급 및 RBAC 권한 매트릭스 지정 |

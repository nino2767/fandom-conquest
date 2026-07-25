# 팬덤 땅따먹기 상세기획 — 어드민 장소 및 성지 관리 (v0.2)

> **문서 버전**: v0.2  
> **최종 수정일**: 2026-07-23  
> **문서 상태**: Approved Spec  
> **관련 화면 ID**: `ADM-PLACE-01` (장소 마스터), `ADM-SPOT-01` (성지 핀 이벤트 관리), `ADM-SPOT-03` (유저 제보 승인 큐)  
> **관련 User View**: `UV-SPOT-04` (유저 성지 제보 모달), `UV-MAIN-01` (메인 지도), `UV-MAIN-02` (성지 상세)

---

## 1. 개요 및 메뉴 분리 구조 (Menu & Domain Separation)

본 시스템은 오프라인 원천 장소 DB를 관리하는 **`[장소 마스터 Place]`**와, 특정 장소 위에 팬덤 IP 이벤트 핀을 스케줄링하는 **`[성지 핀 관리 Spot]`**을 업무 가독성과 실수 방지를 위해 명확히 2개의 메뉴로 분리 운영한다.

```
🛡️ 어드민 메뉴 구조
├── 📌 거점 & 성지 관리 (그룹)
│   ├── [ADM-PLACE-01] 장소 마스터   ➔ 카카오/구글 장소 원천 DB, 국세청 사업자 폐업 관리
│   ├── [ADM-SPOT-01]  성지 핀 관리  ➔ 팬덤 IP 연동 이벤트 핀 스케줄링 (시작/종료일, 마커 On/Off)
│   └── [ADM-SPOT-03]  유저 제보 승인 ➔ 유저 제보 2분할 대조 심사
```

---

## 2. [ADM-PLACE-01] 장소 마스터 관리 (`/place-master`)

오프라인에 실존하는 매장/장소의 원천 데이터베이스를 관리하는 독립 메뉴이다.

### 2.1 주요 기능 및 구글/카카오 장소 연동 등록
- **구글 / 카카오 지도 API 연동 검색 팝업**: 키워드로 장소 검색 시 `place_name`, `address`, `lat`, `lng` 파싱 ➔ `places` 테이블 내부 영구 적재 (비용 최적화)
- **국세청 사업자 상태 대조**: 사업자등록번호 10자리 조회 ➔ 폐업 시 `business_status = PERMANENT_CLOSED` 처리 및 영수증 인증 **하드 차단 🔒**

#### 데이터 필드 명세 (Place Table Schema)
| 필드명 | DB 컬럼명 | 데이터 타입 | 필수 여부 | 설명 |
| :--- | :--- | :--- | :---: | :--- |
| **장소 ID** | `place_id` | String(UUID) | PK | 장소 고유 식별 키 (예: `PLC-00124`) |
| **상호명** | `place_name` | String(100) | 필수 | 오프라인 정식 상호명 |
| **사업자등록번호**| `biz_number` | String(10) | 필수 | 국세청 연동 10자리 번호 |
| **도로명 주소** | `address` | String(255) | 필수 | 표준 주소 규격 |
| **위도 (Lat)** | `lat` | Decimal(10,7)| 필수 | 좌표 데이터 |
| **경도 (Lng)** | `lng` | Decimal(10,7)| 필수 | 좌표 데이터 |
| **영업 상태** | `status` | Enum | 필수 | `ACTIVE` / `TEMPORARY_CLOSED` / `PERMANENT_CLOSED` |

---

## 3. [ADM-SPOT-01] 성지 핀 관리 (`/spot-master`)

등록된 장소(`place_id`)를 기반으로 팬덤 IP 마커 핀을 꽂고 이벤트를 스케줄링하는 독립 메뉴이다.

### 3.1 주요 기능 명세
- **성지 핀 이벤트 등록**: 연동 장소 선택 ➔ 귀속 팬덤 IP 지정 ➔ 운영 기간(`start_date` ~ `end_date`) 지정 ➔ 지도 마커 핀 즉시 생성
- **자정 스케줄러**: 이벤트 마감 자정 경과 시 `status = ARCHIVED`로 자동 전환되어 지도 노출 해제

#### 데이터 필드 명세 (Spot Event Table Schema)
| 필드명 | DB 컬럼명 | 데이터 타입 | 필수 여부 | 설명 |
| :--- | :--- | :--- | :---: | :--- |
| **성지 핀 ID** | `spot_id` | String(UUID) | PK | 성지 핀 고유 키 (예: `SPOT-001`) |
| **연동 장소 ID** | `place_id` | String | FK | `places` 테이블 외래키 |
| **성지 타이틀** | `spot_title` | String(100) | 필수 | 예: "안유진 생일 기념 생카" |
| **귀속 팬덤 IP** | `fandom_id` | String | FK | 점령 기여분이 부여될 팬덤 |
| **운영 기간** | `start_date` ~ `end_date` | Date | 필수 | 핀 노출 활성화 기간 |
| **핀 상태** | `status` | Enum | 필수 | `ONGOING` (운영중) / `ENDING_SOON` / `ARCHIVED` |

---

## 4. [ADM-SPOT-03] 유저 제보 성지 승인 큐 (`/spot-approval`)

유저가 앱에서 제보한 건을 심사하여 승인 시 `Place` 및 `Spot` 핀 생성을 자동 실행하는 화면.

---

## 5. 백엔드 REST API 명세 (API Specifications)

### 5.1 장소 마스터 목록 조회 API
- **Endpoint**: `GET /api/v1/admin/places`
- **Query Params**: `search=투썸&status=ACTIVE&page=1&limit=20`

### 5.2 성지 핀 목록 조회 API
- **Endpoint**: `GET /api/v1/admin/spots`
- **Query Params**: `fandom_id=FANDOM-01&status=ONGOING`

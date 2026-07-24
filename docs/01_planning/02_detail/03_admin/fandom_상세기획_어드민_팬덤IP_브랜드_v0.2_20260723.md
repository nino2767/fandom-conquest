# 팬덤 땅따먹기 상세기획 — 어드민 팬덤 IP & 브랜드 마스터 (v0.2)

> **문서 버전**: v0.2  
> **최종 수정일**: 2026-07-23  
> **문서 상태**: Approved Spec  
> **관련 화면 ID**: `ADM-SYS-01` / `ADM-IP-01` (팬덤 IP & 대표 컬러 브랜드 관리)  
> **관련 User View**: `UV-AUTH-04` (선호 팬덤 선택), `UV-MAIN-04` (IP 팬덤 필터 바텀시트)

---

## 1. 개요 및 비즈니스 목적

본 문서는 '팬덤 땅따먹기' 서비스의 **핵심 자산인 팬덤 브랜드 IP(Artist/Fandom Brand Master), 지도 채색용 대표 식별 컬러(HEX Token), 다국어 이명/별칭 매핑 데이터 및 점령 가중치 배율**의 관리 스펙을 다룬다.

---

## 2. 화면 세부 구성 및 데이터 필드 명세

### 2.1 [ADM-IP-01] 팬덤 IP 브랜드 마스터 관리 (`/fandom-ip`)

서비스에 등록되는 전체 아티스트/팬덤 팀 정보 및 지도/마커 채색용 표준 컬러 토큰 관리 화면.

```
+-------------------------------------------------------------------------+
| 팬덤 IP & 브랜드 관리                                [ + 팬덤 IP 신규 등록 ]|
+-------------------------------------------------------------------------+
| ID        | 팬덤 IP 명칭       | 소속사         | 대표 컬러 | 가중치 | 성지 수|
|-----------|------------------|----------------|----------|--------|--------|
| FANDOM-01 | 뉴진스 (NewJeans) | 어도어         | ■ #2F6BFF| 1.2x   | 48곳   |
| FANDOM-02 | 에스파 (aespa)    | SM엔터테인먼트 | ■ #E64980| 1.0x   | 35곳   |
| FANDOM-03 | 아이브 (IVE)      | 스타쉽엔터     | ■ #F59F00| 1.0x   | 29곳   |
| FANDOM-04 | 세븐틴 (SEVENTEEN)| 플레디스       | ■ #A9C4FF| 1.1x   | 22곳   |
+-------------------------------------------------------------------------+
```

#### 데이터 필드 명세 (Data Field Schema)
| 필드명 | DB 컬럼명 | 데이터 타입 | 필수 여부 | 유효성 검사 & 제약 룰 | 설명 |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **팬덤 IP ID** | `fandom_id` | String(20) | PK | `FANDOM-##` 포맷팅 | 팬덤 고유 식별 키 (예: `FANDOM-01`) |
| **팬덤 IP 명칭** | `fandom_name` | String(50) | 필수 | 최대 50자 | 정식 표기명 (예: "뉴진스") |
| **영문/다국어명** | `fandom_en_name` | String(50) | 필수 | 영문 알파벳 | 예: "NewJeans" |
| **아티스트/그룹명**| `artist_name` | String(50) | 필수 | 최대 50자 | 예: "NewJeans (어도어)" |
| **소속 기획사** | `agency` | String(50) | 필수 | 최대 50자 | 예: "어도어 (ADOR)" |
| **대표 식별 컬러** | `primary_color` | String(7) | 필수 | HEX Color (`#2F6BFF`) | 지도 25구 및 성지 핀 표준 채색 |
| **컬러 대비비** | `contrast_ratio`| Decimal(3,1)| 필수 | `≥ 4.5:1` (WCAG 2.1 AA) | 흰색 텍스트와의 시각 가시성 검수 |
| **점령 가중치 배율**| `weight_mult` | Decimal(3,2)| 필수 | `1.00` ~ `2.00` (기본 `1.00`) | 신규/이벤트 시즌 점유율 배율 |
| **활성 성지 핀 수**| `active_spots` | Integer | Readonly | System Aggregated | 해당 팬덤이 귀속된 활성 성지 수 |

---

## 3. 백엔드 REST API 명세 (API Specifications)

### 3.1 팬덤 IP 브랜드 목록 조회 API
- **Endpoint**: `GET /api/v1/admin/fandoms`
- **Response**:
```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "fandom_id": "FANDOM-01",
        "fandom_name": "뉴진스 (NewJeans)",
        "agency": "어도어",
        "primary_color": "#2f6bff",
        "weight_mult": 1.2,
        "active_spots": 48
      }
    ]
  }
}
```

### 3.2 팬덤 IP 정보 및 브랜드 컬러 수정 API
- **Endpoint**: `PATCH /api/v1/admin/fandoms/{fandom_id}`
- **Request Body**:
```json
{
  "primary_color": "#2F6BFF",
  "weight_mult": 1.2,
  "agency": "어도어"
}
```

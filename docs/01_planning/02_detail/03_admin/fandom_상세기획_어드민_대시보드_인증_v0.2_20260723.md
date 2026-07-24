# 팬덤 땅따먹기 상세기획 — 어드민 전황 & 운영 대시보드 (v0.2)

> **문서 버전**: v0.2  
> **최종 수정일**: 2026-07-23  
> **문서 상태**: Approved Spec  
> **관련 화면 ID**: `ADM-DASH-01` (전황 & 운영 대시보드)  
> **관련 User View**: `UV-WAR-01` (영토 전황 보드), `UV-MAIN-01` (메인 지도)

---

## 1. 개요 및 비즈니스 목적

본 문서는 '팬덤 땅따먹기' 백오피스 어드민의 **전황 & 운영 메인 대시보드(`ADM-DASH-01`)**의 데이터 집계 알고리즘, 서울 25구 카토그램 시각화 채색 수식, 실시간 뒤집힘(Overturn) 이벤트 파이프라인 및 핵심 운영 KPI 명세를 정의한다.

---

## 2. 화면 세부 구성 및 데이터 필드 명세

### 2.1 상단 KPI 요약 카드리스트 (Summary KPI Cards)

| KPI 지표명 | 집계 로직 & 산정 수식 | 데이터 갱신 주기 | 화면 표기 방식 | 비고 |
| :--- | :--- | :---: | :--- | :--- |
| **DAU (일간 활성 유저)** | 금일 `00:00 KST` 이후 앱 접속 유저 Distinct Count | 1분 | `12,480` (▲ 8.2% vs 어제) | 전일 동시간대 대비 비교 |
| **오늘 인증 시도** | 금일 제출된 전체 영수증 인증 시도 건수 | 실시간 | `3,214` (▲ 12.4%) | 성공/실패 포함 전체 |
| **자동 승인율** | $\frac{\text{Count}(\text{AUTO\_APPROVED})}{\text{Count}(\text{TOTAL\_SUBMIT})} \times 100$ | 5분 | `92.8%` | 목표 기준 90% 이상 |
| **수동 검수 대기** | `PENDING` 상태 영수증 큐 적재 건수 | 실시간 | `24`건 (평균 처리 4.2분) | 10건 이상 시 검정 강조 |
| **반려율** | $\frac{\text{Count}(\text{REJECTED})}{\text{Count}(\text{TOTAL\_SUBMIT})} \times 100$ | 5분 | `209`건 (6.5%) | 주요 사유: 중복 52%, 만료 31% |

---

### 2.2 서울 25구 점령 카토그램 (Seoul Cartogram Visualization)

서울시 25개 구(區)의 팬덤별 점령 상태와 지분율 격차를 모노톤 및 대표 컬러로 시각화한다.

```
+-------------------------------------------------------------------------+
| 서울 25구 점령 카토그램                                                  |
| ■ 뉴진스 8  ■ 에스파 7  ■ 아이브 5  ·  ⚔️ 경합 3  ·  중립 2              |
|                                                                         |
|  [52 은평]  [58 강북]  [49 노원⚔️]  [53 중랑]                            |
|  [63 마포]  [55 성북]  [67 성동🔥]  [51 광진]                            |
|  [51 강서]  [50 관악⚔️]  [61 강남]  [– 중립]                            |
|                                                                         |
| * 채도 = 1위 점유율 격차  * 검정 테두리 = 금일 뒤집힘  * 점선 = 경합      |
+-------------------------------------------------------------------------+
```

#### 점유율 격차 기반 채도 산정 수식 (Opacity Formula)
1위 팬덤 점유율 $S_1$과 2위 팬덤 점유율 $S_2$의 격차 $\Delta S = S_1 - S_2$ (%p)에 따라 타일의 HSL 알파/채도 값을 적용한다.

$$\text{Alpha}(\Delta S) = \begin{cases} 
0.35 & (0.0 < \Delta S \le 5.0\%p \quad \Rightarrow \text{경합 ⚔️}) \\
0.65 & (5.0\%p < \Delta S \le 15.0\%p) \\
1.00 & (\Delta S > 15.0\%p \quad \Rightarrow \text{독점 우세}) 
\end{cases}$$

- **검정 테두리 강조 (`box-shadow: 0 0 0 2px #111`)**: 최근 24시간 이내 1위 팬덤이 바뀌어 뒤집힘(Overturn)이 발생한 구
- **점선 테두리 (`border: 1.5px dashed #111`)**: 1위와 2위 간 격차가 $5\%p$ 미만인 **치열한 경합구 (⚔️)**

---

### 2.3 실시간 뒤집힘 타임라인 로그 (Real-Time Overturn Event Logs)

구(區) 단위 점령 주인이 바뀌는 실시간 역전 이벤트를 웹소켓(`wss://api.fandom.app/ws/events`)으로 수신하여 표출한다.

#### 로그 수신 데이터 구조 (Websocket Event Payload)
```json
{
  "event_type": "TERRITORY_OVERTURN",
  "district_name": "성동구",
  "previous_fandom_id": "FANDOM-02",
  "new_fandom_id": "FANDOM-01",
  "trigger_user_id": "usr_82fd",
  "verification_id": "VERIF-0722-042",
  "current_share_gap_percent": 1.2,
  "timestamp": "2026-07-23T14:30:00Z"
}
```

---

## 3. 백엔드 REST API 명세 (API Specifications)

### 대시보드 KPI 및 카토그램 집계 API
- **Endpoint**: `GET /api/v1/admin/dashboard/summary`
- **Response**:
```json
{
  "status": "success",
  "data": {
    "kpi": {
      "dau": 12480,
      "dau_change_pct": 8.2,
      "today_attempts": 3214,
      "auto_approval_rate": 92.8,
      "pending_manual_count": 24,
      "avg_processing_time_min": 4.2
    },
    "cartogram": [
      {
        "district_name": "성동구",
        "top_fandom_id": "FANDOM-01",
        "top_fandom_color": "#2f6bff",
        "top_share_percent": 67.2,
        "second_share_percent": 66.0,
        "gap_percent": 1.2,
        "is_contested": true,
        "is_overturned_today": true
      }
    ]
  }
}
```

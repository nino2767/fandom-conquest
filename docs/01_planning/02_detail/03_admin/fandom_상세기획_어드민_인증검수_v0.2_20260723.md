# 팬덤 땅따먹기 상세기획 — 어드민 영수증 인증 검수 시스템 (v0.2)

> **문서 버전**: v0.2  
> **최종 수정일**: 2026-07-23  
> **문서 상태**: Approved Spec  
> **관련 화면 ID**: `ADM-VERIF-01` (인증 내역 데이터 테이블), `ADM-VERIF-02` (수동 검수 큐), `ADM-VERIF-03` (반려 사유 프리셋 관리)  
> **관련 User View**: `UV-VERIF-01` (촬영), `UV-VERIF-02` (AI OCR), `UV-VERIF-04` (수동대기), `UV-VERIF-05` (반려모달)

---

## 1. 개요 및 비즈니스 목적

본 문서는 '팬덤 땅따먹기' 백오피스 어드민의 **영수증 인증 내역 관리 데이터 테이블, AI OCR 비전 파싱 판정 룰 엔진, 수동 검수 큐 SOP 및 반려 템플릿 관리**의 정밀 명세를 다룬다.
어드민 운영자는 AI OCR 자동 승인 룰을 통과하지 못한 영수증 제출건을 **좌/우 2분할 UI와 키보드 단축키(Space/R)**를 활용하여 건당 5초 이내 초고속으로 검수 판정한다.

---

## 2. 화면별 세부 기능 및 데이터 필드 명세

### 2.1 [ADM-VERIF-01] 인증 내역 통합 데이터 테이블 (Verification Data Table)

접수된 모든 영수증 인증 시도 건을 통합 조회하고 엑셀/CSV로 내보내는 화면이다.

#### 데이터 필드 명세 (Data Field Schema)
| 필드명 | DB 컬럼명 | 데이터 타입 | 필수 여부 | 유효성 검사 & 제약 룰 | 설명 |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **인증 승인 ID** | `verification_id`| String (UUID) | PK | System Generated | 인증 건 고유 식별자 (예: `VERIF-0722-042`) |
| **제출 유저 ID** | `user_id` | String | FK | 가입 유저 외래키 | 영수증을 제출한 유저 계정 |
| **성지 핀 ID** | `spot_id` | String | FK | 활성 성지 핀 외래키 | 인증 시도 대상 성지 |
| **영수증 승인번호** | `approval_number` | String(20) | 필수 | 영수증 승인번호 파싱값 | 중복 인증 방지 식별 키 |
| **AI OCR 신뢰도** | `ocr_confidence` | Decimal(5,2) | 필수 | `0.00%` ~ `100.00%` | Vision OCR 파싱 앙상블 신뢰도 |
| **결제 금액** | `amount` | Integer | 필수 | `≥ 3,000` 원 | 결제 인정 최소 금액 |
| **인증 처리 상태** | `status` | Enum | 필수 | `AUTO_APPROVED` / `MANUAL_APPROVED` / `PENDING` / `REJECTED` | 인증 최종 상태 |
| **반려 사유 코드** | `reject_code` | String(10) | 조건부 | `REJ-01` ~ `REJ-05` | `status == REJECTED` 시 필수 |
| **제출 시각** | `submitted_at` | Timestamp | 필수 | Current Timestamp | 인증 버튼 클릭 시각 |

---

### 2.2 [ADM-VERIF-02] 수동 검수 큐 & AI OCR 파싱 판정 룰 (Manual Review Queue)

AI OCR 파싱 판정 룰을 통과하지 못한 건을 **좌/우 2분할 대조 UI**로 운영자가 빠른 수동 심사한다.

```
+------------------------------------+------------------------------------+
|  [좌측: 제출 영수증 원본 캡처]     |  [우측: AI OCR 4개 필드 & 판정]   |
|                                    |  • 매장명: 투썸플레이스 성수역점   |
|   +----------------------------+   |    └ 텍스트 유사도 98.4% [✓ 일치] |
|   |  영수증 원본 이미지        |   |  • 결제일시: 2026-07-22 14:15:20   |
|   |  - 100% 원본 캡처          |   |    └ 최신성: 24h 이내 [✓ 통과]     |
|   |  - 이미지 확대/조동 지원   |   |  • 상권/주소: 성동구 성수동2가    |
|   |                            |   |    └ GPS 지오펜스: 12m [✓ 통과]   |
|   +----------------------------+   |  • 결제금액: 14,500원              |
|                                    |    └ 최소 금액 기준 3,000원 [✓]    |
|                                    |  --------------------------------  |
|                                    |  [반려 사유 선택 (R)]             |
|                                    |  [승인 확정 (Space)]              |
+------------------------------------+------------------------------------+
```

#### AI OCR 4개 필드 자동 판정 룰 알고리즘 (Decision Rules)
1. **상호명 텍스트 유사도 (Levenshtein Distance)**:
   $$\text{Similarity} = \left(1 - \frac{\text{Levenshtein}(S_{\text{OCR}}, S_{\text{Spot}})}{\max(|S_{\text{OCR}}|, |S_{\text{Spot}}|)}\right) \times 100$$
   - $\text{Similarity} \ge 85\%$: `[일치 ✓]` (자동 통과 조건)
   - $\text{Similarity} < 85\%$: `[수동 검수 큐 이관 ⚠️]`
2. **결제 시각 최신성 검증 (Time Validity Window)**:
   - 일반 가맹점/상설형: 제출 시각 기준 **24시간 이내** (`$T_{\text{Submit}} - T_{\text{Receipt}} \le 24\text{h}$`)
   - 이벤트형 성지 (생일카페/팝업): 이벤트 기간 내 결제 영수증 허용 (**최대 72시간**)
3. **GPS 반경 지오펜싱 (Geofencing Range)**:
   - 제출 위치와 성지 좌표 간 거리 $D$:
     - $D \le 10\text{m}$: `[자동 승인 ✓]`
     - $10\text{m} < D \le 200\text{m}$: `[수동 검수 큐 이관 ⚠️]`
     - $D > 200\text{m}$: `[위치 오차 초과 자동 반려 ❌]` (`REJ-04`)

#### 수동 검수 SOP 키보드 단축키
- `Space Bar`: 현재 영수증 **[승인 확정]** ➔ 구 점유율 `+0.4%p` 즉시 반영 ➔ 다음 큐 자동 이동
- `R`: **[반려 사유 팝오버 오픈]** ➔ 사유 선택 후 `Enter` 누르면 반려 확정
- `← / →`: 이전 / 다음 큐 항목 이동

---

### 2.3 [ADM-VERIF-03] 반려 사유 프리셋 관리 (Rejection Preset Management)

반려 처리 시 유저에게 전송될 알림 푸시 메시지 및 인앱 모달(`UV-VERIF-05`) 표준 템플릿 관리.

---

## 3. 백엔드 REST API 명세 (API Specifications)

### 3.1 수동 검수 큐 항목 승인 처리 API
- **Endpoint**: `POST /api/v1/admin/verifications/{verification_id}/approve`

### 3.2 수동 검수 큐 항목 반려 처리 API
- **Endpoint**: `POST /api/v1/admin/verifications/{verification_id}/reject`

---

## 4. 예외 처리 & 에러 코드 정의 (Error Handling)

| 에러 코드 | HTTP Status | 메시지 | 원인 및 조치 |
| :--- | :---: | :--- | :--- |
| `ERR_ALREADY_PROCESSED` | 409 | "이미 다른 운영자에 의해 검수 처리된 건입니다." | 다음 큐 항목 자동 갱신 |
| `ERR_OCR_SERVICE_TIMEOUT` | 503 | "AI OCR 비전 파싱 엔진 응답 지연입니다." | 재시도 또는 수동 파싱 처리 |

---

## 5. 권한 매트릭스 (Permission Matrix)

| 기능 / 화면 | 최고 관리자 (`SUPER_ADMIN`) | 일반 운영자 (`OPERATOR`) |
| :--- | :---: | :---: |
| 영수증 수동 승인 / 반려 (`ADM-VERIF-02`) | O | O |
| 인증 내역 CSV Export (`ADM-VERIF-01`) | O | O |
| 반려 사유 템플릿 수정 (`ADM-VERIF-03`) | O | X (슈퍼 승인 필요) |

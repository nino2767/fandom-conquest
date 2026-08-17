# 팬덤 땅따먹기 상세기획 — 어드민 방문 인증 검수 시스템 (v0.3)

> **문서 버전**: v0.3  
> **최종 수정일**: 2026-08-17  
> **문서 상태**: Approved Spec  
> **관련 화면 ID**: `ADM-VERIF-01` (인증 내역 데이터 테이블), `ADM-VERIF-02` (수동 검수 큐), `ADM-VERIF-03` (반려 사유 프리셋 관리)  
> **관련 User View**: `UV-VERIF-01` (촬영), `UV-VERIF-02` (AI OCR), `UV-VERIF-04` (수동대기), `UV-VERIF-05` (반려모달)  
> **관련 공통 모달**: [`docs/01_planning/02_detail/03_admin/fandom_상세기획_어드민_공통_모달_명세_v0.2_20260723.md`](file:///Users/jmk/develop/fandom-conquest/docs/01_planning/02_detail/03_admin/fandom_상세기획_어드민_공통_모달_명세_v0.2_20260723.md)
> 🔄 **v0.3 반영**: [fandom_인증다변화_기획제안_v0.1_20260729.md](file:///Users/jmk/develop/fandom-conquest/docs/01_planning/03_discussion/fandom_인증다변화_기획제안_v0.1_20260729.md) 논의안 채택에 따라 검수 대상을 "영수증 단독" → "방문 사진 + GPS(필수) / 영수증·리뷰(선택)" 종합 검수로 확장. 상세 인증 조합·점수는 [fandom_상세기획_인증_어뷰징_v0.2_20260817.md](file:///Users/jmk/develop/fandom-conquest/docs/01_planning/02_detail/02_user_view/fandom_상세기획_인증_어뷰징_v0.2_20260817.md) §1 참조.


---

## 1. 개요 및 비즈니스 목적

본 문서는 '팬덤 땅따먹기' 백오피스 어드민의 **방문 인증 내역 관리 데이터 테이블, 사진/GPS/영수증 종합 판정 룰 엔진, 수동 검수 큐 SOP 및 반려 템플릿 관리**의 정밀 명세를 다룬다.
어드민 운영자는 자동 승인 룰을 통과하지 못한 인증 제출건을 **좌/우 2분할 UI와 키보드 단축키(Space/R)**를 활용하여 건당 5초 이내 초고속으로 검수 판정한다.

---

## 2. 화면별 세부 기능 및 데이터 필드 명세

### 2.1 [ADM-VERIF-01] 인증 내역 통합 데이터 테이블 (Verification Data Table)

접수된 모든 방문 인증 시도 건(GPS+사진 기본 · 영수증/리뷰 가산)을 통합 조회하고 엑셀/CSV로 내보내는 화면이다.

#### 데이터 필드 명세 (Data Field Schema)
| 필드명 | DB 컬럼명 | 데이터 타입 | 필수 여부 | 유효성 검사 & 제약 룰 | 설명 |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **인증 승인 ID** | `verification_id`| String (UUID) | PK | System Generated | 인증 건 고유 식별자 (예: `VERIF-0722-042`) |
| **제출 유저 ID** | `user_id` | String | FK | 가입 유저 외래키 | 인증을 제출한 유저 계정 |
| **성지 핀 ID** | `spot_id` | String | FK | 활성 성지 핀 외래키 | 인증 시도 대상 성지 |
| **방문 사진** | `photo_urls` | JSON | 필수 | 1~10장 | 방문 증빙 사진 (전체 목록 슬라이더) |
| **사진 해시** | `photo_hash` | String(64) | 필수 | MD5 | 이미지 도용/재사용 탐지용 |
| ✨**영수증 첨부 여부**| `has_receipt` | Boolean | 필수 | `TRUE`/`FALSE` | 가산 항목 첨부 여부 |
| **영수증 승인번호** | `receipt_approval_no` | String(20) | 조건부 | `has_receipt=TRUE` 시 필수 | 중복 인증 방지 식별 키 |
| **AI OCR 신뢰도** | `ocr_confidence` | Decimal(5,2) | 조건부 | `0.00%` ~ `100.00%` | `has_receipt=TRUE` 시 Vision OCR 파싱 앙상블 신뢰도 |
| **결제 금액** | `receipt_amount` | Integer | 조건부 | `≥ 3,000` 원 | `has_receipt=TRUE` 시 결제 인정 최소 금액 |
| ✨**리뷰 첨부 여부**| `has_review` | Boolean | 필수 | `TRUE`/`FALSE` | 가산 항목 작성 여부 |
| **리뷰 텍스트** | `review_text` | String(500) | 조건부 | `has_review=TRUE` 시 최소 10자 | 방문 후기 |
| ✨**획득 점수** | `score` | Decimal(3,1) | 필수 | `1.0`/`1.5`/`2.0`/`2.5` | 인증 조합에 따른 배점 |
| **인증 처리 상태** | `status` | Enum | 필수 | `AUTO_APPROVED` / `MANUAL_APPROVED` / `PENDING` / `REJECTED` | 인증 최종 상태 |
| **반려 사유 코드** | `reject_code` | String(10) | 조건부 | `REJ-01` ~ `REJ-06` | `status == REJECTED` 시 필수 (`REJ-06`: 이미지 도용 반려 ✨신규) |
| **제출 시각** | `submitted_at` | Timestamp | 필수 | Current Timestamp | 인증 버튼 클릭 시각 |

---

### 2.2 [ADM-VERIF-02] 수동 검수 큐 & 종합 판정 룰 (Manual Review Queue)

✨(v0.3) 자동 판정 룰을 통과하지 못한 건을 **좌/우 2분할 종합 대조 UI**로 운영자가 빠른 수동 심사한다. 기존 "영수증 원본 대조" 단일 뷰에서 **유저 방문 사진(슬라이더) + 리뷰 텍스트 + 영수증 원본(첨부 시)** 종합 뷰포트로 확장.

```
+------------------------------------+------------------------------------+
|  [좌측: 제출 증빙 슬라이더]        |  [우측: 판정 필드 & 결과]         |
|                                    |  • GPS 지오펜스: 12m [✓ 통과]      |
|   +----------------------------+   |  • 사진 해시 중복: 없음 [✓ 통과]  |
|   |  1/2 방문 사진               |   |  --------------------------------  |
|   |  (◀ 스와이프 ▶ 영수증 원본)  |   |  [영수증 첨부됨]                  |
|   |  - 100% 원본 캡처          |   |  • 매장명: 투썸플레이스 성수역점   |
|   |  - 이미지 확대/조동 지원   |   |    └ 텍스트 유사도 98.4% [✓ 일치] |
|   +----------------------------+   |  • 결제일시: 2026-07-22 14:15:20   |
|                                    |    └ 최신성: 24h 이내 [✓ 통과]     |
|   [ 📝 리뷰 텍스트 ]                |  • 결제금액: 14,500원              |
|   "성수 팝업 완전 대박이었어요..."  |    └ 최소 금액 기준 3,000원 [✓]    |
|                                    |  --------------------------------  |
|                                    |  💯 예상 획득 점수: 2.0점           |
|                                    |  [반려 사유 선택 (R)]             |
|                                    |  [승인 확정 (Space)]              |
+------------------------------------+------------------------------------+
```

#### 자동 판정 룰 알고리즘 (Decision Rules)
0. ✨**사진 해시 중복 대조 (Image Hash Dedup)** — 모든 건 공통 선행 판정:
   - 제출 사진 `photo_hash`가 기존 이력에 존재 ➔ `[이미지 도용 자동 반려 ❌]` (`REJ-06`)
1. **GPS 반경 지오펜싱 (Geofencing Range)** — 모든 건 공통:
   - 제출 위치와 성지 좌표 간 거리 $D$:
     - $D \le 10\text{m}$: `[자동 승인 조건 충족 ✓]`
     - $10\text{m} < D \le 200\text{m}$ **& 영수증 첨부**: `[수동 검수 큐 이관 ⚠️]` (영수증 주소 대조)
     - $D > 200\text{m}$ **& 영수증 첨부**: `[수동 검수 큐 이관 ⚠️]`
     - $D > 200\text{m}$ **& 영수증 미첨부**: `[위치 오차 초과 자동 반려 ❌]` (`REJ-04`, 검수 리소스 낭비 방지)
2. **상호명 텍스트 유사도 (Levenshtein Distance)** — ✨영수증 첨부 건에 한해 실행:
   $$\text{Similarity} = \left(1 - \frac{\text{Levenshtein}(S_{\text{OCR}}, S_{\text{Spot}})}{\max(|S_{\text{OCR}}|, |S_{\text{Spot}}|)}\right) \times 100$$
   - $\text{Similarity} \ge 85\%$: `[일치 ✓]` (자동 통과 조건)
   - $\text{Similarity} < 85\%$: `[수동 검수 큐 이관 ⚠️]`
3. **결제 시각 최신성 검증 (Time Validity Window)** — ✨영수증 첨부 건에 한해 실행:
   - 일반 가맹점/상설형: 제출 시각 기준 **24시간 이내** (`$T_{\text{Submit}} - T_{\text{Receipt}} \le 24\text{h}$`)
   - 이벤트형 성지 (생일카페/팝업): 이벤트 기간 내 결제 영수증 허용 (**최대 72시간**)
4. ✨**리뷰 텍스트 유효성 (Review Spam Guard)** — 리뷰 첨부 건에 한해 실행:
   - 최소 10자 미만 또는 공통 금칙어 필터(`ADM-SYSTEM-01`) 반복문자 스팸 패턴 탐지 시 ➔ `[리뷰 필터 반려 ❌]` (판정 세부 기준은 미결 — [fandom_상세기획_인증_어뷰징_v0.2_20260817.md](file:///Users/jmk/develop/fandom-conquest/docs/01_planning/02_detail/02_user_view/fandom_상세기획_인증_어뷰징_v0.2_20260817.md) §7 참조)

> 상기 0~4 룰을 모두 통과하면 인증 조합에 따라 `score`가 `1.0`/`1.5`/`2.0`/`2.5`로 자동 계산되어 승인 확정된다.

#### 수동 검수 SOP 키보드 단축키
- `Space Bar`: 현재 건 **[승인 확정]** ➔ 구 점유율 및 획득 점수(`+1.0`~`+2.5`점) 즉시 반영 ➔ 다음 큐 자동 이동
- `R`: **[반려 사유 팝오버 오픈]** ➔ 사유 선택 후 `Enter` 누르면 반려 확정
- `← / →`: 이전 / 다음 큐 항목 이동

---

### 2.3 [ADM-VERIF-03] 반려 사유 프리셋 관리 (Rejection Preset Management)

반려 처리 시 유저에게 전송될 알림 푸시 메시지 및 인앱 모달(`UV-VERIF-05`) 표준 템플릿 관리.

---

## 3. 백엔드 REST API 명세 (API Specifications)

### 3.1 수동 검수 큐 항목 승인 처리 API
- **Endpoint**: `POST /api/v1/admin/verifications/{verification_id}/approve`
- **점수 상속 트랜잭션 (Upward Roll-up Engine)**:
  - 인증 성공 처리 시 제출된 팬덤 ID(`fandom_id`)가 개인/유닛일 경우, 개인 DB `score = score + verifications.score`(✨v0.3: 인증 조합별 `1.0`/`1.5`/`2.0`/`2.5`) 반영과 동시에 `root_group_id` 최상위 단체 그룹 스코어에도 동일 값을 **자동 상향 상속 트랜잭션** 실행.

### 3.2 수동 검수 큐 항목 보류 이관 API
- **Endpoint**: `POST /api/v1/admin/verifications/{verification_id}/hold`
- **공통 모달 연동**: `MODAL-COMM-02` (수동 검수 보류 확정 공통 모달) 호출 후 점수 반영 일시 유예 및 `ADM-SANCTION-02` 심사 큐로 이관.

### 3.3 수동 검수 큐 항목 반려 처리 API
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

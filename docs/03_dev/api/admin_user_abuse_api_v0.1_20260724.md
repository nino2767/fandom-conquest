# 어드민 유저 관리 / 어뷰징 탐지 / 제재 백엔드 REST API 명세서 (v0.1)

> **문서 버전**: v0.1  
> **작성일**: 2026-07-24  
> **상태**: Draft Spec for Dev  
> **관련 기획서**: 어드민 유저 관리(`ADM-USER`), 어뷰징 탐지(`ADM-ABUSE`), 제재/소명(`ADM-SANCTION`), 금칙어(`ADM-SYSTEM`)

---

## 1. [ADM-USER] 유저 회원 관리 API

### 1.1 유저 목록 검색 및 조회 API
- **Endpoint**: `GET /api/v1/admin/users`
- **Headers**: `Authorization: Bearer <Admin_JWT>`
- **Query Parameters**:
  - `status`: `ACTIVE` | `WARNING` | `SUSPENDED` | `BANNED`
  - `provider`: `KAKAO` | `GOOGLE` | `APPLE`
  - `fandom_id`: String
  - `search_type`: `NICKNAME` | `NAME` | `EMAIL` | `PHONE` | `USER_ID`
  - `search_keyword`: String
  - `page`: Integer (Default 1)
  - `size`: Integer (Default 20)
- **Response**:
  ```json
  {
    "code": 200,
    "message": "SUCCESS",
    "data": {
      "total_count": 142,
      "page": 1,
      "users": [
        {
          "user_id": "usr_98a7f10b-3c4a-4e2b",
          "nickname": "행복한덕후104",
          "name_masked": "김*덤",
          "email_masked": "fan****@kakao.com",
          "phone_masked": "010-****-5678",
          "provider": "KAKAO",
          "primary_fandom": "BTS",
          "status": "ACTIVE",
          "verif_count": 42,
          "contribution_score": 42,
          "created_at": "2026-07-20T14:32:00Z",
          "last_login_at": "2026-07-24T19:10:00Z"
        }
      ]
    }
  }
  ```

---

## 2. [ADM-SANCTION] 유저 제재 및 소명 처리 API

### 2.1 유저 수동 제재 및 기여분 몰수 API
- **Endpoint**: `POST /api/v1/admin/users/{user_id}/sanctions`
- **Request Body**:
  ```json
  {
    "sanction_level": "TEMP_BAN",
    "duration_days": 14,
    "revoke_contribution": true,
    "reason_code": "RECEIPT_FORGERY",
    "admin_memo": "영수증 승인번호 도용으로 14일 정지 및 점수 몰수"
  }
  ```

### 2.2 유저 인앱 소명 심사 결정 API
- **Endpoint**: `POST /api/v1/admin/appeals/{appeal_id}/decide`
- **Request Body**:
  ```json
  {
    "decision": "APPROVED",
    "rejection_reason": null,
    "restore_score": true,
    "admin_memo": "실물 영수증 증빙 확인 완료로 소명 승인"
  }
  ```

---

## 3. [ADM-ABUSE] 어뷰징 탐지 대시보드 API

- `GET /api/v1/admin/abuse/anomalies`: 실시간 핫스팟 및 동일 IP 다계정 탐지 리스트 조회 API

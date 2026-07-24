# 팬덤 땅따먹기 상세기획 — 어드민 보안 로그인 & 시스템 계정 IAM (v0.2)

> **문서 버전**: v0.2  
> **최종 수정일**: 2026-07-23  
> **문서 상태**: Approved Spec  
> **관련 화면 ID**: `ADM-SYS-02` (어드민 계정 및 권한 관리), `ADM-SYS-03` (어드민 보안 로그인 `/login`)  
> **관련 User View**: 해당 없음 (어드민 전용 보안 영역)

---

## 1. 개요 및 비즈니스 목적

본 문서는 '팬덤 땅따먹기' 백오피스 어드민의 **보안 로그인 절차(`/login`), 세션 제어, 최고 관리자 신규 운영자 계정 발급 및 역할 기반 접근 제어(RBAC IAM 권한 Matrix)**를 정밀 명세한다.

---

## 2. 화면 세부 구성 및 데이터 필드 명세

### 2.1 [ADM-SYS-03] 어드민 보안 로그인 (`/login`)

백오피스 전용 보안 인증 및 세션 발급 화면.

```
+-------------------------------------------------------+
|  🚩 팬덤 땅따먹기 ADMIN CONSOLE                       |
|                                                       |
|  [ 이메일 아이디 ]                                    |
|  ops@fandom.app                                       |
|                                                       |
|  [ 비밀번호 ]                                         |
|  ••••••••••••                                         |
|                                                       |
|  [   로그인 (Sign In)   ]                             |
|                                                       |
|  💡 데모 계정: ops@fandom.app / admin1234             |
+-------------------------------------------------------+
```

#### 보안 로그인 유효성 검사 및 세션 룰
- **세션 유효 시간**: 로그인 성공 후 **60분**간 유효 (JWT Access Token)
- **비밀번호 실패 계정 잠금**: 연속 **5회 실패 시 15분간 해당 계정 로그인 잠금** (`ERR_ACCOUNT_LOCKED`)
- **2FA OTP 2차 인증**: 최고 관리자 계정 접속 시 TOTP(Google Authenticator) 6자리 번호 입력 필수

---

### 2.2 [ADM-SYS-02] 어드민 계정 및 권한 관리 (Admin RBAC Management)

최고 관리자가 백오피스 운영자 계정을 생성하고 업무 권한을 지정하는 화면.

#### 데이터 필드 명세 (Data Field Schema)
| 필드명 | DB 컬럼명 | 데이터 타입 | 필수 여부 | 유효성 검사 & 제약 룰 | 설명 |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **운영자 계정 ID** | `admin_id` | String(20) | PK | `ADMIN-##` | 어드민 계정 식별자 (예: `ADMIN-01`) |
| **이메일 아이디** | `email` | String(100) | 필수 | 이메일 유효성 및 중복 불가 | 업무용 이메일 주소 |
| **담당자 실명** | `admin_name` | String(50) | 필수 | 최대 50자 | 운영자 실명 |
| **어드민 역할** | `role` | Enum | 필수 | `SUPER_ADMIN` / `OPERATOR` / `READ_ONLY` | RBAC 역할 권한 |
| **계정 상태** | `status` | Enum | 필수 | `ACTIVE` (정상) / `DISABLED` (정지) | 로그인 허용 여부 |
| **2FA 활성화** | `tfa_enabled` | Boolean | 필수 | `true` / `false` | Google TOTP 2차 인증 적용 여부 |

#### 역할 기반 권한 매트릭스 (RBAC Permission Matrix)
| 메뉴 / 권한 범위 | 최고 관리자 (`SUPER_ADMIN`) | 일반 검수 운영자 (`OPERATOR`) | 뷰어 (`READ_ONLY`) |
| :--- | :---: | :---: | :---: |
| **전황 대시보드 조회** (`ADM-DASH-01`) | O | O | O |
| **영수증 수동 검수 승인/반려** (`ADM-VERIF-02`) | O | O | X |
| **유저 제재 (1차/2차)** | O | O | X |
| **유저 영구정지 & 기여분 몰수** | O | X | X |
| **신규 어드민 계정 발급** (`ADM-SYS-02`) | O | X | X |
| **운영 정책 임계값 변경** (`ADM-SYS-04`) | O | X | X |

---

## 3. 백엔드 REST API 명세 (API Specifications)

### 3.1 어드민 로그인 API
- **Endpoint**: `POST /api/v1/admin/auth/login`
- **Request Body**:
```json
{
  "email": "ops@fandom.app",
  "password": "admin1234"
}
```

### 3.2 신규 운영자 계정 발급 API
- **Endpoint**: `POST /api/v1/admin/accounts`
- **Request Body**:
```json
{
  "email": "operator1@fandomconquest.com",
  "admin_name": "검수 담당자 A",
  "role": "OPERATOR"
}
```

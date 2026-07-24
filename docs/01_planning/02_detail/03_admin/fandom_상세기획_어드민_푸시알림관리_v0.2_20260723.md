# 팬덤 땅따먹기 상세기획 — 어드민 푸시 & 알림 관리 (v0.2)

> **문서 버전**: v0.2  
> **최종 수정일**: 2026-07-23  
> **문서 상태**: Approved Spec  
> **관련 화면 ID**: `ADM-PUSH-01` (푸시 발송 & 템플릿 관리), `ADM-PUSH-02` (발송 이력 및 수신 통계)  
> **관련 User View**: `UV-NOTI-01` (인앱 알림센터 하트/종 아이콘)  
> **관련 인프라 문서**: [`docs/05_launch/fandom_오픈준비_외부API_및_운영비용_산정_v0.1_20260724.md`](file:///Users/jmk/develop/fandom-conquest/docs/05_launch/fandom_오픈준비_외부API_및_운영비용_산정_v0.1_20260724.md)


---

## 1. 개요 및 비즈니스 목적

본 문서는 유저 인앱 알림센터 및 스마트폰 앱 푸시(FCM/APNS) 발송, 치환 변수 템플릿 관리, 발송 타겟팅 및 이력/열람률(CTR) 수신 통계 관리 화면(`ADM-PUSH-01/02`)과 대용량 비동기 대기열 기반 푸시 서버 세팅 방안을 정밀 명세한다.

---

## 2. 푸시 알림 분류 및 치환 변수 명세

| 발송 유형 | 트리거 시점 | 알림 메시지 템플릿 예시 | 치환 변수 (Variables) |
| :--- | :--- | :--- | :--- |
| **땅 점령 역전** | 상대 팬덤이 내 성지를 점령했을 때 | `[{fandom_name}] {spot_name} 성지가 점령당했습니다! 지금 탈환하세요.` | `{fandom_name}`, `{spot_name}` |
| **영수증 인증 완료** | 영수증 검수 승인/자동 승인 시 | `[{spot_name}] 인증 성공! {contribution_score}점이 점유율에 반영되었습니다.` | `{spot_name}`, `{contribution_score}` |
| **영수증 반려** | 영수증 검수 반려 시 | `영수증 인증이 반려되었습니다. 사유: {reject_reason}` | `{reject_reason}` |
| **제재/소명 통보** | 제재 처리 또는 소명 심사 완료 시 | `[알림] 소명 심사 결과: {appeal_result}. 정지가 해제되었습니다.` | `{appeal_result}` |
| **팬덤 마케팅/공지** | 어드민 운영자가 수동 타깃 발송 시 | `[{fandom_name}] 시즌 종료 D-3! 마지막 땅따먹기 전쟁에 참여하세요.` | `{fandom_name}` |

---

## 3. [ADM-PUSH-01] 푸시 발송 & 템플릿 관리 화면 명세

### 3.1 세부 주요 기능
1. **타겟팅 설정 (Targeting)**:
   - `전체 유저`, `특정 팬덤 선택`, `계정 상태별`, `특정 유저 ID 지정`
2. **발송 시점 제어**:
   - `즉시 발송` vs `예약 발송 (Date/Time Picker)`
   - **야간 푸시 제한 룰**: 21:00 ~ 08:00 시간대 야간 푸시 수신 동의 유무 자동 체크 적용
3. **푸시 템플릿 관리**:
   - 템플릿 등록/수정/삭제 및 치환 변수 가이드 제공
4. **발송 이력 & 수신 통계 (`ADM-PUSH-02`)**:
   - 발송 일시, 대상 인원, 발송 성공/실패 수, 앱 열람/클릭률(CTR) 시각화

---

## 4. 대용량 비동기 푸시 서버 인프라 아키텍처 (FCM 연동)

```mermaid
flowchart TD
    subgraph 1. 이벤트 발생 (Producers)
        A1[성지 점령 역전 이벤트] --> B[Redis Queue / AWS SQS]
        A2[어드민 예약/타깃 푸시] --> B
        A3[제재/소명 심사 완료] --> B
    end

    subgraph 2. 비동기 푸시 서버 (Push Workers)
        B --> C[Push Worker Clusters Go / Node.js]
        C --> D[FCM Engine - 건수 무제한 100% 무료]
    end

    subgraph 3. 최종 수신 (Clients)
        D --> E1[iOS App APNS]
        D --> E2[Android App FCM]
        C --> E3[인앱 알림센터 DB 저장]
    end
```

# 팬덤 땅따먹기(Fandom Conquest) 에이전트 코딩 및 세션 협업 룰

## 1. 세션 라이프사이클 & 필수 수칙 (Session Lifecycle & Essential Rules)
* **세션 시작 시 오버뷰 사전 숙지 (Overview-First)**:
  * 세션을 시작할 때 전체 정보구조도(IA), 서비스 개요, 핵심 정책(PRD) 등 오버뷰 문서를 항상 우선 파악하여 전체 맥락을 파악하고 작업을 진행합니다.
* **상세기획 업데이트 시 연관 문서 정합성 체크 & 사전 승인 (Cross-Doc Alignment)**:
  * 상세기획 변경 또는 피처 요구 발생 시, 코드 수정 전에 영향받는 모든 연관 문서(IA, 서비스 소개, 타 모듈 상세기획 등)의 정합성을 먼저 체크합니다.
  * 수정 예정 사항(제안서)을 사용자에게 아티팩트로 명확히 제시하고, **사용자의 명확한 승인(컨펌)을 득한 이후에만 문서 수정 및 깃 푸시 등 실제 작업**을 진행해야 합니다.
* **구버전 기획서 아카이빙 사전 승인 (Archive Confirmation First)**:
  * 기존 기획서가 신규 버전으로 승격되거나 여러 문서로 분리되어 구버전 파일을 `archive/` 폴더로 이동/아카이빙할 때, **반드시 사전에 사용자에게 아카이빙 대상 문서와 이동 계획에 대해 명확한 승인(컨펌)을 받은 후** 실행합니다.
* **세션 종료 시 Git Push 필수 (Session Termination Push)**:
  * 세션 작업을 마무리하거나 사용자가 세션 종료를 요청할 때, `git status`를 확인하고 작업 내역을 커밋한 뒤 **원격 저장소에 `git push`**를 수행합니다.


## 2. 프론트엔드 컴포넌트 및 상태 관리 수칙
* **불순 함수 제한 (Purity 규칙)**: 
  * 컴포넌트 본문 내부에서 `Date.now()`나 `Math.random()` 같은 불순(impure) 함수를 직접 호출해 변수나 ID를 생성하는 것을 금지합니다.
  * 고유 ID나 난수가 필요한 경우, 헬퍼 함수를 컴포넌트 외부(파일 상단 등)에 독립적으로 선언하여 사용하거나 `useId` 훅 등을 활용할 것.
* **Effect 내 State 동기 업데이트 제한 (SetState in Effect 규칙)**:
  * `useEffect` 안에서 `localStorage` 로드 등으로 동기적으로 `setState`를 실행하면 cascading render 부작용 경고가 발생할 수 있습니다.
  * Effect 내의 상태 초기화 코드는 필요 시 `setTimeout(() => { setState(...) }, 0)`으로 감싸 비동기화하여 실행하거나 리액트 19의 상태 초기화 규격을 준수할 것.
* **프로덕션 빌드 정합성**:
  * 배포 빌드 시 미사용 임포트(`import`)나 미사용 선언 변수는 컴파일 에러로 간주될 수 있습니다.
  * 작업을 완료하기 전에 항상 `npm run lint`와 `npm run build`(프로젝트 구성 후)를 염두에 두고 경고가 전혀 없는 무결점 코드를 보장할 것.

## 3. 문서 및 기획서 동기화 최우선 (Docs-First)
* 새로운 피처나 기능 변경 요구 시, 코드부터 수정하지 않습니다. 반드시 `docs/` 내 해당 Phase 기획 문서를 먼저 탐색 및 업데이트하여 문서와 코드의 정합성을 100% 유지해야 합니다.

## 4. 검토 및 안 제시 시 아티팩트(Artifact) 미리보기 패널 활용 수칙
* 사용자가 검토, 기획안, 개발 가이드, 선택안 등을 요청할 경우 단순 채팅 텍스트가 아닌 **아티팩트(Artifact) 문서**로 생성/수정하여 전달합니다.
* 아티팩트 메타데이터(`ArtifactMetadata`)의 `UserFacing: true`, `RequestFeedback: true` 속성을 설정하여 사용자가 UI의 아티팩트 미리보기 패널에서 편하게 검토하고 피드백할 수 있도록 조치합니다.

## 5. 토큰 최적화 수칙 (Token Efficiency Rules)
* **최소 범위 조회 룰 (Targeted File Inspection)**:
  * 수백 줄 이상의 대형 파일을 읽을 때 전체 조회를 피하고, `grep_search` 또는 `StartLine`/`EndLine` 옵션을 사용해 꼭 필요한 특정 라인 범위(50~100줄 내외)만 핀포인트 조회합니다.
  * 이미 이전 턴에서 읽은 파일이나 구조는 중복 조회하지 않고 메모리를 활용합니다.
* **요약 & 델타(Diff) 응답 룰 (Compact Response & Summary)**:
  * 전체 파일 내용이나 길다란 로그 결과를 대화창에 그대로 출력하지 않고, 핵심 변경점(Diff), 에러 트레이스 요약, 3~5줄 내외의 브리핑으로 압축 응답합니다.
  * 길고 복잡한 보고서나 제안서는 아티팩트를 활용합니다.
* **묶음 실행 및 배치 작업 룰 (Batch Execution)**:
  * 파일 수정 시 한 도구 호출로 묶어 처리하고, `git status`, `git log`, `npm run lint` 등 확인성 명령은 연쇄 명령(`&&`)으로 합쳐 실행합니다.

## 6. 프론트엔드 퍼블리싱 UI/UX 정합성 절대 수칙 (Publishing & Design Alignment Rules)
* **HTML 퍼블리싱 스펙 1:1 보존 (Publishing Spec Strict Alignment)**:
  * 제공된 HTML 퍼블리싱 가이드/디자인 스펙 파일(`docs/02_design/`)의 클래스명(`brand`, `lg`, `bt`, `nav`, `on`, `b-d`, `b-g`, `card`, `th`, `num`, `sub9` 등)과 픽셀 레벨 수치(크기, 폰트, 패딩, 강조 테두리)를 임의로 개조하거나 구버전 클래스와 혼용하는 것을 엄격히 금지합니다.
* **데이터 테이블 셀 flex-basis 고정 (Table Flex-Basis Lock)**:
  * 인라인 `<span>` 태그의 flex 축소로 인한 글자 겹침을 방지하기 위해, 모든 데이터 테이블 컬럼 셀에는 명시적으로 `flex: 0 0 XXXpx` 및 `minWidth`를 부여하고 CSS상 `display: inline-block`과 `flex-shrink: 0`을 보장해야 합니다.
* **사이드바 Active 상태 Exact Match (Exact Route Matching)**:
  * 사이드바 네비게이션 active 판단 시 `startsWith` 대신 `pathname === item.href` 조건문을 사용하여 유사 경로 간 중복 선택 현상을 원천 차단합니다.
* **데스크톱 사이드바 고정 노출 (Desktop Always-Visible Sidebar)**:
  * 어드민 뷰의 196px 사이드바가 태블릿/노트북 화면 크기(1024px)에서 모바일 드로어로 숨겨지지 않도록 모바일 반응형 브레이크포인트를 `max-width: 640px` (스마트폰 전용)로 한정합니다.





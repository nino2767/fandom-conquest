"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// 데이터 인터페이스 정의
export interface VerificationQueueItem {
  id: string;
  submitter: string;
  fandomName: string;
  fandomId: string;
  storeName: string;
  dateTime: string;
  area: string;       // 예: "성동구", "마포구", "강남구"
  amount: string;
  ocrConfidence: string;
  status: "match" | "warning" | "error";
  receiptImgText: string;
  approvalNumber: string;
}

export interface VerificationHistoryRow {
  id: string;
  user: string;
  store: string;
  bizNum: string;
  fandom: string;
  fandomColor: string;
  type: "자동승인" | "수동승인" | "수동검수대기" | "최종반려";
  amount: string;
  timestamp: string;
}

export interface SpotApprovalItem {
  id: string;
  submitter: string;
  spotName: string;
  address: string;
  fandomName: string;
  fandomColor: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
}

export interface SpotItem {
  id: string;
  name: string;
  address: string;
  fandomName: string;
  fandomColor: string;
  status: "ACTIVE" | "ARCHIVED";
  createdAt: string;
}

export interface UserSanctionItem {
  id: string;
  username: string;
  nickname: string;
  userId: string;
  statusText: string;
  statusColor: string;
  statusValue: "ACTIVE" | "WARNING" | "SUSPENDED" | "BANNED";
  riskScore: number;
  appealStatus: string;
  sanctionCount: number;
  contributionPoints: string;
  relatedAccounts: number;
  history: { title: string; hint: string; color: string }[];
  appealText?: string;
  appealDate?: string;
}

export interface WordChip {
  id: string;
  word: string;
  category: "NICKNAME" | "COMMENT";
}

export interface SystemSettings {
  expireHours: number;
  minAmount: number;
  thresholdScore: number;
  gpsRadius: number;
}

export interface OverturnLog {
  event_type: string;
  district_name: string;
  previous_fandom_id: string;
  previous_fandom_name: string;
  new_fandom_id: string;
  new_fandom_name: string;
  trigger_user_id: string;
  verification_id: string;
  current_share_gap_percent: number;
  timestamp: string;
}

export interface DistrictInfo {
  districtName: string; // 예: "은평", "강북", "노원", "중랑", "마포", "성북", "성동", "광진" 등
  fullName: string;     // 예: "은평구", "강북구" 등
  scores: Record<string, number>; // fandomId -> 점수
  isOverturnedToday?: boolean;
}

interface AdminDataContextType {
  kpi: {
    dau: number;
    todayAttempts: number;
    autoApproved: number;
    pendingManualCount: number;
    rejected: number;
  };
  cartogram: DistrictInfo[];
  verificationQueue: VerificationQueueItem[];
  verificationHistory: VerificationHistoryRow[];
  spotProposals: SpotApprovalItem[];
  spots: SpotItem[];
  users: UserSanctionItem[];
  bannedWords: WordChip[];
  systemSettings: SystemSettings;
  overturnLogs: OverturnLog[];
  
  approveVerification: (id: string) => void;
  rejectVerification: (id: string, reason: string) => void;
  holdVerification: (id: string) => void;
  approveSpotProposal: (id: string) => void;
  rejectSpotProposal: (id: string) => void;
  sanctionUser: (userId: string, level: "WARNING" | "SUSPENDED" | "BANNED", reason: string) => void;
  addBannedWord: (word: string, category: "NICKNAME" | "COMMENT") => void;
  removeBannedWord: (id: string) => void;
  updateSystemSettings: (settings: Partial<SystemSettings>) => void;
  addSpotPin: (name: string, address: string, fandomId: string) => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

// FANDOM 정보 상수 정의
export const FANDOMS = [
  { id: "FANDOM-01", name: "뉴진스", color: "#2f6bff" },
  { id: "FANDOM-02", name: "에스파", color: "#e64980" },
  { id: "FANDOM-03", name: "아이브", color: "#f59f00" },
];

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. 대시보드 KPI 상태
  const [kpi, setKpi] = useState({
    dau: 12480,
    todayAttempts: 3214,
    autoApproved: 2981,
    pendingManualCount: 24,
    rejected: 209,
  });

  // 2. 서울 25개 구 상태 (기획에 맞춘 기본 데이터 세트 구성)
  const [cartogram, setCartogram] = useState<DistrictInfo[]>([
    { districtName: "은평", fullName: "은평구", scores: { "FANDOM-01": 52, "FANDOM-02": 48, "FANDOM-03": 20 } },
    { districtName: "강북", fullName: "강북구", scores: { "FANDOM-01": 58, "FANDOM-02": 32, "FANDOM-03": 15 } },
    { districtName: "노원", fullName: "노원구", scores: { "FANDOM-01": 49, "FANDOM-02": 50, "FANDOM-03": 30 }, isOverturnedToday: true },
    { districtName: "중랑", fullName: "중랑구", scores: { "FANDOM-01": 20, "FANDOM-02": 35, "FANDOM-03": 53 } },
    
    { districtName: "마포", fullName: "마포구", scores: { "FANDOM-01": 63, "FANDOM-02": 40, "FANDOM-03": 35 } },
    { districtName: "성북", fullName: "성북구", scores: { "FANDOM-01": 35, "FANDOM-02": 55, "FANDOM-03": 20 } },
    { districtName: "성동", fullName: "성동구", scores: { "FANDOM-01": 67, "FANDOM-02": 66, "FANDOM-03": 10 } },
    { districtName: "광진", fullName: "광진구", scores: { "FANDOM-01": 30, "FANDOM-02": 51, "FANDOM-03": 48 } },
    
    { districtName: "서대문", fullName: "서대문구", scores: { "FANDOM-01": 40, "FANDOM-02": 42, "FANDOM-03": 35 } },
    { districtName: "종로", fullName: "종로구", scores: { "FANDOM-01": 45, "FANDOM-02": 43, "FANDOM-03": 44 } },
    { districtName: "동대문", fullName: "동대문구", scores: { "FANDOM-01": 30, "FANDOM-02": 32, "FANDOM-03": 35 } },
    { districtName: "중구", fullName: "중구", scores: { "FANDOM-01": 38, "FANDOM-02": 37, "FANDOM-03": 39 } },
    
    { districtName: "강서", fullName: "강서구", scores: { "FANDOM-01": 51, "FANDOM-02": 30, "FANDOM-03": 45 } },
    { districtName: "마포남", fullName: "마포구남부", scores: { "FANDOM-01": 42, "FANDOM-02": 40, "FANDOM-03": 41 } }, 
    { districtName: "용산", fullName: "용산구", scores: { "FANDOM-01": 62, "FANDOM-02": 55, "FANDOM-03": 48 } },
    { districtName: "강동", fullName: "강동구", scores: { "FANDOM-01": 41, "FANDOM-02": 42, "FANDOM-03": 40 } },
    
    { districtName: "구로", fullName: "구로구", scores: { "FANDOM-01": 32, "FANDOM-02": 30, "FANDOM-03": 31 } },
    { districtName: "영등포", fullName: "영등포구", scores: { "FANDOM-01": 55, "FANDOM-02": 50, "FANDOM-03": 45 } },
    { districtName: "동작", fullName: "동작구", scores: { "FANDOM-01": 48, "FANDOM-02": 46, "FANDOM-03": 47 } },
    { districtName: "송파", fullName: "송파구", scores: { "FANDOM-01": 49, "FANDOM-02": 52, "FANDOM-03": 51 } },
    
    { districtName: "양천", fullName: "양천구", scores: { "FANDOM-01": 35, "FANDOM-02": 38, "FANDOM-03": 34 } },
    { districtName: "금천", fullName: "금천구", scores: { "FANDOM-01": 25, "FANDOM-02": 26, "FANDOM-03": 28 } },
    { districtName: "관악", fullName: "관악구", scores: { "FANDOM-01": 47, "FANDOM-02": 45, "FANDOM-03": 50 } },
    { districtName: "서초", fullName: "서초구", scores: { "FANDOM-01": 50, "FANDOM-02": 55, "FANDOM-03": 52 } },
    { districtName: "강남", fullName: "강남구", scores: { "FANDOM-01": 61, "FANDOM-02": 60, "FANDOM-03": 58 } },
  ]);

  // 3. 수동 검수 대기 영수증 큐 (10건 추가 시나리오용 넉넉히 제공)
  const [verificationQueue, setVerificationQueue] = useState<VerificationQueueItem[]>([
    {
      id: "VERIF-0722-042",
      submitter: "user_94ab",
      fandomName: "승관 (Seungkwan / BSS)",
      fandomId: "FANDOM-03", 
      storeName: "투썸플레이스 성수역점",
      dateTime: "2026.07.25 14:15:20",
      area: "성동구",
      amount: "14,500원",
      ocrConfidence: "98.4%",
      status: "match",
      receiptImgText: "A TWO SOME PLACE\n성수역점 (02-499-1234)\n------------------------\n아메리카노(R) 4,500\n조각케이크 10,000\n------------------------\n합계 14,500원\n2026-07-25 14:15:20",
      approvalNumber: "APRV-20260725-8812",
    },
    {
      id: "VERIF-0722-043",
      submitter: "user_12cd",
      fandomName: "민지 (Minji / NewJeans)",
      fandomId: "FANDOM-01",
      storeName: "스타벅스 강남대로점",
      dateTime: "2026.07.25 13:40:11",
      area: "강남구",
      amount: "8,600원",
      ocrConfidence: "91.2%",
      status: "warning",
      receiptImgText: "STARBUCKS COFFEE\n강남대로점\n------------------------\n카페라떼(T) 5,000\n쿠키 3,600\n------------------------\n합계 8,600원\n2026-07-25 13:40:11",
      approvalNumber: "APRV-20260725-9923",
    },
    {
      id: "VERIF-0722-044",
      submitter: "user_ef56",
      fandomName: "카리나 (Karina / aespa)",
      fandomId: "FANDOM-02",
      storeName: "블루보틀 성수 카페",
      dateTime: "2026.07.25 12:10:05",
      area: "성동구",
      amount: "21,000원",
      ocrConfidence: "79.5%",
      status: "warning",
      receiptImgText: "BLUE BOTTLE COFFEE\n성수점\n------------------------\n드립 커피 6,500\n머그컵 14,500\n------------------------\n합계 21,000원\n2026-07-25 12:10:05",
      approvalNumber: "APRV-20260725-7711",
    },
    {
      id: "VERIF-0722-045",
      submitter: "user_gh78",
      fandomName: "장원영 (Wonyoung / IVE)",
      fandomId: "FANDOM-03",
      storeName: "맥도날드 성수점",
      dateTime: "2026.07.25 11:32:00",
      area: "성동구",
      amount: "9,900원",
      ocrConfidence: "95.1%",
      status: "match",
      receiptImgText: "MCDONALD'S SUNGSU\n------------------------\n상하이버거 세트 7,800\n맥플러리 2,100\n------------------------\n합계 9,900원\n2026-07-25 11:32:00",
      approvalNumber: "APRV-20260725-3344",
    },
    {
      id: "VERIF-0722-046",
      submitter: "user_ijk9",
      fandomName: "하니 (Hanni / NewJeans)",
      fandomId: "FANDOM-01",
      storeName: "카페 레이어드 연남",
      dateTime: "2026.07.25 10:45:12",
      area: "마포구",
      amount: "18,200원",
      ocrConfidence: "84.2%",
      status: "warning",
      receiptImgText: "CAFE LAYERED\n연남점\n------------------------\n스콘 2개 10,000\n아메리카노 2잔 8,200\n------------------------\n합계 18,200원\n2026-07-25 10:45:12",
      approvalNumber: "APRV-20260725-0012",
    },
    {
      id: "VERIF-0722-047",
      submitter: "user_op88",
      fandomName: "윈터 (Winter / aespa)",
      fandomId: "FANDOM-02",
      storeName: "투썸플레이스 성수역점",
      dateTime: "2026.07.25 09:12:00",
      area: "성동구",
      amount: "1,500원", 
      ocrConfidence: "99.0%",
      status: "error",
      receiptImgText: "A TWO SOME PLACE\n성수역점\n------------------------\n생수 1,500원\n------------------------\n합계 1,500원\n2026-07-25 09:12:00",
      approvalNumber: "APRV-20260725-1155",
    },
    {
      id: "VERIF-0722-048",
      submitter: "user_robot",
      fandomName: "안유진 (Yujin / IVE)",
      fandomId: "FANDOM-03",
      storeName: "비정상 편의점",
      dateTime: "2026.07.21 15:00:00", 
      area: "마포구",
      amount: "4,500원",
      ocrConfidence: "93.0%",
      status: "error",
      receiptImgText: "GS25 마포중앙점\n------------------------\n삼각김밥 2개 3,000\n콜라 1,500\n------------------------\n합계 4,500원\n2026-07-21 15:00:00",
      approvalNumber: "APRV-20260721-6677",
    },
  ]);

  // 4. 인증 처리 완료된 이력
  const [verificationHistory, setVerificationHistory] = useState<VerificationHistoryRow[]>([
    {
      id: "VERIF-0722-001",
      user: "user_82fd",
      store: "투썸플레이스 성수역점",
      bizNum: "466-25-01942",
      fandom: "뉴진스",
      fandomColor: "#2f6bff",
      type: "자동승인",
      amount: "14,500원",
      timestamp: "2026.07.25 14:30:12",
    },
    {
      id: "VERIF-0722-002",
      user: "user_94ab",
      store: "카페 므므흐스 성수",
      bizNum: "120-88-99120",
      fandom: "아이브",
      fandomColor: "#f59f00",
      type: "수동검수대기",
      amount: "8,900원",
      timestamp: "2026.07.25 14:15:20",
    },
    {
      id: "VERIF-0722-003",
      user: "user_19fc",
      store: "스타벅스 강남대로점",
      bizNum: "220-81-12345",
      fandom: "에스파",
      fandomColor: "#e64980",
      type: "수동승인",
      amount: "12,000원",
      timestamp: "2026.07.25 13:40:11",
    },
    {
      id: "VERIF-0722-004",
      user: "user_robot",
      store: "조작된 커피숍",
      bizNum: "000-00-00000",
      fandom: "아이브",
      fandomColor: "#f59f00",
      type: "최종반려",
      amount: "5,000원",
      timestamp: "2026.07.25 13:12:05",
    },
  ]);

  // 5. 성지 제보 승인 대기 리스트
  const [spotProposals, setSpotProposals] = useState<SpotApprovalItem[]>([
    {
      id: "REPORT-0722-001",
      submitter: "user_82fd",
      spotName: "카페 므므흐스 성수 (안유진 생카)",
      address: "서울 성동구 연무장길 47",
      fandomName: "아이브",
      fandomColor: "#F59F00",
      status: "PENDING",
      submittedAt: "2026.07.25 16:20",
    },
    {
      id: "REPORT-0722-002",
      submitter: "user_94ab",
      spotName: "어반소스 성수점 (생일 이벤트)",
      address: "서울 성동구 연무장3길 9",
      fandomName: "아이브",
      fandomColor: "#F59F00",
      status: "PENDING",
      submittedAt: "2026.07.25 15:40",
    },
    {
      id: "REPORT-0722-003",
      submitter: "user_c4ee",
      spotName: "누데이크 하우스 도산 (해린 생카페)",
      address: "서울 강남구 압구정로46길 50",
      fandomName: "뉴진스",
      fandomColor: "#2F6BFF",
      status: "PENDING",
      submittedAt: "2026.07.25 12:30",
    },
  ]);

  // 6. 활성 성지 핀 목록
  const [spots, setSpots] = useState<SpotItem[]>([
    {
      id: "SPOT-01",
      name: "투썸플레이스 성수역점 (뉴진스 팝업)",
      address: "서울 성동구 아차산로 113",
      fandomName: "뉴진스",
      fandomColor: "#2f6bff",
      status: "ACTIVE",
      createdAt: "2026.07.20 10:00",
    },
    {
      id: "SPOT-02",
      name: "스타벅스 강남대로점 (에스파 스토어)",
      address: "서울 강남구 강남대로 390",
      fandomName: "에스파",
      fandomColor: "#e64980",
      status: "ACTIVE",
      createdAt: "2026.07.21 11:30",
    },
    {
      id: "SPOT-03",
      name: "할리스 커피 마포역점 (아이브 생카)",
      address: "서울 마포구 마포대로 25",
      fandomName: "아이브",
      fandomColor: "#f59f00",
      status: "ACTIVE",
      createdAt: "2026.07.22 09:00",
    },
  ]);

  // 7. 유저 제재 목록
  const [users, setUsers] = useState<UserSanctionItem[]>([
    {
      id: "s1",
      username: "bunny_01",
      nickname: "뉴진스팬덕",
      userId: "user_82fd",
      statusText: "◐ 1차 경고",
      statusColor: "#e08a00",
      statusValue: "WARNING",
      riskScore: 85,
      appealStatus: "● 접수",
      sanctionCount: 2,
      contributionPoints: "1,240",
      relatedAccounts: 6,
      history: [
        {
          title: "1차 경고 — 동일 IP 다계정 정황",
          hint: "admin_02 · 2026.07.25 14:32 · 자동 탐지 연동",
          color: "#e08a00",
        },
        {
          title: "GPS 반경 밖 인증 플래그 3건",
          hint: "시스템 · 2026.07.20",
          color: "#dcdcdc",
        },
      ],
      appealText: '"집과 회사 두 기기로 로그인해서 IP가 겹친 것 같아요. 다계정 아닙니다. 인증은 모두 실제 방문입니다."',
      appealDate: "2026.07.25 16:10 접수",
    },
    {
      id: "s2",
      username: "dive_yj",
      nickname: "안유진짱",
      userId: "user_5c2a",
      statusText: "◐ 1차 경고",
      statusColor: "#e08a00",
      statusValue: "WARNING",
      riskScore: 62,
      appealStatus: "—",
      sanctionCount: 1,
      contributionPoints: "850",
      relatedAccounts: 1,
      history: [
        {
          title: "1차 경고 — 영수증 결제 시각 불일치",
          hint: "admin_01 · 2026.07.22",
          color: "#e08a00",
        },
      ],
    },
    {
      id: "s3",
      username: "luv_dup_a",
      nickname: "다계정 의심",
      userId: "user_991a",
      statusText: "● 2차 정지",
      statusColor: "#d64545",
      statusValue: "SUSPENDED",
      riskScore: 91,
      appealStatus: "● 접수",
      sanctionCount: 3,
      contributionPoints: "3,400",
      relatedAccounts: 12,
      history: [
        {
          title: "2차 7일 정지 — 다계정 봇 가동",
          hint: "admin_03 · 2026.07.23",
          color: "#d64545",
        },
      ],
      appealText: '"동생 계정 재방문건입니다. 확인해주세요."',
      appealDate: "2026.07.25 11:20 접수",
    },
  ]);

  // 8. 금칙어 목록
  const [bannedWords, setBannedWords] = useState<WordChip[]>([
    { id: "c1", word: "어드민", category: "NICKNAME" },
    { id: "c2", word: "운영자", category: "NICKNAME" },
    { id: "c3", word: "admin", category: "NICKNAME" },
    { id: "c4", word: "system", category: "NICKNAME" },
    { id: "c5", word: "비속어1", category: "COMMENT" },
    { id: "c6", word: "해킹", category: "COMMENT" },
    { id: "c7", word: "주작", category: "COMMENT" },
    { id: "c8", word: "매크로", category: "COMMENT" },
    { id: "c9", word: "스푸핑", category: "COMMENT" },
    { id: "c10", word: "포토샵", category: "COMMENT" },
  ]);

  // 9. 시스템 설정
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    expireHours: 24,
    minAmount: 3000,
    thresholdScore: 90,
    gpsRadius: 150,
  });

  // 10. 실시간 뒤집힘 타임라인 로그
  const [overturnLogs, setOverturnLogs] = useState<OverturnLog[]>([
    {
      event_type: "TERRITORY_OVERTURN",
      district_name: "노원구",
      previous_fandom_id: "FANDOM-01",
      previous_fandom_name: "뉴진스",
      new_fandom_id: "FANDOM-02",
      new_fandom_name: "에스파",
      trigger_user_id: "usr_991a",
      verification_id: "VERIF-0722-039",
      current_share_gap_percent: 2.1,
      timestamp: "10분 전",
    },
  ]);

  // 11. 영수증 승인 액션 (Upward Roll-up 스코어 상속 + 대시보드 갱신 + 뒤집힘 검출)
  const approveVerification = (id: string) => {
    const item = verificationQueue.find((q) => q.id === id);
    if (!item) return;

    // 대기 큐에서 제거
    setVerificationQueue((prev) => prev.filter((q) => q.id !== id));

    // 이력 추가
    const newLog: VerificationHistoryRow = {
      id: item.id,
      user: item.submitter,
      store: item.storeName,
      bizNum: "466-25-01942", 
      fandom: item.fandomName.split(" ")[0], 
      fandomColor: FANDOMS.find((f) => f.id === item.fandomId)?.color || "#8a8a8a",
      type: "수동승인",
      amount: item.amount,
      timestamp: new Date().toLocaleString(),
    };
    setVerificationHistory((prev) => [newLog, ...prev]);

    // KPI 업데이트
    setKpi((prev) => {
      const nextPending = Math.max(0, prev.pendingManualCount - 1);
      return {
        ...prev,
        todayAttempts: prev.todayAttempts + 1,
        pendingManualCount: nextPending,
      };
    });

    // 카토그램 점수 갱신 및 뒤집힘 판단
    const targetDistrictName = item.area; 
    const shortName = targetDistrictName.replace("구", "");

    setCartogram((prevCartogram) => {
      return prevCartogram.map((dist) => {
        if (dist.districtName === shortName) {
          const updatedScores = {
            ...dist.scores,
            [item.fandomId]: (dist.scores[item.fandomId] || 0) + 10, 
          };

          // 기존 1위 구 확인
          let prevTopFandom = "";
          let prevTopScore = -1;
          Object.entries(dist.scores).forEach(([fid, score]) => {
            if (score > prevTopScore) {
              prevTopScore = score;
              prevTopFandom = fid;
            }
          });

          // 신규 1위 구 확인
          let newTopFandom = "";
          let newTopScore = -1;
          Object.entries(updatedScores).forEach(([fid, score]) => {
            if (score > newTopScore) {
              newTopScore = score;
              newTopFandom = fid;
            }
          });

          // 뒤집힘(Overturn) 발생 감지
          if (prevTopFandom && newTopFandom && prevTopFandom !== newTopFandom) {
            const prevFanName = FANDOMS.find((f) => f.id === prevTopFandom)?.name || "기존팬덤";
            const newFanName = FANDOMS.find((f) => f.id === newTopFandom)?.name || "신규팬덤";

            const overturnEvent: OverturnLog = {
              event_type: "TERRITORY_OVERTURN",
              district_name: dist.fullName,
              previous_fandom_id: prevTopFandom,
              previous_fandom_name: prevFanName,
              new_fandom_id: newTopFandom,
              new_fandom_name: newFanName,
              trigger_user_id: item.submitter,
              verification_id: item.id,
              current_share_gap_percent: 1.5, 
              timestamp: "방금 전",
            };
            setOverturnLogs((logs) => [overturnEvent, ...logs]);

            return {
              ...dist,
              scores: updatedScores,
              isOverturnedToday: true, 
            };
          }

          return {
            ...dist,
            scores: updatedScores,
          };
        }
        return dist;
      });
    });
  };

  // 12. 영수증 반려 액션
  const rejectVerification = (id: string, reason: string) => {
    const item = verificationQueue.find((q) => q.id === id);
    if (reason) {
      console.log(`[OCR 반려] ID: ${id}, 사유: ${reason}`);
    }
    if (!item) return;

    setVerificationQueue((prev) => prev.filter((q) => q.id !== id));

    const newLog: VerificationHistoryRow = {
      id: item.id,
      user: item.submitter,
      store: item.storeName,
      bizNum: "466-25-01942",
      fandom: item.fandomName.split(" ")[0],
      fandomColor: FANDOMS.find((f) => f.id === item.fandomId)?.color || "#8a8a8a",
      type: "최종반려",
      amount: item.amount,
      timestamp: new Date().toLocaleString(),
    };
    setVerificationHistory((prev) => [newLog, ...prev]);

    setKpi((prev) => ({
      ...prev,
      todayAttempts: prev.todayAttempts + 1,
      pendingManualCount: Math.max(0, prev.pendingManualCount - 1),
      rejected: prev.rejected + 1,
    }));
  };

  // 13. 영수증 보류 액션
  const holdVerification = (id: string) => {
    const item = verificationQueue.find((q) => q.id === id);
    if (!item) return;

    setVerificationQueue((prev) => prev.filter((q) => q.id !== id));

    setKpi((prev) => ({
      ...prev,
      pendingManualCount: Math.max(0, prev.pendingManualCount - 1),
    }));

    const matchedUser = users.find((u) => u.userId === item.submitter);
    if (matchedUser) {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.userId === item.submitter) {
            return {
              ...u,
              riskScore: Math.min(100, u.riskScore + 15),
              history: [
                {
                  title: `영수증 보류 이관 (검수 ID: ${item.id})`,
                  hint: `ops@fandom.app · ${new Date().toLocaleDateString()}`,
                  color: "#e08a00",
                },
                ...u.history,
              ],
            };
          }
          return u;
        })
      );
    }
  };

  // 14. 성지 제보 승인 액션
  const approveSpotProposal = (id: string) => {
    const proposal = spotProposals.find((p) => p.id === id);
    if (!proposal) return;

    setSpotProposals((prev) => prev.filter((p) => p.id !== id));

    const newSpot: SpotItem = {
      id: `SPOT-${Math.floor(10 + Math.random() * 90)}`,
      name: proposal.spotName,
      address: proposal.address,
      fandomName: proposal.fandomName,
      fandomColor: proposal.fandomColor,
      status: "ACTIVE",
      createdAt: new Date().toLocaleDateString(),
    };
    setSpots((prev) => [newSpot, ...prev]);
  };

  // 15. 성지 제보 반려 액션
  const rejectSpotProposal = (id: string) => {
    setSpotProposals((prev) => prev.filter((p) => p.id !== id));
  };

  // 성지 핀 신규 추가 액션
  const addSpotPin = (name: string, address: string, fandomId: string) => {
    const matchedFandom = FANDOMS.find((f) => f.id === fandomId) || FANDOMS[0];
    const newSpot: SpotItem = {
      id: `SPOT-${Math.floor(10 + Math.random() * 90)}`,
      name,
      address,
      fandomName: matchedFandom.name,
      fandomColor: matchedFandom.color,
      status: "ACTIVE",
      createdAt: new Date().toLocaleDateString(),
    };
    setSpots((prev) => [newSpot, ...prev]);
  };

  // 16. 유저 제재 액션
  const sanctionUser = (userId: string, level: "WARNING" | "SUSPENDED" | "BANNED", reason: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.userId === userId) {
          const statusTextMap = {
            WARNING: "◐ 1차 경고",
            SUSPENDED: "● 2차 임시정지",
            BANNED: "🔴 영구 정지",
          };
          const statusColorMap = {
            WARNING: "#e08a00",
            SUSPENDED: "#d64545",
            BANNED: "#111111",
          };
          return {
            ...u,
            statusValue: level,
            statusText: statusTextMap[level],
            statusColor: statusColorMap[level],
            contributionPoints: "0", 
            history: [
              {
                title: `${statusTextMap[level]} 조치 — 사유: ${reason}`,
                hint: `ops@fandom.app · ${new Date().toLocaleString()}`,
                color: statusColorMap[level],
              },
              ...u.history,
            ],
          };
        }
        return u;
      })
    );
  };

  // 17. 금칙어 관리 액션
  const addBannedWord = (word: string, category: "NICKNAME" | "COMMENT") => {
    const newItem: WordChip = {
      id: `c_${Date.now()}`,
      word,
      category,
    };
    setBannedWords((prev) => [...prev, newItem]);
  };

  const removeBannedWord = (id: string) => {
    setBannedWords((prev) => prev.filter((w) => w.id !== id));
  };

  // 18. 시스템 설정 업데이트 액션
  const updateSystemSettings = (newSettings: Partial<SystemSettings>) => {
    setSystemSettings((prev) => ({ ...prev, ...newSettings }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setKpi((prev) => ({
        ...prev,
        pendingManualCount: verificationQueue.length,
      }));
    }, 0);
    return () => clearTimeout(timer);
  }, [verificationQueue.length]);

  return (
    <AdminDataContext.Provider
      value={{
        kpi,
        cartogram,
        verificationQueue,
        verificationHistory,
        spotProposals,
        spots,
        users,
        bannedWords,
        systemSettings,
        overturnLogs,
        approveVerification,
        rejectVerification,
        holdVerification,
        approveSpotProposal,
        rejectSpotProposal,
        sanctionUser,
        addBannedWord,
        removeBannedWord,
        updateSystemSettings,
        addSpotPin,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
};

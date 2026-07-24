"use client";

import React, { useState } from "react";

interface VerificationHistoryRow {
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

const INITIAL_HISTORY: VerificationHistoryRow[] = [
  {
    id: "VERIF-0722-001",
    user: "user_82fd",
    store: "투썸플레이스 성수역점",
    bizNum: "466-25-01942",
    fandom: "뉴진스",
    fandomColor: "#2f6bff",
    type: "자동승인",
    amount: "14,500원",
    timestamp: "2026.07.22 14:30:12",
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
    timestamp: "2026.07.22 14:15:20",
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
    timestamp: "2026.07.22 13:40:11",
  },
  {
    id: "VERIF-0722-004",
    user: "user_009x",
    store: "이디야커피 홍대점",
    bizNum: "105-86-54321",
    fandom: "뉴진스",
    fandomColor: "#2f6bff",
    type: "최종반려",
    amount: "4,500원",
    timestamp: "2026.07.22 12:10:05",
  },
];

export default function VerificationHistoryPage() {
  const [activeTab, setActiveTab] = useState<"전체" | "자동승인" | "수동검수대기" | "최종반려">("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const filteredHistory = INITIAL_HISTORY.filter((item) => {
    if (activeTab !== "전체" && item.type !== activeTab) return false;
    if (
      searchTerm &&
      !item.user.includes(searchTerm) &&
      !item.store.includes(searchTerm) &&
      !item.bizNum.includes(searchTerm) &&
      !item.id.includes(searchTerm)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      {/* Top Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="admin-title">인증 내역 통합 데이터 테이블</div>

          <span style={{ font: "400 10.5px 'Pretendard'", color: "#9a9a9a" }}>
            총 {INITIAL_HISTORY.length}건 접수
          </span>
        </div>
        <button
          onClick={() => showToast("📥 인증 내역 엑셀(CSV) 추출이 완료되었습니다.")}
          style={{
            padding: "6px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          엑셀 / CSV 내보내기
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px", gap: 12, overflowY: "auto" }}>
        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: 8, borderBottom: "1px solid #e7e7e7", paddingBottom: 10 }}>
          {(["전체", "자동승인", "수동검수대기", "최종반려"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "6px 14px",
                border: activeTab === tab ? "1.5px solid #111" : "1px solid #ddd",
                background: activeTab === tab ? "#111" : "#fff",
                color: activeTab === tab ? "#fff" : "#555",
                font: "600 11.5px 'Pretendard'",
                cursor: "pointer",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="🔍 유저 닉네임 · 승인ID · 사업자번호 · 성지 상호명 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 12px",
              border: "1px solid #ddd",
              font: "400 11px 'Pretendard'",
              outline: "none",
            }}
          />
        </div>

        {/* Data Table */}
        <div className="admin-card" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              borderBottom: "1px solid #f0f0f0",
              font: "500 10px 'Pretendard'",
              color: "#9a9a9a",
              background: "#fafafa",
            }}
          >
            <span style={{ width: 130 }}>인증 승인ID</span>
            <span style={{ width: 90 }}>유저</span>
            <span style={{ flex: 1 }}>성지 상호명</span>
            <span style={{ width: 120 }}>사업자번호</span>
            <span style={{ width: 110 }}>귀속 팬덤</span>
            <span style={{ width: 90 }}>인증 유형</span>
            <span style={{ width: 90 }}>금액</span>
            <span style={{ width: 140 }}>일시</span>
          </div>

          {filteredHistory.map((row) => (
            <div
              key={row.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "11px 16px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ width: 130, font: "400 10.5px 'Pretendard'", color: "#8a8a8a" }}>
                {row.id}
              </span>
              <span style={{ width: 90, font: "600 11.5px 'Pretendard'", color: "#111" }}>
                {row.user}
              </span>
              <span style={{ flex: 1, font: "500 11.5px 'Pretendard'", color: "#111" }}>
                {row.store}
              </span>
              <span style={{ width: 120, font: "400 11px 'Pretendard'", color: "#555" }}>
                {row.bizNum}
              </span>
              <span style={{ width: 110, font: "500 11px 'Pretendard'", color: "#111" }}>
                <span style={{ color: row.fandomColor }}>●</span> {row.fandom}
              </span>
              <span
                style={{
                  width: 90,
                  font: "600 10px 'Pretendard'",
                  color:
                    row.type === "자동승인" || row.type === "수동승인"
                      ? "#1fa16b"
                      : row.type === "수동검수대기"
                      ? "#e08a00"
                      : "#d64545",
                }}
              >
                {row.type}
              </span>
              <span style={{ width: 90, font: "600 11px 'Pretendard'", color: "#111" }}>
                {row.amount}
              </span>
              <span style={{ width: 140, font: "400 10.5px 'Pretendard'", color: "#8a8a8a" }}>
                {row.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>

      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: "#111",
            color: "#fff",
            padding: "10px 18px",
            fontSize: 12,
            fontWeight: 500,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

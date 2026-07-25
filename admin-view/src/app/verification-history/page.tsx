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
  const [historyList] = useState<VerificationHistoryRow[]>(INITIAL_HISTORY);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const filteredData = historyList.filter((row) => {
    if (filterType === "ALL") return true;
    return row.type === filterType;
  });

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Header Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            인증 내역 통합 데이터 (ADM-HISTORY-01)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            전체 {historyList.length}건 기록
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="fld" style={{ padding: "5px 10px", fontSize: 11 }}>
            상태 필터: {filterType} ▾
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          overflowY: "auto",
        }}
      >
        {/* KPI Cards */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div className="admin-card" style={{ flex: 1, minWidth: 140, padding: "12px 16px" }}>
            <div className="th">누적 인증 건수</div>
            <div className="num">142,910</div>
            <div className="sub9">승인율 93.5%</div>
          </div>
          <div className="admin-card" style={{ flex: 1, minWidth: 140, padding: "12px 16px" }}>
            <div className="th">자동 승인 비율</div>
            <div className="num">92.8%</div>
            <div className="sub9">인공지능 비전 OCR</div>
          </div>
          <div className="admin-card" style={{ flex: 1, minWidth: 140, padding: "12px 16px" }}>
            <div className="th">수동 검수 이관</div>
            <div className="num">7.2%</div>
            <div className="sub9">평균 처리 4분 이내</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: 6 }}>
          {["ALL", "자동승인", "수동승인", "수동검수대기", "최종반려"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              style={{
                padding: "5px 12px",
                background: filterType === t ? "#111" : "#eee",
                color: filterType === t ? "#fff" : "#555",
                border: "none",
                font: "600 10.5px 'Pretendard'",
                cursor: "pointer",
              }}
            >
              {t === "ALL" ? "전체 보기" : t}
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="admin-card" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="thr">
            <span style={{ width: 140 }}>인증 ID</span>
            <span style={{ width: 100 }}>유저 ID</span>
            <span style={{ flex: 1 }}>매장명 / 상호</span>
            <span style={{ width: 120 }}>사업자 번호</span>
            <span style={{ width: 110 }}>귀속 팬덤</span>
            <span style={{ width: 100 }}>인증 상태</span>
            <span style={{ width: 90 }}>금액</span>
            <span style={{ width: 140 }}>일시</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {filteredData.map((row) => (
              <div
                key={row.id}
                className="tr"
                onClick={() => showToast(`📋 [${row.id}] ${row.store} 상세 내역 클릭`)}
                style={{ cursor: "pointer" }}
              >
                <span style={{ width: 140, font: "600 11px 'Pretendard'", color: "#111" }}>
                  {row.id}
                </span>
                <span style={{ width: 100, color: "#8a8a8a" }}>{row.user}</span>
                <span style={{ flex: 1, font: "500 11.5px 'Pretendard'", color: "#111" }}>
                  {row.store}
                </span>
                <span style={{ width: 120, fontFamily: "monospace", color: "#8a8a8a" }}>
                  {row.bizNum}
                </span>
                <span style={{ width: 110, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, background: row.fandomColor }} />
                  <span style={{ font: "500 11px 'Pretendard'", color: "#111" }}>
                    {row.fandom}
                  </span>
                </span>
                <span style={{ width: 100 }}>
                  <span
                    className="pill"
                    style={{
                      color:
                        row.type === "자동승인" || row.type === "수동승인"
                          ? "#1fa16b"
                          : row.type === "최종반려"
                          ? "#d64545"
                          : "#e08a00",
                    }}
                  >
                    ● {row.type}
                  </span>
                </span>
                <span style={{ width: 90, font: "600 11px 'Pretendard'", color: "#111" }}>
                  {row.amount}
                </span>
                <span style={{ width: 140, color: "#8a8a8a" }}>{row.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#111",
            color: "#fff",
            padding: "10px 18px",
            font: "600 12px 'Pretendard'",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            zIndex: 9999,
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

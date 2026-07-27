"use client";

import React, { useState } from "react";
import { useAdminData, FANDOMS } from "@/context/AdminDataContext";

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

export default function VerificationHistoryPage() {
  const { verificationHistory, verificationQueue } = useAdminData();
  const [filterType, setFilterType] = useState<string>("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // 실시간 큐 대기 목록과 처리 완료 목록 병합
  const pendingItems: VerificationHistoryRow[] = verificationQueue.map((q) => ({
    id: q.id,
    user: q.submitter,
    store: q.storeName,
    bizNum: "대조필요 (10자리)",
    fandom: q.fandomName.split(" ")[0],
    fandomColor: FANDOMS.find((f) => f.id === q.fandomId)?.color || "#8a8a8a",
    type: "수동검수대기",
    amount: q.amount,
    timestamp: q.dateTime,
  }));

  const allData: VerificationHistoryRow[] = [...pendingItems, ...verificationHistory];

  const filteredData = allData.filter((row) => {
    if (filterType === "ALL") return true;
    return row.type === filterType;
  });

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Header Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            인증 내역 통합 데이터 (ADM-VERIF-01)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            전체 로그 조회 및 필터링 검색 지원
          </span>
        </div>
        <button
          onClick={() => showToast("📥 전체 데이터 CSV 추출 완료 (Mock)")}
          style={{
            padding: "6px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          엑셀 Export
        </button>
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
            <div className="num">{(allData.length + 142800).toLocaleString()}</div>
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
        <div className="admin-card table-responsive" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="thr" style={{ display: "flex", minWidth: 800 }}>
            <span style={{ flex: "0 0 150px" }}>인증 ID</span>
            <span style={{ flex: "0 0 110px" }}>유저 ID</span>
            <span style={{ flex: "1 1 200px", minWidth: 160 }}>매장명 / 상호</span>
            <span style={{ flex: "0 0 130px" }}>사업자 번호</span>
            <span style={{ flex: "0 0 110px" }}>귀속 팬덤</span>
            <span style={{ flex: "0 0 110px" }}>인증 상태</span>
            <span style={{ flex: "0 0 90px" }}>금액</span>
            <span style={{ flex: "0 0 140px" }}>일시</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {filteredData.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "#8a8a8a", fontSize: 12 }}>
                해당 필터 조건의 인증 내역이 없습니다.
              </div>
            ) : (
              filteredData.map((row) => (
                <div
                  key={row.id}
                  className="tr"
                  onClick={() => showToast(`📋 [${row.id}] ${row.store} 상세 내역 클릭`)}
                  style={{ cursor: "pointer", display: "flex", minWidth: 800 }}
                >
                  <span style={{ flex: "0 0 150px", font: "600 11px ui-monospace,monospace", color: "#111" }}>
                    {row.id}
                  </span>
                  <span style={{ flex: "0 0 110px", color: "#8a8a8a" }}>{row.user}</span>
                  <span style={{ flex: "1 1 200px", minWidth: 160, font: "500 11.5px 'Pretendard'", color: "#111" }}>
                    {row.store}
                  </span>
                  <span style={{ flex: "0 0 130px", fontFamily: "monospace", color: "#8a8a8a" }}>
                    {row.bizNum}
                  </span>
                  <span style={{ flex: "0 0 110px", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, background: row.fandomColor, borderRadius: 1 }} />
                    <span style={{ font: "500 11px 'Pretendard'", color: "#111" }}>
                      {row.fandom}
                    </span>
                  </span>
                  <span style={{ flex: "0 0 110px" }}>
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
                  <span style={{ flex: "0 0 90px", font: "600 11px 'Pretendard'", color: "#111" }}>
                    {row.amount}
                  </span>
                  <span style={{ flex: "0 0 140px", color: "#8a8a8a" }}>{row.timestamp}</span>
                </div>
              ))
            )}
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

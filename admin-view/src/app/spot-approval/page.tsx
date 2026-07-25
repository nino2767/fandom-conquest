"use client";

import React, { useState } from "react";

interface SpotApprovalItem {
  id: string;
  submitter: string;
  spotName: string;
  address: string;
  fandomName: string;
  fandomColor: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
}

const SPOT_APPROVALS: SpotApprovalItem[] = [
  {
    id: "REPORT-0722-001",
    submitter: "user_82fd",
    spotName: "카페 므므흐스 성수 (안유진 생카)",
    address: "서울 성동구 연무장길 47",
    fandomName: "아이브",
    fandomColor: "#F59F00",
    status: "PENDING",
    submittedAt: "2026.07.24 16:20",
  },
  {
    id: "REPORT-0722-002",
    submitter: "user_94ab",
    spotName: "어반소스 성수점 (생일 이벤트)",
    address: "서울 성동구 연무장3길 9",
    fandomName: "아이브",
    fandomColor: "#F59F00",
    status: "PENDING",
    submittedAt: "2026.07.24 15:40",
  },
];

export default function SpotApprovalPage() {
  const [approvals] = useState<SpotApprovalItem[]>(SPOT_APPROVALS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Header Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            성지 제보 검수 &amp; 승인 (ADM-SPOT-01)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            제보 검수 대기 {approvals.length}건
          </span>
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
        <div className="admin-card" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="thr">
            <span style={{ width: 140 }}>제보 ID</span>
            <span style={{ width: 100 }}>제보 유저</span>
            <span style={{ flex: 1.5 }}>제보 성지 명칭</span>
            <span style={{ flex: 2 }}>위치 주소</span>
            <span style={{ width: 110 }}>귀속 팬덤</span>
            <span style={{ width: 140 }}>제보 일시</span>
            <span style={{ width: 120 }}>검수 승인</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {approvals.map((row) => (
              <div key={row.id} className="tr">
                <span style={{ width: 140, font: "600 11px ui-monospace,monospace", color: "#111" }}>
                  {row.id}
                </span>
                <span style={{ width: 100, color: "#8a8a8a" }}>{row.submitter}</span>
                <span style={{ flex: 1.5, font: "600 11.5px 'Pretendard'", color: "#111" }}>
                  {row.spotName}
                </span>
                <span style={{ flex: 2, color: "#555" }}>{row.address}</span>
                <span style={{ width: 110 }}>
                  <span className="pill">
                    <span className="col" style={{ background: row.fandomColor }} />
                    {row.fandomName}
                  </span>
                </span>
                <span style={{ width: 140, color: "#8a8a8a" }}>{row.submittedAt}</span>
                <span style={{ width: 120, display: "flex", gap: 6 }}>
                  <button
                    className="btn-d"
                    onClick={() => showToast(`✅ [${row.spotName}] 성지 핀 생성이 완료되었습니다.`)}
                    style={{ height: 28, padding: "0 8px", fontSize: 10.5, cursor: "pointer" }}
                  >
                    핀 승인
                  </button>
                  <button
                    className="btn-l"
                    onClick={() => showToast(`❌ 제보가 반려 처리되었습니다.`)}
                    style={{ height: 28, padding: "0 8px", fontSize: 10.5, color: "#d64545", borderColor: "#d64545", cursor: "pointer" }}
                  >
                    반려
                  </button>
                </span>
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

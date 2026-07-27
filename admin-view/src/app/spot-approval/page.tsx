"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";

export default function SpotApprovalPage() {
  const { spotProposals, approveSpotProposal, rejectSpotProposal } = useAdminData();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleApprove = (id: string, name: string) => {
    approveSpotProposal(id);
    showToast(`✅ [${name}] 성지 핀 생성이 완료되었습니다.`);
  };

  const handleReject = (id: string) => {
    rejectSpotProposal(id);
    showToast(`❌ 제보가 반려 처리되었습니다.`);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Header Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            성지 제보 검수 &amp; 승인 (ADM-SPOT-03)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            제보 검수 대기 {spotProposals.length}건
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
        <div className="admin-card table-responsive" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="thr" style={{ display: "flex", minWidth: 800 }}>
            <span style={{ flex: "0 0 160px" }}>제보 ID</span>
            <span style={{ flex: "0 0 110px" }}>제보 유저</span>
            <span style={{ flex: "1 1 200px", minWidth: 160 }}>제보 성지 명칭</span>
            <span style={{ flex: "1 1 220px", minWidth: 180 }}>위치 주소</span>
            <span style={{ flex: "0 0 110px" }}>귀속 팬덤</span>
            <span style={{ flex: "0 0 140px" }}>제보 일시</span>
            <span style={{ flex: "0 0 130px" }}>검수 승인</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {spotProposals.length === 0 ? (
              <div style={{ textAlign: "center", padding: 60, color: "#8a8a8a", fontSize: 12 }}>
                대기 중인 성지 제보가 없습니다.
              </div>
            ) : (
              spotProposals.map((row) => (
                <div key={row.id} className="tr" style={{ display: "flex", minWidth: 800 }}>
                  <span style={{ flex: "0 0 160px", font: "600 11px ui-monospace,monospace", color: "#111" }}>
                    {row.id}
                  </span>
                  <span style={{ flex: "0 0 110px", color: "#8a8a8a" }}>{row.submitter}</span>
                  <span style={{ flex: "1 1 200px", minWidth: 160, font: "600 11.5px 'Pretendard'", color: "#111" }}>
                    {row.spotName}
                  </span>
                  <span style={{ flex: "1 1 220px", minWidth: 180, color: "#555" }}>{row.address}</span>
                  <span style={{ flex: "0 0 110px" }}>
                    <span className="pill">
                      <span className="col" style={{ background: row.fandomColor }} />
                      {row.fandomName}
                    </span>
                  </span>
                  <span style={{ flex: "0 0 140px", color: "#8a8a8a" }}>{row.submittedAt}</span>
                  <span style={{ flex: "0 0 130px", display: "flex", gap: 6 }}>
                    <button
                      className="btn-d"
                      onClick={() => handleApprove(row.id, row.spotName)}
                      style={{ height: 28, padding: "0 8px", fontSize: 10.5, cursor: "pointer" }}
                    >
                      핀 승인
                    </button>
                    <button
                      className="btn-l"
                      onClick={() => handleReject(row.id)}
                      style={{ height: 28, padding: "0 8px", fontSize: 10.5, color: "#d64545", borderColor: "#d64545", cursor: "pointer" }}
                    >
                      반려
                    </button>
                  </span>
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

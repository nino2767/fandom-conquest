"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";

export default function SpotMasterPage() {
  const { spots } = useAdminData();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            성지 핀 관리 (Spot Pin Master)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            등록 핀 {spots.length}개 · 지도 마커 동기화
          </span>
        </div>
        <button
          onClick={() => showToast("📍 신규 성지 핀 등록 폼이 열렸습니다.")}
          style={{
            padding: "7px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          + 핀 신규 맵핑
        </button>
      </div>

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
          <div className="thr" style={{ display: "flex" }}>
            <span style={{ width: 120 }}>핀 ID</span>
            <span style={{ flex: 1.5 }}>핀 마커 명칭</span>
            <span style={{ flex: 1.5 }}>연동 거점 장소 주소</span>
            <span style={{ width: 140 }}>귀속 팬덤</span>
            <span style={{ width: 100 }}>상태</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {spots.map((row) => (
              <div key={row.id} className="tr" style={{ display: "flex" }}>
                <span style={{ width: 120, font: "600 11px ui-monospace,monospace", color: "#111" }}>
                  {row.id}
                </span>
                <span style={{ flex: 1.5, font: "600 11.5px 'Pretendard'", color: "#111" }}>
                  {row.name}
                </span>
                <span style={{ flex: 1.5, color: "#555" }}>{row.address}</span>
                <span style={{ width: 140 }}>
                  <span className="pill">
                    <span className="col" style={{ background: row.fandomColor }} />
                    {row.fandomName}
                  </span>
                </span>
                <span style={{ width: 100 }}>
                  <span className="pill" style={{ color: row.status === "ACTIVE" ? "#1fa16b" : "#d64545" }}>
                    ● {row.status}
                  </span>
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

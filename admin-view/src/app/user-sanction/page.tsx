"use client";

import React, { useState } from "react";

interface SanctionHistoryRow {
  userId: string;
  fandom: string;
  type: "임시정지" | "경고" | "영구정지";
  reason: string;
  date: string;
  status: "진행중" | "만료" | "해제";
}

const HISTORY: SanctionHistoryRow[] = [
  {
    userId: "user_88ba",
    fandom: "뉴진스",
    type: "임시정지",
    reason: "동일 IP 다계정 연속 제출 (10분 5건 초과)",
    date: "2026.07.22 14:28",
    status: "진행중",
  },
  {
    userId: "user_19fc",
    fandom: "아이브",
    type: "경고",
    reason: "GPS 오차 범위 경계값 반복",
    date: "2026.07.21 09:12",
    status: "만료",
  },
  {
    userId: "user_009x",
    fandom: "에스파",
    type: "영구정지",
    reason: "위변조 영수증 2회 이상 제출",
    date: "2026.07.18 17:05",
    status: "진행중",
  },
];

export default function UserSanctionPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="admin-title">유저 제재 내역 & 소명 관리</div>
          <span style={{ font: "400 10.5px 'Pretendard'", color: "#9a9a9a" }}>
            총 {HISTORY.length}건
          </span>
        </div>
        <button
          onClick={() => showToast("➕ 직접 유저 제재 등록 폼이 열렸습니다.")}
          style={{
            padding: "6px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          + 수동 제재 등록
        </button>
      </div>

      <div
        style={{
          flex: 1,
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          overflowY: "auto",
        }}
      >
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
            <span style={{ width: 110 }}>유저 ID</span>
            <span style={{ width: 100 }}>소속 팬덤</span>
            <span style={{ width: 90 }}>제재 유형</span>
            <span style={{ flex: 1 }}>사유</span>
            <span style={{ width: 130 }}>일시</span>
            <span style={{ width: 90 }}>상태</span>
            <span style={{ width: 80 }}>조치</span>
          </div>

          {HISTORY.map((row, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ width: 110, font: "600 11.5px 'Pretendard'", color: "#111" }}>
                {row.userId}
              </span>
              <span style={{ width: 100, font: "400 11px 'Pretendard'", color: "#555" }}>
                {row.fandom}
              </span>
              <span
                style={{
                  width: 90,
                  font: "600 11px 'Pretendard'",
                  color: row.type === "영구정지" ? "#d64545" : "#111",
                }}
              >
                {row.type}
              </span>
              <span style={{ flex: 1, font: "400 11px 'Pretendard'", color: "#555" }}>
                {row.reason}
              </span>
              <span style={{ width: 130, font: "400 10.5px 'Pretendard'", color: "#8a8a8a" }}>
                {row.date}
              </span>
              <span
                style={{
                  width: 90,
                  font: "600 10px 'Pretendard'",
                  color: row.status === "진행중" ? "#d64545" : "#8a8a8a",
                }}
              >
                {row.status}
              </span>
              <button
                onClick={() => showToast(`🔓 [${row.userId}] 제재 해제 소명이 제출되었습니다.`)}
                style={{
                  width: 80,
                  padding: "4px 8px",
                  border: "1px solid #ddd",
                  background: "#fff",
                  font: "500 10px 'Pretendard'",
                  color: "#555",
                  cursor: "pointer",
                }}
              >
                해제/소명
              </button>
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

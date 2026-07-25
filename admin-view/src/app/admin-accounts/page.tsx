"use client";

import React, { useState } from "react";

interface AdminAccountItem {
  id: string;
  adminId: string;
  name: string;
  role: "SUPER_ADMIN" | "OPERATOR" | "AUDITOR";
  dept: string;
  lastLogin: string;
  status: "ACTIVE" | "LOCKED";
}

const ADMIN_ACCOUNTS: AdminAccountItem[] = [
  {
    id: "adm_01",
    adminId: "ops@fandom.app",
    name: "한결 (최고관리자)",
    role: "SUPER_ADMIN",
    dept: "운영총괄",
    lastLogin: "2026.07.25 21:20",
    status: "ACTIVE",
  },
  {
    id: "adm_02",
    adminId: "admin_02@fandom.app",
    name: "다올 (검수운영)",
    role: "OPERATOR",
    dept: "인증검수팀",
    lastLogin: "2026.07.24 14:32",
    status: "ACTIVE",
  },
  {
    id: "adm_03",
    adminId: "auditor@fandom.app",
    name: "감사팀장",
    role: "AUDITOR",
    dept: "보안감사팀",
    lastLogin: "2026.07.20 11:15",
    status: "ACTIVE",
  },
];

export default function AdminAccountsPage() {
  const [accountList] = useState<AdminAccountItem[]>(ADMIN_ACCOUNTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            어드민 계정 &amp; 권한 관리 (ADM-ACCOUNT-01)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            등록 계정 {accountList.length}개 · RBAC 역할 기반
          </span>
        </div>
        <button
          onClick={() => showToast("➕ 신규 어드민 계정 생성 모달이 열렸습니다.")}
          style={{
            padding: "7px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          + 계정 생성
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
        <div className="admin-card" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="thr">
            <span style={{ width: 160 }}>계정 (ID)</span>
            <span style={{ width: 140 }}>이름</span>
            <span style={{ width: 120 }}>RBAC 권한 등급</span>
            <span style={{ flex: 1 }}>담당 부서</span>
            <span style={{ width: 140 }}>최종 접속 시각</span>
            <span style={{ width: 80 }}>상태</span>
            <span style={{ width: 70 }}>설정</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {accountList.map((row) => (
              <div key={row.id} className="tr">
                <span style={{ width: 160, font: "600 11px ui-monospace,monospace", color: "#111" }}>
                  {row.adminId}
                </span>
                <span style={{ width: 140, font: "500 11.5px 'Pretendard'", color: "#111" }}>
                  {row.name}
                </span>
                <span style={{ width: 120 }}>
                  <span
                    className="tag"
                    style={{
                      borderColor: row.role === "SUPER_ADMIN" ? "#111" : "#ccc",
                      color: row.role === "SUPER_ADMIN" ? "#111" : "#555",
                      fontWeight: row.role === "SUPER_ADMIN" ? 700 : 500,
                    }}
                  >
                    {row.role}
                  </span>
                </span>
                <span style={{ flex: 1, color: "#555" }}>{row.dept}</span>
                <span style={{ width: 140, color: "#8a8a8a" }}>{row.lastLogin}</span>
                <span style={{ width: 80 }}>
                  <span className="pill" style={{ color: "#1fa16b" }}>
                    ● {row.status}
                  </span>
                </span>
                <span style={{ width: 70 }}>
                  <button
                    onClick={() => showToast(`⚙️ [${row.name}] 권한 수정 모달이 열렸습니다.`)}
                    style={{
                      font: "500 10px 'Pretendard'",
                      color: "#111",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    수정
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

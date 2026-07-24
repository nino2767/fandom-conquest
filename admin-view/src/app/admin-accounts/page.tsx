"use client";

import React, { useState } from "react";

interface AdminAccountItem {
  id: string;
  email: string;
  name: string;
  role: "슈퍼 관리자" | "일반 운영자";
  status: "정상" | "정지";
  tfaEnabled: boolean;
}

const INITIAL_ADMINS: AdminAccountItem[] = [
  {
    id: "ADMIN-01",
    email: "ops@fandom.app",
    name: "최고 관리자",
    role: "슈퍼 관리자",
    status: "정상",
    tfaEnabled: true,
  },
  {
    id: "ADMIN-02",
    email: "operator1@fandomconquest.com",
    name: "검수 담당자 A",
    role: "일반 운영자",
    status: "정상",
    tfaEnabled: true,
  },
  {
    id: "ADMIN-03",
    email: "operator2@fandomconquest.com",
    name: "검수 담당자 B",
    role: "일반 운영자",
    status: "정지",
    tfaEnabled: false,
  },
];

export default function AdminAccountsPage() {
  const [admins, setAdmins] = useState<AdminAccountItem[]>(INITIAL_ADMINS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleResetPassword = (email: string) => {
    showToast(`🔑 [${email}] 임시 비밀번호 재설정 메일이 발송되었습니다.`);
  };

  const handleToggleStatus = (id: string) => {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "정상" ? "정지" : "정상" }
          : a
      )
    );
    showToast("⚙️ 운영자 계정 상태가 변경되었습니다.");
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="admin-title">어드민 계정 & 권한 관리</div>
          <span style={{ font: "400 10.5px 'Pretendard'", color: "#9a9a9a" }}>
            등록된 운영자 {admins.length}명
          </span>
        </div>
        <button
          onClick={() => showToast("➕ 신규 운영자 계정 발급 모달이 열렸습니다.")}
          style={{
            padding: "6px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          + 신규 운영자 발급
        </button>
      </div>

      <div style={{ flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
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
            <span style={{ width: 90 }}>ID</span>
            <span style={{ flex: 1 }}>이메일 (아이디)</span>
            <span style={{ width: 140 }}>담당자 실명</span>
            <span style={{ width: 120 }}>권한</span>
            <span style={{ width: 80 }}>상태</span>
            <span style={{ width: 90 }}>2FA OTP</span>
            <span style={{ width: 160 }}>조치</span>
          </div>

          {admins.map((row) => (
            <div
              key={row.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ width: 90, font: "400 10.5px 'Pretendard'", color: "#8a8a8a" }}>
                {row.id}
              </span>
              <span style={{ flex: 1, font: "600 12px 'Pretendard'", color: "#111" }}>
                {row.email}
              </span>
              <span style={{ width: 140, font: "500 11.5px 'Pretendard'", color: "#111" }}>
                {row.name}
              </span>
              <span
                style={{
                  width: 120,
                  font: "600 11px 'Pretendard'",
                  color: row.role === "슈퍼 관리자" ? "#2f6bff" : "#111",
                }}
              >
                {row.role}
              </span>
              <span
                style={{
                  width: 80,
                  font: "600 10px 'Pretendard'",
                  color: row.status === "정상" ? "#1fa16b" : "#d64545",
                }}
              >
                {row.status}
              </span>
              <span style={{ width: 90, font: "400 10.5px 'Pretendard'", color: "#555" }}>
                {row.tfaEnabled ? "🟢 적용됨" : "⚪ 미적용"}
              </span>
              <div style={{ width: 160, display: "flex", gap: 6 }}>
                <button
                  onClick={() => handleResetPassword(row.email)}
                  style={{
                    padding: "4px 8px",
                    border: "1px solid #ddd",
                    background: "#fff",
                    font: "500 10px 'Pretendard'",
                    color: "#555",
                    cursor: "pointer",
                  }}
                >
                  비번초기화
                </button>
                <button
                  onClick={() => handleToggleStatus(row.id)}
                  style={{
                    padding: "4px 8px",
                    border: "1px solid #ddd",
                    background: "#fff",
                    font: "500 10px 'Pretendard'",
                    color: row.status === "정상" ? "#d64545" : "#1fa16b",
                    cursor: "pointer",
                  }}
                >
                  {row.status === "정상" ? "계정정지" : "계정활성"}
                </button>
              </div>
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

"use client";

import React, { useState } from "react";
import { useAdminData, UserSanctionItem } from "@/context/AdminDataContext";

export default function UserSanctionPage() {
  const { users, sanctionUser } = useAdminData();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 상세 모달 상태
  const [selectedUser, setSelectedUser] = useState<UserSanctionItem | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAppealAccept = (user: UserSanctionItem) => {
    sanctionUser(user.userId, "WARNING", "소명 인용으로 경고 조치 유지 (정상 상태 근접)");
    setSelectedUser(null);
    showToast(`✅ ${user.username} 님의 소명이 인용되어 정상 참작 처리되었습니다.`);
  };

  const handleSanctionSuspend = (user: UserSanctionItem) => {
    sanctionUser(user.userId, "SUSPENDED", "2차 임시정지 (7일) 부여");
    setSelectedUser(null);
    showToast(`⚠️ ${user.username} 님에게 2차 7일 정지가 부여되었습니다.`);
  };

  const handleSanctionBan = (user: UserSanctionItem) => {
    sanctionUser(user.userId, "BANNED", "어뷰징 및 다계정 봇 사용으로 영구정지 및 기여분 몰수");
    setSelectedUser(null);
    showToast(`🚫 ${user.username} 님이 영구정지 및 기여분이 몰수 처리되었습니다.`);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            유저 제재 &amp; 소명 관리 (ADM-SANCTION-01)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            제재 이력 관리 및 기여 점수 몰수 처리 · 목록 클릭 시 상세 조치 모달 팝업
          </span>
        </div>
      </div>

      {/* Main Single Column Table Layout */}
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
          <div className="thr" style={{ display: "flex" }}>
            <span style={{ width: 140 }}>유저 ID</span>
            <span style={{ flex: 1.5 }}>계정명 (닉네임)</span>
            <span style={{ width: 140 }}>현재 제재 상태</span>
            <span style={{ width: 100 }}>어뷰징 Risk</span>
            <span style={{ width: 120 }}>소명 여부</span>
            <span style={{ width: 100 }}>누적 제재</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {users.map((item) => {
              return (
                <div
                  key={item.id}
                  className="tr"
                  onClick={() => setSelectedUser(item)}
                  style={{ cursor: "pointer", display: "flex" }}
                  title="클릭하여 제재 이력 조회 및 소명 조치"
                >
                  <span style={{ width: 140, font: "600 11px ui-monospace,monospace", color: "#111" }}>
                    {item.userId}
                  </span>
                  <span style={{ flex: 1.5 }}>
                    <span className="nm" style={{ color: item.statusValue === "BANNED" ? "#9a9a9a" : "#111", textDecoration: "underline", fontWeight: 600 }}>
                      {item.username}
                    </span>
                    <span style={{ fontSize: 9.5, color: "#8a8a8a", marginLeft: 6 }}>({item.nickname})</span>
                  </span>
                  <span style={{ width: 140 }}>
                    <span className="pill" style={{ color: item.statusColor }}>
                      {item.statusText}
                    </span>
                  </span>
                  <span style={{ width: 100 }}>
                    <span
                      className="pill"
                      style={{
                        background: item.riskScore >= 80 ? "#d64545" : "transparent",
                        color: item.riskScore >= 80 ? "#fff" : "#111",
                        border: item.riskScore < 80 ? "1px solid #e08a00" : "none",
                        padding: "3px 8px",
                        fontWeight: 600,
                      }}
                    >
                      {item.riskScore}
                    </span>
                  </span>
                  <span style={{ width: 120 }}>
                    {item.appealStatus !== "—" ? (
                      <span className="pill" style={{ color: "#1fa16b", background: "#e8f7f0" }}>
                        {item.appealStatus}
                      </span>
                    ) : (
                      <span className="hint">—</span>
                    )}
                  </span>
                  <span style={{ width: 100, color: "#555" }}>
                    {item.sanctionCount}회
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Sanction Detail Modal */}
      {selectedUser && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="admin-card"
            style={{
              width: 480,
              padding: "24px 28px",
              background: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0", paddingBottom: 10 }}>
              <span style={{ font: "700 13px 'Pretendard'", color: "#111" }}>
                🔎 유저 제재 및 소명 상세 정보
              </span>
              <button
                onClick={() => setSelectedUser(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 16,
                  color: "#999",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>계정명 (닉네임)</span>
                <span style={{ font: "600 12px 'Pretendard'", color: "#111" }}>{selectedUser.username} ({selectedUser.nickname})</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>유저 고유 ID</span>
                <span style={{ font: "600 11px ui-monospace,monospace", color: "#111" }}>{selectedUser.userId}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>현재 제재 상태</span>
                <span className="pill" style={{ color: selectedUser.statusColor, fontWeight: "bold" }}>
                  {selectedUser.statusText}
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div style={{ display: "flex", gap: 8, margin: "4px 0" }}>
              <div className="admin-card" style={{ flex: 1, padding: "10px 12px" }}>
                <div className="th" style={{ font: "700 9.5px 'Pretendard'", color: "#777" }}>누적 제재</div>
                <div style={{ font: "600 16px 'Pretendard'", color: "#111", marginTop: 3 }}>
                  {selectedUser.sanctionCount}회
                </div>
              </div>
              <div className="admin-card" style={{ flex: 1, padding: "10px 12px" }}>
                <div className="th" style={{ font: "700 9.5px 'Pretendard'", color: "#777" }}>보유 기여분</div>
                <div style={{ font: "600 16px 'Pretendard'", color: selectedUser.contributionPoints === "0" ? "#d64545" : "#111", marginTop: 3 }}>
                  {selectedUser.contributionPoints}
                </div>
              </div>
              <div className="admin-card" style={{ flex: 1, padding: "10px 12px" }}>
                <div className="th" style={{ font: "700 9.5px 'Pretendard'", color: "#777" }}>연관 계정</div>
                <div style={{ font: "600 16px 'Pretendard'", color: "#d64545", marginTop: 3 }}>
                  {selectedUser.relatedAccounts}
                </div>
              </div>
            </div>

            {/* Sanction History */}
            <div>
              <div style={{ font: "700 11px 'Pretendard'", color: "#111", marginBottom: 6 }}>제재 및 탐지 이력</div>
              <div style={{ border: "1px solid #e2e2e2", maxHeight: 110, overflowY: "auto" }}>
                {selectedUser.history.map((h: { title: string; hint: string; color: string }, hIdx: number) => (
                  <div
                    key={hIdx}
                    style={{
                      display: "flex",
                      gap: 10,
                      padding: "8px 10px",
                      borderBottom: hIdx < selectedUser.history.length - 1 ? "1px solid #f0f0f0" : "none",
                    }}
                  >
                    <span style={{ width: 4, background: h.color, flex: "none" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ font: "500 10.5px 'Pretendard'", color: "#111" }}>{h.title}</div>
                      <div style={{ fontSize: 9, color: "#8a8a8a", marginTop: 2 }}>{h.hint}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Appeal Message */}
            <div>
              <div style={{ font: "700 11px 'Pretendard'", color: "#111", marginBottom: 6 }}>유저 소명 (이의제기)</div>
              {selectedUser.appealText ? (
                <div
                  style={{
                    padding: "10px 12px",
                    background: "#f5f5f5",
                    border: "1px solid #e7e7e7",
                    font: "400 10.5px/1.6 'Pretendard'",
                    color: "#555",
                  }}
                >
                  {selectedUser.appealText}
                  <span style={{ display: "block", marginTop: 4, fontSize: 9, color: "#8a8a8a" }}>
                    {selectedUser.appealDate}
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    padding: "10px 12px",
                    background: "#fafafa",
                    border: "1px dashed #ddd",
                    font: "400 10.5px 'Pretendard'",
                    color: "#9a9a9a",
                    textAlign: "center",
                  }}
                >
                  접수된 소명 내역이 없습니다.
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn-l"
                  onClick={() => handleAppealAccept(selectedUser)}
                  style={{ flex: 1, height: 38, cursor: "pointer" }}
                  disabled={selectedUser.statusValue === "BANNED"}
                >
                  소명 인용 · 경고 해제
                </button>
                <button
                  className="btn-l"
                  onClick={() => handleSanctionSuspend(selectedUser)}
                  style={{
                    flex: 1,
                    height: 38,
                    color: "#e08a00",
                    borderColor: "#e08a00",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  disabled={selectedUser.statusValue === "BANNED"}
                >
                  2차 7일 정지
                </button>
              </div>
              <button
                className="btn-l"
                onClick={() => handleSanctionBan(selectedUser)}
                style={{
                  height: 40,
                  color: "#d64545",
                  borderColor: "#d64545",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                disabled={selectedUser.statusValue === "BANNED"}
              >
                영구정지 &amp; 기여분 몰수 (SUPER_ADMIN)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
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

"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";

export default function UserSanctionPage() {
  const { users, sanctionUser } = useAdminData();
  const [selectedId, setSelectedId] = useState<string>(users[0]?.id || "s1");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedItem =
    users.find((item) => item.id === selectedId) || users[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAppealAccept = () => {
    if (!selectedItem) return;
    // 소명 인용 시 경고 해제 (ACTIVE로 상태 변경)
    sanctionUser(selectedItem.userId, "WARNING", "소명 인용으로 경고 조치 유지 (정상 상태 근접)");
    showToast(`✅ ${selectedItem.username} 님의 소명이 인용되어 정상 참작 처리되었습니다.`);
  };

  const handleSanctionSuspend = () => {
    if (!selectedItem) return;
    sanctionUser(selectedItem.userId, "SUSPENDED", "2차 임시정지 (7일) 부여");
    showToast(`⚠️ ${selectedItem.username} 님에게 2차 7일 정지가 부여되었습니다.`);
  };

  const handleSanctionBan = () => {
    if (!selectedItem) return;
    sanctionUser(selectedItem.userId, "BANNED", "어뷰징 및 다계정 봇 사용으로 영구정지 및 기여분 몰수");
    showToast(`🚫 ${selectedItem.username} 님이 영구정지 및 기여분이 몰수 처리되었습니다.`);
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
            제재 이력 관리 및 기여 점수 몰수 처리
          </span>
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="mobile-stack" style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
        {/* Left: Queue Table */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #e7e7e7",
            minWidth: 0,
            overflowY: "auto",
          }}
        >
          <div className="thr" style={{ display: "flex" }}>
            <span style={{ flex: 1.4 }}>계정 / 닉네임</span>
            <span style={{ width: 100 }}>현재 상태</span>
            <span style={{ width: 90 }}>Risk</span>
            <span style={{ width: 70 }}>소명</span>
          </div>

          {users.map((item) => {
            const isSel = item.id === selectedId;
            return (
              <div
                key={item.id}
                className={`tr ${isSel ? "sel" : ""}`}
                onClick={() => setSelectedId(item.id)}
                style={{ cursor: "pointer", display: "flex" }}
              >
                <span style={{ flex: 1.4 }}>
                  <span className="nm" style={{ color: item.statusValue === "BANNED" ? "#9a9a9a" : "#111" }}>
                    {item.username}
                  </span>
                  <br />
                  <span className="hint">
                    {item.nickname} · {item.userId}
                  </span>
                </span>
                <span style={{ width: 100 }}>
                  <span className="pill" style={{ color: item.statusColor }}>
                    {item.statusText}
                  </span>
                </span>
                <span style={{ width: 90 }}>
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
                <span style={{ width: 70 }}>
                  {item.appealStatus !== "—" ? (
                    <span className="pill" style={{ color: "#111" }}>
                      {item.appealStatus}
                    </span>
                  ) : (
                    <span className="hint">—</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Account Detail & Appeals Panel */}
        {selectedItem && (
          <div
            className="detail-panel-mobile"
            style={{
              width: 436,
              flex: "none",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              overflowY: "auto",
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 12,
              }}
            >
              <span style={{ font: "700 12px 'Pretendard'", color: "#111" }}>
                {selectedItem.username} · 계정 상세
              </span>
              <span
                className="pill"
                style={{ color: selectedItem.statusColor, fontWeight: 600 }}
              >
                {selectedItem.statusText}
              </span>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <div className="admin-card" style={{ flex: 1, padding: "10px 12px" }}>
                <div className="th">누적 제재</div>
                <div
                  style={{
                    font: "600 17px 'Pretendard'",
                    color: "#111",
                    marginTop: 3,
                  }}
                >
                  {selectedItem.sanctionCount}회
                </div>
              </div>
              <div className="admin-card" style={{ flex: 1, padding: "10px 12px" }}>
                <div className="th">보유 기여분</div>
                <div
                  style={{
                    font: "600 17px 'Pretendard'",
                    color: selectedItem.contributionPoints === "0" ? "#d64545" : "#111",
                    marginTop: 3,
                  }}
                >
                  {selectedItem.contributionPoints}
                </div>
              </div>
              <div className="admin-card" style={{ flex: 1, padding: "10px 12px" }}>
                <div className="th">연관 계정</div>
                <div
                  style={{
                    font: "600 17px 'Pretendard'",
                    color: "#d64545",
                    marginTop: 3,
                  }}
                >
                  {selectedItem.relatedAccounts}
                </div>
              </div>
            </div>

            <div
              style={{
                font: "700 11px 'Pretendard'",
                color: "#111",
                marginBottom: 8,
              }}
            >
              제재 이력
            </div>
            <div style={{ border: "1px solid #e2e2e2", marginBottom: 12 }}>
              {selectedItem.history.map((h, hIdx) => (
                <div
                  key={hIdx}
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "9px 12px",
                    borderBottom:
                      hIdx < selectedItem.history.length - 1
                        ? "1px solid #f0f0f0"
                        : "none",
                  }}
                >
                  <span
                    style={{
                      width: 4,
                      background: h.color,
                      flex: "none",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ font: "500 11px 'Pretendard'", color: "#111" }}>
                      {h.title}
                    </div>
                    <div className="hint">{h.hint}</div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                font: "700 11px 'Pretendard'",
                color: "#111",
                marginBottom: 8,
              }}
            >
              유저 소명 (이의제기)
            </div>
            {selectedItem.appealText ? (
              <div
                style={{
                  padding: "11px 13px",
                  background: "#f5f5f5",
                  border: "1px solid #e7e7e7",
                  font: "400 10.5px/1.7 'Pretendard'",
                  color: "#555",
                  marginBottom: 14,
                }}
              >
                {selectedItem.appealText}
                <span className="hint" style={{ display: "block", marginTop: 6 }}>
                  {selectedItem.appealDate}
                </span>
              </div>
            ) : (
              <div
                style={{
                  padding: "11px 13px",
                  background: "#fafafa",
                  border: "1px dashed #ddd",
                  font: "400 10.5px 'Pretendard'",
                  color: "#9a9a9a",
                  marginBottom: 14,
                }}
              >
                접수된 소명 내역이 없습니다.
              </div>
            )}

            <div
              style={{
                marginTop: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="btn-l"
                  onClick={handleAppealAccept}
                  style={{ flex: 1, height: 42, cursor: "pointer" }}
                  disabled={selectedItem.statusValue === "BANNED"}
                >
                  소명 인용 · 경고 해제
                </button>
                <button
                  className="btn-l"
                  onClick={handleSanctionSuspend}
                  style={{
                    flex: 1,
                    height: 42,
                    color: "#e08a00",
                    borderColor: "#e08a00",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  disabled={selectedItem.statusValue === "BANNED"}
                >
                  2차 7일 정지
                </button>
              </div>
              <button
                className="btn-l"
                onClick={handleSanctionBan}
                style={{
                  height: 44,
                  color: "#d64545",
                  borderColor: "#d64545",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                disabled={selectedItem.statusValue === "BANNED"}
              >
                영구정지 &amp; 기여분 몰수 (SUPER_ADMIN)
              </button>
            </div>
          </div>
        )}
      </div>

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

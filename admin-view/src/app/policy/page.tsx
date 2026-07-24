"use client";

import React, { useState } from "react";

export default function AdminPolicyPage() {
  const [receiptExpireHours, setReceiptExpireHours] = useState(24);
  const [minAmount, setMinAmount] = useState(3000);
  const [autoApproveThreshold, setAutoApproveThreshold] = useState(90);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSave = () => {
    showToast("⚙️ 운영 정책 설정이 업데이트되었습니다.");
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="admin-title">운영 정책 & 검수 임계값 설정</div>
        </div>
        <button
          onClick={handleSave}
          style={{
            padding: "6px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          정책 저장
        </button>
      </div>

      <div
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          overflowY: "auto",
        }}
      >
        <div className="admin-card" style={{ padding: 20, maxWidth: 600 }}>
          <div style={{ font: "700 13px 'Pretendard'", color: "#111", marginBottom: 16 }}>
            영수증 인증 검수 정책
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", font: "500 11.5px 'Pretendard'", color: "#111", marginBottom: 4 }}>
                영수증 유효시간 (시간)
              </label>
              <input
                type="number"
                value={receiptExpireHours}
                onChange={(e) => setReceiptExpireHours(parseInt(e.target.value) || 24)}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #ddd",
                  font: "500 11.5px 'Pretendard'",
                  boxSizing: "border-box",
                }}
              />
              <span style={{ font: "400 9.5px 'Pretendard'", color: "#8a8a8a", marginTop: 2, display: "block" }}>
                결제 시각 기준 해당 시간 이내 제출된 영수증만 인정을 받습니다.
              </span>
            </div>

            <div>
              <label style={{ display: "block", font: "500 11.5px 'Pretendard'", color: "#111", marginBottom: 4 }}>
                최소 인정 결제 금액 (원)
              </label>
              <input
                type="number"
                value={minAmount}
                onChange={(e) => setMinAmount(parseInt(e.target.value) || 0)}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #ddd",
                  font: "500 11.5px 'Pretendard'",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", font: "500 11.5px 'Pretendard'", color: "#111", marginBottom: 4 }}>
                AI OCR 자동 승인 신뢰도 임계값 (%)
              </label>
              <input
                type="number"
                value={autoApproveThreshold}
                onChange={(e) => setAutoApproveThreshold(parseInt(e.target.value) || 90)}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #ddd",
                  font: "500 11.5px 'Pretendard'",
                  boxSizing: "border-box",
                }}
              />
              <span style={{ font: "400 9.5px 'Pretendard'", color: "#8a8a8a", marginTop: 2, display: "block" }}>
                설정된 신뢰도 이상이며 4개 필드 일치 시 수동 검수 없이 자동 승인됩니다.
              </span>
            </div>
          </div>
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

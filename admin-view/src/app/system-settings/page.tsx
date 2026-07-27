"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";

export default function SystemSettingsPage() {
  const { systemSettings, updateSystemSettings } = useAdminData();
  const [expireHours, setExpireHours] = useState(systemSettings.expireHours);
  const [minAmount, setMinAmount] = useState(systemSettings.minAmount);
  const [thresholdScore, setThresholdScore] = useState(systemSettings.thresholdScore);
  const [gpsRadius, setGpsRadius] = useState(systemSettings.gpsRadius);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSave = () => {
    updateSystemSettings({
      expireHours,
      minAmount,
      thresholdScore,
      gpsRadius,
    });
    showToast("⚙️ 시스템 설정 파라미터가 저장되었습니다.");
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            시스템 운영 설정 (ADM-SYSTEM-01)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            AI OCR 자동 승인 및 GPS 지오펜싱 임계점 설정
          </span>
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
          설정 저장
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
        {/* System Parameters Settings Section */}
        <div className="admin-card" style={{ padding: "16px 20px" }}>
          <div
            style={{
              font: "700 12px 'Pretendard'",
              color: "#111",
              marginBottom: 16,
            }}
          >
            시스템 운영 임계치 (System Operational Parameters)
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <div style={{ padding: "12px 14px", border: "1px solid #e7e7e7", background: "#fff" }}>
              <div className="fl" style={{ font: "600 11px 'Pretendard'", color: "#555" }}>영수증 유효 인증 시간 (시간)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <input
                  type="number"
                  value={expireHours}
                  onChange={(e) => setExpireHours(Number(e.target.value))}
                  style={{
                    width: 80,
                    padding: "6px 8px",
                    border: "1px solid #ddd",
                    font: "600 13px 'Pretendard'",
                    outline: "none",
                  }}
                />
                <span style={{ font: "400 11px 'Pretendard'", color: "#555" }}>시간 이내 결제건</span>
              </div>
            </div>

            <div style={{ padding: "12px 14px", border: "1px solid #e7e7e7", background: "#fff" }}>
              <div className="fl" style={{ font: "600 11px 'Pretendard'", color: "#555" }}>최소 인증 인정 금액 (원)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <input
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(Number(e.target.value))}
                  style={{
                    width: 100,
                    padding: "6px 8px",
                    border: "1px solid #ddd",
                    font: "600 13px 'Pretendard'",
                    outline: "none",
                  }}
                />
                <span style={{ font: "400 11px 'Pretendard'", color: "#555" }}>원 이상 영수증</span>
              </div>
            </div>

            <div style={{ padding: "12px 14px", border: "1px solid #e7e7e7", background: "#fff" }}>
              <div className="fl" style={{ font: "600 11px 'Pretendard'", color: "#555" }}>AI OCR 자동 승인 임계점 (점)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <input
                  type="number"
                  value={thresholdScore}
                  onChange={(e) => setThresholdScore(Number(e.target.value))}
                  style={{
                    width: 80,
                    padding: "6px 8px",
                    border: "1px solid #ddd",
                    font: "600 13px 'Pretendard'",
                    outline: "none",
                  }}
                />
                <span style={{ font: "400 11px 'Pretendard'", color: "#555" }}>점 이상 자동 통과</span>
              </div>
            </div>

            <div style={{ padding: "12px 14px", border: "1px solid #e7e7e7", background: "#fff" }}>
              <div className="fl" style={{ font: "600 11px 'Pretendard'", color: "#555" }}>GPS 허용 반경 (미터)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <input
                  type="number"
                  value={gpsRadius}
                  onChange={(e) => setGpsRadius(Number(e.target.value))}
                  style={{
                    width: 80,
                    padding: "6px 8px",
                    border: "1px solid #ddd",
                    font: "600 13px 'Pretendard'",
                    outline: "none",
                  }}
                />
                <span style={{ font: "400 11px 'Pretendard'", color: "#555" }}>m 이내 현장 방문</span>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "10px 12px",
              background: "#f5f5f5",
              border: "1px solid #e7e7e7",
              font: "400 10.5px/1.6 'Pretendard'",
              color: "#555",
            }}
          >
            💡 <b>임계치 정책 안내</b>:<br />
            - <b>최소 결제 금액</b> 미달 혹은 <b>결제 시각 범위</b> 초과 영수증은 AI OCR 판정에서 자동으로 <b>반려(Error)</b> 처리되거나 <b>수동 검수 큐</b>로 적재됩니다.<br />
            - GPS 허용 범위를 초과하는 경우(200m 이상) <b>위치 오차 초과 자동 반려(REJ-04)</b>가 적용됩니다.
          </div>
        </div>
      </div>

      {/* Toast */}
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

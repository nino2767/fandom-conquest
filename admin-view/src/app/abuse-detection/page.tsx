"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface AbuseItem {
  id: string;
  user: string;
  riskScore: number;
  pattern: string;
  detectTime: string;
  status: "DEVIATION" | "EXESSIVE" | "SPOOFING";
}

const ABUSE_LIST: AbuseItem[] = [
  {
    id: "ab_01",
    user: "bunny_01 (user_82fd)",
    riskScore: 85,
    pattern: "동일 IP 10분 내 6개 다계정 동시 결제건 제출",
    detectTime: "2026.07.24 14:32:10",
    status: "EXESSIVE",
  },
  {
    id: "ab_02",
    user: "dive_yj (user_5c2a)",
    riskScore: 62,
    pattern: "인증 지점 반경 1.2km 오차 초과 제출 (플래그 3회)",
    detectTime: "2026.07.24 13:10:05",
    status: "DEVIATION",
  },
  {
    id: "ab_03",
    user: "fake_gps_7 (user_44cd)",
    riskScore: 98,
    pattern: "GPS Mock Location 앱 실행 감지 및 이미지 EXIF 시각 조작",
    detectTime: "2026.07.23 18:22:00",
    status: "SPOOFING",
  },
];

export default function AbuseDetectionPage() {
  const router = useRouter();
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
            이상 탐지 모니터링 (ADM-ABUSE-01)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            실시간 실시간 이상 패턴 감지 3건
          </span>
        </div>
        <button
          onClick={() => router.push("/user-sanction")}
          style={{
            padding: "7px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          제재 큐 이관 ➔
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
        {/* KPI Cards */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div className="admin-card" style={{ flex: 1, minWidth: 140, padding: "12px 16px" }}>
            <div className="th">오늘 감지 플래그</div>
            <div className="num">14건</div>
            <div className="sub9">▲ 2건 vs 어제</div>
          </div>
          <div className="admin-card" style={{ flex: 1, minWidth: 140, padding: "12px 16px" }}>
            <div className="th">고위험군 (Risk ≥ 80)</div>
            <div className="num" style={{ color: "#d64545" }}>
              2건
            </div>
            <div className="sub9">즉시 제재 권고</div>
          </div>
          <div className="admin-card" style={{ flex: 1, minWidth: 140, padding: "12px 16px" }}>
            <div className="th">GPS 오차 감지</div>
            <div className="num">8건</div>
            <div className="sub9">반경 200m 경계값</div>
          </div>
        </div>

        {/* Data Table */}
        <div className="admin-card" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="thr">
            <span style={{ width: 180 }}>대상 유저 (ID)</span>
            <span style={{ width: 90 }}>Risk Score</span>
            <span style={{ flex: 1 }}>이상 행위 패턴</span>
            <span style={{ width: 140 }}>감지 시각</span>
            <span style={{ width: 110 }}>조치</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {ABUSE_LIST.map((row) => (
              <div key={row.id} className="tr">
                <span style={{ width: 180, font: "600 11.5px 'Pretendard'", color: "#111" }}>
                  {row.user}
                </span>
                <span style={{ width: 90 }}>
                  <span
                    className="pill"
                    style={{
                      background: row.riskScore >= 80 ? "#d64545" : "#e08a00",
                      color: "#fff",
                      padding: "3px 8px",
                      fontWeight: 600,
                    }}
                  >
                    {row.riskScore}
                  </span>
                </span>
                <span style={{ flex: 1, color: "#111", font: "500 11px 'Pretendard'" }}>
                  {row.pattern}
                </span>
                <span style={{ width: 140, color: "#8a8a8a" }}>{row.detectTime}</span>
                <span style={{ width: 110 }}>
                  <button
                    className="btn-l"
                    onClick={() => {
                      showToast(`🚨 '${row.user}' 유저 제재 큐로 이관되었습니다.`);
                      router.push("/user-sanction");
                    }}
                    style={{ height: 28, padding: "0 8px", fontSize: 10.5, cursor: "pointer" }}
                  >
                    제재 처리 ➔
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

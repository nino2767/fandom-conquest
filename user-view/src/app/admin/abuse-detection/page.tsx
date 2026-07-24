"use client";

import React, { useState } from "react";

interface IpMonitorRow {
  ipDevice: string;
  deviceInfo: string;
  count: number;
  accounts: string;
  recentActivity: string;
  statusText: string;
  statusBadge: "action" | "observe" | "normal";
}

const IP_MONITOR_DATA: IpMonitorRow[] = [
  {
    ipDevice: "211.36.132.*",
    deviceInfo: "Galaxy S24 · 동일 기기",
    count: 5,
    accounts: "bunny_01 · bunny_02 · bunny_03 외 2",
    recentActivity: "14:28 · 성동구",
    statusText: "제재 검토",
    statusBadge: "action",
  },
  {
    ipDevice: "61.84.22.*",
    deviceInfo: "iPhone 15 · 카페 공용망",
    count: 3,
    accounts: "dive_yj · mmm_ae · pin_a",
    recentActivity: "13:51 · 성동구",
    statusText: "관찰 (공용 IP 추정)",
    statusBadge: "observe",
  },
  {
    ipDevice: "118.235.7.*",
    deviceInfo: "Pixel 9",
    count: 2,
    accounts: "luv_112 · luv_112b",
    recentActivity: "11:02 · 마포구",
    statusText: "정상 범위",
    statusBadge: "normal",
  },
];

export default function AbuseDetectionPage() {
  const [sanctionModalOpen, setSanctionModalOpen] = useState(false);
  const [sanctionType, setSanctionType] = useState<"temp7" | "warn" | "perm">("temp7");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleConfirmSanction = () => {
    setSanctionModalOpen(false);
    const typeLabel =
      sanctionType === "temp7"
        ? "임시정지 7일 + 기여분 회수"
        : sanctionType === "warn"
        ? "경고 1회"
        : "영구 정지";
    showToast(`🚨 [bunny_01 외 4개 계정] ${typeLabel} 처리가 완료되었습니다.`);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      {/* Top Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="admin-title">이상 탐지 모니터링</div>
          <span style={{ font: "500 10.5px 'Pretendard'", color: "#d64545" }}>
            ● 활성 경고 2건
          </span>
        </div>
        <span style={{ font: "400 10.5px 'Pretendard'", color: "#9a9a9a" }}>
          자동 임시정지 정책: 10분 5건 초과 시
        </span>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Upper Grid */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {/* Spike Chart */}
          <div className="admin-card" style={{ flex: "1.2", minWidth: 320, padding: "13px 16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 9,
              }}
            >
              <span style={{ font: "700 12px 'Pretendard'", color: "#111" }}>
                10분 단위 인증 급증 (성동구)
              </span>
              <span style={{ font: "500 9.5px 'Pretendard'", color: "#d64545" }}>
                ▲ 핫스팟 경고 14:20~14:30
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 80 }}>
              <div style={{ flex: 1, background: "#dcdcdc", height: "22px" }} />
              <div style={{ flex: 1, background: "#dcdcdc", height: "18px" }} />
              <div style={{ flex: 1, background: "#dcdcdc", height: "26px" }} />
              <div style={{ flex: 1, background: "#dcdcdc", height: "20px" }} />
              <div style={{ flex: 1, background: "#dcdcdc", height: "24px" }} />
              <div style={{ flex: 1, background: "#dcdcdc", height: "30px" }} />
              <div style={{ flex: 1, background: "#e08a00", height: "48px" }} />
              <div
                style={{
                  flex: 1,
                  background: "#d64545",
                  height: "76px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: -16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    font: "600 9px 'Pretendard'",
                    color: "#d64545",
                  }}
                >
                  47건
                </span>
              </div>
              <div style={{ flex: 1, background: "#e08a00", height: "42px" }} />
              <div style={{ flex: 1, background: "#dcdcdc", height: "24px" }} />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                font: "400 8.5px 'Pretendard'",
                color: "#9a9a9a",
                marginTop: 5,
              }}
            >
              <span>13:00</span>
              <span>14:30 ⚠</span>
              <span>15:00</span>
            </div>
          </div>

          {/* Auto Sanction Status */}
          <div className="admin-card" style={{ flex: "1", minWidth: 280, padding: "13px 16px" }}>
            <div
              style={{
                font: "700 12px 'Pretendard'",
                color: "#111",
                marginBottom: 9,
              }}
            >
              자동 임시정지 현황
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, border: "1px solid #e7e7e7", padding: "9px 11px" }}>
                <div className="admin-card-header">오늘 자동 정지</div>
                <div style={{ font: "600 19px 'Pretendard'", color: "#111", marginTop: 3 }}>
                  6
                </div>
              </div>
              <div style={{ flex: 1, border: "1.5px solid #111", padding: "9px 11px" }}>
                <div className="admin-card-header" style={{ color: "#111" }}>
                  검토 대기
                </div>
                <div style={{ font: "600 19px 'Pretendard'", color: "#111", marginTop: 3 }}>
                  3
                </div>
              </div>
              <div style={{ flex: 1, border: "1px solid #e7e7e7", padding: "9px 11px" }}>
                <div className="admin-card-header">오탐 해제</div>
                <div style={{ font: "600 19px 'Pretendard'", color: "#111", marginTop: 3 }}>
                  1
                </div>
              </div>
            </div>
            <div
              style={{
                font: "400 10px/1.6 'Pretendard'",
                color: "#8a8a8a",
                marginTop: 9,
              }}
            >
              동일 영수증 재사용, GPS 스푸핑 의심, 10분 5건 초과가 자동 정지 트리거입니다.
            </div>
          </div>
        </div>

        {/* IP Monitoring Table */}
        <div className="admin-card" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 220 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              borderBottom: "1px solid #e7e7e7",
            }}
          >
            <span style={{ font: "700 12px 'Pretendard'", color: "#111" }}>
              동일 IP 다계정 제출 감시
            </span>
            <span style={{ font: "400 10px 'Pretendard'", color: "#9a9a9a" }}>
              최근 24시간
            </span>
          </div>

          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              borderBottom: "1px solid #f0f0f0",
              font: "500 10px 'Pretendard'",
              color: "#9a9a9a",
            }}
          >
            <span style={{ width: 140 }}>IP / 디바이스</span>
            <span style={{ width: 90 }}>계정 수</span>
            <span style={{ flex: 1 }}>연결 계정</span>
            <span style={{ width: 110 }}>최근 활동</span>
            <span style={{ width: 120 }}>상태</span>
          </div>

          {IP_MONITOR_DATA.map((row, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 16px",
                borderBottom: "1px solid #f0f0f0",
                background: row.statusBadge === "action" ? "#fef7f7" : "#fff",
              }}
            >
              <span style={{ width: 140, font: "500 11px 'Pretendard'", color: "#111" }}>
                {row.ipDevice}
                <br />
                <span style={{ font: "400 9px 'Pretendard'", color: "#9a9a9a" }}>
                  {row.deviceInfo}
                </span>
              </span>
              <span
                style={{
                  width: 90,
                  font: "600 13px 'Pretendard'",
                  color: row.statusBadge === "action" ? "#d64545" : "#111",
                }}
              >
                {row.count}
              </span>
              <span style={{ flex: 1, font: "400 10.5px 'Pretendard'", color: "#555" }}>
                {row.accounts}
              </span>
              <span style={{ width: 110, font: "400 10.5px 'Pretendard'", color: "#555" }}>
                {row.recentActivity}
              </span>
              <span style={{ width: 120, display: "flex", gap: 6 }}>
                {row.statusBadge === "action" ? (
                  <button
                    onClick={() => setSanctionModalOpen(true)}
                    style={{
                      padding: "4px 9px",
                      background: "#111",
                      color: "#fff",
                      border: "none",
                      font: "600 9.5px 'Pretendard'",
                      cursor: "pointer",
                    }}
                  >
                    제재 검토
                  </button>
                ) : (
                  <span style={{ font: "400 10px 'Pretendard'", color: "#9a9a9a" }}>
                    {row.statusText}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Manual Sanction Modal */}
        {sanctionModalOpen && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
            }}
          >
            <div
              style={{
                width: 380,
                background: "#fff",
                border: "1px solid #ddd",
                boxShadow: "0 20px 48px rgba(0,0,0,0.25)",
                padding: 20,
              }}
            >
              <div style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
                유저 수동 제재
              </div>
              <div
                style={{
                  font: "400 11px/1.6 'Pretendard'",
                  color: "#555",
                  marginTop: 8,
                }}
              >
                대상: <b style={{ fontWeight: 700, color: "#111" }}>bunny_01 외 4개 계정</b> (동일 기기 5계정)
                <br />
                사유: 동일 IP·기기 다계정 인증 제출 (10분 내 47건)
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 14 }}>
                <label
                  onClick={() => setSanctionType("temp7")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "9px 12px",
                    border:
                      sanctionType === "temp7"
                        ? "1.5px solid #111"
                        : "1px solid #ddd",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="sanctionType"
                    checked={sanctionType === "temp7"}
                    onChange={() => setSanctionType("temp7")}
                  />
                  <span style={{ font: "500 11.5px 'Pretendard'", color: "#111" }}>
                    임시정지 7일 + 해당 기여분 회수
                  </span>
                </label>

                <label
                  onClick={() => setSanctionType("warn")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "9px 12px",
                    border:
                      sanctionType === "warn"
                        ? "1.5px solid #111"
                        : "1px solid #ddd",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="sanctionType"
                    checked={sanctionType === "warn"}
                    onChange={() => setSanctionType("warn")}
                  />
                  <span style={{ font: "400 11.5px 'Pretendard'", color: "#555" }}>
                    경고 1회 (기여분 유지)
                  </span>
                </label>

                <label
                  onClick={() => setSanctionType("perm")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "9px 12px",
                    border:
                      sanctionType === "perm"
                        ? "1.5px solid #111"
                        : "1px solid #ddd",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="sanctionType"
                    checked={sanctionType === "perm"}
                    onChange={() => setSanctionType("perm")}
                  />
                  <span style={{ font: "400 11.5px 'Pretendard'", color: "#d64545" }}>
                    영구 정지 (2차 위반)
                  </span>
                </label>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <button
                  onClick={() => setSanctionModalOpen(false)}
                  style={{
                    flex: 1,
                    height: 42,
                    border: "1px solid #ddd",
                    background: "#fff",
                    font: "500 12px 'Pretendard'",
                    color: "#555",
                    cursor: "pointer",
                  }}
                >
                  취소
                </button>
                <button
                  onClick={handleConfirmSanction}
                  style={{
                    flex: 1.4,
                    height: 42,
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    font: "700 12px 'Pretendard'",
                    cursor: "pointer",
                  }}
                >
                  제재 확정
                </button>
              </div>
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

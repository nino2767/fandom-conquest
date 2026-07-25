"use client";

import React from "react";

interface DistrictTileProps {
  name: string;
  count: number;
  bg: string;
  textColor?: string;
  subColor?: string;
  badgeText?: string;
  border?: string;
  boxShadow?: string;
}

const DISTRICT_DATA: DistrictTileProps[][] = [
  [
    { name: "은평", count: 52, bg: "#a9c4ff", textColor: "#1b2a4a", subColor: "#33436a" },
    { name: "강북", count: 58, bg: "#6f9bff", textColor: "#fff", subColor: "#e3ecff" },
    { name: "노원 ⚔️", count: 49, bg: "#fff", textColor: "#111", subColor: "#8a8a8a", border: "1.5px dashed #111" },
    { name: "중랑", count: 53, bg: "#ffd88a", textColor: "#5c430a", subColor: "#7a5a12" },
  ],
  [
    { name: "마포", count: 63, bg: "#2f6bff", textColor: "#fff", subColor: "#d7e2ff" },
    { name: "성북", count: 55, bg: "#ff9dc0", textColor: "#5c1636", subColor: "#8a2b57" },
    { name: "성동 🔥", count: 67, bg: "#2f6bff", textColor: "#fff", subColor: "#d7e2ff", boxShadow: "0 0 0 2px #111" },
    { name: "광진", count: 51, bg: "#ffd6e6", textColor: "#8a2b57", subColor: "#8a2b57" },
  ],
  [
    { name: "강서", count: 51, bg: "#f59f00", textColor: "#fff", subColor: "#fff3da" },
    { name: "관악 ⚔️", count: 50, bg: "#fff", textColor: "#111", subColor: "#8a8a8a", border: "1.5px dashed #111" },
    { name: "강남", count: 61, bg: "#e64980", textColor: "#fff", subColor: "#ffd7e6" },
    { name: "중립", count: 0, bg: "#f1f1f1", textColor: "#b5b5b5", subColor: "#b5b5b5", border: "1px solid #e2e2e2" },
  ],
];

const LOG_ITEMS = [
  {
    color: "#2f6bff",
    title: "성동구 → 뉴진스 탈환",
    sub: "user_82fd · 인증 1건 역전 · 14:30",
  },
  {
    color: "#f59f00",
    title: "노원구 → 경합 진입 (Δ0.8%p)",
    sub: "아이브 추격 · 14:18",
  },
  {
    color: "#2f6bff",
    title: "마포구 → 뉴진스 수성 (Δ13.4%p)",
    sub: "13:52",
  },
  {
    color: "#e64980",
    title: "강남구 → 에스파 우세 확대",
    sub: "13:41",
  },
];

const CHART_DATA = [
  { approved: 30, rejected: 4 },
  { approved: 38, rejected: 5 },
  { approved: 26, rejected: 3 },
  { approved: 44, rejected: 6 },
  { approved: 40, rejected: 5 },
  { approved: 52, rejected: 6 },
  { approved: 58, rejected: 7 },
];

export default function AdminDashboardPage() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Header Bar */}
      <div className="admin-topbar">
        <div style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
          전황 &amp; 운영 대시보드
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ font: "500 10.5px 'Pretendard'", color: "#111" }}>
            ● 실시간
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            2026.07.25 (토) 21:20 KST
          </span>
        </div>
      </div>

      {/* Main Content Body */}
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
        {/* KPI Summary 5 Columns */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div className="admin-card" style={{ flex: 1, minWidth: 140, padding: "13px 16px" }}>
            <div className="admin-card-header">DAU</div>
            <div className="admin-card-num">12,480</div>
            <div className="admin-card-sub">▲ 8.2% vs 어제</div>
          </div>
          <div className="admin-card" style={{ flex: 1, minWidth: 140, padding: "13px 16px" }}>
            <div className="admin-card-header">오늘 인증 시도</div>
            <div className="admin-card-num">3,214</div>
            <div className="admin-card-sub">▲ 12.4%</div>
          </div>
          <div className="admin-card" style={{ flex: 1, minWidth: 140, padding: "13px 16px" }}>
            <div className="admin-card-header">자동 승인</div>
            <div className="admin-card-num">2,981</div>
            <div className="admin-card-sub">92.8%</div>
          </div>
          <div
            className="admin-card"
            style={{
              flex: 1,
              minWidth: 140,
              padding: "13px 16px",
              border: "1.5px solid #111",
            }}
          >
            <div className="admin-card-header" style={{ color: "#111", fontWeight: 600 }}>
              수동 검수 대기
            </div>
            <div className="admin-card-num">24</div>
            <div className="admin-card-sub">평균 처리 4.2분</div>
          </div>
          <div className="admin-card" style={{ flex: 1, minWidth: 140, padding: "13px 16px" }}>
            <div className="admin-card-header">반려</div>
            <div className="admin-card-num">
              209{" "}
              <span style={{ font: "500 10px 'Pretendard'", color: "#d64545" }}>
                6.5%
              </span>
            </div>
            <div className="admin-card-sub">중복 52% · 만료 31%</div>
          </div>
        </div>

        {/* Cartogram & Log/Chart 2 Column Section */}
        <div style={{ flex: 1, display: "flex", gap: 14, minHeight: 0, flexWrap: "wrap" }}>
          {/* Cartogram Tile Area */}
          <div
            className="admin-card"
            style={{
              flex: 1.35,
              minWidth: 320,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
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
                서울 25구 점령 카토그램
              </span>
              <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
                <span style={{ color: "#2f6bff" }}>■</span> 뉴진스 8{" "}
                <span style={{ color: "#e64980" }}>■</span> 에스파 7{" "}
                <span style={{ color: "#f59f00" }}>■</span> 아이브 5 · 경합 3
              </span>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                justifyContent: "center",
                alignItems: "center",
                padding: "16px 0",
              }}
            >
              {DISTRICT_DATA.map((row, rIdx) => (
                <div key={rIdx} style={{ display: "flex", gap: 6 }}>
                  {row.map((tile, tIdx) => (
                    <div
                      key={tIdx}
                      style={{
                        width: 64,
                        height: 54,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: tile.bg,
                        border: tile.border || "none",
                        boxShadow: tile.boxShadow || "none",
                      }}
                    >
                      <span
                        style={{
                          font: "600 13px 'Pretendard'",
                          color: tile.textColor || "#111",
                        }}
                      >
                        {tile.count === 0 ? "–" : tile.count}
                      </span>
                      <span
                        style={{
                          font: "400 8.5px 'Pretendard'",
                          color: tile.subColor || "#8a8a8a",
                        }}
                      >
                        {tile.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
              <div
                style={{
                  font: "400 9px 'Pretendard'",
                  color: "#9a9a9a",
                  marginTop: 10,
                }}
              >
                채도 = 1위 점유율 격차 · 검정 테두리 = 금일 뒤집힘 · 점선 = 경합
              </div>
            </div>
          </div>

          {/* Realtime Log & 7-Day Trend Area */}
          <div
            className="admin-card"
            style={{
              flex: 1,
              minWidth: 300,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                font: "700 12px 'Pretendard'",
                color: "#111",
                marginBottom: 10,
              }}
            >
              실시간 뒤집힘 로그
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {LOG_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  style={{ display: "flex", gap: 9, alignItems: "center" }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      background: item.color,
                      flex: "none",
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ font: "500 11px 'Pretendard'", color: "#111" }}>
                      {item.title}
                    </div>
                    <div style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "auto",
                borderTop: "1px solid #e7e7e7",
                paddingTop: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 7,
                }}
              >
                <span style={{ font: "700 11px 'Pretendard'", color: "#111" }}>
                  최근 7일 인증 추이
                </span>
                <span style={{ font: "400 9px 'Pretendard'", color: "#9a9a9a" }}>
                  <span style={{ color: "#2f6bff" }}>■</span> 승인{" "}
                  <span style={{ color: "#d64545" }}>■</span> 반려
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 7,
                  height: 62,
                }}
              >
                {CHART_DATA.map((bar, bIdx) => (
                  <div
                    key={bIdx}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        height: bar.approved,
                        background: "#2f6bff",
                      }}
                    />
                    <div
                      style={{
                        height: bar.rejected,
                        background: "#d64545",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useAdminData, FANDOMS } from "@/context/AdminDataContext";

export default function AdminDashboardPage() {
  const { kpi, cartogram, overturnLogs } = useAdminData();

  // 자치구 이름 매핑용 헬퍼 함수
  const renderTile = (districtName: string) => {
    const dist = cartogram.find((d) => d.districtName === districtName);
    if (!dist) {
      return (
        <div className="tile" style={{ background: "#eee" }}>
          <span style={{ font: "600 13px 'Pretendard'", color: "#888" }}>—</span>
          <span style={{ font: "400 8.5px 'Pretendard'", color: "#aaa" }}>{districtName}</span>
        </div>
      );
    }

    // 1위, 2위 팬덤 추출 및 격차 계산
    const scoreEntries = Object.entries(dist.scores).sort((a, b) => b[1] - a[1]);
    const topFandomId = scoreEntries[0]?.[0] || "";
    const topScore = scoreEntries[0]?.[1] || 0;
    const secondScore = scoreEntries[1]?.[1] || 0;
    const deltaS = topScore - secondScore;

    const topFandom = FANDOMS.find((f) => f.id === topFandomId);
    
    // 점수가 모두 0이면 중립
    if (topScore === 0) {
      return (
        <div className="tile" style={{ background: "#eee" }}>
          <span style={{ font: "600 13px 'Pretendard'", color: "#888" }}>—</span>
          <span style={{ font: "400 8.5px 'Pretendard'", color: "#aaa" }}>{dist.districtName}</span>
        </div>
      );
    }

    // Alpha/채도 산정 수식
    let alpha = 1.0;
    let isContested = false;
    if (deltaS <= 5) {
      alpha = 0.35;
      isContested = true;
    } else if (deltaS <= 15) {
      alpha = 0.65;
    } else {
      alpha = 1.0;
    }

    // Hex 색상을 RGBA로 변경하는 유틸리티
    const hexToRgba = (hex: string, opacity: number) => {
      const cleanHex = hex.replace("#", "");
      const r = parseInt(cleanHex.substring(0, 2), 16);
      const g = parseInt(cleanHex.substring(2, 4), 16);
      const b = parseInt(cleanHex.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    const tileBg = topFandom ? hexToRgba(topFandom.color, alpha) : "#eee";

    // 테두리 스타일
    let borderStyle: React.CSSProperties = { border: "1px solid #e7e7e7" };
    if (dist.isOverturnedToday) {
      borderStyle = { border: "2px solid #111", boxShadow: "0 0 0 1px #111" };
    } else if (isContested) {
      borderStyle = { border: "1.5px dashed #111" };
    }

    // 글자 색상
    const textColor = alpha === 1.0 ? "#fff" : "#111";
    const labelColor = alpha === 1.0 ? "rgba(255, 255, 255, 0.8)" : "#555";

    return (
      <div className="tile" style={{ background: tileBg, ...borderStyle }}>
        <span style={{ font: "600 13px 'Pretendard'", color: textColor }}>{topScore}</span>
        <span style={{ font: "400 8.5px 'Pretendard'", color: labelColor }}>
          {dist.districtName} {isContested ? "⚔" : ""}
        </span>
      </div>
    );
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Header Bar (g1a dk-top spec) */}
      <div className="admin-topbar">
        <div style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
          전황 &amp; 운영 대시보드 (ADM-DASH-01)
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ font: "500 10.5px 'Pretendard'", color: "#111" }}>
            ● 실시간
          </span>
          <span className="hint">2026.07.25 (토) 21:55 KST</span>
        </div>
      </div>

      {/* Main Dashboard Content */}
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
        {/* KPI Cards Row (5 Cards - g1a spec) */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div className="card" style={{ flex: 1, minWidth: 150, padding: "13px 16px" }}>
            <div className="th">DAU</div>
            <div className="num">{kpi.dau.toLocaleString()}</div>
            <div className="sub9">▲ 8.2% vs 어제</div>
          </div>
          <div className="card" style={{ flex: 1, minWidth: 150, padding: "13px 16px" }}>
            <div className="th">오늘 인증 시도</div>
            <div className="num">{kpi.todayAttempts.toLocaleString()}</div>
            <div className="sub9">▲ 12.4%</div>
          </div>
          <div className="card" style={{ flex: 1, minWidth: 150, padding: "13px 16px" }}>
            <div className="th">자동 승인율</div>
            <div className="num">{kpi.autoApproved > 0 ? ((kpi.autoApproved / kpi.todayAttempts) * 100).toFixed(1) : "92.8"}%</div>
            <div className="sub9">{kpi.autoApproved.toLocaleString()}건 자동통과</div>
          </div>
          {/* Highlighted Manual Queue Card (border: 1.5px solid #111) */}
          <div
            className="card"
            style={{
              flex: 1,
              minWidth: 150,
              padding: "13px 16px",
              border: "1.5px solid #111",
            }}
          >
            <div className="th" style={{ color: "#111" }}>
              수동 검수 대기
            </div>
            <div className="num">{kpi.pendingManualCount}</div>
            <div className="sub9">평균 처리 4.2분</div>
          </div>
          <div className="card" style={{ flex: 1, minWidth: 150, padding: "13px 16px" }}>
            <div className="th">반려</div>
            <div className="num">
              {kpi.rejected}{" "}
              <span style={{ font: "500 10px 'Pretendard'", color: "#d64545" }}>
                {((kpi.rejected / kpi.todayAttempts) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="sub9">중복 52% · 만료 31%</div>
          </div>
        </div>

        {/* Middle Section: Cartogram + Real-time Logs */}
        <div style={{ flex: 1, display: "flex", gap: 14, minHeight: 360, flexWrap: "wrap" }}>
          {/* Cartogram Grid */}
          <div
            className="card"
            style={{
              flex: 1.35,
              minWidth: 320,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="h2">서울 25구 점령 카토그램</span>
              <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
                <span style={{ color: "#2f6bff" }}>■</span> 뉴진스{" "}
                <span style={{ color: "#e64980" }}>■</span> 에스파{" "}
                <span style={{ color: "#f59f00" }}>■</span> 아이브 · 경합 ⚔
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
                padding: "20px 0",
              }}
            >
              {/* Row 1 */}
              <div style={{ display: "flex", gap: 6 }}>
                {renderTile("은평")}
                {renderTile("강북")}
                {renderTile("노원")}
                {renderTile("중랑")}
              </div>

              {/* Row 2 */}
              <div style={{ display: "flex", gap: 6 }}>
                {renderTile("마포")}
                {renderTile("성북")}
                {renderTile("성동")}
                {renderTile("광진")}
              </div>

              {/* Row 3 */}
              <div style={{ display: "flex", gap: 6 }}>
                {renderTile("강서")}
                {renderTile("관악")}
                {renderTile("강남")}
                {renderTile("중구")}
              </div>

              <div className="hint" style={{ marginTop: 8 }}>
                채도 = 1위 점유율 격차 · 검정 테두리 = 금일 뒤집힘 · 점선 = 경합
              </div>
            </div>
          </div>

          {/* Real-time Logs & Trends */}
          <div
            className="card"
            style={{
              flex: 1,
              minWidth: 280,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span className="h2">실시간 뒤집힘 로그</span>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, marginTop: 12, overflowY: "auto", maxHeight: 220 }}>
              {overturnLogs.length === 0 ? (
                <div className="hint" style={{ textAlign: "center", padding: "20px 0" }}>
                  오늘 발생한 뒤집힘 로그가 없습니다.
                </div>
              ) : (
                overturnLogs.map((log, index) => {
                  const newFandom = FANDOMS.find((f) => f.id === log.new_fandom_id);
                  const dotColor = newFandom ? newFandom.color : "#111";
                  return (
                    <div key={index} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ width: 6, height: 6, background: dotColor, marginTop: 4, flex: "none" }} />
                      <div>
                        <div style={{ font: "600 11px 'Pretendard'", color: "#111" }}>
                          {log.district_name} ➔ {log.new_fandom_name} 점령
                        </div>
                        <div className="hint">
                          {log.trigger_user_id} · 격차 {log.current_share_gap_percent}%p · {log.timestamp}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px solid #f0f0f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <span className="h2" style={{ fontSize: 11 }}>최근 7일 인증 추이</span>
                <span className="hint">
                  <span style={{ color: "#2f6bff" }}>■</span> 승인{" "}
                  <span style={{ color: "#d64545" }}>■</span> 반려
                </span>
              </div>
              <div style={{ height: 42, display: "flex", alignItems: "flex-end", gap: 6 }}>
                <div style={{ flex: 1, height: "80%", background: "#2f6bff", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "8%", background: "#d64545" }} />
                </div>
                <div style={{ flex: 1, height: "85%", background: "#2f6bff", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "7%", background: "#d64545" }} />
                </div>
                <div style={{ flex: 1, height: "75%", background: "#2f6bff", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "10%", background: "#d64545" }} />
                </div>
                <div style={{ flex: 1, height: "90%", background: "#2f6bff", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6%", background: "#d64545" }} />
                </div>
                <div style={{ flex: 1, height: "88%", background: "#2f6bff", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "7%", background: "#d64545" }} />
                </div>
                <div style={{ flex: 1, height: "95%", background: "#2f6bff", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "5%", background: "#d64545" }} />
                </div>
                <div style={{ flex: 1, height: "100%", background: "#2f6bff", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6%", background: "#d64545" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";

export default function AdminDashboardPage() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Header Bar (g1a dk-top spec) */}
      <div className="admin-topbar">
        <div style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
          전황 &amp; 운영 대시보드
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
            <div className="num">12,480</div>
            <div className="sub9">▲ 8.2% vs 어제</div>
          </div>
          <div className="card" style={{ flex: 1, minWidth: 150, padding: "13px 16px" }}>
            <div className="th">오늘 인증 시도</div>
            <div className="num">3,214</div>
            <div className="sub9">▲ 12.4%</div>
          </div>
          <div className="card" style={{ flex: 1, minWidth: 150, padding: "13px 16px" }}>
            <div className="th">자동 승인</div>
            <div className="num">2,981</div>
            <div className="sub9">92.8%</div>
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
            <div className="num">24</div>
            <div className="sub9">평균 처리 4.2분</div>
          </div>
          <div className="card" style={{ flex: 1, minWidth: 150, padding: "13px 16px" }}>
            <div className="th">반려</div>
            <div className="num">
              209{" "}
              <span style={{ font: "500 10px 'Pretendard'", color: "#d64545" }}>
                6.5%
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
                padding: "20px 0",
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <div className="tile" style={{ background: "#a9c4ff" }}>
                  <span style={{ font: "600 13px 'Pretendard'", color: "#1b2a4a" }}>52</span>
                  <span style={{ font: "400 8.5px 'Pretendard'", color: "#33436a" }}>은평</span>
                </div>
                <div className="tile" style={{ background: "#6f9bff" }}>
                  <span style={{ font: "600 13px 'Pretendard'", color: "#fff" }}>58</span>
                  <span style={{ font: "400 8.5px 'Pretendard'", color: "#e3ecff" }}>강북</span>
                </div>
                <div className="tile" style={{ background: "#fff", border: "1.5px dashed #111" }}>
                  <span style={{ font: "600 13px 'Pretendard'", color: "#111" }}>49</span>
                  <span style={{ font: "400 8.5px 'Pretendard'", color: "#8a8a8a" }}>노원 ⚔</span>
                </div>
                <div className="tile" style={{ background: "#ffd88a" }}>
                  <span style={{ font: "600 13px 'Pretendard'", color: "#5c430a" }}>53</span>
                  <span style={{ font: "400 8.5px 'Pretendard'", color: "#7a5a12" }}>중랑</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 6 }}>
                <div className="tile" style={{ background: "#2f6bff" }}>
                  <span style={{ font: "600 13px 'Pretendard'", color: "#fff" }}>63</span>
                  <span style={{ font: "400 8.5px 'Pretendard'", color: "#d6e2ff" }}>마포</span>
                </div>
                <div className="tile" style={{ background: "#fcc2d7" }}>
                  <span style={{ font: "600 13px 'Pretendard'", color: "#5c1b33" }}>55</span>
                  <span style={{ font: "400 8.5px 'Pretendard'", color: "#7a2b49" }}>성북</span>
                </div>
                <div className="tile" style={{ background: "#2f6bff" }}>
                  <span style={{ font: "600 13px 'Pretendard'", color: "#fff" }}>67</span>
                  <span style={{ font: "400 8.5px 'Pretendard'", color: "#d6e2ff" }}>성동 🔥</span>
                </div>
                <div className="tile" style={{ background: "#fcc2d7" }}>
                  <span style={{ font: "600 13px 'Pretendard'", color: "#5c1b33" }}>51</span>
                  <span style={{ font: "400 8.5px 'Pretendard'", color: "#7a2b49" }}>광진</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 6 }}>
                <div className="tile" style={{ background: "#f59f00" }}>
                  <span style={{ font: "600 13px 'Pretendard'", color: "#fff" }}>51</span>
                  <span style={{ font: "400 8.5px 'Pretendard'", color: "#fff" }}>강서</span>
                </div>
                <div className="tile" style={{ background: "#fff", border: "1.5px dashed #111" }}>
                  <span style={{ font: "600 13px 'Pretendard'", color: "#111" }}>50</span>
                  <span style={{ font: "400 8.5px 'Pretendard'", color: "#8a8a8a" }}>관악 ⚔</span>
                </div>
                <div className="tile" style={{ background: "#e64980" }}>
                  <span style={{ font: "600 13px 'Pretendard'", color: "#fff" }}>61</span>
                  <span style={{ font: "400 8.5px 'Pretendard'", color: "#ffd8e5" }}>강남</span>
                </div>
                <div className="tile" style={{ background: "#eee" }}>
                  <span style={{ font: "600 13px 'Pretendard'", color: "#888" }}>—</span>
                  <span style={{ font: "400 8.5px 'Pretendard'", color: "#aaa" }}>중구</span>
                </div>
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

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ width: 6, height: 6, background: "#2f6bff", marginTop: 4, flex: "none" }} />
                <div>
                  <div style={{ font: "600 11px 'Pretendard'", color: "#111" }}>
                    성동구 ➔ 뉴진스 탈환
                  </div>
                  <div className="hint">user_82fd · 인증 1건 역전 · 14:30</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ width: 6, height: 6, background: "#f59f00", marginTop: 4, flex: "none" }} />
                <div>
                  <div style={{ font: "600 11px 'Pretendard'", color: "#111" }}>
                    노원구 ➔ 경합 진입 (Δ0.8%p)
                  </div>
                  <div className="hint">아이브 추격 · 14:18</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ width: 6, height: 6, background: "#2f6bff", marginTop: 4, flex: "none" }} />
                <div>
                  <div style={{ font: "600 11px 'Pretendard'", color: "#111" }}>
                    마포구 ➔ 뉴진스 수성 (Δ13.4%p)
                  </div>
                  <div className="hint">13:52</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ width: 6, height: 6, background: "#e64980", marginTop: 4, flex: "none" }} />
                <div>
                  <div style={{ font: "600 11px 'Pretendard'", color: "#111" }}>
                    강남구 ➔ 에스파 우세 확대
                  </div>
                  <div className="hint">13:41</div>
                </div>
              </div>
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

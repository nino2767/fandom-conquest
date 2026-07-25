"use client";

import React, { useState } from "react";

interface FandomIpItem {
  id: string;
  type: "GROUP" | "UNIT" | "SOLO";
  name: string;
  subName: string;
  genreRegion: string;
  mapping: string;
  mappingColor?: string;
  signatureHex: string;
  weight: string;
  usersCount: string;
}

const FANDOM_IPS: FandomIpItem[] = [
  {
    id: "f1",
    type: "GROUP",
    name: "세븐틴 (SEVENTEEN)",
    subName: "세븐틴, SVT, 17",
    genreRegion: "DOMESTIC · IDOL_GROUP",
    mapping: "유닛 3 · 멤버 13 연결",
    signatureHex: "#A9C4FF",
    weight: "1.1x",
    usersCount: "24,500",
  },
  {
    id: "f2",
    type: "UNIT",
    name: "부석순 (BSS)",
    subName: "부석순, BSS, 파이팅해야지",
    genreRegion: "DOMESTIC · IDOL_GROUP",
    mapping: "↳ 상위: 세븐틴",
    mappingColor: "#c98a10",
    signatureHex: "#FF6B6B",
    weight: "1.0x",
    usersCount: "8,900",
  },
  {
    id: "f3",
    type: "SOLO",
    name: "승관 (Seungkwan)",
    subName: "승관, 부승관, Seungkwan",
    genreRegion: "DOMESTIC · SINGER_SOLO",
    mapping: "↳ 상위: 부석순",
    mappingColor: "#c98a10",
    signatureHex: "#FF8E53",
    weight: "1.0x",
    usersCount: "4,200",
  },
  {
    id: "f4",
    type: "GROUP",
    name: "뉴진스 (NewJeans)",
    subName: "뉴진스, NJ, 버니즈",
    genreRegion: "DOMESTIC · IDOL_GROUP",
    mapping: "멤버 5 연결",
    signatureHex: "#2F6BFF",
    weight: "1.2x",
    usersCount: "31,000",
  },
  {
    id: "f5",
    type: "SOLO",
    name: "변우석 (Byeon Woo-seok)",
    subName: "변우석, 선재, 통통이",
    genreRegion: "DOMESTIC · ACTOR",
    mapping: "소속: VARO엔터 (독립)",
    signatureHex: "#9C36B5",
    weight: "1.1x",
    usersCount: "19,800",
  },
];

export default function FandomIpPage() {
  const [isIpModalOpen, setIsIpModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Header Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            팬덤 IP &amp; 브랜드 마스터 (ADM-SYS-01 v0.2)
          </span>
          <span className="tag" style={{ borderColor: "#111", color: "#111" }}>
            v0.2
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="btn-l"
            onClick={() => showToast("📩 유저 신규 팬덤 신청 수신함 (5건)이 열렸습니다.")}
            style={{ padding: "7px 12px", fontSize: 11, cursor: "pointer" }}
          >
            신규 팬덤 신청 큐 (5)
          </button>
          <button
            className="btn-d"
            onClick={() => setIsIpModalOpen(true)}
            style={{ padding: "7px 14px", fontSize: 11, cursor: "pointer" }}
          >
            + IP 신규 등록
          </button>
        </div>
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
        {/* Filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <div className="fld" style={{ width: 130, padding: "7px 10px", fontSize: 11 }}>
            지역: 전체 ▾
          </div>
          <div className="fld" style={{ width: 130, padding: "7px 10px", fontSize: 11 }}>
            장르: 전체 ▾
          </div>
          <div className="fld" style={{ width: 150, padding: "7px 10px", fontSize: 11 }}>
            유형: 전체 ▾
          </div>
          <input
            type="text"
            placeholder="팬덤 / 아티스트 / 별칭 검색..."
            style={{
              flex: 1,
              minWidth: 200,
              padding: "7px 11px",
              border: "1px solid #ddd",
              font: "400 11px 'Pretendard'",
              background: "#fff",
              outline: "none",
            }}
          />
        </div>

        {/* 3-Tier Master Table */}
        <div className="admin-card" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="thr">
            <span style={{ width: 74 }}>유형</span>
            <span style={{ flex: 1.5 }}>팬덤 IP (영문/별칭)</span>
            <span style={{ width: 150 }}>장르 / 지역</span>
            <span style={{ width: 140 }}>3계층 상하위 매핑</span>
            <span style={{ width: 104 }}>시그니처</span>
            <span style={{ width: 56 }}>가중치</span>
            <span style={{ width: 84 }}>귀속 유저</span>
            <span style={{ width: 56 }}>액션</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {FANDOM_IPS.map((row) => (
              <div key={row.id} className="tr">
                <span style={{ width: 74 }}>
                  <span
                    className="tag"
                    style={{
                      borderColor:
                        row.type === "GROUP"
                          ? "#7b61c9"
                          : row.type === "UNIT"
                          ? "#e0a020"
                          : "#1fa16b",
                      color:
                        row.type === "GROUP"
                          ? "#7b61c9"
                          : row.type === "UNIT"
                          ? "#c98a10"
                          : "#1fa16b",
                    }}
                  >
                    {row.type}
                  </span>
                </span>
                <span style={{ flex: 1.5 }}>
                  <span className="nm">{row.name}</span>
                  <br />
                  <span className="hint">{row.subName}</span>
                </span>
                <span style={{ width: 150 }}>
                  <span className="hint">{row.genreRegion}</span>
                </span>
                <span style={{ width: 140 }}>
                  <span
                    style={{
                      font: "500 10px 'Pretendard'",
                      color: row.mappingColor || "#9a9a9a",
                    }}
                  >
                    {row.mapping}
                  </span>
                </span>
                <span style={{ width: 104 }}>
                  <span className="pill">
                    <span className="col" style={{ background: row.signatureHex }} />
                    <span style={{ font: "500 10px ui-monospace,monospace" }}>
                      {row.signatureHex}
                    </span>
                  </span>
                </span>
                <span style={{ width: 56, color: "#111", fontWeight: 600 }}>
                  {row.weight}
                </span>
                <span style={{ width: 84, color: "#555" }}>{row.usersCount}</span>
                <span style={{ width: 56 }}>
                  <button
                    onClick={() => setIsIpModalOpen(true)}
                    style={{
                      font: "500 10px 'Pretendard'",
                      color: "#111",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    상세
                  </button>
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "12px 16px",
              background: "#fafafa",
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <span className="hint" style={{ lineHeight: 1.6 }}>
              <b style={{ fontWeight: 600, color: "#111" }}>상향 상속 (Upward Roll-up):</b> 승관(SOLO)으로 인증 ➔ 승관 +1점과 동시에 부석순(UNIT) · 세븐틴(GROUP root) +1점 자동 합산. 지도 핀 마커는 최애 시그니처 컬러, 25구 영토 채색은 최상위 그룹 합산 점수 기준입니다.
            </span>
          </div>
        </div>
      </div>

        {/* IP Edit Modal */}
        {isIpModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 99999,
            }}
          >
            <div
              style={{
                width: 520,
                maxWidth: "90%",
                background: "#fff",
                border: "1px solid #ddd",
                boxShadow: "0 24px 56px -26px rgba(0,0,0,.3)",
                padding: "22px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 16,
                }}
              >
                <span style={{ font: "700 15px 'Pretendard'", color: "#111" }}>
                  팬덤 IP 등록 / 수정 (g5b)
                </span>
                <span className="hint">MODAL-IP-EDIT</span>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div className="fl">국가/지역</div>
                  <div className="fld" style={{ padding: "8px 10px" }}>
                    DOMESTIC (국내) ▾
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="fl">장르</div>
                  <div className="fld" style={{ padding: "8px 10px" }}>
                    IDOL_GROUP ▾
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div className="fl">IP 구분 유형</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      textAlign: "center",
                      border: "1px solid #ddd",
                      font: "500 11px 'Pretendard'",
                      color: "#9a9a9a",
                    }}
                  >
                    GROUP
                  </span>
                  <span
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      textAlign: "center",
                      border: "1.5px solid #111",
                      font: "600 11px 'Pretendard'",
                      color: "#111",
                      background: "#f5f5f5",
                    }}
                  >
                    UNIT
                  </span>
                  <span
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      textAlign: "center",
                      border: "1px solid #ddd",
                      font: "500 11px 'Pretendard'",
                      color: "#9a9a9a",
                    }}
                  >
                    SOLO
                  </span>
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div className="fl">
                  직속 상위 IP 연결 (parent_fandom_id)
                </div>
                <div className="fld" style={{ padding: "8px 10px" }}>
                  FANDOM-04 (세븐틴) — 루트 자동 매핑 ▾
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div className="fl">팬덤 정식명</div>
                  <div className="fld" style={{ padding: "8px 10px" }}>
                    부석순
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="fl">영문 공식명</div>
                  <div className="fld" style={{ padding: "8px 10px" }}>
                    BSS
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 14,
                  padding: "12px 14px",
                  border: "1px solid #e7e7e7",
                  background: "#fafafa",
                }}
              >
                <div style={{ width: 52 }}>
                  <div className="fl">엠블럼</div>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      border: "1px dashed #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#fff",
                    }}
                  >
                    <span className="hint">SVG</span>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="fl">대표 식별 컬러 (HEX Token)</div>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        width: 34,
                        height: 34,
                        background: "#FF6B6B",
                        flex: "none",
                      }}
                    />
                    <span
                      className="fld"
                      style={{
                        flex: 1,
                        padding: "8px 10px",
                        font: "500 11.5px ui-monospace,monospace",
                      }}
                    >
                      #FF6B6B
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 7,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span
                      className="pill"
                      style={{ color: "#1fa16b", fontWeight: 600 }}
                    >
                      ✓ WCAG AA 통과
                    </span>
                    <span className="hint">대비 4.9:1 · 지도 채색 정상</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 10,
                }}
              >
                <button
                  className="btn-l"
                  onClick={() => setIsIpModalOpen(false)}
                  style={{ flex: 1, height: 44, cursor: "pointer" }}
                >
                  취소
                </button>
                <button
                  className="btn-d"
                  onClick={() => {
                    showToast(
                      "✅ 팬덤 IP 정보가 저장 및 전역 반영되었습니다."
                    );
                    setIsIpModalOpen(false);
                  }}
                  style={{ flex: 1.6, height: 44, cursor: "pointer" }}
                >
                  저장 확정
                </button>
              </div>
            </div>
          </div>
        )}

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

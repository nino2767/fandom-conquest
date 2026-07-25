"use client";

import React, { useState } from "react";

interface UserSanctionItem {
  id: string;
  username: string;
  nickname: string;
  userId: string;
  statusText: string;
  statusColor: string;
  riskScore: number;
  riskBg?: string;
  riskColor?: string;
  riskBorder?: string;
  appealStatus: string;
  sanctionCount: number;
  contributionPoints: string;
  relatedAccounts: number;
  history: { title: string; hint: string; color: string }[];
  appealText?: string;
  appealDate?: string;
}

const SANCTION_LIST: UserSanctionItem[] = [
  {
    id: "s1",
    username: "bunny_01",
    nickname: "뉴진스팬덕",
    userId: "user_82fd",
    statusText: "◐ 1차 경고",
    statusColor: "#e08a00",
    riskScore: 85,
    riskBg: "#d64545",
    riskColor: "#fff",
    appealStatus: "● 접수",
    sanctionCount: 2,
    contributionPoints: "1,240",
    relatedAccounts: 6,
    history: [
      {
        title: "1차 경고 — 동일 IP 다계정 정황",
        hint: "admin_02 · 2026.07.24 14:32 · 자동 탐지 연동",
        color: "#e08a00",
      },
      {
        title: "GPS 반경 밖 인증 플래그 3건",
        hint: "시스템 · 2026.07.20",
        color: "#dcdcdc",
      },
    ],
    appealText:
      '"집과 회사 두 기기로 로그인해서 IP가 겹친 것 같아요. 다계정 아닙니다. 인증은 모두 실제 방문입니다."',
    appealDate: "2026.07.24 16:10 접수",
  },
  {
    id: "s2",
    username: "dive_yj",
    nickname: "안유진짱",
    userId: "user_5c2a",
    statusText: "◐ 1차 경고",
    statusColor: "#e08a00",
    riskScore: 62,
    riskColor: "#e08a00",
    riskBorder: "1px solid #e08a00",
    appealStatus: "—",
    sanctionCount: 1,
    contributionPoints: "850",
    relatedAccounts: 1,
    history: [
      {
        title: "1차 경고 — 영수증 결제 시각 불일치",
        hint: "admin_01 · 2026.07.22",
        color: "#e08a00",
      },
    ],
  },
  {
    id: "s3",
    username: "luv_dup_a",
    nickname: "다계정 의심",
    userId: "user_991a",
    statusText: "● 2차 정지",
    statusColor: "#d64545",
    riskScore: 91,
    riskBg: "#d64545",
    riskColor: "#fff",
    appealStatus: "● 접수",
    sanctionCount: 3,
    contributionPoints: "3,400",
    relatedAccounts: 12,
    history: [
      {
        title: "2차 7일 정지 — 다계정 봇 가동",
        hint: "admin_03 · 2026.07.23",
        color: "#d64545",
      },
    ],
    appealText: '"동생 계정 재방문건입니다. 확인해주세요."',
    appealDate: "2026.07.24 11:20 접수",
  },
  {
    id: "s4",
    username: "fake_gps_7",
    nickname: "GPS 스푸핑",
    userId: "user_44cd",
    statusText: "■ 영구정지",
    statusColor: "#111",
    riskScore: 98,
    riskBg: "#111",
    riskColor: "#fff",
    appealStatus: "● 접수",
    sanctionCount: 5,
    contributionPoints: "0 (몰수)",
    relatedAccounts: 18,
    history: [
      {
        title: "영구정지 & 기여분 몰수",
        hint: "super_admin · 2026.07.21",
        color: "#111",
      },
    ],
    appealText: '"오탐인 것 같습니다. 풀어서 몰수 포인트 복구 바랍니다."',
    appealDate: "2026.07.22 09:15 접수",
  },
];

export default function UserSanctionPage() {
  const [selectedId, setSelectedId] = useState<string>("s1");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedItem =
    SANCTION_LIST.find((item) => item.id === selectedId) || SANCTION_LIST[0];

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
            유저 제재 &amp; 소명 관리
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            제재 대기 6 · 소명 접수 3
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="fld" style={{ padding: "5px 10px", fontSize: 11, cursor: "pointer" }}>
            상태: 전체 ▾
          </div>
          <div className="fld" style={{ padding: "5px 10px", fontSize: 11, cursor: "pointer" }}>
            소명 여부 ▾
          </div>
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
          <div className="thr">
            <span style={{ flex: 1.4 }}>계정 / 닉네임</span>
            <span style={{ width: 100 }}>현재 상태</span>
            <span style={{ width: 90 }}>Risk</span>
            <span style={{ width: 70 }}>소명</span>
          </div>

          {SANCTION_LIST.map((item) => {
            const isSel = item.id === selectedId;
            return (
              <div
                key={item.id}
                className={`tr ${isSel ? "sel" : ""}`}
                onClick={() => setSelectedId(item.id)}
                style={{ cursor: "pointer" }}
              >
                <span style={{ flex: 1.4 }}>
                  <span className="nm" style={{ color: item.username === "fake_gps_7" ? "#9a9a9a" : "#111" }}>
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
                      background: item.riskBg || "transparent",
                      color: item.riskColor || "#111",
                      border: item.riskBorder || "none",
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
                  color: "#111",
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
                onClick={() =>
                  showToast(
                    `✅ ${selectedItem.username} 님의 소명이 인용되어 경고가 해제되었습니다.`
                  )
                }
                style={{ flex: 1, height: 42, cursor: "pointer" }}
              >
                소명 인용 · 경고 해제
              </button>
              <button
                className="btn-l"
                onClick={() =>
                  showToast(
                    `⚠️ ${selectedItem.username} 님에게 2차 7일 정지가 부여되었습니다.`
                  )
                }
                style={{
                  flex: 1,
                  height: 42,
                  color: "#e08a00",
                  borderColor: "#e08a00",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                2차 7일 정지
              </button>
            </div>
            <button
              className="btn-l"
              onClick={() =>
                showToast(
                  `🚫 ${selectedItem.username} 님이 영구정지 및 기여분이 몰수 처리되었습니다.`
                )
              }
              style={{
                height: 44,
                color: "#d64545",
                borderColor: "#d64545",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              영구정지 &amp; 기여분 몰수 (SUPER_ADMIN)
            </button>
          </div>
        </div>
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

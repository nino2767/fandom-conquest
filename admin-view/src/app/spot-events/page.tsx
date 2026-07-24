"use client";

import React, { useState } from "react";

interface SpotEventItem {
  id: string;
  title: string;
  storeName: string;
  type: "EVENT" | "PERMANENT";
  fandom: string;
  fandomColor: string;
  startDate: string;
  endDate: string;
  status: "운영중" | "대기" | "마감 (ARCHIVED)";
}

const INITIAL_EVENTS: SpotEventItem[] = [
  {
    id: "EVENT-01",
    title: "안유진 생일 기념 생카 이벤트",
    storeName: "카페 므므흐스 성수",
    type: "EVENT",
    fandom: "아이브 (안유진)",
    fandomColor: "#f59f00",
    startDate: "2026.07.28",
    endDate: "2026.08.03",
    status: "운영중",
  },
  {
    id: "EVENT-02",
    title: "뉴진스 2주년 팝업스토어 성수",
    storeName: "성수 팩토리",
    type: "EVENT",
    fandom: "뉴진스",
    fandomColor: "#2f6bff",
    startDate: "2026.08.01",
    endDate: "2026.08.15",
    status: "대기",
  },
  {
    id: "EVENT-03",
    title: "에스파 강남 상설 제휴 거점",
    storeName: "스타벅스 강남대로점",
    type: "PERMANENT",
    fandom: "에스파",
    fandomColor: "#e64980",
    startDate: "2026.01.01",
    endDate: "상설 운영",
    status: "운영중",
  },
];

export default function SpotEventsPage() {
  const [events] = useState<SpotEventItem[]>(INITIAL_EVENTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="admin-title">성지 핀 이벤트 관리</div>
          <span style={{ font: "400 10.5px 'Pretendard'", color: "#9a9a9a" }}>
            총 {events.length}개 이벤트 핀
          </span>
        </div>
        <button
          onClick={() => showToast("➕ 신규 성지 핀 이벤트 생성 모달이 열렸습니다.")}
          style={{
            padding: "6px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          + 신규 이벤트 핀 생성
        </button>
      </div>

      <div style={{ flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
        <div className="admin-card" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              borderBottom: "1px solid #f0f0f0",
              font: "500 10px 'Pretendard'",
              color: "#9a9a9a",
              background: "#fafafa",
            }}
          >
            <span style={{ width: 100 }}>핀 ID</span>
            <span style={{ flex: 1 }}>이벤트 타이틀</span>
            <span style={{ width: 150 }}>연동 가맹점</span>
            <span style={{ width: 100 }}>유형</span>
            <span style={{ width: 120 }}>귀속 팬덤</span>
            <span style={{ width: 160 }}>운영 기간</span>
            <span style={{ width: 100 }}>상태</span>
          </div>

          {events.map((row) => (
            <div
              key={row.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ width: 100, font: "400 10.5px 'Pretendard'", color: "#8a8a8a" }}>
                {row.id}
              </span>
              <span style={{ flex: 1, font: "600 12px 'Pretendard'", color: "#111" }}>
                {row.title}
              </span>
              <span style={{ width: 150, font: "400 11px 'Pretendard'", color: "#555" }}>
                {row.storeName}
              </span>
              <span
                style={{
                  width: 100,
                  font: "600 10px 'Pretendard'",
                  color: row.type === "EVENT" ? "#e08a00" : "#2f6bff",
                }}
              >
                {row.type === "EVENT" ? "이벤트형" : "상설형"}
              </span>
              <span style={{ width: 120, font: "500 11px 'Pretendard'", color: "#111" }}>
                <span style={{ color: row.fandomColor }}>●</span> {row.fandom}
              </span>
              <span style={{ width: 160, font: "400 10.5px 'Pretendard'", color: "#555" }}>
                {row.startDate} ~ {row.endDate}
              </span>
              <span
                style={{
                  width: 100,
                  font: "600 10px 'Pretendard'",
                  color: row.status === "운영중" ? "#1fa16b" : "#8a8a8a",
                }}
              >
                {row.status}
              </span>
            </div>
          ))}
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

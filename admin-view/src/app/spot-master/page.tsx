"use client";

import React, { useState } from "react";

interface SpotMasterItem {
  id: string;
  pinName: string;
  placeName: string;
  fandomName: string;
  fandomColor: string;
  activeStatus: "ACTIVE" | "INACTIVE";
}

const SPOTS: SpotMasterItem[] = [
  {
    id: "spot_01",
    pinName: "안유진 생일카페 핀",
    placeName: "카페 므므흐스 성수",
    fandomName: "아이브",
    fandomColor: "#F59F00",
    activeStatus: "ACTIVE",
  },
  {
    id: "spot_02",
    pinName: "승관 성수 핫스팟 핀",
    placeName: "투썸플레이스 성수역점",
    fandomName: "승관",
    fandomColor: "#FF8E53",
    activeStatus: "ACTIVE",
  },
  {
    id: "spot_03",
    pinName: "뉴진스 상설 성지 핀",
    placeName: "언더스탠드 카페",
    fandomName: "뉴진스",
    fandomColor: "#2F6BFF",
    activeStatus: "ACTIVE",
  },
];

export default function SpotMasterPage() {
  const [spotList] = useState<SpotMasterItem[]>(SPOTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            성지 핀 관리 (Spot Pin Master)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            등록 핀 {spotList.length}개 · 지도 마커 동기화
          </span>
        </div>
        <button
          onClick={() => showToast("📍 신규 성지 핀 등록 폼이 열렸습니다.")}
          style={{
            padding: "7px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          + 핀 신규 맵핑
        </button>
      </div>

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
        <div className="admin-card" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="thr">
            <span style={{ width: 120 }}>핀 ID</span>
            <span style={{ flex: 1.5 }}>핀 마커 명칭</span>
            <span style={{ flex: 1.5 }}>연동 거점 장소</span>
            <span style={{ width: 140 }}>귀속 팬덤</span>
            <span style={{ width: 100 }}>상태</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {spotList.map((row) => (
              <div key={row.id} className="tr">
                <span style={{ width: 120, font: "600 11px ui-monospace,monospace", color: "#111" }}>
                  {row.id}
                </span>
                <span style={{ flex: 1.5, font: "600 11.5px 'Pretendard'", color: "#111" }}>
                  {row.pinName}
                </span>
                <span style={{ flex: 1.5, color: "#555" }}>{row.placeName}</span>
                <span style={{ width: 140 }}>
                  <span className="pill">
                    <span className="col" style={{ background: row.fandomColor }} />
                    {row.fandomName}
                  </span>
                </span>
                <span style={{ width: 100 }}>
                  <span className="pill" style={{ color: "#1fa16b" }}>
                    ● {row.activeStatus}
                  </span>
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

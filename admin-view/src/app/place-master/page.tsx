"use client";

import React, { useState } from "react";

interface PlaceMasterItem {
  id: string;
  name: string;
  bizNum: string;
  address: string;
  category: string;
  status: "ACTIVE" | "PENDING";
}

const PLACES: PlaceMasterItem[] = [
  {
    id: "place_01",
    name: "카페 므므흐스 성수",
    bizNum: "120-88-99120",
    address: "서울 성동구 연무장길 47",
    category: "카페 / 디저트",
    status: "ACTIVE",
  },
  {
    id: "place_02",
    name: "투썸플레이스 성수역점",
    bizNum: "466-25-01942",
    address: "서울 성동구 성수동2가 300-1",
    category: "프랜차이즈 카페",
    status: "ACTIVE",
  },
  {
    id: "place_03",
    name: "어반소스 성수점",
    bizNum: "220-81-77889",
    address: "서울 성동구 연무장3길 9",
    category: "복합문화공간",
    status: "ACTIVE",
  },
];

export default function PlaceMasterPage() {
  const [placeList] = useState<PlaceMasterItem[]>(PLACES);
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
            장소 마스터 (Place Master)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            등록 거점 {placeList.length}개 · 사업자 번호 대조 기반
          </span>
        </div>
        <button
          onClick={() => showToast("➕ 신규 거점 등록 모달이 열렸습니다.")}
          style={{
            padding: "7px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          + 거점 장소 등록
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
            <span style={{ width: 120 }}>ID</span>
            <span style={{ flex: 1.5 }}>장소명 (상호)</span>
            <span style={{ width: 140 }}>사업자 등록 번호</span>
            <span style={{ flex: 2 }}>도로명 주소</span>
            <span style={{ width: 120 }}>카테고리</span>
            <span style={{ width: 80 }}>상태</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {placeList.map((row) => (
              <div key={row.id} className="tr">
                <span style={{ width: 120, font: "600 11px ui-monospace,monospace", color: "#111" }}>
                  {row.id}
                </span>
                <span style={{ flex: 1.5, font: "500 11.5px 'Pretendard'", color: "#111" }}>
                  {row.name}
                </span>
                <span style={{ width: 140, fontFamily: "monospace", color: "#8a8a8a" }}>
                  {row.bizNum}
                </span>
                <span style={{ flex: 2, color: "#555" }}>{row.address}</span>
                <span style={{ width: 120, color: "#8a8a8a" }}>{row.category}</span>
                <span style={{ width: 80 }}>
                  <span className="pill" style={{ color: "#1fa16b" }}>
                    ● {row.status}
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

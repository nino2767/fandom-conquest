"use client";

import React, { useState } from "react";

interface PlaceItem {
  id: string;
  name: string;
  bizNum: string;
  address: string;
  district: string;
  status: "정상 (ACTIVE)" | "휴업 (TEMPORARY)" | "폐업 (CLOSED)";
  provider: "카카오" | "구글";
}

const INITIAL_PLACES: PlaceItem[] = [
  {
    id: "PLC-001",
    name: "투썸플레이스 성수역점",
    bizNum: "466-25-01942",
    address: "서울 성동구 아차산로 100",
    district: "성동구",
    status: "정상 (ACTIVE)",
    provider: "카카오",
  },
  {
    id: "PLC-002",
    name: "카페 므므흐스 성수",
    bizNum: "120-88-99120",
    address: "서울 성동구 연무장길 47 1층",
    district: "성동구",
    status: "정상 (ACTIVE)",
    provider: "카카오",
  },
  {
    id: "PLC-003",
    name: "스타벅스 강남대로점",
    bizNum: "220-81-12345",
    address: "서울 강남구 강남대로 390",
    district: "강남구",
    status: "정상 (ACTIVE)",
    provider: "카카오",
  },
  {
    id: "PLC-004",
    name: "구글 성수 팝업 홀",
    bizNum: "105-86-54321",
    address: "서울 성동구 성수이로 88",
    district: "성동구",
    status: "폐업 (CLOSED)",
    provider: "구글",
  },
];

export default function PlaceMasterPage() {
  const [places] = useState<PlaceItem[]>(INITIAL_PLACES);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const filteredPlaces = places.filter(
    (p) =>
      p.name.includes(searchTerm) ||
      p.bizNum.includes(searchTerm) ||
      p.address.includes(searchTerm)
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="admin-title">장소 마스터 관리 (Place Master)</div>
          <span style={{ font: "400 10.5px 'Pretendard'", color: "#9a9a9a" }}>
            원천 장소 DB 총 {places.length}개
          </span>
        </div>
        <button
          onClick={() => showToast("🗺️ 지도 API(카카오/구글) 연동 장소 검색 등록 모달이 열렸습니다.")}
          style={{
            padding: "6px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          + 지도 API 장소 검색 등록
        </button>
      </div>

      <div style={{ flex: 1, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
        {/* Search */}
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="🔍 상호명 · 사업자번호 · 도로명 주소 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 12px",
              border: "1px solid #ddd",
              font: "400 11px 'Pretendard'",
              outline: "none",
            }}
          />
        </div>

        {/* Table */}
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
            <span style={{ width: 90 }}>장소 ID</span>
            <span style={{ flex: 1 }}>상호명</span>
            <span style={{ width: 120 }}>사업자등록번호</span>
            <span style={{ width: 220 }}>도로명 주소</span>
            <span style={{ width: 90 }}>지역구</span>
            <span style={{ width: 80 }}>연동 Map</span>
            <span style={{ width: 110 }}>영업 상태</span>
          </div>

          {filteredPlaces.map((row) => (
            <div
              key={row.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ width: 90, font: "400 10.5px 'Pretendard'", color: "#8a8a8a" }}>
                {row.id}
              </span>
              <span style={{ flex: 1, font: "600 12px 'Pretendard'", color: "#111" }}>
                {row.name}
              </span>
              <span style={{ width: 120, font: "400 11px 'Pretendard'", color: "#555" }}>
                {row.bizNum}
              </span>
              <span style={{ width: 220, font: "400 11px 'Pretendard'", color: "#555" }}>
                {row.address}
              </span>
              <span style={{ width: 90, font: "500 11px 'Pretendard'", color: "#111" }}>
                {row.district}
              </span>
              <span style={{ width: 80, font: "500 10.5px 'Pretendard'", color: "#555" }}>
                {row.provider}
              </span>
              <span
                style={{
                  width: 110,
                  font: "600 10px 'Pretendard'",
                  color: row.status === "정상 (ACTIVE)" ? "#1fa16b" : "#d64545",
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

"use client";

import React, { useState } from "react";

interface SpotMasterRow {
  id: string;
  name: string;
  district: string;
  category: string;
  fandom: string;
  fandomColor: string;
  status: "운영중" | "종료예정" | "만료";
  certCount: number;
}

const INITIAL_SPOTS: SpotMasterRow[] = [
  {
    id: "SPOT-001",
    name: "카페 므므흐스 성수",
    district: "성동구",
    category: "생일카페",
    fandom: "아이브 (안유진)",
    fandomColor: "#f59f00",
    status: "운영중",
    certCount: 142,
  },
  {
    id: "SPOT-002",
    name: "스타벅스 성수역점",
    district: "성동구",
    category: "일반가맹점",
    fandom: "뉴진스",
    fandomColor: "#2f6bff",
    status: "운영중",
    certCount: 389,
  },
  {
    id: "SPOT-003",
    name: "강남 팩토리 팝업스토어",
    district: "강남구",
    category: "팝업스토어",
    fandom: "에스파",
    fandomColor: "#e64980",
    status: "종료예정",
    certCount: 512,
  },
  {
    id: "SPOT-004",
    name: "마포 연남 디저트랩",
    district: "마포구",
    category: "생일카페",
    fandom: "뉴진스",
    fandomColor: "#2f6bff",
    status: "만료",
    certCount: 98,
  },
];

export default function SpotMasterPage() {
  const [spots, setSpots] = useState<SpotMasterRow[]>(INITIAL_SPOTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpot, setSelectedSpot] = useState<SpotMasterRow | null>(INITIAL_SPOTS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const filteredSpots = spots.filter(
    (s) =>
      s.name.includes(searchTerm) ||
      s.district.includes(searchTerm) ||
      s.category.includes(searchTerm) ||
      s.fandom.includes(searchTerm)
  );

  const handleSaveDetail = () => {
    if (!selectedSpot) return;
    setSpots((prev) =>
      prev.map((item) => (item.id === selectedSpot.id ? selectedSpot : item))
    );
    showToast(`💾 [${selectedSpot.name}] 정보가 저장되었습니다.`);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      {/* Top Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="admin-title">성지 / 가맹점 마스터</div>
          <span style={{ font: "400 10.5px 'Pretendard'", color: "#9a9a9a" }}>
            총 {spots.length}곳 · 운영중 {spots.filter((s) => s.status === "운영중").length}
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => showToast("📥 CSV 내보내기가 완료되었습니다.")}
            style={{
              padding: "6px 12px",
              border: "1px solid #ddd",
              background: "#fff",
              font: "500 11px 'Pretendard'",
              color: "#555",
              cursor: "pointer",
            }}
          >
            CSV 내보내기
          </button>
          <button
            onClick={() => showToast("➕ 성지 직접 등록 폼이 열렸습니다.")}
            style={{
              padding: "6px 14px",
              background: "#111",
              color: "#fff",
              border: "none",
              font: "700 11px 'Pretendard'",
              cursor: "pointer",
            }}
          >
            + 성지 직접 등록
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
        {/* Left: Master Table */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #e7e7e7",
            minWidth: 0,
            background: "#fff",
          }}
        >
          {/* Search Bar */}
          <div
            style={{
              display: "flex",
              gap: 8,
              padding: "12px 16px",
              borderBottom: "1px solid #e7e7e7",
            }}
          >
            <input
              type="text"
              placeholder="🔍 상호명 · 구 · 카테고리 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: "7px 11px",
                border: "1px solid #ddd",
                font: "400 11px 'Pretendard'",
                outline: "none",
              }}
            />
          </div>

          {/* Table Header */}
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
            <span style={{ width: 80 }}>ID</span>
            <span style={{ flex: 1 }}>상호명</span>
            <span style={{ width: 70 }}>지역</span>
            <span style={{ width: 85 }}>유형</span>
            <span style={{ width: 120 }}>귀속 팬덤</span>
            <span style={{ width: 70 }}>상태</span>
            <span style={{ width: 70 }}>인증수</span>
          </div>

          {/* Table Rows */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {filteredSpots.map((item) => {
              const isSelected = selectedSpot?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedSpot(item)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "11px 16px",
                    borderBottom: "1px solid #f0f0f0",
                    background: isSelected ? "#f5f5f5" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ width: 80, font: "400 10.5px 'Pretendard'", color: "#8a8a8a" }}>
                    {item.id}
                  </span>
                  <span style={{ flex: 1, font: "600 11.5px 'Pretendard'", color: "#111" }}>
                    {item.name}
                  </span>
                  <span style={{ width: 70, font: "400 11px 'Pretendard'", color: "#555" }}>
                    {item.district}
                  </span>
                  <span style={{ width: 85, font: "400 11px 'Pretendard'", color: "#555" }}>
                    {item.category}
                  </span>
                  <span style={{ width: 120, font: "500 11px 'Pretendard'", color: "#111" }}>
                    <span style={{ color: item.fandomColor }}>●</span> {item.fandom}
                  </span>
                  <span
                    style={{
                      width: 70,
                      font: "600 10px 'Pretendard'",
                      color:
                        item.status === "운영중"
                          ? "#1fa16b"
                          : item.status === "종료예정"
                          ? "#e08a00"
                          : "#8a8a8a",
                    }}
                  >
                    {item.status}
                  </span>
                  <span style={{ width: 70, font: "600 11.5px 'Pretendard'", color: "#111" }}>
                    {item.certCount}건
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Edit Detail Panel */}
        {selectedSpot && (
          <div
            style={{
              width: "360px",
              flex: "none",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              background: "#fdfdfd",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                font: "700 12px 'Pretendard'",
                color: "#111",
                marginBottom: 14,
              }}
            >
              성지 상세 편집 ({selectedSpot.id})
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    font: "400 10.5px 'Pretendard'",
                    color: "#777",
                    marginBottom: 4,
                  }}
                >
                  상호명
                </label>
                <input
                  type="text"
                  value={selectedSpot.name}
                  onChange={(e) =>
                    setSelectedSpot({ ...selectedSpot, name: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "7px 10px",
                    border: "1px solid #ddd",
                    font: "500 11.5px 'Pretendard'",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    font: "400 10.5px 'Pretendard'",
                    color: "#777",
                    marginBottom: 4,
                  }}
                >
                  장소 카테고리
                </label>
                <input
                  type="text"
                  value={selectedSpot.category}
                  onChange={(e) =>
                    setSelectedSpot({ ...selectedSpot, category: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "7px 10px",
                    border: "1px solid #ddd",
                    font: "500 11.5px 'Pretendard'",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    font: "400 10.5px 'Pretendard'",
                    color: "#777",
                    marginBottom: 4,
                  }}
                >
                  운영 상태
                </label>
                <select
                  value={selectedSpot.status}
                  onChange={(e) =>
                    setSelectedSpot({
                      ...selectedSpot,
                      status: e.target.value as "운영중" | "종료예정" | "만료",
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "7px 10px",
                    border: "1px solid #ddd",
                    font: "500 11.5px 'Pretendard'",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="운영중">운영중</option>
                  <option value="종료예정">종료예정</option>
                  <option value="만료">만료</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    font: "400 10.5px 'Pretendard'",
                    color: "#777",
                    marginBottom: 4,
                  }}
                >
                  귀속 팬덤
                </label>
                <input
                  type="text"
                  value={selectedSpot.fandom}
                  onChange={(e) =>
                    setSelectedSpot({ ...selectedSpot, fandom: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "7px 10px",
                    border: "1px solid #ddd",
                    font: "500 11.5px 'Pretendard'",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: "auto", paddingTop: 16 }}>
              <button
                onClick={handleSaveDetail}
                style={{
                  width: "100%",
                  height: 42,
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  font: "700 12px 'Pretendard'",
                  cursor: "pointer",
                }}
              >
                변경사항 저장
              </button>
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

"use client";

import React, { useState } from "react";

interface FandomIpItem {
  id: string;
  name: string;
  agency: string;
  primaryColor: string;
  weightMultiplier: number;
  activeSpots: number;
}

const INITIAL_FANDOMS: FandomIpItem[] = [
  {
    id: "FANDOM-01",
    name: "뉴진스 (NewJeans)",
    agency: "어도어",
    primaryColor: "#2f6bff",
    weightMultiplier: 1.2,
    activeSpots: 48,
  },
  {
    id: "FANDOM-02",
    name: "에스파 (aespa)",
    agency: "SM엔터테인먼트",
    primaryColor: "#e64980",
    weightMultiplier: 1.0,
    activeSpots: 35,
  },
  {
    id: "FANDOM-03",
    name: "아이브 (IVE)",
    agency: "스타쉽엔터테인먼트",
    primaryColor: "#f59f00",
    weightMultiplier: 1.0,
    activeSpots: 29,
  },
  {
    id: "FANDOM-04",
    name: "세븐틴 (SEVENTEEN)",
    agency: "플레디스",
    primaryColor: "#a9c4ff",
    weightMultiplier: 1.1,
    activeSpots: 22,
  },
];

export default function FandomIpPage() {
  const [fandoms, setFandoms] = useState<FandomIpItem[]>(INITIAL_FANDOMS);
  const [selectedFandom, setSelectedFandom] = useState<FandomIpItem | null>(INITIAL_FANDOMS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSave = () => {
    if (!selectedFandom) return;
    setFandoms((prev) =>
      prev.map((f) => (f.id === selectedFandom.id ? selectedFandom : f))
    );
    showToast(`🎨 [${selectedFandom.name}] IP 설정이 저장되었습니다.`);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      {/* Top Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="admin-title">팬덤 IP & 브랜드 관리</div>
          <span style={{ font: "400 10.5px 'Pretendard'", color: "#9a9a9a" }}>
            등록된 IP {fandoms.length}개
          </span>
        </div>
        <button
          onClick={() => showToast("➕ 신규 팬덤 IP 등록 폼이 열렸습니다.")}
          style={{
            padding: "6px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          + 팬덤 IP 신규 등록
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
        {/* Left: Fandom List */}
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
            <span style={{ width: 90 }}>ID</span>
            <span style={{ flex: 1 }}>팬덤 IP명</span>
            <span style={{ width: 120 }}>소속사</span>
            <span style={{ width: 100 }}>대표 컬러</span>
            <span style={{ width: 80 }}>가중치</span>
            <span style={{ width: 80 }}>성지 수</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {fandoms.map((item) => {
              const isSelected = selectedFandom?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedFandom(item)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderBottom: "1px solid #f0f0f0",
                    background: isSelected ? "#f5f5f5" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ width: 90, font: "400 10.5px 'Pretendard'", color: "#8a8a8a" }}>
                    {item.id}
                  </span>
                  <span style={{ flex: 1, font: "600 12px 'Pretendard'", color: "#111" }}>
                    {item.name}
                  </span>
                  <span style={{ width: 120, font: "400 11px 'Pretendard'", color: "#555" }}>
                    {item.agency}
                  </span>
                  <span style={{ width: 100, display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        background: item.primaryColor,
                        borderRadius: 2,
                        border: "1px solid rgba(0,0,0,0.1)",
                      }}
                    />
                    <span style={{ font: "500 10.5px 'Pretendard'", color: "#111" }}>
                      {item.primaryColor}
                    </span>
                  </span>
                  <span style={{ width: 80, font: "600 11px 'Pretendard'", color: "#111" }}>
                    {item.weightMultiplier}x
                  </span>
                  <span style={{ width: 80, font: "400 11px 'Pretendard'", color: "#555" }}>
                    {item.activeSpots}곳
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Edit IP Detail */}
        {selectedFandom && (
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
              IP 브랜딩 편집 ({selectedFandom.id})
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
                  팬덤 IP 명칭
                </label>
                <input
                  type="text"
                  value={selectedFandom.name}
                  onChange={(e) =>
                    setSelectedFandom({ ...selectedFandom, name: e.target.value })
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
                  소속사
                </label>
                <input
                  type="text"
                  value={selectedFandom.agency}
                  onChange={(e) =>
                    setSelectedFandom({ ...selectedFandom, agency: e.target.value })
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
                  대표 식별 컬러 (HEX)
                </label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="color"
                    value={selectedFandom.primaryColor}
                    onChange={(e) =>
                      setSelectedFandom({ ...selectedFandom, primaryColor: e.target.value })
                    }
                    style={{
                      width: 36,
                      height: 32,
                      padding: 0,
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  />
                  <input
                    type="text"
                    value={selectedFandom.primaryColor}
                    onChange={(e) =>
                      setSelectedFandom({ ...selectedFandom, primaryColor: e.target.value })
                    }
                    style={{
                      flex: 1,
                      padding: "7px 10px",
                      border: "1px solid #ddd",
                      font: "500 11.5px 'Pretendard'",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
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
                  점령 산정 가중치 배율
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={selectedFandom.weightMultiplier}
                  onChange={(e) =>
                    setSelectedFandom({
                      ...selectedFandom,
                      weightMultiplier: parseFloat(e.target.value) || 1.0,
                    })
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
                onClick={handleSave}
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
                IP 브랜딩 저장
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

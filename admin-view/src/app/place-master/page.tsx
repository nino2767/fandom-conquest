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
  const [placeList, setPlaceList] = useState<PlaceMasterItem[]>(PLACES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // 거점 등록 모달 상태
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [bizNum, setBizNum] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("카페 / 디저트");

  // 상세 보기 모달 상태
  const [selectedPlace, setSelectedPlace] = useState<PlaceMasterItem | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !bizNum.trim() || !address.trim()) {
      showToast("⚠️ 모든 필드를 입력해주세요.");
      return;
    }

    const newPlace: PlaceMasterItem = {
      id: `place_0${placeList.length + 1}`,
      name: name.trim(),
      bizNum: bizNum.trim(),
      address: address.trim(),
      category,
      status: "ACTIVE",
    };

    setPlaceList((prev) => [newPlace, ...prev]);
    setIsRegisterModalOpen(false);
    
    // 폼 초기화
    setName("");
    setBizNum("");
    setAddress("");
    setCategory("카페 / 디저트");
    
    showToast(`✅ [${newPlace.name}] 거점 장소가 새로 등록되었습니다.`);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            장소 마스터 (Place Master)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            등록 거점 {placeList.length}개 · 목록 클릭 시 상세 보기 팝업
          </span>
        </div>
        <button
          onClick={() => setIsRegisterModalOpen(true)}
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
        <div className="admin-card table-responsive" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="thr" style={{ display: "flex" }}>
            <span style={{ width: 120 }}>ID</span>
            <span style={{ flex: 1.5 }}>장소명 (상호)</span>
            <span style={{ width: 140 }}>사업자 등록 번호</span>
            <span style={{ flex: 2 }}>도로명 주소</span>
            <span style={{ width: 120 }}>카테고리</span>
            <span style={{ width: 80 }}>상태</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {placeList.map((row) => (
              <div
                key={row.id}
                className="tr"
                onClick={() => setSelectedPlace(row)}
                style={{ display: "flex", cursor: "pointer" }}
                title="클릭하여 상세 정보 조회"
              >
                <span style={{ width: 120, font: "600 11px ui-monospace,monospace", color: "#111" }}>
                  {row.id}
                </span>
                <span style={{ flex: 1.5, font: "600 11.5px 'Pretendard'", color: "#111", textDecoration: "underline" }}>
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

      {/* Place Detail Modal */}
      {selectedPlace && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="admin-card"
            style={{
              width: 440,
              padding: "24px 28px",
              background: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0", paddingBottom: 10 }}>
              <span style={{ font: "700 13px 'Pretendard'", color: "#111" }}>
                🔎 거점 장소 상세 정보
              </span>
              <button
                onClick={() => setSelectedPlace(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 16,
                  color: "#999",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>장소 고유 ID</span>
                <span style={{ font: "600 11px ui-monospace,monospace", color: "#111" }}>{selectedPlace.id}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>장소명 (상호)</span>
                <span style={{ font: "600 12px 'Pretendard'", color: "#111" }}>{selectedPlace.name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>사업자 등록 번호</span>
                <span style={{ font: "600 11px ui-monospace,monospace", color: "#111" }}>{selectedPlace.bizNum}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>도로명 주소</span>
                <span style={{ font: "500 11.5px 'Pretendard'", color: "#333", background: "#f5f5f5", padding: "8px 10px", border: "1px solid #e7e7e7" }}>
                  {selectedPlace.address}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>카테고리 분류</span>
                <span style={{ font: "600 11px 'Pretendard'", color: "#111" }}>{selectedPlace.category}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>운영 상태</span>
                <span className="pill" style={{ color: "#1fa16b", fontWeight: "bold" }}>
                  ● {selectedPlace.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPlace(null)}
              className="btn-d"
              style={{ height: 38, cursor: "pointer", marginTop: 10 }}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {isRegisterModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="admin-card"
            style={{
              width: 420,
              padding: "24px 28px",
              background: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ font: "700 13px 'Pretendard'", color: "#111" }}>
                📍 신규 거점 장소 등록
              </span>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 16,
                  color: "#999",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ font: "700 10px 'Pretendard'", color: "#555" }}>장소명 (상호)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 카페 므므흐스 성수"
                  style={{
                    padding: "8px 10px",
                    border: "1px solid #ddd",
                    font: "500 11.5px 'Pretendard'",
                    outline: "none",
                  }}
                  required
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ font: "700 10px 'Pretendard'", color: "#555" }}>사업자 등록 번호</label>
                <input
                  type="text"
                  value={bizNum}
                  onChange={(e) => setBizNum(e.target.value)}
                  placeholder="예: 120-88-99120"
                  style={{
                    padding: "8px 10px",
                    border: "1px solid #ddd",
                    font: "500 11.5px 'Pretendard'",
                    outline: "none",
                  }}
                  required
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ font: "700 10px 'Pretendard'", color: "#555" }}>도로명 주소</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="예: 서울 성동구 연무장길 47"
                  style={{
                    padding: "8px 10px",
                    border: "1px solid #ddd",
                    font: "500 11.5px 'Pretendard'",
                    outline: "none",
                  }}
                  required
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label style={{ font: "700 10px 'Pretendard'", color: "#555" }}>카테고리</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    padding: "8px 10px",
                    border: "1px solid #ddd",
                    font: "500 11.5px 'Pretendard'",
                    background: "#fff",
                    outline: "none",
                  }}
                >
                  <option value="카페 / 디저트">카페 / 디저트</option>
                  <option value="프랜차이즈 카페">프랜차이즈 카페</option>
                  <option value="복합문화공간">복합문화공간</option>
                  <option value="식음료">식음료</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="btn-l"
                  style={{ flex: 1, height: 38, cursor: "pointer" }}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="btn-d"
                  style={{ flex: 1, height: 38, cursor: "pointer" }}
                >
                  등록 완료
                </button>
              </div>
            </form>
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

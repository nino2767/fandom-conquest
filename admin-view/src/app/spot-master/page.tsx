"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";

interface SpotItem {
  id: string;
  name: string;
  address: string;
  fandomName: string;
  fandomColor: string;
  status: "ACTIVE" | "ARCHIVED";
  createdAt?: string;
}

export default function SpotMasterPage() {
  const { spots, addSpotPin } = useAdminData();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // 모달 상태 및 입력 필드
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [pinName, setPinName] = useState("");
  const [address, setAddress] = useState("");
  const [fandomId, setFandomId] = useState("FANDOM-01");

  // 상세 모달 상태
  const [selectedSpot, setSelectedSpot] = useState<SpotItem | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinName.trim() || !address.trim()) {
      showToast("⚠️ 모든 필드를 입력해주세요.");
      return;
    }

    addSpotPin(pinName.trim(), address.trim(), fandomId);
    setIsRegisterModalOpen(false);

    // 폼 초기화
    setPinName("");
    setAddress("");
    setFandomId("FANDOM-01");

    showToast(`✅ [${pinName.trim()}] 성지 핀이 새로 등록되었습니다.`);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            성지 핀 관리 (Spot Pin Master)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            등록 핀 {spots.length}개 · 목록 클릭 시 상세 정보 조회
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
        <div className="admin-card table-responsive" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="thr" style={{ display: "flex" }}>
            <span style={{ width: 120 }}>핀 ID</span>
            <span style={{ flex: 1.5 }}>핀 마커 명칭</span>
            <span style={{ flex: 1.5 }}>연동 거점 장소 주소</span>
            <span style={{ width: 140 }}>귀속 팬덤</span>
            <span style={{ width: 100 }}>상태</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {spots.map((row) => (
              <div
                key={row.id}
                className="tr"
                onClick={() => setSelectedSpot(row)}
                style={{ display: "flex", cursor: "pointer" }}
                title="클릭하여 상세 정보 조회"
              >
                <span style={{ width: 120, font: "600 11px ui-monospace,monospace", color: "#111" }}>
                  {row.id}
                </span>
                <span style={{ flex: 1.5, font: "600 11.5px 'Pretendard'", color: "#111", textDecoration: "underline" }}>
                  {row.name}
                </span>
                <span style={{ flex: 1.5, color: "#555" }}>{row.address}</span>
                <span style={{ width: 140 }}>
                  <span className="pill">
                    <span className="col" style={{ background: row.fandomColor }} />
                    {row.fandomName}
                  </span>
                </span>
                <span style={{ width: 100 }}>
                  <span className="pill" style={{ color: row.status === "ACTIVE" ? "#1fa16b" : "#d64545" }}>
                    ● {row.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spot Detail Modal */}
      {selectedSpot && (
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
                🔎 성지 핀 상세 정보
              </span>
              <button
                onClick={() => setSelectedSpot(null)}
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
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>핀 고유 ID</span>
                <span style={{ font: "600 11px ui-monospace,monospace", color: "#111" }}>{selectedSpot.id}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>핀 마커 명칭</span>
                <span style={{ font: "600 12px 'Pretendard'", color: "#111" }}>{selectedSpot.name}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>연동 거점 주소</span>
                <span style={{ font: "500 11.5px 'Pretendard'", color: "#333", background: "#f5f5f5", padding: "8px 10px", border: "1px solid #e7e7e7" }}>
                  {selectedSpot.address}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>귀속 팬덤 IP</span>
                <span className="pill">
                  <span className="col" style={{ background: selectedSpot.fandomColor }} />
                  {selectedSpot.fandomName}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>지도 등록일자</span>
                <span style={{ font: "600 11px 'Pretendard'", color: "#111" }}>{selectedSpot.createdAt || "2026.07.22"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>마커 활성화 상태</span>
                <span className="pill" style={{ color: selectedSpot.status === "ACTIVE" ? "#1fa16b" : "#d64545", fontWeight: "bold" }}>
                  ● {selectedSpot.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedSpot(null)}
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
                📍 성지 핀 신규 등록
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
                <label style={{ font: "700 10px 'Pretendard'", color: "#555" }}>핀 마커 명칭</label>
                <input
                  type="text"
                  value={pinName}
                  onChange={(e) => setPinName(e.target.value)}
                  placeholder="예: 안유진 생일카페 핀"
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
                <label style={{ font: "700 10px 'Pretendard'", color: "#555" }}>연동 거점 장소 주소</label>
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
                <label style={{ font: "700 10px 'Pretendard'", color: "#555" }}>귀속 팬덤</label>
                <select
                  value={fandomId}
                  onChange={(e) => setFandomId(e.target.value)}
                  style={{
                    padding: "8px 10px",
                    border: "1px solid #ddd",
                    font: "500 11.5px 'Pretendard'",
                    background: "#fff",
                    outline: "none",
                  }}
                >
                  <option value="FANDOM-01">뉴진스</option>
                  <option value="FANDOM-02">에스파</option>
                  <option value="FANDOM-03">아이브</option>
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

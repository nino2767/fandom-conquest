"use client";

import React, { useState } from "react";

interface PinEventItem {
  id: string;
  title: string;
  placeName: string;
  area: string;
  fandomName: string;
  fandomColor: string;
  type: "EVENT" | "PERM";
  period: string;
  status: "ON" | "D-0" | "ARCHIVED";
}

const INITIAL_PIN_EVENTS: PinEventItem[] = [
  {
    id: "pin_01",
    title: "안유진 생일카페",
    placeName: "카페 므므흐스 성수",
    area: "성동구",
    fandomName: "아이브",
    fandomColor: "#F59F00",
    type: "EVENT",
    period: "07.28~08.03",
    status: "ON",
  },
  {
    id: "pin_02",
    title: "어반소스 × 안유진",
    placeName: "어반소스 성수점",
    area: "성동구",
    fandomName: "아이브",
    fandomColor: "#F59F00",
    type: "EVENT",
    period: "07.18~07.24",
    status: "D-0",
  },
  {
    id: "pin_03",
    title: "언더스탠드 카페",
    placeName: "상설 성지",
    area: "성동구",
    fandomName: "뉴진스",
    fandomColor: "#2F6BFF",
    type: "PERM",
    period: "상시",
    status: "ON",
  },
  {
    id: "pin_04",
    title: "성수 연방극장 팝업",
    placeName: "연방극장",
    area: "성동구",
    fandomName: "변우석",
    fandomColor: "#9C36B5",
    type: "EVENT",
    period: "07.20~07.28",
    status: "ON",
  },
  {
    id: "pin_05",
    title: "무신사 테라스 팝업",
    placeName: "무신사 테라스",
    area: "마포구",
    fandomName: "뉴진스",
    fandomColor: "#2F6BFF",
    type: "EVENT",
    period: "07.11~07.18",
    status: "ARCHIVED",
  },
];

const FANDOMS = [
  { id: "FANDOM-01", name: "뉴진스", color: "#2f6bff" },
  { id: "FANDOM-02", name: "에스파", color: "#e64980" },
  { id: "FANDOM-03", name: "아이브", color: "#f59f00" },
];

export default function SpotEventsPage() {
  const [pinEvents, setPinEvents] = useState<PinEventItem[]>(INITIAL_PIN_EVENTS);
  const [selectedId, setSelectedId] = useState<string>("pin_01");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 모달 상태 및 입력 필드
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [area, setArea] = useState("성동구");
  const [fandomId, setFandomId] = useState("FANDOM-01");
  const [type, setType] = useState<"EVENT" | "PERM">("EVENT");
  const [period, setPeriod] = useState("");

  const selectedItem =
    pinEvents.find((item) => item.id === selectedId) || pinEvents[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !placeName.trim() || !period.trim()) {
      showToast("⚠️ 모든 필드를 입력해주세요.");
      return;
    }

    const matchedFandom = FANDOMS.find((f) => f.id === fandomId) || FANDOMS[0];
    const newEvent: PinEventItem = {
      id: `pin_0${pinEvents.length + 1}`,
      title: title.trim(),
      placeName: placeName.trim(),
      area,
      fandomName: matchedFandom.name,
      fandomColor: matchedFandom.color,
      type,
      period: period.trim(),
      status: "ON",
    };

    setPinEvents((prev) => [newEvent, ...prev]);
    setSelectedId(newEvent.id); // 새로 등록된 핀을 상세 영역에 바로 활성화
    setIsModalOpen(false);

    // 폼 초기화
    setTitle("");
    setPlaceName("");
    setArea("성동구");
    setFandomId("FANDOM-01");
    setType("EVENT");
    setPeriod("");

    showToast(`✅ [${title.trim()}] 이벤트 핀이 새로 등록되었습니다.`);
  };

  const handleRemovePin = (id: string, name: string) => {
    setPinEvents((prev) => prev.filter((p) => p.id !== id));
    showToast(`🚨 '${name}' 핀이 내리기 처리되었습니다.`);
  };

  const handleSavePin = (name: string) => {
    showToast(`✅ '${name}' 핀 정보가 저장되었습니다.`);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Header Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            성지 핀 이벤트 (ADM-SPOT-02)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            활성 핀 {pinEvents.filter((p) => p.status === "ON").length} · 전체 {pinEvents.length}
          </span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: "7px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          + 이벤트 핀 등록
        </button>
      </div>

      {/* Main 2-Column Split */}
      <div className="mobile-stack" style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
        {/* Left: Pins Queue Table */}
        <div
          className="table-responsive"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #e7e7e7",
            minWidth: 0,
            overflowY: "auto",
          }}
        >
          <div className="thr" style={{ display: "flex", minWidth: 500 }}>
            <span style={{ flex: "1 1 180px", minWidth: 140 }}>이벤트 성지 / 연동 장소</span>
            <span style={{ flex: "0 0 90px" }}>귀속 팬덤</span>
            <span style={{ flex: "0 0 74px" }}>유형</span>
            <span style={{ flex: "0 0 110px" }}>운영 기간</span>
            <span style={{ flex: "0 0 74px" }}>마커</span>
          </div>

          {pinEvents.map((row) => {
            const isSel = row.id === selectedId;
            return (
              <div
                key={row.id}
                className={`tr ${isSel ? "sel" : ""}`}
                onClick={() => setSelectedId(row.id)}
                style={{ cursor: "pointer", display: "flex", minWidth: 500 }}
              >
                <span style={{ flex: "1 1 180px", minWidth: 140 }}>
                  <span
                    className="nm"
                    style={{ color: row.status === "ARCHIVED" ? "#9a9a9a" : "#111" }}
                  >
                    {row.title}
                  </span>
                  <br />
                  <span className="hint">
                    {row.placeName} · {row.area}
                  </span>
                </span>
                <span style={{ flex: "0 0 90px" }}>
                  <span className="pill">
                    <span className="col" style={{ background: row.fandomColor }} />
                    {row.fandomName}
                  </span>
                </span>
                <span style={{ flex: "0 0 74px" }}>
                  <span
                    className="tag"
                    style={{
                      borderColor: row.type === "PERM" ? "#111" : "#ccc",
                      color: row.type === "PERM" ? "#111" : "#555",
                    }}
                  >
                    {row.type}
                  </span>
                </span>
                <span style={{ flex: "0 0 110px", color: "#555" }}>{row.period}</span>
                <span style={{ flex: "0 0 74px" }}>
                  <span
                    style={{
                      font: "600 10.5px 'Pretendard'",
                      color:
                        row.status === "ON"
                          ? "#1fa16b"
                          : row.status === "D-0"
                          ? "#e08a00"
                          : "#9a9a9a",
                    }}
                  >
                    {row.status}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Pin Edit Panel (388px) */}
        {selectedItem && (
          <div
            className="detail-panel-mobile"
            style={{
              width: 388,
              flex: "none",
              padding: "16px 18px",
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              background: "#fff",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                font: "700 12px 'Pretendard'",
                color: "#111",
                marginBottom: 10,
              }}
            >
              핀 편집 — {selectedItem.title}
            </div>

            {/* Map Marker Preview */}
            <div
              style={{
                height: 150,
                background: "#eef1ec",
                border: "1px solid #e2e2e2",
                position: "relative",
                overflow: "hidden",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 64,
                  height: 8,
                  background: "#fff",
                  opacity: 0.8,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 150,
                  width: 8,
                  background: "#fff",
                  opacity: 0.8,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "44%",
                  top: "40%",
                  width: 16,
                  height: 16,
                  background: selectedItem.fandomColor,
                  border: "3px solid #fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,.3)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "52%",
                  top: "26%",
                  padding: "3px 8px",
                  background: "#fff",
                  border: "1px solid #ddd",
                  font: "500 9px 'Pretendard'",
                  color: "#111",
                }}
              >
                {selectedItem.area} · 마커 프리뷰
              </div>
            </div>

            {/* Form Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <div>
                <div className="fl">연동 장소 (place_id)</div>
                <div className="fld">{selectedItem.placeName} ▾</div>
              </div>
              <div>
                <div className="fl">귀속 팬덤 IP</div>
                <div className="fld">
                  <span className="pill">
                    <span className="col" style={{ background: selectedItem.fandomColor }} />
                    {selectedItem.fandomName}
                  </span>{" "}
                  ▾
                </div>
              </div>
              <div>
                <div className="fl">이벤트 타이틀</div>
                <div className="fld" style={{ fontWeight: 600 }}>{selectedItem.title}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div className="fl">유형</div>
                  <div className="fld">{selectedItem.type} ▾</div>
                </div>
                <div style={{ flex: 1.4 }}>
                  <div className="fl">운영 기간</div>
                  <div className="fld">{selectedItem.period}</div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "auto",
                paddingTop: 14,
                display: "flex",
                gap: 8,
              }}
            >
              <button
                className="btn-r"
                onClick={() => handleRemovePin(selectedItem.id, selectedItem.title)}
                style={{ flex: 1, height: 42, cursor: "pointer" }}
              >
                핀 내리기
              </button>
              <button
                className="btn-d"
                onClick={() => handleSavePin(selectedItem.title)}
                style={{ flex: 1.5, height: 42, cursor: "pointer" }}
              >
                핀 생성 / 저장
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
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
                ➕ 신규 이벤트 핀 등록
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
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
                <label style={{ font: "700 10px 'Pretendard'", color: "#555" }}>이벤트 타이틀</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 안유진 생일카페"
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
                <label style={{ font: "700 10px 'Pretendard'", color: "#555" }}>연동 장소명</label>
                <input
                  type="text"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
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

              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ font: "700 10px 'Pretendard'", color: "#555" }}>행정 자치구</label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    style={{
                      padding: "8px 10px",
                      border: "1px solid #ddd",
                      font: "500 11.5px 'Pretendard'",
                      background: "#fff",
                      outline: "none",
                    }}
                  >
                    <option value="성동구">성동구</option>
                    <option value="마포구">마포구</option>
                    <option value="강남구">강남구</option>
                    <option value="영등포구">영등포구</option>
                  </select>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
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
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ font: "700 10px 'Pretendard'", color: "#555" }}>핀 유형</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as "EVENT" | "PERM")}
                    style={{
                      padding: "8px 10px",
                      border: "1px solid #ddd",
                      font: "500 11.5px 'Pretendard'",
                      background: "#fff",
                      outline: "none",
                    }}
                  >
                    <option value="EVENT">이벤트(EVENT)</option>
                    <option value="PERM">상설(PERM)</option>
                  </select>
                </div>
                <div style={{ flex: 1.4, display: "flex", flexDirection: "column", gap: 4 }}>
                  <label style={{ font: "700 10px 'Pretendard'", color: "#555" }}>운영 기간</label>
                  <input
                    type="text"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    placeholder="예: 07.28~08.03 또는 상시"
                    style={{
                      padding: "8px 10px",
                      border: "1px solid #ddd",
                      font: "500 11.5px 'Pretendard'",
                      outline: "none",
                    }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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

"use client";

import React, { useState } from "react";

interface PresetItem {
  code: string;
  name: string;
  userMessage: string;
  actionGuide: string;
  isActive: boolean;
}

const INITIAL_PRESETS: PresetItem[] = [
  {
    code: "REJ-01",
    name: "동일 영수증 중복 제출",
    userMessage: "이미 인증에 사용된 영수증 승인번호입니다.",
    actionGuide: "다른 결제 건의 새 영수증으로 인증 시도 안내",
    isActive: true,
  },
  {
    code: "REJ-02",
    name: "유효기간 만료",
    userMessage: "결제일시 기준 인정 유효시간(24시간)이 만료된 영수증입니다.",
    actionGuide: "당일 결제한 유효 영수증 재제출 유도",
    isActive: true,
  },
  {
    code: "REJ-03",
    name: "이미지 식별 불가",
    userMessage: "영수증 구김 또는 초점이 맞지 않아 글씨 판독이 어렵습니다.",
    actionGuide: "밝고 평평한 곳에서 재촬영 안내",
    isActive: true,
  },
  {
    code: "REJ-04",
    name: "GPS 위치 불일치",
    userMessage: "인증 제출 위치가 해당 성지 위치와 일치하지 않습니다.",
    actionGuide: "성지 매장 방문 후 현장 인증 유도",
    isActive: true,
  },
];

export default function VerificationPresetsPage() {
  const [presets, setPresets] = useState<PresetItem[]>(INITIAL_PRESETS);
  const [selectedPreset, setSelectedPreset] = useState<PresetItem | null>(INITIAL_PRESETS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSave = () => {
    if (!selectedPreset) return;
    setPresets((prev) =>
      prev.map((p) => (p.code === selectedPreset.code ? selectedPreset : p))
    );
    showToast(`📝 [${selectedPreset.code}] 반려 사유 템플릿이 저장되었습니다.`);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="admin-title">반려 사유 프리셋 & 알림 템플릿</div>
          <span style={{ font: "400 10.5px 'Pretendard'", color: "#9a9a9a" }}>
            총 {presets.length}개 프리셋
          </span>
        </div>
        <button
          onClick={() => showToast("➕ 신규 반려 프리셋 등록 폼이 열렸습니다.")}
          style={{
            padding: "6px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          + 프리셋 신규 등록
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
        {/* Left List */}
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
            <span style={{ width: 90 }}>코드</span>
            <span style={{ width: 160 }}>프리셋 명칭</span>
            <span style={{ flex: 1 }}>유저 알림 템플릿 카피</span>
            <span style={{ width: 70 }}>상태</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {presets.map((item) => {
              const isSelected = selectedPreset?.code === item.code;
              return (
                <div
                  key={item.code}
                  onClick={() => setSelectedPreset(item)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderBottom: "1px solid #f0f0f0",
                    background: isSelected ? "#f5f5f5" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ width: 90, font: "600 11px 'Pretendard'", color: "#111" }}>
                    {item.code}
                  </span>
                  <span style={{ width: 160, font: "600 11.5px 'Pretendard'", color: "#111" }}>
                    {item.name}
                  </span>
                  <span style={{ flex: 1, font: "400 11px 'Pretendard'", color: "#555" }}>
                    {item.userMessage}
                  </span>
                  <span
                    style={{
                      width: 70,
                      font: "600 10px 'Pretendard'",
                      color: item.isActive ? "#1fa16b" : "#8a8a8a",
                    }}
                  >
                    {item.isActive ? "활성" : "비활성"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail */}
        {selectedPreset && (
          <div
            style={{
              width: "380px",
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
              템플릿 상세 편집 ({selectedPreset.code})
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", font: "400 10.5px 'Pretendard'", color: "#777", marginBottom: 4 }}>
                  프리셋 명칭
                </label>
                <input
                  type="text"
                  value={selectedPreset.name}
                  onChange={(e) =>
                    setSelectedPreset({ ...selectedPreset, name: e.target.value })
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
                <label style={{ display: "block", font: "400 10.5px 'Pretendard'", color: "#777", marginBottom: 4 }}>
                  유저 푸시 알림 템플릿
                </label>
                <textarea
                  rows={3}
                  value={selectedPreset.userMessage}
                  onChange={(e) =>
                    setSelectedPreset({ ...selectedPreset, userMessage: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    border: "1px solid #ddd",
                    font: "500 11.5px 'Pretendard'",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", font: "400 10.5px 'Pretendard'", color: "#777", marginBottom: 4 }}>
                  조치 가이드 메시지
                </label>
                <input
                  type="text"
                  value={selectedPreset.actionGuide}
                  onChange={(e) =>
                    setSelectedPreset({ ...selectedPreset, actionGuide: e.target.value })
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
                템플릿 변경사항 저장
              </button>
            </div>
          </div>
        )}
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

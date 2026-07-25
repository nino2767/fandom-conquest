"use client";

import React, { useState } from "react";

interface WordChip {
  id: string;
  word: string;
  category: "NICKNAME" | "COMMENT";
}

const INITIAL_CHIPS: WordChip[] = [
  { id: "c1", word: "어드민", category: "NICKNAME" },
  { id: "c2", word: "운영자", category: "NICKNAME" },
  { id: "c3", word: "admin", category: "NICKNAME" },
  { id: "c4", word: "system", category: "NICKNAME" },
  { id: "c5", word: "비속어1", category: "COMMENT" },
  { id: "c6", word: "해킹", category: "COMMENT" },
  { id: "c7", word: "주작", category: "COMMENT" },
  { id: "c8", word: "매크로", category: "COMMENT" },
  { id: "c9", word: "스푸핑", category: "COMMENT" },
  { id: "c10", word: "포토샵", category: "COMMENT" },
];

export default function AdminPolicyPage() {
  const [chips, setChips] = useState<WordChip[]>(INITIAL_CHIPS);
  const [newWord, setNewWord] = useState("");
  const [newCat, setNewCat] = useState<"NICKNAME" | "COMMENT">("NICKNAME");
  const [activeCategoryTab, setActiveCategoryTab] = useState<"ALL" | "NICKNAME" | "COMMENT">("ALL");

  // System parameters
  const [expireHours, setExpireHours] = useState(24);
  const [minAmount, setMinAmount] = useState(3000);
  const [thresholdScore, setThresholdScore] = useState(90);
  const [gpsRadius, setGpsRadius] = useState(150);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddChip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim()) return;
    const item: WordChip = {
      id: `c_${Date.now()}`,
      word: newWord.trim(),
      category: newCat,
    };
    setChips([...chips, item]);
    setNewWord("");
    showToast(`✅ 금칙어 '${item.word}' (이)가 추가되었습니다.`);
  };

  const handleRemoveChip = (id: string) => {
    setChips(chips.filter((c) => c.id !== id));
    showToast("금칙어가 삭제되었습니다.");
  };

  const filteredChips = chips.filter((c) => {
    if (activeCategoryTab === "ALL") return true;
    return c.category === activeCategoryTab;
  });

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            금칙어 &amp; 시스템 설정 (ADM-SYSTEM-01)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            공통 금칙어 {chips.length}개 등록 · 시스템 자동 차단 가동 중
          </span>
        </div>
        <button
          onClick={() => showToast("⚙️ 시스템 설정 파라미터가 저장되었습니다.")}
          style={{
            padding: "6px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          설정 저장
        </button>
      </div>

      {/* Main Content Area */}
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
        {/* Forbidden Words Chip Tag Section */}
        <div className="admin-card" style={{ padding: "16px 20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <div>
              <span style={{ font: "700 12px 'Pretendard'", color: "#111" }}>
                공통 금칙어 칩 관리
              </span>
              <span
                style={{
                  font: "400 9.5px 'Pretendard'",
                  color: "#9a9a9a",
                  marginLeft: 8,
                }}
              >
                닉네임 생성 및 댓글/제보 사유 등록 시 즉시 필터링
              </span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() => setActiveCategoryTab("ALL")}
                style={{
                  padding: "4px 9px",
                  background: activeCategoryTab === "ALL" ? "#111" : "#eee",
                  color: activeCategoryTab === "ALL" ? "#fff" : "#555",
                  border: "none",
                  font: "600 10px 'Pretendard'",
                  cursor: "pointer",
                }}
              >
                전체 ({chips.length})
              </button>
              <button
                onClick={() => setActiveCategoryTab("NICKNAME")}
                style={{
                  padding: "4px 9px",
                  background: activeCategoryTab === "NICKNAME" ? "#111" : "#eee",
                  color: activeCategoryTab === "NICKNAME" ? "#fff" : "#555",
                  border: "none",
                  font: "600 10px 'Pretendard'",
                  cursor: "pointer",
                }}
              >
                닉네임 ({chips.filter((c) => c.category === "NICKNAME").length})
              </button>
              <button
                onClick={() => setActiveCategoryTab("COMMENT")}
                style={{
                  padding: "4px 9px",
                  background: activeCategoryTab === "COMMENT" ? "#111" : "#eee",
                  color: activeCategoryTab === "COMMENT" ? "#fff" : "#555",
                  border: "none",
                  font: "600 10px 'Pretendard'",
                  cursor: "pointer",
                }}
              >
                댓글/제보 ({chips.filter((c) => c.category === "COMMENT").length})
              </button>
            </div>
          </div>

          {/* Add New Word Form */}
          <form
            onSubmit={handleAddChip}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              marginBottom: 14,
              padding: "10px 12px",
              background: "#fafafa",
              border: "1px solid #e7e7e7",
            }}
          >
            <span style={{ font: "600 11px 'Pretendard'", color: "#111" }}>
              + 신규 금칙어:
            </span>
            <input
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              placeholder="차단할 단어 입력..."
              style={{
                flex: 1,
                padding: "6px 10px",
                border: "1px solid #ddd",
                font: "500 11.5px 'Pretendard'",
                outline: "none",
              }}
            />
            <select
              value={newCat}
              onChange={(e) =>
                setNewCat(e.target.value as "NICKNAME" | "COMMENT")
              }
              style={{
                padding: "6px 10px",
                border: "1px solid #ddd",
                font: "500 11.5px 'Pretendard'",
                background: "#fff",
                outline: "none",
              }}
            >
              <option value="NICKNAME">닉네임 전용</option>
              <option value="COMMENT">댓글/제보 전용</option>
            </select>
            <button
              type="submit"
              style={{
                padding: "6px 14px",
                background: "#111",
                color: "#fff",
                border: "none",
                font: "600 11px 'Pretendard'",
                cursor: "pointer",
              }}
            >
              등록
            </button>
          </form>

          {/* Chips List */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {filteredChips.map((c) => (
              <span
                key={c.id}
                className="tag"
                style={{
                  padding: "4px 8px",
                  fontSize: 11,
                  background: "#fff",
                  borderColor: "#ccc",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>{c.word}</span>
                <span
                  style={{
                    font: "400 9px 'Pretendard'",
                    color: c.category === "NICKNAME" ? "#2f6bff" : "#e08a00",
                  }}
                >
                  [{c.category === "NICKNAME" ? "닉네임" : "댓글"}]
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveChip(c.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#9a9a9a",
                    fontSize: 12,
                    cursor: "pointer",
                    padding: 0,
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* System Parameters Settings Section */}
        <div className="admin-card" style={{ padding: "16px 20px" }}>
          <div
            style={{
              font: "700 12px 'Pretendard'",
              color: "#111",
              marginBottom: 12,
            }}
          >
            시스템 운영 임계치 (System Operational Parameters)
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            <div style={{ padding: "12px 14px", border: "1px solid #e7e7e7", background: "#fff" }}>
              <div className="fl">영수증 유효 인증 시간 (시간)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <input
                  type="number"
                  value={expireHours}
                  onChange={(e) => setExpireHours(Number(e.target.value))}
                  style={{
                    width: 80,
                    padding: "6px 8px",
                    border: "1px solid #ddd",
                    font: "600 13px 'Pretendard'",
                  }}
                />
                <span style={{ font: "400 11px 'Pretendard'", color: "#555" }}>시간 이내 결제건</span>
              </div>
            </div>

            <div style={{ padding: "12px 14px", border: "1px solid #e7e7e7", background: "#fff" }}>
              <div className="fl">최소 인증 인정 금액 (원)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <input
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(Number(e.target.value))}
                  style={{
                    width: 100,
                    padding: "6px 8px",
                    border: "1px solid #ddd",
                    font: "600 13px 'Pretendard'",
                  }}
                />
                <span style={{ font: "400 11px 'Pretendard'", color: "#555" }}>원 이상 영수증</span>
              </div>
            </div>

            <div style={{ padding: "12px 14px", border: "1px solid #e7e7e7", background: "#fff" }}>
              <div className="fl">AI OCR 자동 승인 임계점 (점)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <input
                  type="number"
                  value={thresholdScore}
                  onChange={(e) => setThresholdScore(Number(e.target.value))}
                  style={{
                    width: 80,
                    padding: "6px 8px",
                    border: "1px solid #ddd",
                    font: "600 13px 'Pretendard'",
                  }}
                />
                <span style={{ font: "400 11px 'Pretendard'", color: "#555" }}>점 이상 자동 통과</span>
              </div>
            </div>

            <div style={{ padding: "12px 14px", border: "1px solid #e7e7e7", background: "#fff" }}>
              <div className="fl">GPS 허용 반경 (미터)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <input
                  type="number"
                  value={gpsRadius}
                  onChange={(e) => setGpsRadius(Number(e.target.value))}
                  style={{
                    width: 80,
                    padding: "6px 8px",
                    border: "1px solid #ddd",
                    font: "600 13px 'Pretendard'",
                  }}
                />
                <span style={{ font: "400 11px 'Pretendard'", color: "#555" }}>m 이내 현장 방문</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
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

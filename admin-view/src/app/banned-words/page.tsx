"use client";

import React, { useState } from "react";
import { useAdminData } from "@/context/AdminDataContext";

export default function BannedWordsPage() {
  const { bannedWords, addBannedWord, removeBannedWord } = useAdminData();
  const [newWord, setNewWord] = useState("");
  const [newCat, setNewCat] = useState<"NICKNAME" | "COMMENT">("NICKNAME");
  const [activeCategoryTab, setActiveCategoryTab] = useState<"ALL" | "NICKNAME" | "COMMENT">("ALL");
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
    
    // 중복 확인
    if (bannedWords.some((w) => w.word === newWord.trim())) {
      showToast("⚠️ 이미 등록된 금칙어입니다.");
      return;
    }

    addBannedWord(newWord.trim(), newCat);
    setNewWord("");
    showToast(`✅ 금칙어 '${newWord.trim()}' (이)가 추가되었습니다.`);
  };

  const handleRemoveChip = (id: string, word: string) => {
    removeBannedWord(id);
    showToast(`🗑️ 금칙어 '${word}' 삭제 완료`);
  };

  const filteredChips = bannedWords.filter((c) => {
    if (activeCategoryTab === "ALL") return true;
    return c.category === activeCategoryTab;
  });

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            공통 금칙어 관리 (ADM-SYSTEM-01)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            닉네임 생성 및 댓글/제보 사유 등록 시 필터링 단어 {bannedWords.length}개 가동 중
          </span>
        </div>
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
        <div className="admin-card" style={{ padding: "16px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
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
                전체 ({bannedWords.length})
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
                닉네임 ({bannedWords.filter((c) => c.category === "NICKNAME").length})
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
                댓글/제보 ({bannedWords.filter((c) => c.category === "COMMENT").length})
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
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, flex: 1, overflowY: "auto", alignContent: "flex-start", padding: "10px 0" }}>
            {filteredChips.length === 0 ? (
              <div className="hint" style={{ width: "100%", textAlign: "center", padding: "40px 0" }}>
                등록된 금칙어가 없습니다.
              </div>
            ) : (
              filteredChips.map((c) => (
                <span
                  key={c.id}
                  className="tag"
                  style={{
                    padding: "6px 10px",
                    fontSize: 11,
                    background: "#fff",
                    borderColor: "#ccc",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    height: 28,
                  }}
                >
                  <span style={{ font: "500 11.5px 'Pretendard'", color: "#111" }}>{c.word}</span>
                  <span
                    style={{
                      fontSize: 8.5,
                      color: c.category === "NICKNAME" ? "#2f6bff" : "#e08a00",
                      background: c.category === "NICKNAME" ? "#e3ecff" : "#fff3db",
                      padding: "1px 4px",
                      borderRadius: 1,
                      fontWeight: "bold",
                    }}
                  >
                    {c.category === "NICKNAME" ? "닉" : "코"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveChip(c.id, c.word)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#999",
                      cursor: "pointer",
                      fontSize: 10,
                      padding: 2,
                    }}
                  >
                    ✕
                  </button>
                </span>
              ))
            )}
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

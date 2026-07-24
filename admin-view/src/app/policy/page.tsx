"use client";

import React, { useState } from "react";

interface ForbiddenWord {
  id: string;
  pattern: string;
  category: "NICKNAME" | "COMMENT" | "ALL";
  action: "REJECT" | "MASK";
  description: string;
  createdAt: string;
}

const INITIAL_WORDS: ForbiddenWord[] = [
  {
    id: "FW-01",
    pattern: "운영자|어드민|admin|system",
    category: "NICKNAME",
    action: "REJECT",
    description: "어드민 및 시스템 사칭 닉네임 차단",
    createdAt: "2026-07-22",
  },
  {
    id: "FW-02",
    pattern: "비속어1|비속어2|욕설.*",
    category: "ALL",
    action: "REJECT",
    description: "전역 공통 심한 비속어 및 욕설 차단",
    createdAt: "2026-07-22",
  },
];

export default function AdminPolicyPage() {
  const [receiptExpireHours, setReceiptExpireHours] = useState(24);
  const [minAmount, setMinAmount] = useState(3000);
  const [autoApproveThreshold, setAutoApproveThreshold] = useState(90);

  // ADM-SYSTEM-01 Forbidden words state
  const [forbiddenWords, setForbiddenWords] = useState<ForbiddenWord[]>(INITIAL_WORDS);
  const [newPattern, setNewPattern] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [testInput, setTestInput] = useState("");
  const [testResult, setTestResult] = useState<{ matched: boolean; matchedPattern?: string } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleSavePolicy = () => {
    showToast("⚙️ 영수증 검수 임계값 및 운영 정책이 업데이트되었습니다.");
  };

  const handleAddForbiddenWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPattern) return;
    const newItem: ForbiddenWord = {
      id: `FW-${String(forbiddenWords.length + 1).padStart(2, "0")}`,
      pattern: newPattern,
      category: "ALL",
      action: "REJECT",
      description: newDesc || "운영자 추가 금칙어",
      createdAt: "2026-07-24",
    };
    setForbiddenWords([...forbiddenWords, newItem]);
    setNewPattern("");
    setNewDesc("");
    showToast(`공통 금칙어 패턴 '${newItem.pattern}' 이 추가되었습니다.`);
  };

  const handleRemoveWord = (id: string) => {
    setForbiddenWords(forbiddenWords.filter((w) => w.id !== id));
    showToast("금칙어 패턴이 삭제되었습니다.");
  };

  const handleRunTest = () => {
    if (!testInput) {
      setTestResult(null);
      return;
    }
    let isMatched = false;
    let matchedP = "";

    for (const item of forbiddenWords) {
      try {
        const regex = new RegExp(item.pattern, "i");
        if (regex.test(testInput)) {
          isMatched = true;
          matchedP = item.pattern;
          break;
        }
      } catch {
        // ignore invalid regex in test
      }

    }
    setTestResult({ matched: isMatched, matchedPattern: matchedP });
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 rounded-lg bg-blue-600 px-4 py-3 text-xs font-bold text-white shadow-xl animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>⚙️</span> 운영 정책 & 공통 금칙어 관리 <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">ADM-SYSTEM-01</span>
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            영수증 OCR 판정 임계값 및 닉네임/댓글/커뮤니티 전역 공통 금칙어 정규식 엔진 관리
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Section 1: Verification Threshold Settings */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-2">
            <span>🧾</span> 영수증 OCR 검수 임계값 설정
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">영수증 인정 유효 기간 (시간)</label>
              <input
                type="number"
                value={receiptExpireHours}
                onChange={(e) => setReceiptExpireHours(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-200 font-bold"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">결제 일시로부터 N시간 이내 제출 건만 자동 인정</span>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">인정 최소 결제 금액 (원)</label>
              <input
                type="number"
                step="500"
                value={minAmount}
                onChange={(e) => setMinAmount(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-200 font-bold text-emerald-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">AI OCR 자동 승인 임계 신뢰도 (%)</label>
              <input
                type="number"
                value={autoApproveThreshold}
                onChange={(e) => setAutoApproveThreshold(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-200 font-bold text-blue-400"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">신뢰도 N% 이상 건만 수동 검수 없이 자동 승인</span>
            </div>

            <div className="pt-2">
              <button
                onClick={handleSavePolicy}
                className="w-full rounded-lg bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-500 shadow"
              >
                검수 임계값 저장 확정
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Shared Forbidden Words Management (ADM-SYSTEM-01) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-2">
            <span>🛑</span> 공통 금칙어 정규식 엔진 [ADM-SYSTEM-01]
          </h3>

          <form onSubmit={handleAddForbiddenWord} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newPattern}
                onChange={(e) => setNewPattern(e.target.value)}
                placeholder="금칙어 정규식 패턴 (예: 운영자|사칭.*)"
                className="flex-1 rounded-lg border border-slate-700 bg-slate-800 p-2 text-xs text-slate-200 font-mono"
              />
              <button
                type="submit"
                className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-500 shadow"
              >
                + 등록
              </button>
            </div>
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="설명 / 사유 (선택)"
              className="w-full rounded-lg border border-slate-700 bg-slate-800/60 p-1.5 text-xs text-slate-300"
            />
          </form>

          {/* Realtime Tester Tool */}
          <div className="rounded-lg bg-slate-950 p-3 space-y-2 border border-slate-800">
            <span className="block text-[11px] font-bold text-slate-400">🧪 실시간 금칙어 검증 테스터</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={testInput}
                onChange={(e) => {
                  setTestInput(e.target.value);
                  handleRunTest();
                }}
                placeholder="테스트할 닉네임/문장 입력..."
                className="flex-1 rounded border border-slate-700 bg-slate-900 p-1.5 text-xs text-slate-200"
              />
            </div>
            {testResult && (
              <div className="text-xs font-bold mt-1">
                {testResult.matched ? (
                  <span className="text-red-400">🚨 금칙어 차단 대상! (매칭 패턴: {testResult.matchedPattern})</span>
                ) : (
                  <span className="text-emerald-400">✅ 정상 통과 (차단 사유 없음)</span>
                )}
              </div>
            )}
          </div>

          {/* List */}
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {forbiddenWords.map((word) => (
              <div key={word.id} className="flex items-center justify-between rounded border border-slate-800 bg-slate-800/40 p-2.5 text-xs">
                <div>
                  <code className="font-bold text-amber-300">{word.pattern}</code>
                  <span className="ml-2 text-[10px] text-slate-400">({word.description})</span>
                </div>
                <button
                  onClick={() => handleRemoveWord(word.id)}
                  className="text-red-400 hover:text-red-300 text-[11px] font-bold"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

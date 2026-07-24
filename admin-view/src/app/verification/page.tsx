"use client";

import React, { useState, useEffect } from "react";
import { ReviewHoldModal } from "@/components/modals/SharedModals";

interface VerificationQueueItem {
  id: string;
  submitter: string;
  fandomName: string;
  fandomId: string;
  storeName: string;
  dateTime: string;
  area: string;
  amount: string;
  ocrConfidence: string;
  status: "match" | "warning" | "error";
  receiptImgText: string;
}

const QUEUE_ITEMS: VerificationQueueItem[] = [
  {
    id: "VERIF-0722-042",
    submitter: "user_94ab",
    fandomName: "승관 (Seungkwan / BSS)",
    fandomId: "FANDOM-04-M1",
    storeName: "투썸플레이스 성수역점",
    dateTime: "2026.07.22 14:15:20",
    area: "서울 성동구 성수동2가",
    amount: "14,500원",
    ocrConfidence: "98.4%",
    status: "match",
    receiptImgText: "A TWO SOME PLACE\n성수역점 (02-499-1234)\n------------------------\n아메리카노(R) 4,500\n조각케이크 10,000\n------------------------\n합계 14,500원\n2026-07-22 14:15:20",
  },
  {
    id: "VERIF-0722-043",
    submitter: "user_12cd",
    fandomName: "민지 (Minji / NewJeans)",
    fandomId: "FANDOM-01-M1",
    storeName: "스타벅스 강남대로점",
    dateTime: "2026.07.22 13:40:11",
    area: "서울 강남구 역삼동",
    amount: "8,600원",
    ocrConfidence: "91.2%",
    status: "warning",
    receiptImgText: "STARBUCKS COFFEE\n강남대로점\n------------------------\n카페라떼(T) 5,000\n쿠키 3,600\n------------------------\n합계 8,600원\n2026-07-22 13:40:11",
  },
];

const REJECT_REASONS = [
  "동일 영수증 중복 제출",
  "발급일시 유효기간(24h) 만료",
  "영수증 이미지 식별 불가/훼손",
  "GPS 위치와 매장 주소 불일치",
  "금액 또는 매장명 위변조 의심",
];

export default function ReceiptVerificationPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rejectPopoverOpen, setRejectPopoverOpen] = useState(false);
  const [isHoldModalOpen, setIsHoldModalOpen] = useState(false);
  const [selectedRejectReason, setSelectedRejectReason] = useState(REJECT_REASONS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const item = QUEUE_ITEMS[currentIndex] || QUEUE_ITEMS[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleApprove = React.useCallback(() => {
    // 3계층 IP 상향 상속 트랜잭션 피드백
    showToast(`[승인 완수] '${item.fandomName}' +1점 반영 ➔ 최상위 루트 그룹 스코어 자동 상향 상속 (Upward Roll-up) 실행 완료!`);
    if (currentIndex < QUEUE_ITEMS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, item.fandomName]);

  const handleReject = () => {
    showToast(`[반려 완료] 반려 사유: ${selectedRejectReason}`);
    setRejectPopoverOpen(false);
    if (currentIndex < QUEUE_ITEMS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Keyboard Shortcuts Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        handleApprove();
      } else if (e.code === "KeyR") {
        e.preventDefault();
        setRejectPopoverOpen(true);
      } else if (e.code === "KeyH") {
        e.preventDefault();
        setIsHoldModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleApprove]);


  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 rounded-lg bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-xl animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span>🔍</span> 영수증 수동 검수 큐 <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">ADM-VERIF-02</span>
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            단축키 지원: <strong className="text-emerald-400">[Space] 승인</strong> | <strong className="text-red-400">[R] 반려</strong> | <strong className="text-amber-400">[H] 보류</strong> (건당 5초 초고속 심사)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsHoldModalOpen(true)}
            className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20"
          >
            ⏳ 보류 이관 [COMM-02]
          </button>
          <span className="rounded bg-slate-800 px-3 py-1.5 text-xs font-mono font-bold text-slate-300">
            대기 항목: {currentIndex + 1} / {QUEUE_ITEMS.length}
          </span>
        </div>
      </div>

      {/* Split View UI */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Side: Receipt Capture */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-300">📸 제출 영수증 원본 캡처</span>
            <span className="text-[10px] text-slate-500 font-mono">ID: {item.id}</span>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-xs text-emerald-400 whitespace-pre-line min-h-[300px] flex items-center justify-center">
            {item.receiptImgText}
          </div>
        </div>

        {/* Right Side: AI OCR Analysis & Decision */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300">🤖 AI OCR 4개 필드 판정 결과</span>
              <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-300 border border-blue-500/40">
                신뢰도 {item.ocrConfidence}
              </span>
            </div>

            <div className="rounded-lg bg-slate-800/80 p-3 space-y-2 border border-slate-700">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">인증 귀속 팬덤:</span>
                <span className="font-bold text-purple-300">{item.fandomName}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">매장명 / 상호:</span>
                <span className="font-bold text-slate-200">{item.storeName}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">결제 일시:</span>
                <span className="font-mono text-slate-300">{item.dateTime}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">인증 상권:</span>
                <span className="text-slate-300">{item.area}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">결제 금액:</span>
                <span className="font-bold text-emerald-400">{item.amount} (≥ 3,000원 OK)</span>
              </div>
            </div>

            <div className="rounded-lg bg-blue-950/20 p-3 text-[11px] text-blue-300 border border-blue-900/40">
              💡 <strong>점수 상속 로직</strong>: 승인 시 개인 멤버 스코어 +1점과 동시에 최상위 단체 그룹 스코어 `score = score + 1` 이 **단방향 상향 상속 트랜잭션**으로 자동 반영됩니다.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => setRejectPopoverOpen(true)}
              className="flex-1 rounded-xl bg-red-600/90 py-3 text-xs font-bold text-white shadow-lg hover:bg-red-500 transition"
            >
              [R] 반려 처리
            </button>
            <button
              onClick={handleApprove}
              className="flex-1 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-lg hover:bg-emerald-500 transition"
            >
              [Space] 승인 확정
            </button>
          </div>
        </div>
      </div>

      {/* Reject Reason Popover */}
      {rejectPopoverOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-5 text-slate-100 shadow-2xl">
            <h4 className="text-sm font-bold text-red-400 mb-3">반려 사유 선택</h4>
            <div className="space-y-2 mb-4">
              {REJECT_REASONS.map((r) => (
                <label key={r} className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer p-2 rounded hover:bg-slate-800">
                  <input
                    type="radio"
                    name="rejectReason"
                    checked={selectedRejectReason === r}
                    onChange={() => setSelectedRejectReason(r)}
                    className="text-red-500 focus:ring-0"
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectPopoverOpen(false)}
                className="rounded bg-slate-800 px-3 py-1.5 text-xs text-slate-300"
              >
                취소
              </button>
              <button
                onClick={handleReject}
                className="rounded bg-red-600 px-3 py-1.5 text-xs font-bold text-white"
              >
                반려 전송
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Hold Shared Modal */}
      <ReviewHoldModal
        isOpen={isHoldModalOpen}
        onClose={() => setIsHoldModalOpen(false)}
        targetItemsCount={1}
        onConfirm={(data) => {
          showToast(`건 ID '${item.id}' 가 수동 검수 보류 큐로 이관되었습니다. (사유: ${data?.reason || "보류"})`);
          if (currentIndex < QUEUE_ITEMS.length - 1) {
            setCurrentIndex(currentIndex + 1);
          }
        }}
      />

    </div>
  );
}

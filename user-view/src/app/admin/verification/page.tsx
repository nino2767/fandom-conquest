"use client";

import React, { useState } from "react";

interface VerificationQueueItem {
  id: string;
  submitter: string;
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
  const [selectedRejectReason, setSelectedRejectReason] = useState(REJECT_REASONS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const item = QUEUE_ITEMS[currentIndex] || QUEUE_ITEMS[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < QUEUE_ITEMS.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handleApprove = () => {
    showToast(`✅ [${item.id}] 승인 완료되었습니다.`);
    if (currentIndex < QUEUE_ITEMS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRejectConfirm = () => {
    setRejectPopoverOpen(false);
    showToast(`❌ [${item.id}] 반려 처리되었습니다. (사유: ${selectedRejectReason})`);
    if (currentIndex < QUEUE_ITEMS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      {/* Top Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="admin-title">영수증 수동 검수</div>
          <span style={{ font: "400 10.5px 'Pretendard'", color: "#9a9a9a" }}>
            대기 {QUEUE_ITEMS.length}건 · 내 처리 오늘 31건
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            style={{
              padding: "5px 12px",
              border: "1px solid #ddd",
              background: "#fff",
              font: "500 11px 'Pretendard'",
              color: currentIndex === 0 ? "#ccc" : "#555",
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
            }}
          >
            ← 이전
          </button>
          <span style={{ font: "500 11px 'Pretendard'", color: "#111" }}>
            {currentIndex + 1} / {QUEUE_ITEMS.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === QUEUE_ITEMS.length - 1}
            style={{
              padding: "5px 12px",
              border: "1px solid #ddd",
              background: "#fff",
              font: "500 11px 'Pretendard'",
              color: currentIndex === QUEUE_ITEMS.length - 1 ? "#ccc" : "#555",
              cursor: currentIndex === QUEUE_ITEMS.length - 1 ? "not-allowed" : "pointer",
            }}
          >
            다음 →
          </button>
        </div>
      </div>

      {/* Main 2-Split View */}
      <div style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
        {/* Left: Original Receipt Preview */}
        <div
          style={{
            width: "440px",
            flex: "none",
            borderRight: "1px solid #e7e7e7",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            background: "#fdfdfd",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 10,
            }}
          >
            <span style={{ font: "700 12px 'Pretendard'", color: "#111" }}>
              원본 영수증 캡처
            </span>
            <span style={{ font: "400 10px 'Pretendard'", color: "#9a9a9a" }}>
              {item.id} · {item.submitter}
            </span>
          </div>

          <div
            style={{
              flex: 1,
              background: "#fff",
              border: "1px solid #e2e2e2",
              padding: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.03)",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 220,
                background: "#fffdf9",
                border: "1px dashed #bbb",
                padding: 16,
                fontFamily: "monospace",
                fontSize: 11,
                lineHeight: 1.5,
                color: "#333",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                whiteSpace: "pre-line",
              }}
            >
              {item.receiptImgText}
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                fontSize: 10,
                color: "#8a8a8a",
                background: "#eee",
                padding: "2px 6px",
              }}
            >
              🔍 100% 원본
            </div>
          </div>
        </div>

        {/* Right: AI OCR & Verification Rules Table */}
        <div
          style={{
            flex: 1,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            background: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 10,
            }}
          >
            <span style={{ font: "700 12px 'Pretendard'", color: "#111" }}>
              AI OCR 4개 필드 & 판정 대조
            </span>
            <span style={{ font: "500 10.5px 'Pretendard'", color: "#1fa16b" }}>
              OCR 신뢰도 {item.ocrConfidence} ✓
            </span>
          </div>

          {/* Data Comparison Card */}
          <div className="admin-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "11px 14px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ font: "400 11px 'Pretendard'", color: "#777" }}>
                매장명 (상호)
              </span>
              <span style={{ font: "500 11.5px 'Pretendard'", color: "#111" }}>
                {item.storeName}{" "}
                <span
                  style={{
                    font: "500 9.5px 'Pretendard'",
                    color: "#1fa16b",
                    marginLeft: 6,
                  }}
                >
                  ✓ 일치
                </span>
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "11px 14px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ font: "400 11px 'Pretendard'", color: "#777" }}>
                결제일시
              </span>
              <span style={{ font: "500 11.5px 'Pretendard'", color: "#111" }}>
                {item.dateTime}{" "}
                <span
                  style={{
                    font: "500 9.5px 'Pretendard'",
                    color: "#1fa16b",
                    marginLeft: 6,
                  }}
                >
                  ✓ 최근 24시간 이내
                </span>
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "11px 14px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ font: "400 11px 'Pretendard'", color: "#777" }}>
                상권 / 주소
              </span>
              <span style={{ font: "500 11.5px 'Pretendard'", color: "#111" }}>
                {item.area}{" "}
                <span
                  style={{
                    font: "500 9.5px 'Pretendard'",
                    color: "#1fa16b",
                    marginLeft: 6,
                  }}
                >
                  ✓ GPS 12m 이내
                </span>
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "11px 14px",
              }}
            >
              <span style={{ font: "400 11px 'Pretendard'", color: "#777" }}>
                결제 금액
              </span>
              <span style={{ font: "500 11.5px 'Pretendard'", color: "#111" }}>
                {item.amount}{" "}
                <span
                  style={{
                    font: "500 9.5px 'Pretendard'",
                    color: "#1fa16b",
                    marginLeft: 6,
                  }}
                >
                  ✓ 최소 3,000원 충족
                </span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: "auto", display: "flex", gap: 10, paddingTop: 16 }}>
            <button
              onClick={() => setRejectPopoverOpen(true)}
              style={{
                flex: 1,
                height: 46,
                border: "1.5px solid #d64545",
                background: "#fff",
                color: "#d64545",
                font: "700 12.5px 'Pretendard'",
                cursor: "pointer",
              }}
            >
              반려 사유 선택...
            </button>
            <button
              onClick={handleApprove}
              style={{
                flex: 1.6,
                height: 46,
                background: "#111",
                color: "#fff",
                border: "none",
                font: "700 12.5px 'Pretendard'",
                cursor: "pointer",
              }}
            >
              승인 확정 (Space)
            </button>
          </div>

          {/* Reject Modal / Popover */}
          {rejectPopoverOpen && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
              }}
            >
              <div
                style={{
                  width: 360,
                  background: "#fff",
                  border: "1px solid #111",
                  padding: 20,
                  boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{
                    font: "700 13.5px 'Pretendard'",
                    color: "#111",
                    marginBottom: 12,
                  }}
                >
                  반려 사유 선택
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {REJECT_REASONS.map((reason) => (
                    <label
                      key={reason}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        font: "400 11.5px 'Pretendard'",
                        color: "#333",
                        cursor: "pointer",
                        padding: "6px 8px",
                        background:
                          selectedRejectReason === reason
                            ? "#f5f5f5"
                            : "transparent",
                      }}
                    >
                      <input
                        type="radio"
                        name="rejectReason"
                        checked={selectedRejectReason === reason}
                        onChange={() => setSelectedRejectReason(reason)}
                      />
                      {reason}
                    </label>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 16,
                  }}
                >
                  <button
                    onClick={() => setRejectPopoverOpen(false)}
                    style={{
                      flex: 1,
                      height: 38,
                      border: "1px solid #ddd",
                      background: "#fff",
                      font: "500 11.5px 'Pretendard'",
                      color: "#555",
                      cursor: "pointer",
                    }}
                  >
                    취소
                  </button>
                  <button
                    onClick={handleRejectConfirm}
                    style={{
                      flex: 1.4,
                      height: 38,
                      background: "#d64545",
                      color: "#fff",
                      border: "none",
                      font: "700 11.5px 'Pretendard'",
                      cursor: "pointer",
                    }}
                  >
                    반려 확정
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
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

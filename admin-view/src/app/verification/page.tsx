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
    receiptImgText:
      "A TWO SOME PLACE\n성수역점 (02-499-1234)\n------------------------\n아메리카노(R) 4,500\n조각케이크 10,000\n------------------------\n합계 14,500원\n2026-07-22 14:15:20",
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
    receiptImgText:
      "STARBUCKS COFFEE\n강남대로점\n------------------------\n카페라떼(T) 5,000\n쿠키 3,600\n------------------------\n합계 8,600원\n2026-07-22 13:40:11",
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
  const [selectedRejectReason, setSelectedRejectReason] = useState(
    REJECT_REASONS[0]
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const item = QUEUE_ITEMS[currentIndex] || QUEUE_ITEMS[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleApprove = React.useCallback(() => {
    showToast(
      `[승인 완수] '${item.fandomName}' +1점 반영 ➔ 최상위 루트 그룹 스코어 자동 상향 상속 (Upward Roll-up) 실행 완료!`
    );
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
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
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
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Header Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            영수증 수동 검수 (ADM-VERIFY-01)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            단축키 지원: <b style={{ color: "#111" }}>[Space] 승인</b> |{" "}
            <b style={{ color: "#d64545" }}>[R] 반려</b> |{" "}
            <b style={{ color: "#e08a00" }}>[H] 보류</b> (건당 5초 초고속 심사)
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="pill" style={{ color: "#111", fontWeight: 600 }}>
            수동 검수 대기 24
          </span>
          <button
            className="btn-l"
            onClick={() => setIsHoldModalOpen(true)}
            style={{ height: 32, padding: "0 10px", fontSize: 11 }}
          >
            보류 이관 [COMM-02]
          </button>
        </div>
      </div>

      {/* Main 2-Column Split Content */}
      <div
        className="mobile-stack"
        style={{
          flex: 1,
          display: "flex",
          minHeight: 0,
          overflow: "hidden",
          background: "#fafafa",
        }}
      >
        {/* Left: Original Receipt Viewer (410px) */}
        <div
          style={{
            width: 410,
            flex: "none",
            borderRight: "1px solid #e7e7e7",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
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
              📷 제출 영수증 원본 캡처
            </span>
            <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
              ID: {item.id}
            </span>
          </div>

          <div
            style={{
              flex: 1,
              background: "#111",
              color: "#33ff77",
              fontFamily: "monospace",
              fontSize: 11,
              lineHeight: 1.6,
              padding: 16,
              border: "1px solid #111",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              whiteSpace: "pre-wrap",
              minHeight: 300,
            }}
          >
            {item.receiptImgText}
          </div>

          <div
            style={{
              marginTop: 10,
              font: "400 9.5px 'Pretendard'",
              color: "#9a9a9a",
              textAlign: "center",
            }}
          >
            확대 휠 스크롤 연동 · AI 그린 박스 대조 영역
          </div>
        </div>

        {/* Right: AI OCR Field Analysis & Actions */}
        <div
          className="detail-panel-mobile"
          style={{
            flex: 1,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            overflowY: "auto",
            background: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 12,
            }}
          >
            <span style={{ font: "700 12px 'Pretendard'", color: "#111" }}>
              🤖 AI OCR 4개 필드 판정 결과
            </span>
            <span className="pill" style={{ color: "#1fa16b", fontWeight: 600 }}>
              AI 신뢰도 {item.ocrConfidence}
            </span>
          </div>

          {/* Key Value Details Table */}
          <div className="admin-card" style={{ padding: "14px 16px", marginBottom: 14 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "110px 1fr",
                rowGap: 10,
                font: "400 11px 'Pretendard'",
              }}
            >
              <span className="th">인증 귀속 팬덤:</span>
              <span style={{ font: "600 12px 'Pretendard'", color: "#111" }}>
                {item.fandomName}
              </span>

              <span className="th">매장명 / 상호:</span>
              <span style={{ font: "500 11.5px 'Pretendard'", color: "#111" }}>
                {item.storeName}
              </span>

              <span className="th">결제 일시:</span>
              <span style={{ color: "#111" }}>{item.dateTime}</span>

              <span className="th">인증 상권:</span>
              <span style={{ color: "#111" }}>{item.area}</span>

              <span className="th">결제 금액:</span>
              <span style={{ font: "700 13px 'Pretendard'", color: "#1fa16b" }}>
                {item.amount}{" "}
                <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
                  (≥ 3,000원 기준 통과)
                </span>
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "10px 12px",
              background: "#f5f5f5",
              border: "1px solid #e7e7e7",
              font: "400 10px/1.6 'Pretendard'",
              color: "#555",
              marginBottom: 16,
            }}
          >
            💡 <b style={{ color: "#111" }}>단방향 상향 점수 상속 (Upward Roll-up)</b>: 승인 시 멤버 스코어 +1점과 동시에 최상위 단체 그룹 스코어 `score = score + 1` 이 **단일 원자적 트랜잭션**으로 자동 반영됩니다.
          </div>

          {/* Action Button Bar */}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              gap: 12,
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Reject Button & Reason Popover */}
            <div style={{ flex: 1, position: "relative" }}>
              <button
                className="btn-l"
                onClick={() => setRejectPopoverOpen(!rejectPopoverOpen)}
                style={{
                  width: "100%",
                  height: 46,
                  color: "#d64545",
                  borderColor: "#d64545",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                [R] 반려 처리
              </button>

              {rejectPopoverOpen && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 54,
                    left: 0,
                    right: 0,
                    background: "#fff",
                    border: "1px solid #111",
                    padding: 12,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    zIndex: 100,
                  }}
                >
                  <div
                    style={{
                      font: "700 11px 'Pretendard'",
                      color: "#111",
                      marginBottom: 8,
                    }}
                  >
                    반려 사유 퀵 선택
                  </div>
                  <select
                    value={selectedRejectReason}
                    onChange={(e) => setSelectedRejectReason(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "6px 8px",
                      border: "1px solid #ddd",
                      font: "500 11px 'Pretendard'",
                      marginBottom: 8,
                      background: "#fff",
                    }}
                  >
                    {REJECT_REASONS.map((r, idx) => (
                      <option key={idx} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleReject}
                    style={{
                      width: "100%",
                      padding: "8px",
                      background: "#d64545",
                      color: "#fff",
                      border: "none",
                      font: "600 11px 'Pretendard'",
                      cursor: "pointer",
                    }}
                  >
                    반려 사유 전송 및 확정
                  </button>
                </div>
              )}
            </div>

            {/* Approve Button */}
            <button
              onClick={handleApprove}
              style={{
                flex: 1.5,
                height: 46,
                background: "#111",
                color: "#fff",
                border: "none",
                font: "700 13px 'Pretendard'",
                cursor: "pointer",
              }}
            >
              [Space] 승인 확정
            </button>
          </div>
        </div>
      </div>

      {/* Review Hold Shared Modal */}
      <ReviewHoldModal
        isOpen={isHoldModalOpen}
        onClose={() => setIsHoldModalOpen(false)}
        onConfirm={(_data) => {
          showToast(`[보류 이관] 사유 처리 완료`);
          setIsHoldModalOpen(false);
          if (currentIndex < QUEUE_ITEMS.length - 1) {
            setCurrentIndex(currentIndex + 1);
          }
        }}
      />

      {/* Toast Notification */}
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

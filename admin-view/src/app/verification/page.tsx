"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ReviewHoldModal } from "@/components/modals/SharedModals";
import { useAdminData } from "@/context/AdminDataContext";

const REJECT_REASONS = [
  "동일 영수증 중복 제출",
  "발급일시 유효기간(24h) 만료",
  "영수증 이미지 식별 불가/훼손",
  "GPS 위치와 매장 주소 불일치",
  "금액 또는 매장명 위변조 의심",
];

export default function ReceiptVerificationPage() {
  const { 
    verificationQueue, 
    approveVerification, 
    rejectVerification, 
    holdVerification 
  } = useAdminData();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [rejectPopoverOpen, setRejectPopoverOpen] = useState(false);
  const [isHoldModalOpen, setIsHoldModalOpen] = useState(false);
  const [selectedRejectReason, setSelectedRejectReason] = useState(
    REJECT_REASONS[0]
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 큐가 비어있거나 인덱스 범위를 초과했을 때 안전장치
  const hasItems = verificationQueue.length > 0;
  
  // 인덱스 안전 조정 (Effect 내 동기 갱신 제한 룰 준수하여 setTimeout 사용)
  useEffect(() => {
    if (verificationQueue.length > 0 && currentIndex >= verificationQueue.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(Math.max(0, verificationQueue.length - 1));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [verificationQueue.length, currentIndex]);

  const item = hasItems ? (verificationQueue[currentIndex] || verificationQueue[0]) : null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleApprove = useCallback(() => {
    if (!item) return;
    const fandomName = item.fandomName;
    const itemId = item.id;
    approveVerification(itemId);
    showToast(
      `[승인 완수] '${fandomName}' +10점 반영 ➔ 최상위 루트 그룹 스코어 자동 상향 상속 (Upward Roll-up) 실행 완료!`
    );
    // 큐에서 빠지므로 currentIndex가 자동 유지되지만, 마지막 항목인 경우 이전으로 땡김
    if (currentIndex >= verificationQueue.length - 1 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [item, currentIndex, verificationQueue.length, approveVerification]);

  const handleReject = () => {
    if (!item) return;
    const itemId = item.id;
    rejectVerification(itemId, selectedRejectReason);
    showToast(`[반려 완료] 반려 사유: ${selectedRejectReason}`);
    setRejectPopoverOpen(false);
    if (currentIndex >= verificationQueue.length - 1 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleHold = () => {
    if (!item) return;
    const itemId = item.id;
    holdVerification(itemId);
    showToast(`[보류 이관] 사유 처리 및 이관 완료`);
    setIsHoldModalOpen(false);
    if (currentIndex >= verificationQueue.length - 1 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
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
      
      if (!hasItems) return;

      if (e.code === "Space") {
        e.preventDefault();
        handleApprove();
      } else if (e.code === "KeyR") {
        e.preventDefault();
        setRejectPopoverOpen(true);
      } else if (e.code === "KeyH") {
        e.preventDefault();
        setIsHoldModalOpen(true);
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(verificationQueue.length - 1, prev + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleApprove, hasItems, verificationQueue.length]);

  if (!hasItems || !item) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div className="admin-topbar">
          <div style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            영수증 수동 검수 (ADM-VERIFY-01)
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 48 }}>🎉</span>
          <span style={{ font: "700 15px 'Pretendard'", color: "#111" }}>
            현재 대기 중인 영수증이 모두 검수 완료되었습니다!
          </span>
          <span style={{ font: "400 11px 'Pretendard'", color: "#8a8a8a" }}>
            새로운 영수증이 접수되면 큐에 실시간 적재됩니다.
          </span>
          <Link
            href="/"
            className="btn-l"
            style={{
              marginTop: 10,
              padding: "8px 16px",
              background: "#111",
              color: "#fff",
              textDecoration: "none",
              font: "700 11px 'Pretendard'",
              display: "flex",
              alignItems: "center",
            }}
          >
            대시보드로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

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
            <b style={{ color: "#e08a00" }}>[H] 보류</b> |{" "}
            <b style={{ color: "#111" }}>[← / →] 이동</b> (건당 5초 초고속 심사)
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="pill" style={{ color: "#111", fontWeight: 600 }}>
            수동 검수 대기 {verificationQueue.length}
          </span>
          <span style={{ font: "500 11px 'Pretendard'", color: "#8a8a8a" }}>
            현재 항목: {currentIndex + 1} / {verificationQueue.length}
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
            💡 <b style={{ color: "#111" }}>단방향 상향 점수 상속 (Upward Roll-up)</b>: 승인 시 멤버 스코어 +10점과 동시에 최상위 단체 그룹 스코어 `score = score + 10` 이 **단일 원자적 트랜잭션**으로 자동 반영됩니다.
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
        onConfirm={handleHold}
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

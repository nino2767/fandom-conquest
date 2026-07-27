"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ReviewHoldModal } from "@/components/modals/SharedModals";
import { useAdminData, VerificationQueueItem } from "@/context/AdminDataContext";

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

  // 상세 모달 상태
  const [selectedItem, setSelectedItem] = useState<VerificationQueueItem | null>(null);
  
  const [rejectPopoverOpen, setRejectPopoverOpen] = useState(false);
  const [isHoldModalOpen, setIsHoldModalOpen] = useState(false);
  const [selectedRejectReason, setSelectedRejectReason] = useState(
    REJECT_REASONS[0]
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const hasItems = verificationQueue.length > 0;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleApprove = useCallback((itemToApprove: VerificationQueueItem) => {
    if (!itemToApprove) return;
    const fandomName = itemToApprove.fandomName;
    const itemId = itemToApprove.id;
    approveVerification(itemId);
    setSelectedItem(null);
    showToast(
      `[승인 완수] '${fandomName}' +10점 반영 ➔ 최상위 루트 그룹 스코어 자동 상향 상속 (Upward Roll-up) 실행 완료!`
    );
  }, [approveVerification]);

  const handleReject = (itemToReject: VerificationQueueItem) => {
    if (!itemToReject) return;
    const itemId = itemToReject.id;
    rejectVerification(itemId, selectedRejectReason);
    setSelectedItem(null);
    setRejectPopoverOpen(false);
    showToast(`[반려 완료] 반려 사유: ${selectedRejectReason}`);
  };

  const handleHold = (itemToHold: VerificationQueueItem) => {
    if (!itemToHold) return;
    const itemId = itemToHold.id;
    holdVerification(itemId);
    setSelectedItem(null);
    setIsHoldModalOpen(false);
    showToast(`[보류 이관] 사유 처리 및 이관 완료`);
  };

  // Keyboard Shortcuts Support when Modal is Open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      
      if (!selectedItem) return;

      if (e.code === "Space") {
        e.preventDefault();
        handleApprove(selectedItem);
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
  }, [handleApprove, selectedItem]);

  if (!hasItems) {
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
            목록 선택 시 상세 검수 팝업 활성화 · 검수 팝업 내 단축키: <b style={{ color: "#111" }}>[Space] 승인</b> | <b style={{ color: "#d64545" }}>[R] 반려</b> | <b style={{ color: "#e08a00" }}>[H] 보류</b>
          </span>
        </div>
        <div>
          <span className="pill" style={{ color: "#111", fontWeight: 600 }}>
            수동 검수 대기 {verificationQueue.length}건
          </span>
        </div>
      </div>

      {/* Main Single Column Grid Table */}
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
            <span style={{ width: 140 }}>검수 ID</span>
            <span style={{ width: 120 }}>제보 유저</span>
            <span style={{ flex: 1 }}>영수증 결제처</span>
            <span style={{ width: 130 }}>귀속 팬덤 IP</span>
            <span style={{ width: 100 }}>인증 자치구</span>
            <span style={{ width: 110 }}>결제 금액</span>
            <span style={{ width: 110 }}>OCR 신뢰도</span>
            <span style={{ width: 90 }}>자동 상태</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {verificationQueue.map((row) => (
              <div
                key={row.id}
                className="tr"
                onClick={() => setSelectedItem(row)}
                style={{ display: "flex", cursor: "pointer" }}
                title="클릭하여 상세 영수증 이미지 대조 및 심사"
              >
                <span style={{ width: 140, font: "600 11px ui-monospace,monospace", color: "#111" }}>
                  {row.id}
                </span>
                <span style={{ width: 120, color: "#555" }}>
                  {row.submitter}
                </span>
                <span style={{ flex: 1, font: "600 11.5px 'Pretendard'", color: "#111", textDecoration: "underline" }}>
                  {row.storeName}
                </span>
                <span style={{ width: 130 }}>
                  <span className="pill">
                    <span
                      className="col"
                      style={{
                        background:
                          row.fandomId === "FANDOM-01"
                            ? "#2f6bff"
                            : row.fandomId === "FANDOM-02"
                            ? "#e64980"
                            : "#f59f00",
                      }}
                    />
                    {row.fandomName}
                  </span>
                </span>
                <span style={{ width: 100, color: "#111" }}>{row.area}</span>
                <span style={{ width: 110, font: "600 11.5px 'Pretendard'", color: "#111" }}>
                  {row.amount}원
                </span>
                <span style={{ width: 110, color: "#8a8a8a" }}>
                  {row.ocrConfidence}%
                </span>
                <span style={{ width: 90 }}>
                  <span
                    className="pill"
                    style={{
                      color:
                        row.status === "match"
                          ? "#1fa16b"
                          : row.status === "warning"
                          ? "#e08a00"
                          : "#d64545",
                    }}
                  >
                    ● {row.status.toUpperCase()}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Receipt Detail Verification Popover Modal */}
      {selectedItem && (
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
            className="admin-card mobile-stack"
            style={{
              width: 820,
              height: "85vh",
              background: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              display: "flex",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {/* Modal Left: Receipt Image Preview (Terminal Style Text) */}
            <div
              style={{
                width: 380,
                borderRight: "1px solid #e7e7e7",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                background: "#fff",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                <span style={{ font: "700 12px 'Pretendard'", color: "#111" }}>
                  📷 영수증 원본 OCR 덤프
                </span>
                <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
                  {selectedItem.id}
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  background: "#111",
                  color: "#33ff77",
                  fontFamily: "monospace",
                  fontSize: 10.5,
                  lineHeight: 1.6,
                  padding: 16,
                  border: "1px solid #111",
                  overflowY: "auto",
                  alignContent: "flex-start",
                }}
              >
                {selectedItem.receiptImgText.split("\n").map((line: string, idx: number) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </div>

            {/* Modal Right: OCR Comparison & Actions */}
            <div
              style={{
                flex: 1,
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                background: "#fafafa",
                overflowY: "auto",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e7e7e7", paddingBottom: 10, marginBottom: 12 }}>
                <span style={{ font: "700 13px 'Pretendard'", color: "#111" }}>
                  ⚖️ OCR 자동 판정 항목 대조
                </span>
                <button
                  onClick={() => setSelectedItem(null)}
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

              {/* Specs Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                <div className="admin-card" style={{ padding: "10px 12px", background: "#fff" }}>
                  <div className="th">결제 장소 (가맹점명)</div>
                  <div style={{ font: "600 12px 'Pretendard'", color: "#111", marginTop: 3 }}>
                    {selectedItem.storeName}
                  </div>
                </div>
                <div className="admin-card" style={{ padding: "10px 12px", background: "#fff" }}>
                  <div className="th">결제 일시</div>
                  <div style={{ font: "500 11.5px 'Pretendard'", color: "#111", marginTop: 3 }}>
                    {selectedItem.dateTime}
                  </div>
                </div>
                <div className="admin-card" style={{ padding: "10px 12px", background: "#fff" }}>
                  <div className="th">인증 귀속 팬덤</div>
                  <div style={{ marginTop: 3 }}>
                    <span className="pill">
                      <span
                        className="col"
                        style={{
                          background:
                            selectedItem.fandomId === "FANDOM-01"
                              ? "#2f6bff"
                              : selectedItem.fandomId === "FANDOM-02"
                              ? "#e64980"
                              : "#f59f00",
                        }}
                      />
                      {selectedItem.fandomName}
                    </span>
                  </div>
                </div>
                <div className="admin-card" style={{ padding: "10px 12px", background: "#fff" }}>
                  <div className="th">결제 총액</div>
                  <div style={{ font: "700 13px 'Pretendard'", color: "#2f6bff", marginTop: 3 }}>
                    {selectedItem.amount}원
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <div
                style={{
                  padding: "10px 12px",
                  background:
                    selectedItem.status === "match"
                      ? "#e8f7f0"
                      : selectedItem.status === "warning"
                      ? "#fff3db"
                      : "#fce8e8",
                  border: "1px solid",
                  borderColor:
                    selectedItem.status === "match"
                      ? "#1fa16b"
                      : selectedItem.status === "warning"
                      ? "#e08a00"
                      : "#d64545",
                  marginBottom: 12,
                }}
              >
                <div style={{ font: "700 11px 'Pretendard'", color: "#111" }}>
                  판정 리포트:{" "}
                  {selectedItem.status === "match"
                    ? "일치 (Match)"
                    : selectedItem.status === "warning"
                    ? "경고 (Warning)"
                    : "오류 (Error)"}
                </div>
                <div style={{ font: "400 10.5px 'Pretendard'", color: "#555", marginTop: 4 }}>
                  {selectedItem.status === "match"
                    ? "사업자등록번호 조회 및 가맹점 매칭 성공. 결제금액 조건 충족."
                    : selectedItem.status === "warning"
                    ? "인근 위경도 반경 100m 이탈 정황 발견. 수동 대조를 권장합니다."
                    : "OCR 판독 사업자번호 불일치 및 가공된 영수증 의심 플래그 탐지."}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
                <span style={{ font: "700 10.5px 'Pretendard'", color: "#777" }}>승인 번호 대조</span>
                <input
                  type="text"
                  readOnly
                  value={selectedItem.approvalNumber}
                  style={{
                    padding: "8px 10px",
                    border: "1px solid #ddd",
                    font: "600 11.5px ui-monospace,monospace",
                    background: "#e7e7e7",
                    color: "#555",
                    outline: "none",
                  }}
                />
              </div>

              {/* Actions Footer */}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", gap: 8 }}>
                  {/* Reject popover anchor */}
                  <div style={{ flex: 1, position: "relative" }}>
                    <button
                      className="btn-l"
                      onClick={() => setRejectPopoverOpen((prev) => !prev)}
                      style={{
                        width: "100%",
                        height: 42,
                        color: "#d64545",
                        borderColor: "#d64545",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      반려 [R]
                    </button>

                    {rejectPopoverOpen && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "105%",
                          left: 0,
                          width: 220,
                          background: "#fff",
                          border: "1px solid #ddd",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          padding: 10,
                          zIndex: 9999,
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                        }}
                      >
                        <div style={{ font: "700 9.5px 'Pretendard'", color: "#777" }}>반려 사유 선택</div>
                        <select
                          value={selectedRejectReason}
                          onChange={(e) => setSelectedRejectReason(e.target.value)}
                          style={{
                            padding: "5px",
                            fontSize: 10.5,
                            fontFamily: "Pretendard",
                            width: "100%",
                            outline: "none",
                          }}
                        >
                          {REJECT_REASONS.map((r, rIdx) => (
                            <option key={rIdx} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                        <button
                          className="btn-d"
                          onClick={() => handleReject(selectedItem)}
                          style={{ height: 26, fontSize: 10, cursor: "pointer" }}
                        >
                          반려 확정
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    className="btn-l"
                    onClick={() => setIsHoldModalOpen(true)}
                    style={{
                      flex: 1,
                      height: 42,
                      color: "#e08a00",
                      borderColor: "#e08a00",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    보류 [H]
                  </button>
                </div>

                <button
                  className="btn-d"
                  onClick={() => handleApprove(selectedItem)}
                  style={{ height: 44, fontSize: 12, cursor: "pointer" }}
                >
                  최종 승인 완료 [Space]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Hold Modal */}
      {isHoldModalOpen && selectedItem && (
        <ReviewHoldModal
          isOpen={isHoldModalOpen}
          onClose={() => setIsHoldModalOpen(false)}
          onConfirm={() => handleHold(selectedItem)}
        />
      )}

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

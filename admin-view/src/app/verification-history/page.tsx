"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAdminData, FANDOMS, VerificationQueueItem } from "@/context/AdminDataContext";
import { ReviewHoldModal } from "@/components/modals/SharedModals";

const REJECT_REASONS = [
  "동일 영수증 중복 제출",
  "발급일시 유효기간(24h) 만료",
  "영수증 이미지 식별 불가/훼손",
  "GPS 위치와 매장 주소 불일치",
  "금액 또는 매장명 위변조 의심",
];

interface VerificationHistoryRow {
  id: string;
  user: string;
  store: string;
  bizNum: string;
  fandom: string;
  fandomColor: string;
  type: "자동승인" | "수동승인" | "수동검수대기" | "최종반려";
  amount: string;
  timestamp: string;
}

export default function VerificationHistoryPage() {
  const { 
    verificationHistory, 
    verificationQueue,
    approveVerification,
    rejectVerification,
    holdVerification
  } = useAdminData();

  const [filterType, setFilterType] = useState<string>("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 모달 상태
  const [selectedQueueItem, setSelectedQueueItem] = useState<VerificationQueueItem | null>(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<VerificationHistoryRow | null>(null);
  
  const [rejectPopoverOpen, setRejectPopoverOpen] = useState(false);
  const [isHoldModalOpen, setIsHoldModalOpen] = useState(false);
  const [selectedRejectReason, setSelectedRejectReason] = useState(
    REJECT_REASONS[0]
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // 실시간 큐 대기 목록과 처리 완료 목록 병합
  const pendingItems: VerificationHistoryRow[] = verificationQueue.map((q) => ({
    id: q.id,
    user: q.submitter,
    store: q.storeName,
    bizNum: "대조필요 (10자리)",
    fandom: q.fandomName.split(" ")[0],
    fandomColor: FANDOMS.find((f) => f.id === q.fandomId)?.color || "#8a8a8a",
    type: "수동검수대기",
    amount: q.amount,
    timestamp: q.dateTime,
  }));

  const allData: VerificationHistoryRow[] = [...pendingItems, ...verificationHistory];

  const filteredData = allData.filter((row) => {
    if (filterType === "ALL") return true;
    return row.type === filterType;
  });

  const handleApprove = useCallback((itemToApprove: VerificationQueueItem) => {
    if (!itemToApprove) return;
    const fandomName = itemToApprove.fandomName;
    const itemId = itemToApprove.id;
    approveVerification(itemId);
    setSelectedQueueItem(null);
    showToast(
      `[승인 완수] '${fandomName}' +10점 반영 ➔ 최상위 루트 그룹 스코어 자동 상향 상속 (Upward Roll-up) 실행 완료!`
    );
  }, [approveVerification]);

  const handleReject = (itemToReject: VerificationQueueItem) => {
    if (!itemToReject) return;
    const itemId = itemToReject.id;
    rejectVerification(itemId, selectedRejectReason);
    setSelectedQueueItem(null);
    setRejectPopoverOpen(false);
    showToast(`[반려 완료] 반려 사유: ${selectedRejectReason}`);
  };

  const handleHold = (itemToHold: VerificationQueueItem) => {
    if (!itemToHold) return;
    const itemId = itemToHold.id;
    holdVerification(itemId);
    setSelectedQueueItem(null);
    setIsHoldModalOpen(false);
    showToast(`[보류 이관] 사유 처리 및 이관 완료`);
  };

  const handleRowClick = (row: VerificationHistoryRow) => {
    if (row.type === "수동검수대기") {
      const queueItem = verificationQueue.find((q) => q.id === row.id);
      if (queueItem) {
        setSelectedQueueItem(queueItem);
      }
    } else {
      setSelectedHistoryItem(row);
    }
  };

  // Keyboard Shortcuts Support when Review Modal is Open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      
      if (!selectedQueueItem) return;

      if (e.code === "Space") {
        e.preventDefault();
        handleApprove(selectedQueueItem);
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
  }, [handleApprove, selectedQueueItem]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Header Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            인증 내역 통합 데이터 (ADM-VERIF-01)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            전체 로그 조회 및 실시간 수동 검수 연계 대조 팝업 지원
          </span>
        </div>
        <button
          onClick={() => showToast("📥 전체 데이터 CSV 추출 완료 (Mock)")}
          style={{
            padding: "6px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          엑셀 Export
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
        {/* KPI Cards */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div className="admin-card" style={{ flex: 1, minWidth: 140, padding: "12px 16px" }}>
            <div className="th">누적 인증 건수</div>
            <div className="num">{(allData.length + 142800).toLocaleString()}</div>
            <div className="sub9">승인율 93.5%</div>
          </div>
          <div className="admin-card" style={{ flex: 1, minWidth: 140, padding: "12px 16px" }}>
            <div className="th">자동 승인 비율</div>
            <div className="num">92.8%</div>
            <div className="sub9">인공지능 비전 OCR</div>
          </div>
          <div className="admin-card" style={{ flex: 1, minWidth: 140, padding: "12px 16px" }}>
            <div className="th">수동 검수 이관 (대기)</div>
            <div className="num">{verificationQueue.length}건</div>
            <div className="sub9">평균 처리 4분 이내</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: 6 }}>
          {["ALL", "자동승인", "수동승인", "수동검수대기", "최종반려"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              style={{
                padding: "5px 12px",
                background: filterType === t ? "#111" : "#eee",
                color: filterType === t ? "#fff" : "#555",
                border: "none",
                font: "600 10.5px 'Pretendard'",
                cursor: "pointer",
              }}
            >
              {t === "ALL" ? "전체 보기" : t}
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="admin-card table-responsive" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="thr" style={{ display: "flex", minWidth: 800 }}>
            <span style={{ flex: "0 0 150px" }}>인증 ID</span>
            <span style={{ flex: "0 0 110px" }}>유저 ID</span>
            <span style={{ flex: "1 1 200px", minWidth: 160 }}>매장명 / 상호</span>
            <span style={{ flex: "0 0 130px" }}>사업자 번호</span>
            <span style={{ flex: "0 0 110px" }}>귀속 팬덤</span>
            <span style={{ flex: "0 0 110px" }}>인증 상태</span>
            <span style={{ flex: "0 0 90px" }}>금액</span>
            <span style={{ flex: "0 0 140px" }}>일시</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {filteredData.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "#8a8a8a", fontSize: 12 }}>
                해당 필터 조건의 인증 내역이 없습니다.
              </div>
            ) : (
              filteredData.map((row) => (
                <div
                  key={row.id}
                  className="tr"
                  onClick={() => handleRowClick(row)}
                  style={{ cursor: "pointer", display: "flex", minWidth: 800 }}
                  title={row.type === "수동검수대기" ? "클릭 시 즉시 수동 검수 팝업 열기" : "클릭 시 상세 기록 조회"}
                >
                  <span style={{ flex: "0 0 150px", font: "600 11px ui-monospace,monospace", color: "#111" }}>
                    {row.id}
                  </span>
                  <span style={{ flex: "0 0 110px", color: "#8a8a8a" }}>{row.user}</span>
                  <span style={{ flex: "1 1 200px", minWidth: 160, font: "600 11.5px 'Pretendard'", color: "#111", textDecoration: "underline" }}>
                    {row.store}
                  </span>
                  <span style={{ flex: "0 0 130px", fontFamily: "monospace", color: "#8a8a8a" }}>
                    {row.bizNum}
                  </span>
                  <span style={{ flex: "0 0 110px", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 8, height: 8, background: row.fandomColor, borderRadius: 1 }} />
                    <span style={{ font: "500 11px 'Pretendard'", color: "#111" }}>
                      {row.fandom}
                    </span>
                  </span>
                  <span style={{ flex: "0 0 110px" }}>
                    <span
                      className="pill"
                      style={{
                        color:
                          row.type === "자동승인" || row.type === "수동승인"
                            ? "#1fa16b"
                            : row.type === "최종반려"
                            ? "#d64545"
                            : "#e08a00",
                        background:
                          row.type === "수동검수대기" ? "#fff3db" : "transparent",
                      }}
                    >
                      ● {row.type}
                    </span>
                  </span>
                  <span style={{ flex: "0 0 90px", font: "600 11px 'Pretendard'", color: "#111" }}>
                    {row.amount}원
                  </span>
                  <span style={{ flex: "0 0 140px", color: "#8a8a8a" }}>{row.timestamp}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 📑 수동 검수 팝업 모달 */}
      {selectedQueueItem && (
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
            {/* Left: OCR terminal style text */}
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
                  {selectedQueueItem.id}
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
                {selectedQueueItem.receiptImgText.split("\n").map((line: string, idx: number) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </div>

            {/* Right: OCR Comparison & Actions */}
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
                  ⚖️ OCR 자동 판정 항목 대조 및 검수
                </span>
                <button
                  onClick={() => setSelectedQueueItem(null)}
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
                    {selectedQueueItem.storeName}
                  </div>
                </div>
                <div className="admin-card" style={{ padding: "10px 12px", background: "#fff" }}>
                  <div className="th">결제 일시</div>
                  <div style={{ font: "500 11.5px 'Pretendard'", color: "#111", marginTop: 3 }}>
                    {selectedQueueItem.dateTime}
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
                            selectedQueueItem.fandomId === "FANDOM-01"
                              ? "#2f6bff"
                              : selectedQueueItem.fandomId === "FANDOM-02"
                              ? "#e64980"
                              : "#f59f00",
                        }}
                      />
                      {selectedQueueItem.fandomName}
                    </span>
                  </div>
                </div>
                <div className="admin-card" style={{ padding: "10px 12px", background: "#fff" }}>
                  <div className="th">결제 총액</div>
                  <div style={{ font: "700 13px 'Pretendard'", color: "#2f6bff", marginTop: 3 }}>
                    {selectedQueueItem.amount}원
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <div
                style={{
                  padding: "10px 12px",
                  background:
                    selectedQueueItem.status === "match"
                      ? "#e8f7f0"
                      : selectedQueueItem.status === "warning"
                      ? "#fff3db"
                      : "#fce8e8",
                  border: "1px solid",
                  borderColor:
                    selectedQueueItem.status === "match"
                      ? "#1fa16b"
                      : selectedQueueItem.status === "warning"
                      ? "#e08a00"
                      : "#d64545",
                  marginBottom: 12,
                }}
              >
                <div style={{ font: "700 11px 'Pretendard'", color: "#111" }}>
                  판정 리포트:{" "}
                  {selectedQueueItem.status === "match"
                    ? "일치 (Match)"
                    : selectedQueueItem.status === "warning"
                    ? "경고 (Warning)"
                    : "오류 (Error)"}
                </div>
                <div style={{ font: "400 10.5px 'Pretendard'", color: "#555", marginTop: 4 }}>
                  {selectedQueueItem.status === "match"
                    ? "사업자등록번호 조회 및 가맹점 매칭 성공. 결제금액 조건 충족."
                    : selectedQueueItem.status === "warning"
                    ? "인근 위경도 반경 100m 이탈 정황 발견. 수동 대조를 권장합니다."
                    : "OCR 판독 사업자번호 불일치 및 가공된 영수증 의심 플래그 탐지."}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
                <span style={{ font: "700 10.5px 'Pretendard'", color: "#777" }}>승인 번호 대조</span>
                <input
                  type="text"
                  readOnly
                  value={selectedQueueItem.approvalNumber}
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
                          onClick={() => handleReject(selectedQueueItem)}
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
                  onClick={() => handleApprove(selectedQueueItem)}
                  style={{ height: 44, fontSize: 12, cursor: "pointer" }}
                >
                  최종 승인 완료 [Space]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔎 인증 완료 상세 조회 모달 */}
      {selectedHistoryItem && (
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
              width: 440,
              padding: "24px 28px",
              background: "#fff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0", paddingBottom: 10 }}>
              <span style={{ font: "700 13px 'Pretendard'", color: "#111" }}>
                🔎 인증 처리 상세 내역
              </span>
              <button
                onClick={() => setSelectedHistoryItem(null)}
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

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>인증 로그 ID</span>
                <span style={{ font: "600 11px ui-monospace,monospace", color: "#111" }}>{selectedHistoryItem.id}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>제출 유저 ID</span>
                <span style={{ font: "600 11.5px 'Pretendard'", color: "#111" }}>{selectedHistoryItem.user}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>매장 상호명</span>
                <span style={{ font: "600 11.5px 'Pretendard'", color: "#111" }}>{selectedHistoryItem.store}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>사업자 번호</span>
                <span style={{ font: "600 11px ui-monospace,monospace", color: "#111" }}>{selectedHistoryItem.bizNum}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>귀속 팬덤</span>
                <span style={{ font: "600 11px 'Pretendard'", color: "#111", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, background: selectedHistoryItem.fandomColor, borderRadius: 1 }} />
                  {selectedHistoryItem.fandom}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>결제 금액</span>
                <span style={{ font: "600 12px 'Pretendard'", color: "#2f6bff" }}>{selectedHistoryItem.amount}원</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>인증 시각 / 완료일시</span>
                <span style={{ font: "600 11px 'Pretendard'", color: "#111" }}>{selectedHistoryItem.timestamp}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ font: "700 11px 'Pretendard'", color: "#777" }}>최종 처리 유형</span>
                <span className="pill" style={{
                  color: selectedHistoryItem.type === "최종반려" ? "#d64545" : "#1fa16b",
                  fontWeight: "bold"
                }}>
                  ● {selectedHistoryItem.type}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedHistoryItem(null)}
              className="btn-d"
              style={{ height: 38, cursor: "pointer", marginTop: 10 }}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* Review Hold Modal */}
      {isHoldModalOpen && selectedQueueItem && (
        <ReviewHoldModal
          isOpen={isHoldModalOpen}
          onClose={() => setIsHoldModalOpen(false)}
          onConfirm={() => handleHold(selectedQueueItem)}
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

"use client";

import React, { useState } from "react";

interface SpotProposalItem {
  id: string;
  submitter: string;
  placeType: string;
  fandom: string;
  fandomColor: string;
  storeName: string;
  address: string;
  period: string;
  memo: string;
  bizRegNum: string;
  bizStatus: string;
}

const PROPOSAL_ITEMS: SpotProposalItem[] = [
  {
    id: "PROP-0722-031",
    submitter: "user_5c2a",
    placeType: "생일카페",
    fandom: "아이브 (안유진)",
    fandomColor: "#f59f00",
    storeName: "카페 므므흐스 성수",
    address: "서울 성동구 연무장길 47 1층",
    period: "07.28 (화) ~ 08.03 (월)",
    memo: "안유진 생카 공식 트위터 공지 확인했습니다. 특전 배부는 28일부터예요.",
    bizRegNum: "466-25-01942",
    bizStatus: "국세청 조회 · 영업중",
  },
  {
    id: "PROP-0722-032",
    submitter: "user_89ff",
    placeType: "팝업스토어",
    fandom: "뉴진스",
    fandomColor: "#2f6bff",
    storeName: "성수 팩토리 팝업",
    address: "서울 성동구 아차산로 17",
    period: "08.01 (금) ~ 08.15 (금)",
    memo: "공식 인스타그램에 팝업스토어 포스터 게시됨.",
    bizRegNum: "120-88-99120",
    bizStatus: "국세청 조회 · 영업중",
  },
];

export default function SpotApprovalPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const item = PROPOSAL_ITEMS[currentIndex] || PROPOSAL_ITEMS[0];

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
    if (currentIndex < PROPOSAL_ITEMS.length - 1)
      setCurrentIndex((prev) => prev + 1);
  };

  const handleApprove = () => {
    showToast(`🎉 [${item.id}] 성지 등록이 승인되었습니다.`);
    if (currentIndex < PROPOSAL_ITEMS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleReject = () => {
    showToast(`❌ [${item.id}] 성지 제보가 반려 처리되었습니다.`);
    if (currentIndex < PROPOSAL_ITEMS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleHold = () => {
    showToast(`⚠️ [${item.id}] 보류 처리 및 정보 요청 알림을 발송했습니다.`);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
      {/* Top Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="admin-title">유저 제보 성지 승인</div>
          <span style={{ font: "400 10.5px 'Pretendard'", color: "#9a9a9a" }}>
            대기 {PROPOSAL_ITEMS.length}건
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
            {currentIndex + 1} / {PROPOSAL_ITEMS.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === PROPOSAL_ITEMS.length - 1}
            style={{
              padding: "5px 12px",
              border: "1px solid #ddd",
              background: "#fff",
              font: "500 11px 'Pretendard'",
              color:
                currentIndex === PROPOSAL_ITEMS.length - 1 ? "#ccc" : "#555",
              cursor:
                currentIndex === PROPOSAL_ITEMS.length - 1
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            다음 →
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
        {/* Left: Proposal Detail */}
        <div
          style={{
            width: "430px",
            flex: "none",
            borderRight: "1px solid #e7e7e7",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
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
              제보 폼 상세
            </span>
            <span style={{ font: "400 10px 'Pretendard'", color: "#9a9a9a" }}>
              {item.id} · {item.submitter} 제보
            </span>
          </div>

          <div className="admin-card">
            <div
              style={{
                display: "flex",
                padding: "10px 13px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ width: 90, font: "400 11px 'Pretendard'", color: "#777" }}>
                장소 유형
              </span>
              <span style={{ font: "500 11.5px 'Pretendard'", color: "#111" }}>
                {item.placeType}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                padding: "10px 13px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ width: 90, font: "400 11px 'Pretendard'", color: "#777" }}>
                귀속 팬덤
              </span>
              <span style={{ font: "500 11.5px 'Pretendard'", color: "#111" }}>
                <span style={{ color: item.fandomColor }}>●</span> {item.fandom}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                padding: "10px 13px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ width: 90, font: "400 11px 'Pretendard'", color: "#777" }}>
                상호명
              </span>
              <span style={{ font: "500 11.5px 'Pretendard'", color: "#111" }}>
                {item.storeName}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                padding: "10px 13px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ width: 90, font: "400 11px 'Pretendard'", color: "#777" }}>
                주소
              </span>
              <span style={{ font: "500 11.5px/1.5 'Pretendard'", color: "#111" }}>
                {item.address}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                padding: "10px 13px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ width: 90, font: "400 11px 'Pretendard'", color: "#777" }}>
                운영 기간
              </span>
              <span style={{ font: "500 11.5px 'Pretendard'", color: "#111" }}>
                {item.period}
              </span>
            </div>

            <div style={{ display: "flex", padding: "10px 13px" }}>
              <span style={{ width: 90, font: "400 11px 'Pretendard'", color: "#777" }}>
                증빙 파일
              </span>
              <div style={{ display: "flex", gap: 6 }}>
                <span
                  style={{
                    width: 52,
                    height: 38,
                    background: "#eeeeec",
                    border: "1px solid #e2e2e2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                  }}
                >
                  🧾
                </span>
                <span
                  style={{
                    width: 52,
                    height: 38,
                    background: "#eeeeec",
                    border: "1px solid #e2e2e2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                  }}
                >
                  📷
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 12,
              padding: "10px 13px",
              background: "#f5f5f5",
              border: "1px solid #e7e7e7",
              font: "400 10.5px/1.6 'Pretendard'",
              color: "#555",
            }}
          >
            제보자 메모 — &quot;{item.memo}&quot;
          </div>
        </div>

        {/* Right: Validation & Actions */}
        <div
          style={{
            flex: 1,
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            background: "#fff",
          }}
        >
          <div
            style={{
              font: "700 12px 'Pretendard'",
              color: "#111",
              marginBottom: 10,
            }}
          >
            정합성 대조
          </div>

          {/* Map Geocoding Visualization Mock */}
          <div
            style={{
              height: 180,
              background: "#eef1ec",
              border: "1px solid #e2e2e2",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 70,
                height: 10,
                background: "#fff",
                opacity: 0.8,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 150,
                width: 10,
                background: "#fff",
                opacity: 0.8,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "46%",
                top: "38%",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#111",
                border: "3px solid #fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "22%",
                padding: "4px 9px",
                background: "#fff",
                border: "1px solid #ddd",
                font: "500 9.5px 'Pretendard'",
                color: "#111",
              }}
            >
              카카오 지오코딩 ✓ {item.address}
            </div>
            <div
              style={{
                position: "absolute",
                left: "38%",
                top: "60%",
                padding: "4px 9px",
                background: "#fff",
                border: "1px solid #ddd",
                font: "500 9.5px 'Pretendard'",
                color: "#555",
              }}
            >
              구글 POI 대조 ✓ 동일 지점
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 10,
                font: "400 9px 'Pretendard'",
                color: "#9a9a9a",
              }}
            >
              지오코딩 편차 4m — 정상 범위
            </div>
          </div>

          {/* Business & Duplicate Check */}
          <div className="admin-card" style={{ marginTop: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 13px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ font: "400 11px 'Pretendard'", color: "#777" }}>
                사업자등록번호
              </span>
              <span style={{ font: "500 11.5px 'Pretendard'", color: "#111" }}>
                {item.bizRegNum}{" "}
                <span
                  style={{
                    font: "500 9.5px 'Pretendard'",
                    color: "#1fa16b",
                    marginLeft: 6,
                  }}
                >
                  ✓ {item.bizStatus}
                </span>
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 13px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ font: "400 11px 'Pretendard'", color: "#777" }}>
                상호 대조
              </span>
              <span style={{ font: "500 11.5px 'Pretendard'", color: "#111" }}>
                &quot;{item.storeName}&quot;{" "}
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
                padding: "10px 13px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ font: "400 11px 'Pretendard'", color: "#777" }}>
                중복 성지
              </span>
              <span style={{ font: "500 11.5px 'Pretendard'", color: "#111" }}>
                동일 주소 성지 없음{" "}
                <span
                  style={{
                    font: "500 9.5px 'Pretendard'",
                    color: "#1fa16b",
                    marginLeft: 6,
                  }}
                >
                  ✓
                </span>
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 13px",
                background: "#fffaf0",
              }}
            >
              <span style={{ font: "400 11px 'Pretendard'", color: "#777" }}>
                공식 소스
              </span>
              <span style={{ font: "500 11.5px 'Pretendard'", color: "#111" }}>
                트위터 공지 링크 첨부{" "}
                <span
                  style={{
                    font: "500 9.5px 'Pretendard'",
                    color: "#e08a00",
                    marginLeft: 6,
                  }}
                >
                  △ 수동 확인 필요
                </span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: "auto", display: "flex", gap: 8, paddingTop: 16 }}>
            <button
              onClick={handleHold}
              style={{
                flex: 1,
                height: 46,
                border: "1.5px solid #111",
                background: "#fff",
                font: "700 12.5px 'Pretendard'",
                color: "#111",
                cursor: "pointer",
              }}
            >
              보류 · 정보 요청
            </button>
            <button
              onClick={handleReject}
              style={{
                flex: 1,
                height: 46,
                border: "1.5px solid #d64545",
                background: "#fff",
                font: "700 12.5px 'Pretendard'",
                color: "#d64545",
                cursor: "pointer",
              }}
            >
              반려
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
              성지 등록 승인
            </button>
          </div>
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

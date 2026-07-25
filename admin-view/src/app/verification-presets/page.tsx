"use client";

import React, { useState } from "react";

interface PresetItem {
  code: string;
  usage: string;
  isMax?: boolean;
  title: string;
  content: string;
  channel: string;
}

const PRESETS: PresetItem[] = [
  {
    code: "R-EXPIRE",
    usage: "사용 41%",
    isMax: true,
    title: "최신성 만료 (기간 초과)",
    content:
      '"제출하신 영수증의 결제일시가 인정 기간을 초과했어요. 최근 방문 영수증으로 다시 인증해 주세요."',
    channel: "푸시 + 인앱 모달",
  },
  {
    code: "R-DUP",
    usage: "사용 28%",
    title: "중복 영수증 (승인번호 재사용)",
    content:
      '"이미 인증에 사용된 영수증이에요. 동일 결제 건은 한 번만 인정됩니다."',
    channel: "푸시 + 인앱 모달",
  },
  {
    code: "R-OCR",
    usage: "사용 18%",
    title: "금액/항목 판독 불가",
    content:
      '"영수증 글씨가 흐려 금액을 확인하지 못했어요. 전체가 선명하게 보이도록 다시 촬영해 주세요."',
    channel: "푸시 + 인앱 모달",
  },
  {
    code: "R-STORE",
    usage: "사용 9%",
    title: "매장 불일치 (사업자번호 상이)",
    content:
      '"인증하려는 성지와 영수증 매장이 달라요. 해당 성지에서 결제한 영수증으로 인증해 주세요."',
    channel: "푸시 + 인앱 모달",
  },
];

export default function VerificationPresetsPage() {
  const [presetList] = useState<PresetItem[]>(PRESETS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top Header Bar */}
      <div className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ font: "700 14px 'Pretendard'", color: "#111" }}>
            반려 사유 프리셋 (ADM-VERIF-03)
          </span>
          <span style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
            템플릿 {presetList.length}종 · 검수 큐 [R] 반려에 연동
          </span>
        </div>
        <button
          onClick={() => showToast("➕ 신규 사유 템플릿 추가 폼이 열렸습니다.")}
          style={{
            padding: "7px 14px",
            background: "#111",
            color: "#fff",
            border: "none",
            font: "700 11px 'Pretendard'",
            cursor: "pointer",
          }}
        >
          + 사유 템플릿 추가
        </button>
      </div>

      {/* Main Grid Content */}
      <div
        style={{
          flex: 1,
          padding: "18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 14,
          }}
        >
          {presetList.map((item, idx) => (
            <div key={idx} className="admin-card" style={{ padding: "14px 16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <span className="tag" style={{ borderColor: "#111", color: "#111" }}>
                  {item.code}
                </span>
                <span className="hint">
                  {item.usage} {item.isMax ? "· 최다" : ""}
                </span>
              </div>
              <div
                style={{
                  font: "600 12.5px 'Pretendard'",
                  color: "#111",
                  marginBottom: 5,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  font: "400 10.5px/1.6 'Pretendard'",
                  color: "#666",
                  background: "#fafafa",
                  border: "1px solid #f0f0f0",
                  padding: "8px 10px",
                }}
              >
                {item.content}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <span className="hint">{item.channel}</span>
                <button
                  onClick={() => showToast(`✏️ '${item.code}' 템플릿 편집 모달이 열렸습니다.`)}
                  style={{
                    font: "500 10px 'Pretendard'",
                    color: "#111",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  수정
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Notice */}
        <div
          style={{
            marginTop: "auto",
            padding: "12px 14px",
            background: "#fafafa",
            border: "1px solid #e7e7e7",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span className="hint" style={{ lineHeight: 1.6, color: "#555" }}>
            템플릿의 <b style={{ fontWeight: 600, color: "#111" }}>{"{성지명}"}·{"{기간}"}</b> 변수는 반려 시점 데이터로 자동 치환됩니다. 코드 삭제 시 과거 반려 이력의 문구는 보존됩니다.
          </span>
          <span className="tag" style={{ borderColor: "#d64545", color: "#d64545" }}>
            수정 권한: SUPER_ADMIN
          </span>
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

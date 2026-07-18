"use client";

import React from "react";
import { Star, ShieldCheck, Mail, MapPin } from "lucide-react";

const C = {
  line: "#E2E5EC",
  txt: "#1B1D26",
  sub: "#6C7180",
  panel: "#F4F5F8",
  panel2: "#EAECF1",
};

const FAND_COLOR = "#4C8DFF";

export default function MyPage() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFFFFF", overflow: "hidden" }}>
      {/* 헤더 */}
      <div style={{ padding: "40px 18px 12px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Star size={20} color="#F5C542" />
          <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em" }}>마이페이지</span>
        </div>
      </div>

      {/* 본문 */}
      <div className="scroll" style={{ flex: 1, overflowY: "auto", padding: "0 18px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 999, background: `${FAND_COLOR}1F`, border: `2px solid ${FAND_COLOR}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: FAND_COLOR }}>지</div>
        <h2 style={{ marginTop: 12, fontSize: 18, fontWeight: 800 }}>지수</h2>
        <span style={{ marginTop: 4, display: "inline-flex", alignItems: "center", gap: 5, background: C.panel2, border: `1px solid ${C.line}`, padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700, color: C.sub }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: FAND_COLOR }} /> 뉴진스 팬덤
        </span>

        <div style={{ marginTop: 24, width: "100%", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
            <Mail size={16} color={C.sub} />
            <span style={{ color: C.sub, width: 80 }}>이메일</span>
            <span style={{ fontWeight: 600 }}>jisu@example.com</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
            <MapPin size={16} color={C.sub} />
            <span style={{ color: C.sub, width: 80 }}>선호 성지</span>
            <span style={{ fontWeight: 600 }}>마포구, 성동구</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
            <ShieldCheck size={16} color={C.sub} />
            <span style={{ color: C.sub, width: 80 }}>인증 건수</span>
            <span style={{ fontWeight: 600 }} className="mono">198 건</span>
          </div>
        </div>

        <p style={{ marginTop: 24, fontSize: 12, color: C.sub, textAlign: "center", lineHeight: 1.5 }}>
          팬덤 설정은 마이페이지 및 온보딩 화면에서 자유롭게 변경 가능합니다 (MVP 범위 외).
        </p>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { ChevronLeft, Share2, MapPin, Clock, Camera, ChevronDown, Users, Flame, Check, ArrowRight } from "lucide-react";

/* ============================================================
   IP 팬덤 땅따먹기 — S2 성지 상세
   이벤트명·D-day · 팬덤별 점유율 바 · [영수증 인증] CTA
   (S1 지도에서 '뉴진스 하니 생일카페' 핀 → 상세로 진입)
   ============================================================ */

const C = {
  page: "#EBEDF2", frame: "#FFFFFF", panel: "#F4F5F8", panel2: "#EAECF1",
  line: "#E2E5EC", txt: "#1B1D26", sub: "#6C7180", neutral: "#D9DDE7",
};
const FAND = {
  nj:  { name: "뉴진스",   color: "#4C8DFF" },
  ive: { name: "아이브",   color: "#FF4D62" },
  aes: { name: "에스파",   color: "#C25CFF" },
  lsf: { name: "르세라핌", color: "#22D3B7" },
};

// 이 성지 데이터 (S1 히어로 핀과 동일)
const SPOT = {
  fandom: "nj",
  event: "하니 생일 카페",
  place: "어반소스",
  district: "마포구",
  area: "연남동",
  period: "2026.03.01 – 03.05",
  ddayLabel: "마감 D-3",
  desc: "하니 생일을 기념하는 팬 주최 카페. 음료 구매 영수증으로 인증할 수 있어요.",
};

// 이 성지 팬덤별 점유 (인증 건수 기반 · 1건 1점)
const OCC = [
  { id: "nj",  count: 124 },
  { id: "ive", count: 52 },
  { id: "aes", count: 24 },
];
const TOTAL = OCC.reduce((s, o) => s + o.count, 0);
const withPct = OCC.map((o) => ({ ...o, pct: Math.round((o.count / TOTAL) * 100) }))
  .sort((a, b) => b.count - a.count);
const LEADER = withPct[0];

const FEED = [
  { t: "3분 전",  fandom: "nj",  gain: "+0.5%" },
  { t: "11분 전", fandom: "ive", gain: "+0.4%" },
  { t: "26분 전", fandom: "nj",  gain: "+0.5%" },
];

export default function SpotDetail() {
  const [attrib, setAttrib] = useState("nj"); // 인증 귀속 팬덤
  const [pickOpen, setPickOpen] = useState(false);
  const [pressed, setPressed] = useState(false);

  const lf = FAND[SPOT.fandom];
  const occupied = LEADER.pct >= 40;

  return (
    <div style={{ minHeight: "100vh", background: C.page, display: "flex", justifyContent: "center",
      alignItems: "flex-start", padding: "24px 12px",
      fontFamily: "'Pretendard', -apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif" }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
        .mono { font-family: ui-monospace,'SF Mono',Menlo,monospace; font-variant-numeric: tabular-nums; }
        .tapzone { cursor:pointer; -webkit-tap-highlight-color: transparent; }
        .scroll::-webkit-scrollbar { display:none; }
        @keyframes rise { from{opacity:0; transform:translateY(8px);} to{opacity:1; transform:translateY(0);} }
        @keyframes grow { from{ width:0; } }
        .rise { animation: rise .22s ease-out; }
        .bar { animation: grow .7s cubic-bezier(.2,.7,.2,1); }
        @media (prefers-reduced-motion: reduce){ .bar{ animation:none; } }
      `}</style>

      {/* 폰 프레임 */}
      <div style={{ width: 390, maxWidth: "100%", height: 820, background: C.frame, borderRadius: 40,
        border: `1px solid ${C.line}`, boxShadow: "0 20px 50px rgba(30,34,60,.14)", overflow: "hidden",
        position: "relative", display: "flex", flexDirection: "column", color: C.txt }}>
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
          width: 120, height: 26, background: "#000", borderRadius: 20, zIndex: 60 }} />

        {/* 스크롤 영역 */}
        <div className="scroll" style={{ flex: 1, overflowY: "auto" }}>

          {/* 히어로 */}
          <div style={{ position: "relative", height: 260,
            background: `radial-gradient(120% 100% at 50% -10%, ${lf.color}55 0%, ${lf.color}18 40%, #FFFFFF 80%)` }}>
            {/* 상단 바 */}
            <div style={{ position: "absolute", top: 44, left: 14, right: 14, display: "flex",
              alignItems: "center", justifyContent: "space-between", zIndex: 10 }}>
              <button className="tapzone" style={btnCircle}><ChevronLeft size={20} color={C.txt} /></button>
              <button className="tapzone" style={btnCircle}><Share2 size={17} color={C.txt} /></button>
            </div>
            {/* 심볼 */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 62, filter: `drop-shadow(0 8px 30px ${lf.color}88)` }}>🎂</div>
            </div>
            {/* D-day */}
            <div style={{ position: "absolute", left: 18, bottom: 16, display: "flex", gap: 7, alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5, background: lf.color, color: "#06122B",
                fontWeight: 800, fontSize: 12.5, padding: "5px 10px", borderRadius: 999 }}>
                <Flame size={13} /> {SPOT.ddayLabel}
              </span>
              <span style={{ background: "rgba(255,255,255,.8)", border: `1px solid ${C.line}`, color: C.txt,
                fontSize: 11.5, fontWeight: 600, padding: "5px 9px", borderRadius: 999 }}>이벤트 성지</span>
            </div>
          </div>

          {/* 타이틀 블록 */}
          <div style={{ padding: "16px 18px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 9, height: 9, borderRadius: 999, background: lf.color }} />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: lf.color }}>{lf.name}</span>
            </div>
            <h1 style={{ margin: "6px 0 0", fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>{SPOT.event}</h1>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 5 }}>
              <Row icon={<MapPin size={14} color={C.sub} />} text={<><b style={{ color: C.txt }}>{SPOT.place}</b> · {SPOT.district} {SPOT.area}</>} />
              <Row icon={<Clock size={14} color={C.sub} />} text={SPOT.period} />
            </div>
            <p style={{ margin: "12px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "#4A4E5C" }}>{SPOT.desc}</p>
          </div>

          {/* 이 성지 점령 현황 */}
          <div style={{ margin: "18px 14px 0", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 18, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Users size={15} color={C.sub} />
                <span style={{ fontSize: 14, fontWeight: 700 }}>이 성지 점령 현황</span>
              </div>
              <span className="mono" style={{ fontSize: 11.5, color: C.sub }}>인증 {TOTAL}건</span>
            </div>

            {/* 리더 */}
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: FAND[LEADER.id].color }} className="mono">{LEADER.pct}%</span>
              <span style={{ fontSize: 13.5, fontWeight: 700 }}>{FAND[LEADER.id].name} 1위</span>
              {occupied && (
                <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 700,
                  color: FAND[LEADER.id].color, background: `${FAND[LEADER.id].color}22`, padding: "2px 8px", borderRadius: 999 }}>
                  <Check size={12} /> 점령
                </span>
              )}
            </div>

            {/* 세그먼트 바 */}
            <div style={{ marginTop: 10, height: 12, borderRadius: 999, background: C.panel2, overflow: "hidden", display: "flex" }}>
              {withPct.map((o) => (
                <div key={o.id} className="bar" style={{ width: `${o.pct}%`, background: FAND[o.id].color,
                  opacity: o.id === LEADER.id ? 1 : 0.5 }} />
              ))}
            </div>

            {/* 범례 */}
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {withPct.map((o) => (
                <div key={o.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: FAND[o.id].color,
                      opacity: o.id === LEADER.id ? 1 : 0.6 }} />
                    {FAND[o.id].name}
                  </span>
                  <span className="mono" style={{ fontSize: 12, color: C.sub }}>
                    <b style={{ color: C.txt }}>{o.pct}%</b> · {o.count}건
                  </span>
                </div>
              ))}
            </div>

            {/* 전황 연결 */}
            <button className="tapzone" style={{ marginTop: 14, width: "100%", display: "flex", alignItems: "center",
              justifyContent: "space-between", background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 12,
              padding: "10px 12px", color: C.txt }}>
              <span style={{ fontSize: 12.5 }}>여기 인증은 <b style={{ color: lf.color }}>{SPOT.district}</b> 전황에 반영돼요</span>
              <ArrowRight size={15} color={C.sub} />
            </button>
          </div>

          {/* 실시간 인증 피드 */}
          <div style={{ margin: "14px 14px 0", padding: "0 4px" }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: C.sub, marginBottom: 8 }}>실시간 인증</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {FEED.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, color: "#4A4E5C" }}>
                  <span style={{ width: 7, height: 7, borderRadius: 999, background: FAND[f.fandom].color }} />
                  <span className="mono" style={{ color: C.sub, width: 46 }}>{f.t}</span>
                  <span>익명 팬이 <b style={{ color: FAND[f.fandom].color }}>{FAND[f.fandom].name}</b>로 인증</span>
                  <span className="mono" style={{ marginLeft: "auto", color: FAND[f.fandom].color, fontWeight: 700 }}>{f.gain}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 인증 안내 */}
          <div style={{ margin: "16px 18px 24px", fontSize: 11.5, color: C.sub, lineHeight: 1.6 }}>
            결제 영수증 필요 · 성지 반경 200m 이내 · 1일 1회 · 승인번호로 중복 차단
          </div>
        </div>

        {/* 하단 CTA */}
        <div style={{ flexShrink: 0, borderTop: `1px solid ${C.line}`, background: C.frame, padding: "12px 16px 22px", position: "relative" }}>
          {/* 귀속 팬덤 선택 */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: C.sub }}>인증 시 내 팬덤</span>
            <button className="tapzone" onClick={() => setPickOpen((v) => !v)}
              style={{ display: "flex", alignItems: "center", gap: 6, background: C.panel2, border: `1px solid ${C.line}`,
                borderRadius: 999, padding: "5px 10px 5px 8px" }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: FAND[attrib].color }} />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: C.txt }}>{FAND[attrib].name}</span>
              <ChevronDown size={14} color={C.sub} />
            </button>
          </div>

          {pickOpen && (
            <div className="rise" style={{ position: "absolute", right: 16, bottom: 86, background: C.panel,
              border: `1px solid ${C.line}`, borderRadius: 14, padding: 6, width: 150, zIndex: 30,
              boxShadow: "0 12px 40px rgba(0,0,0,.5)" }}>
              {Object.entries(FAND).map(([id, f]) => (
                <button key={id} className="tapzone" onClick={() => { setAttrib(id); setPickOpen(false); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 10px",
                    borderRadius: 10, border: "none", background: attrib === id ? C.panel2 : "transparent", color: C.txt }}>
                  <span style={{ width: 9, height: 9, borderRadius: 999, background: f.color }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{f.name}</span>
                  {attrib === id && <Check size={14} color={f.color} style={{ marginLeft: "auto" }} />}
                </button>
              ))}
              <div style={{ fontSize: 10.5, color: C.sub, padding: "4px 10px 2px", lineHeight: 1.4 }}>인증 1건은 팬덤 1개에 귀속돼요</div>
            </div>
          )}

          <button className="tapzone" onClick={() => { setPressed(true); setTimeout(() => setPressed(false), 1600); }}
            style={{ width: "100%", height: 52, borderRadius: 16, border: "none", cursor: "pointer",
              background: FAND[attrib].color, color: "#06122B", fontSize: 15.5, fontWeight: 800,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: `0 10px 26px ${FAND[attrib].color}55`, transition: "transform .1s" }}>
            <Camera size={19} />
            {pressed ? "카메라 여는 중… (다음: S3 인증)" : "영수증 인증하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

const btnCircle = {
  width: 38, height: 38, borderRadius: 999, border: `1px solid ${C.line}`,
  background: "rgba(255,255,255,.7)", backdropFilter: "blur(6px)",
  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
};

function Row({ icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: C.sub }}>
      {icon}<span>{text}</span>
    </div>
  );
}

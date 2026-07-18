import React, { useState, useEffect, useRef } from "react";
import { X, Images, Check, Camera, ArrowRight, MapPin, RotateCcw, Sparkles, ShieldCheck } from "lucide-react";

/* ============================================================
   IP 팬덤 땅따먹기 — S3 영수증 인증 (핵심 액션)
   카메라 → "AI 판독 중"(항목추출·4겹검증) → 결과("마포 +0.4%, 뒤집힘!")
   ============================================================ */

const C = {
  page: "#EBEDF2", frame: "#FFFFFF", panel: "#F4F5F8", panel2: "#EAECF1",
  line: "#E2E5EC", txt: "#1B1D26", sub: "#6C7180",
};
const NJ = { name: "뉴진스", color: "#4C8DFF" };
const IVE = { name: "아이브", color: "#FF4D62" };

const FIELDS = [
  { k: "사업자번호", v: "208-81-4****", note: "성지 일치" },
  { k: "거래일시",  v: "2026.03.02 14:22", note: "" },
  { k: "결제금액",  v: "4,500원", note: "" },
  { k: "승인번호",  v: "30021847", note: "중복 아님" },
  { k: "위치(GPS)", v: "반경 120m", note: "통과" },
];

export default function ReceiptVerify() {
  const [phase, setPhase] = useState("camera"); // camera | scanning | result
  const [step, setStep] = useState(0);          // 판독 항목 진행
  const [njShare, setNjShare] = useState(48);    // 결과 카운터
  const timers = useRef([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const shoot = () => {
    setPhase("scanning");
    setStep(0);
    FIELDS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i + 1), 400 + i * 380));
    });
    timers.current.push(setTimeout(() => setPhase("result"), 400 + FIELDS.length * 380 + 500));
  };

  const reset = () => { clearTimers(); setNjShare(48); setPhase("camera"); setStep(0); };

  // 결과: 48 → 51 카운트업
  useEffect(() => {
    if (phase !== "result") return;
    let v = 48;
    const iv = setInterval(() => {
      v += 1; setNjShare(v);
      if (v >= 51) clearInterval(iv);
    }, 220);
    return () => clearInterval(iv);
  }, [phase]);

  useEffect(() => () => clearTimers(), []);

  return (
    <div style={{ minHeight: "100vh", background: C.page, display: "flex", justifyContent: "center",
      alignItems: "flex-start", padding: "24px 12px",
      fontFamily: "'Pretendard', -apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif" }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
        .mono { font-family: ui-monospace,'SF Mono',Menlo,monospace; font-variant-numeric: tabular-nums; }
        .tapzone { cursor:pointer; -webkit-tap-highlight-color:transparent; }
        @keyframes scanline { 0%{ top:6%; } 100%{ top:90%; } }
        @keyframes rise { from{opacity:0; transform:translateY(10px);} to{opacity:1; transform:translateY(0);} }
        @keyframes pop { 0%{ transform:scale(.6); opacity:0; } 60%{ transform:scale(1.12); } 100%{ transform:scale(1); opacity:1; } }
        @keyframes confetti { 0%{ transform:translateY(-10px) rotate(0); opacity:1; } 100%{ transform:translateY(420px) rotate(320deg); opacity:0; } }
        @keyframes shutterpulse { 0%,100%{ box-shadow:0 0 0 0 rgba(76,141,255,.5);} 50%{ box-shadow:0 0 0 12px rgba(76,141,255,0);} }
        .rise{ animation:rise .3s ease-out; } .pop{ animation:pop .4s cubic-bezier(.2,.8,.2,1); }
        @media (prefers-reduced-motion: reduce){ .scanline,.shutter,.conf{ animation:none !important; } }
      `}</style>

      {/* 폰 프레임 */}
      <div style={{ width: 390, maxWidth: "100%", height: 820, background: C.frame, borderRadius: 40,
        border: `1px solid ${C.line}`, boxShadow: "0 20px 50px rgba(30,34,60,.14)", overflow: "hidden",
        position: "relative", display: "flex", flexDirection: "column", color: C.txt }}>
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
          width: 120, height: 26, background: "#000", borderRadius: 20, zIndex: 60 }} />

        {/* ================= CAMERA ================= */}
        {phase === "camera" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column",
            background: "linear-gradient(180deg,#F5F7FB,#EAEDF3)" }}>
            <div style={{ padding: "44px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button className="tapzone" style={iconBtn}><X size={19} color={C.txt} /></button>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.panel2,
                border: `1px solid ${C.line}`, padding: "5px 11px", borderRadius: 999 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: NJ.color }} />
                <span style={{ fontSize: 12.5, fontWeight: 700 }}>{NJ.name}로 인증</span>
              </div>
              <div style={{ width: 38 }} />
            </div>

            {/* 뷰파인더 */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
              <div style={{ position: "relative", width: "78%", aspectRatio: "3/4",
                border: `2px dashed ${C.line}`, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* 코너 */}
                {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h],i)=>(
                  <span key={i} style={{ position:"absolute", [v]:-2, [h]:-2, width:26, height:26,
                    borderTop: v==="top"?`3px solid ${NJ.color}`:"none", borderBottom: v==="bottom"?`3px solid ${NJ.color}`:"none",
                    borderLeft: h==="left"?`3px solid ${NJ.color}`:"none", borderRight: h==="right"?`3px solid ${NJ.color}`:"none",
                    [v==="top"?"borderTopLeftRadius":"borderBottomLeftRadius"]: 0, borderRadius: v==="top"? (h==="left"?"14px 0 0 0":"0 14px 0 0") : (h==="left"?"0 0 0 14px":"0 0 14px 0") }} />
                ))}
                <div style={{ textAlign: "center", color: C.sub }}>
                  <Camera size={30} color={C.sub} />
                  <div style={{ marginTop: 8, fontSize: 12.5 }}>영수증을 사각 안에 맞춰주세요</div>
                </div>
              </div>
              <p style={{ marginTop: 18, fontSize: 12, color: C.sub, textAlign: "center", lineHeight: 1.5 }}>
                결제 영수증만 인증돼요 · 성지 반경 200m 이내
              </p>
            </div>

            {/* 셔터 */}
            <div style={{ padding: "0 28px 30px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button className="tapzone" style={iconBtn}><Images size={20} color={C.txt} /></button>
              <button className="tapzone shutter" onClick={shoot}
                style={{ width: 74, height: 74, borderRadius: 999, background: NJ.color, border: "5px solid #FFFFFF",
                  cursor: "pointer", animation: "shutterpulse 2s infinite", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Camera size={26} color="#06122B" />
              </button>
              <div style={{ width: 40 }} />
            </div>
          </div>
        )}

        {/* ================= SCANNING ================= */}
        {phase === "scanning" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "56px 20px 24px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, color: NJ.color, fontWeight: 800, fontSize: 16 }}>
                <Sparkles size={17} /> AI 판독 중…
              </div>
              <p style={{ margin: "6px 0 0", fontSize: 12.5, color: C.sub }}>영수증에서 항목을 읽고 있어요</p>
            </div>

            {/* 영수증 + 스캔선 */}
            <div style={{ position: "relative", margin: "22px auto 0", width: 190, background: "#F3F1EA",
              borderRadius: 8, padding: "16px 16px 20px", color: "#1A1A1A",
              boxShadow: `0 12px 40px ${NJ.color}33`, overflow: "hidden" }}>
              <div className="scanline" style={{ position: "absolute", left: 0, right: 0, height: 3,
                background: NJ.color, boxShadow: `0 0 14px 3px ${NJ.color}`, animation: "scanline 1.4s ease-in-out infinite alternate" }} />
              <div className="mono" style={{ fontSize: 12, fontWeight: 700, textAlign: "center", letterSpacing: 1 }}>URBAN SAUCE</div>
              <div className="mono" style={{ fontSize: 9, textAlign: "center", color: "#555" }}>어반소스 · 마포</div>
              <div style={{ borderTop: "1px dashed #999", margin: "10px 0" }} />
              <div className="mono" style={{ fontSize: 9.5, display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>아메리카노</span><span>4,500</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#555" }}><span>사업자</span><span>208-81-4****</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#555" }}><span>승인</span><span>30021847</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#555" }}><span>일시</span><span>03.02 14:22</span></div>
              </div>
              <div style={{ borderTop: "1px dashed #999", margin: "10px 0 4px" }} />
              <div className="mono" style={{ fontSize: 8, textAlign: "center", color: "#777" }}>THANK YOU</div>
            </div>

            {/* 추출 항목 체크 */}
            <div style={{ marginTop: 22, background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16, padding: 14 }}>
              {FIELDS.map((f, i) => {
                const done = step > i;
                return (
                  <div key={f.k} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0",
                    opacity: done ? 1 : 0.35, transition: "opacity .25s" }}>
                    <span style={{ width: 18, height: 18, borderRadius: 999, flexShrink: 0,
                      background: done ? NJ.color : "transparent", border: done ? "none" : `1.5px solid ${C.line}`,
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {done && <Check size={12} color="#06122B" />}
                    </span>
                    <span style={{ fontSize: 12.5, color: C.sub, width: 84 }}>{f.k}</span>
                    <span className="mono" style={{ fontSize: 12, color: C.txt }}>{f.v}</span>
                    {done && f.note && (
                      <span style={{ marginLeft: "auto", fontSize: 10.5, color: NJ.color, fontWeight: 700 }}>{f.note}</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: C.sub, fontSize: 11.5 }}>
              <ShieldCheck size={14} /> 4겹 어뷰징 방어 통과 확인 중
            </div>
          </div>
        )}

        {/* ================= RESULT ================= */}
        {phase === "result" && (
          <div style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column",
            background: `radial-gradient(120% 70% at 50% 0%, ${NJ.color}30 0%, #FFFFFF 62%)`, overflow: "hidden" }}>
            {/* confetti */}
            {[...Array(14)].map((_, i) => (
              <span key={i} className="conf" style={{ position: "absolute", top: -10, left: `${8 + i * 6.4}%`,
                width: 7, height: 11, borderRadius: 2, background: i % 2 ? NJ.color : "#FFCC4D",
                animation: `confetti ${1.6 + (i % 4) * 0.25}s ease-in ${i * 0.05}s forwards` }} />
            ))}

            <div style={{ flex: 1, overflowY: "auto", padding: "60px 22px 20px", position: "relative", zIndex: 5 }}>
              {/* 성공 배지 */}
              <div className="pop" style={{ width: 76, height: 76, borderRadius: 999, margin: "0 auto",
                background: NJ.color, display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 12px 34px ${NJ.color}77` }}>
                <Check size={40} color="#06122B" strokeWidth={3} />
              </div>
              <h1 style={{ margin: "16px 0 0", textAlign: "center", fontSize: 22, fontWeight: 800 }}>인증 완료!</h1>
              <p style={{ margin: "8px 0 0", textAlign: "center", fontSize: 15, lineHeight: 1.45 }}>
                <b style={{ color: NJ.color }}>마포구</b>를 뉴진스 색으로<br /><b style={{ color: NJ.color }}>뒤집었어요!</b> 🎉
              </p>

              {/* 뒤집힘 바 */}
              <div style={{ marginTop: 20, background: "rgba(255,255,255,.85)", border: `1px solid ${C.line}`, borderRadius: 18, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, marginBottom: 9 }}>
                  <span style={{ color: C.sub }}>마포구 점령 현황</span>
                  <span className="mono" style={{ color: NJ.color, fontWeight: 800 }}>뉴진스 {njShare}%</span>
                </div>
                <div style={{ height: 14, borderRadius: 999, background: "#E3E6EC", overflow: "hidden", display: "flex" }}>
                  <div style={{ width: `${njShare}%`, background: NJ.color, transition: "width .2s" }} />
                  <div style={{ width: `${97 - njShare}%`, background: IVE.color, opacity: 0.55 }} />
                </div>
                <div style={{ marginTop: 9, display: "flex", justifyContent: "space-between", fontSize: 11.5 }}>
                  <span style={{ color: NJ.color }}>● 뉴진스 {njShare}%</span>
                  <span className="mono" style={{ color: C.sub }}>기존 48% → <b style={{ color: NJ.color }}>{njShare}%</b></span>
                  <span style={{ color: IVE.color }}>아이브 {97 - njShare}% ●</span>
                </div>
              </div>

              {/* 획득 요약 */}
              <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
                <Stat label="획득 점수" value="+1점" sub="누적 인증" />
                <Stat label="내 기여" value="+0.4%p" sub="마포 점유" accent />
                <Stat label="이번주 기여" value="3위" sub="마포 랭킹" />
              </div>

              {/* 영수증 요약 */}
              <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10, background: C.panel,
                border: `1px solid ${C.line}`, borderRadius: 14, padding: "11px 13px" }}>
                <MapPin size={16} color={C.sub} />
                <span style={{ fontSize: 12.5 }}>어반소스 · 4,500원</span>
                <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, color: NJ.color,
                  background: `${NJ.color}22`, padding: "3px 9px", borderRadius: 999 }}>자동승인</span>
              </div>
            </div>

            {/* CTA */}
            <div style={{ flexShrink: 0, padding: "12px 18px 22px", position: "relative", zIndex: 5 }}>
              <button className="tapzone" style={{ width: "100%", height: 52, borderRadius: 16, border: "none",
                background: NJ.color, color: "#06122B", fontWeight: 800, fontSize: 15.5, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: `0 10px 26px ${NJ.color}55` }}>
                전황 보기 <ArrowRight size={18} />
              </button>
              <button className="tapzone" onClick={reset} style={{ width: "100%", marginTop: 10, height: 46,
                borderRadius: 14, border: `1px solid ${C.line}`, background: "transparent", color: C.sub,
                fontWeight: 700, fontSize: 13.5, cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 7 }}>
                <RotateCcw size={15} /> 다시 인증 (데모)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const iconBtn = {
  width: 38, height: 38, borderRadius: 999, border: `1px solid ${C.line}`, background: C.panel2,
  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
};

function Stat({ label, value, sub, accent }) {
  return (
    <div style={{ flex: 1, background: C.panel, border: `1px solid ${accent ? NJ.color + "66" : C.line}`,
      borderRadius: 14, padding: "12px 10px", textAlign: "center" }}>
      <div style={{ fontSize: 10.5, color: C.sub }}>{label}</div>
      <div className="mono" style={{ margin: "4px 0 2px", fontSize: 18, fontWeight: 800,
        color: accent ? NJ.color : C.txt }}>{value}</div>
      <div style={{ fontSize: 10, color: C.sub }}>{sub}</div>
    </div>
  );
}

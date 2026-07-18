"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, ChevronRight, Star, AlertTriangle } from "lucide-react";

// ---- 토큰 ----
const C = {
  line: "#E2E5EC",
  txt: "#1B1D26",
  sub: "#6C7180",
  neutral: "#D9DDE7",
  panel2: "#EAECF1",
};

// ---- 타입 정의 ----
type FandomKey = "nj" | "ive" | "aes" | "lsf";

interface FandomInfo {
  name: string;
  color: string;
}

interface DistrictInfo {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  leader: FandomKey;
  share: number;
  second: FandomKey;
  secondShare: number;
  state: "occupied" | "contest" | "neutral";
  hot?: boolean;
}

interface SpotInfo {
  id: string;
  x: number;
  y: number;
  fandom: FandomKey;
  kind: "event" | "resident";
  dday?: number;
  place: string;
  title: string;
  hero?: boolean;
}

// ---- 팬덤(색) ----
const FAND: Record<FandomKey, FandomInfo> = {
  nj:  { name: "뉴진스",   color: "#4C8DFF" },
  ive: { name: "아이브",   color: "#FF4D62" },
  aes: { name: "에스파",   color: "#C25CFF" },
  lsf: { name: "르세라핌", color: "#22D3B7" },
};
const MY: FandomKey = "nj"; // 내 팬덤

// ---- 구(땅) : 타일 좌표(viewBox 320x400) + 점유 현황 ----
const DISTRICTS: DistrictInfo[] = [
  { id: "eunpyeong", name: "은평",   x: 20,  y: 54,  w: 70, h: 58, leader: "ive", share: 26, second: "aes", secondShare: 22, state: "neutral" },
  { id: "jongno",    name: "종로",   x: 132, y: 50,  w: 64, h: 48, leader: "aes", share: 47, second: "lsf", secondShare: 22, state: "occupied" },
  { id: "seongbuk",  name: "성북",   x: 224, y: 58,  w: 72, h: 56, leader: "nj",  share: 29, second: "ive", secondShare: 27, state: "neutral" },
  { id: "seodaemun", name: "서대문", x: 36,  y: 128, w: 72, h: 58, leader: "ive", share: 42, second: "nj",  secondShare: 33, state: "occupied" },
  { id: "mapo",      name: "마포",   x: 118, y: 112, w: 90, h: 80, leader: "nj",  share: 51, second: "ive", secondShare: 46, state: "occupied", hot: true },
  { id: "seongdong", name: "성동",   x: 222, y: 132, w: 76, h: 62, leader: "nj",  share: 44, second: "ive", secondShare: 30, state: "occupied" },
  { id: "yeongdeung",name: "영등포", x: 26,  y: 258, w: 74, h: 58, leader: "aes", share: 24, second: "lsf", secondShare: 21, state: "neutral" },
  { id: "yongsan",   name: "용산",   x: 116, y: 244, w: 78, h: 58, leader: "lsf", share: 41, second: "aes", secondShare: 30, state: "occupied" },
  { id: "gangnam",   name: "강남",   x: 206, y: 256, w: 90, h: 64, leader: "aes", share: 40, second: "lsf", secondShare: 36, state: "occupied" },
  { id: "songpa",    name: "송파",   x: 210, y: 330, w: 86, h: 50, leader: "ive", share: 38, second: "nj",  secondShare: 35, state: "contest" },
];

// ---- 성지(핀) ----
const SPOTS: SpotInfo[] = [
  { id: "s1", x: 150, y: 150, fandom: "nj",  kind: "event",    dday: 3, place: "어반소스",   title: "뉴진스 하니 생일카페", hero: true },
  { id: "s2", x: 186, y: 176, fandom: "ive", kind: "event",    dday: 1, place: "홍대 팝업존", title: "아이브 팝업스토어" },
  { id: "s3", x: 250, y: 150, fandom: "aes", kind: "event",    dday: 5, place: "성수 라운지", title: "에스파 윈터 생일카페" },
  { id: "s4", x: 274, y: 180, fandom: "lsf", kind: "resident",        place: "성수 커피바", title: "르세라핌 단골 카페" },
  { id: "s5", x: 70,  y: 156, fandom: "ive", kind: "event",    dday: 2, place: "연희 살롱",   title: "아이브 생일카페" },
  { id: "s6", x: 162, y: 74,  fandom: "aes", kind: "resident",        place: "익선 다방",   title: "에스파 성지 카페" },
  { id: "s7", x: 150, y: 272, fandom: "lsf", kind: "resident",        place: "이태원 옥상", title: "르세라핌 뮤비 촬영지" },
];

const STATE_LABEL = { occupied: "점령", contest: "경합", neutral: "중립" };

export default function FandomMapHome() {
  const [onlyMine, setOnlyMine] = useState(false);
  const [visible, setVisible] = useState<Set<FandomKey>>(new Set(Object.keys(FAND) as FandomKey[]));
  const [selDist, setSelDist] = useState<string | null>(null);
  const [selSpot, setSelSpot] = useState<string | null>(null);

  const toggleFandom = (id: FandomKey) => {
    setVisible((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const isMuted = (fandom: FandomKey, state: "occupied" | "contest" | "neutral") => {
    if (state === "neutral") return true;
    if (!visible.has(fandom)) return true;
    if (onlyMine && fandom !== MY) return true;
    return false;
  };

  const distFill = (d: DistrictInfo) => {
    if (isMuted(d.leader, d.state)) return { fill: C.neutral, op: d.state === "neutral" ? 0.55 : 0.32 };
    const base = d.state === "contest" ? 0.28 : Math.min(0.62, 0.30 + (d.share - 40) * 0.012);
    return { fill: FAND[d.leader].color, op: base };
  };

  const spotDim = (s: SpotInfo) => (!visible.has(s.fandom)) || (onlyMine && s.fandom !== MY);

  const pct = (v: number, base: number) => `${(v / base) * 100}%`;

  const clearSel = () => { setSelDist(null); setSelSpot(null); };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFFFFF", overflow: "hidden" }} onClick={clearSel}>
      {/* ===== 헤더 ===== */}
      <div style={{ padding: "40px 18px 12px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>⛳</span>
            <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: "-0.02em" }}>팬덤 땅따먹기</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, background: C.panel2,
            border: `1px solid ${C.line}`, padding: "5px 10px", borderRadius: 999 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: FAND[MY].color }} />
            <span style={{ fontSize: 12.5, fontWeight: 600 }}>{FAND[MY].name}</span>
          </div>
        </div>

        {/* 라이브 티커 */}
        <Link href="/war" style={{ textDecoration: "none", display: "block" }}>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8,
            background: "rgba(76,141,255,.10)", border: `1px solid rgba(76,141,255,.28)`,
            borderRadius: 12, padding: "8px 11px" }}>
            <span className="livedot" style={{ width: 7, height: 7, borderRadius: 999, background: "#FF4D62",
              animation: "livedot 1.4s infinite" }} />
            <span style={{ fontSize: 12.5, color: C.txt }}>
              방금 <b style={{ color: FAND.nj.color }}>마포</b>가 뉴진스 색으로 뒤집혔어요
            </span>
          </div>
        </Link>
      </div>

      {/* ===== 필터 ===== */}
      <div style={{ padding: "0 18px 12px", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }} className="scroll">
          <button onClick={(e) => { e.stopPropagation(); setOnlyMine((v) => !v); }} className="tapzone"
            style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, padding: "7px 12px",
              borderRadius: 999, fontSize: 12.5, fontWeight: 700, border: "none",
              background: onlyMine ? FAND[MY].color : C.panel2,
              color: onlyMine ? "#06122B" : C.sub, transition: "all .15s" }}>
            <Star size={13} fill={onlyMine ? "#06122B" : "none"} /> 내 팬덤만
          </button>
          {(Object.keys(FAND) as FandomKey[]).map((id) => {
            const f = FAND[id];
            const on = visible.has(id);
            return (
              <button key={id} onClick={(e) => { e.stopPropagation(); toggleFandom(id); }} className="tapzone"
                style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, padding: "7px 11px",
                  borderRadius: 999, fontSize: 12.5, fontWeight: 600, border: `1px solid ${on ? f.color : C.line}`,
                  background: "transparent", color: on ? C.txt : C.sub, opacity: on ? 1 : 0.5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: f.color,
                  boxShadow: on ? `0 0 6px ${f.color}` : "none" }} />
                {f.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== 지도(게임 보드) ===== */}
      <div style={{ position: "relative", flex: 1, margin: "0 14px", borderRadius: 22,
        background: "radial-gradient(120% 90% at 50% 0%, #FFFFFF 0%, #F2F4F9 70%), #F5F7FB",
        border: `1px solid ${C.line}`, overflow: "hidden" }}>

        {/* SVG 지도 */}
        <svg viewBox="0 0 320 400" width="100%" height="100%" style={{ display: "block" }}
          preserveAspectRatio="xMidYMid meet">
          {/* 한강 */}
          <path d="M -10 210 C 80 190, 150 250, 210 220 S 320 210, 340 232 L 340 250 C 300 232, 220 268, 150 236 S 40 218, -10 236 Z"
            fill="#DCE8F7" opacity="0.9" />
          <path d="M -10 210 C 80 190, 150 250, 210 220 S 320 210, 340 232"
            fill="none" stroke="#B9D2F0" strokeWidth="1.4" opacity="0.9" />

          {/* 구 타일 */}
          {DISTRICTS.map((d) => {
            const { fill, op } = distFill(d);
            const sel = selDist === d.id;
            return (
              <g key={d.id} className="tapzone"
                onClick={(e) => { e.stopPropagation(); setSelSpot(null); setSelDist(d.id); }}>
                {d.hot && !isMuted(d.leader, d.state) && (
                  <rect className="hotglow" x={d.x - 3} y={d.y - 3} width={d.w + 6} height={d.h + 6} rx="18"
                    fill="none" stroke={FAND[d.leader].color} strokeWidth="2"
                    style={{ animation: "softpulse 1.8s ease-in-out infinite" }} />
                )}
                <rect x={d.x} y={d.y} width={d.w} height={d.h} rx="15"
                  fill={fill} fillOpacity={op}
                  stroke={sel ? FAND[d.leader]?.color || "#fff" : (d.state === "contest" && !isMuted(d.leader, d.state) ? FAND[d.leader].color : C.line)}
                  strokeWidth={sel ? 2.2 : 1}
                  strokeDasharray={d.state === "contest" ? "5 4" : "0"} />
                <text x={d.x + d.w / 2} y={d.y + d.h / 2 - 2} textAnchor="middle"
                  fontSize="13" fontWeight="700" fill={C.txt} opacity={isMuted(d.leader, d.state) ? 0.55 : 0.95}>
                  {d.name}
                </text>
                {d.state !== "neutral" && !isMuted(d.leader, d.state) && (
                  <text x={d.x + d.w / 2} y={d.y + d.h / 2 + 13} textAnchor="middle"
                    className="mono" fontSize="10.5" fontWeight="700" fill={FAND[d.leader].color}>
                    {d.share}%
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* 성지 핀 오버레이 */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {SPOTS.map((s) => {
            const f = FAND[s.fandom];
            const dim = spotDim(s);
            const sel = selSpot === s.id;
            return (
              <div key={s.id} className="tapzone"
                onClick={(e) => { e.stopPropagation(); setSelDist(null); setSelSpot(s.id); }}
                style={{ position: "absolute", left: pct(s.x, 320), top: pct(s.y, 400),
                  transform: "translate(-50%,-100%)", pointerEvents: "auto",
                  opacity: dim ? 0.22 : 1, zIndex: sel ? 20 : s.hero ? 12 : 10, transition: "opacity .15s" }}>
                {/* 히어로 링 */}
                {s.hero && !dim && (
                  <span className="heroring" style={{ position: "absolute", left: "50%", top: 9,
                    width: 26, height: 26, marginLeft: -13, borderRadius: 999,
                    border: `2px solid ${f.color}`, transform: "translate(0,-50%)",
                    animation: "ringpulse 1.8s ease-out infinite" }} />
                )}
                {/* 핀 */}
                <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {s.kind === "event" && !dim && s.dday !== undefined && (
                    <span className="mono" style={{ marginBottom: 3, fontSize: 9.5, fontWeight: 800,
                      color: "#0A0B14", background: f.color, padding: "1px 5px", borderRadius: 6,
                      boxShadow: `0 2px 6px ${f.color}66` }}>D-{s.dday}</span>
                  )}
                  <div style={{ width: sel ? 26 : 22, height: sel ? 26 : 22, borderRadius: "50% 50% 50% 0",
                    transform: "rotate(45deg)", background: f.color,
                    border: sel ? "2px solid #fff" : "2px solid rgba(255,255,255,.85)",
                    boxShadow: `0 3px 10px ${f.color}88`, transition: "all .12s" }}>
                    <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
                      justifyContent: "center", transform: "rotate(-45deg)" }}>
                      {s.kind === "resident"
                        ? <Star size={10} color="#0A0B14" fill="#0A0B14" />
                        : <span style={{ width: 6, height: 6, borderRadius: 999, background: "#0A0B14" }} />}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 선택된 구 readout */}
        {selDist && (() => {
          const d = DISTRICTS.find((x) => x.id === selDist);
          if (!d) return null;
          const lf = FAND[d.leader];
          const diff = d.share - d.secondShare;
          const risky = d.state === "occupied" && diff <= 6;
          return (
            <div className="rise" style={{ position: "absolute", left: 12, right: 12, top: 12,
              background: "rgba(255,255,255,.94)", backdropFilter: "blur(8px)", border: `1px solid ${C.line}`,
              borderRadius: 16, padding: "12px 14px", zIndex: 30 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 800 }}>{d.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
                    color: d.state === "neutral" ? C.sub : lf.color,
                    background: d.state === "neutral" ? C.panel2 : `${lf.color}22` }}>
                    {STATE_LABEL[d.state]}
                  </span>
                </div>
                {risky && (
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: "#FFB020" }}>
                    <AlertTriangle size={12} /> 위태로움
                  </span>
                )}
              </div>

              {d.state === "neutral" ? (
                <p style={{ margin: "8px 0 0", fontSize: 12.5, color: C.sub }}>아직 아무도 40%를 넘지 못했어요 · 지금이 기회</p>
              ) : (
                <>
                  {/* 점유 바 */}
                  <div style={{ marginTop: 10, height: 8, borderRadius: 999, background: C.panel2, overflow: "hidden", display: "flex" }}>
                    <div style={{ width: `${d.share}%`, background: lf.color }} />
                    <div style={{ width: `${d.secondShare}%`, background: FAND[d.second].color, opacity: 0.55 }} />
                  </div>
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: lf.color }} />
                      {lf.name} <b className="mono">{d.share}%</b>
                    </span>
                    <span style={{ color: C.sub }}>
                      2위 {FAND[d.second].name} <b className="mono" style={{ color: C.txt }}>{d.secondShare}%</b>
                      <span className="mono" style={{ color: "#FFB020", marginLeft: 6 }}>격차 {diff}%p</span>
                    </span>
                  </div>
                </>
              )}
            </div>
          );
        })()}

        {/* 범례 */}
        <div style={{ position: "absolute", left: 12, bottom: 12, display: "flex", gap: 8, flexWrap: "wrap",
          background: "rgba(255,255,255,.86)", border: `1px solid ${C.line}`, borderRadius: 10, padding: "6px 9px", zIndex: 5 }}>
          <LegendItem label="이벤트 성지" node={<span style={{ width: 9, height: 9, borderRadius: "50% 50% 50% 0", transform: "rotate(45deg)", background: C.sub, display: "inline-block" }} />} />
          <LegendItem label="상설 성지" node={<Star size={10} color={C.sub} fill={C.sub} />} />
          <LegendItem label="점령(40%↑)" node={<span style={{ width: 12, height: 8, borderRadius: 3, background: FAND.nj.color }} />} />
        </div>
      </div>

      {/* 성지 핀 프리뷰 시트 */}
      {selSpot && (() => {
        const s = SPOTS.find((x) => x.id === selSpot);
        if (!s) return null;
        const f = FAND[s.fandom];
        return (
          <div className="rise" style={{ position: "absolute", left: 14, right: 14, bottom: 78, zIndex: 45,
            background: "rgba(255,255,255,.97)", backdropFilter: "blur(10px)", border: `1px solid ${C.line}`,
            borderRadius: 18, padding: 14, boxShadow: "0 12px 40px rgba(0,0,0,.5)" }}>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 4, borderRadius: 4, background: f.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: f.color }}>{f.name}</span>
                  <span style={{ fontSize: 11, color: C.sub }}>·</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: s.kind === "event" ? "#FFB020" : C.sub }} className={s.kind === "event" ? "mono" : ""}>
                    {s.kind === "event" ? `D-${s.dday} 진행중` : "상설"}
                  </span>
                </div>
                <div style={{ marginTop: 3, fontSize: 15, fontWeight: 800, letterSpacing: "-0.01em" }}>{s.title}</div>
                <div style={{ marginTop: 2, fontSize: 12.5, color: C.sub, display: "flex", alignItems: "center", gap: 4 }}>
                  <MapPin size={12} /> {s.place}
                </div>
              </div>
              <Link href={`/spot/${s.id}`} style={{ textDecoration: "none", alignSelf: "center" }}>
                <div className="tapzone"
                  style={{ display: "flex", alignItems: "center", gap: 2, border: "none",
                    background: f.color, color: "#0A0B14", fontWeight: 800, fontSize: 12.5,
                    padding: "9px 12px", borderRadius: 12 }}>
                  상세 <ChevronRight size={15} />
                </div>
              </Link>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function LegendItem({ node, label }: { node: React.ReactNode; label: string }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10.5, color: "#6C7180" }}>
      {node}{label}
    </span>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Swords, AlertTriangle, TrendingUp, TrendingDown, Flame, Crown, ChevronRight, Shield, Target } from "lucide-react";

const C = {
  line: "#E2E5EC",
  txt: "#1B1D26",
  sub: "#6C7180",
  neutral: "#C4CAD8",
  panel: "#F4F5F8",
  panel2: "#EAECF1",
};

type FandomKey = "nj" | "ive" | "aes" | "lsf";

interface FandomInfo {
  name: string;
  color: string;
}

interface WarDistrict {
  id: string;
  name: string;
  leader: FandomKey;
  share: number;
  second: FandomKey;
  ss: number;
  state: "occupied" | "contest" | "neutral";
  trend: "up" | "down";
  flag: "flipped" | "risky" | "target" | null;
}

const FAND: Record<FandomKey, FandomInfo> = {
  nj:  { name: "뉴진스",   color: "#4C8DFF" },
  ive: { name: "아이브",   color: "#FF4D62" },
  aes: { name: "에스파",   color: "#C25CFF" },
  lsf: { name: "르세라핌", color: "#22D3B7" },
};
const MY: FandomKey = "nj";
const STATE = { occupied: "점령", contest: "경합", neutral: "중립" };

// flag: flipped(방금 뒤집음) / risky(위태·내팬덤) / target(뺏을 땅·내가 2위)
const DISTRICTS_DATA: WarDistrict[] = [
  { id: "mapo",      name: "마포",   leader: "nj",  share: 51, second: "ive", ss: 46, state: "occupied", trend: "up",   flag: "flipped" },
  { id: "seongdong", name: "성동",   leader: "nj",  share: 41, second: "ive", ss: 37, state: "occupied", trend: "down", flag: "risky" },
  { id: "seodaemun", name: "서대문", leader: "ive", share: 42, second: "nj",  ss: 33, state: "occupied", trend: "up",   flag: "target" },
  { id: "gangnam",   name: "강남",   leader: "aes", share: 40, second: "lsf", ss: 36, state: "occupied", trend: "down", flag: null },
  { id: "jongno",    name: "종로",   leader: "aes", share: 47, second: "lsf", ss: 22, state: "occupied", trend: "up",   flag: null },
  { id: "yongsan",   name: "용산",   leader: "lsf", share: 41, second: "aes", ss: 30, state: "occupied", trend: "up",   flag: null },
  { id: "songpa",    name: "송파",   leader: "ive", share: 38, second: "nj",  ss: 35, state: "contest",  trend: "up",   flag: "target" },
  { id: "seongbuk",  name: "성북",   leader: "nj",  share: 29, second: "ive", ss: 27, state: "neutral",  trend: "up",   flag: null },
  { id: "eunpyeong", name: "은평",   leader: "ive", share: 26, second: "aes", ss: 22, state: "neutral",  trend: "down", flag: null },
  { id: "yeongdeung",name: "영등포", leader: "aes", share: 24, second: "lsf", ss: 21, state: "neutral",  trend: "down", flag: null },
];

const myOccupied = DISTRICTS_DATA.filter(d => d.leader === MY && d.state === "occupied").length;
const myRisky    = DISTRICTS_DATA.filter(d => d.flag === "risky").length;
const myTarget   = DISTRICTS_DATA.filter(d => d.second === MY && d.state !== "neutral").length;

export default function WarStatus() {
  const [scope, setScope] = useState<"all" | "mine">("all");
  const [sel, setSel] = useState<string | null>(null);

  const list = scope === "mine" ? DISTRICTS_DATA.filter(d => d.leader === MY || d.second === MY) : DISTRICTS_DATA;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFFFFF", overflow: "hidden" }}>
      {/* 헤더 */}
      <div style={{ padding: "40px 18px 10px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Swords size={20} color={C.txt} />
          <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em" }}>점령 전황</span>
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, background: C.panel2,
            border: `1px solid ${C.line}`, padding: "4px 10px", borderRadius: 999 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: FAND[MY].color }} />
            <span style={{ fontSize: 12, fontWeight: 700 }}>{FAND[MY].name}</span>
          </span>
        </div>

        {/* 내 팬덤 요약 */}
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <Summary icon={<Crown size={15} color={FAND[MY].color} />} n={myOccupied} label="점령" color={FAND[MY].color} />
          <Summary icon={<AlertTriangle size={15} color="#FFB020" />} n={myRisky} label="위태" color="#FFB020" />
          <Summary icon={<Target size={15} color={C.sub} />} n={myTarget} label="도전" color={C.txt} />
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, overflowY: "auto", padding: "0 14px 20px" }}>
        {/* 알림: 뒤집힘 */}
        <div style={{ marginTop: 4, borderRadius: 16, padding: 14,
          background: `linear-gradient(135deg, ${FAND.nj.color}2E, ${FAND.nj.color}0A)`,
          border: `1px solid ${FAND.nj.color}55` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span className="flame" style={{ animation: "flamepulse 1.4s infinite" }}><Flame size={16} color={FAND.nj.color} /></span>
            <span style={{ fontSize: 13, fontWeight: 800, color: FAND.nj.color }}>방금 뒤집었어요</span>
            <span className="mono" style={{ marginLeft: "auto", fontSize: 11, color: C.sub }}>1분 전</span>
          </div>
          <p style={{ margin: "7px 0 0", fontSize: 13, lineHeight: 1.45 }}>
            <b>마포</b>가 아이브 → <b style={{ color: FAND.nj.color }}>뉴진스</b>로 넘어갔어요. 당신의 인증이 결정타!
          </p>
        </div>

        {/* 알림: 위태로움 */}
        <Link href="/verify" style={{ textDecoration: "none", display: "block" }}>
          <div className="tapzone" style={{ marginTop: 10, borderRadius: 16, padding: 14,
            background: "linear-gradient(135deg,#FFB0201F,#FFB02008)", border: "1px solid #FFB02055" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Shield size={15} color="#FFB020" />
              <span style={{ fontSize: 13, fontWeight: 800, color: "#FFB020" }}>성동이 위태로워요</span>
              <span className="mono" style={{ marginLeft: "auto", fontSize: 11, color: "#FFB020" }}>격차 4%p</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 7 }}>
              <p style={{ margin: 0, fontSize: 12.5, color: "#8A6A1F" }}>아이브가 4%p까지 추격 중. 재방문·인증으로 지켜요.</p>
              <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 12, fontWeight: 700, color: "#FFB020", whiteSpace: "nowrap" }}>
                방어하기 <ChevronRight size={14} />
              </span>
            </div>
          </div>
        </Link>

        {/* 스코프 토글 */}
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: C.sub }}>구별 현황</span>
          <div style={{ display: "flex", gap: 4, background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 999, padding: 3 }}>
            {([["all", "전체"], ["mine", "뉴진스"]] as const).map(([k, lab]) => (
              <button key={k} className="tapzone" onClick={() => setScope(k)}
                style={{ border: "none", cursor: "pointer", padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700,
                  background: scope === k ? (k === "mine" ? FAND[MY].color : C.txt) : "transparent",
                  color: scope === k ? "#fff" : C.sub }}>{lab}</button>
            ))}
          </div>
        </div>

        {/* 구 리스트 */}
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
          {list.map((d) => {
            const lf = FAND[d.leader], sf = FAND[d.second];
            const diff = d.share - d.ss;
            const sel_ = sel === d.id;
            const badgeColor = d.state === "neutral" ? C.sub : lf.color;
            return (
              <div key={d.id} className="tapzone rise" onClick={() => setSel(sel_ ? null : d.id)}
                style={{ background: C.panel, borderRadius: 16, padding: 14,
                  border: `1px solid ${sel_ ? lf.color : (d.flag ? flagColor(d.flag) + "66" : C.line)}` }}>
                {/* 상단 줄 */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 15.5, fontWeight: 800 }}>{d.name}</span>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: badgeColor,
                    background: d.state === "neutral" ? C.panel2 : `${lf.color}22`, padding: "2px 8px", borderRadius: 999 }}>
                    {STATE[d.state]}
                  </span>
                  {d.flag && <FlagChip flag={d.flag} />}
                  <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
                    {d.state !== "neutral" && (
                      <>
                        <span style={{ width: 9, height: 9, borderRadius: 999, background: lf.color }} />
                        <span className="mono" style={{ fontSize: 15, fontWeight: 800, color: lf.color }}>{d.share}%</span>
                      </>
                    )}
                    {d.state === "neutral" && <span style={{ fontSize: 12, color: C.sub }}>미점령</span>}
                  </span>
                </div>

                {/* 격차 바 */}
                <div style={{ marginTop: 10, height: 8, borderRadius: 999, background: "#E9ECF2", overflow: "hidden", display: "flex" }}>
                  <div style={{ width: `${d.share}%`, background: d.state === "neutral" ? C.neutral : lf.color }} />
                  <div style={{ width: `${d.ss}%`, background: sf.color, opacity: 0.5 }} />
                </div>

                {/* 하단 줄 */}
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11.5 }}>
                  <span style={{ color: C.sub }}>
                    2위 <b style={{ color: sf.color }}>{sf.name}</b> <span className="mono">{d.ss}%</span>
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="mono" style={{ color: diff <= 5 ? "#FFB020" : C.sub, fontWeight: 700 }}>격차 {diff}%p</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 2, color: d.trend === "up" ? "#3FD07E" : "#FF6B7A" }}>
                      {d.trend === "up" ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function flagColor(flag: "flipped" | "risky" | "target") {
  return flag === "flipped" ? FAND.nj.color : flag === "risky" ? "#FFB020" : "#3FD07E";
}

function FlagChip({ flag }: { flag: "flipped" | "risky" | "target" }) {
  const map = {
    flipped: { t: "방금 뒤집음", c: FAND.nj.color, I: Flame },
    risky:   { t: "위태",       c: "#FFB020",     I: AlertTriangle },
    target:  { t: "뺏을 땅",     c: "#3FD07E",     I: Target },
  };
  const m = map[flag];
  const I = m.I;
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, fontWeight: 700,
      color: m.c, border: `1px solid ${m.c}66`, padding: "2px 7px", borderRadius: 999 }}>
      <I size={10} /> {m.t}
    </span>
  );
}

interface SummaryProps {
  icon: React.ReactNode;
  n: number;
  label: string;
  color?: string;
}

function Summary({ icon, n, label, color }: SummaryProps) {
  return (
    <div style={{ flex: 1, background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: "11px 8px", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
        {icon}
        <span className="mono" style={{ fontSize: 19, fontWeight: 800, color }}>{n}</span>
      </div>
      <div style={{ marginTop: 3, fontSize: 11, color: C.sub }}>{label}</div>
    </div>
  );
}

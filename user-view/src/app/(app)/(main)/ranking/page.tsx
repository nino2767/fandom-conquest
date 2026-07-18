"use client";

import React, { useState } from "react";
import { Trophy, Crown, TrendingUp, Users } from "lucide-react";

const C = {
  line: "#E2E5EC",
  txt: "#1B1D26",
  sub: "#6C7180",
  panel: "#F4F5F8",
  panel2: "#EAECF1",
};

type FandomKey = "nj" | "ive" | "aes" | "lsf";

interface FandomInfo {
  name: string;
  color: string;
}

interface PersonRank {
  name: string;
  f: FandomKey;
  v: number;
  me?: boolean;
}

interface FandomRank {
  f: FandomKey;
  share: number;
  spots: number;
}

const FAND: Record<FandomKey, FandomInfo> = {
  nj:  { name: "뉴진스",   color: "#4C8DFF" },
  ive: { name: "아이브",   color: "#FF4D62" },
  aes: { name: "에스파",   color: "#C25CFF" },
  lsf: { name: "르세라핌", color: "#22D3B7" },
};
const MY: FandomKey = "nj";
const MEDAL = ["#F5C542", "#C7CDD9", "#CD8B54"];

// 개인 랭킹
const PEOPLE: Record<"all" | "mapo", PersonRank[]> = {
  all: [
    { name: "하니러버",   f: "nj",  v: 312 },
    { name: "레이맘",     f: "ive", v: 289 },
    { name: "카리나포켓", f: "aes", v: 264 },
    { name: "채원지기",   f: "lsf", v: 241 },
    { name: "민지파",     f: "nj",  v: 228 },
    { name: "안유진해",   f: "ive", v: 210 },
    { name: "지수",       f: "nj",  v: 198, me: true },
    { name: "윈터프린스", f: "aes", v: 176 },
  ],
  mapo: [
    { name: "하니러버",   f: "nj",  v: 42 },
    { name: "마포뉴진",   f: "nj",  v: 38 },
    { name: "지수",       f: "nj",  v: 35, me: true },
    { name: "레이맘",     f: "ive", v: 33 },
    { name: "홍대아이브", f: "ive", v: 29 },
  ],
};

// 팬덤 랭킹 (현재 점유)
const FANDOMS: Record<"all" | "mapo", FandomRank[]> = {
  all:  [
    { f: "aes", share: 30, spots: 2 },
    { f: "nj",  share: 28, spots: 2 },
    { f: "ive", share: 26, spots: 1 },
    { f: "lsf", share: 16, spots: 1 },
  ],
  mapo: [
    { f: "nj",  share: 51, spots: 1 },
    { f: "ive", share: 46, spots: 0 },
    { f: "aes", share: 2,  spots: 0 },
    { f: "lsf", share: 1,  spots: 0 },
  ],
};

export default function Ranking() {
  const [mode, setMode] = useState<"people" | "fandom">("people");
  const [scope, setScope] = useState<"all" | "mapo">("all");

  const people = PEOPLE[scope];
  const fandoms = FANDOMS[scope];
  const me = people.find(p => p.me);
  const myRank = people.findIndex(p => p.me) + 1;
  const unit = scope === "all" ? "누적" : "이번주";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FFFFFF", overflow: "hidden" }}>
      {/* 헤더 */}
      <div style={{ padding: "40px 18px 12px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Trophy size={20} color="#F5C542" />
          <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em" }}>랭킹</span>
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, background: C.panel2,
            border: `1px solid ${C.line}`, padding: "4px 10px", borderRadius: 999 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: FAND[MY].color }} />
            <span style={{ fontSize: 12, fontWeight: 700 }}>{FAND[MY].name}</span>
          </span>
        </div>

        {/* 모드 토글 */}
        <div style={{ marginTop: 12, display: "flex", gap: 6, background: C.panel2, border: `1px solid ${C.line}`,
          borderRadius: 12, padding: 4 }}>
          {([["people", "개인 · 누적"], ["fandom", "팬덤 · 점유"]] as const).map(([k, lab]) => (
            <button key={k} className="tapzone" onClick={() => setMode(k)}
              style={{ flex: 1, border: "none", cursor: "pointer", padding: "9px 0", borderRadius: 9, fontSize: 13, fontWeight: 700,
                background: mode === k ? C.txt : "transparent", color: mode === k ? "#fff" : C.sub }}>{lab}</button>
          ))}
        </div>

        {/* 범위 칩 */}
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
          {([["all", "전체 서울"], ["mapo", "마포구"]] as const).map(([k, lab]) => (
            <button key={k} className="tapzone" onClick={() => setScope(k)}
              style={{ border: `1px solid ${scope === k ? FAND[MY].color : C.line}`, cursor: "pointer",
                padding: "6px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600,
                background: "transparent", color: scope === k ? C.txt : C.sub }}>{lab}</button>
          ))}
          <span style={{ marginLeft: "auto", fontSize: 11, color: C.sub }}>
            {mode === "people" ? "인증 건수 · 영구" : "현재 점유 · 유동"}
          </span>
        </div>
      </div>

      {/* 리스트 */}
      <div className="scroll" style={{ flex: 1, overflowY: "auto", padding: "2px 14px 20px" }}>
        {mode === "people" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {people.map((p, i) => {
              const f = FAND[p.f];
              return (
                <div key={i} className="rise" style={{ display: "flex", alignItems: "center", gap: 12,
                  background: p.me ? `${f.color}1A` : C.panel, borderRadius: 14, padding: "11px 13px",
                  border: `1px solid ${p.me ? f.color : C.line}` }}>
                  <RankMark i={i} />
                  <div style={{ width: 36, height: 36, borderRadius: 999, flexShrink: 0, background: `${f.color}2E`,
                    border: `1.5px solid ${f.color}`, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 15, fontWeight: 800, color: f.color }}>{p.name.slice(0, 1)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</span>
                      {p.me && <span style={{ fontSize: 10, fontWeight: 800, color: "#06122B", background: f.color, padding: "1px 6px", borderRadius: 6 }}>나</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                      <span style={{ width: 7, height: 7, borderRadius: 999, background: f.color }} />
                      <span style={{ fontSize: 11.5, color: C.sub }}>{f.name}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="mono" style={{ fontSize: 16, fontWeight: 800, color: p.me ? f.color : C.txt }}>{p.v}</span>
                    <span style={{ fontSize: 11, color: C.sub }}> 건</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {fandoms.map((fd, i) => {
              const f = FAND[fd.f];
              const mine = fd.f === MY;
              return (
                <div key={fd.f} className="rise" style={{ background: mine ? `${f.color}1A` : C.panel, borderRadius: 16,
                  padding: 14, border: `1px solid ${mine ? f.color : C.line}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <RankMark i={i} />
                    <span style={{ width: 12, height: 12, borderRadius: 999, background: f.color, flexShrink: 0,
                      boxShadow: `0 0 8px ${f.color}` }} />
                    <span style={{ fontSize: 15.5, fontWeight: 800 }}>{f.name}</span>
                    {mine && <span style={{ fontSize: 10, fontWeight: 800, color: "#06122B", background: f.color, padding: "1px 6px", borderRadius: 6 }}>내 팬덤</span>}
                    <span style={{ marginLeft: "auto", display: "flex", alignItems: "baseline", gap: 1 }}>
                      <span className="mono" style={{ fontSize: 20, fontWeight: 800, color: f.color }}>{fd.share}</span>
                      <span style={{ fontSize: 12, color: C.sub }}>%</span>
                    </span>
                  </div>
                  <div style={{ marginTop: 11, height: 10, borderRadius: 999, background: "#E9ECF2", overflow: "hidden" }}>
                    <div style={{ width: `${fd.share}%`, height: "100%", background: f.color }} />
                  </div>
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: C.sub }}>
                    <Users size={13} color={fd.spots > 0 ? f.color : C.sub} />
                    점령 <b style={{ color: fd.spots > 0 ? f.color : C.sub }}>{fd.spots}</b>{scope === "all" ? "구" : ""}
                    {scope === "mapo" && fd.spots > 0 && <span style={{ color: f.color }}>· 마포 점령 중</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 내 순위 고정 (개인 모드) */}
      {mode === "people" && me && (
        <div style={{ flexShrink: 0, borderTop: `1px solid ${C.line}`, background: "#FFFFFF", padding: "12px 16px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: `${FAND[me.f].color}1F`,
            border: `1px solid ${FAND[me.f].color}`, borderRadius: 14, padding: "11px 14px" }}>
            <span className="mono" style={{ fontSize: 18, fontWeight: 800, color: FAND[me.f].color, width: 30 }}>{myRank}위</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>내 순위 · {scope === "all" ? "전체 서울" : "마포구"}</div>
              <div style={{ fontSize: 11.5, color: C.sub }}>{unit} 인증 {me.v}건</div>
            </div>
            <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 700, color: "#3FD07E" }}>
              <TrendingUp size={14} /> {scope === "all" ? "+2" : "+1"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function RankMark({ i }: { i: number }) {
  const top = i < 3;
  return (
    <span style={{ width: 26, textAlign: "center", flexShrink: 0 }}>
      {top ? (
        <span style={{ display: "inline-flex", width: 24, height: 24, borderRadius: 999, alignItems: "center",
          justifyContent: "center", background: MEDAL[i], color: "#06122B", fontWeight: 800, fontSize: 13 }}>{i + 1}</span>
      ) : (
        <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "#6B7290" }}>{i + 1}</span>
      )}
    </span>
  );
}

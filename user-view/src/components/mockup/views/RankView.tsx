'use client';

import React, { useState } from 'react';

export default function RankView() {
  const [rankTab, setRankTab] = useState<'personal' | 'fandom'>('personal');
  const [showDetail, setShowDetail] = useState(false);

  // UV-RANK-02: Personal Contribution Detail
  if (showDetail) {
    return (
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
        <div style={{ position: 'absolute', top: '50px', left: '18px', right: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={() => setShowDetail(false)} className="tapzone" style={{ width: '32px', height: '32px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" /></svg>
          </div>
          <div style={{ font: "600 14px 'Pretendard'", color: '#111' }}>개인 기여도</div>
          <div style={{ width: '32px' }}></div>
        </div>

        <div style={{ position: 'absolute', top: '98px', left: '18px', right: '18px', background: '#f2f2f0', padding: '13px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
            <div style={{ width: '48px', height: '48px', border: '1px solid #111', borderRadius: '50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 15px 'Pretendard'", color: '#111', flex: 'none', background: '#fff' }}>덕<span style={{ position: 'absolute', top: 0, right: 0, width: '7px', height: '7px', background: '#2f6bff' }}></span></div>
            <div style={{ flex: 1 }}>
              <div style={{ font: "600 15px 'Pretendard'", color: '#111' }}>덕질마스터</div>
              <div style={{ font: "400 9.5px 'IBM Plex Mono', monospace", color: '#999', marginTop: '2px' }}>뉴진스 · D+45</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            {[{ v: '42', l: '인증' }, { v: '#12', l: '랭킹' }, { v: '2', l: '칭호' }].map((s, i) => (
              <div key={i} style={{ flex: 1, background: '#fff', padding: '8px', textAlign: 'center' }}>
                <div style={{ font: "600 16px 'Pretendard'", color: '#111' }}>{s.v}</div>
                <div style={{ font: "400 8.5px 'IBM Plex Mono', monospace", color: '#999' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', top: '262px', left: '18px', right: '18px' }}>
          <div style={{ font: "600 12px 'Pretendard'", color: '#111', marginBottom: '8px' }}>구별 기여 지분율</div>
          <div style={{ border: '1px solid #e0e0e0', padding: '11px 13px' }}>
            {[{ name: '마포구', pct: '18.2%', w: '18%' }, { name: '성동구', pct: '11.6%', w: '11.6%' }, { name: '서대문구', pct: '6.4%', w: '6.4%' }].map((d, i) => (
              <div key={i} style={{ marginBottom: i < 2 ? '11px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', font: "500 11px 'Pretendard'", color: '#111' }}><span>{d.name}</span><span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 400 }}>{d.pct}</span></div>
                <div style={{ height: '5px', background: '#f0f0f0', marginTop: '5px' }}><div style={{ width: d.w, height: '100%', background: '#111' }}></div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', top: '440px', left: '18px', right: '18px', bottom: '24px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
            <span style={{ font: "600 12px 'Pretendard'", color: '#111' }}>수호신 뱃지</span>
            <span style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999' }}>4/5</span>
          </div>
          <div style={{ display: 'flex', gap: '7px' }}>
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.3"><path d="M3 8l4 3 5-6 5 6 4-3v9H3z" /></svg>, label: '마포수호' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.3"><path d="M12 3l7 4v6c0 4-3 6-7 8-4-2-7-4-7-8V7z" /></svg>, label: '개척자' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.3"><path d="M12 3v18M5 10l7-7 7 7" /></svg>, label: '역전주역' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.3"><path d="M12 2C7 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-3-8-8-8Z" /></svg>, label: '순례자' },
            ].map((b, i) => (
              <div key={i} style={{ flex: 1, border: '1px solid #111', padding: '9px 3px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>{b.icon}</div>
                <div style={{ font: "400 7.5px 'IBM Plex Mono', monospace", color: '#111', marginTop: '4px' }}>{b.label}</div>
              </div>
            ))}
            <div style={{ flex: 1, border: '1px dashed #c8c8c8', padding: '9px 3px', textAlign: 'center' }}>
              <div style={{ font: "400 14px 'Pretendard'", color: '#c8c8c8' }}>?</div>
              <div style={{ font: "400 7.5px 'IBM Plex Mono', monospace", color: '#c8c8c8', marginTop: '8px' }}>잠김</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // UV-RANK-01: Ranking Board
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50px', left: '18px', right: '18px' }}>
        <div style={{ font: "600 19px 'Pretendard'", color: '#111', letterSpacing: '-.02em' }}>랭킹</div>
        <div style={{ display: 'flex', marginTop: '11px', borderBottom: '1px solid #e0e0e0' }}>
          <div onClick={() => setRankTab('personal')} className="tapzone" style={{ flex: 1, textAlign: 'center', padding: '8px 0', borderBottom: rankTab === 'personal' ? '2px solid #111' : 'none', font: rankTab === 'personal' ? "600 11.5px 'Pretendard'" : "400 11.5px 'Pretendard'", color: rankTab === 'personal' ? '#111' : '#999' }}>누적 개인</div>
          <div onClick={() => setRankTab('fandom')} className="tapzone" style={{ flex: 1, textAlign: 'center', padding: '8px 0', borderBottom: rankTab === 'fandom' ? '2px solid #111' : 'none', font: rankTab === 'fandom' ? "600 11.5px 'Pretendard'" : "400 11.5px 'Pretendard'", color: rankTab === 'fandom' ? '#111' : '#999' }}>팬덤 영토</div>
        </div>
      </div>

      {/* Podium */}
      <div style={{ position: 'absolute', top: '130px', left: '18px', right: '18px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '12px' }}>
        {/* 2nd */}
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ width: '44px', height: '44px', border: '1px solid #111', borderRadius: '50%', margin: '0 auto 5px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "500 14px 'Pretendard'", color: '#111' }}>럭<span style={{ position: 'absolute', top: 0, right: '2px', width: '7px', height: '7px', background: '#e63b83' }}></span></div>
          <div style={{ font: "500 10.5px 'Pretendard'", color: '#111' }}>럭키팬</div>
          <div style={{ font: "400 8.5px 'IBM Plex Mono', monospace", color: '#999' }}>38</div>
          <div style={{ height: '48px', border: '1px solid #111', borderBottom: 0, background: '#e63b83', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "500 15px 'Pretendard'", color: '#fff' }}>2</div>
        </div>
        {/* 1st */}
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ width: '52px', height: '52px', border: '1.5px solid #111', borderRadius: '50%', margin: '0 auto 5px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 16px 'Pretendard'", color: '#111' }}>덕<span style={{ position: 'absolute', top: '1px', right: '3px', width: '8px', height: '8px', background: '#2f6bff' }}></span></div>
          <div style={{ font: "600 11px 'Pretendard'", color: '#111' }}>덕질마스터</div>
          <div style={{ font: "400 8.5px 'IBM Plex Mono', monospace", color: '#999' }}>43</div>
          <div style={{ height: '66px', border: '1.5px solid #111', borderBottom: 0, background: '#2f6bff', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 18px 'Pretendard'", color: '#fff' }}>1</div>
        </div>
        {/* 3rd */}
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ width: '44px', height: '44px', border: '1px solid #111', borderRadius: '50%', margin: '0 auto 5px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "500 14px 'Pretendard'", color: '#111' }}>핀<span style={{ position: 'absolute', top: 0, right: '2px', width: '7px', height: '7px', background: '#f59f00' }}></span></div>
          <div style={{ font: "500 10.5px 'Pretendard'", color: '#111' }}>핀아</div>
          <div style={{ font: "400 8.5px 'IBM Plex Mono', monospace", color: '#999' }}>31</div>
          <div style={{ height: '36px', border: '1px solid #111', borderBottom: 0, background: '#f59f00', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "500 15px 'Pretendard'", color: '#4a3708' }}>3</div>
        </div>
      </div>

      {/* Ranking List */}
      <div style={{ position: 'absolute', top: '378px', left: '18px', right: '18px', bottom: '10px', borderTop: '1px solid #111', paddingTop: '10px', overflow: 'hidden' }}>
        {[
          { rank: '04', name: '모찌언니', score: '29' },
          { rank: '05', name: '토끼굴지기', score: '27' },
        ].map((u, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ font: "400 11px 'IBM Plex Mono', monospace", color: '#111', width: '22px' }}>{u.rank}</span>
            <span style={{ width: '28px', height: '28px', border: '1px solid #111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "500 10px 'Pretendard'", color: '#111' }}>{u.name.charAt(0)}</span>
            <div style={{ flex: 1 }}><div style={{ font: "500 12px 'Pretendard'", color: '#111' }}>{u.name}</div></div>
            <span style={{ font: "400 11px 'IBM Plex Mono', monospace", color: '#111' }}>{u.score}</span>
          </div>
        ))}
        {/* My Rank */}
        <div onClick={() => setShowDetail(true)} className="tapzone" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 11px', marginTop: '6px', border: '1.5px solid #111' }}>
          <span style={{ font: "400 11px 'IBM Plex Mono', monospace", color: '#111', width: '26px' }}>#12</span>
          <span style={{ width: '28px', height: '28px', border: '1px solid #111', borderRadius: '50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "500 10px 'Pretendard'", color: '#111' }}>나<span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '6px', height: '6px', background: '#2f6bff' }}></span></span>
          <div style={{ flex: 1 }}>
            <div style={{ font: "600 12px 'Pretendard'", color: '#111' }}>나 · 버니즈덕후</div>
            <div style={{ font: "400 8.5px 'IBM Plex Mono', monospace", color: '#999' }}>TOP 4% · ▲3</div>
          </div>
          <span style={{ font: "600 12px 'Pretendard'", color: '#111' }}>24</span>
        </div>
      </div>
    </div>
  );
}

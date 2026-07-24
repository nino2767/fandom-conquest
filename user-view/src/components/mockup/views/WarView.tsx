'use client';

import React from 'react';

export default function WarView() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50px', left: '18px', right: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ font: "600 19px 'Pretendard'", color: '#111', letterSpacing: '-.02em' }}>전황 보드</div>
        <span style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#111' }}>● LIVE</span>
      </div>

      {/* Cartogram Grid */}
      <div style={{ position: 'absolute', top: '90px', left: '18px', right: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
          <div style={{ width: '50px', height: '48px', background: '#a9c4ff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "600 13px 'Pretendard'", color: '#1b2a4a' }}>52</span><span style={{ font: "400 7px 'IBM Plex Mono', monospace", color: '#33436a' }}>은평</span></div>
          <div style={{ width: '50px', height: '48px', background: '#2f6bff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "600 13px 'Pretendard'", color: '#fff' }}>58</span><span style={{ font: "400 7px 'IBM Plex Mono', monospace", color: '#d7e2ff' }}>강북</span></div>
          <div style={{ width: '50px', height: '48px', border: '1px solid #111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "600 13px 'Pretendard'", color: '#111' }}>49</span><span style={{ font: "400 7px 'IBM Plex Mono', monospace", color: '#999' }}>노원</span></div>
          <div style={{ width: '50px', height: '48px', background: '#f7b733', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "600 13px 'Pretendard'", color: '#4a3708' }}>53</span><span style={{ font: "400 7px 'IBM Plex Mono', monospace", color: '#6b4e00' }}>중랑</span></div>
          <div style={{ width: '50px', height: '48px', background: '#f4f4f4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "600 13px 'Pretendard'", color: '#c5c5c5' }}>–</span><span style={{ font: "400 7px 'IBM Plex Mono', monospace", color: '#c5c5c5' }}>중립</span></div>
        </div>
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
          <div style={{ width: '50px', height: '48px', background: '#2f6bff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "600 13px 'Pretendard'", color: '#fff' }}>63</span><span style={{ font: "400 7px 'IBM Plex Mono', monospace", color: '#d7e2ff' }}>마포</span></div>
          <div style={{ width: '50px', height: '48px', background: '#ff9dc0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "600 13px 'Pretendard'", color: '#5c1636' }}>55</span><span style={{ font: "400 7px 'IBM Plex Mono', monospace", color: '#8a2b57' }}>성북</span></div>
          <div style={{ width: '50px', height: '48px', background: '#2f6bff', outline: '2px solid #111', outlineOffset: '-2px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "600 14px 'Pretendard'", color: '#fff' }}>67</span><span style={{ font: "400 7px 'IBM Plex Mono', monospace", color: '#d7e2ff' }}>성동</span></div>
          <div style={{ width: '50px', height: '48px', background: '#ffd6e6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "600 13px 'Pretendard'", color: '#8a2b57' }}>51</span><span style={{ font: "400 7px 'IBM Plex Mono', monospace", color: '#8a2b57' }}>광진</span></div>
          <div style={{ width: '50px', height: '48px', background: '#f59f00', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "600 13px 'Pretendard'", color: '#fff' }}>51</span><span style={{ font: "400 7px 'IBM Plex Mono', monospace", color: '#fff3da' }}>강서</span></div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: '206px', left: '18px', right: '18px', font: "400 8.5px 'IBM Plex Mono', monospace", color: '#999' }}>채도 = 점유율 · 검정 테두리 = 금일 뒤집힘 · 테두리만 = 경합</div>

      {/* Contest Areas & Timeline */}
      <div style={{ position: 'absolute', top: '232px', left: '18px', right: '18px', bottom: '10px', overflowY: 'auto' }} className="scroll-none">
        <div style={{ font: "600 12px 'Pretendard'", color: '#111', marginBottom: '8px' }}>경합구 Top 3</div>
        <div style={{ display: 'flex', gap: '7px', marginBottom: '14px' }}>
          <div style={{ flex: 1, border: '1px solid #e0e0e0', padding: '8px 9px' }}><div style={{ font: "500 11px 'Pretendard'", color: '#111' }}>노원구</div><div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginTop: '2px' }}>Δ0.8%p</div></div>
          <div style={{ flex: 1, border: '1px solid #e0e0e0', padding: '8px 9px' }}><div style={{ font: "500 11px 'Pretendard'", color: '#111' }}>관악구</div><div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginTop: '2px' }}>Δ1.2%p</div></div>
          <div style={{ flex: 1, border: '1px solid #e0e0e0', padding: '8px 9px' }}><div style={{ font: "500 11px 'Pretendard'", color: '#111' }}>광진구</div><div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginTop: '2px' }}>Δ2.1%p</div></div>
        </div>

        <div style={{ font: "600 12px 'Pretendard'", color: '#111', marginBottom: '8px' }}>뒤집힘 타임라인</div>
        <div style={{ borderLeft: '1px solid #111', marginLeft: '4px', paddingLeft: '13px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div><div style={{ font: "500 11.5px 'Pretendard'", color: '#111' }}>성동구 → 뉴진스 탈환</div><div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginTop: '2px' }}>2MIN AGO</div></div>
          <div><div style={{ font: "500 11.5px 'Pretendard'", color: '#111' }}>노원구 → 아이브 우세 전환</div><div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginTop: '2px' }}>14MIN AGO</div></div>
        </div>
      </div>
    </div>
  );
}

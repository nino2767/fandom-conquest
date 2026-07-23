'use client';

import React from 'react';

export default function WarView() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ font: "900 20px 'Pretendard'", color: '#22201c', letterSpacing: '-.02em' }}>전황 보드</div>
        <div style={{ font: "700 10px 'Pretendard'", color: '#c0492f' }}>● LIVE 잠정</div>
      </div>

      {/* Cartogram Grid */}
      <div style={{ position: 'absolute', top: '92px', left: '16px', right: '16px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
          <div style={{ width: '52px', height: '52px', border: '2px solid #22201c', background: '#a9c4ff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "900 13px 'Pretendard'", color: '#22201c' }}>52</span><span style={{ font: "700 7.5px 'Pretendard'", color: '#33436a' }}>은평</span></div>
          <div style={{ width: '52px', height: '52px', border: '2px solid #22201c', background: '#2f6bff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "900 13px 'Pretendard'", color: '#fff' }}>58</span><span style={{ font: "700 7.5px 'Pretendard'", color: '#dbe6ff' }}>강북</span></div>
          <div style={{ width: '52px', height: '52px', border: '2px solid #22201c', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "900 13px 'Pretendard'", color: '#c98a00' }}>49</span><span style={{ font: "700 7.5px 'Pretendard'", color: '#8a8272' }}>노원⚔️</span></div>
          <div style={{ width: '52px', height: '52px', border: '2px solid #22201c', background: '#f59f00', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "900 13px 'Pretendard'", color: '#fff' }}>53</span><span style={{ font: "700 7.5px 'Pretendard'", color: '#fff3da' }}>중랑</span></div>
        </div>
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
          <div style={{ width: '52px', height: '52px', border: '2px solid #22201c', background: '#2f6bff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "900 13px 'Pretendard'", color: '#fff' }}>63</span><span style={{ font: "700 7.5px 'Pretendard'", color: '#dbe6ff' }}>마포</span></div>
          <div style={{ width: '52px', height: '52px', border: '2px solid #22201c', background: '#e64980', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "900 13px 'Pretendard'", color: '#fff' }}>55</span><span style={{ font: "700 7.5px 'Pretendard'", color: '#fbdce8' }}>성북</span></div>
          <div style={{ width: '52px', height: '52px', border: '3px solid #c0492f', background: '#2f6bff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '3px 3px 0 rgba(192,73,47,.3)' }}><span style={{ font: "900 14px 'Pretendard'", color: '#fff' }}>67</span><span style={{ font: "700 7.5px 'Pretendard'", color: '#dbe6ff' }}>성동🔥</span></div>
          <div style={{ width: '52px', height: '52px', border: '2px solid #22201c', background: '#ffd6e6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "900 13px 'Pretendard'", color: '#8a2b57' }}>51</span><span style={{ font: "700 7.5px 'Pretendard'", color: '#8a2b57' }}>광진</span></div>
        </div>
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
          <div style={{ width: '52px', height: '52px', border: '2px solid #22201c', background: '#f59f00', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "900 13px 'Pretendard'", color: '#fff' }}>51</span><span style={{ font: "700 7.5px 'Pretendard'", color: '#fff3da' }}>강서</span></div>
          <div style={{ width: '52px', height: '52px', border: '2px solid #22201c', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "900 13px 'Pretendard'", color: '#2456c8' }}>50</span><span style={{ font: "700 7.5px 'Pretendard'", color: '#8a8272' }}>관악⚔️</span></div>
          <div style={{ width: '52px', height: '52px', border: '2px solid #22201c', background: '#e64980', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "900 13px 'Pretendard'", color: '#fff' }}>61</span><span style={{ font: "700 7.5px 'Pretendard'", color: '#fbdce8' }}>강남</span></div>
          <div style={{ width: '52px', height: '52px', border: '2px solid #22201c', background: '#eceadf', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ font: "900 13px 'Pretendard'", color: '#8a8272' }}>–</span><span style={{ font: "700 7.5px 'Pretendard'", color: '#8a8272' }}>중립</span></div>
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '6px', font: "700 9.5px 'Pretendard'", color: '#4a4438' }}>
          <span><span style={{ display: 'inline-block', width: '9px', height: '9px', background: '#2f6bff', border: '1.5px solid #22201c', verticalAlign: '-1px' }}></span> 뉴진스 8구</span>
          <span><span style={{ display: 'inline-block', width: '9px', height: '9px', background: '#e64980', border: '1.5px solid #22201c', verticalAlign: '-1px' }}></span> 에스파 7구</span>
          <span><span style={{ display: 'inline-block', width: '9px', height: '9px', background: '#f59f00', border: '1.5px solid #22201c', verticalAlign: '-1px' }}></span> 아이브 5구</span>
        </div>
      </div>

      {/* Top 3 Contest Areas & Timeline */}
      <div style={{ position: 'absolute', top: '330px', left: '16px', right: '16px', bottom: '58px', overflowY: 'auto' }} className="scroll-none">
        <div style={{ font: "800 12px 'Pretendard'", color: '#22201c', marginBottom: '7px' }}>⚔️ 치열한 경합구 Top 3</div>
        <div style={{ display: 'flex', gap: '7px', marginBottom: '12px' }}>
          <div style={{ flex: 1, border: '2px solid #22201c', borderRadius: '10px', padding: '8px 9px' }}><div style={{ font: "800 11px 'Pretendard'", color: '#22201c' }}>노원구</div><div style={{ font: "700 9px 'Pretendard'", color: '#c0492f', marginTop: '2px' }}>격차 0.8%p</div></div>
          <div style={{ flex: 1, border: '2px solid #22201c', borderRadius: '10px', padding: '8px 9px' }}><div style={{ font: "800 11px 'Pretendard'", color: '#22201c' }}>관악구</div><div style={{ font: "700 9px 'Pretendard'", color: '#c0492f', marginTop: '2px' }}>격차 1.2%p</div></div>
          <div style={{ flex: 1, border: '2px solid #22201c', borderRadius: '10px', padding: '8px 9px' }}><div style={{ font: "800 11px 'Pretendard'", color: '#22201c' }}>광진구</div><div style={{ font: "700 9px 'Pretendard'", color: '#c0492f', marginTop: '2px' }}>격차 2.1%p</div></div>
        </div>
        <div style={{ font: "800 12px 'Pretendard'", color: '#22201c', marginBottom: '7px' }}>실시간 뒤집힘 타임라인</div>
        <div style={{ borderLeft: '2px solid #22201c', marginLeft: '5px', paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
          <div><div style={{ font: "700 11.5px 'Pretendard'", color: '#22201c' }}>성동구 → <b style={{ color: '#2f6bff' }}>뉴진스</b> 탈환</div><div style={{ font: "600 9.5px 'Pretendard'", color: '#8a8272' }}>덕질마스터 인증 1건으로 역전 · 2분 전</div></div>
          <div><div style={{ font: "700 11.5px 'Pretendard'", color: '#22201c' }}>노원구 → <b style={{ color: '#c98a00' }}>아이브</b> 우세 전환</div><div style={{ font: "600 9.5px 'Pretendard'", color: '#8a8272' }}>경합 진입 · 14분 전</div></div>
          <div><div style={{ font: "700 11.5px 'Pretendard'", color: '#22201c' }}>마포구 → <b style={{ color: '#2f6bff' }}>뉴진스</b> 수성</div><div style={{ font: "600 9.5px 'Pretendard'", color: '#8a8272' }}>격차 13.4%p로 확대 · 1시간 전</div></div>
        </div>
      </div>
    </div>
  );
}

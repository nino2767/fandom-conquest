'use client';

import React, { useState } from 'react';

interface MapViewProps {
  onNavigateToVerif?: () => void;
}

export default function MapView({ onNavigateToVerif }: MapViewProps) {
  const [activeModal, setActiveModal] = useState<'none' | 'spotDetail' | 'nearby' | 'filter' | 'report'>('none');
  const [zoom, setZoom] = useState<number>(1.0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [selectedFilter, setSelectedFilter] = useState<string>('전체');
  const [touchDistance, setTouchDistance] = useState<number | null>(null);

  const filters = [
    { label: '전체', color: '' },
    { label: '뉴진스', color: '#2f6bff' },
    { label: '에스파', color: '#e63b83' },
  ];

  React.useEffect(() => {
    const preventGesture = (e: Event) => { e.preventDefault(); };
    document.addEventListener('gesturestart', preventGesture, { passive: false });
    document.addEventListener('gesturechange', preventGesture, { passive: false });
    document.addEventListener('gestureend', preventGesture, { passive: false });
    return () => {
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
    };
  }, []);

  const getDistance = (t1: React.Touch | Touch, t2: React.Touch | Touch) => Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);

  const handleMouseDown = (e: React.MouseEvent) => { setIsDragging(true); setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y }); };
  const handleMouseMove = (e: React.MouseEvent) => { if (!isDragging) return; setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }); };
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) { setIsDragging(true); setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y }); setTouchDistance(null); }
    else if (e.touches.length === 2) { setIsDragging(false); setTouchDistance(getDistance(e.touches[0], e.touches[1])); }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) { setPan({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y }); }
    else if (e.touches.length === 2 && touchDistance !== null) { const nd = getDistance(e.touches[0], e.touches[1]); setTouchDistance(nd); setZoom(prev => Math.min(Math.max(prev * (nd / touchDistance), 0.6), 2.8)); }
  };
  const handleTouchEnd = () => { setIsDragging(false); setTouchDistance(null); };
  const handleWheel = (e: React.WheelEvent) => { e.preventDefault(); setZoom(prev => Math.min(Math.max(prev + (e.deltaY < 0 ? 0.1 : -0.1), 0.6), 2.5)); };

  return (
    <div
      onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onWheel={handleWheel}
      style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none', touchAction: 'none', overscrollBehavior: 'none' }}
    >
      {/* Map Canvas */}
      <div style={{ position: 'absolute', inset: 0, transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: 'center center', transition: isDragging ? 'none' : 'transform 0.1s ease-out' }}>
        <svg viewBox="0 0 336 712" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <rect width="336" height="712" fill="#fff" />
          <g stroke="#ececec" strokeWidth="1"><path d="M0,220 H336 M0,340 H336 M0,470 H336 M112,80 V712 M224,80 V712" /></g>
          <rect x="112" y="220" width="112" height="120" fill="#f4f4f4" />
          <rect x="112" y="220" width="112" height="120" fill="none" stroke="#111" strokeWidth="1.5" />
          <circle cx="120" cy="230" r="3" fill="#2f6bff" />
          <rect x="224" y="340" width="112" height="130" fill="#fafafa" stroke="#d8d8d8" strokeWidth="1" />
          <circle cx="232" cy="350" r="3" fill="#e63b83" />
        </svg>
        {/* Pin with label */}
        <div onClick={() => setActiveModal('spotDetail')} className="tapzone" style={{ position: 'absolute', left: '50%', top: '37%', transform: 'translate(-50%,-50%)', zIndex: 20 }}>
          <div style={{ width: '10px', height: '10px', background: '#111', outline: '3px solid #fff' }}></div>
        </div>
        <div onClick={() => setActiveModal('spotDetail')} className="tapzone" style={{ position: 'absolute', left: '70%', top: '30%', transform: 'translate(-50%,-100%)', zIndex: 21 }}>
          <div style={{ border: '1px solid #111', background: '#fff', padding: '2px 6px', font: "500 9px 'IBM Plex Mono', monospace", color: '#111' }}>D-2</div>
          <div style={{ width: '1px', height: '9px', background: '#111', margin: '0 auto' }}></div>
        </div>
      </div>

      {/* Top Header */}
      <div style={{ position: 'absolute', top: '52px', left: '18px', right: '18px', zIndex: 30 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', letterSpacing: '.16em' }}>성수 · 실시간</div>
            <div style={{ font: "600 22px 'Pretendard'", color: '#111', letterSpacing: '-.02em', marginTop: '3px' }}>성지 지도</div>
          </div>
          <div style={{ display: 'flex', gap: '16px', paddingTop: '5px' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><path d="M12 3a5 5 0 0 0-5 5v3l-2 3v1h14v-1l-2-3V8a5 5 0 0 0-5-5Z" /><path d="M10 19a2 2 0 0 0 4 0" /></svg>
            <svg onClick={() => setActiveModal('filter')} width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" className="tapzone"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '7px', marginTop: '12px' }}>
          {filters.map((f) => (
            <span key={f.label} onClick={() => setSelectedFilter(f.label)} className="tapzone" style={{
              padding: '5px 11px', border: selectedFilter === f.label ? '1px solid #111' : '1px solid #d8d8d8',
              background: selectedFilter === f.label ? '#111' : '#fff', color: selectedFilter === f.label ? '#fff' : '#555',
              font: selectedFilter === f.label ? "500 11px 'Pretendard'" : "400 11px 'Pretendard'",
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              {f.color && <span style={{ width: '6px', height: '6px', background: f.color }}></span>}
              {f.label}
            </span>
          ))}
        </div>
      </div>

      {/* Floating Map Zoom Control Bar (Right Side) */}
      <div style={{ position: 'absolute', right: '14px', top: '120px', zIndex: 35, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <button
          type="button"
          onClick={() => setZoom((prev) => Math.min(prev + 0.25, 2.5))}
          style={{ width: '34px', height: '34px', background: '#fff', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 16px 'Pretendard'", color: '#111', cursor: 'pointer' }}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => setZoom((prev) => Math.max(prev - 0.25, 0.6))}
          style={{ width: '34px', height: '34px', background: '#fff', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 16px 'Pretendard'", color: '#111', cursor: 'pointer' }}
        >
          −
        </button>
        <button
          type="button"
          onClick={() => { setZoom(1.0); setPan({ x: 0, y: 0 }); }}
          style={{ width: '34px', height: '34px', background: '#fff', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', cursor: 'pointer' }}
        >
          🎯
        </button>
      </div>

      {/* Bottom CTA + Sheet */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 30 }}>
        <div onClick={onNavigateToVerif} className="tapzone" style={{ display: 'flex', margin: '0 18px 12px', height: '48px', border: '1.5px solid #111', background: '#fff', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6"><rect x="3" y="6" width="18" height="14" /><circle cx="12" cy="13" r="3.5" /><path d="M8 6l1.5-2h5L16 6" /></svg>
          <span style={{ font: "600 14px 'Pretendard'", color: '#111', letterSpacing: '-.01em' }}>땅 뺏어오기</span>
        </div>
        <div onClick={() => setActiveModal('nearby')} className="tapzone" style={{ background: '#fff', borderTop: '1px solid #111', padding: '10px 18px 12px' }}>
          <div style={{ width: '32px', height: '3px', background: '#111', margin: '0 auto 8px' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ font: "600 13px 'Pretendard'", color: '#111' }}>주변 성지 <b style={{ font: "600 13px 'Pretendard'", color: '#111' }}>6</b></span>
            <span style={{ font: "400 10.5px 'Pretendard'", color: '#999' }}>스와이프하여 열기 ↑</span>
          </div>
        </div>
      </div>

      {/* MODAL: Spot Detail */}
      {activeModal === 'spotDetail' && (
        <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
          <div style={{ position: 'absolute', top: '44px', left: '18px', right: '18px', height: '148px', background: '#f4f4f4', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
            <div onClick={() => setActiveModal('none')} className="tapzone" style={{ position: 'absolute', top: '10px', left: '10px', width: '30px', height: '30px', background: '#fff', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" /></svg>
            </div>
            <span style={{ position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)', width: '6px', height: '6px', background: '#f59f00' }}></span>
            <div style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '5px' }}>
              <span style={{ width: '14px', height: '4px', background: '#111' }}></span>
              <span style={{ width: '4px', height: '4px', background: '#c8c8c8' }}></span>
              <span style={{ width: '4px', height: '4px', background: '#c8c8c8' }}></span>
            </div>
          </div>
          <div style={{ position: 'absolute', top: '204px', left: '18px', right: '18px', bottom: '86px', overflow: 'auto' }} className="scroll-none">
            <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', letterSpacing: '.1em' }}>성동구 · 생일카페 · D-2</div>
            <div style={{ font: "600 19px 'Pretendard'", color: '#111', letterSpacing: '-.02em', marginTop: '5px' }}>어반소스 × 안유진 생일카페</div>
            <div style={{ border: '1px solid #e0e0e0', padding: '12px 13px', marginTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '9px' }}>
                <span style={{ font: "600 11.5px 'Pretendard'", color: '#111' }}>실시간 점유율</span>
                <span style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999' }}>방금</span>
              </div>
              <div style={{ display: 'flex', height: '6px', background: '#f0f0f0' }}>
                <div style={{ width: '60%', background: '#2f6bff' }}></div>
                <div style={{ width: '40%', background: '#f59f00' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', font: "400 10px 'IBM Plex Mono', monospace", color: '#555' }}>
                <span><span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#2f6bff', verticalAlign: '0' }}></span> 뉴진스 60</span>
                <span><span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#f59f00', verticalAlign: '0' }}></span> 아이브 40</span>
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: '12px', borderBottom: '1px solid #e0e0e0' }}>
              <div style={{ flex: 1, textAlign: 'center', padding: '8px 0', borderBottom: '2px solid #111', font: "600 11.5px 'Pretendard'", color: '#111' }}>팬덤 기여</div>
              <div style={{ flex: 1, textAlign: 'center', padding: '8px 0', font: "400 11.5px 'Pretendard'", color: '#999' }}>과거 이력</div>
            </div>
            <div style={{ padding: '13px 2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px', paddingBottom: '11px', borderBottom: '1px solid #f0f0f0' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><path d="M3 8l4 3 5-6 5 6 4-3v9H3z" /></svg>
                <div style={{ flex: 1 }}><div style={{ font: "600 11.5px 'Pretendard'", color: '#111' }}>이 성지의 수호신</div><div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999' }}>기여 1위</div></div>
                <span style={{ font: "500 11.5px 'Pretendard'", color: '#111' }}>덕질마스터 · 15</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '10px', marginTop: '12px' }}>
                <div style={{ textAlign: 'center' }}><div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginBottom: '4px' }}>2</div><div style={{ width: '54px', height: '34px', background: '#e63b83' }}></div></div>
                <div style={{ textAlign: 'center' }}><div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#111', marginBottom: '4px' }}>1</div><div style={{ width: '58px', height: '50px', background: '#2f6bff' }}></div></div>
                <div style={{ textAlign: 'center' }}><div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginBottom: '4px' }}>3</div><div style={{ width: '54px', height: '26px', background: '#f59f00' }}></div></div>
              </div>
            </div>
          </div>
          <div onClick={onNavigateToVerif} className="tapzone" style={{ position: 'absolute', left: '18px', right: '18px', bottom: '24px', height: '48px', border: '1.5px solid #111', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6"><rect x="3" y="6" width="18" height="14" /><circle cx="12" cy="13" r="3.5" /><path d="M8 6l1.5-2h5L16 6" /></svg>
            <span style={{ font: "600 13px 'Pretendard'", color: '#fff' }}>이 성지에 내 팬덤 기여하기</span>
          </div>
        </div>
      )}

      {/* MODAL: Nearby Sheet */}
      {activeModal === 'nearby' && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 50 }} className="rise">
          <div onClick={() => setActiveModal('none')} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '32%' }}></div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: '32%', background: '#fff', borderTop: '1px solid #111', padding: '10px 18px 0' }}>
            <div style={{ width: '32px', height: '3px', background: '#111', margin: '0 auto 6px' }}></div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '11px' }}>
              <span style={{ width: '4px', height: '4px', background: '#c8c8c8' }}></span>
              <span style={{ width: '14px', height: '4px', background: '#111' }}></span>
              <span style={{ width: '4px', height: '4px', background: '#c8c8c8' }}></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
              <span style={{ font: "600 15px 'Pretendard'", color: '#111', letterSpacing: '-.02em' }}>반경 200m · 6</span>
              <span style={{ font: "400 10px 'IBM Plex Mono', monospace", color: '#999' }}>거리순</span>
            </div>
            {[
              { name: '어반소스 × 안유진 생일카페', meta: '80m · 생일카페 · D-2', color: '#f59f00', score: '61' },
              { name: '언더스탠드 카페', meta: '140m · 상설', color: '#2f6bff', score: '74' },
              { name: '성수 연방극장 팝업', meta: '190m · 팝업 · D-6', color: '#e63b83', score: '52' },
            ].map((s, i) => (
              <div key={i} onClick={() => setActiveModal('spotDetail')} className="tapzone" style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '11px 0', borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none' }}>
                <div style={{ width: '44px', height: '44px', background: '#f4f4f4', border: '1px solid #e0e0e0', flex: 'none', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '5px', left: '5px', width: '6px', height: '6px', background: s.color }}></span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ font: "500 12.5px 'Pretendard'", color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                  <div style={{ font: "400 9.5px 'IBM Plex Mono', monospace", color: '#999', marginTop: '2px' }}>{s.meta}</div>
                </div>
                <div style={{ font: "600 15px 'Pretendard'", color: '#111' }}>{s.score}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: IP Filter */}
      {activeModal === 'filter' && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 50 }} className="rise">
          <div onClick={() => setActiveModal('none')} style={{ position: 'absolute', inset: 0, background: 'rgba(17,17,17,.22)' }}></div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: '20%', background: '#fff', borderTop: '1px solid #111', padding: '12px 18px 0' }}>
            <div style={{ width: '32px', height: '3px', background: '#111', margin: '0 auto 12px' }}></div>
            <div style={{ font: "600 17px 'Pretendard'", color: '#111', letterSpacing: '-.02em' }}>IP 팬덤 필터</div>
            <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', margin: '13px 0 8px' }}>내 선호 IP</div>
            <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 11px', border: '1px solid #111', background: '#111', color: '#fff', font: "500 11.5px 'Pretendard'" }}><span style={{ width: '7px', height: '7px', background: '#2f6bff' }}></span>뉴진스 ✓</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 11px', border: '1px solid #d8d8d8', color: '#555', font: "400 11.5px 'Pretendard'" }}><span style={{ width: '7px', height: '7px', background: '#e63b83' }}></span>에스파</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 11px', border: '1px solid #d8d8d8', color: '#555', font: "400 11.5px 'Pretendard'" }}><span style={{ width: '7px', height: '7px', background: '#f59f00' }}></span>아이브</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '42px', padding: '0 13px', border: '1px solid #111', marginTop: '13px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="M16 16l5 5" /></svg>
              <span style={{ font: "400 11px 'IBM Plex Mono', monospace", color: '#b5b5b5' }}>SEARCH</span>
            </div>
            <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', margin: '15px 0 6px' }}>인기 팬덤</div>
            {[
              { rank: '01', name: '뉴진스 · 버니즈', meta: '8구 · 42성지', color: '#2f6bff', change: '▲1' },
              { rank: '02', name: '에스파 · 마이', meta: '7구 · 38성지', color: '#e63b83', change: '▼1' },
              { rank: '03', name: '아이브 · 다이브', meta: '5구 · 29성지', color: '#f59f00', change: '–' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '9px 0', borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none' }}>
                <span style={{ font: "400 11px 'IBM Plex Mono', monospace", color: '#999', width: '16px' }}>{f.rank}</span>
                <span style={{ width: '28px', height: '28px', background: '#f4f4f4', border: '1px solid #e0e0e0', position: 'relative' }}><span style={{ position: 'absolute', top: '4px', left: '4px', width: '5px', height: '5px', background: f.color }}></span></span>
                <div style={{ flex: 1 }}>
                  <div style={{ font: "500 12.5px 'Pretendard'", color: '#111' }}>{f.name}</div>
                  <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999' }}>{f.meta}</div>
                </div>
                <span style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#111' }}>{f.change}</span>
              </div>
            ))}
            <div onClick={() => setActiveModal('none')} className="tapzone" style={{ position: 'absolute', left: '18px', right: '18px', bottom: '22px', height: '46px', border: '1.5px solid #111', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 12.5px 'Pretendard'", color: '#fff' }}>이 팬덤만 지도에 표시</div>
          </div>
        </div>
      )}

      {/* MODAL: Report */}
      {activeModal === 'report' && (
        <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
          <div style={{ position: 'absolute', top: '52px', left: '18px', right: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ font: "600 17px 'Pretendard'", color: '#111', letterSpacing: '-.02em' }}>새 성지 제보</div>
            <div onClick={() => setActiveModal('none')} className="tapzone" style={{ width: '32px', height: '32px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6"><path d="M5 5l14 14M19 5L5 19" /></svg>
            </div>
          </div>
          <div style={{ position: 'absolute', top: '102px', left: '18px', right: '18px', bottom: '86px', overflow: 'auto' }} className="scroll-none">
            <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginBottom: '7px' }}>장소 유형</div>
            <div style={{ display: 'flex', border: '1px solid #111' }}>
              {['팝업스토어', '생일카페', '이벤트'].map((t, i) => (
                <span key={t} style={{ flex: 1, textAlign: 'center', padding: '8px 0', background: i === 0 ? '#111' : '#fff', color: i === 0 ? '#fff' : '#555', font: i === 0 ? "500 11.5px 'Pretendard'" : "400 11.5px 'Pretendard'", borderLeft: i > 0 ? '1px solid #d8d8d8' : 'none' }}>{t}</span>
              ))}
            </div>
            <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', margin: '12px 0 7px' }}>귀속 팬덤</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '42px', padding: '0 13px', border: '1px solid #111' }}>
              <span style={{ width: '8px', height: '8px', background: '#2f6bff' }}></span>
              <span style={{ font: "500 12.5px 'Pretendard'", color: '#111' }}>뉴진스 (NewJeans)</span>
              <span style={{ marginLeft: 'auto', font: "400 10px 'IBM Plex Mono', monospace", color: '#999' }}>▾</span>
            </div>
            <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', margin: '12px 0 7px' }}>상호명</div>
            <div style={{ display: 'flex', alignItems: 'center', height: '42px', padding: '0 13px', border: '1px solid #111' }}>
              <span style={{ font: "500 12.5px 'Pretendard'", color: '#111' }}>어반소스 성수점</span>
            </div>
            <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', margin: '12px 0 7px' }}>주소</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', height: '42px', padding: '0 13px', border: '1px solid #111' }}>
                <span style={{ font: "400 11px 'IBM Plex Mono', monospace", color: '#b5b5b5' }}>ADDRESS</span>
              </div>
              <div style={{ height: '42px', padding: '0 15px', border: '1px solid #111', display: 'flex', alignItems: 'center', gap: '6px', font: "500 11.5px 'Pretendard'", color: '#111' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="M16 16l5 5" /></svg>주소 검색
              </div>
            </div>
            <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', margin: '12px 0 7px' }}>운영 기간</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', height: '42px', padding: '0 13px', border: '1px solid #111' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><rect x="3" y="5" width="18" height="16" /><path d="M3 9h18M8 3v4M16 3v4" /></svg>
              <span style={{ font: "500 12.5px 'Pretendard'", color: '#111' }}>07.20 ~ 07.27</span>
            </div>
            <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', margin: '12px 0 7px' }}>증빙 자료</div>
            <div style={{ display: 'flex', gap: '9px' }}>
              <div style={{ flex: 1, height: '58px', border: '1px dashed #111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><path d="M6 2h9l4 4v16H6z" /><path d="M9 12h7M9 16h7" /></svg>
                <span style={{ font: "400 8.5px 'IBM Plex Mono', monospace", color: '#999' }}>RECEIPT</span>
              </div>
              <div style={{ flex: 1, height: '58px', border: '1px dashed #111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><rect x="3" y="6" width="18" height="14" /><circle cx="12" cy="13" r="3.5" /><path d="M8 6l1.5-2h5L16 6" /></svg>
                <span style={{ font: "400 8.5px 'IBM Plex Mono', monospace", color: '#999' }}>PHOTO</span>
              </div>
            </div>
          </div>
          <div className="tapzone" style={{ position: 'absolute', left: '18px', right: '18px', bottom: '24px', height: '48px', border: '1.5px solid #111', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 13px 'Pretendard'", color: '#fff' }}>제보 제출하기</div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';

interface MapViewProps {
  onNavigateToVerif?: () => void;
}

export default function MapView({ onNavigateToVerif }: MapViewProps) {
  const [activeModal, setActiveModal] = useState<'none' | 'spotDetail' | 'nearby' | 'filter' | 'report' | 'notif' | 'pushSetting'>('none');
  const [zoom, setZoom] = useState<number>(1.0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // IP Filter States
  const [selectedIp, setSelectedIp] = useState<{ name: string; fandom: string; color: string }>({
    name: '뉴진스',
    fandom: '버니즈',
    color: '#2f6bff',
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  // IP Application States
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [applyIpName, setApplyIpName] = useState<string>('');
  const [applyFandomName, setApplyFandomName] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const availableIps = [
    { name: '뉴진스', fandom: '버니즈', color: '#2f6bff' },
    { name: '에스파', fandom: '마이', color: '#e64980' },
    { name: '아이브', fandom: '다이브', color: '#f59f00' },
    { name: '르세라핌', fandom: '피어나', color: '#7950f2' },
    { name: '세븐틴', fandom: '캐럿', color: '#20c997' },
    { name: '방탄소년단', fandom: '아미', color: '#845ef7' },
    { name: 'NCT', fandom: '시즈니', color: '#12b886' },
  ];

  const filteredIps = availableIps.filter(
    (ip) =>
      ip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ip.fandom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pinch Zoom States
  const [touchDistance, setTouchDistance] = useState<number | null>(null);

  React.useEffect(() => {
    // Prevent iOS Safari page-level gesture zoom & bounce
    const preventGesture = (e: Event) => {
      e.preventDefault();
    };
    document.addEventListener('gesturestart', preventGesture, { passive: false });
    document.addEventListener('gesturechange', preventGesture, { passive: false });
    document.addEventListener('gestureend', preventGesture, { passive: false });

    return () => {
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
    };
  }, []);

  const getDistance = (touch1: React.Touch | Touch, touch2: React.Touch | Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.hypot(dx, dy);
  };

  // Pan event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
      setTouchDistance(null);
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dist = getDistance(e.touches[0], e.touches[1]);
      setTouchDistance(dist);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    } else if (e.touches.length === 2 && touchDistance !== null) {
      const newDist = getDistance(e.touches[0], e.touches[1]);
      const factor = newDist / touchDistance;
      setTouchDistance(newDist);
      setZoom((prev) => Math.min(Math.max(prev * factor, 0.6), 2.8));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchDistance(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom((prev) => Math.min(Math.max(prev + zoomDelta, 0.6), 2.5));
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.6));
  };

  const handleResetMap = () => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#fbfaf7',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
        overscrollBehavior: 'none',
      }}
    >
      {/* Transform Container for Interactive Map Canvas */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        {/* Background SVG Map (Riso style) */}
        <svg viewBox="0 0 336 712" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <rect width="336" height="712" fill="#fbfaf7"></rect>
          <path d="M-10,80 C40,190 20,300 60,410 C90,500 70,620 40,712 L-20,712 L-20,80 Z" fill="#dcebff"></path>
          <path d="M-10,80 C40,190 20,300 60,410 C90,500 70,620 40,712" fill="none" stroke="#a9cdf5" strokeWidth="1.5"></path>
          <path d="M84,430 Q125,412 165,430 Q178,485 158,555 Q115,575 82,548 Q72,490 84,430 Z" fill="#e4f0d8" stroke="#bcd79a" strokeWidth="1.5"></path>
          
          {/* Fandom territory rects */}
          <rect x="118" y="170" width="100" height="115" rx="3" fill={selectedIp.color} fillOpacity=".16" stroke={selectedIp.color} strokeWidth="1.4"></rect>
          <rect x="228" y="180" width="88" height="118" rx="3" fill="#f59f00" fillOpacity=".2" stroke="#f59f00" strokeWidth="1.4"></rect>
          <rect x="230" y="316" width="84" height="112" rx="3" fill="#e64980" fillOpacity=".12" stroke="#e6a0bd" strokeWidth="1.2"></rect>
          <rect x="196" y="450" width="102" height="110" rx="3" fill="#e64980" fillOpacity=".18" stroke="#e64980" strokeWidth="1.2"></rect>
          
          {/* Road networks */}
          <g stroke="#efe9dc" strokeWidth="12" strokeLinecap="round" fill="none">
            <path d="M96,110 L110,712"></path>
            <path d="M40,300 L336,282"></path>
            <path d="M40,440 L336,432"></path>
            <path d="M218,110 L234,712"></path>
          </g>
          <g stroke="#e5ddca" strokeWidth="1" fill="none">
            <path d="M96,110 L110,712"></path>
            <path d="M40,300 L336,282"></path>
            <path d="M40,440 L336,432"></path>
            <path d="M218,110 L234,712"></path>
          </g>
          <path d="M20,226 L332,204" stroke="#22201c" strokeWidth="2.4" strokeDasharray="9 5"></path>
          <circle cx="152" cy="215" r="4.5" fill="#fff" stroke="#22201c" strokeWidth="2.2"></circle>
          
          {/* Labels */}
          <text x="150" y="150" fontFamily="Pretendard" fontSize="10" fontWeight="700" fill="#5a6b8a">중랑천</text>
          <text x="112" y="500" fontFamily="Pretendard" fontSize="10.5" fontWeight="700" fill="#7c9a52">서울숲</text>
          <text x="162" y="203" fontFamily="Pretendard" fontSize="9.5" fontWeight="700" fill="#22201c">뚝섬역</text>
        </svg>

        {/* Map Pins */}
        <div
          onClick={() => setActiveModal('spotDetail')}
          className="tapzone"
          style={{ position: 'absolute', left: '80%', top: '34%', transform: 'translate(-50%,-100%)', zIndex: 20, textAlign: 'center' }}
        >
          <div style={{ padding: '4px 8px', background: '#f59f00', border: '2px solid #22201c', font: "800 10.5px 'Pretendard'", color: '#fff' }}>D-2</div>
          <div style={{ width: '2px', height: '11px', background: '#22201c', margin: '0 auto' }}></div>
        </div>
        <div
          onClick={() => setActiveModal('spotDetail')}
          className="tapzone"
          style={{ position: 'absolute', left: '50%', top: '33%', transform: 'translate(-50%,-100%)', zIndex: 20 }}
        >
          <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: selectedIp.color, border: '2px solid #22201c' }}></div>
          <div style={{ width: '2px', height: '10px', background: '#22201c', margin: '0 auto' }}></div>
        </div>
        <div
          onClick={() => setActiveModal('report')}
          className="tapzone"
          style={{ position: 'absolute', left: '72%', top: '70%', transform: 'translate(-50%,-100%)', zIndex: 20 }}
        >
          <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#e64980', border: '2px solid #22201c' }}></div>
          <div style={{ width: '2px', height: '10px', background: '#22201c', margin: '0 auto' }}></div>
        </div>
      </div>

      {/* Top Header Filter & Notification */}
      <div style={{ position: 'absolute', top: '52px', left: '14px', right: '14px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 30 }}>
        <div
          onClick={() => setActiveModal('filter')}
          className="tapzone"
          style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '7px', height: '42px', padding: '0 13px', borderRadius: '11px', background: '#fff', border: '2px solid #22201c' }}
        >
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: selectedIp.color }}></span>
          <span style={{ font: "800 12.5px 'Pretendard'", color: '#22201c' }}>{selectedIp.name} · {selectedIp.fandom}</span>
          <span style={{ font: "700 10.5px 'Pretendard'", color: '#8a8272', marginLeft: 'auto' }}>IP 필터 ▾</span>
        </div>
        <div
          onClick={() => setActiveModal('notif')}
          className="tapzone"
          style={{ width: '42px', height: '42px', borderRadius: '11px', background: '#fff', border: '2px solid #22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', position: 'relative' }}
        >
          🔔
          <span style={{ position: 'absolute', top: '8px', right: '8px', width: '7px', height: '7px', borderRadius: '50%', background: '#c0492f' }}></span>
        </div>
      </div>

      {/* Floating Map Zoom Control Bar (Right Side) */}
      <div style={{ position: 'absolute', right: '14px', top: '108px', zIndex: 35, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div
          onClick={handleZoomIn}
          className="tapzone"
          style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff', border: '2px solid #22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 16px 'Pretendard'", color: '#22201c', boxShadow: '2px 2px 0 rgba(34,32,28,.15)' }}
        >
          +
        </div>
        <div
          onClick={handleZoomOut}
          className="tapzone"
          style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff', border: '2px solid #22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 16px 'Pretendard'", color: '#22201c', boxShadow: '2px 2px 0 rgba(34,32,28,.15)' }}
        >
          −
        </div>
        <div
          onClick={handleResetMap}
          className="tapzone"
          style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff', border: '2px solid #22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', boxShadow: '2px 2px 0 rgba(34,32,28,.15)' }}
        >
          🎯
        </div>
      </div>

      {/* Bottom Floating CTA & Sheet Bar */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 30 }}>
        <div
          onClick={onNavigateToVerif}
          className="tapzone"
          style={{
            margin: '0 42px 12px',
            height: '52px',
            borderRadius: '13px',
            background: '#22201c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '7px',
            font: "800 14.5px 'Pretendard'",
            color: '#fff',
            boxShadow: '4px 4px 0 rgba(34,32,28,.18)',
          }}
        >
          📸 땅 뺏어오기
        </div>
        <div
          onClick={() => setActiveModal('nearby')}
          className="tapzone"
          style={{ background: '#fff', borderTop: '2px solid #22201c', padding: '10px 18px 14px' }}
        >
          <div style={{ width: '38px', height: '4px', borderRadius: '3px', background: '#22201c', opacity: 0.25, margin: '0 auto 9px' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ font: "800 13px 'Pretendard'", color: '#22201c' }}>주변 성지 <b style={{ color: '#c0492f' }}>6</b></span>
            <span style={{ font: "700 11px 'Pretendard'", color: '#8a8272' }}>스와이프하여 열기 ↑</span>
          </div>
        </div>
      </div>

      {/* MODAL 1: Spot Detail Modal (c2) */}
      {activeModal === 'spotDetail' && (
        <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
          <div style={{ position: 'absolute', top: '44px', left: '14px', right: '14px', height: '160px', border: '2px solid #22201c', borderRadius: '12px', background: 'repeating-linear-gradient(135deg,#fff4dd,#fff4dd 6px,#fde8c2 6px,#fde8c2 12px)', overflow: 'hidden' }}>
            <div onClick={() => setActiveModal('none')} className="tapzone" style={{ position: 'absolute', top: '9px', left: '9px', width: '32px', height: '32px', borderRadius: '9px', background: '#fff', border: '2px solid #22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>✕</div>
            <div style={{ position: 'absolute', top: '9px', right: '9px', width: '32px', height: '32px', borderRadius: '9px', background: '#fff', border: '2px solid #22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>🔍</div>
          </div>
          <div style={{ position: 'absolute', top: '218px', left: '14px', right: '14px', bottom: '88px', overflowY: 'auto' }} className="scroll-none">
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ padding: '3px 8px', background: '#f59f00', border: '2px solid #22201c', font: "800 10px 'Pretendard'", color: '#fff' }}>D-2</span>
              <span style={{ font: "600 10.5px 'Pretendard'", color: '#8a8272' }}>생일카페 · 성수동1가</span>
            </div>
            <div style={{ font: "900 19px 'Pretendard'", color: '#22201c', letterSpacing: '-.02em', marginTop: '7px' }}>어반소스 × 안유진 생일카페</div>
            <div style={{ border: '2px solid #22201c', borderRadius: '12px', padding: '11px 13px', marginTop: '11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ font: "800 12px 'Pretendard'", color: '#22201c' }}>실시간 점유율</span>
                <span style={{ font: "700 10px 'Pretendard'", color: '#c0492f' }}>경합</span>
              </div>
              <div style={{ display: 'flex', height: '18px', border: '1.5px solid #22201c', borderRadius: '5px', overflow: 'hidden', font: "800 9.5px 'Pretendard'" }}>
                <div style={{ width: '60%', background: '#2f6bff', color: '#fff', display: 'flex', alignItems: 'center', paddingLeft: '7px' }}>뉴진스 60%</div>
                <div style={{ width: '40%', background: '#f59f00', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '7px' }}>40% 아이브</div>
              </div>
            </div>
            <div style={{ border: '2px solid #22201c', borderRadius: '12px', padding: '11px 13px', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '9px', borderBottom: '1.5px solid #ececec' }}>
                <span style={{ fontSize: '15px' }}>👑</span>
                <div style={{ flex: 1 }}><div style={{ font: "800 12px 'Pretendard'", color: '#22201c' }}>이 성지의 수호신</div><div style={{ font: "600 10px 'Pretendard'", color: '#8a8272' }}>기여 1위</div></div>
                <span style={{ font: "800 12px 'Pretendard'", color: '#c98a00' }}>덕질마스터 · 15점</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '10px', marginTop: '11px' }}>
                <div style={{ textAlign: 'center' }}><div style={{ font: "700 10px 'Pretendard'", color: '#8a8272', marginBottom: '4px' }}>🥈 럭키팬</div><div style={{ width: '58px', height: '38px', border: '2px solid #22201c', borderBottom: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 11px 'Pretendard'", color: '#22201c', background: '#f3f0e8' }}>10점</div></div>
                <div style={{ textAlign: 'center' }}><div style={{ font: "700 10px 'Pretendard'", color: '#c98a00', marginBottom: '4px' }}>🥇 덕질마스터</div><div style={{ width: '62px', height: '54px', border: '2px solid #22201c', borderBottom: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 12px 'Pretendard'", color: '#22201c', background: '#ffe14d' }}>15점</div></div>
                <div style={{ textAlign: 'center' }}><div style={{ font: "700 10px 'Pretendard'", color: '#a5714f', marginBottom: '4px' }}>🥉 핀아</div><div style={{ width: '58px', height: '28px', border: '2px solid #22201c', borderBottom: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 11px 'Pretendard'", color: '#22201c', background: '#f0dcc8' }}>8점</div></div>
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '14px', right: '14px', bottom: '24px' }}>
            <div onClick={onNavigateToVerif} className="tapzone" style={{ height: '50px', borderRadius: '13px', background: '#22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 13.5px 'Pretendard'", color: '#fff', boxShadow: '4px 4px 0 rgba(34,32,28,.18)' }}>
              📸 이 성지에 내 팬덤 기여하기
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Nearby Bottom Sheet (c3) */}
      {activeModal === 'nearby' && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 50 }} className="rise">
          <div onClick={() => setActiveModal('none')} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '34%', background: 'rgba(34,32,28,.3)' }}></div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: '34%', background: '#fff', borderTop: '2px solid #22201c', padding: '10px 16px 0' }}>
            <div onClick={() => setActiveModal('none')} className="tapzone" style={{ width: '38px', height: '4px', background: '#22201c', opacity: 0.25, borderRadius: '3px', margin: '0 auto 6px' }}></div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '11px' }}>
              <div style={{ font: "800 15px 'Pretendard'", color: '#22201c' }}>반경 200m 성지 <span style={{ color: '#c0492f' }}>6</span></div>
              <div style={{ font: "700 11px 'Pretendard'", color: '#8a8272' }}>거리순 ▾</div>
            </div>
            <div onClick={() => setActiveModal('spotDetail')} className="tapzone" style={{ border: '2px solid #22201c', borderRadius: '12px', padding: '10px 12px', marginBottom: '9px', display: 'flex', gap: '11px', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', border: '2px solid #22201c', background: '#f59f00', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 9px 'Pretendard'", color: '#fff' }}>IVE</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: "800 12.5px 'Pretendard'", color: '#22201c', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>어반소스 × 안유진 생일카페</div>
                <div style={{ font: "600 10.5px 'Pretendard'", color: '#8a8272', marginTop: '2px' }}>80m · 생일카페 · <span style={{ color: '#c0492f' }}>D-2</span></div>
              </div>
              <span style={{ padding: '3px 8px', border: '1.5px solid #22201c', font: "800 10px 'Pretendard'", color: '#22201c', background: '#fff4dd' }}>60%</span>
            </div>
            <div onClick={() => setActiveModal('spotDetail')} className="tapzone" style={{ border: '2px solid #22201c', borderRadius: '12px', padding: '10px 12px', marginBottom: '9px', display: 'flex', gap: '11px', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', border: '2px solid #22201c', background: '#2f6bff', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 12px 'Pretendard'", color: '#fff' }}>N</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: "800 12.5px 'Pretendard'", color: '#22201c', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>언더스탠드 카페</div>
                <div style={{ font: "600 10.5px 'Pretendard'", color: '#8a8272', marginTop: '2px' }}>140m · 상설 성지</div>
              </div>
              <span style={{ padding: '3px 8px', border: '1.5px solid #22201c', font: "800 10px 'Pretendard'", color: '#22201c', background: '#e8effc' }}>74%</span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: IP Fandom Filter Sheet (c4) */}
      {activeModal === 'filter' && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 50 }} className="rise">
          <div onClick={() => setActiveModal('none')} style={{ position: 'absolute', inset: 0, background: 'rgba(34,32,28,.25)' }}></div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: '22%', background: '#fff', borderTop: '2px solid #22201c', padding: '12px 16px 0', display: 'flex', flexDirection: 'column' }}>
            <div onClick={() => setActiveModal('none')} className="tapzone" style={{ width: '38px', height: '4px', background: '#22201c', opacity: 0.25, borderRadius: '3px', margin: '0 auto 12px' }}></div>
            <div style={{ font: "900 16px 'Pretendard'", color: '#22201c' }}>IP 팬덤 필터</div>
            
            {/* Realtime Search Input */}
            <div style={{ margin: '10px 0 8px' }}>
              <input
                type="text"
                placeholder="🔍 IP 또는 팬덤명 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  height: '40px',
                  border: '2px solid #22201c',
                  borderRadius: '10px',
                  padding: '0 12px',
                  font: "700 12px 'Pretendard'",
                  color: '#22201c',
                  outline: 'none',
                  background: '#fbfaf7',
                }}
              />
            </div>

            <div style={{ font: "700 10.5px 'Pretendard'", color: '#8a8272', marginBottom: '8px' }}>선택 가능한 IP (클릭하여 선택)</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', overflowY: 'auto', maxHeight: '190px', paddingBottom: '10px' }} className="scroll-none">
              {filteredIps.map((ip) => {
                const isSelected = selectedIp.name === ip.name;
                return (
                  <span
                    key={ip.name}
                    onClick={() => setSelectedIp(ip)}
                    className="tapzone"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 12px',
                      border: '2px solid #22201c',
                      background: isSelected ? '#22201c' : '#fff',
                      color: isSelected ? '#fff' : '#22201c',
                      font: "800 12px 'Pretendard'",
                      borderRadius: '10px',
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: ip.color }}></span>
                    {ip.name} ({ip.fandom}) {isSelected ? '✓' : ''}
                  </span>
                );
              })}
            </div>

            {/* IP Application Link */}
            <div
              onClick={() => setShowApplyModal(true)}
              className="tapzone"
              style={{ textAlign: 'center', font: "700 11.5px 'Pretendard'", color: '#8a8272', margin: '8px 0 12px', textDecoration: 'underline' }}
            >
              ➕ 찾는 IP가 없나요? 직접 신청하기
            </div>

            <div style={{ marginTop: 'auto', paddingBottom: '22px' }}>
              <div
                onClick={() => setActiveModal('none')}
                className="tapzone"
                style={{
                  height: '48px',
                  borderRadius: '12px',
                  background: '#22201c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  font: "800 13px 'Pretendard'",
                  color: '#fff',
                }}
              >
                <b>{selectedIp.name}</b> 팬덤만 지도에 표시
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: IP Application Popup */}
      {showApplyModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(34,32,28,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '360px', background: '#fff', border: '2.5px solid #22201c', borderRadius: '16px', padding: '20px', boxShadow: '6px 6px 0 rgba(34,32,28,.2)' }} className="pop">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ font: "900 16px 'Pretendard'", color: '#22201c' }}>신규 IP / 팬덤 추가 신청</div>
              <div onClick={() => setShowApplyModal(false)} className="tapzone" style={{ font: "800 14px 'Pretendard'", color: '#22201c' }}>✕</div>
            </div>
            
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <div style={{ fontSize: '38px' }}>🎉</div>
                <div style={{ font: "900 15px 'Pretendard'", color: '#22201c', marginTop: '6px' }}>신청이 접수되었습니다!</div>
                <div style={{ font: "600 11px 'Pretendard'", color: '#8a8272', marginTop: '4px', marginBottom: '20px' }}>검토 후 빠르게 추가해 드릴게요.</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div
                    onClick={() => {
                      if (applyIpName.trim()) {
                        setSelectedIp({
                          name: applyIpName.trim(),
                          fandom: applyFandomName.trim() || '팬덤',
                          color: '#2f6bff',
                        });
                      }
                      setIsSubmitted(false);
                      setShowApplyModal(false);
                      setApplyIpName('');
                      setApplyFandomName('');
                      setActiveModal('none');
                    }}
                    className="tapzone"
                    style={{
                      height: '46px',
                      borderRadius: '10px',
                      background: '#22201c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      font: "800 12.5px 'Pretendard'",
                      color: '#fff',
                    }}
                  >
                    🗺️ 신청한 IP로 지도 바로 보기
                  </div>
                  <div
                    onClick={() => {
                      setIsSubmitted(false);
                      setShowApplyModal(false);
                      setApplyIpName('');
                      setApplyFandomName('');
                    }}
                    className="tapzone"
                    style={{
                      height: '42px',
                      borderRadius: '10px',
                      border: '2px solid #22201c',
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      font: "800 11.5px 'Pretendard'",
                      color: '#22201c',
                    }}
                  >
                    ➕ 닫고 다른 IP 추가 신청 / 검색
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div style={{ font: "700 10.5px 'Pretendard'", color: '#8a8272', marginBottom: '4px' }}>아티스트 / IP 이름</div>
                <input
                  type="text"
                  placeholder="예: 라이즈, QWER, 아이유 등"
                  value={applyIpName}
                  onChange={(e) => setApplyIpName(e.target.value)}
                  style={{ width: '100%', height: '38px', border: '2px solid #22201c', borderRadius: '9px', padding: '0 10px', font: "700 12px 'Pretendard'", marginBottom: '10px', outline: 'none' }}
                />
                <div style={{ font: "700 10.5px 'Pretendard'", color: '#8a8272', marginBottom: '4px' }}>팬덤 이름</div>
                <input
                  type="text"
                  placeholder="예: 브리즈, 바위게 등"
                  value={applyFandomName}
                  onChange={(e) => setApplyFandomName(e.target.value)}
                  style={{ width: '100%', height: '38px', border: '2px solid #22201c', borderRadius: '9px', padding: '0 10px', font: "700 12px 'Pretendard'", marginBottom: '14px', outline: 'none' }}
                />
                <div
                  onClick={() => {
                    if (applyIpName.trim()) {
                      setIsSubmitted(true);
                    }
                  }}
                  className="tapzone"
                  style={{ height: '44px', borderRadius: '10px', background: '#22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 12.5px 'Pretendard'", color: '#fff' }}
                >
                  신청서 제출하기
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* MODAL 4: Spot Report Modal (c5) */}
      {activeModal === 'report' && (
        <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
          <div style={{ position: 'absolute', top: '52px', left: '16px', right: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ font: "900 17px 'Pretendard'", color: '#22201c' }}>새 성지 제보</div>
            <div onClick={() => setActiveModal('none')} className="tapzone" style={{ width: '34px', height: '34px', border: '2px solid #22201c', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#22201c' }}>✕</div>
          </div>
          <div style={{ position: 'absolute', top: '102px', left: '16px', right: '16px', bottom: '88px', overflowY: 'auto' }} className="scroll-none">
            <div style={{ font: "700 10.5px 'Pretendard'", color: '#8a8272', marginBottom: '7px' }}>장소 유형</div>
            <div style={{ display: 'flex', border: '2px solid #22201c', borderRadius: '10px', overflow: 'hidden' }}>
              <span style={{ flex: 1, textAlign: 'center', padding: '8px 0', background: '#22201c', color: '#fff', font: "800 11.5px 'Pretendard'" }}>팝업스토어</span>
              <span style={{ flex: 1, textAlign: 'center', padding: '8px 0', font: "700 11.5px 'Pretendard'", color: '#22201c', borderLeft: '2px solid #22201c' }}>생일카페</span>
            </div>
            <div style={{ font: "700 10.5px 'Pretendard'", color: '#8a8272', margin: '12px 0 7px' }}>상호명</div>
            <div style={{ display: 'flex', alignItems: 'center', height: '44px', padding: '0 13px', border: '2px solid #22201c', borderRadius: '11px' }}>
              <span style={{ font: "700 12.5px 'Pretendard'", color: '#22201c' }}>어반소스 성수점</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '16px', right: '16px', bottom: '24px' }}>
            <div onClick={() => setActiveModal('none')} className="tapzone" style={{ height: '50px', borderRadius: '12px', background: '#22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 13.5px 'Pretendard'", color: '#fff', boxShadow: '4px 4px 0 rgba(34,32,28,.18)' }}>제보 제출하기</div>
          </div>
        </div>
      )}

      {/* MODAL 5: Notification Center Modal */}
      {activeModal === 'notif' && (
        <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
          <div style={{ position: 'absolute', top: '50px', left: '16px', right: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div onClick={() => setActiveModal('none')} className="tapzone" style={{ width: '34px', height: '34px', border: '2px solid #22201c', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: '#22201c' }}>✕</div>
            <div style={{ font: "900 18px 'Pretendard'", color: '#22201c' }}>알림 센터</div>
            <div onClick={() => setActiveModal('pushSetting')} className="tapzone" style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '4px 8px', border: '1.5px solid #22201c', borderRadius: '7px', font: "700 10.5px 'Pretendard'", color: '#22201c', background: '#fffbe8' }}>
              ⚙️ 푸시 설정
            </div>
          </div>
          <div style={{ position: 'absolute', top: '100px', left: '16px', right: '16px', bottom: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '9px' }} className="scroll-none">
            <div style={{ border: '2px solid #22201c', borderRadius: '12px', padding: '11px 13px', background: '#fdf6f4' }}>
              <div style={{ display: 'flex', gap: '9px' }}><span style={{ fontSize: '16px' }}>⚡</span><div style={{ flex: 1 }}><div style={{ font: "800 12px 'Pretendard'", color: '#22201c' }}>성동구 점령지가 역전당했어요!</div><div style={{ font: "600 10.5px 'Pretendard'", color: '#8a8272', marginTop: '2px' }}>에스파가 1위를 가져갔어요 · 방금</div></div></div>
            </div>
            <div style={{ border: '2px solid #22201c', borderRadius: '12px', padding: '11px 13px', background: '#fffbe8' }}>
              <div style={{ display: 'flex', gap: '9px' }}><span style={{ fontSize: '16px' }}>🛡️</span><div style={{ flex: 1 }}><div style={{ font: "800 12px 'Pretendard'", color: '#22201c' }}>언더스탠드 카페 거점이 위태로워요!</div><div style={{ font: "600 10.5px 'Pretendard'", color: '#8a8272', marginTop: '2px' }}>2위와 격차 4.2%p · 12분 전</div></div></div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: Push Setting Modal */}
      {activeModal === 'pushSetting' && (
        <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
          <div style={{ position: 'absolute', top: '50px', left: '16px', right: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div onClick={() => setActiveModal('notif')} className="tapzone" style={{ width: '34px', height: '34px', border: '2px solid #22201c', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: '#22201c' }}>‹</div>
            <div style={{ font: "800 14px 'Pretendard'", color: '#22201c' }}>푸시 알림 설정</div>
            <div style={{ width: '34px' }}></div>
          </div>
          <div style={{ position: 'absolute', top: '104px', left: '16px', right: '16px' }}>
            <div style={{ border: '2px solid #22201c', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderBottom: '1.5px solid #ececec' }}>
                <div><div style={{ font: "700 12.5px 'Pretendard'", color: '#22201c' }}>영토 뒤집힘 알림</div><div style={{ font: "600 9.5px 'Pretendard'", color: '#8a8272', marginTop: '2px' }}>내 점령 구 역전 시</div></div>
                <span style={{ width: '42px', height: '24px', border: '2px solid #22201c', borderRadius: '14px', background: '#ffe14d', position: 'relative' }}><span style={{ position: 'absolute', right: '2px', top: '2px', width: '16px', height: '16px', borderRadius: '50%', background: '#22201c' }}></span></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px' }}>
                <div><div style={{ font: "700 12.5px 'Pretendard'", color: '#22201c' }}>성지 경합 위기 알림</div><div style={{ font: "600 9.5px 'Pretendard'", color: '#8a8272', marginTop: '2px' }}>2위와 격차 5%p 이내 시</div></div>
                <span style={{ width: '42px', height: '24px', border: '2px solid #22201c', borderRadius: '14px', background: '#ffe14d', position: 'relative' }}><span style={{ position: 'absolute', right: '2px', top: '2px', width: '16px', height: '16px', borderRadius: '50%', background: '#22201c' }}></span></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

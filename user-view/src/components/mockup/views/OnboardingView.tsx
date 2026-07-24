'use client';

import React, { useState } from 'react';

interface OnboardingViewProps {
  onCompleteOnboarding?: () => void;
}

export default function OnboardingView({ onCompleteOnboarding }: OnboardingViewProps) {
  const [step, setStep] = useState<'splash' | 'social' | 'terms' | 'profile' | 'fandom' | 'welcome'>('splash');

  // Profile & Nickname States (v1 기능 복원)
  const [nickname, setNickname] = useState('버니즈덕후');
  const [nicknameChecked, setNicknameChecked] = useState(true);
  const [nicknameMsg, setNicknameMsg] = useState<{ text: string; isError: boolean }>({
    text: '✓ 사용할 수 있는 닉네임이에요',
    isError: false,
  });
  const [selectedChar, setSelectedChar] = useState(0);

  const handleCheckNickname = () => {
    const trimmed = nickname.trim();
    if (!trimmed) {
      setNicknameMsg({ text: '❌ 닉네임을 입력해 주세요', isError: true });
      setNicknameChecked(false);
      return;
    }
    const unavailableNames = ['버니즈', 'admin', '뉴진스', '관리자'];
    if (unavailableNames.includes(trimmed)) {
      setNicknameMsg({ text: '❌ 이미 사용 중인 닉네임이에요', isError: true });
      setNicknameChecked(false);
    } else {
      setNicknameMsg({ text: '✓ 사용할 수 있는 닉네임이에요', isError: false });
      setNicknameChecked(true);
    }
  };

  // Fandom Selection & IP Request States (v1 기능 복원)
  const [fandomQuery, setFandomQuery] = useState('');
  const [selectedFandoms, setSelectedFandoms] = useState<number[]>([0]);
  const [mainFandom, setMainFandom] = useState(0);

  // IP Request Modal States (2가지 액션 복원)
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyIpName, setApplyIpName] = useState('');
  const [applyFandomName, setApplyFandomName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [customFandom, setCustomFandom] = useState<{ name: string; sub: string; color: string } | null>(null);

  const availableFandoms = [
    { name: '뉴진스', sub: '버니즈', color: '#2f6bff' },
    { name: '에스파', sub: '마이', color: '#e63b83' },
    { name: '아이브', sub: '다이브', color: '#f59f00' },
    { name: '르세라핌', sub: '피어나', color: '#7950f2' },
    { name: '세븐틴', sub: '캐럿', color: '#20c997' },
    { name: '방탄소년단', sub: '아미', color: '#845ef7' },
  ];

  const filteredFandoms = availableFandoms.filter(
    (f) =>
      f.name.toLowerCase().includes(fandomQuery.toLowerCase()) ||
      f.sub.toLowerCase().includes(fandomQuery.toLowerCase())
  );

  const toggleFandom = (idx: number) => {
    if (selectedFandoms.includes(idx)) {
      if (selectedFandoms.length > 1) {
        const next = selectedFandoms.filter((i) => i !== idx);
        setSelectedFandoms(next);
        if (mainFandom === idx) setMainFandom(next[0]);
      }
    } else {
      setSelectedFandoms([...selectedFandoms, idx]);
    }
  };

  // UV-AUTH-00: Splash
  if (step === 'splash') {
    return (
      <div
        onClick={() => setStep('social')}
        className="tapzone"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: '#fff',
          overflow: 'hidden',
          cursor: 'pointer',
          userSelect: 'none',
          touchAction: 'manipulation',
        }}
      >
        <div style={{ position: 'absolute', top: '38%', left: 0, right: 0, textAlign: 'center', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <svg width="120" height="130" viewBox="0 0 120 130" fill="none" style={{ margin: '0 auto', display: 'block' }}>
            <line x1="60" y1="16" x2="60" y2="104" stroke="#111" strokeWidth="3" />
            <path d="M60 20h40l-8 11 8 11H60z" fill="#111" />
            <rect x="70" y="24" width="9" height="9" fill="#2f6bff" />
            <ellipse cx="60" cy="106" rx="34" ry="8" fill="none" stroke="#111" strokeWidth="1.5" />
            <path d="M44 106c0-4 32-4 32 0" stroke="#111" strokeWidth="1.5" fill="none" />
          </svg>
          <div style={{ font: "600 24px 'Pretendard'", color: '#111', letterSpacing: '-.03em', marginTop: '24px' }}>팬덤 땅따먹기</div>
          <div style={{ font: "400 10px 'IBM Plex Mono', monospace", color: '#999', marginTop: '8px', letterSpacing: '.16em' }}>PLANT YOUR FLAG</div>
        </div>

        <div style={{ position: 'absolute', left: '22px', right: '22px', bottom: '64px', zIndex: 10 }}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setStep('social'); }}
            style={{
              width: '100%',
              height: '50px',
              border: '1.5px solid #111',
              background: '#111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              font: "600 13px 'Pretendard'",
              color: '#fff',
              letterSpacing: '-.01em',
              cursor: 'pointer',
            }}
          >
            터치하여 시작하기 →
          </button>
        </div>
        <div style={{ position: 'absolute', bottom: '26px', left: 0, right: 0, textAlign: 'center', font: "400 9px 'IBM Plex Mono', monospace", color: '#c5c5c5', pointerEvents: 'none' }}>v0.1.0</div>
      </div>
    );
  }

  // UV-AUTH-01: Social Login
  if (step === 'social') {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }} className="rise">
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(17,17,17,.22)' }}></div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', borderTop: '1px solid #111', padding: '16px 22px 30px' }}>
          <div style={{ width: '32px', height: '3px', background: '#111', margin: '0 auto 20px' }}></div>
          <div style={{ font: "600 19px 'Pretendard'", color: '#111', textAlign: 'center', letterSpacing: '-.02em' }}>3초 만에 시작하기</div>
          <div style={{ font: "400 11px 'Pretendard'", color: '#666', textAlign: 'center', marginTop: '7px' }}>내 팬덤의 땅을 넓히러 가볼까요?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginTop: '22px' }}>
            <button type="button" onClick={() => setStep('terms')} style={{ height: '50px', border: '1px solid #111', background: '#fae100', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 13px 'Pretendard'", color: '#3c1e1e', cursor: 'pointer' }}>카카오로 계속하기</button>
            <button type="button" onClick={() => setStep('terms')} style={{ height: '50px', border: '1px solid #111', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 13px 'Pretendard'", color: '#111', cursor: 'pointer' }}>구글로 계속하기</button>
            <button type="button" onClick={() => setStep('terms')} style={{ height: '50px', border: '1px solid #111', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 13px 'Pretendard'", color: '#fff', cursor: 'pointer' }}>애플로 계속하기</button>
          </div>
          <div style={{ textAlign: 'center', font: "400 9px 'IBM Plex Mono', monospace", color: '#c5c5c5', marginTop: '16px' }}>BY CONTINUING YOU AGREE TO TERMS</div>
        </div>
      </div>
    );
  }

  // UV-AUTH-02: Terms
  if (step === 'terms') {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }} className="rise">
        <div style={{ position: 'absolute', top: '58px', left: '22px', right: '22px' }}>
          <div style={{ font: "600 20px/1.35 'Pretendard'", color: '#111', letterSpacing: '-.02em' }}>서비스 이용을 위해<br />동의가 필요해요</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px', height: '52px', padding: '0 15px', border: '1.5px solid #111', marginTop: '20px' }}>
            <span style={{ width: '20px', height: '20px', border: '1.5px solid #111', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M4 12l5 5L20 6" /></svg>
            </span>
            <span style={{ font: "600 13px 'Pretendard'", color: '#111' }}>전체 동의</span>
          </div>
          <div style={{ marginTop: '8px' }}>
            {['[필수] 서비스 이용 약관', '[필수] 위치 기반 서비스', '[필수] 개인정보 처리방침'].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '13px 15px', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ width: '18px', height: '18px', border: '1.5px solid #111', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M4 12l5 5L20 6" /></svg>
                </span>
                <span style={{ flex: 1, font: "400 12px 'Pretendard'", color: '#111' }}>{t}</span>
                <span style={{ font: "400 11px 'Pretendard'", color: '#999' }}>›</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '13px 15px' }}>
              <span style={{ width: '18px', height: '18px', border: '1.5px solid #c8c8c8' }}></span>
              <span style={{ flex: 1, font: "400 12px 'Pretendard'", color: '#999' }}>[선택] 이벤트·혜택 알림 수신</span>
              <span style={{ font: "400 11px 'Pretendard'", color: '#999' }}>›</span>
            </div>
          </div>
        </div>
        <button type="button" onClick={() => setStep('profile')} style={{ position: 'absolute', left: '22px', right: '22px', bottom: '26px', height: '50px', border: 'none', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 13px 'Pretendard'", color: '#fff', cursor: 'pointer' }}>동의하고 계속하기</button>
      </div>
    );
  }

  // UV-AUTH-03: Profile
  if (step === 'profile') {
    const characters = [
      <svg key="0" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.4"><path d="M9 3c-1 2-1 4 0 6M15 3c1 2 1 4 0 6M12 9a5 6 0 0 0-5 6c0 3 2 5 5 5s5-2 5-5a5 6 0 0 0-5-6Z" /></svg>,
      <svg key="1" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.4"><path d="M12 4l3 4 5-1-3 4 3 4-5-1-3 4-3-4-5 1 3-4-3-4 5 1z" /></svg>,
      <svg key="2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.4"><circle cx="12" cy="13" r="7" /><path d="M9 3l3 4 3-4" /></svg>,
      <svg key="3" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.4"><ellipse cx="12" cy="13" rx="8" ry="6" /><path d="M12 7v-3" /></svg>,
    ];
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }} className="rise">
        <div style={{ position: 'absolute', top: '58px', left: '22px', right: '22px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <span style={{ flex: 1, height: '3px', background: '#111' }}></span>
            <span style={{ flex: 1, height: '3px', background: '#111' }}></span>
            <span style={{ flex: 1, height: '3px', background: '#e0e0e0' }}></span>
          </div>
          <div style={{ font: "600 20px 'Pretendard'", color: '#111', letterSpacing: '-.02em', marginTop: '18px' }}>어떻게 불러드릴까요?</div>
          <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', margin: '20px 0 7px' }}>NICKNAME</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', height: '46px', padding: '0 14px', border: '1px solid #111' }}>
              <input
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  setNicknameChecked(false);
                  setNicknameMsg({ text: 'ℹ️ 중복 확인이 필요해요', isError: true });
                }}
                placeholder="닉네임 입력"
                style={{ border: 'none', outline: 'none', font: "500 13px 'Pretendard'", color: '#111', width: '100%', background: 'transparent' }}
              />
            </div>
            <button
              type="button"
              onClick={handleCheckNickname}
              style={{ height: '46px', padding: '0 14px', border: '1px solid #111', background: '#fff', display: 'flex', alignItems: 'center', font: "500 11.5px 'Pretendard'", color: '#111', cursor: 'pointer' }}
            >
              중복 확인
            </button>
          </div>
          <div style={{ font: "400 10.5px 'Pretendard'", color: nicknameMsg.isError ? '#e63b83' : '#111', marginTop: '7px' }}>
            {nicknameMsg.text}
          </div>
          <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', margin: '20px 0 9px' }}>CHARACTER</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {characters.map((char, i) => (
              <div
                key={i}
                onClick={() => setSelectedChar(i)}
                className="tapzone"
                style={{ width: '60px', height: '60px', border: i === selectedChar ? '1.5px solid #111' : '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: i === selectedChar ? 1 : 0.5 }}
              >{char}</div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => { if (nicknameChecked) setStep('fandom'); }}
          disabled={!nicknameChecked}
          style={{
            position: 'absolute', left: '22px', right: '22px', bottom: '26px', height: '50px', border: 'none',
            background: nicknameChecked ? '#111' : '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center',
            font: "600 13px 'Pretendard'", color: nicknameChecked ? '#fff' : '#999', cursor: nicknameChecked ? 'pointer' : 'not-allowed'
          }}
        >
          다음
        </button>
      </div>
    );
  }

  // UV-AUTH-04: Fandom Selection
  if (step === 'fandom') {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }} className="rise">
        <div style={{ position: 'absolute', top: '50px', left: '22px', right: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '5px', flex: 1, marginRight: '16px' }}>
              <span style={{ flex: 1, height: '3px', background: '#111' }}></span>
              <span style={{ flex: 1, height: '3px', background: '#111' }}></span>
              <span style={{ flex: 1, height: '3px', background: '#111' }}></span>
            </div>
            {/* v1 기능 복원: 나중에 선택 링크 */}
            <span
              onClick={onCompleteOnboarding}
              className="tapzone"
              style={{ font: "400 11px 'Pretendard'", color: '#999', textDecoration: 'underline', cursor: 'pointer' }}
            >
              나중에 선택 ›
            </span>
          </div>

          <div style={{ font: "600 20px/1.35 'Pretendard'", color: '#111', letterSpacing: '-.02em', marginTop: '16px' }}>어느 팬덤으로<br />싸우시겠어요?</div>
          
          {/* v1 기능 복원: 실시간 검색창 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '42px', padding: '0 13px', border: '1px solid #111', marginTop: '14px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="M16 16l5 5" /></svg>
            <input
              type="text"
              placeholder="SEARCH FANDOM / IP..."
              value={fandomQuery}
              onChange={(e) => setFandomQuery(e.target.value)}
              style={{ border: 'none', outline: 'none', font: "400 11px 'IBM Plex Mono', monospace", color: '#111', width: '100%', background: 'transparent' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px', maxHeight: '240px', overflowY: 'auto' }} className="scroll-none">
            {filteredFandoms.map((f) => {
              const originalIndex = availableFandoms.findIndex((av) => av.name === f.name);
              const isSelected = selectedFandoms.includes(originalIndex);
              const isMain = mainFandom === originalIndex;
              return (
                <div
                  key={f.name}
                  onClick={() => toggleFandom(originalIndex)}
                  className="tapzone"
                  style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '11px 13px', border: isMain ? '1.5px solid #111' : '1px solid #e0e0e0', opacity: isSelected ? 1 : 0.7 }}
                >
                  <span style={{ width: '30px', height: '30px', border: '1px solid #111', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '4px', left: '4px', width: '6px', height: '6px', background: f.color }}></span>
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ font: isMain ? "600 12.5px 'Pretendard'" : "500 12.5px 'Pretendard'", color: '#111' }}>{f.name} · {f.sub}</div>
                    <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginTop: '1px' }}>{isMain ? 'MAIN' : isSelected ? 'SUPPORT ✓' : 'SUPPORT'}</div>
                  </div>
                  {isMain && <span style={{ padding: '3px 8px', border: '1px solid #111', background: '#111', font: "500 9px 'Pretendard'", color: '#fff' }}>대표</span>}
                </div>
              );
            })}
          </div>

          {/* v1 기능 복원: 신규 IP 직접 신청 클릭 액션 */}
          <div
            onClick={() => setShowApplyModal(true)}
            className="tapzone"
            style={{ textAlign: 'center', font: "400 11px 'Pretendard'", color: '#999', marginTop: '14px', textDecoration: 'underline', cursor: 'pointer' }}
          >
            찾는 IP가 없나요? 직접 신청
          </div>
        </div>

        <button
          type="button"
          onClick={() => setStep('welcome')}
          style={{ position: 'absolute', left: '22px', right: '22px', bottom: '26px', height: '50px', border: 'none', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 13px 'Pretendard'", color: '#fff', cursor: 'pointer' }}
        >
          이 팬덤으로 시작하기
        </button>

        {/* v1 기능 복원: 신규 IP / 팬덤 추가 신청 모달 (2가지 액션) */}
        {showApplyModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(17,17,17,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '360px', background: '#fff', border: '1.5px solid #111', padding: '20px' }} className="pop">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ font: "600 16px 'Pretendard'", color: '#111' }}>신규 IP / 팬덤 추가 신청</div>
                <div onClick={() => setShowApplyModal(false)} className="tapzone" style={{ font: "600 14px 'Pretendard'", color: '#111', cursor: 'pointer' }}>✕</div>
              </div>

              {isSubmitted ? (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{ font: "600 16px 'Pretendard'", color: '#111', marginTop: '6px' }}>신청이 접수되었습니다!</div>
                  <div style={{ font: "400 11px 'Pretendard'", color: '#666', marginTop: '4px', marginBottom: '20px' }}>검토 후 빠르게 추가해 드릴게요.</div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* 액션 1: 신청한 팬덤으로 시작하기 */}
                    <button
                      type="button"
                      onClick={() => {
                        if (applyIpName.trim()) {
                          setCustomFandom({
                            name: applyIpName.trim(),
                            sub: applyFandomName.trim() || '팬덤',
                            color: '#2f6bff',
                          });
                        }
                        setIsSubmitted(false);
                        setShowApplyModal(false);
                        setStep('welcome');
                      }}
                      style={{
                        height: '46px',
                        border: '1.5px solid #111',
                        background: '#111',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        font: "600 12.5px 'Pretendard'",
                        color: '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      신청한 팬덤으로 시작하기 →
                    </button>
                    {/* 액션 2: 닫고 다른 IP 추가 신청 / 검색 */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setShowApplyModal(false);
                        setApplyIpName('');
                        setApplyFandomName('');
                      }}
                      style={{
                        height: '42px',
                        border: '1px solid #111',
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        font: "500 11.5px 'Pretendard'",
                        color: '#111',
                        cursor: 'pointer',
                      }}
                    >
                      닫고 다른 IP 추가 신청 / 검색
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginBottom: '4px' }}>아티스트 / IP 이름</div>
                  <input
                    type="text"
                    placeholder="예: 라이즈, QWER, 아이유 등"
                    value={applyIpName}
                    onChange={(e) => setApplyIpName(e.target.value)}
                    style={{ width: '100%', height: '40px', border: '1px solid #111', padding: '0 10px', font: "500 12px 'Pretendard'", marginBottom: '10px', outline: 'none' }}
                  />
                  <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginBottom: '4px' }}>팬덤 이름</div>
                  <input
                    type="text"
                    placeholder="예: 브리즈, 바위게 등"
                    value={applyFandomName}
                    onChange={(e) => setApplyFandomName(e.target.value)}
                    style={{ width: '100%', height: '40px', border: '1px solid #111', padding: '0 10px', font: "500 12px 'Pretendard'", marginBottom: '14px', outline: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (applyIpName.trim()) {
                        setIsSubmitted(true);
                      }
                    }}
                    style={{ width: '100%', height: '44px', border: '1.5px solid #111', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 12.5px 'Pretendard'", color: '#fff', cursor: 'pointer' }}
                  >
                    신청서 제출하기
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // UV-AUTH-05: Welcome
  if (step === 'welcome') {
    const main = customFandom || availableFandoms[mainFandom];
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }} className="pop">
        <svg viewBox="0 0 336 130" style={{ position: 'absolute', top: '36px', left: 0, width: '100%' }}>
          <g stroke="#111" strokeWidth="1.3"><path d="M60 40l6 10M280 34l-5 11M120 24l3 12M210 28l-4 11" /></g>
          <rect x="58" y="54" width="5" height="5" fill="#2f6bff" />
          <rect x="276" y="48" width="5" height="5" fill="#e63b83" />
          <rect x="122" y="38" width="4" height="4" fill="#f59f00" />
        </svg>
        <div style={{ position: 'absolute', top: '96px', left: 0, right: 0, textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', border: '1.5px solid #111', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><path d="M4 12l5 5L20 6" /></svg>
          </div>
          <div style={{ font: "600 22px 'Pretendard'", color: '#111', letterSpacing: '-.02em', marginTop: '16px' }}>입덕 완료</div>
        </div>
        <div style={{ position: 'absolute', top: '236px', left: '24px', right: '24px', border: '1px solid #111', padding: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', border: '1px solid #111', borderRadius: '50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.4"><path d="M9 3c-1 2-1 4 0 6M15 3c1 2 1 4 0 6M12 9a5 6 0 0 0-5 6c0 3 2 5 5 5s5-2 5-5a5 6 0 0 0-5-6Z" /></svg>
              <span style={{ position: 'absolute', top: 0, right: 0, width: '7px', height: '7px', background: main.color }}></span>
            </div>
            <div>
              <div style={{ font: "600 15px 'Pretendard'", color: '#111' }}>{nickname || '버니즈덕후'}</div>
              <div style={{ font: "400 9.5px 'IBM Plex Mono', monospace", color: '#999', marginTop: '2px' }}>{main.name} · {main.sub}</div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '344px', left: '24px', right: '24px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
          {['우리 팬덤 성지를 지도에서 찾고', '방문 영수증으로 인증하면', '그 땅이 우리 색으로 물들어요'].map((t, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
              <span style={{ width: '22px', height: '22px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "500 10px 'IBM Plex Mono', monospace", color: '#111', flex: 'none' }}>{idx + 1}</span>
              <span style={{ font: "400 11.5px 'Pretendard'", color: '#444' }}>{t}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onCompleteOnboarding}
          style={{ position: 'absolute', left: '22px', right: '22px', bottom: '26px', height: '50px', border: 'none', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 13px 'Pretendard'", color: '#fff', cursor: 'pointer' }}
        >
          지도 진입하기
        </button>
      </div>
    );
  }

  return null;
}

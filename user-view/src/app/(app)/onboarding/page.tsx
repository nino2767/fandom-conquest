'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneShell from '@/components/mockup/PhoneShell';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<'splash' | 'social' | 'terms' | 'profile' | 'fandom' | 'welcome'>('splash');

  // Profile & Nickname States
  const [nickname, setNickname] = useState<string>('버니즈덕후');
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(true);
  const [nicknameMessage, setNicknameMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' }>({
    text: '✓ 사용할 수 있는 닉네임이에요',
    type: 'success',
  });
  const [selectedAvatar, setSelectedAvatar] = useState<string>('🐰');

  const handleCheckNickname = () => {
    if (!nickname.trim()) {
      setNicknameMessage({ text: '❌ 닉네임을 입력해 주세요', type: 'error' });
      setIsNicknameChecked(false);
      return;
    }
    const unavailableNames = ['버니즈', 'admin', '뉴진스', '관리자'];
    if (unavailableNames.includes(nickname.trim())) {
      setNicknameMessage({ text: '❌ 이미 사용 중인 닉네임이에요', type: 'error' });
      setIsNicknameChecked(false);
    } else {
      setNicknameMessage({ text: '✓ 사용할 수 있는 닉네임이에요', type: 'success' });
      setIsNicknameChecked(true);
    }
  };
  // Fandom Selection & Request States
  const [fandomQuery, setFandomQuery] = useState<string>('');
  const [selectedFandoms, setSelectedFandoms] = useState<Array<{ name: string; fandom: string; color: string; symbol: string }>>([
    { name: '뉴진스', fandom: '버니즈', color: '#2f6bff', symbol: 'N' },
  ]);
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [applyIpName, setApplyIpName] = useState<string>('');
  const [applyFandomName, setApplyFandomName] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const toggleSelectFandom = (item: { name: string; fandom: string; color: string; symbol: string }) => {
    setSelectedFandoms((prev) => {
      const exists = prev.some((f) => f.name === item.name);
      if (exists) {
        if (prev.length === 1) return prev;
        return prev.filter((f) => f.name !== item.name);
      } else {
        return [...prev, item];
      }
    });
  };

  const fandomList = [
    { name: '뉴진스', fandom: '버니즈', color: '#2f6bff', symbol: 'N' },
    { name: '에스파', fandom: '마이', color: '#e64980', symbol: 'ae' },
    { name: '아이브', fandom: '다이브', color: '#f59f00', symbol: 'IVE' },
    { name: '르세라핌', fandom: '피어나', color: '#7950f2', symbol: 'L' },
    { name: '세븐틴', fandom: '캐럿', color: '#20c997', symbol: '17' },
    { name: '방탄소년단', fandom: '아미', color: '#845ef7', symbol: 'BTS' },
    { name: 'NCT', fandom: '시즈니', color: '#12b886', symbol: 'NCT' },
  ];

  const filteredFandoms = fandomList.filter(
    (item) =>
      item.name.toLowerCase().includes(fandomQuery.toLowerCase()) ||
      item.fandom.toLowerCase().includes(fandomQuery.toLowerCase())
  );

  return (
    <PhoneShell>
        {step === 'splash' && (
          <div onClick={() => setStep('social')} className="tapzone" style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 32%,#fdeef4 0%,#fff 55%)' }}></div>
            <div style={{ position: 'absolute', top: '36%', left: 0, right: 0, textAlign: 'center', transform: 'translateY(-50%)' }}>
              <div style={{ width: '96px', height: '96px', border: '3px solid #22201c', borderRadius: '26px', background: '#ffe14d', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '44px', boxShadow: '5px 5px 0 rgba(34,32,28,.16)' }}>🚩</div>
              <div style={{ font: "900 26px 'Pretendard'", color: '#22201c', letterSpacing: '-.03em', marginTop: '20px' }}>팬덤 땅따먹기</div>
              <div style={{ font: "700 12px 'Pretendard'", color: '#8a8272', marginTop: '6px' }}>우리들의 성지, 우리의 색으로</div>
            </div>
            <div style={{ position: 'absolute', bottom: '50px', left: 0, right: 0, textAlign: 'center', font: "700 13px 'Pretendard'", color: '#2f6bff' }}>터치하여 시작하기 ➔</div>
          </div>
        )}

        {step === 'social' && (
          <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }} className="rise">
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(34,32,28,.35)' }}></div>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', borderTop: '2px solid #22201c', borderRadius: '20px 20px 0 0', padding: '14px 20px 40px' }}>
              <div style={{ font: "900 19px 'Pretendard'", color: '#22201c', textAlign: 'center' }}>3초 만에 시작하기</div>
              <div style={{ font: "600 11.5px 'Pretendard'", color: '#8a8272', textAlign: 'center', marginTop: '6px' }}>내 팬덤의 땅을 넓히러 가볼까요?</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                <div onClick={() => setStep('terms')} className="tapzone" style={{ height: '50px', border: '2px solid #22201c', borderRadius: '12px', background: '#fae100', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', font: "800 13px 'Pretendard'", color: '#3c1e1e' }}>💬 카카오로 계속하기</div>
                <div onClick={() => setStep('terms')} className="tapzone" style={{ height: '50px', border: '2px solid #22201c', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', font: "800 13px 'Pretendard'", color: '#22201c' }}><span style={{ font: "900 14px 'Pretendard'", color: '#4285F4' }}>G</span> 구글로 계속하기</div>
              </div>
            </div>
          </div>
        )}

        {step === 'terms' && (
          <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }} className="rise">
            <div style={{ position: 'absolute', top: '56px', left: '16px', right: '16px' }}>
              <div style={{ font: "900 20px/1.3 'Pretendard'", color: '#22201c', letterSpacing: '-.02em' }}>서비스 이용을 위해<br />동의가 필요해요</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '54px', padding: '0 14px', border: '2px solid #22201c', borderRadius: '12px', background: '#fffbe8', marginTop: '20px' }}>
                <span style={{ width: '22px', height: '22px', border: '2px solid #22201c', borderRadius: '6px', background: '#ffe14d', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 12px 'Pretendard'", color: '#22201c' }}>✓</span>
                <span style={{ font: "800 13.5px 'Pretendard'", color: '#22201c' }}>전체 동의</span>
              </div>
            </div>
            <div style={{ position: 'absolute', left: '16px', right: '16px', bottom: '30px' }}>
              <div onClick={() => setStep('profile')} className="tapzone" style={{ height: '50px', borderRadius: '12px', background: '#22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 13.5px 'Pretendard'", color: '#fff', boxShadow: '4px 4px 0 rgba(34,32,28,.18)' }}>동의하고 계속하기</div>
            </div>
          </div>
        )}

        {step === 'profile' && (
          <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }} className="rise">
            <div style={{ position: 'absolute', top: '48px', left: '16px', right: '16px' }}>
              <div style={{ font: "900 20px/1.3 'Pretendard'", color: '#22201c', letterSpacing: '-.02em' }}>어떻게 불러드릴까요?</div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setIsNicknameChecked(false);
                    setNicknameMessage({ text: 'ℹ️ 중복 확인이 필요해요', type: 'info' });
                  }}
                  placeholder="닉네임 입력"
                  style={{
                    flex: 1,
                    height: '48px',
                    padding: '0 14px',
                    border: '2px solid #22201c',
                    borderRadius: '12px',
                    font: "800 13px 'Pretendard'",
                    color: '#22201c',
                    outline: 'none',
                    background: '#fff',
                  }}
                />
                <div
                  onClick={handleCheckNickname}
                  className="tapzone"
                  style={{
                    height: '48px',
                    padding: '0 16px',
                    border: '2px solid #22201c',
                    borderRadius: '12px',
                    background: '#ffe14d',
                    display: 'flex',
                    alignItems: 'center',
                    font: "800 12.5px 'Pretendard'",
                    color: '#22201c',
                    boxShadow: '2px 2px 0 rgba(34,32,28,.15)',
                  }}
                >
                  중복 확인
                </div>
              </div>
              <div
                style={{
                  font: "700 11px 'Pretendard'",
                  color: nicknameMessage.type === 'success' ? '#00806f' : nicknameMessage.type === 'error' ? '#e64980' : '#8a8272',
                  marginTop: '8px',
                }}
              >
                {nicknameMessage.text}
              </div>

              {/* Basic Profile Character Selector */}
              <div style={{ font: "700 11.5px 'Pretendard'", color: '#8a8272', margin: '24px 0 10px' }}>기본 프로필 캐릭터</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['🐰', '🦋', '🐥', '🐢'].map((emoji) => (
                  <div
                    key={emoji}
                    onClick={() => setSelectedAvatar(emoji)}
                    className="tapzone"
                    style={{
                      width: '56px',
                      height: '56px',
                      border: selectedAvatar === emoji ? '3px solid #22201c' : '2px solid #d8d1c0',
                      borderRadius: '50%',
                      background: selectedAvatar === emoji ? '#2f6bff' : '#f8f6f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      opacity: selectedAvatar === emoji ? 1 : 0.65,
                      boxShadow: selectedAvatar === emoji ? '3px 3px 0 rgba(34,32,28,.2)' : 'none',
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'absolute', left: '16px', right: '16px', bottom: '30px' }}>
              <div
                onClick={() => {
                  if (isNicknameChecked) {
                    setStep('fandom');
                  } else {
                    setNicknameMessage({ text: '❌ 중복 확인을 먼저 진행해 주세요', type: 'error' });
                  }
                }}
                className="tapzone"
                style={{
                  height: '50px',
                  borderRadius: '12px',
                  background: isNicknameChecked ? '#22201c' : '#b3ad9d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  font: "800 13.5px 'Pretendard'",
                  color: '#fff',
                  cursor: isNicknameChecked ? 'pointer' : 'not-allowed',
                }}
              >
                다음
              </div>
            </div>
          </div>
        )}

        {step === 'fandom' && (
          <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }} className="rise">
            <div style={{ position: 'absolute', top: '48px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ font: "900 20px/1.3 'Pretendard'", color: '#22201c', letterSpacing: '-.02em' }}>어느 팬덤으로<br />싸우시겠어요?</div>
              <div
                onClick={() => router.push('/map')}
                className="tapzone"
                style={{ font: "700 11.5px 'Pretendard'", color: '#8a8272', textDecoration: 'underline', padding: '6px' }}
              >
                ⏭️ 나중에 선택
              </div>
            </div>

            <div style={{ position: 'absolute', top: '118px', left: '16px', right: '16px', bottom: '90px', overflowY: 'auto' }} className="scroll-none">
              {/* Search Input */}
              <div style={{ marginBottom: '12px' }}>
                <input
                  type="text"
                  placeholder="🔍 팬덤 / 아티스트 검색..."
                  value={fandomQuery}
                  onChange={(e) => setFandomQuery(e.target.value)}
                  style={{
                    width: '100%',
                    height: '42px',
                    border: '2px solid #22201c',
                    borderRadius: '11px',
                    padding: '0 12px',
                    font: "700 12px 'Pretendard'",
                    color: '#22201c',
                    outline: 'none',
                    background: '#fbfaf7',
                  }}
                />
              </div>

              {/* Fandom List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredFandoms.map((item) => {
                  const isSelected = selectedFandoms.some((f) => f.name === item.name);
                  const isPrimary = selectedFandoms.length > 0 && selectedFandoms[0].name === item.name;
                  return (
                    <div
                      key={item.name}
                      onClick={() => toggleSelectFandom(item)}
                      className="tapzone"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '11px',
                        padding: '11px 13px',
                        border: isSelected ? `2.5px solid ${item.color}` : '2px solid #22201c',
                        borderRadius: '12px',
                        background: isSelected ? '#f4f8ff' : '#fff',
                      }}
                    >
                      <span
                        style={{
                          width: '34px',
                          height: '34px',
                          border: '2px solid #22201c',
                          borderRadius: '9px',
                          background: item.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          font: "900 12px 'Pretendard'",
                          color: '#fff',
                        }}
                      >
                        {item.symbol}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ font: "800 13px 'Pretendard'", color: '#22201c' }}>
                          {item.name} · {item.fandom}
                        </div>
                        <div style={{ font: "600 10px 'Pretendard'", color: isSelected ? '#2456c8' : '#8a8272' }}>
                          {isSelected ? (isPrimary ? '메인 팬덤 ◉' : '서브 팬덤 ☑') : '팬덤 선택'}
                        </div>
                      </div>
                      {isSelected && (
                        <span
                          style={{
                            padding: '4px 9px',
                            border: '2px solid #22201c',
                            borderRadius: '8px',
                            background: isPrimary ? '#ffe14d' : '#e8f4e2',
                            font: "800 9.5px 'Pretendard'",
                            color: '#22201c',
                          }}
                        >
                          {isPrimary ? '대표' : '선택됨'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* IP Request Link */}
              <div
                onClick={() => setShowApplyModal(true)}
                className="tapzone"
                style={{ textAlign: 'center', font: "700 11.5px 'Pretendard'", color: '#8a8272', marginTop: '16px', textDecoration: 'underline' }}
              >
                ➕ 찾는 IP가 없나요? 직접 신청하기
              </div>
            </div>

            <div style={{ position: 'absolute', left: '16px', right: '16px', bottom: '26px' }}>
              <div
                onClick={() => setStep('welcome')}
                className="tapzone"
                style={{
                  height: '50px',
                  borderRadius: '12px',
                  background: '#22201c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  font: "800 13.5px 'Pretendard'",
                  color: '#fff',
                  boxShadow: '4px 4px 0 rgba(34,32,28,.18)',
                }}
              >
                선택한 팬덤으로 시작하기
              </div>
            </div>

            {/* IP Application Modal */}
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
                              const newFandom = {
                                name: applyIpName.trim(),
                                fandom: applyFandomName.trim() || '팬덤',
                                color: '#2f6bff',
                                symbol: applyIpName.trim().slice(0, 2),
                              };
                              setSelectedFandoms((prev) => [newFandom, ...prev]);
                            }
                            setIsSubmitted(false);
                            setShowApplyModal(false);
                            setApplyIpName('');
                            setApplyFandomName('');
                            setStep('welcome');
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
                          🗺️ 신청한 팬덤으로 시작하기
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
          </div>
        )}

        {step === 'welcome' && (
          <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }} className="pop">
            <div style={{ position: 'absolute', top: '120px', left: 0, right: 0, textAlign: 'center' }}>
              <div style={{ fontSize: '44px' }}>🎉</div>
              <div style={{ font: "900 22px 'Pretendard'", color: '#22201c', marginTop: '10px', letterSpacing: '-.02em' }}>입덕 완료!</div>
            </div>
            <div style={{ position: 'absolute', top: '236px', left: '24px', right: '24px', border: '2.5px solid #22201c', borderRadius: '16px', padding: '16px', background: '#f4f8ff', boxShadow: '5px 5px 0 rgba(34,32,28,.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '52px', height: '52px', border: '3px solid #22201c', borderRadius: '50%', background: selectedFandoms[0]?.color || '#2f6bff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '23px', flex: 'none' }}>{selectedAvatar}</div>
                <div><div style={{ font: "900 15px 'Pretendard'", color: '#22201c' }}>{nickname}</div><div style={{ font: "700 11px 'Pretendard'", color: '#2456c8', marginTop: '2px' }}>💙 {selectedFandoms[0]?.name || '뉴진스'} · {selectedFandoms[0]?.fandom || '버니즈'} 외 {selectedFandoms.length - 1 > 0 ? `${selectedFandoms.length - 1}개` : ''} 소속</div></div>
              </div>
            </div>
            <div style={{ position: 'absolute', left: '16px', right: '16px', bottom: '30px' }}>
              <div onClick={() => router.push('/map')} className="tapzone" style={{ height: '50px', borderRadius: '12px', background: '#22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 13.5px 'Pretendard'", color: '#fff', boxShadow: '4px 4px 0 rgba(34,32,28,.18)' }}>🗺️ 지도 진입하기</div>
            </div>
          </div>
        )}
      </PhoneShell>
    );
  }

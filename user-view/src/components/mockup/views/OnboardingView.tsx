'use client';

import React, { useState } from 'react';

interface OnboardingViewProps {
  onCompleteOnboarding?: () => void;
}

export default function OnboardingView({ onCompleteOnboarding }: OnboardingViewProps) {
  const [step, setStep] = useState<'splash' | 'social' | 'terms' | 'profile' | 'fandom' | 'welcome'>('splash');

  // a1a: Splash
  if (step === 'splash') {
    return (
      <div onClick={() => setStep('social')} className="tapzone" style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 32%,#fdeef4 0%,#fff 55%)' }}></div>
        <div style={{ position: 'absolute', top: '36%', left: 0, right: 0, textAlign: 'center', transform: 'translateY(-50%)' }}>
          <div style={{ width: '96px', height: '96px', border: '3px solid #22201c', borderRadius: '26px', background: '#ffe14d', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '44px', boxShadow: '5px 5px 0 rgba(34,32,28,.16)' }}>🚩</div>
          <div style={{ font: "900 26px 'Pretendard'", color: '#22201c', letterSpacing: '-.03em', marginTop: '20px' }}>팬덤 땅따먹기</div>
          <div style={{ font: "700 12px 'Pretendard'", color: '#8a8272', marginTop: '6px' }}>우리들의 성지, 우리의 색으로</div>
        </div>
        <div style={{ position: 'absolute', bottom: '50px', left: 0, right: 0, textAlign: 'center', font: "700 13px 'Pretendard'", color: '#2f6bff' }}>터치하여 시작하기 ➔</div>
      </div>
    );
  }

  // a1b: Social Login
  if (step === 'social') {
    return (
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
    );
  }

  // a1c: Terms
  if (step === 'terms') {
    return (
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
    );
  }

  // a1d: Profile Setup
  if (step === 'profile') {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }} className="rise">
        <div style={{ position: 'absolute', top: '56px', left: '16px', right: '16px' }}>
          <div style={{ font: "900 20px/1.3 'Pretendard'", color: '#22201c', letterSpacing: '-.02em' }}>어떻게 불러드릴까요?</div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', height: '48px', padding: '0 14px', border: '2px solid #22201c', borderRadius: '12px' }}><span style={{ font: "800 13px 'Pretendard'", color: '#22201c' }}>버니즈덕후</span></div>
            <div style={{ height: '48px', padding: '0 14px', border: '2px solid #22201c', borderRadius: '12px', background: '#f3f0e8', display: 'flex', alignItems: 'center', font: "800 12px 'Pretendard'", color: '#22201c' }}>중복 확인</div>
          </div>
          <div style={{ font: "700 11px 'Pretendard'", color: '#00806f', marginTop: '7px' }}>✓ 사용할 수 있는 닉네임이에요</div>
        </div>
        <div style={{ position: 'absolute', left: '16px', right: '16px', bottom: '30px' }}>
          <div onClick={() => setStep('fandom')} className="tapzone" style={{ height: '50px', borderRadius: '12px', background: '#22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 13.5px 'Pretendard'", color: '#fff' }}>다음</div>
        </div>
      </div>
    );
  }

  // a1e: Fandom Selection
  if (step === 'fandom') {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }} className="rise">
        <div style={{ position: 'absolute', top: '56px', left: '16px', right: '16px' }}>
          <div style={{ font: "900 20px/1.3 'Pretendard'", color: '#22201c', letterSpacing: '-.02em' }}>어느 팬덤으로<br />싸우시겠어요?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '11px 13px', border: '2.5px solid #2f6bff', borderRadius: '12px', background: '#f4f8ff' }}>
              <span style={{ width: '34px', height: '34px', border: '2px solid #22201c', borderRadius: '9px', background: '#2f6bff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 12px 'Pretendard'", color: '#fff' }}>N</span>
              <div style={{ flex: 1 }}><div style={{ font: "800 13px 'Pretendard'", color: '#22201c' }}>뉴진스 · 버니즈</div><div style={{ font: "600 10px 'Pretendard'", color: '#2456c8' }}>메인 팬덤 ◉</div></div>
              <span style={{ padding: '4px 9px', border: '2px solid #22201c', borderRadius: '8px', background: '#ffe14d', font: "800 9.5px 'Pretendard'", color: '#22201c' }}>대표</span>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: '16px', right: '16px', bottom: '30px' }}>
          <div onClick={() => setStep('welcome')} className="tapzone" style={{ height: '50px', borderRadius: '12px', background: '#22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 13.5px 'Pretendard'", color: '#fff' }}>이 팬덤으로 시작하기</div>
        </div>
      </div>
    );
  }

  // a1f: Welcome Modal
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }} className="pop">
      <div style={{ position: 'absolute', top: '120px', left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontSize: '44px' }}>🎉</div>
        <div style={{ font: "900 22px 'Pretendard'", color: '#22201c', marginTop: '10px', letterSpacing: '-.02em' }}>입덕 완료!</div>
      </div>
      <div style={{ position: 'absolute', top: '236px', left: '24px', right: '24px', border: '2.5px solid #22201c', borderRadius: '16px', padding: '16px', background: '#f4f8ff', boxShadow: '5px 5px 0 rgba(34,32,28,.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '52px', height: '52px', border: '3px solid #22201c', borderRadius: '50%', background: '#2f6bff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '23px', flex: 'none' }}>🐰</div>
          <div><div style={{ font: "900 15px 'Pretendard'", color: '#22201c' }}>버니즈덕후</div><div style={{ font: "700 11px 'Pretendard'", color: '#2456c8', marginTop: '2px' }}>💙 뉴진스 · 버니즈 소속</div></div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: '16px', right: '16px', bottom: '30px' }}>
        <div onClick={onCompleteOnboarding} className="tapzone" style={{ height: '50px', borderRadius: '12px', background: '#22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 13.5px 'Pretendard'", color: '#fff', boxShadow: '4px 4px 0 rgba(34,32,28,.18)' }}>🗺️ 지도 진입하기</div>
      </div>
    </div>
  );
}

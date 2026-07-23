'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface VerifViewProps {
  onClose?: () => void;
}

export default function VerifView({ onClose }: VerifViewProps) {
  const router = useRouter();
  const [step, setStep] = useState<'camera' | 'scanning' | 'success' | 'manual' | 'rejected' | 'share'>('camera');
  const [scanProgress, setScanProgress] = useState<number>(0);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push('/map');
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'scanning') {
      timer = setTimeout(() => {
        setScanProgress(58);
      }, 300);
    } else {
      timer = setTimeout(() => {
        setScanProgress(0);
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* STEP 1: Camera Capture (v1a) */}
      {step === 'camera' && (
        <div style={{ position: 'absolute', inset: 0, background: '#22201c' }}>
          <div style={{ position: 'absolute', top: '52px', left: '16px', right: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 30 }}>
            <div onClick={handleClose} className="tapzone" style={{ width: '34px', height: '34px', border: '2px solid #fff', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#fff' }}>✕</div>
            <div style={{ font: "800 14px 'Pretendard'", color: '#fff' }}>영수증 인증</div>
            <div style={{ width: '34px', height: '34px', border: '2px solid #fff', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>⚡</div>
          </div>

          <div style={{ position: 'absolute', top: '110px', left: '36px', right: '36px', bottom: '220px', zIndex: 20 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,.06)', borderRadius: '10px' }}></div>
            <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '34px', height: '34px', borderTop: '3.5px solid #ffe14d', borderLeft: '3.5px solid #ffe14d', borderRadius: '10px 0 0 0' }}></div>
            <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '34px', height: '34px', borderTop: '3.5px solid #ffe14d', borderRight: '3.5px solid #ffe14d', borderRadius: '0 10px 0 0' }}></div>
            <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '34px', height: '34px', borderBottom: '3.5px solid #ffe14d', borderLeft: '3.5px solid #ffe14d', borderRadius: '0 0 0 10px' }}></div>
            <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '34px', height: '34px', borderBottom: '3.5px solid #ffe14d', borderRight: '3.5px solid #ffe14d', borderRadius: '0 0 10px 0' }}></div>
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '64%', height: '78%', background: 'repeating-linear-gradient(0deg,#f7f4ec,#f7f4ec 9px,#efe9dc 9px,#efe9dc 11px)', borderRadius: '5px', opacity: 0.9, boxShadow: '0 10px 30px rgba(0,0,0,.4)' }}></div>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: '-40px', textAlign: 'center', font: "700 12px 'Pretendard'", color: '#ffe14d' }}>영수증을 프레임 안에 맞춰주세요</div>
          </div>

          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '18px 24px 70px', background: 'rgba(34,32,28,.9)', borderTop: '2px solid #fff', zIndex: 30 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '50px', height: '50px', border: '2px solid #fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px' }}>🖼️</div>
                <div style={{ font: "700 10px 'Pretendard'", color: '#c9c2b2', marginTop: '5px' }}>갤러리</div>
              </div>
              <div onClick={() => setStep('scanning')} className="tapzone" style={{ width: '78px', height: '78px', borderRadius: '50%', border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ffe14d', border: '2.5px solid #22201c' }}></div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '50px', height: '50px', border: '2px solid #6b6558', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px', opacity: 0.6 }}>🔦</div>
                <div style={{ font: "700 10px 'Pretendard'", color: '#6b6558', marginTop: '5px' }}>플래시 OFF</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: AI OCR Scanning (v1b) */}
      {step === 'scanning' && (
        <div style={{ position: 'absolute', inset: 0, background: '#fff' }} className="rise">
          <div style={{ position: 'absolute', top: '56px', left: 0, right: 0, textAlign: 'center' }}>
            <div style={{ font: "900 17px 'Pretendard'", color: '#22201c' }}>AI가 영수증을 읽고 있어요</div>
            <div style={{ font: "600 11px 'Pretendard'", color: '#8a8272', marginTop: '4px' }}>평균 6초 · 자리를 떠나도 괜찮아요</div>
          </div>
          <div style={{ position: 'absolute', top: '120px', left: '60px', right: '60px', height: '250px', border: '2px solid #22201c', borderRadius: '10px', background: 'repeating-linear-gradient(0deg,#fdfcf9,#fdfcf9 10px,#f4f0e6 10px,#f4f0e6 12px)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: '38%', height: '3px', background: '#00b8a0', boxShadow: '0 0 14px rgba(0,184,160,.8),0 0 4px rgba(0,184,160,1)' }}></div>
          </div>
          <div style={{ position: 'absolute', top: '396px', left: '16px', right: '16px', border: '2px solid #22201c', borderRadius: '12px', padding: '12px 14px' }}>
            <div style={{ font: "800 10.5px 'Pretendard'", color: '#00806f', letterSpacing: '.1em', marginBottom: '9px' }}>추출 파이프라인</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1.5px solid #ececec' }}><span style={{ font: "700 12px 'Pretendard'", color: '#22201c' }}>사업자번호</span><span style={{ font: "800 11px 'Pretendard'", color: '#00806f' }}>✓ 211-88-*****</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span style={{ font: "700 12px 'Pretendard'", color: '#22201c' }}>결제 일시</span><span style={{ font: "800 11px 'Pretendard'", color: '#00806f' }}>✓ 07.22 14:03</span></div>
            <div style={{ height: '6px', border: '1.5px solid #22201c', borderRadius: '4px', overflow: 'hidden', marginTop: '8px' }}>
              <div style={{ width: `${scanProgress}%`, height: '100%', background: '#00b8a0', transition: 'width 0.3s ease' }}></div>
            </div>
            <div style={{ font: "700 10px 'Pretendard'", color: '#8a8272', marginTop: '4px', textAlign: 'center' }}>2/4 필드 추출 완료 · {scanProgress}%</div>
          </div>

          <div style={{ position: 'absolute', left: '16px', right: '16px', bottom: '70px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div onClick={() => setStep('success')} className="tapzone" style={{ height: '44px', borderRadius: '10px', background: '#2f6bff', color: '#fff', font: "800 13px 'Pretendard'", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ✓ 인증 성공 테스트
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div onClick={() => setStep('manual')} className="tapzone" style={{ flex: 1, height: '40px', borderRadius: '10px', border: '2px solid #22201c', font: "800 11px 'Pretendard'", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ⏳ 수동 검수 대기
              </div>
              <div onClick={() => setStep('rejected')} className="tapzone" style={{ flex: 1, height: '40px', borderRadius: '10px', border: '2px solid #c0492f', color: '#c0492f', font: "800 11px 'Pretendard'", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ⚠️ 인증 반려
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Success Feedback (v1c) */}
      {step === 'success' && (
        <div style={{ position: 'absolute', inset: 0, background: '#fff' }} className="pop">
          <div style={{ position: 'absolute', top: '112px', left: 0, right: 0, textAlign: 'center' }}>
            <div style={{ width: '84px', height: '84px', borderRadius: '50%', border: '3px solid #22201c', background: '#ffe14d', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '38px', boxShadow: '4px 4px 0 rgba(34,32,28,.15)' }}>🎉</div>
            <div style={{ font: "900 23px 'Pretendard'", color: '#22201c', marginTop: '16px', letterSpacing: '-.02em' }}>인증 완료!</div>
            <div style={{ font: "600 12.5px/1.55 'Pretendard'", color: '#4a4438', marginTop: '7px' }}>마포구 <b style={{ color: '#2f6bff' }}>뉴진스</b> 점유율이<br /><b style={{ color: '#00806f' }}>+0.4%</b> 상승했습니다!</div>
          </div>

          <div style={{ position: 'absolute', top: '330px', left: '16px', right: '16px', border: '2px solid #22201c', borderRadius: '13px', padding: '12px 14px', background: '#fffbe8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
              <div style={{ width: '46px', height: '46px', border: '2px solid #22201c', borderRadius: '50%', background: '#ffe14d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '21px', flex: 'none' }}>👑</div>
              <div style={{ flex: 1 }}><div style={{ font: "800 12.5px 'Pretendard'", color: '#22201c' }}>새 뱃지 획득 · 마포구 수호신</div></div>
            </div>
          </div>

          <div style={{ position: 'absolute', left: '16px', right: '16px', bottom: '70px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
            <div onClick={() => setStep('share')} className="tapzone" style={{ height: '48px', borderRadius: '12px', border: '2px solid #22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 13px 'Pretendard'", color: '#22201c' }}>
              📤 승리 카드 공유 (v1f)
            </div>
            <div onClick={handleClose} className="tapzone" style={{ height: '44px', borderRadius: '12px', background: '#22201c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 13px 'Pretendard'" }}>
              🗺️ 지도 뷰로 이동
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Manual Inspection Wait (v1d) */}
      {step === 'manual' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(34,32,28,.3)' }} className="rise">
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', borderTop: '2px solid #22201c', borderRadius: '20px 20px 0 0', padding: '14px 20px 70px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid #22201c', background: '#eef4ff', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>⏳</div>
            <div style={{ font: "900 19px 'Pretendard'", color: '#22201c', textAlign: 'center', marginTop: '14px' }}>꼼꼼히 확인하고 있어요</div>
            <div style={{ font: "600 12px/1.6 'Pretendard'", color: '#4a4438', textAlign: 'center', marginTop: '7px' }}>AI가 판단하기 어려운 영수증이라<br /><b>10분 내로 관리자 확인 후 반영</b>됩니다</div>
            <div onClick={handleClose} className="tapzone" style={{ height: '48px', borderRadius: '12px', background: '#22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 13px 'Pretendard'", color: '#fff', marginTop: '16px' }}>확인했어요 (지도 이동)</div>
          </div>
        </div>
      )}

      {/* STEP 5: Rejected Modal (v1e) */}
      {step === 'rejected' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(34,32,28,.4)' }} className="rise">
          <div style={{ position: 'absolute', left: '22px', right: '22px', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: '2px solid #22201c', borderRadius: '16px', padding: '22px 18px 18px', boxShadow: '6px 6px 0 rgba(34,32,28,.2)' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', border: '3px solid #c0492f', background: '#fdeee9', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>⚠️</div>
            <div style={{ font: "900 18px 'Pretendard'", color: '#22201c', textAlign: 'center', marginTop: '12px' }}>인증이 반려됐어요</div>
            <div style={{ border: '2px solid #c0492f', borderRadius: '11px', padding: '10px 12px', marginTop: '14px', background: '#fdf6f4' }}>
              <div style={{ font: "800 10.5px 'Pretendard'", color: '#c0492f', letterSpacing: '.06em', marginBottom: '6px' }}>반려 사유</div>
              <div style={{ font: "700 12px/1.5 'Pretendard'", color: '#22201c' }}>영수증 최신성 만료 — 결제일이 7일을 초과했어요</div>
            </div>
            <div onClick={handleClose} className="tapzone" style={{ height: '48px', borderRadius: '12px', background: '#22201c', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 13px 'Pretendard'", color: '#fff', marginTop: '14px' }}>지도 뷰로 돌아가기</div>
          </div>
        </div>
      )}

      {/* STEP 6: Victory Share Card 9:16 (v1f) */}
      {step === 'share' && (
        <div style={{ position: 'absolute', inset: 0, background: '#fff', padding: '52px 16px 70px', overflowY: 'auto' }} className="rise">
          <div style={{ font: "800 14px 'Pretendard'", color: '#22201c', marginBottom: '10px' }}>📤 9:16 승리 공유 카드</div>
          <div style={{ width: '280px', height: '498px', borderRadius: '14px', overflow: 'hidden', position: 'relative', background: '#fff', border: '2px solid #22201c', margin: '0 auto', boxShadow: '0 20px 44px -18px rgba(0,0,0,.4)' }}>
            <div style={{ position: 'absolute', top: '18px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ font: "800 10px 'Pretendard'", color: '#c0492f', letterSpacing: '.2em' }}>FANDOM CONQUEST</div>
              <div style={{ font: "700 9.5px 'Pretendard'", color: '#8a8272' }}>2026.07.22</div>
            </div>
            <div style={{ position: 'absolute', top: '52px', left: '20px', right: '20px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 10px', border: '2px solid #22201c', borderRadius: '9px', background: '#ffe14d', font: "900 10.5px 'Pretendard'", color: '#22201c' }}>🔥 역전의 주역</div>
              <div style={{ font: "900 30px/1.12 'Pretendard'", color: '#22201c', marginTop: '12px' }}>마포구를<br /><span style={{ color: '#2f6bff' }}>뉴진스</span>가<br />탈환했다!</div>
            </div>
            <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px', borderTop: '2px solid #22201c', paddingTop: '9px', display: 'flex', justifyContent: 'space-between', font: "700 9px 'Pretendard'", color: '#8a8272' }}>
              <span>#팬덤땅따먹기 #마포구탈환</span>
              <span>fandom.app</span>
            </div>
          </div>
          <div onClick={handleClose} className="tapzone" style={{ height: '44px', borderRadius: '12px', background: '#22201c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 13px 'Pretendard'", marginTop: '14px' }}>
            지도 뷰로 돌아가기
          </div>
        </div>
      )}
    </div>
  );
}

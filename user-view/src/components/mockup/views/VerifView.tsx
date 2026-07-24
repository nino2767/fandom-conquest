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
        setScanProgress(62);
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
      {/* UV-VERIF-01: Camera */}
      {step === 'camera' && (
        <div style={{ position: 'absolute', inset: 0, background: '#111' }}>
          <div style={{ position: 'absolute', top: '50px', left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', zIndex: 10 }}>
            <div onClick={handleClose} className="tapzone" style={{ width: '32px', height: '32px', border: '1px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6"><path d="M5 5l14 14M19 5L5 19" /></svg>
            </div>
            <span style={{ font: "500 10px 'IBM Plex Mono', monospace", color: '#fff', letterSpacing: '.1em' }}>RECEIPT SCAN</span>
            <div style={{ width: '32px', height: '32px', border: '1px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6"><path d="M12 4v3M12 17v3M4 12h3M17 12h3" /><circle cx="12" cy="12" r="4" /></svg>
            </div>
          </div>
          <div style={{ position: 'absolute', top: '120px', left: '32px', right: '32px', bottom: '150px', border: '1px solid rgba(255,255,255,.3)' }}>
            <span style={{ position: 'absolute', top: '-1px', left: '-1px', width: '22px', height: '22px', borderTop: '2px solid #fff', borderLeft: '2px solid #fff' }}></span>
            <span style={{ position: 'absolute', top: '-1px', right: '-1px', width: '22px', height: '22px', borderTop: '2px solid #fff', borderRight: '2px solid #fff' }}></span>
            <span style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '22px', height: '22px', borderBottom: '2px solid #fff', borderLeft: '2px solid #fff' }}></span>
            <span style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '22px', height: '22px', borderBottom: '2px solid #fff', borderRight: '2px solid #fff' }}></span>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', font: "400 11px 'IBM Plex Mono', monospace", color: 'rgba(255,255,255,.6)', textAlign: 'center' }}>영수증을<br />사각형 안에 맞춰주세요</div>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '44px', height: '44px', border: '1px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><rect x="3" y="4" width="18" height="15" /><path d="M3 15l5-5 4 4 3-3 6 6" /></svg>
              </div>
              <span style={{ font: "400 8.5px 'IBM Plex Mono', monospace", color: 'rgba(255,255,255,.7)' }}>GALLERY</span>
            </div>
            <div onClick={() => setStep('scanning')} className="tapzone" style={{ width: '70px', height: '70px', borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fff' }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '44px', height: '44px', border: '1px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M12 3l2 4 2-2M4 10v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" /><path d="M7 10l5-7 5 7" /></svg>
              </div>
              <span style={{ font: "400 8.5px 'IBM Plex Mono', monospace", color: 'rgba(255,255,255,.7)' }}>FLASH</span>
            </div>
          </div>
        </div>
      )}

      {/* UV-VERIF-02: OCR Scanning */}
      {step === 'scanning' && (
        <div style={{ position: 'absolute', inset: 0, background: '#fff' }} className="rise">
          <div style={{ position: 'absolute', top: '64px', left: 0, right: 0, textAlign: 'center' }}>
            <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', letterSpacing: '.16em' }}>AI OCR PROCESSING</div>
            <div style={{ font: "600 18px 'Pretendard'", color: '#111', letterSpacing: '-.02em', marginTop: '5px' }}>영수증 판독 중…</div>
          </div>
          <div style={{ position: 'absolute', top: '128px', left: '80px', right: '80px', height: '150px', border: '1px solid #111', background: 'repeating-linear-gradient(0deg,#fafafa,#fafafa 12px,#f0f0f0 12px,#f0f0f0 14px)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: '48%', height: '2px', background: '#111' }}></div>
            <div style={{ position: 'absolute', left: 0, right: 0, top: '48%', height: '26px', background: 'linear-gradient(180deg,rgba(17,17,17,.12),transparent)' }}></div>
          </div>
          <div style={{ position: 'absolute', top: '302px', left: '22px', right: '22px' }}>
            {[
              { label: '사업자번호', value: '211-88-04350', done: true },
              { label: '결제 일시', value: '07-22 14:03', done: true },
              { label: '결제 금액', value: '판독 중…', done: false },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 0', borderBottom: '1px solid #f0f0f0' }}>
                {item.done ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><path d="M4 12l5 5L20 6" /></svg>
                ) : (
                  <div style={{ width: '16px', height: '16px', border: '1.5px solid #111', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
                )}
                <div style={{ flex: 1 }}><div style={{ font: "500 11.5px 'Pretendard'", color: '#111' }}>{item.label}</div></div>
                <span style={{ font: "400 10.5px 'IBM Plex Mono', monospace", color: item.done ? '#111' : '#999' }}>{item.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 0' }}>
              <div style={{ width: '16px', height: '16px', border: '1px solid #e0e0e0' }}></div>
              <div style={{ flex: 1 }}><div style={{ font: "500 11.5px 'Pretendard'", color: '#c8c8c8' }}>승인번호</div></div>
              <span style={{ font: "400 10.5px 'IBM Plex Mono', monospace", color: '#c8c8c8' }}>대기</span>
            </div>
          </div>
          <div onClick={() => setStep('success')} className="tapzone" style={{ position: 'absolute', left: '22px', right: '22px', bottom: '30px' }}>
            <div style={{ height: '4px', background: '#f0f0f0' }}><div style={{ width: `${scanProgress}%`, height: '100%', background: '#111', transition: 'width .8s ease' }}></div></div>
            <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginTop: '7px', textAlign: 'center' }}>3/4 FIELDS · {scanProgress}%</div>
          </div>
        </div>
      )}

      {/* UV-VERIF-03: Success */}
      {step === 'success' && (
        <div style={{ position: 'absolute', inset: 0, background: '#fff' }} className="pop">
          <svg viewBox="0 0 336 150" style={{ position: 'absolute', top: '40px', left: 0, width: '100%' }}>
            <g stroke="#111" strokeWidth="1.4"><path d="M60 40l6 10M280 34l-5 11M120 24l3 12M210 28l-4 11" /></g>
            <g fill="#2f6bff"><rect x="58" y="54" width="5" height="5" /></g>
            <g fill="#e63b83"><rect x="276" y="48" width="5" height="5" /></g>
            <g fill="#f59f00"><rect x="122" y="38" width="4" height="4" /></g>
          </svg>
          <div style={{ position: 'absolute', top: '96px', left: 0, right: 0, textAlign: 'center' }}>
            <div style={{ width: '72px', height: '72px', border: '2px solid #111', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><path d="M4 12l5 5L20 6" /></svg>
            </div>
            <div style={{ font: "600 22px 'Pretendard'", color: '#111', letterSpacing: '-.02em', marginTop: '16px' }}>인증 완료</div>
            <div style={{ font: "400 11.5px 'Pretendard'", color: '#666', marginTop: '6px', padding: '0 40px', lineHeight: '1.5' }}>마포구 <b style={{ fontWeight: 600, color: '#111' }}>뉴진스</b> 점유율이<br /><b style={{ fontWeight: 600, color: '#2f6bff' }}>+0.4%</b> 상승했습니다</div>
          </div>
          <div style={{ position: 'absolute', top: '300px', left: '22px', right: '22px', border: '1px solid #e0e0e0', padding: '13px 15px' }}>
            <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginBottom: '9px' }}>획득 뱃지</div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.4"><path d="M3 8l4 3 5-6 5 6 4-3v9H3z" /></svg>
              </div>
              <div><div style={{ font: "600 12.5px 'Pretendard'", color: '#111' }}>역전의 주역</div><div style={{ font: "400 10px 'IBM Plex Mono', monospace", color: '#999', marginTop: '2px' }}>NEW BADGE · +12P</div></div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '22px', right: '22px', bottom: '28px', display: 'flex', gap: '9px' }}>
            <div onClick={handleClose} className="tapzone" style={{ flex: 1, height: '48px', border: '1.5px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 12.5px 'Pretendard'", color: '#111' }}>지도에서 내 땅</div>
            <div onClick={() => setStep('share')} className="tapzone" style={{ flex: 1, height: '48px', border: '1.5px solid #111', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 12.5px 'Pretendard'", color: '#fff' }}>승리 카드 공유</div>
          </div>
        </div>
      )}

      {/* UV-VERIF-04: Manual Review */}
      {step === 'manual' && (
        <div style={{ position: 'absolute', inset: 0, background: '#fff' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(17,17,17,.22)' }}></div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: '34%', background: '#fff', borderTop: '1px solid #111', padding: '14px 22px 0' }}>
            <div style={{ width: '32px', height: '3px', background: '#111', margin: '0 auto 22px' }}></div>
            <div style={{ width: '66px', height: '66px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.4"><path d="M6 3h12M6 21h12M7 3c0 5 4 6 5 9 1-3 5-4 5-9M7 21c0-5 4-6 5-9 1 3 5 4 5 9" /></svg>
            </div>
            <div style={{ font: "600 18px 'Pretendard'", color: '#111', letterSpacing: '-.02em', textAlign: 'center', marginTop: '18px' }}>검수 대기 중</div>
            <div style={{ font: "400 11.5px/1.6 'Pretendard'", color: '#666', textAlign: 'center', marginTop: '8px', padding: '0 14px' }}>금액 판독 신뢰도가 낮아 관리자 확인이 필요해요.<br /><b style={{ fontWeight: 600, color: '#111' }}>10분 내로</b> 확인 후 점유율에 반영됩니다.</div>
            <div style={{ border: '1px solid #e0e0e0', marginTop: '20px', padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}><span style={{ font: "400 10.5px 'IBM Plex Mono', monospace", color: '#999' }}>STATUS</span><span style={{ font: "500 11px 'Pretendard'", color: '#111' }}>검수 대기열 3번</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span style={{ font: "400 10.5px 'IBM Plex Mono', monospace", color: '#999' }}>SPOT</span><span style={{ font: "500 11px 'Pretendard'", color: '#111' }}>언더스탠드 카페 · 성동구</span></div>
            </div>
            <div onClick={handleClose} className="tapzone" style={{ font: "400 10.5px 'Pretendard'", color: '#999', textAlign: 'center', marginTop: '16px' }}>결과는 알림으로 알려드릴게요</div>
          </div>
        </div>
      )}

      {/* UV-VERIF-05: Rejected */}
      {step === 'rejected' && (
        <div style={{ position: 'absolute', inset: 0, background: '#fff' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(17,17,17,.28)' }}></div>
          <div style={{ position: 'absolute', left: '22px', right: '22px', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: '1px solid #111', padding: '24px 22px' }}>
            <div style={{ width: '56px', height: '56px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><path d="M12 3L2 20h20L12 3Z" /><path d="M12 10v5M12 17.5v.5" /></svg>
            </div>
            <div style={{ font: "600 18px 'Pretendard'", color: '#111', letterSpacing: '-.02em', textAlign: 'center', marginTop: '16px' }}>인증 반려</div>
            <div style={{ border: '1px solid #e0e0e0', marginTop: '16px', padding: '12px 14px' }}>
              <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginBottom: '6px' }}>사유</div>
              <div style={{ font: "500 12.5px/1.6 'Pretendard'", color: '#111' }}>영수증 최신성 만료<br /><span style={{ font: "400 11px 'Pretendard'", color: '#666' }}>결제일로부터 7일이 지났습니다 (07.11 결제)</span></div>
            </div>
            <div style={{ font: "400 10.5px/1.6 'Pretendard'", color: '#999', marginTop: '14px', textAlign: 'center' }}>최근 7일 이내 방문 영수증으로<br />다시 시도해 주세요</div>
            <div style={{ display: 'flex', gap: '9px', marginTop: '20px' }}>
              <div onClick={handleClose} className="tapzone" style={{ flex: 1, height: '46px', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "500 12px 'Pretendard'", color: '#666' }}>닫기</div>
              <div onClick={() => setStep('camera')} className="tapzone" style={{ flex: 1.4, height: '46px', border: '1.5px solid #111', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', font: "600 12.5px 'Pretendard'", color: '#fff' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6"><rect x="3" y="6" width="18" height="14" /><circle cx="12" cy="13" r="3.5" /><path d="M8 6l1.5-2h5L16 6" /></svg>
                다시 촬영
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UV-SHARE-01: Victory Share Card */}
      {step === 'share' && (
        <div style={{ position: 'absolute', inset: 0, background: '#e8e8e8' }} className="rise">
          <div style={{ position: 'absolute', top: '58px', left: '26px', right: '26px', bottom: '96px', background: '#fff', border: '1px solid #111', padding: '24px 22px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#111', letterSpacing: '.14em' }}>FANDOM CONQUEST</div>
              <span style={{ width: '9px', height: '9px', background: '#2f6bff' }}></span>
            </div>
            <div style={{ font: "400 10px 'IBM Plex Mono', monospace", color: '#999', marginTop: '40px' }}>CONQUERED</div>
            <div style={{ font: "600 40px/1 'Pretendard'", color: '#111', letterSpacing: '-.04em', marginTop: '8px' }}>마포구</div>
            <div style={{ font: "500 15px 'Pretendard'", color: '#2f6bff', marginTop: '10px' }}>뉴진스 · 버니즈</div>
            <div style={{ borderTop: '1px solid #111', borderBottom: '1px solid #111', marginTop: '26px', padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div><div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999' }}>점유율</div><div style={{ font: "600 26px 'Pretendard'", color: '#111', fontVariantNumeric: 'tabular-nums', letterSpacing: '-.02em' }}>63.1<span style={{ fontSize: '14px' }}>%</span></div></div>
              <div style={{ textAlign: 'right' }}><div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999' }}>상승</div><div style={{ font: "600 20px 'Pretendard'", color: '#111' }}>▲ 8.2</div></div>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ font: "500 11px 'Pretendard'", color: '#111' }}>@버니즈덕후</span>
              <span style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999' }}>2026.07.22</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '26px', right: '26px', bottom: '30px', display: 'flex', gap: '9px' }}>
            <div className="tapzone" style={{ flex: 1, height: '46px', border: '1.5px solid #111', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 12px 'Pretendard'", color: '#fff' }}>인스타 스토리</div>
            <div className="tapzone" style={{ flex: 1, height: '46px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 12px 'Pretendard'", color: '#111' }}>X 공유</div>
            <div onClick={handleClose} className="tapzone" style={{ width: '46px', height: '46px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><path d="M12 3v12M8 8l4-4 4 4M5 15v4h14v-4" /></svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

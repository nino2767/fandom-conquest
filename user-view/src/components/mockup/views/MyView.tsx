'use client';

import React, { useState } from 'react';

export default function MyView() {
  const [subView, setSubView] = useState<'main' | 'fandom' | 'history' | 'notif' | 'setting' | 'push'>('main');
  const [historyTab, setHistoryTab] = useState<'all' | 'approved' | 'rejected'>('all');

  // SubView 1: Fandom Management with 7-day cooldown (m1b)
  if (subView === 'fandom') {
    return (
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
        <div style={{ position: 'absolute', top: '50px', left: '16px', right: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={() => setSubView('main')} className="tapzone" style={{ width: '34px', height: '34px', border: '2px solid #22201c', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: '#22201c' }}>‹</div>
          <div style={{ font: "800 14px 'Pretendard'", color: '#22201c' }}>선호 팬덤 관리</div>
          <div style={{ width: '34px' }}></div>
        </div>
        <div style={{ position: 'absolute', top: '100px', left: '16px', right: '16px', border: '2px solid #c0492f', borderRadius: '12px', padding: '11px 13px', background: '#fdf6f4' }}>
          <div style={{ display: 'flex', gap: '9px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '15px' }}>⏳</span>
            <div>
              <div style={{ font: "800 11.5px 'Pretendard'", color: '#c0492f' }}>메인 팬덤은 7일에 한 번만 변경할 수 있어요</div>
              <div style={{ font: "600 10px 'Pretendard'", color: '#a06', marginTop: '3px' }}>최근 변경: 07.10 · 다음 변경 가능일 <b>07.24</b></div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: '16px', right: '16px', bottom: '24px' }}>
          <div style={{ height: '50px', borderRadius: '12px', background: '#e8e5dc', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 13.5px 'Pretendard'", color: '#a29b8a' }}>07.24부터 변경 가능</div>
        </div>
      </div>
    );
  }

  // SubView 2: Receipt History (m1c)
  if (subView === 'history') {
    return (
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
        <div style={{ position: 'absolute', top: '50px', left: '16px', right: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={() => setSubView('main')} className="tapzone" style={{ width: '34px', height: '34px', border: '2px solid #22201c', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: '#22201c' }}>‹</div>
          <div style={{ font: "800 14px 'Pretendard'", color: '#22201c' }}>인증 내역</div>
          <div style={{ width: '34px' }}></div>
        </div>
        <div style={{ position: 'absolute', top: '100px', left: '16px', right: '16px', display: 'flex', gap: '7px' }}>
          <span
            onClick={() => setHistoryTab('all')}
            className="tapzone"
            style={{
              padding: '7px 12px',
              border: '2px solid #22201c',
              borderRadius: '10px',
              background: historyTab === 'all' ? '#22201c' : '#fff',
              color: historyTab === 'all' ? '#fff' : '#22201c',
              font: "800 11px 'Pretendard'",
            }}
          >
            전체 42
          </span>
          <span
            onClick={() => setHistoryTab('approved')}
            className="tapzone"
            style={{
              padding: '7px 12px',
              border: '2px solid #22201c',
              borderRadius: '10px',
              background: historyTab === 'approved' ? '#22201c' : '#fff',
              color: historyTab === 'approved' ? '#fff' : '#22201c',
              font: "800 11px 'Pretendard'",
            }}
          >
            승인 38
          </span>
          <span
            onClick={() => setHistoryTab('rejected')}
            className="tapzone"
            style={{
              padding: '7px 12px',
              border: '2px solid #c0492f',
              borderRadius: '10px',
              background: historyTab === 'rejected' ? '#c0492f' : '#fff',
              color: historyTab === 'rejected' ? '#fff' : '#c0492f',
              font: "800 11px 'Pretendard'",
            }}
          >
            반려 3
          </span>
        </div>
        <div style={{ position: 'absolute', top: '152px', left: '16px', right: '16px', bottom: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '9px' }} className="scroll-none">
          {(historyTab === 'all' || historyTab === 'approved') && (
            <>
              <div style={{ border: '2px solid #22201c', borderRadius: '12px', padding: '11px 13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ font: "800 12.5px 'Pretendard'", color: '#22201c' }}>어반소스 × 안유진 생일카페</span><span style={{ padding: '3px 8px', border: '1.5px solid #00806f', borderRadius: '7px', font: "800 9.5px 'Pretendard'", color: '#00806f' }}>승인</span></div>
                <div style={{ font: "600 10.5px 'Pretendard'", color: '#8a8272', marginTop: '4px' }}>07.22 14:03 · 성동구 · 기여 <b style={{ color: '#00806f' }}>+0.4%</b></div>
              </div>
              <div style={{ border: '2px solid #22201c', borderRadius: '12px', padding: '11px 13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ font: "800 12.5px 'Pretendard'", color: '#22201c' }}>무신사 테라스 팝업</span><span style={{ padding: '3px 8px', border: '1.5px solid #00806f', borderRadius: '7px', font: "800 9.5px 'Pretendard'", color: '#00806f' }}>승인</span></div>
                <div style={{ font: "600 10.5px 'Pretendard'", color: '#8a8272', marginTop: '4px' }}>07.19 16:44 · 마포구 · 기여 <b style={{ color: '#00806f' }}>+0.4%</b></div>
              </div>
            </>
          )}

          {(historyTab === 'all' || historyTab === 'rejected') && (
            <div style={{ border: '2px solid #c0492f', borderRadius: '12px', padding: '11px 13px', background: '#fdf6f4' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ font: "800 12.5px 'Pretendard'", color: '#22201c' }}>성수 연방극장 팝업</span><span style={{ padding: '3px 8px', border: '1.5px solid #c0492f', borderRadius: '7px', font: "800 9.5px 'Pretendard'", color: '#c0492f' }}>반려</span></div>
              <div style={{ font: "600 10.5px 'Pretendard'", color: '#c0492f', marginTop: '4px' }}>사유: 영수증 최신성 만료 (7일 초과)</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // SubView 3: Notification Center (m1d)
  if (subView === 'notif') {
    return (
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
        <div style={{ position: 'absolute', top: '50px', left: '16px', right: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={() => setSubView('main')} className="tapzone" style={{ width: '34px', height: '34px', border: '2px solid #22201c', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: '#22201c' }}>‹</div>
          <div style={{ font: "900 18px 'Pretendard'", color: '#22201c' }}>알림 센터</div>
          <div onClick={() => setSubView('push')} className="tapzone" style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '4px 8px', border: '1.5px solid #22201c', borderRadius: '7px', font: "700 10.5px 'Pretendard'", color: '#22201c', background: '#fffbe8' }}>
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
    );
  }

  // SubView 4: Push Settings (m1e, m1f)
  if (subView === 'setting' || subView === 'push') {
    return (
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
        <div style={{ position: 'absolute', top: '50px', left: '16px', right: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={() => setSubView('notif')} className="tapzone" style={{ width: '34px', height: '34px', border: '2px solid #22201c', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: '#22201c' }}>‹</div>
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
    );
  }

  // Main My Page (m1a)
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ font: "900 20px 'Pretendard'", color: '#22201c' }}>MY</div>
      </div>
      <div style={{ position: 'absolute', top: '98px', left: '16px', right: '16px', border: '2px solid #22201c', borderRadius: '13px', padding: '13px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
          <div style={{ width: '52px', height: '52px', border: '3px solid #22201c', borderRadius: '50%', background: '#2f6bff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '23px', flex: 'none' }}>🐰</div>
          <div style={{ flex: 1 }}><div style={{ font: "900 15px 'Pretendard'", color: '#22201c' }}>버니즈덕후 <span style={{ fontSize: '11px' }}>👑</span></div><div style={{ font: "600 10.5px 'Pretendard'", color: '#8a8272', marginTop: '2px' }}>💙 뉴진스 · 가입 D+45일</div></div>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <div style={{ flex: 1, border: '2px solid #22201c', borderRadius: '10px', padding: '8px', textAlign: 'center' }}><div style={{ font: "900 15px 'Pretendard'", color: '#22201c' }}>42</div><div style={{ font: "700 9px 'Pretendard'", color: '#8a8272' }}>인증 성공</div></div>
          <div style={{ flex: 1, border: '2px solid #22201c', borderRadius: '10px', padding: '8px', textAlign: 'center' }}><div style={{ font: "900 15px 'Pretendard'", color: '#22201c' }}>4</div><div style={{ font: "700 9px 'Pretendard'", color: '#8a8272' }}>획득 뱃지</div></div>
          <div style={{ flex: 1, border: '2px solid #22201c', borderRadius: '10px', padding: '8px', textAlign: 'center' }}><div style={{ font: "900 15px 'Pretendard'", color: '#22201c' }}>3곳</div><div style={{ font: "700 9px 'Pretendard'", color: '#8a8272' }}>점령 기여</div></div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: '266px', left: '16px', right: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}><span style={{ font: "800 12px 'Pretendard'", color: '#22201c' }}>🏆 수호신 뱃지 수집함</span><span style={{ font: "800 11px 'Pretendard'", color: '#c98a00' }}>4/5</span></div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1, border: '2px solid #22201c', borderRadius: '11px', padding: '8px 3px', textAlign: 'center', background: '#fffbe8' }}><div style={{ fontSize: '17px' }}>👑</div><div style={{ font: "700 8px 'Pretendard'", color: '#22201c', marginTop: '2px' }}>마포 수호신</div></div>
          <div style={{ flex: 1, border: '2px solid #22201c', borderRadius: '11px', padding: '8px 3px', textAlign: 'center' }}><div style={{ fontSize: '17px' }}>🛡️</div><div style={{ font: "700 8px 'Pretendard'", color: '#22201c', marginTop: '2px' }}>개척자</div></div>
          <div style={{ flex: 1, border: '2px solid #22201c', borderRadius: '11px', padding: '8px 3px', textAlign: 'center' }}><div style={{ fontSize: '17px' }}>🔥</div><div style={{ font: "700 8px 'Pretendard'", color: '#22201c', marginTop: '2px' }}>역전의주역</div></div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: '394px', left: '16px', right: '16px', bottom: '16px', overflowY: 'auto' }} className="scroll-none">
        <div onClick={() => setSubView('fandom')} className="tapzone" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 4px', borderBottom: '1.5px solid #ececec' }}><span style={{ font: "700 12.5px 'Pretendard'", color: '#22201c' }}>💗 선호 팬덤 관리</span><span style={{ font: "700 12px 'Pretendard'", color: '#8a8272' }}>›</span></div>
        <div onClick={() => setSubView('history')} className="tapzone" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 4px', borderBottom: '1.5px solid #ececec' }}><span style={{ font: "700 12.5px 'Pretendard'", color: '#22201c' }}>🧾 인증 내역 히스토리</span><span style={{ font: "700 12px 'Pretendard'", color: '#8a8272' }}>›</span></div>
        <div onClick={() => setSubView('notif')} className="tapzone" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 4px', borderBottom: '1.5px solid #ececec' }}><span style={{ font: "700 12.5px 'Pretendard'", color: '#22201c' }}>🔔 알림 센터</span><span style={{ font: "700 12px 'Pretendard'", color: '#8a8272' }}>›</span></div>
        <div onClick={() => setSubView('push')} className="tapzone" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 4px' }}><span style={{ font: "700 12.5px 'Pretendard'", color: '#22201c' }}>⚙️ 푸시 알림 설정</span><span style={{ font: "700 12px 'Pretendard'", color: '#8a8272' }}>›</span></div>
      </div>
    </div>
  );
}

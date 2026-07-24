'use client';

import React, { useState } from 'react';

export default function MyView() {
  const [subView, setSubView] = useState<'main' | 'fandom' | 'history' | 'notif' | 'setting' | 'push'>('main');
  const [historyTab, setHistoryTab] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');

  // UV-MY-02: Fandom Management
  if (subView === 'fandom') {
    return (
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
        <div style={{ position: 'absolute', top: '50px', left: '18px', right: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={() => setSubView('main')} className="tapzone" style={{ width: '32px', height: '32px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" /></svg>
          </div>
          <div style={{ font: "600 14px 'Pretendard'", color: '#111' }}>선호 팬덤 관리</div>
          <div style={{ width: '32px' }}></div>
        </div>
        <div style={{ position: 'absolute', top: '96px', left: '18px', right: '18px', border: '1px solid #111', padding: '12px 14px' }}>
          <div style={{ display: 'flex', gap: '9px', alignItems: 'flex-start' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.4" style={{ flex: 'none' }}><path d="M6 3h12M6 21h12M7 3c0 5 4 6 5 9 1-3 5-4 5-9M7 21c0-5 4-6 5-9 1 3 5 4 5 9" /></svg>
            <div>
              <div style={{ font: "600 11.5px 'Pretendard'", color: '#111' }}>메인 팬덤은 7일에 한 번만 변경</div>
              <div style={{ font: "400 9.5px 'IBM Plex Mono', monospace", color: '#999', marginTop: '3px' }}>LAST 07.10 · NEXT 07.24</div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '180px', left: '18px', right: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '42px', padding: '0 13px', border: '1px solid #111' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="M16 16l5 5" /></svg>
            <span style={{ font: "400 11px 'IBM Plex Mono', monospace", color: '#b5b5b5' }}>SEARCH</span>
          </div>
          <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', margin: '14px 0 8px' }}>대표 메인 (1)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '11px 13px', border: '1.5px solid #111' }}>
            <span style={{ width: '18px', height: '18px', border: '1.5px solid #111', borderRadius: '50%', boxShadow: 'inset 0 0 0 3px #fff', background: '#111' }}></span>
            <span style={{ width: '30px', height: '30px', border: '1px solid #111', position: 'relative' }}><span style={{ position: 'absolute', top: '4px', left: '4px', width: '6px', height: '6px', background: '#2f6bff' }}></span></span>
            <div style={{ flex: 1 }}><div style={{ font: "600 12.5px 'Pretendard'", color: '#111' }}>뉴진스 · 버니즈</div></div>
            <span style={{ padding: '3px 8px', border: '1px solid #111', background: '#111', font: "500 9px 'Pretendard'", color: '#fff' }}>대표</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '11px 13px', border: '1px solid #e0e0e0', marginTop: '8px' }}>
            <span style={{ width: '18px', height: '18px', border: '1.5px solid #c8c8c8', borderRadius: '50%' }}></span>
            <span style={{ width: '30px', height: '30px', border: '1px solid #111', position: 'relative' }}><span style={{ position: 'absolute', top: '4px', left: '4px', width: '6px', height: '6px', background: '#e63b83' }}></span></span>
            <div style={{ flex: 1 }}><div style={{ font: "500 12.5px 'Pretendard'", color: '#111' }}>에스파 · 마이</div></div>
          </div>
          <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', margin: '14px 0 8px' }}>응원 (다중)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '11px 13px', border: '1px solid #111' }}>
            <span style={{ width: '18px', height: '18px', border: '1.5px solid #111', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M4 12l5 5L20 6" /></svg>
            </span>
            <span style={{ width: '30px', height: '30px', border: '1px solid #111', position: 'relative' }}><span style={{ position: 'absolute', top: '4px', left: '4px', width: '6px', height: '6px', background: '#f59f00' }}></span></span>
            <div style={{ flex: 1 }}><div style={{ font: "500 12.5px 'Pretendard'", color: '#111' }}>아이브 · 다이브</div></div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: '18px', right: '18px', bottom: '26px', height: '48px', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "500 12.5px 'Pretendard'", color: '#b5b5b5' }}>07.24부터 변경 가능</div>
      </div>
    );
  }

  // UV-MY-03: History
  if (subView === 'history') {
    const items = [
      { name: '어반소스 × 안유진 생일카페', status: '승인', statusBg: false, meta: '07.22 14:03 · 성동구 · +0.4%' },
      { name: '언더스탠드 카페', status: '검수 대기', statusBg: true, meta: '07.22 11:20 · 성동구 · 10분 내 결과' },
      { name: '성수 연방극장 팝업', status: '반려', statusBg: false, meta: '', reason: '사유: 영수증 최신성 만료 (7일 초과)', borderLeft: true },
      { name: '무신사 테라스 팝업', status: '승인', statusBg: false, meta: '07.19 16:44 · 마포구 · +0.4%' },
    ];
    return (
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
        <div style={{ position: 'absolute', top: '50px', left: '18px', right: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={() => setSubView('main')} className="tapzone" style={{ width: '32px', height: '32px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" /></svg>
          </div>
          <div style={{ font: "600 14px 'Pretendard'", color: '#111' }}>인증 내역</div>
          <div style={{ width: '32px' }}></div>
        </div>
        <div style={{ position: 'absolute', top: '96px', left: '18px', right: '18px', display: 'flex', gap: '7px' }}>
          {[{ k: 'all' as const, l: '전체 42' }, { k: 'approved' as const, l: '승인 38' }, { k: 'pending' as const, l: '대기 1' }, { k: 'rejected' as const, l: '반려 3' }].map((f) => (
            <span key={f.k} onClick={() => setHistoryTab(f.k)} className="tapzone" style={{ padding: '6px 11px', border: historyTab === f.k ? '1px solid #111' : '1px solid #e0e0e0', background: historyTab === f.k ? '#111' : '#fff', color: historyTab === f.k ? '#fff' : '#555', font: historyTab === f.k ? "500 10.5px 'Pretendard'" : "400 10.5px 'Pretendard'" }}>{f.l}</span>
          ))}
        </div>
        <div style={{ position: 'absolute', top: '144px', left: '18px', right: '18px', bottom: '24px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '9px' }} className="scroll-none">
          {items.map((it, i) => (
            <div key={i} style={{ border: it.statusBg || it.borderLeft ? '1px solid #111' : '1px solid #e0e0e0', borderLeftWidth: it.borderLeft ? '3px' : undefined, padding: '11px 13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ font: "500 12.5px 'Pretendard'", color: '#111' }}>{it.name}</span>
                <span style={{ padding: '2px 7px', border: '1px solid #111', background: it.statusBg ? '#111' : '#fff', font: "500 9px 'IBM Plex Mono', monospace", color: it.statusBg ? '#fff' : '#111' }}>{it.status}</span>
              </div>
              {it.meta && <div style={{ font: "400 9.5px 'IBM Plex Mono', monospace", color: '#999', marginTop: '5px' }}>{it.meta}</div>}
              {it.reason && <div style={{ font: "400 10.5px 'Pretendard'", color: '#666', marginTop: '5px' }}>{it.reason}</div>}
              {it.borderLeft && <div className="tapzone" style={{ display: 'inline-flex', marginTop: '8px', padding: '5px 10px', border: '1px solid #111', font: "500 10.5px 'Pretendard'", color: '#111' }}>다시 인증</div>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // UV-NOTIF-01: Notifications
  if (subView === 'notif') {
    const notifs = [
      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><path d="M13 2L3 14h7l-1 8 10-12h-7z" /></svg>, title: '성동구 점령지가 역전당했어요', meta: '에스파 1위 · JUST NOW', unread: true },
      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><path d="M12 3l7 4v6c0 4-3 6-7 8-4-2-7-4-7-8V7z" /></svg>, title: '언더스탠드 카페 거점이 위태로워요', meta: '격차 4.2%p · 12MIN', unread: true },
      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.4"><path d="M3 8l4 3 5-6 5 6 4-3v9H3z" /></svg>, title: '수호신 칭호가 위협받고 있어요', meta: '1건 차 추격 · 1HR', unread: false },
      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><path d="M4 12l5 5L20 6" /></svg>, title: '영수증 인증 승인 (+0.4%)', meta: '어반소스 생일카페 · 3HR', unread: false },
      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><path d="M4 6h16M4 12h16M4 18h10" /></svg>, title: '[신규 성지] 새 거점 오픈', meta: '뉴진스 팝업 · 성수 · YESTERDAY', unread: false },
    ];
    return (
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
        <div style={{ position: 'absolute', top: '50px', left: '18px', right: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ font: "600 19px 'Pretendard'", color: '#111' }}>알림</div>
          <span onClick={() => setSubView('main')} className="tapzone" style={{ font: "400 10.5px 'Pretendard'", color: '#999' }}>모두 읽음</span>
        </div>
        <div style={{ position: 'absolute', top: '94px', left: '18px', right: '18px', bottom: '24px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '9px' }} className="scroll-none">
          {notifs.map((n, i) => (
            <div key={i} style={{ border: n.unread ? '1px solid #111' : '1px solid #e0e0e0', borderLeftWidth: n.unread ? '3px' : '1px', padding: '11px 13px' }}>
              <div style={{ display: 'flex', gap: '9px' }}>
                <div style={{ flex: 'none' }}>{n.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ font: "500 12px 'Pretendard'", color: '#111' }}>{n.title}</div>
                  <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginTop: '2px' }}>{n.meta}</div>
                </div>
                {n.unread && <span style={{ width: '6px', height: '6px', background: '#111', flex: 'none', marginTop: '4px' }}></span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // UV-MY-05: Settings
  if (subView === 'setting') {
    return (
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
        <div style={{ position: 'absolute', top: '50px', left: '18px', right: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={() => setSubView('main')} className="tapzone" style={{ width: '32px', height: '32px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" /></svg>
          </div>
          <div style={{ font: "600 14px 'Pretendard'", color: '#111' }}>설정</div>
          <div style={{ width: '32px' }}></div>
        </div>
        <div style={{ position: 'absolute', top: '100px', left: '18px', right: '18px' }}>
          <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginBottom: '6px' }}>계정</div>
          <div style={{ border: '1px solid #111' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 14px', borderBottom: '1px solid #f0f0f0' }}><span style={{ font: "400 12px 'Pretendard'", color: '#111' }}>연결된 계정</span><span style={{ font: "400 10.5px 'IBM Plex Mono', monospace", color: '#999' }}>KAKAO ›</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 14px' }}><span style={{ font: "400 12px 'Pretendard'", color: '#111' }}>프로필 관리</span><span style={{ font: "400 11px 'Pretendard'", color: '#999' }}>›</span></div>
          </div>
          <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', margin: '14px 0 6px' }}>서비스</div>
          <div style={{ border: '1px solid #111' }}>
            <div onClick={() => setSubView('push')} className="tapzone" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 14px', borderBottom: '1px solid #f0f0f0' }}><span style={{ font: "400 12px 'Pretendard'", color: '#111' }}>푸시 알림 세부 설정</span><span style={{ font: "400 11px 'Pretendard'", color: '#999' }}>›</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 14px', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ font: "400 12px 'Pretendard'", color: '#111' }}>위치 서비스</span>
              <span style={{ width: '40px', height: '22px', border: '1px solid #111', background: '#111', position: 'relative' }}><span style={{ position: 'absolute', right: '2px', top: '2px', width: '16px', height: '16px', background: '#fff' }}></span></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 14px' }}><span style={{ font: "400 12px 'Pretendard'", color: '#111' }}>언어</span><span style={{ font: "400 10.5px 'IBM Plex Mono', monospace", color: '#999' }}>한국어 ›</span></div>
          </div>
          <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', margin: '14px 0 6px' }}>기타</div>
          <div style={{ border: '1px solid #111' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 14px', borderBottom: '1px solid #f0f0f0' }}><span style={{ font: "400 12px 'Pretendard'", color: '#111' }}>공지사항</span><span style={{ font: "400 11px 'Pretendard'", color: '#999' }}>›</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 14px', borderBottom: '1px solid #f0f0f0' }}><span style={{ font: "400 12px 'Pretendard'", color: '#111' }}>버전 정보</span><span style={{ font: "400 10.5px 'IBM Plex Mono', monospace", color: '#999' }}>v0.1.0</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 14px' }}><span style={{ font: "400 12px 'Pretendard'", color: '#111' }}>로그아웃</span><span style={{ font: "400 11px 'Pretendard'", color: '#999' }}>›</span></div>
          </div>
        </div>
      </div>
    );
  }

  // UV-MY-06: Push Settings
  if (subView === 'push') {
    const ToggleOn = <span style={{ width: '40px', height: '22px', border: '1px solid #111', background: '#111', position: 'relative', flex: 'none' }}><span style={{ position: 'absolute', right: '2px', top: '2px', width: '16px', height: '16px', background: '#fff' }}></span></span>;
    const ToggleOff = <span style={{ width: '40px', height: '22px', border: '1px solid #c8c8c8', position: 'relative', flex: 'none' }}><span style={{ position: 'absolute', left: '2px', top: '2px', width: '16px', height: '16px', background: '#c8c8c8' }}></span></span>;
    return (
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
        <div style={{ position: 'absolute', top: '50px', left: '18px', right: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={() => setSubView('setting')} className="tapzone" style={{ width: '32px', height: '32px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" /></svg>
          </div>
          <div style={{ font: "600 14px 'Pretendard'", color: '#111' }}>푸시 알림 설정</div>
          <div style={{ width: '32px' }}></div>
        </div>
        <div style={{ position: 'absolute', top: '100px', left: '18px', right: '18px' }}>
          <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', marginBottom: '6px' }}>영토전 게임</div>
          <div style={{ border: '1px solid #111' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderBottom: '1px solid #f0f0f0' }}>
              <div><div style={{ font: "400 12px 'Pretendard'", color: '#111' }}>영토 뒤집힘 알림</div><div style={{ font: "400 8.5px 'IBM Plex Mono', monospace", color: '#999', marginTop: '2px' }}>30MIN COOLDOWN</div></div>
              {ToggleOn}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px' }}>
              <div><div style={{ font: "400 12px 'Pretendard'", color: '#111' }}>성지 방어 · 수호신</div><div style={{ font: "400 8.5px 'IBM Plex Mono', monospace", color: '#999', marginTop: '2px' }}>격차 5%p 이하</div></div>
              {ToggleOn}
            </div>
          </div>
          <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', margin: '14px 0 6px' }}>인증 · 활동</div>
          <div style={{ border: '1px solid #111' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px' }}>
              <div><div style={{ font: "400 12px 'Pretendard'", color: '#111' }}>영수증 검수 결과</div><div style={{ font: "400 8.5px 'IBM Plex Mono', monospace", color: '#999', marginTop: '2px' }}>승인/반려 판정</div></div>
              {ToggleOn}
            </div>
          </div>
          <div style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999', margin: '14px 0 6px' }}>혜택 · 마케팅</div>
          <div style={{ border: '1px solid #111' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px' }}>
              <div><div style={{ font: "400 12px 'Pretendard'", color: '#111' }}>신규 성지 · 이벤트</div><div style={{ font: "400 8.5px 'IBM Plex Mono', monospace", color: '#999', marginTop: '2px' }}>야간 미발송</div></div>
              {ToggleOff}
            </div>
          </div>
          <div style={{ border: '1px solid #e0e0e0', padding: '11px 13px', marginTop: '14px', font: "400 10px/1.6 'Pretendard'", color: '#666' }}>야간(21~08시)에는 마케팅 푸시가 발송되지 않아요. 게임 알림은 실시간 전달됩니다.</div>
        </div>
      </div>
    );
  }

  // UV-MY-01: Main Profile
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50px', left: '18px', right: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ font: "600 19px 'Pretendard'", color: '#111' }}>MY</div>
        <div onClick={() => setSubView('setting')} className="tapzone" style={{ width: '32px', height: '32px', border: '1px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" /></svg>
        </div>
      </div>

      {/* Profile Card */}
      <div style={{ position: 'absolute', top: '96px', left: '18px', right: '18px', border: '1px solid #111', padding: '13px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
          <div style={{ width: '48px', height: '48px', border: '1px solid #111', borderRadius: '50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.4"><path d="M9 3c-1 2-1 4 0 6M15 3c1 2 1 4 0 6M12 9a5 6 0 0 0-5 6c0 3 2 5 5 5s5-2 5-5a5 6 0 0 0-5-6Z" /></svg>
            <span style={{ position: 'absolute', top: 0, right: 0, width: '7px', height: '7px', background: '#2f6bff' }}></span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ font: "600 15px 'Pretendard'", color: '#111' }}>버니즈덕후</div>
            <div style={{ font: "400 9.5px 'IBM Plex Mono', monospace", color: '#999', marginTop: '2px' }}>뉴진스 · D+45</div>
          </div>
          <span style={{ font: "400 10.5px 'Pretendard'", color: '#999' }}>편집 ›</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          {[{ v: '42', l: '인증' }, { v: '4', l: '뱃지' }, { v: '3', l: '점령' }].map((s, i) => (
            <div key={i} style={{ flex: 1, border: '1px solid #e0e0e0', padding: '8px', textAlign: 'center' }}>
              <div style={{ font: "600 15px 'Pretendard'", color: '#111' }}>{s.v}</div>
              <div style={{ font: "400 8.5px 'IBM Plex Mono', monospace", color: '#999' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div style={{ position: 'absolute', top: '250px', left: '18px', right: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
          <span style={{ font: "600 12px 'Pretendard'", color: '#111' }}>수호신 뱃지</span>
          <span style={{ font: "400 9px 'IBM Plex Mono', monospace", color: '#999' }}>4/5</span>
        </div>
        <div style={{ display: 'flex', gap: '7px' }}>
          {[
            <svg key="b0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.3"><path d="M3 8l4 3 5-6 5 6 4-3v9H3z" /></svg>,
            <svg key="b1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.3"><path d="M12 3l7 4v6c0 4-3 6-7 8-4-2-7-4-7-8V7z" /></svg>,
            <svg key="b2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.3"><path d="M12 3v18M5 10l7-7 7 7" /></svg>,
            <svg key="b3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.3"><path d="M12 2C7 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-3-8-8-8Z" /></svg>,
          ].map((icon, i) => (
            <div key={i} style={{ flex: 1, border: '1px solid #111', padding: '8px 3px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>{icon}</div>
          ))}
          <div style={{ flex: 1, border: '1px dashed #c8c8c8', padding: '8px 3px', textAlign: 'center' }}>
            <div style={{ font: "400 13px 'Pretendard'", color: '#c8c8c8' }}>?</div>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div style={{ position: 'absolute', top: '356px', left: '18px', right: '18px', bottom: '10px', overflow: 'hidden' }}>
        {[
          { label: '선호 팬덤 관리', view: 'fandom' as const },
          { label: '인증 내역 히스토리', view: 'history' as const },
          { label: '알림 설정', view: 'notif' as const },
          { label: '공지사항 · 문의', view: 'setting' as const },
        ].map((m, i) => (
          <div key={i} onClick={() => setSubView(m.view)} className="tapzone" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 2px', borderBottom: i < 3 ? '1px solid #f0f0f0' : 'none' }}>
            <span style={{ font: "500 12.5px 'Pretendard'", color: '#111' }}>{m.label}</span>
            <span style={{ font: "400 11px 'Pretendard'", color: '#999' }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

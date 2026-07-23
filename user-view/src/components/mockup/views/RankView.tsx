'use client';

import React, { useState } from 'react';

export default function RankView() {
  const [rankTab, setRankTab] = useState<'personal' | 'fandom'>('personal');
  const [showDetail, setShowDetail] = useState(false);

  if (showDetail) {
    // w1c: Personal Contribution Detail
    return (
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', zIndex: 100, background: '#fff' }} className="rise">
        <div style={{ position: 'absolute', top: '50px', left: '16px', right: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div onClick={() => setShowDetail(false)} className="tapzone" style={{ width: '34px', height: '34px', border: '2px solid #22201c', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: '#22201c' }}>‹</div>
          <div style={{ font: "800 14px 'Pretendard'", color: '#22201c' }}>개인 기여도 상세</div>
          <div style={{ width: '34px' }}></div>
        </div>

        <div style={{ position: 'absolute', top: '100px', left: '16px', right: '16px', border: '2px solid #22201c', borderRadius: '13px', padding: '13px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
            <div style={{ width: '50px', height: '50px', border: '2.5px solid #22201c', borderRadius: '50%', background: '#2f6bff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 16px 'Pretendard'", color: '#fff', flex: 'none' }}>덕</div>
            <div style={{ flex: 1 }}>
              <div style={{ font: "900 15px 'Pretendard'", color: '#22201c' }}>덕질마스터 <span style={{ fontSize: '11px' }}>👑</span></div>
              <div style={{ font: "600 10.5px 'Pretendard'", color: '#8a8272', marginTop: '2px' }}>💙 메인 팬덤: 뉴진스 · 가입 D+45일</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <div style={{ flex: 1, border: '2px solid #22201c', borderRadius: '10px', padding: '8px', textAlign: 'center' }}><div style={{ font: "900 16px 'Pretendard'", color: '#22201c' }}>42</div><div style={{ font: "700 9px 'Pretendard'", color: '#8a8272' }}>누적 인증</div></div>
            <div style={{ flex: 1, border: '2px solid #22201c', borderRadius: '10px', padding: '8px', textAlign: 'center' }}><div style={{ font: "900 16px 'Pretendard'", color: '#22201c' }}>#12</div><div style={{ font: "700 9px 'Pretendard'", color: '#8a8272' }}>개인 랭킹</div></div>
            <div style={{ flex: 1, border: '2px solid #22201c', borderRadius: '10px', padding: '8px', textAlign: 'center' }}><div style={{ font: "900 16px 'Pretendard'", color: '#22201c' }}>2</div><div style={{ font: "700 9px 'Pretendard'", color: '#8a8272' }}>수호신 칭호</div></div>
          </div>
        </div>

        <div style={{ position: 'absolute', top: '268px', left: '16px', right: '16px' }}>
          <div style={{ font: "800 12px 'Pretendard'", color: '#22201c', marginBottom: '8px' }}>🗺️ 주요 구별 우리 팬덤 기여 지분율</div>
          <div style={{ border: '2px solid #22201c', borderRadius: '12px', padding: '11px 13px' }}>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', font: "700 11px 'Pretendard'" }}><span style={{ color: '#22201c' }}>마포구</span><span style={{ color: '#2f6bff' }}>내 지분 18.2%</span></div>
              <div style={{ display: 'flex', height: '8px', border: '1.5px solid #22201c', borderRadius: '4px', overflow: 'hidden', marginTop: '5px' }}><div style={{ width: '18.2%', background: '#2f6bff' }}></div><div style={{ flex: 1, background: '#e8effc' }}></div></div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', font: "700 11px 'Pretendard'" }}><span style={{ color: '#22201c' }}>성동구</span><span style={{ color: '#2f6bff' }}>내 지분 11.6%</span></div>
              <div style={{ display: 'flex', height: '8px', border: '1.5px solid #22201c', borderRadius: '4px', overflow: 'hidden', marginTop: '5px' }}><div style={{ width: '11.6%', background: '#2f6bff' }}></div><div style={{ flex: 1, background: '#e8effc' }}></div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
      {/* Top Header & Tab switcher */}
      <div style={{ position: 'absolute', top: '50px', left: '16px', right: '16px' }}>
        <div style={{ font: "900 20px 'Pretendard'", color: '#22201c', letterSpacing: '-.02em' }}>랭킹</div>
        <div style={{ display: 'flex', marginTop: '11px', border: '2px solid #22201c', borderRadius: '10px', overflow: 'hidden' }}>
          <div
            onClick={() => setRankTab('personal')}
            className="tapzone"
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '7px 0',
              background: rankTab === 'personal' ? '#22201c' : '#fff',
              color: rankTab === 'personal' ? '#fff' : '#22201c',
              font: "800 11.5px 'Pretendard'",
            }}
          >
            누적 개인 랭킹
          </div>
          <div
            onClick={() => setRankTab('fandom')}
            className="tapzone"
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '7px 0',
              background: rankTab === 'fandom' ? '#22201c' : '#fff',
              color: rankTab === 'fandom' ? '#fff' : '#22201c',
              font: "800 11.5px 'Pretendard'",
              borderLeft: '2px solid #22201c',
            }}
          >
            팬덤 영토 랭킹
          </div>
        </div>
      </div>

      {rankTab === 'personal' ? (
        <>
          {/* Personal Ranking Podium Top 3 */}
          <div style={{ position: 'absolute', top: '140px', left: '16px', right: '16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ width: '48px', height: '48px', border: '2px solid #22201c', borderRadius: '50%', background: '#e64980', margin: '0 auto 5px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 15px 'Pretendard'", color: '#fff' }}>럭</div>
              <div style={{ font: "800 11px 'Pretendard'", color: '#22201c' }}>럭키팬</div>
              <div style={{ font: "700 9.5px 'Pretendard'", color: '#8a8272' }}>인증 38건</div>
              <div style={{ height: '52px', border: '2px solid #22201c', borderBottom: 'none', background: '#f3f0e8', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 16px 'Pretendard'", color: '#8a8272' }}>2</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '16px', marginBottom: '2px' }}>👑</div>
              <div style={{ width: '56px', height: '56px', border: '2.5px solid #22201c', borderRadius: '50%', background: '#2f6bff', margin: '0 auto 5px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 17px 'Pretendard'", color: '#fff', boxShadow: '3px 3px 0 rgba(34,32,28,.2)' }}>덕</div>
              <div style={{ font: "800 12px 'Pretendard'", color: '#22201c' }}>덕질마스터</div>
              <div style={{ font: "700 9.5px 'Pretendard'", color: '#8a8272' }}>인증 43건</div>
              <div style={{ height: '72px', border: '2px solid #22201c', borderBottom: 'none', background: '#ffe14d', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 19px 'Pretendard'", color: '#22201c' }}>1</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ width: '48px', height: '48px', border: '2px solid #22201c', borderRadius: '50%', background: '#f59f00', margin: '0 auto 5px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 15px 'Pretendard'", color: '#fff' }}>핀</div>
              <div style={{ font: "800 11px 'Pretendard'", color: '#22201c' }}>핀아</div>
              <div style={{ font: "700 9.5px 'Pretendard'", color: '#8a8272' }}>인증 31건</div>
              <div style={{ height: '38px', border: '2px solid #22201c', borderBottom: 'none', background: '#f0dcc8', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 15px 'Pretendard'", color: '#a5714f' }}>3</div>
            </div>
          </div>

          {/* List Rankings & My Rank */}
          <div style={{ position: 'absolute', top: '392px', left: '16px', right: '16px', bottom: '16px', borderTop: '2px solid #22201c', paddingTop: '10px', overflowY: 'auto' }} className="scroll-none">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1.5px solid #ececec' }}><span style={{ font: "900 12px 'Pretendard'", color: '#22201c', width: '22px' }}>4</span><span style={{ width: '28px', height: '28px', border: '2px solid #22201c', borderRadius: '50%', background: '#e64980', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 10px 'Pretendard'", color: '#fff' }}>모</span><div style={{ flex: 1 }}><div style={{ font: "800 12px 'Pretendard'", color: '#22201c' }}>모찌언니</div></div><span style={{ font: "700 11px 'Pretendard'", color: '#8a8272' }}>29건</span></div>
            <div
              onClick={() => setShowDetail(true)}
              className="tapzone"
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', marginTop: '6px', background: '#22201c', borderRadius: '11px' }}
            >
              <span style={{ font: "900 12px 'Pretendard'", color: '#e6a0bd', width: '26px' }}>#12</span>
              <span style={{ width: '28px', height: '28px', border: '2px solid #fff', borderRadius: '50%', background: '#2f6bff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 10px 'Pretendard'", color: '#fff' }}>나</span>
              <div style={{ flex: 1 }}>
                <div style={{ font: "800 12px 'Pretendard'", color: '#fff' }}>나 · 버니즈덕후 (상세보기 ›)</div>
                <div style={{ font: "600 9px 'Pretendard'", color: '#c9c2b2' }}>상위 4% · 이번 주 ▲3</div>
              </div>
              <span style={{ font: "800 11px 'Pretendard'", color: '#fff' }}>24건</span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Fandom Territory Ranking View */}
          <div style={{ position: 'absolute', top: '140px', left: '16px', right: '16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '12px' }} className="rise">
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ width: '48px', height: '48px', border: '2px solid #22201c', borderRadius: '50%', background: '#e64980', margin: '0 auto 5px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 13px 'Pretendard'", color: '#fff' }}>ae</div>
              <div style={{ font: "800 11px 'Pretendard'", color: '#22201c' }}>에스파</div>
              <div style={{ font: "700 9.5px 'Pretendard'", color: '#8a8272' }}>점령 7구</div>
              <div style={{ height: '52px', border: '2px solid #22201c', borderBottom: 'none', background: '#f3f0e8', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 16px 'Pretendard'", color: '#8a8272' }}>2</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '16px', marginBottom: '2px' }}>👑</div>
              <div style={{ width: '56px', height: '56px', border: '2.5px solid #22201c', borderRadius: '50%', background: '#2f6bff', margin: '0 auto 5px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 17px 'Pretendard'", color: '#fff', boxShadow: '3px 3px 0 rgba(34,32,28,.2)' }}>N</div>
              <div style={{ font: "800 12px 'Pretendard'", color: '#22201c' }}>뉴진스</div>
              <div style={{ font: "700 9.5px 'Pretendard'", color: '#2456c8' }}>점령 8구 (1위)</div>
              <div style={{ height: '72px', border: '2px solid #22201c', borderBottom: 'none', background: '#ffe14d', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 19px 'Pretendard'", color: '#22201c' }}>1</div>
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ width: '48px', height: '48px', border: '2px solid #22201c', borderRadius: '50%', background: '#f59f00', margin: '0 auto 5px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 11px 'Pretendard'", color: '#4a3708' }}>IVE</div>
              <div style={{ font: "800 11px 'Pretendard'", color: '#22201c' }}>아이브</div>
              <div style={{ font: "700 9.5px 'Pretendard'", color: '#8a8272' }}>점령 5구</div>
              <div style={{ height: '38px', border: '2px solid #22201c', borderBottom: 'none', background: '#f0dcc8', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "900 15px 'Pretendard'", color: '#a5714f' }}>3</div>
            </div>
          </div>

          {/* Fandom Territory List */}
          <div style={{ position: 'absolute', top: '392px', left: '16px', right: '16px', bottom: '16px', borderTop: '2px solid #22201c', paddingTop: '10px', overflowY: 'auto' }} className="scroll-none">
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '9px 0', borderBottom: '1.5px solid #ececec' }}>
              <span style={{ font: "900 13px 'Pretendard'", color: '#22201c', width: '14px' }}>1</span>
              <span style={{ width: '30px', height: '30px', border: '2px solid #22201c', borderRadius: '8px', background: '#2f6bff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 11px 'Pretendard'", color: '#fff' }}>N</span>
              <div style={{ flex: 1 }}>
                <div style={{ font: "800 12.5px 'Pretendard'", color: '#22201c' }}>뉴진스 · 버니즈</div>
                <div style={{ font: "600 10px 'Pretendard'", color: '#8a8272' }}>점령 8구 · 성지 42</div>
              </div>
              <span style={{ font: "700 10px 'Pretendard'", color: '#2e7d46' }}>▲1</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '9px 0', borderBottom: '1.5px solid #ececec' }}>
              <span style={{ font: "900 13px 'Pretendard'", color: '#22201c', width: '14px' }}>2</span>
              <span style={{ width: '30px', height: '30px', border: '2px solid #22201c', borderRadius: '8px', background: '#e64980', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 10px 'Pretendard'", color: '#fff' }}>ae</span>
              <div style={{ flex: 1 }}>
                <div style={{ font: "800 12.5px 'Pretendard'", color: '#22201c' }}>에스파 · 마이</div>
                <div style={{ font: "600 10px 'Pretendard'", color: '#8a8272' }}>점령 7구 · 성지 38</div>
              </div>
              <span style={{ font: "700 10px 'Pretendard'", color: '#c0492f' }}>▼1</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '9px 0' }}>
              <span style={{ font: "900 13px 'Pretendard'", color: '#22201c', width: '14px' }}>3</span>
              <span style={{ width: '30px', height: '30px', border: '2px solid #22201c', borderRadius: '8px', background: '#f59f00', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 9px 'Pretendard'", color: '#4a3708' }}>IVE</span>
              <div style={{ flex: 1 }}>
                <div style={{ font: "800 12.5px 'Pretendard'", color: '#22201c' }}>아이브 · 다이브</div>
                <div style={{ font: "600 10px 'Pretendard'", color: '#8a8272' }}>점령 5구 · 성지 29</div>
              </div>
              <span style={{ font: "700 10px 'Pretendard'", color: '#b3ad9d' }}>–</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

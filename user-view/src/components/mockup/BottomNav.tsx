'use client';

import React from 'react';

export type TabType = 'map' | 'war' | 'verif' | 'rank' | 'my' | 'onboarding';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export default function BottomNav({ currentTab, onSelectTab }: BottomNavProps) {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'map', label: '지도' },
    { id: 'war', label: '전황' },
    { id: 'verif', label: '인증' },
    { id: 'rank', label: '랭킹' },
    { id: 'my', label: 'MY' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '58px',
        background: '#fff',
        borderTop: '2px solid #22201c',
        display: 'flex',
        alignItems: 'center',
        font: "700 11px 'Pretendard', system-ui, sans-serif",
        textAlign: 'center',
        zIndex: 35,
      }}
    >
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <div
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className="tapzone"
            style={{
              flex: 1,
              color: isActive ? '#22201c' : '#b3ad9d',
              fontWeight: isActive ? 900 : 700,
              fontSize: isActive ? '12px' : '11px',
              userSelect: 'none',
            }}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
}

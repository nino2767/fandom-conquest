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
        height: '50px',
        background: '#fff',
        borderTop: '1px solid #111',
        display: 'flex',
        alignItems: 'center',
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
              color: isActive ? '#111' : '#999',
              font: isActive
                ? "600 11.5px 'Pretendard', system-ui, sans-serif"
                : "400 11px 'Pretendard', system-ui, sans-serif",
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

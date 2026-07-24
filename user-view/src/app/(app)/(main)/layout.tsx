'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/map', label: '지도' },
    { href: '/war', label: '전황' },
    { href: '/verify', label: '인증' },
    { href: '/ranking', label: '랭킹' },
    { href: '/my', label: 'MY' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '100dvh', background: '#fff', overflow: 'hidden' }}>
      {/* Page Content */}
      <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 50px)', overflow: 'hidden' }}>
        {children}
      </div>

      {/* Bottom Tab Navigation — Sharp Monochrome */}
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
          zIndex: 40,
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="tapzone"
              style={{
                flex: 1,
                textDecoration: 'none',
                color: isActive ? '#111' : '#999',
                font: isActive
                  ? "600 11.5px 'Pretendard', system-ui, sans-serif"
                  : "400 11px 'Pretendard', system-ui, sans-serif",
                userSelect: 'none',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

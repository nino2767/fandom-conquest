'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/map', label: '지도' },
    { href: '/war', label: '전황' },
    { href: '/verify', label: '인증', isPrimary: true },
    { href: '/ranking', label: '랭킹' },
    { href: '/my', label: 'MY' },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '100dvh', background: '#fff', overflow: 'hidden' }}>
      {/* Page Content */}
      <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 58px)', overflow: 'hidden' }}>
        {children}
      </div>

        {/* Bottom Fixed Tab Navigation */}
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
            zIndex: 40,
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            if (item.isPrimary) {
              return (
                <Link key={item.href} href={item.href} style={{ flex: 1, textDecoration: 'none' }} className="tapzone">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ font: "800 10.5px 'Pretendard'", color: '#22201c', background: '#ffe14d', border: '1.5px solid #22201c', padding: '2px 8px', borderRadius: '8px' }}>
                      📸 인증
                    </span>
                  </div>
                </Link>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="tapzone"
                style={{
                  flex: 1,
                  textDecoration: 'none',
                  color: isActive ? '#22201c' : '#b3ad9d',
                  fontWeight: isActive ? 900 : 700,
                  fontSize: isActive ? '12px' : '11px',
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

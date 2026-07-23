'use client';

import React from 'react';

interface PhoneShellProps {
  children: React.ReactNode;
  darkStatusBar?: boolean;
}

export default function PhoneShell({ children }: PhoneShellProps) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '100dvh', background: '#fff', overflow: 'hidden' }}>
      {children}
    </div>
  );
}

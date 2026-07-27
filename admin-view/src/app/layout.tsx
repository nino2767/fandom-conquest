"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./admin.css";
import { AdminDataProvider, useAdminData } from "@/context/AdminDataContext";

interface NavItem {
  name: string;
  href: string;
  badge?: {
    type: "black" | "gray" | "dot";
    value?: string | number;
  };
  dividerAfter?: boolean;
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoginPage = pathname === "/login";

  // 실시간 상태 데이터 연동
  const { verificationQueue, spotProposals } = useAdminData();

  // 운영정책이 금칙어관리, 시스템설정으로 분리됨
  const navItems: NavItem[] = [
    { name: "대시보드", href: "/" },
    {
      name: "인증 내역 통합 데이터",
      href: "/verification-history",
      badge: verificationQueue.length > 0 ? { type: "black", value: verificationQueue.length } : undefined,
    },
    { name: "반려 사유 프리셋", href: "/verification-presets" },
    {
      name: "성지 제보 승인",
      href: "/spot-approval",
      badge: { type: "gray", value: spotProposals.length },
    },
    {
      name: "이상 탐지",
      href: "/abuse-detection",
      badge: { type: "dot" },
    },
    { name: "유저 제재 & 소명", href: "/user-sanction", dividerAfter: true },
    { name: "장소 마스터", href: "/place-master" },
    { name: "성지 핀 관리", href: "/spot-master" },
    { name: "성지 핀 이벤트", href: "/spot-events" },
    { name: "팬덤 IP 관리", href: "/fandom-ip" },
    { name: "어드민 계정 관리", href: "/admin-accounts" },
    { name: "금칙어 관리", href: "/banned-words" },
    { name: "시스템 설정", href: "/system-settings" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="admin-body">
      {/* Mobile Top Header Bar */}
      <header className="admin-mobile-header">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={toggleMobileMenu}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              padding: 4,
            }}
            aria-label="Toggle Navigation Menu"
          >
            ☰
          </button>
          <span style={{ font: "700 13px 'Pretendard'", color: "#111" }}>
            ADMIN CONSOLE
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ font: "500 9.5px 'Pretendard'", color: "#111" }}>
            ● 실시간
          </span>
          <span
            style={{
              width: 26,
              height: 26,
              background: "#111",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              font: "600 9px 'Pretendard'",
            }}
          >
            운
          </span>
        </div>
      </header>

      <div className="admin-container">
        {/* Sidebar Navigation (dk-side 196px spec) */}
        <aside
          className={`admin-sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}
        >
          {/* Brand Section */}
          <div className="brand">
            <span className="lg">
              <svg width="13" height="13" viewBox="0 0 24 24">
                <path d="M6 2v20" stroke="#fff" strokeWidth="2.6" fill="none" />
                <path d="M6 3h13l-3 4 3 4H6z" fill="#fff" />
              </svg>
            </span>
            <span className="bt">
              팬덤 땅따먹기
              <b>ADMIN CONSOLE</b>
            </span>
          </div>

          {/* Navigation Items */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              flex: 1,
              overflowY: "auto",
            }}
          >
            {navItems.map((item) => {
              // Exact match pathname check to prevent sub-path overlap
              const isActive = pathname === item.href;

              return (
                <React.Fragment key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav ${isActive ? "on" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{item.name}</span>
                    {item.badge?.type === "black" && (
                      <span className="b-d">{item.badge.value}</span>
                    )}
                    {item.badge?.type === "gray" && (
                      <span className="b-g">{item.badge.value}</span>
                    )}
                    {item.badge?.type === "dot" && <span className="dot" />}
                  </Link>
                  {item.dividerAfter && <div className="divider" />}
                </React.Fragment>
              );
            })}
          </nav>

          {/* User Account Info Bar at Sidebar Bottom */}
          <div
            style={{
              marginTop: "auto",
              paddingTop: 12,
              borderTop: "1px solid #e7e7e7",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                background: "#111",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                font: "600 9px 'Pretendard'",
              }}
            >
              운
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  font: "500 10.5px 'Pretendard'",
                  color: "#111",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                ops@fandom.app
              </div>
            </div>
          </div>
        </aside>

        {/* Main Page Content View */}
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="ko">
      <head>
        <title>{isLoginPage ? "어드민 로그인 — 팬덤 땅따먹기 ADMIN" : "팬덤 땅따먹기 ADMIN CONSOLE"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <AdminDataProvider>
          <AdminLayoutContent>{children}</AdminLayoutContent>
        </AdminDataProvider>
      </body>
    </html>
  );
}

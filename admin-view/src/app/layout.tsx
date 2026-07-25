"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./admin.css";

interface NavItem {
  name: string;
  href: string;
  badge?: {
    type: "black" | "gray" | "dot";
    value?: string | number;
  };
  dividerAfter?: boolean;
}

const navItems: NavItem[] = [
  { name: "대시보드", href: "/" },
  { name: "인증 내역 통합 데이터", href: "/verification-history" },
  {
    name: "영수증 검수 큐",
    href: "/verification",
    badge: { type: "black", value: "24" },
  },
  { name: "반려 사유 프리셋", href: "/verification-presets" },
  {
    name: "성지 제보 승인",
    href: "/spot-approval",
    badge: { type: "gray", value: "7" },
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
  { name: "운영 정책", href: "/policy" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoginPage = pathname === "/login";

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  if (isLoginPage) {
    return (
      <html lang="ko">
        <head>
          <title>어드민 로그인 — 팬덤 땅따먹기 ADMIN</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          />
        </head>
        <body style={{ margin: 0, padding: 0 }}>{children}</body>
      </html>
    );
  }

  return (
    <html lang="ko">
      <head>
        <title>팬덤 땅따먹기 ADMIN CONSOLE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
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
                  // Exact match pathname check to prevent sub-path overlap (e.g. /verification vs /verification-history)
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
      </body>
    </html>
  );
}

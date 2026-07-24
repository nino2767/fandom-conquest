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
          {/* Mobile Top Header */}
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
            {/* Sidebar Navigation */}
            <aside
              className={`admin-sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}
            >
              <div className="admin-brand">
                <div className="admin-brand-icon">🚩</div>
                <div className="admin-brand-text">
                  팬덤 땅따먹기
                  <div className="admin-brand-sub">ADMIN CONSOLE</div>
                </div>
              </div>

              <nav style={{ flex: 1, overflowY: "auto" }}>
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <React.Fragment key={item.href}>
                      <Link
                        href={item.href}
                        className={`admin-nav-item ${isActive ? "active" : ""}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                        {item.badge?.type === "black" && (
                          <span className="admin-badge-black">
                            {item.badge.value}
                          </span>
                        )}
                        {item.badge?.type === "gray" && (
                          <span className="admin-badge-gray">
                            {item.badge.value}
                          </span>
                        )}
                        {item.badge?.type === "dot" && (
                          <span className="admin-dot-red" />
                        )}
                      </Link>
                      {item.dividerAfter && (
                        <div
                          style={{
                            height: 1,
                            background: "#e7e7e7",
                            margin: "10px 6px",
                          }}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </nav>

              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 8px 2px",
                  borderTop: "1px solid #e7e7e7",
                }}
              >
                <span
                  style={{
                    width: 26,
                    height: 26,
                    background: "#111",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    font: "600 10px 'Pretendard'",
                  }}
                >
                  운
                </span>
                <span
                  style={{ font: "400 10.5px 'Pretendard'", color: "#8a8a8a" }}
                >
                  ops@fandom.app
                </span>
              </div>
            </aside>

            {/* Main View Container */}
            <main className="admin-main">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

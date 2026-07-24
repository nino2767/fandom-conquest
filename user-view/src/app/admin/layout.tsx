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
  { name: "대시보드", href: "/admin" },
  {
    name: "영수증 검수 큐",
    href: "/admin/verification",
    badge: { type: "black", value: "24" },
  },
  {
    name: "성지 제보 승인",
    href: "/admin/spot-approval",
    badge: { type: "gray", value: "7" },
  },
  {
    name: "이상 탐지",
    href: "/admin/abuse-detection",
    badge: { type: "dot" },
  },
  { name: "유저 제재", href: "/admin/user-sanction", dividerAfter: true },
  { name: "성지 마스터", href: "/admin/spot-master" },
  { name: "팬덤 IP 관리", href: "/admin/fandom-ip" },
  { name: "운영 정책", href: "/admin/policy" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
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

          <nav style={{ flex: 1 }}>
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
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
            <span style={{ font: "400 10.5px 'Pretendard'", color: "#8a8a8a" }}>
              ops@fandom.app
            </span>
          </div>
        </aside>

        {/* Main View Container */}
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}

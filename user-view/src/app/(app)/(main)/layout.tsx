"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Map as MapIcon, Swords, Camera, Trophy, Star } from "lucide-react";

const C = {
  line: "#E2E5EC",
  frame: "#FFFFFF",
  sub: "#6C7180",
};

const MY_FANDOM = "nj";
const FAND_COLOR = "#4C8DFF";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isTabActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      {children}

      {/* 하단 탭 */}
      <div style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "10px 16px 22px",
        borderTop: `1px solid ${C.line}`,
        background: C.frame
      }}>
        <TabBtn href="/map" icon={<MapIcon size={21} />} label="지도" active={isTabActive("/map")} />
        <TabBtn href="/war" icon={<Swords size={21} />} label="전황" active={isTabActive("/war")} />
        
        <Link href="/verify" style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <span style={{
            width: 46,
            height: 46,
            marginTop: -20,
            borderRadius: 16,
            background: FAND_COLOR,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 8px 20px ${FAND_COLOR}66`,
            border: `3px solid ${C.frame}`
          }}>
            <Camera size={22} color="#06122B" />
          </span>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: C.sub }}>인증</span>
        </Link>

        <TabBtn href="/ranking" icon={<Trophy size={21} />} label="랭킹" active={isTabActive("/ranking")} />
        <TabBtn href="/my" icon={<Star size={21} />} label="MY" active={isTabActive("/my")} />
      </div>
    </>
  );
}

interface TabBtnProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

function TabBtn({ href, icon, label, active }: TabBtnProps) {
  return (
    <Link href={href} style={{
      textDecoration: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
      color: active ? "#1B1D26" : "#9AA0B8",
      cursor: "pointer"
    }}>
      {icon}
      <span style={{ fontSize: 10.5, fontWeight: active ? 700 : 500 }}>{label}</span>
    </Link>
  );
}

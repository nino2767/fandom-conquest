import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%",
      height: "100dvh",
      background: "#f5f4ef",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      overscrollBehavior: "none",
      touchAction: "manipulation",
      fontFamily: "'Pretendard', -apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "480px",
        height: "100dvh",
        background: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        overscrollBehavior: "none"
      }}>
        {children}
      </div>
    </div>
  );
}

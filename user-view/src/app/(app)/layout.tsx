import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#EBEDF2",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "24px 12px",
      fontFamily: "'Pretendard', -apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif"
    }}>
      {/* 폰 프레임 */}
      <div style={{
        width: 390,
        maxWidth: "100%",
        height: 820,
        background: "#FFFFFF",
        borderRadius: 40,
        border: "1px solid #E2E5EC",
        boxShadow: "0 20px 50px rgba(30,34,60,.14)",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        color: "#1B1D26"
      }}>
        {/* 노치 */}
        <div style={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 26,
          background: "#000",
          borderRadius: 20,
          zIndex: 60
        }} />

        {children}
      </div>
    </div>
  );
}

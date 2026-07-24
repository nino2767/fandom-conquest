"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("ops@fandom.app");
  const [password, setPassword] = useState("admin1234");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    // Simulated Auth Validation
    setTimeout(() => {
      if (email === "ops@fandom.app" && password === "admin1234") {
        router.push("/");
      } else {
        setIsLoading(false);
        setErrorMsg("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ecebe8",
        fontFamily: "'Pretendard', sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#ffffff",
          border: "1px solid #111111",
          boxShadow: "0 20px 48px rgba(0,0,0,0.15)",
          padding: 32,
          boxSizing: "border-box",
        }}
      >
        {/* Brand Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "#111",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
            }}
          >
            🚩
          </div>
          <div>
            <div style={{ font: "700 15px 'Pretendard'", color: "#111", lineHeight: 1.2 }}>
              팬덤 땅따먹기
            </div>
            <div style={{ font: "500 9.5px 'Pretendard'", color: "#8a8a8a", letterSpacing: "0.08em" }}>
              ADMIN CONSOLE LOGIN
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label
              style={{
                display: "block",
                font: "500 11px 'Pretendard'",
                color: "#555",
                marginBottom: 6,
              }}
            >
              이메일 아이디
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ops@fandom.app"
              style={{
                width: "100%",
                height: 40,
                padding: "0 12px",
                border: "1px solid #ddd",
                font: "500 12px 'Pretendard'",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                font: "500 11px 'Pretendard'",
                color: "#555",
                marginBottom: 6,
              }}
            >
              비밀번호
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                height: 40,
                padding: "0 12px",
                border: "1px solid #ddd",
                font: "500 12px 'Pretendard'",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          {errorMsg && (
            <div
              style={{
                padding: "8px 10px",
                background: "#fef2f2",
                border: "1px solid #f87171",
                color: "#d64545",
                font: "500 11px 'Pretendard'",
              }}
            >
              ⚠️ {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              height: 44,
              marginTop: 8,
              background: "#111111",
              color: "#ffffff",
              border: "none",
              font: "700 12.5px 'Pretendard'",
              cursor: isLoading ? "wait" : "pointer",
            }}
          >
            {isLoading ? "인증 중..." : "로그인 (Sign In)"}
          </button>
        </form>

        {/* Demo Account Guide */}
        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid #f0f0f0",
            font: "400 10px/1.6 'Pretendard'",
            color: "#8a8a8a",
          }}
        >
          💡 <b>데모 테스트 계정:</b>
          <br />
          - 아이디: <code style={{ color: "#111" }}>ops@fandom.app</code>
          <br />- 비밀번호: <code style={{ color: "#111" }}>admin1234</code>
        </div>
      </div>
    </div>
  );
}

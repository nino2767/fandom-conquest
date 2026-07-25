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
        background: "#fafafa",
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
          boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
          padding: 32,
          boxSizing: "border-box",
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "#111",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path d="M6 2v20" stroke="#fff" strokeWidth="2.6" fill="none" />
              <path d="M6 3h13l-3 4 3 4H6z" fill="#fff" />
            </svg>
          </div>
          <div>
            <div
              style={{
                font: "700 15px 'Pretendard'",
                color: "#111",
                lineHeight: 1.2,
              }}
            >
              팬덤 땅따먹기
            </div>
            <div
              style={{
                font: "500 9.5px 'Pretendard'",
                color: "#9a9a9a",
                letterSpacing: "0.08em",
              }}
            >
              ADMIN CONSOLE LOGIN (v0.2)
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
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
                color: "#111",
                background: "#fff",
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
                color: "#111",
                background: "#fff",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          {errorMsg && (
            <div
              style={{
                padding: "8px 12px",
                background: "#fff0f0",
                border: "1px solid #d64545",
                color: "#d64545",
                font: "500 11px 'Pretendard'",
              }}
            >
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              height: 44,
              background: "#111",
              color: "#fff",
              border: "none",
              font: "700 13px 'Pretendard'",
              cursor: "pointer",
              marginTop: 8,
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "인증 확인 중..." : "어드민 로그인"}
          </button>
        </form>

        <div
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTop: "1px solid #eee",
            textAlign: "center",
            font: "400 10px 'Pretendard'",
            color: "#9a9a9a",
          }}
        >
          테스트 로그인 계정: <b>ops@fandom.app</b> / <b>admin1234</b>
        </div>
      </div>
    </div>
  );
}

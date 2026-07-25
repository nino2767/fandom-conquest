"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("ops@fandom.app");
  const [password, setPassword] = useState("admin1234");
  const [otp, setOtp] = useState(["4", "8", "2", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

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
        width: "100vw",
        minHeight: "100vh",
        background: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Pretendard', system-ui, sans-serif",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        className="mobile-stack"
        style={{
          width: 1180,
          maxWidth: "100%",
          minHeight: 680,
          background: "#fafafa",
          border: "1px solid #ddd",
          boxShadow: "0 24px 56px -26px rgba(0,0,0,.3)",
          overflow: "hidden",
          display: "flex",
        }}
      >
        {/* Left Dark Branding Panel (560px) */}
        <div
          style={{
            width: 560,
            flex: "none",
            background: "#111",
            color: "#fff",
            padding: "56px 52px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -80,
              top: -40,
              width: 340,
              height: 340,
              border: "1px solid rgba(255,255,255,.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 20,
              bottom: 60,
              width: 220,
              height: 220,
              border: "1px solid rgba(255,255,255,.06)",
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 11, position: "relative" }}>
            <span
              style={{
                width: 34,
                height: 34,
                flex: "none",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path d="M6 2v20" stroke="#111" strokeWidth="2.6" fill="none" />
                <path d="M6 3h13l-3 4 3 4H6z" fill="#111" />
              </svg>
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ font: "700 14px 'Pretendard'", color: "#fff" }}>
                팬덤 땅따먹기
              </span>
              <span
                style={{
                  font: "400 9px 'Pretendard'",
                  color: "rgba(255,255,255,.5)",
                  letterSpacing: ".12em",
                  marginTop: 2,
                }}
              >
                ADMIN CONSOLE
              </span>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ font: "700 26px/1.4 'Pretendard'", color: "#fff" }}>
              백오피스
              <br />
              보안 로그인
            </div>
            <div
              style={{
                font: "400 12.5px/1.7 'Pretendard'",
                color: "rgba(255,255,255,.6)",
                marginTop: 16,
                maxWidth: 340,
              }}
            >
              인증 검수 · 이상 탐지 · 팬덤 IP 관리 콘솔. 접근 권한은 RBAC 역할에 따라 제한되며 모든 활동은 감사 로그에 기록됩니다.
            </div>
          </div>

          <div style={{ position: "relative", display: "flex", gap: 22 }}>
            <div>
              <div style={{ font: "600 18px 'Pretendard'", color: "#fff" }}>2FA</div>
              <div
                style={{
                  font: "400 10px 'Pretendard'",
                  color: "rgba(255,255,255,.5)",
                  marginTop: 2,
                }}
              >
                TOTP 필수
              </div>
            </div>
            <div>
              <div style={{ font: "600 18px 'Pretendard'", color: "#fff" }}>60분</div>
              <div
                style={{
                  font: "400 10px 'Pretendard'",
                  color: "rgba(255,255,255,.5)",
                  marginTop: 2,
                }}
              >
                세션 만료
              </div>
            </div>
            <div>
              <div style={{ font: "600 18px 'Pretendard'", color: "#fff" }}>5회</div>
              <div
                style={{
                  font: "400 10px 'Pretendard'",
                  color: "rgba(255,255,255,.5)",
                  marginTop: 2,
                }}
              >
                실패 시 15분 잠금
              </div>
            </div>
          </div>
        </div>

        {/* Right White Form Panel */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 64px",
            minWidth: 0,
            background: "#fafafa",
          }}
        >
          <div
            style={{
              width: 380,
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ font: "700 17px 'Pretendard'", color: "#111", alignSelf: "flex-start" }}>
              로그인
            </div>
            <div className="hint" style={{ marginTop: 5, alignSelf: "flex-start", color: "#8a8a8a", fontSize: 11 }}>
              등록된 운영자 계정으로 접속하세요.
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                width: "100%",
                marginTop: 26,
                display: "flex",
                flexDirection: "column",
                gap: 11,
              }}
            >
              <div>
                <div className="fl" style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a", marginBottom: 4 }}>
                  이메일 아이디
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="fld"
                  style={{
                    width: "100%",
                    padding: "9px 11px",
                    border: "1px solid #ddd",
                    font: "500 11.5px 'Pretendard'",
                    color: "#111",
                    background: "#fff",
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <div className="fl" style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a", marginBottom: 4 }}>
                  비밀번호
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="fld"
                  style={{
                    width: "100%",
                    padding: "9px 11px",
                    border: "1px solid #ddd",
                    font: "500 11.5px 'Pretendard'",
                    color: "#111",
                    background: "#fff",
                    boxSizing: "border-box",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <div className="fl" style={{ font: "400 9.5px 'Pretendard'", color: "#9a9a9a", marginBottom: 4 }}>
                  2FA OTP (Google Authenticator)
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      style={{
                        flex: 1,
                        width: 0,
                        height: 38,
                        textAlign: "center",
                        border: "1px solid #ddd",
                        font: "600 15px ui-monospace,monospace",
                        color: digit ? "#111" : "#c9c9c9",
                        background: "#fff",
                        outline: "none",
                      }}
                    />
                  ))}
                </div>
              </div>

              {errorMsg && (
                <div
                  style={{
                    padding: "8px 12px",
                    background: "#fff0f0",
                    border: "1px solid #d64545",
                    color: "#d64545",
                    font: "500 11px 'Pretendard'",
                    marginTop: 4,
                  }}
                >
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-d"
                style={{
                  width: "100%",
                  height: 46,
                  marginTop: 20,
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  font: "600 12px 'Pretendard'",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                {isLoading ? "인증 확인 중..." : "로그인 (Sign In)"}
              </button>
            </form>

            <div
              style={{
                width: "100%",
                marginTop: 16,
                padding: "11px 13px",
                background: "#f5f5f5",
                border: "1px solid #e7e7e7",
                boxSizing: "border-box",
              }}
            >
              <span className="hint" style={{ font: "400 9.5px/1.6 'Pretendard'", color: "#9a9a9a" }}>
                세션 60분 자동 만료 · 비밀번호 5회 실패 시 15분 잠금 · 최고 관리자 2FA 필수
              </span>
            </div>

            <div className="hint" style={{ marginTop: 14, alignSelf: "flex-start", font: "400 9.5px 'Pretendard'", color: "#9a9a9a" }}>
              💡 데모: ops@fandom.app / admin1234
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IP 팬덤 땅따먹기",
  description: "위치 기반 IP 팬덤 오프라인 점령전 게임",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

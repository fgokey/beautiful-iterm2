import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iTerm💎美颜小助手💎",
  description: "iTerm💎美颜小助手💎，支持主题预览与安装脚本"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

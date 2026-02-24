import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iTerm2 Theme Preview",
  description: "iTerm2 theme preview with install scripts"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

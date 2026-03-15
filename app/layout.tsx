import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "敲木鱼 - 分享功德",
  description: "敲木鱼解压神器",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

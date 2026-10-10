import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CipherTool Web",
  description: "在瀏覽器中學習與使用經典密碼、編碼與雜湊工具。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}

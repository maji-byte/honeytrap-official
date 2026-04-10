import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HoneyTrap Official",
  description: "漫画のページから、ロックが鳴り出す。──漫画発ガールズロックバンド HoneyTrap 公式サイト",
  openGraph: {
    title: "HoneyTrap Official",
    description: "漫画のページから、ロックが鳴り出す。",
    siteName: "HoneyTrap",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}

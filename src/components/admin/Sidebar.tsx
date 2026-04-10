"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "ダッシュボード", icon: "📊" },
  { href: "/admin/hero", label: "Hero セクション", icon: "🎬" },
  { href: "/admin/members", label: "メンバー", icon: "👥" },
  { href: "/admin/story", label: "ストーリー", icon: "📖" },
  { href: "/admin/news", label: "ニュース", icon: "📰" },
  { href: "/admin/music", label: "楽曲", icon: "🎵" },
  { href: "/admin/movies", label: "映像", icon: "🎬" },
  { href: "/admin/gallery", label: "ギャラリー", icon: "🖼️" },
  { href: "/admin/goods", label: "グッズ", icon: "🛍️" },
  { href: "/admin/about", label: "アバウト", icon: "💡" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#1A1A1F] border-r border-white/5 flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/5">
        <Link href="/admin" className="block">
          <h1 className="font-heading text-lg font-bold text-[var(--ht-ivory)] tracking-wider">
            Honey<span className="text-[var(--ht-pink)]">Trap</span>
          </h1>
          <p className="text-[10px] text-[var(--ht-ivory)]/30 font-heading tracking-[0.2em] mt-1">
            CONTENT MANAGER
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--ht-pink)]/10 text-[var(--ht-pink)]"
                      : "text-[var(--ht-ivory)]/50 hover:text-[var(--ht-ivory)] hover:bg-white/5"
                  }`}
                >
                  <span className="text-base w-6 text-center">{item.icon}</span>
                  <span className="font-body">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--ht-pink)]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/5 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--ht-ivory)]/30 hover:text-[var(--ht-teal)] transition-colors"
        >
          <span className="text-base w-6 text-center">🌐</span>
          <span className="font-body">サイトを見る</span>
          <span className="ml-auto text-xs">↗</span>
        </Link>
      </div>
    </aside>
  );
}

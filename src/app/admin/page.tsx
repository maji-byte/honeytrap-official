"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMembers, getNews, getGoods, getMusicReleases } from "@/lib/cms";

const quickLinks = [
  { href: "/admin/hero", label: "Hero セクション", desc: "トップページのメインビジュアル・テキスト", icon: "🎬" },
  { href: "/admin/members", label: "メンバー管理", desc: "プロフィール・キャッチコピー編集", icon: "👥" },
  { href: "/admin/news", label: "ニュース管理", desc: "お知らせの追加・編集・削除", icon: "📰" },
  { href: "/admin/music", label: "楽曲管理", desc: "リリース情報の管理", icon: "🎵" },
  { href: "/admin/goods", label: "グッズ管理", desc: "商品情報・ステータス管理", icon: "🛍️" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ members: 0, news: 0, goods: 0, releases: 0 });

  useEffect(() => {
    setStats({
      members: getMembers().length,
      news: getNews().length,
      goods: getGoods().length,
      releases: getMusicReleases().length,
    });
  }, []);

  const statCards = [
    { label: "メンバー", value: stats.members, color: "var(--ht-pink)" },
    { label: "ニュース", value: stats.news, color: "var(--ht-teal)" },
    { label: "楽曲", value: stats.releases, color: "var(--ht-orange, #F28C38)" },
    { label: "グッズ", value: stats.goods, color: "var(--ht-purple, #6B3FA0)" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-[var(--ht-ivory)] tracking-wider">
          ダッシュボード
        </h1>
        <p className="text-sm text-[var(--ht-ivory)]/40 font-body mt-1">
          HoneyTrap コンテンツ管理
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#1A1A1F] border border-white/5 rounded-xl p-5"
          >
            <p className="text-xs text-[var(--ht-ivory)]/40 font-body mb-2">{stat.label}</p>
            <p
              className="font-heading text-3xl font-bold"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <h2 className="font-heading text-sm tracking-[0.15em] text-[var(--ht-ivory)]/40 mb-4">
        コンテンツ管理
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group bg-[#1A1A1F] border border-white/5 rounded-xl p-5 hover:border-[var(--ht-pink)]/30 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl">{link.icon}</span>
              <div className="flex-1">
                <h3 className="font-heading text-sm font-bold text-[var(--ht-ivory)] group-hover:text-[var(--ht-pink)] transition-colors">
                  {link.label}
                </h3>
                <p className="text-xs text-[var(--ht-ivory)]/30 font-body mt-1">
                  {link.desc}
                </p>
              </div>
              <span className="text-[var(--ht-ivory)]/20 group-hover:text-[var(--ht-pink)] transition-colors">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

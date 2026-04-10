"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import MemberCard from "@/components/MemberCard";
import NewsCard from "@/components/NewsCard";
import {
  getHeroContent,
  getMembers,
  getNews,
  getGoods,
  getMusicReleases,
  getStoryTeaser,
  type HeroContent,
  type MusicRelease,
  type StoryTeaser,
} from "@/lib/cms";
import type { GoodsItem } from "@/data/goods";
import type { Member } from "@/data/members";
import type { NewsItem } from "@/data/news";

export default function Home() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [releases, setReleases] = useState<MusicRelease[]>([]);
  const [story, setStory] = useState<StoryTeaser | null>(null);
  const [goods, setGoods] = useState<GoodsItem[]>([]);
  const [mvPlaying, setMvPlaying] = useState(false);

  const loadData = () => {
    setHero(getHeroContent());
    setMembers(getMembers());
    setNews(getNews());
    setReleases(getMusicReleases());
    setStory(getStoryTeaser());
    setGoods(getGoods());
  };

  useEffect(() => {
    loadData();
    // 管理画面からの更新をリッスン
    const handler = () => loadData();
    window.addEventListener("ht-cms-update", handler);
    // 他タブからの localStorage 変更もリッスン
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ht-cms-update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  if (!hero) return null;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {hero.heroMediaType === "video" && hero.heroVideo ? (
          <video
            src={hero.heroVideo}
            className="absolute inset-0 w-full h-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <Image
            src={hero.heroImage}
            alt="HoneyTrap"
            fill
            className="object-cover object-center"
            priority
            quality={90}
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1F]/70 via-[#1A1A1F]/50 to-[#1A1A1F]/90" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--ht-pink)]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[var(--ht-teal)]/5 rounded-full blur-[100px]" />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-heading text-xs md:text-sm tracking-[0.4em] text-[var(--ht-ivory)]/40 mb-6">
              {hero.subtitle}
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
          >
            <span className="gradient-text">Honey</span>
            <span className="text-[var(--ht-ivory)]">Trap</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 md:mt-8 font-body text-sm md:text-base text-[var(--ht-ivory)]/50 max-w-md mx-auto leading-relaxed"
          >
            {hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={hero.ctaPrimary.href}
              className="inline-block px-8 py-3 bg-[var(--ht-pink)] text-[var(--ht-ivory)] font-heading text-xs tracking-[0.2em] hover:bg-[var(--ht-pink)]/80 transition-colors"
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="inline-block px-8 py-3 border border-[var(--ht-ivory)]/20 text-[var(--ht-ivory)] font-heading text-xs tracking-[0.2em] hover:border-[var(--ht-teal)] hover:text-[var(--ht-teal)] transition-colors"
            >
              {hero.ctaSecondary.label}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-[1px] h-12 bg-gradient-to-b from-[var(--ht-ivory)]/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ===== LATEST RELEASE ===== */}
      {releases.length > 0 && (() => {
        const latest = releases[0];
        return (
          <section className="py-24 md:py-32 px-6 md:px-10 max-w-[1400px] mx-auto">
            <SectionHeading title="LATEST RELEASE" subtitle="最新リリース" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="aspect-square relative overflow-hidden"
              >
                {latest.jacket ? (
                  <Image
                    src={latest.jacket}
                    alt={`${latest.title} - HoneyTrap ${latest.type}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--ht-pink)]/20 via-[var(--ht-purple)]/10 to-[var(--ht-teal)]/20 flex items-center justify-center">
                    <span className="font-heading text-5xl text-[var(--ht-ivory)]/10">♪</span>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-heading text-xs tracking-[0.2em] text-[var(--ht-pink)] mb-3">
                  {latest.date} RELEASE
                </p>
                <h3 className="font-heading text-3xl md:text-4xl font-bold text-[var(--ht-ivory)] mb-4">
                  {latest.title}
                </h3>
                <p className="font-body text-sm text-[var(--ht-ivory)]/50 leading-relaxed mb-8">
                  {latest.description}
                </p>

                {/* 音声プレイヤー */}
                {latest.audioFile && (
                  <div className="mb-6">
                    <div className="bg-[#111115] border border-white/5 rounded-lg p-4">
                      <audio
                        controls
                        src={latest.audioFile}
                        className="w-full h-10"
                        style={{ filter: "invert(0.85) hue-rotate(180deg)" }}
                      />
                      <p className="text-[10px] text-[var(--ht-ivory)]/30 mt-2 font-body">
                        {latest.title} - HoneyTrap
                      </p>
                    </div>
                  </div>
                )}

                {/* Spotify（音声ファイルがない場合のみ表示） */}
                {!latest.audioFile && latest.spotifyUrl && (
                  <div className="bg-[var(--ht-dark-gray)] p-4 mb-6">
                    <a href={latest.spotifyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1DB954] flex items-center justify-center text-white font-bold text-xl">
                        ▶
                      </div>
                      <div>
                        <p className="text-sm font-body text-[var(--ht-ivory)]">{latest.title} - HoneyTrap</p>
                        <p className="text-xs text-[var(--ht-ivory)]/40">Spotify で再生</p>
                      </div>
                    </a>
                  </div>
                )}

                <div className="flex gap-4">
                  {latest.spotifyUrl && (
                    <a href={latest.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-heading tracking-wider text-[var(--ht-teal)] hover:text-[var(--ht-pink)] transition-colors">
                      Spotify →
                    </a>
                  )}
                  {latest.appleMusicUrl && (
                    <a href={latest.appleMusicUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-heading tracking-wider text-[var(--ht-teal)] hover:text-[var(--ht-pink)] transition-colors">
                      Apple Music →
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        );
      })()}

      {/* ===== MUSIC VIDEO ===== */}
      {(() => {
        const mvRelease = releases.find((r) => r.mvUrl);
        return (
          <section className="py-24 md:py-32 px-6 md:px-10 bg-[#111111] retro-grain">
            <div className="max-w-[1400px] mx-auto relative z-10">
              <SectionHeading title="MUSIC VIDEO" subtitle="ミュージックビデオ" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="aspect-video bg-[var(--ht-black)] max-w-4xl mx-auto relative overflow-hidden"
              >
                {mvRelease && mvPlaying ? (
                  // 再生中: YouTube / Vimeo 埋め込み or 動画ファイル
                  (() => {
                    const url = mvRelease.mvUrl;
                    // YouTube
                    if (url.includes("youtube.com") || url.includes("youtu.be")) {
                      const embedUrl = url.includes("embed/")
                        ? url
                        : url.includes("youtu.be/")
                          ? `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`
                          : url.replace("watch?v=", "embed/").split("&")[0];
                      return (
                        <iframe
                          src={`${embedUrl}?autoplay=1&rel=0`}
                          className="absolute inset-0 w-full h-full"
                          allow="autoplay; encrypted-media; fullscreen"
                          allowFullScreen
                        />
                      );
                    }
                    // Vimeo
                    if (url.includes("vimeo.com")) {
                      const vimeoId = url.includes("player.vimeo.com")
                        ? url.split("/video/")[1]?.split(/[?/]/)[0]
                        : url.split("vimeo.com/")[1]?.split(/[?/]/)[0];
                      return (
                        <iframe
                          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                          className="absolute inset-0 w-full h-full"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                        />
                      );
                    }
                    // 直接動画ファイル
                    return (
                      <video
                        src={url}
                        className="absolute inset-0 w-full h-full object-contain"
                        controls
                        autoPlay
                      />
                    );
                  })()
                ) : (
                  // サムネイル + 再生ボタン
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                    onClick={() => mvRelease && setMvPlaying(true)}
                  >
                    {/* サムネイル背景 */}
                    {mvRelease?.jacket && (
                      <Image
                        src={mvRelease.jacket}
                        alt={mvRelease.title}
                        fill
                        className="object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                        unoptimized
                      />
                    )}
                    <div className="relative z-10 text-center">
                      <div className={`w-20 h-20 rounded-full border-2 border-[var(--ht-pink)] flex items-center justify-center mx-auto mb-4 transition-colors ${mvRelease ? "hover:bg-[var(--ht-pink)]/10 cursor-pointer" : "opacity-50"}`}>
                        <span className="text-[var(--ht-pink)] text-2xl ml-1">▶</span>
                      </div>
                      <p className="font-heading text-sm tracking-wider text-[var(--ht-ivory)]/30">
                        {mvRelease ? `「${mvRelease.title}」 Music Video` : "Music Video（準備中）"}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
              <div className="text-center mt-8">
                <Link href="/movie" className="inline-block text-xs font-heading tracking-[0.2em] text-[var(--ht-ivory)]/40 hover:text-[var(--ht-pink)] transition-colors">
                  VIEW ALL MOVIES →
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ===== STORY TEASER ===== */}
      {story && (
      <section className="py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--ht-pink)]/3 to-transparent" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-heading text-xs tracking-[0.3em] text-[var(--ht-pink)] mb-4">
                THE STORY
              </p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-[var(--ht-ivory)] leading-tight mb-6 whitespace-pre-line">
                {story.heading}
              </h2>
              <p className="font-body text-sm text-[var(--ht-ivory)]/50 leading-loose mb-8 whitespace-pre-line">
                {story.body}
              </p>
              <div className="flex gap-4">
                <Link
                  href="/story"
                  className="inline-block px-8 py-3 border border-[var(--ht-ivory)]/20 text-[var(--ht-ivory)] font-heading text-xs tracking-[0.2em] hover:border-[var(--ht-pink)] hover:text-[var(--ht-pink)] transition-colors"
                >
                  READ THE STORY
                </Link>
                {story.mangaUrl && (
                  <a
                    href={story.mangaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 text-[var(--ht-teal)] font-heading text-xs tracking-[0.2em] hover:text-[var(--ht-pink)] transition-colors"
                  >
                    {story.mangaLabel}
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-[var(--ht-dark-gray)] to-[var(--ht-black)] flex items-center justify-center border border-white/5 relative overflow-hidden">
                {story.image ? (
                  <Image
                    src={story.image}
                    alt="THE STORY"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                ) : (
                  <div className="text-center">
                    <p className="font-heading text-4xl text-[var(--ht-ivory)]/10">📖</p>
                    <p className="mt-4 font-heading text-xs tracking-wider text-[var(--ht-ivory)]/20">
                      ロックが鳴る！
                    </p>
                    <p className="font-body text-xs text-[var(--ht-ivory)]/15 mt-1">
                      連載中 / ジャンプルーキー！
                    </p>
                  </div>
                )}
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 border border-[var(--ht-pink)]/20" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[var(--ht-teal)]/5" />
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* ===== MEMBER ===== */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[#111111] retro-grain">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <SectionHeading title="MEMBER" subtitle="メンバー" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {members.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/member" className="inline-block text-xs font-heading tracking-[0.2em] text-[var(--ht-ivory)]/40 hover:text-[var(--ht-pink)] transition-colors">
              VIEW ALL MEMBERS →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NEWS ===== */}
      <section className="py-24 md:py-32 px-6 md:px-10 max-w-[1400px] mx-auto">
        <SectionHeading title="NEWS" subtitle="ニュース" />
        <div>
          {news.slice(0, 3).map((item, i) => (
            <NewsCard key={item.id} item={item} index={i} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/news" className="inline-block text-xs font-heading tracking-[0.2em] text-[var(--ht-ivory)]/40 hover:text-[var(--ht-pink)] transition-colors">
            VIEW ALL NEWS →
          </Link>
        </div>
      </section>

      {/* ===== GOODS TEASER ===== */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[var(--ht-dark-gray)] retro-grain">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <SectionHeading title="GOODS" subtitle="グッズ" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {goods.slice(0, 3).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="aspect-square bg-[var(--ht-black)] relative overflow-hidden group"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-heading text-sm text-[var(--ht-ivory)]/10">{item.name}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/goods"
              className="inline-block px-8 py-3 bg-[var(--ht-pink)] text-[var(--ht-ivory)] font-heading text-xs tracking-[0.2em] hover:bg-[var(--ht-pink)]/80 transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

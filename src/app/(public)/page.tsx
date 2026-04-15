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
  getMovies,
  type HeroContent,
  type MusicRelease,
  type StoryTeaser,
  type Movie,
} from "@/lib/cms";
import type { GoodsItem } from "@/data/goods";
import type { Member } from "@/data/members";
import type { NewsItem } from "@/data/news";
import { addParams, toYouTubeEmbed, toVimeoEmbed, isYouTube, isVimeo } from "@/lib/videoEmbed";

export default function Home() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [releases, setReleases] = useState<MusicRelease[]>([]);
  const [story, setStory] = useState<StoryTeaser | null>(null);
  const [goods, setGoods] = useState<GoodsItem[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [mvPlaying, setMvPlaying] = useState(false);

  const loadData = () => {
    setHero(getHeroContent());
    setMembers(getMembers());
    setNews(getNews());
    setReleases(getMusicReleases());
    setStory(getStoryTeaser());
    setGoods(getGoods());
    setMovies(getMovies());
  };

  useEffect(() => {
    loadData();
    const handler = () => loadData();
    window.addEventListener("ht-cms-update", handler);
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1F]/60 via-[#1A1A1F]/40 to-[#1A1A1F]/80" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--ht-pink)]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[var(--ht-teal)]/8 rounded-full blur-[100px]" />

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-heading text-xs md:text-sm tracking-[0.4em] text-[var(--ht-ivory)]/50 mb-6">
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
            className="mt-6 md:mt-8 font-body text-sm md:text-base text-[var(--ht-ivory)]/60 max-w-md mx-auto leading-relaxed"
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
              className="inline-block px-8 py-3 bg-[var(--ht-pink)] text-white font-heading text-xs tracking-[0.2em] hover:bg-[var(--ht-pink)]/80 transition-colors rounded-full"
            >
              {hero.ctaPrimary.label}
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="inline-block px-8 py-3 border border-[var(--ht-ivory)]/30 text-[var(--ht-ivory)] font-heading text-xs tracking-[0.2em] hover:border-[var(--ht-teal)] hover:text-[var(--ht-teal)] transition-colors rounded-full"
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
                className="aspect-square relative overflow-hidden rounded-2xl shadow-lg"
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
                    <span className="font-heading text-5xl text-[var(--ht-text)]/10">&#9835;</span>
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
                <h3 className="font-heading text-3xl md:text-4xl font-bold text-[var(--ht-text)] mb-4">
                  {latest.title}
                </h3>
                <p className="font-body text-sm text-[var(--ht-text-muted)] leading-relaxed mb-8">
                  {latest.description}
                </p>

                {/* 音声プレイヤー */}
                {latest.audioFile && (
                  <div className="mb-6">
                    <div className="bg-white border border-[var(--ht-border)] rounded-xl p-4 shadow-sm">
                      <audio
                        controls
                        src={latest.audioFile}
                        className="w-full h-10"
                      />
                      <p className="text-[10px] text-[var(--ht-text-muted)] mt-2 font-body">
                        {latest.title} - HoneyTrap
                      </p>
                    </div>
                  </div>
                )}

                {/* Spotify（音声ファイルがない場合のみ表示） */}
                {!latest.audioFile && latest.spotifyUrl && (
                  <div className="bg-white border border-[var(--ht-border)] rounded-xl p-4 mb-6 shadow-sm">
                    <a href={latest.spotifyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1DB954] flex items-center justify-center text-white font-bold text-xl rounded-lg">
                        &#9654;
                      </div>
                      <div>
                        <p className="text-sm font-body text-[var(--ht-text)]">{latest.title} - HoneyTrap</p>
                        <p className="text-xs text-[var(--ht-text-muted)]">Spotify で再生</p>
                      </div>
                    </a>
                  </div>
                )}

                <div className="flex gap-4">
                  {latest.spotifyUrl && (
                    <a href={latest.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-heading tracking-wider text-[var(--ht-pink)] hover:text-[var(--ht-teal)] transition-colors">
                      Spotify &rarr;
                    </a>
                  )}
                  {latest.appleMusicUrl && (
                    <a href={latest.appleMusicUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-heading tracking-wider text-[var(--ht-pink)] hover:text-[var(--ht-teal)] transition-colors">
                      Apple Music &rarr;
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
        const latestMovie = movies.length > 0 ? movies[0] : null;
        return (
          <section className="py-24 md:py-32 px-6 md:px-10 bg-[var(--ht-bg-alt)]">
            <div className="max-w-[1400px] mx-auto relative z-10">
              <SectionHeading title="MUSIC VIDEO" subtitle="ミュージックビデオ" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="aspect-video bg-[var(--ht-text)] max-w-4xl mx-auto relative overflow-hidden rounded-2xl shadow-lg"
              >
                {latestMovie && mvPlaying && latestMovie.videoUrl ? (
                  (() => {
                    const url = latestMovie.videoUrl;
                    if (isYouTube(url)) {
                      const embedUrl = addParams(toYouTubeEmbed(url), { autoplay: "1", rel: "0" });
                      return (
                        <iframe
                          src={embedUrl}
                          className="absolute inset-0 w-full h-full"
                          allow="autoplay; encrypted-media; fullscreen"
                          allowFullScreen
                        />
                      );
                    }
                    if (isVimeo(url)) {
                      const vimeoEmbed = addParams(toVimeoEmbed(url), {
                        autoplay: "1",
                        title: "0",
                        byline: "0",
                        portrait: "0",
                      });
                      return (
                        <iframe
                          src={vimeoEmbed}
                          className="absolute inset-0 w-full h-full bg-black"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                          style={{ border: "none" }}
                        />
                      );
                    }
                    return (
                      <video
                        src={url}
                        className="absolute inset-0 w-full h-full object-contain bg-black"
                        controls
                        autoPlay
                        playsInline
                      />
                    );
                  })()
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                    onClick={() => latestMovie?.videoUrl && setMvPlaying(true)}
                  >
                    {latestMovie?.thumbnail && (
                      <Image
                        src={latestMovie.thumbnail}
                        alt={latestMovie.title}
                        fill
                        className="object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                        unoptimized
                      />
                    )}
                    <div className="relative z-10 text-center">
                      <div className={`w-20 h-20 rounded-full border-2 border-[var(--ht-pink)] flex items-center justify-center mx-auto mb-4 transition-colors ${latestMovie?.videoUrl ? "hover:bg-[var(--ht-pink)]/20 cursor-pointer" : "opacity-50"}`}>
                        <span className="text-[var(--ht-pink)] text-2xl ml-1">&#9654;</span>
                      </div>
                      <p className="font-heading text-sm tracking-wider text-[var(--ht-ivory)]/50">
                        {latestMovie?.videoUrl ? `「${latestMovie.title}」` : latestMovie ? `「${latestMovie.title}」（準備中）` : "Music Video（準備中）"}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
              <div className="text-center mt-8">
                <Link href="/movie" className="inline-block text-xs font-heading tracking-[0.2em] text-[var(--ht-text-muted)] hover:text-[var(--ht-pink)] transition-colors">
                  VIEW ALL MOVIES &rarr;
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ===== STORY TEASER ===== */}
      {story && (
      <section className="py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--ht-pink)]/5 to-transparent" />
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
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-[var(--ht-text)] leading-tight mb-6 whitespace-pre-line">
                {story.heading}
              </h2>
              <p className="font-body text-sm text-[var(--ht-text-muted)] leading-loose mb-8 whitespace-pre-line">
                {story.body}
              </p>
              <div className="flex gap-4">
                <Link
                  href="/story"
                  className="inline-block px-8 py-3 border border-[var(--ht-text)]/15 text-[var(--ht-text)] font-heading text-xs tracking-[0.2em] hover:border-[var(--ht-pink)] hover:text-[var(--ht-pink)] transition-colors rounded-full"
                >
                  READ THE STORY
                </Link>
                {story.mangaUrl && (
                  <a
                    href={story.mangaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 text-[var(--ht-pink)] font-heading text-xs tracking-[0.2em] hover:text-[var(--ht-teal)] transition-colors"
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
              <div className="aspect-[3/4] bg-gradient-to-br from-[var(--ht-bg-alt)] to-white flex items-center justify-center border border-[var(--ht-border)] relative overflow-hidden rounded-2xl shadow-lg">
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
                    <p className="font-heading text-4xl text-[var(--ht-text)]/10">📖</p>
                    <p className="mt-4 font-heading text-xs tracking-wider text-[var(--ht-text)]/20">
                      ロックが鳴る！
                    </p>
                    <p className="font-body text-xs text-[var(--ht-text)]/15 mt-1">
                      連載中 / ジャンプルーキー！
                    </p>
                  </div>
                )}
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 border border-[var(--ht-pink)]/20 rounded-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[var(--ht-teal)]/10 rounded-xl" />
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* ===== MEMBER ===== */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[var(--ht-bg-alt)]">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <SectionHeading title="MEMBER" subtitle="メンバー" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {members.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/member" className="inline-block text-xs font-heading tracking-[0.2em] text-[var(--ht-text-muted)] hover:text-[var(--ht-pink)] transition-colors">
              VIEW ALL MEMBERS &rarr;
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
          <Link href="/news" className="inline-block text-xs font-heading tracking-[0.2em] text-[var(--ht-text-muted)] hover:text-[var(--ht-pink)] transition-colors">
            VIEW ALL NEWS &rarr;
          </Link>
        </div>
      </section>

      {/* ===== GOODS TEASER ===== */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[var(--ht-bg-alt)]">
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
                className="aspect-square bg-white relative overflow-hidden group rounded-2xl shadow-md"
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
                    <p className="font-heading text-sm text-[var(--ht-text)]/10">{item.name}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/goods"
              className="inline-block px-8 py-3 bg-[var(--ht-pink)] text-white font-heading text-xs tracking-[0.2em] hover:bg-[var(--ht-pink)]/80 transition-colors rounded-full"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

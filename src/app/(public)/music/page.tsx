"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { getMusicReleases, getStreamingSpotifyUrl, type MusicRelease } from "@/lib/cms";

// Spotify URLから埋め込みURLを生成
function toSpotifyEmbed(url: string): string | null {
  if (!url) return null;
  if (url.includes("/embed/")) return url;
  const match = url.match(/open\.spotify\.com\/(track|album|artist|playlist)\/([a-zA-Z0-9]+)/);
  if (match) return `https://open.spotify.com/embed/${match[1]}/${match[2]}?theme=0`;
  return null;
}

// 楽曲ごとのオーディオプレイヤー
function AudioPlayer({ src, title, jacket }: { src: string; title: string; jacket: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white border border-[var(--ht-border)] rounded-xl p-4 flex items-center gap-4 shadow-sm">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => setPlaying(false)}
      />

      {/* ジャケットミニ */}
      <div className="w-12 h-12 rounded-lg overflow-hidden relative flex-shrink-0 bg-[var(--ht-bg-alt)]">
        {jacket ? (
          <Image src={jacket} alt={title} fill className="object-cover" sizes="48px" unoptimized />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-lg text-[var(--ht-text)]/10">&#9835;</div>
        )}
      </div>

      {/* 再生/一時停止 */}
      <button
        onClick={toggle}
        className="w-10 h-10 rounded-full border border-[var(--ht-pink)] flex items-center justify-center flex-shrink-0 hover:bg-[var(--ht-pink)]/10 transition-colors"
      >
        <span className="text-[var(--ht-pink)] text-sm" style={{ marginLeft: playing ? 0 : 2 }}>
          {playing ? "\u23F8" : "\u25B6"}
        </span>
      </button>

      {/* 曲情報 + プログレスバー */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-body text-[var(--ht-text)] truncate">{title}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] text-[var(--ht-text-muted)] font-mono w-8">{formatTime(currentTime)}</span>
          <div
            className="flex-1 h-1 bg-[var(--ht-text)]/10 rounded-full cursor-pointer relative"
            onClick={(e) => {
              if (!audioRef.current || !duration) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = (e.clientX - rect.left) / rect.width;
              audioRef.current.currentTime = ratio * duration;
            }}
          >
            <div
              className="h-full bg-[var(--ht-pink)] rounded-full transition-all duration-100"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
            />
          </div>
          <span className="text-[10px] text-[var(--ht-text-muted)] font-mono w-8 text-right">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

export default function MusicPage() {
  const [releases, setReleases] = useState<MusicRelease[]>([]);
  const [streamingUrl, setStreamingUrl] = useState<string>("");

  useEffect(() => {
    setReleases(getMusicReleases());
    setStreamingUrl(getStreamingSpotifyUrl());
    const handler = () => {
      setReleases(getMusicReleases());
      setStreamingUrl(getStreamingSpotifyUrl());
    };
    window.addEventListener("ht-cms-update", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ht-cms-update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  // STREAMINGセクション: 専用URLを優先、なければリリースから検索
  const spotifyEmbed =
    toSpotifyEmbed(streamingUrl) ||
    toSpotifyEmbed(releases.find((r) => r.spotifyUrl)?.spotifyUrl || "");

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/90 to-[var(--ht-bg)]" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-heading text-xs tracking-[0.4em] text-[var(--ht-pink)] mb-4">MUSIC</p>
            <h1 className="font-heading text-4xl md:text-7xl font-bold text-[var(--ht-ivory)]">
              音楽を聴く。
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Streaming / Spotify Embed */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading title="STREAMING" subtitle="ストリーミング" />

          {spotifyEmbed ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <iframe
                src={spotifyEmbed}
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl shadow-md"
                style={{ border: "none" }}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl bg-white border border-[var(--ht-border)] p-8 md:p-12 rounded-2xl shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#1DB954] flex items-center justify-center text-white font-bold text-2xl rounded-xl">
                  &#9654;
                </div>
                <div>
                  <p className="font-heading text-lg text-[var(--ht-text)]">HoneyTrap</p>
                  <p className="text-xs text-[var(--ht-text-muted)] font-body">ストリーミング準備中</p>
                </div>
              </div>
              <p className="text-xs font-body text-[var(--ht-text-muted)]">
                楽曲管理でSpotify URLを設定すると、ここにプレイヤーが表示されます
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Releases */}
      <section className="py-24 md:py-32 px-6 md:px-10 max-w-[1400px] mx-auto">
        <SectionHeading title="RELEASES" subtitle="リリース一覧" />
        <div className="space-y-16">
          {releases.map((release) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-12"
            >
              {/* Jacket */}
              <div className="aspect-square relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-[var(--ht-pink)]/10 via-[var(--ht-purple)]/5 to-[var(--ht-teal)]/10">
                {release.jacket ? (
                  <Image
                    src={release.jacket}
                    alt={release.title}
                    fill
                    className={`object-cover ${release.comingSoon ? "blur-sm scale-105" : ""}`}
                    sizes="300px"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-heading text-5xl text-[var(--ht-text)]/10">&#9835;</p>
                      <p className="mt-2 font-heading text-xs text-[var(--ht-text)]/20">{release.type}</p>
                    </div>
                  </div>
                )}
                {/* Coming Soon オーバーレイ */}
                {release.comingSoon && (
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center rounded-2xl">
                    <p className="font-heading text-2xl md:text-3xl font-bold text-white tracking-[0.15em]">
                      COMING
                    </p>
                    <p className="font-heading text-2xl md:text-3xl font-bold text-[var(--ht-pink)] tracking-[0.15em]">
                      SOON
                    </p>
                    <p className="font-body text-xs text-white/50 mt-3">
                      {release.date}
                    </p>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center">
                <p className="font-heading text-xs tracking-[0.2em] text-[var(--ht-pink)] mb-2">
                  {release.date} / {release.type}
                </p>
                <h3 className={`font-heading text-2xl md:text-4xl font-bold mb-4 ${release.comingSoon ? "text-[var(--ht-text)]/30" : "text-[var(--ht-text)]"}`}>
                  {release.title}
                </h3>
                <p className="font-body text-sm text-[var(--ht-text-muted)] leading-relaxed mb-6 max-w-lg">
                  {release.description}
                </p>

                {!release.comingSoon && (
                  <>
                    {release.audioFile && (
                      <div className="mb-6 max-w-lg">
                        <AudioPlayer
                          src={release.audioFile}
                          title={`${release.title} - HoneyTrap`}
                          jacket={release.jacket}
                        />
                      </div>
                    )}

                    {release.spotifyUrl && toSpotifyEmbed(release.spotifyUrl) && !release.audioFile && (
                      <div className="mb-6 max-w-lg">
                        <iframe
                          src={toSpotifyEmbed(release.spotifyUrl)!}
                          width="100%"
                          height="80"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          className="rounded-lg"
                          style={{ border: "none" }}
                        />
                      </div>
                    )}
                  </>
                )}

                <div className="flex gap-4">
                  {release.comingSoon ? (
                    <span className="inline-block px-8 py-2.5 bg-[var(--ht-text)]/5 text-[var(--ht-text)]/30 font-heading text-xs tracking-[0.2em] cursor-default border border-[var(--ht-border)] rounded-full">
                      COMING SOON
                    </span>
                  ) : release.spotifyUrl ? (
                    <a href={release.spotifyUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-[var(--ht-pink)] text-white font-heading text-xs tracking-wider hover:bg-[var(--ht-pink)]/80 transition-colors rounded-full">
                      Spotify
                    </a>
                  ) : !release.audioFile ? (
                    <span className="inline-block px-6 py-2 bg-[var(--ht-pink)]/10 text-[var(--ht-text)]/30 font-heading text-xs tracking-wider cursor-default rounded-full">
                      COMING SOON
                    </span>
                  ) : null}
                  {!release.comingSoon && release.appleMusicUrl && (
                    <a href={release.appleMusicUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 border border-[var(--ht-border)] text-[var(--ht-text-muted)] font-heading text-xs tracking-wider hover:border-[var(--ht-teal)] hover:text-[var(--ht-teal)] transition-colors rounded-full">
                      Apple Music
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

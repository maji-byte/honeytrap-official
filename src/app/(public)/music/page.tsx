"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { getMusicReleases, type MusicRelease } from "@/lib/cms";

// Spotify URLから埋め込みURLを生成
function toSpotifyEmbed(url: string): string | null {
  if (!url) return null;
  // すでにembed URLの場合
  if (url.includes("/embed/")) return url;
  // open.spotify.com/track/xxx → embed/track/xxx
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
    <div className="bg-[#111115] border border-white/5 rounded-lg p-4 flex items-center gap-4">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => setPlaying(false)}
      />

      {/* ジャケットミニ */}
      <div className="w-12 h-12 rounded overflow-hidden relative flex-shrink-0 bg-[var(--ht-dark-gray)]">
        {jacket ? (
          <Image src={jacket} alt={title} fill className="object-cover" sizes="48px" unoptimized />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-lg text-[var(--ht-ivory)]/10">♪</div>
        )}
      </div>

      {/* 再生/一時停止 */}
      <button
        onClick={toggle}
        className="w-10 h-10 rounded-full border border-[var(--ht-pink)] flex items-center justify-center flex-shrink-0 hover:bg-[var(--ht-pink)]/10 transition-colors"
      >
        <span className="text-[var(--ht-pink)] text-sm" style={{ marginLeft: playing ? 0 : 2 }}>
          {playing ? "⏸" : "▶"}
        </span>
      </button>

      {/* 曲情報 + プログレスバー */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-body text-[var(--ht-ivory)] truncate">{title}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] text-[var(--ht-ivory)]/30 font-mono w-8">{formatTime(currentTime)}</span>
          <div
            className="flex-1 h-1 bg-white/10 rounded-full cursor-pointer relative"
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
          <span className="text-[10px] text-[var(--ht-ivory)]/30 font-mono w-8 text-right">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

export default function MusicPage() {
  const [releases, setReleases] = useState<MusicRelease[]>([]);

  useEffect(() => {
    setReleases(getMusicReleases());
    const handler = () => setReleases(getMusicReleases());
    window.addEventListener("ht-cms-update", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ht-cms-update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  // Spotify埋め込み: 最初のSpotify URLを持つリリースを使用
  const spotifyRelease = releases.find((r) => r.spotifyUrl);
  const spotifyEmbed = spotifyRelease ? toSpotifyEmbed(spotifyRelease.spotifyUrl) : null;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A] to-[#0A0A0A]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[var(--ht-pink)]/5 to-transparent" />
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
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[#0A0A0A]">
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
                className="rounded-xl"
                style={{ border: "none" }}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl bg-[var(--ht-dark-gray)] p-8 md:p-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#1DB954] flex items-center justify-center text-white font-bold text-2xl rounded">
                  ▶
                </div>
                <div>
                  <p className="font-heading text-lg text-[var(--ht-ivory)]">HoneyTrap</p>
                  <p className="text-xs text-[var(--ht-ivory)]/40 font-body">ストリーミング準備中</p>
                </div>
              </div>
              <p className="text-xs font-body text-[var(--ht-ivory)]/30">
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
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-[var(--ht-pink)]/20 via-[var(--ht-purple)]/10 to-[var(--ht-teal)]/20">
                {release.jacket ? (
                  <Image
                    src={release.jacket}
                    alt={release.title}
                    fill
                    className="object-cover"
                    sizes="300px"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-heading text-5xl text-[var(--ht-ivory)]/10">♪</p>
                      <p className="mt-2 font-heading text-xs text-[var(--ht-ivory)]/20">{release.type}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center">
                <p className="font-heading text-xs tracking-[0.2em] text-[var(--ht-pink)] mb-2">
                  {release.date} / {release.type}
                </p>
                <h3 className="font-heading text-2xl md:text-4xl font-bold text-[var(--ht-ivory)] mb-4">
                  {release.title}
                </h3>
                <p className="font-body text-sm text-[var(--ht-ivory)]/50 leading-relaxed mb-6 max-w-lg">
                  {release.description}
                </p>

                {/* 音声プレイヤー（ファイルがある場合） */}
                {release.audioFile && (
                  <div className="mb-6 max-w-lg">
                    <AudioPlayer
                      src={release.audioFile}
                      title={`${release.title} - HoneyTrap`}
                      jacket={release.jacket}
                    />
                  </div>
                )}

                {/* Spotify 埋め込みプレイヤー（URLがある場合） */}
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

                <div className="flex gap-4">
                  {release.spotifyUrl ? (
                    <a href={release.spotifyUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-[var(--ht-pink)] text-[var(--ht-ivory)] font-heading text-xs tracking-wider hover:bg-[var(--ht-pink)]/80 transition-colors">
                      Spotify
                    </a>
                  ) : !release.audioFile ? (
                    <span className="inline-block px-6 py-2 bg-[var(--ht-pink)]/30 text-[var(--ht-ivory)]/40 font-heading text-xs tracking-wider cursor-default">
                      COMING SOON
                    </span>
                  ) : null}
                  {release.appleMusicUrl && (
                    <a href={release.appleMusicUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 border border-white/10 text-[var(--ht-ivory)]/50 font-heading text-xs tracking-wider hover:border-[var(--ht-teal)] hover:text-[var(--ht-teal)] transition-colors">
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

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { getMovies, type Movie } from "@/lib/cms";

// Vimeo URL → 埋め込みURL（限定公開のハッシュ対応）
function toVimeoEmbed(url: string): string {
  // player.vimeo.com/video/ID 形式
  if (url.includes("player.vimeo.com")) {
    return url.includes("?") ? url : `${url}?`;
  }
  // vimeo.com/ID/HASH（限定公開）or vimeo.com/ID
  const match = url.match(/vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/);
  if (match) {
    const id = match[1];
    const hash = match[2];
    return hash
      ? `https://player.vimeo.com/video/${id}?h=${hash}`
      : `https://player.vimeo.com/video/${id}?`;
  }
  return url;
}

// 動画URLからiframe/videoを生成するヘルパー
function VideoPlayer({ url }: { url: string }) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const embedUrl = url.includes("embed/")
      ? url
      : url.includes("youtu.be/")
        ? `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`
        : url.replace("watch?v=", "embed/").split("&")[0];
    return (
      <iframe
        src={`${embedUrl}?rel=0`}
        className="absolute inset-0 w-full h-full"
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
      />
    );
  }
  if (url.includes("vimeo.com")) {
    const vimeoEmbed = toVimeoEmbed(url);
    return (
      <iframe
        src={`${vimeoEmbed}&title=0&byline=0&portrait=0`}
        className="absolute inset-0 w-full h-full"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    );
  }
  // 直接ファイル
  return (
    <video
      src={url}
      className="absolute inset-0 w-full h-full object-contain bg-black"
      controls
      playsInline
    />
  );
}

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    setMovies(getMovies());
    const handler = () => setMovies(getMovies());
    window.addEventListener("ht-cms-update", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ht-cms-update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return (
    <>
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A] to-[#111111]" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-heading text-xs tracking-[0.4em] text-[var(--ht-orange)] mb-4">MOVIE</p>
            <h1 className="font-heading text-4xl md:text-7xl font-bold text-[var(--ht-ivory)]">
              映像を観る。
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-10 max-w-[1400px] mx-auto">
        <SectionHeading title="VIDEOS" subtitle="映像作品" />
        <div className="space-y-20">
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Video area */}
              <div className="aspect-video bg-[var(--ht-black)] border border-white/5 max-w-4xl mx-auto mb-6 relative overflow-hidden">
                {playingId === movie.id && movie.videoUrl ? (
                  <VideoPlayer url={movie.videoUrl} />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                    onClick={() => movie.videoUrl && setPlayingId(movie.id)}
                  >
                    {/* サムネイル */}
                    {movie.thumbnail && (
                      <Image
                        src={movie.thumbnail}
                        alt={movie.title}
                        fill
                        className="object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                        unoptimized
                      />
                    )}
                    <div className="relative z-10 text-center">
                      <div className={`w-16 h-16 rounded-full border-2 border-[var(--ht-pink)] flex items-center justify-center mx-auto mb-3 transition-colors ${movie.videoUrl ? "hover:bg-[var(--ht-pink)]/10 cursor-pointer" : "opacity-40"}`}>
                        <span className="text-[var(--ht-pink)] text-xl ml-0.5">▶</span>
                      </div>
                      <p className="font-heading text-xs tracking-wider text-[var(--ht-ivory)]/30">
                        {movie.videoUrl ? "クリックして再生" : "準備中"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 text-[10px] font-heading tracking-wider bg-[var(--ht-orange)] text-[var(--ht-black)]">
                    {movie.type}
                  </span>
                  <span className="text-xs font-heading text-[var(--ht-ivory)]/30">{movie.date}</span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-[var(--ht-ivory)] mb-2">
                  {movie.title}
                </h3>
                <p className="font-body text-sm text-[var(--ht-ivory)]/40">{movie.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

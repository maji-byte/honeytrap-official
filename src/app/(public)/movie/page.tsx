"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { getMovies, type Movie } from "@/lib/cms";
import { addParams, toYouTubeEmbed, toVimeoEmbed, isYouTube, isVimeo } from "@/lib/videoEmbed";

function VideoPlayer({ url }: { url: string }) {
  if (isYouTube(url)) {
    const embedUrl = addParams(toYouTubeEmbed(url), { rel: "0" });
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/90 to-[var(--ht-bg)]" />
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
              <div className="aspect-video bg-[var(--ht-text)] max-w-4xl mx-auto mb-6 relative overflow-hidden rounded-2xl shadow-lg">
                {playingId === movie.id && movie.videoUrl ? (
                  <VideoPlayer url={movie.videoUrl} />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                    onClick={() => movie.videoUrl && setPlayingId(movie.id)}
                  >
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
                      <div className={`w-16 h-16 rounded-full border-2 border-[var(--ht-pink)] flex items-center justify-center mx-auto mb-3 transition-colors ${movie.videoUrl ? "hover:bg-[var(--ht-pink)]/20 cursor-pointer" : "opacity-40"}`}>
                        <span className="text-[var(--ht-pink)] text-xl ml-0.5">&#9654;</span>
                      </div>
                      <p className="font-heading text-xs tracking-wider text-[var(--ht-ivory)]/40">
                        {movie.videoUrl ? "クリックして再生" : "準備中"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-0.5 text-[10px] font-heading tracking-wider bg-[var(--ht-orange)] text-white rounded-full">
                    {movie.type}
                  </span>
                  <span className="text-xs font-heading text-[var(--ht-text-muted)]">{movie.date}</span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-[var(--ht-text)] mb-2">
                  {movie.title}
                </h3>
                <p className="font-body text-sm text-[var(--ht-text-muted)]">{movie.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

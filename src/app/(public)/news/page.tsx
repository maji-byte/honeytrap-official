"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NewsCard from "@/components/NewsCard";
import { getNews } from "@/lib/cms";
import type { NewsItem } from "@/data/news";

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  useEffect(() => {
    setNews(getNews());
    const handler = () => setNews(getNews());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);
  return (
    <>
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/90 to-[var(--ht-bg)]" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-heading text-xs tracking-[0.4em] text-[var(--ht-text-muted)] mb-4">NEWS</p>
            <h1 className="font-heading text-4xl md:text-7xl font-bold text-[var(--ht-ivory)]">
              最新情報。
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-10 max-w-[1400px] mx-auto">
        <div>
          {news.map((item, i) => (
            <NewsCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

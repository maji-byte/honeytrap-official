"use client";

import { motion } from "framer-motion";
import type { NewsItem } from "@/data/news";
import { categoryColors } from "@/data/news";

type Props = {
  item: NewsItem;
  index: number;
};

export default function NewsCard({ item, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group border-b border-white/5 py-6 md:py-8 flex flex-col md:flex-row md:items-center gap-3 md:gap-8 cursor-pointer hover:border-white/10 transition-colors"
    >
      <time className="font-heading text-xs tracking-wider text-[var(--ht-ivory)]/30 shrink-0 w-28">
        {item.date}
      </time>
      <span
        className="inline-block px-3 py-0.5 text-[10px] font-heading tracking-wider shrink-0 w-fit"
        style={{ backgroundColor: categoryColors[item.category], color: "#1A1A1A" }}
      >
        {item.category}
      </span>
      <div className="flex-1">
        <h3 className="text-sm md:text-base font-body text-[var(--ht-ivory)] group-hover:text-[var(--ht-pink)] transition-colors">
          {item.title}
        </h3>
      </div>
      <span className="hidden md:block text-[var(--ht-ivory)]/20 group-hover:text-[var(--ht-pink)] transition-colors text-lg">
        →
      </span>
    </motion.article>
  );
}

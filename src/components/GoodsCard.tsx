"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { GoodsItem } from "@/data/goods";

type Props = {
  item: GoodsItem;
  index: number;
};

const statusStyles: Record<GoodsItem["status"], { bg: string; text: string }> = {
  "ON SALE": { bg: "var(--ht-teal)", text: "#fff" },
  "PRE-ORDER": { bg: "var(--ht-orange)", text: "#fff" },
  "SOLD OUT": { bg: "#ccc", text: "#888" },
};

export default function GoodsCard({ item, index }: Props) {
  const status = statusStyles[item.status];
  const isSoldOut = item.status === "SOLD OUT";
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // ESCキーで閉じる / 背景スクロール固定
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`group ${isSoldOut ? "opacity-50" : ""}`}
    >
      {/* Card */}
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
        {/* Image */}
        <button
          type="button"
          onClick={() => item.image && setLightboxOpen(true)}
          disabled={!item.image}
          aria-label={`${item.name} を拡大表示`}
          className="relative aspect-square w-full bg-[var(--ht-bg-alt)] overflow-hidden block cursor-zoom-in disabled:cursor-default"
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
            <div className="absolute inset-0 flex items-center justify-center text-[var(--ht-text)]/10 font-heading text-4xl">
              GOODS
            </div>
          )}
          {/* Status badge */}
          <div
            className="absolute top-3 left-3 px-3 py-1 text-[10px] font-heading tracking-wider z-10 rounded-full"
            style={{ backgroundColor: status.bg, color: status.text }}
          >
            {item.status}
          </div>
        </button>

        {/* Info with gradient */}
        <div className="p-4" style={{ background: "linear-gradient(135deg, rgba(232,69,107,0.04), rgba(67,214,208,0.06), transparent)" }}>
          <h3 className="text-sm font-body text-[var(--ht-text)] mb-1">{item.name}</h3>
          <p className="font-heading text-sm text-[var(--ht-text-muted)]">{item.price}</p>

          {!isSoldOut && (
            <a
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-xs font-heading tracking-wider text-[var(--ht-pink)] hover:text-[var(--ht-teal)] transition-colors"
            >
              BUY NOW &rarr;
            </a>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && item.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
              aria-label="閉じる"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl leading-none transition-colors"
            >
              &times;
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-square"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain"
                sizes="100vw"
                unoptimized
                priority
              />
            </motion.div>
            <div className="absolute bottom-6 left-0 right-0 text-center text-white">
              <p className="font-body text-sm">{item.name}</p>
              <p className="font-heading text-xs text-white/60 mt-1">{item.price}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

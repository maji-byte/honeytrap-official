"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { GoodsItem } from "@/data/goods";

type Props = {
  item: GoodsItem;
  index: number;
};

const statusStyles: Record<GoodsItem["status"], { bg: string; text: string }> = {
  "ON SALE": { bg: "var(--ht-teal)", text: "#1A1A1A" },
  "PRE-ORDER": { bg: "var(--ht-orange)", text: "#1A1A1A" },
  "SOLD OUT": { bg: "#555", text: "#999" },
};

export default function GoodsCard({ item, index }: Props) {
  const status = statusStyles[item.status];
  const isSoldOut = item.status === "SOLD OUT";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`group ${isSoldOut ? "opacity-50" : ""}`}
    >
      {/* Image */}
      <div className="relative aspect-square bg-[var(--ht-dark-gray)] overflow-hidden mb-4">
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
          <div className="absolute inset-0 flex items-center justify-center text-[var(--ht-ivory)]/10 font-heading text-4xl">
            GOODS
          </div>
        )}
        {/* Status badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1 text-[10px] font-heading tracking-wider z-10"
          style={{ backgroundColor: status.bg, color: status.text }}
        >
          {item.status}
        </div>
      </div>

      {/* Info */}
      <h3 className="text-sm font-body text-[var(--ht-ivory)] mb-1">{item.name}</h3>
      <p className="font-heading text-sm text-[var(--ht-ivory)]/50">{item.price}</p>

      {!isSoldOut && (
        <a
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-xs font-heading tracking-wider text-[var(--ht-pink)] hover:text-[var(--ht-teal)] transition-colors"
        >
          BUY NOW →
        </a>
      )}
    </motion.div>
  );
}

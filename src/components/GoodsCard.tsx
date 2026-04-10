"use client";

import { motion } from "framer-motion";
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
        <div className="relative aspect-square bg-[var(--ht-bg-alt)] overflow-hidden">
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
        </div>

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
    </motion.div>
  );
}

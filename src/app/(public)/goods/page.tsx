"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import GoodsCard from "@/components/GoodsCard";
import { getGoods } from "@/lib/cms";
import type { GoodsItem } from "@/data/goods";

export default function GoodsPage() {
  const [goodsItems, setGoodsItems] = useState<GoodsItem[]>([]);
  useEffect(() => {
    setGoodsItems(getGoods());
    const handler = () => setGoodsItems(getGoods());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);
  return (
    <>
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/90 to-[var(--ht-bg)]" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-heading text-xs tracking-[0.4em] text-[var(--ht-orange)] mb-4">GOODS</p>
            <h1 className="font-heading text-4xl md:text-7xl font-bold text-[var(--ht-ivory)]">
              グッズを手に入れる。
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-10 max-w-[1400px] mx-auto">
        <SectionHeading title="COLLECTION" subtitle="オフィシャルグッズ" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {goodsItems.map((item, i) => (
            <GoodsCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center py-12 border border-[var(--ht-border)] rounded-2xl bg-white shadow-sm"
        >
          <p className="font-body text-sm text-[var(--ht-text-muted)] mb-4">
            購入は外部ECサイトで承ります
          </p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-3 bg-[var(--ht-pink)] text-white font-heading text-xs tracking-[0.2em] hover:bg-[var(--ht-pink)]/80 transition-colors rounded-full"
          >
            GO TO ONLINE SHOP
          </a>
        </motion.div>
      </section>
    </>
  );
}

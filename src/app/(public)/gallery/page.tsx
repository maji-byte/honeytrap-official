"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { getGallery } from "@/lib/cms";
import type { GalleryItem } from "@/data/gallery";

const categories = ["ALL", "KEY VISUAL", "JACKET", "MANGA", "PROMO"] as const;

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState<string>("ALL");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useEffect(() => {
    setItems(getGallery());
    const handler = () => setItems(getGallery());
    window.addEventListener("ht-cms-update", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ht-cms-update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const filtered = filter === "ALL" ? items : items.filter((item) => item.category === filter);

  return (
    <>
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A] to-[#111111]" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-heading text-xs tracking-[0.4em] text-[var(--ht-teal)] mb-4">GALLERY</p>
            <h1 className="font-heading text-4xl md:text-7xl font-bold text-[var(--ht-ivory)]">
              ビジュアルを見る。
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-10 max-w-[1400px] mx-auto">
        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 text-xs font-heading tracking-wider transition-colors ${
                filter === cat
                  ? "bg-[var(--ht-pink)] text-[var(--ht-ivory)]"
                  : "border border-white/10 text-[var(--ht-ivory)]/40 hover:border-[var(--ht-pink)] hover:text-[var(--ht-pink)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelected(item)}
                className={`cursor-pointer group relative overflow-hidden bg-[var(--ht-dark-gray)] ${
                  item.aspect === "portrait" ? "row-span-2" : item.aspect === "landscape" ? "col-span-2" : ""
                }`}
              >
                <div className={`relative w-full ${
                  item.aspect === "portrait" ? "aspect-[3/4]" : item.aspect === "landscape" ? "aspect-video" : "aspect-square"
                } bg-gradient-to-br from-[var(--ht-dark-gray)] to-[var(--ht-black)]`}>
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading text-xs text-[var(--ht-ivory)]/10">{item.category}</span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-[var(--ht-black)]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <p className="text-xs font-body text-[var(--ht-ivory)]">{item.alt}</p>
                    <p className="text-[10px] font-heading text-[var(--ht-ivory)]/40 mt-1">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-[var(--ht-black)]/95 flex items-center justify-center p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] bg-[var(--ht-dark-gray)] overflow-hidden">
                {selected.src ? (
                  <Image
                    src={selected.src}
                    alt={selected.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-lg text-[var(--ht-ivory)]/10">{selected.category}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-sm font-body text-[var(--ht-ivory)]/60">{selected.alt}</p>
                  <p className="text-xs font-heading text-[var(--ht-ivory)]/20 mt-1">{selected.category}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-xs text-[var(--ht-ivory)]/30 hover:text-[var(--ht-ivory)] font-heading tracking-wider transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

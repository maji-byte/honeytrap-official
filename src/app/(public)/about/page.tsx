"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { getAbout, type AboutContent } from "@/lib/cms";

export default function AboutPage() {
  const [about, setAbout] = useState<AboutContent | null>(null);

  useEffect(() => {
    setAbout(getAbout());
    const handler = () => setAbout(getAbout());
    window.addEventListener("ht-cms-update", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ht-cms-update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  if (!about) return null;

  return (
    <>
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A] to-[#111111]" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-heading text-xs tracking-[0.4em] text-[var(--ht-purple)] mb-4">ABOUT</p>
            <h1 className="font-heading text-4xl md:text-7xl font-bold text-[var(--ht-ivory)]">
              プロジェクトについて。
            </h1>
          </motion.div>
        </div>
      </section>

      {/* PROJECT */}
      <section className="py-24 md:py-32 px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="max-w-3xl">
          <SectionHeading title="PROJECT" subtitle={about.projectHeading} />
          <div className="space-y-8 font-body text-sm text-[var(--ht-ivory)]/60 leading-loose whitespace-pre-line">
            {about.projectBody.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 4 AXES */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[#111111] retro-grain">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <SectionHeading title={`${about.axes.length} AXES`} subtitle={`${about.axes.length}つの展開軸`} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.axes.map((axis, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-white/5 hover:border-[var(--ht-pink)]/30 transition-colors"
              >
                <p className="text-3xl mb-4">{axis.icon}</p>
                <h3 className="font-heading text-lg font-bold text-[var(--ht-ivory)] mb-3">{axis.title}</h3>
                <p className="font-body text-xs text-[var(--ht-ivory)]/40 leading-relaxed">{axis.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CREATOR */}
      <section className="py-24 md:py-32 px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="max-w-3xl">
          <SectionHeading title="CREATOR" subtitle="原作" />
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 bg-[var(--ht-dark-gray)] flex items-center justify-center shrink-0 overflow-hidden relative">
              {about.creator.image ? (
                <Image
                  src={about.creator.image}
                  alt={about.creator.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                  unoptimized
                />
              ) : (
                <span className="font-heading text-2xl text-[var(--ht-ivory)]/10">
                  {about.creator.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="space-y-4 font-body text-sm text-[var(--ht-ivory)]/50 leading-relaxed">
              <p>
                <strong className="text-[var(--ht-ivory)]">{about.creator.name}</strong><br />
                {about.creator.role}
              </p>
              <p className="whitespace-pre-line">{about.creator.bio}</p>
              {about.creator.links.length > 0 && (
                <div className="flex flex-wrap gap-4 pt-2">
                  {about.creator.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-heading tracking-wider text-[var(--ht-teal)] hover:text-[var(--ht-pink)] transition-colors"
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

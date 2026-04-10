"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const links = [
  { label: "YouTube", url: "#", color: "var(--ht-pink)" },
  { label: "Spotify", url: "#", color: "#1DB954" },
  { label: "Apple Music", url: "#", color: "var(--ht-text)" },
  { label: "X (Twitter)", url: "#", color: "var(--ht-teal)" },
  { label: "Instagram", url: "#", color: "var(--ht-orange)" },
  { label: "漫画「ロックが鳴る！」", url: "https://rookie.shonenjump.com/series/OmkvmYUPeL8", color: "var(--ht-purple)" },
  { label: "Online Shop", url: "#", color: "var(--ht-pink)" },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A]/90 to-[var(--ht-bg)]" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-heading text-xs tracking-[0.4em] text-[var(--ht-text-muted)] mb-4">CONTACT & LINK</p>
            <h1 className="font-heading text-4xl md:text-7xl font-bold text-[var(--ht-ivory)]">
              つながる。
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Links */}
      <section className="py-16 md:py-24 px-6 md:px-10 max-w-[1400px] mx-auto">
        <SectionHeading title="LINKS" subtitle="各種リンク" />
        <div className="max-w-2xl space-y-0">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-center justify-between py-6 border-b border-[var(--ht-border)] hover:border-[var(--ht-pink)]/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: link.color }} />
                <span className="font-heading text-sm md:text-base tracking-wider text-[var(--ht-text)] group-hover:text-[var(--ht-pink)] transition-colors">
                  {link.label}
                </span>
              </div>
              <span className="text-[var(--ht-text)]/20 group-hover:text-[var(--ht-pink)] transition-colors">&rarr;</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[var(--ht-bg-alt)]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading title="CONTACT" subtitle="お問い合わせ" />
          <div className="max-w-2xl">
            <p className="font-body text-sm text-[var(--ht-text-muted)] mb-8 leading-relaxed">
              HoneyTrapに関するお問い合わせ、コラボレーション、メディア掲載等のご依頼は
              下記メールアドレスまでお願いいたします。
            </p>
            <div className="p-8 bg-white border border-[var(--ht-border)] rounded-2xl shadow-sm">
              <p className="font-heading text-xs tracking-[0.2em] text-[var(--ht-text-muted)] mb-2">MAIL</p>
              <p className="font-heading text-lg text-[var(--ht-pink)]">
                contact@honeytrap-official.com
              </p>
              <p className="font-body text-xs text-[var(--ht-text-muted)] mt-4">
                ※ 個人的なファンレター等にはお返事できかねます。ご了承ください。
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

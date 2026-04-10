"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { getMembers, getStoryTeaser, type StoryTeaser } from "@/lib/cms";
import type { Member } from "@/data/members";

export default function StoryPage() {
  const [story, setStory] = useState<StoryTeaser | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    setStory(getStoryTeaser());
    setMembers(getMembers());
    const handler = () => {
      setStory(getStoryTeaser());
      setMembers(getMembers());
    };
    window.addEventListener("ht-cms-update", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ht-cms-update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A] to-[#2A1525]" />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-[var(--ht-purple)]/5 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 md:pb-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-heading text-xs tracking-[0.4em] text-[var(--ht-pink)] mb-4">THE STORY</p>
            <h1 className="font-heading text-4xl md:text-7xl font-bold text-[var(--ht-ivory)] leading-tight">
              漫画のページから、<br />ロックが鳴り出す。
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Origin */}
      <section className="py-24 md:py-32 px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading title="ORIGIN" subtitle="はじまり" />
            <div className="space-y-6 font-body text-sm text-[var(--ht-ivory)]/60 leading-loose">
              <p>
                「かっこいい！」ではなく、「私でもできそう」。<br />
                そんな小さくて、少し情けない動機から、すべては始まった。
              </p>
              <p>
                主人公・鳴世は、どこにも居場所がなかった。<br />
                教室の隅で、何者にもなれない自分を持て余していた。<br />
                ある日、手に取ったギター。不格好なコード。<br />
                でも、その音には不思議な熱があった。
              </p>
              <p>
                クールで寡黙なギタリスト・レイ。<br />
                面倒見のいいベーシスト・マコ。<br />
                破天荒なドラマー・ヒナ。<br />
                クセの強い3人と出会い、HoneyTrapは動き出す。
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-[var(--ht-dark-gray)] to-[var(--ht-black)] border border-white/5 relative overflow-hidden">
              {story?.image ? (
                <Image
                  src={story.image}
                  alt="THE STORY"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-8">
                    <p className="font-heading text-6xl text-[var(--ht-ivory)]/10 mb-4">📖</p>
                    <p className="font-body text-sm text-[var(--ht-ivory)]/30 leading-relaxed">
                      漫画「ロックが鳴る！」<br />ジャンプルーキー！にて連載中
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 border border-[var(--ht-pink)]/20" />
          </motion.div>
        </div>
      </section>

      {/* Members in Story */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[#0A0A0A]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading title="CHARACTERS" subtitle="登場人物" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {members.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div
                  className="relative aspect-[3/4] overflow-hidden mb-4"
                  style={{ background: `linear-gradient(135deg, ${member.color}15, ${member.color}30)` }}
                >
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl">{member.partIcon}</span>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: member.color }} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="font-heading text-lg font-bold text-[var(--ht-ivory)]">{member.nameEn}</p>
                    <p className="text-xs text-[var(--ht-ivory)]/50 font-body">{member.name} / {member.part}</p>
                  </div>
                </div>
                <p className="text-xs font-body leading-relaxed" style={{ color: member.color }}>
                  「{member.catchcopy}」
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* World */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-[#111111] retro-grain">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <SectionHeading title="WORLD" subtitle="漫画と現実が接続する世界" />
          <div className="max-w-3xl space-y-8 font-body text-sm text-[var(--ht-ivory)]/60 leading-loose">
            <p>
              HoneyTrapは、漫画「ロックが鳴る！」の中で生まれたガールズロックバンド。<br />
              しかし彼女たちの音楽は、漫画のコマの中だけには収まらなかった。
            </p>
            <p>
              ページをめくるたびに聴こえてくるギターリフ。<br />
              コマの外に溢れ出すドラムのビート。<br />
              鳴世の歌声が、紙の上から現実世界へと響き始める。
            </p>
            <p>
              漫画から音楽へ。音楽からMVへ。MVからライブへ。<br />
              フィクションとリアルの境界線が溶けていく──<br />
              それがHoneyTrapというプロジェクトの本質。
            </p>
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border-l-2 border-[var(--ht-pink)] pl-6 py-2 text-[var(--ht-ivory)]/40 italic"
            >
              &quot;このバンドは、本当に存在するのかもしれない。&quot;
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 px-6 md:px-10 max-w-[1400px] mx-auto">
        <SectionHeading title="TIMELINE" subtitle="これまでの歩み" />
        <div className="max-w-2xl space-y-0">
          {[
            { date: "2026.03", event: "漫画「ロックが鳴る！」連載開始", sub: "ジャンプルーキー！" },
            { date: "2026.04", event: "HoneyTrap プロジェクト始動", sub: "" },
            { date: "2026.04", event: "公式サイトオープン", sub: "" },
            { date: "2026.04", event: "1st Single「ロックが鳴る」配信開始", sub: "Spotify / Apple Music" },
            { date: "Coming", event: "Music Video 公開", sub: "" },
            { date: "Coming", event: "2nd Single", sub: "" },
            { date: "Future", event: "Live? Anime? ...", sub: "to be continued" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-6 md:gap-10 py-6 border-b border-white/5"
            >
              <span className={`font-heading text-xs tracking-wider shrink-0 w-20 ${
                item.date === "Coming" || item.date === "Future"
                  ? "text-[var(--ht-pink)]"
                  : "text-[var(--ht-ivory)]/30"
              }`}>
                {item.date}
              </span>
              <div>
                <p className="text-sm font-body text-[var(--ht-ivory)]">{item.event}</p>
                {item.sub && (
                  <p className="text-xs font-body text-[var(--ht-ivory)]/30 mt-1">{item.sub}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-10 bg-gradient-to-r from-[var(--ht-pink)]/10 to-[var(--ht-teal)]/10 text-center">
        <p className="font-body text-sm text-[var(--ht-ivory)]/40 mb-4">物語を最初から読む</p>
        <a
          href={story?.mangaUrl || "https://rookie.shonenjump.com/series/OmkvmYUPeL8"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-[var(--ht-pink)] text-[var(--ht-ivory)] font-heading text-xs tracking-[0.2em] hover:bg-[var(--ht-pink)]/80 transition-colors"
        >
          READ 「ロックが鳴る！」 ON JUMP ROOKIE!
        </a>
      </section>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { getMembers } from "@/lib/cms";
import type { Member } from "@/data/members";

export default function MemberPage() {
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    setMembers(getMembers());
    const handler = () => setMembers(getMembers());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#1A1A1A] to-[#111111]" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-heading text-xs tracking-[0.4em] text-[var(--ht-teal)] mb-4">MEMBER</p>
            <h1 className="font-heading text-4xl md:text-7xl font-bold text-[var(--ht-ivory)]">
              4人の物語。
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Members Detail */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-[#111111]">
        <div className="max-w-[1400px] mx-auto">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-16 md:py-24 ${
                i < members.length - 1 ? "border-b border-white/5" : ""
              } ${i % 2 === 1 ? "md:direction-rtl" : ""}`}
            >
              {/* Visual */}
              <div className={`${i % 2 === 1 ? "md:order-2" : ""}`}>
                <div
                  className="relative aspect-[3/4] overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${member.color}15, ${member.color}30)` }}
                >
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl md:text-9xl">{member.partIcon}</span>
                    </div>
                  )}
                  <div
                    className="absolute top-0 left-0 w-full h-1"
                    style={{ backgroundColor: member.color }}
                  />
                </div>
              </div>

              {/* Info */}
              <div className={`${i % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
                <p
                  className="font-heading text-xs tracking-[0.3em] mb-3"
                  style={{ color: member.color }}
                >
                  {member.part.toUpperCase()}
                </p>
                <h2 className="font-heading text-5xl md:text-7xl font-bold text-[var(--ht-ivory)] mb-2">
                  {member.nameEn}
                </h2>
                <p className="font-body text-lg text-[var(--ht-ivory)]/40 mb-6">{member.name}</p>
                <p
                  className="font-body text-base mb-8 leading-relaxed"
                  style={{ color: member.color }}
                >
                  「{member.catchcopy}」
                </p>
                <p className="font-body text-sm text-[var(--ht-ivory)]/50 leading-loose max-w-lg">
                  {member.description}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-xs font-heading tracking-wider text-[var(--ht-ivory)]/20">PERSONALITY</span>
                  <span className="text-xs font-body text-[var(--ht-ivory)]/40">{member.personality}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Band Chemistry */}
      <section className="py-24 md:py-32 px-6 md:px-10 max-w-[1400px] mx-auto">
        <SectionHeading title="CHEMISTRY" subtitle="4人の関係性" />
        <div className="max-w-3xl space-y-6 font-body text-sm text-[var(--ht-ivory)]/50 leading-loose">
          <p>
            鳴世のまっすぐな衝動。レイの静かな才能。マコの揺るぎない支え。ヒナの爆発するエネルギー。
          </p>
          <p>
            4人がそれぞれ持つ欠けた部分を、バンドという形が埋めていく。
            ひとりでは鳴らせなかった音が、4人が揃った瞬間に鳴り出す──
            それがHoneyTrap。
          </p>
        </div>
      </section>
    </>
  );
}

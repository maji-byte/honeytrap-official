"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Member } from "@/data/members";

type Props = {
  member: Member;
  index: number;
};

export default function MemberCard({ member, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Member image */}
      <div
        className="relative aspect-[3/4] overflow-hidden mb-5"
        style={{ background: `linear-gradient(135deg, ${member.color}20, ${member.color}40)` }}
      >
        <Image
          src={member.image}
          alt={`${member.name} - ${member.part}`}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 50vw, 25vw"
          unoptimized
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <p className="text-xs text-[var(--ht-ivory)]/80 font-body leading-relaxed">
            {member.personality}
          </p>
        </div>
        {/* Part badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 text-[10px] font-heading tracking-wider"
          style={{ backgroundColor: member.color, color: "#1A1A1A" }}
        >
          {member.part}
        </div>
      </div>

      {/* Info */}
      <div>
        <h3 className="font-heading text-xl font-bold tracking-wider text-[var(--ht-ivory)]">
          {member.nameEn}
        </h3>
        <p className="text-sm text-[var(--ht-ivory)]/50 font-body mt-1">{member.name}</p>
        <p
          className="text-xs mt-3 font-body leading-relaxed"
          style={{ color: member.color }}
        >
          {member.catchcopy}
        </p>
      </div>
    </motion.div>
  );
}

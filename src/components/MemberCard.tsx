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
      {/* Card with shadow */}
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
        {/* Member image */}
        <div
          className="relative aspect-[3/4] overflow-hidden"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-xs text-white/90 font-body leading-relaxed">
              {member.personality}
            </p>
          </div>
          {/* Part badge */}
          <div
            className="absolute top-3 right-3 px-3 py-1 text-[10px] font-heading tracking-wider rounded-full"
            style={{ backgroundColor: member.color, color: "#fff" }}
          >
            {member.part}
          </div>
        </div>

        {/* Info with gradient accent */}
        <div
          className="p-4 relative"
          style={{
            background: `linear-gradient(135deg, ${member.color}08, ${member.color}15, transparent)`,
          }}
        >
          <h3 className="font-heading text-xl font-bold tracking-wider text-[var(--ht-text)]">
            {member.nameEn}
          </h3>
          <p className="text-sm text-[var(--ht-text-muted)] font-body mt-1">{member.name}</p>
          <p
            className="text-xs mt-3 font-body leading-relaxed"
            style={{ color: member.color }}
          >
            {member.catchcopy}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

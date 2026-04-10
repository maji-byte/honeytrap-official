"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({ title, subtitle, align = "left", light = false }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      <h2
        className={`section-heading text-3xl md:text-5xl ${
          light ? "text-[var(--ht-black)]" : "text-[var(--ht-ivory)]"
        }`}
        style={align === "center" ? { display: "inline-block" } : undefined}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-sm tracking-wider font-body ${
            light ? "text-[var(--ht-black)]/50" : "text-[var(--ht-ivory)]/40"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

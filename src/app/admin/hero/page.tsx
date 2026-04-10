"use client";

import { useEffect, useState } from "react";
import {
  getHeroContent,
  saveHeroContent,
  resetHeroContent,
  type HeroContent,
  type HeroMediaType,
} from "@/lib/cms";
import ImageUploader from "@/components/admin/ImageUploader";
import VideoUploader from "@/components/admin/VideoUploader";

export default function AdminHero() {
  const [form, setForm] = useState<HeroContent | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(getHeroContent());
  }, []);

  if (!form) return null;

  const handleSave = () => {
    saveHeroContent(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaults = resetHeroContent();
    setForm(defaults);
  };

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[var(--ht-ivory)] tracking-wider">
            Hero セクション
          </h1>
          <p className="text-sm text-[var(--ht-ivory)]/40 font-body mt-1">
            トップページのメインビジュアル・テキスト編集
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 border border-white/10 rounded-lg hover:border-white/20 hover:text-[var(--ht-ivory)]/60 transition-all"
          >
            リセット
          </button>
          <button
            onClick={handleSave}
            className={`px-6 py-2 text-xs font-heading tracking-wider rounded-lg transition-all ${
              saved
                ? "bg-green-500 text-white"
                : "bg-[var(--ht-pink)] text-white hover:bg-[var(--ht-pink)]/80"
            }`}
          >
            {saved ? "✓ 保存しました" : "保存する"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* サブタイトル */}
        <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
          <label className="block text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 mb-2">
            サブタイトル
          </label>
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-3 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
          />
          <p className="text-[10px] text-[var(--ht-ivory)]/20 mt-2">
            ロゴの上に表示される英字テキスト
          </p>
        </div>

        {/* タグライン */}
        <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
          <label className="block text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 mb-2">
            タグライン
          </label>
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-3 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
          />
          <p className="text-[10px] text-[var(--ht-ivory)]/20 mt-2">
            ロゴの下に表示されるキャッチコピー
          </p>
        </div>

        {/* CTA ボタン */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
            <label className="block text-xs font-heading tracking-wider text-[var(--ht-pink)] mb-4">
              CTA ボタン 1（メイン）
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">ラベル</label>
                <input
                  type="text"
                  value={form.ctaPrimary.label}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ctaPrimary: { ...form.ctaPrimary, label: e.target.value },
                    })
                  }
                  className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">リンク先</label>
                <input
                  type="text"
                  value={form.ctaPrimary.href}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ctaPrimary: { ...form.ctaPrimary, href: e.target.value },
                    })
                  }
                  className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)]/50 font-mono text-xs focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
            <label className="block text-xs font-heading tracking-wider text-[var(--ht-teal)] mb-4">
              CTA ボタン 2（サブ）
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">ラベル</label>
                <input
                  type="text"
                  value={form.ctaSecondary.label}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ctaSecondary: { ...form.ctaSecondary, label: e.target.value },
                    })
                  }
                  className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">リンク先</label>
                <input
                  type="text"
                  value={form.ctaSecondary.href}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ctaSecondary: { ...form.ctaSecondary, href: e.target.value },
                    })
                  }
                  className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)]/50 font-mono text-xs focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hero メディア（画像 / 動画 切替） */}
        <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
          <label className="block text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 mb-4">
            Hero 背景メディア
          </label>

          {/* メディアタイプ切替タブ */}
          <div className="flex gap-1 mb-5 bg-[#111115] rounded-lg p-1 w-fit">
            {(["image", "video"] as HeroMediaType[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setForm({ ...form, heroMediaType: type });
                }}
                className={`px-5 py-2 text-xs font-heading tracking-wider rounded-md transition-all ${
                  form.heroMediaType === type
                    ? "bg-[var(--ht-pink)] text-white"
                    : "text-[var(--ht-ivory)]/40 hover:text-[var(--ht-ivory)]/60"
                }`}
              >
                {type === "image" ? "🖼 画像" : "🎬 動画"}
              </button>
            ))}
          </div>

          {/* 画像アップローダー */}
          {form.heroMediaType === "image" && (
            <div>
              <div className="max-w-md">
                <ImageUploader
                  currentImage={form.heroImage}
                  uploadPath="images/hero/hero-main.jpg"
                  onUploaded={(newPath) => {
                    const updated = { ...form, heroImage: newPath, heroMediaType: "image" as HeroMediaType };
                    setForm(updated);
                    saveHeroContent(updated);
                    showSaved();
                  }}
                  aspectRatio="16/9"
                  label=""
                />
              </div>
              <p className="text-[10px] text-[var(--ht-ivory)]/20 mt-2">
                推奨: 1920×1080px 以上、16:9比率
              </p>
            </div>
          )}

          {/* 動画アップローダー */}
          {form.heroMediaType === "video" && (
            <div>
              <div className="max-w-md">
                <VideoUploader
                  currentVideo={form.heroVideo}
                  uploadPath="videos/hero/hero-bg.mp4"
                  onUploaded={(newPath) => {
                    const updated = { ...form, heroVideo: newPath, heroMediaType: "video" as HeroMediaType };
                    setForm(updated);
                    saveHeroContent(updated);
                    showSaved();
                  }}
                  label=""
                />
              </div>
              <p className="text-[10px] text-[var(--ht-ivory)]/20 mt-2">
                推奨: MP4 / WebM、1920×1080以上、200MB以下
              </p>
            </div>
          )}
        </div>

        {/* Live Preview */}
        <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
          <label className="block text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 mb-4">
            プレビュー
          </label>
          <div className="bg-[#111115] rounded-lg p-8 text-center relative overflow-hidden" style={{ minHeight: "200px" }}>
            {/* 背景メディアプレビュー */}
            {form.heroMediaType === "video" && form.heroVideo ? (
              <video
                src={form.heroVideo}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
                muted
                loop
                autoPlay
                playsInline
              />
            ) : form.heroImage ? (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${form.heroImage})` }}
              />
            ) : null}

            <div className="relative z-10">
              <p className="font-heading text-[10px] tracking-[0.4em] text-[var(--ht-ivory)]/30 mb-3">
                {form.subtitle}
              </p>
              <h2 className="font-heading text-4xl font-bold">
                <span className="gradient-text">Honey</span>
                <span className="text-[var(--ht-ivory)]">Trap</span>
              </h2>
              <p className="mt-3 text-sm text-[var(--ht-ivory)]/40 font-body">
                {form.tagline}
              </p>
              <div className="mt-6 flex gap-3 justify-center">
                <span className="px-5 py-2 bg-[var(--ht-pink)] text-white text-[10px] font-heading tracking-wider">
                  {form.ctaPrimary.label}
                </span>
                <span className="px-5 py-2 border border-white/20 text-white/60 text-[10px] font-heading tracking-wider">
                  {form.ctaSecondary.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

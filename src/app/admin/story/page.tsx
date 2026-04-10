"use client";

import { useEffect, useState } from "react";
import {
  getStoryTeaser,
  saveStoryTeaser,
  resetStoryTeaser,
  type StoryTeaser,
} from "@/lib/cms";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminStory() {
  const [form, setForm] = useState<StoryTeaser | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(getStoryTeaser());
  }, []);

  if (!form) return null;

  const handleSave = () => {
    saveStoryTeaser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaults = resetStoryTeaser();
    setForm(defaults);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[var(--ht-ivory)] tracking-wider">
            ストーリー
          </h1>
          <p className="text-sm text-[var(--ht-ivory)]/40 font-body mt-1">
            トップページ「THE STORY」セクションの編集
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
        {/* 見出し */}
        <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
          <label className="block text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 mb-2">
            見出し
          </label>
          <textarea
            value={form.heading}
            onChange={(e) => setForm({ ...form, heading: e.target.value })}
            rows={2}
            className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-3 text-lg text-[var(--ht-ivory)] font-heading focus:border-[var(--ht-pink)] focus:outline-none transition-colors resize-none"
          />
          <p className="text-[10px] text-[var(--ht-ivory)]/20 mt-2">
            改行で折り返し位置を指定できます
          </p>
        </div>

        {/* 本文 */}
        <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
          <label className="block text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 mb-2">
            本文
          </label>
          <textarea
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            rows={10}
            className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-3 text-sm text-[var(--ht-ivory)] font-body leading-relaxed focus:border-[var(--ht-pink)] focus:outline-none transition-colors resize-none"
          />
          <p className="text-[10px] text-[var(--ht-ivory)]/20 mt-2">
            改行はそのまま反映されます
          </p>
        </div>

        {/* ストーリー画像 */}
        <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
          <label className="block text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 mb-4">
            イメージ画像
          </label>
          <div className="w-48">
            <ImageUploader
              currentImage={form.image}
              uploadPath="images/story/story-teaser.jpg"
              onUploaded={(newPath) => {
                const updated = { ...form, image: newPath };
                setForm(updated);
                saveStoryTeaser(updated);
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
              }}
              aspectRatio="3/4"
              label=""
            />
          </div>
          <p className="text-[10px] text-[var(--ht-ivory)]/20 mt-2">
            推奨: 3:4比率（漫画の表紙やキービジュアルなど）
          </p>
        </div>

        {/* 漫画リンク */}
        <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
          <label className="block text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 mb-4">
            漫画リンク
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">URL</label>
              <input
                type="text"
                value={form.mangaUrl}
                onChange={(e) => setForm({ ...form, mangaUrl: e.target.value })}
                className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-[var(--ht-ivory)]/50 font-mono focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">ラベル</label>
              <input
                type="text"
                value={form.mangaLabel}
                onChange={(e) => setForm({ ...form, mangaLabel: e.target.value })}
                className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* プレビュー */}
        <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
          <label className="block text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 mb-4">
            プレビュー
          </label>
          <div className="bg-[#111115] rounded-lg p-8">
            <p className="font-heading text-xs tracking-[0.3em] text-[var(--ht-pink)] mb-4">
              THE STORY
            </p>
            <h2 className="font-heading text-2xl font-bold text-[var(--ht-ivory)] leading-tight mb-6 whitespace-pre-line">
              {form.heading}
            </h2>
            <p className="font-body text-sm text-[var(--ht-ivory)]/50 leading-loose whitespace-pre-line">
              {form.body}
            </p>
            <div className="mt-6 flex gap-4">
              <span className="px-5 py-2 border border-white/20 text-white/60 text-[10px] font-heading tracking-wider">
                READ THE STORY
              </span>
              <span className="px-5 py-2 text-[var(--ht-teal)] text-[10px] font-heading tracking-wider">
                {form.mangaLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

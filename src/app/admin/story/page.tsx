"use client";

import { useEffect, useState } from "react";
import {
  getStoryTeaser,
  saveStoryTeaser,
  resetStoryTeaser,
  getStoryPage,
  saveStoryPage,
  resetStoryPage,
  type StoryTeaser,
  type StoryPageContent,
  type TimelineItem,
} from "@/lib/cms";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminStory() {
  const [form, setForm] = useState<StoryTeaser | null>(null);
  const [page, setPage] = useState<StoryPageContent | null>(null);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"teaser" | "origin" | "world" | "timeline">("teaser");

  useEffect(() => {
    setForm(getStoryTeaser());
    setPage(getStoryPage());
  }, []);

  if (!form || !page) return null;

  const flash = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveTeaser = () => {
    saveStoryTeaser(form);
    flash();
  };

  const handleSavePage = (updated: StoryPageContent) => {
    setPage(updated);
    saveStoryPage(updated);
    flash();
  };

  const handleReset = () => {
    if (!confirm("ストーリーをデフォルトに戻しますか？")) return;
    setForm(resetStoryTeaser());
    setPage(resetStoryPage());
  };

  const updateTimeline = (index: number, field: keyof TimelineItem, value: string) => {
    const timeline = [...page.timeline];
    timeline[index] = { ...timeline[index], [field]: value };
    handleSavePage({ ...page, timeline });
  };

  const addTimelineItem = () => {
    handleSavePage({
      ...page,
      timeline: [...page.timeline, { date: "", event: "", sub: "" }],
    });
  };

  const removeTimelineItem = (index: number) => {
    handleSavePage({
      ...page,
      timeline: page.timeline.filter((_, i) => i !== index),
    });
  };

  const moveTimelineItem = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= page.timeline.length) return;
    const timeline = [...page.timeline];
    [timeline[index], timeline[newIndex]] = [timeline[newIndex], timeline[index]];
    handleSavePage({ ...page, timeline });
  };

  const tabs = [
    { id: "teaser" as const, label: "トップページ", desc: "THE STORYティザー" },
    { id: "origin" as const, label: "ORIGIN", desc: "はじまり" },
    { id: "world" as const, label: "WORLD", desc: "世界観" },
    { id: "timeline" as const, label: "TIMELINE", desc: "これまでの歩み" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[var(--ht-ivory)] tracking-wider">
            ストーリー管理
          </h1>
          <p className="text-xs text-[var(--ht-ivory)]/30 font-body mt-1">
            トップページティザー＆ストーリーページの編集
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 border border-white/10 rounded-lg hover:border-white/20 hover:text-[var(--ht-ivory)]/60 transition-all"
          >
            リセット
          </button>
          {tab === "teaser" && (
            <button
              onClick={handleSaveTeaser}
              className={`px-6 py-2 text-xs font-heading tracking-wider rounded-lg transition-all ${
                saved
                  ? "bg-green-500 text-white"
                  : "bg-[var(--ht-pink)] text-white hover:bg-[var(--ht-pink)]/80"
              }`}
            >
              {saved ? "保存しました" : "保存する"}
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-[#111115] rounded-lg p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 px-4 py-2.5 rounded-md text-xs font-heading tracking-wider transition-all ${
              tab === t.id
                ? "bg-[var(--ht-pink)] text-[var(--ht-ivory)]"
                : "text-[var(--ht-ivory)]/40 hover:text-[var(--ht-ivory)]/70"
            }`}
          >
            <span className="block">{t.label}</span>
            <span className="block text-[9px] mt-0.5 opacity-60">{t.desc}</span>
          </button>
        ))}
      </div>

      {/* ===== トップページティザー ===== */}
      {tab === "teaser" && (
        <div className="space-y-6">
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
            <p className="text-[10px] text-[var(--ht-ivory)]/20 mt-2">改行で折り返し位置を指定できます</p>
          </div>

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
          </div>

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
                  flash();
                }}
                aspectRatio="3/4"
                label=""
              />
            </div>
          </div>

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
                  className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-[var(--ht-ivory)]/50 font-mono focus:border-[var(--ht-pink)] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">ラベル</label>
                <input
                  type="text"
                  value={form.mangaLabel}
                  onChange={(e) => setForm({ ...form, mangaLabel: e.target.value })}
                  className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== ORIGIN ===== */}
      {tab === "origin" && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
            <label className="block text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 mb-2">
              ORIGIN「はじまり」の本文
            </label>
            <textarea
              value={page.originBody}
              onChange={(e) => handleSavePage({ ...page, originBody: e.target.value })}
              rows={14}
              className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-3 text-sm text-[var(--ht-ivory)] font-body leading-relaxed focus:border-[var(--ht-pink)] focus:outline-none transition-colors resize-none"
            />
            <p className="text-[10px] text-[var(--ht-ivory)]/20 mt-2">
              空行（改行2つ）で段落分け。改行1つはそのまま反映されます。
            </p>
          </div>

          {/* プレビュー */}
          <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
            <label className="block text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 mb-4">
              プレビュー
            </label>
            <div className="bg-[#111115] rounded-lg p-8">
              <p className="font-heading text-xs tracking-[0.3em] text-[var(--ht-pink)] mb-2">ORIGIN</p>
              <p className="font-body text-xs text-[var(--ht-ivory)]/30 mb-6">はじまり</p>
              <div className="space-y-6 font-body text-sm text-[var(--ht-ivory)]/60 leading-loose">
                {page.originBody.split("\n\n").map((p, i) => (
                  <p key={i} className="whitespace-pre-line">{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== WORLD ===== */}
      {tab === "world" && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
            <label className="block text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 mb-2">
              WORLD「漫画と現実が接続する世界」の本文
            </label>
            <textarea
              value={page.worldBody}
              onChange={(e) => handleSavePage({ ...page, worldBody: e.target.value })}
              rows={12}
              className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-3 text-sm text-[var(--ht-ivory)] font-body leading-relaxed focus:border-[var(--ht-pink)] focus:outline-none transition-colors resize-none"
            />
            <p className="text-[10px] text-[var(--ht-ivory)]/20 mt-2">
              空行で段落分け。最後の段落は引用（ブロッククォート）として表示されます。
            </p>
          </div>

          {/* プレビュー */}
          <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
            <label className="block text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 mb-4">
              プレビュー
            </label>
            <div className="bg-[#111115] rounded-lg p-8">
              <p className="font-heading text-xs tracking-[0.3em] text-[var(--ht-pink)] mb-2">WORLD</p>
              <p className="font-body text-xs text-[var(--ht-ivory)]/30 mb-6">漫画と現実が接続する世界</p>
              <div className="max-w-3xl space-y-8 font-body text-sm text-[var(--ht-ivory)]/60 leading-loose">
                {page.worldBody.split("\n\n").map((p, i, arr) =>
                  i === arr.length - 1 ? (
                    <blockquote key={i} className="border-l-2 border-[var(--ht-pink)] pl-6 py-2 text-[var(--ht-ivory)]/40 italic whitespace-pre-line">
                      &quot;{p}&quot;
                    </blockquote>
                  ) : (
                    <p key={i} className="whitespace-pre-line">{p}</p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== TIMELINE ===== */}
      {tab === "timeline" && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40">
                TIMELINE「これまでの歩み」
              </label>
              <button
                onClick={addTimelineItem}
                className="px-3 py-1 text-xs font-heading tracking-wider bg-[var(--ht-pink)] text-[var(--ht-ivory)] hover:bg-[var(--ht-pink)]/80 transition-colors rounded"
              >
                + 追加
              </button>
            </div>

            <div className="space-y-3">
              {page.timeline.map((item, i) => (
                <div key={i} className="bg-[#111115] border border-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-[var(--ht-ivory)]/20 font-heading">#{i + 1}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveTimelineItem(i, -1)}
                        className="w-6 h-6 text-[10px] text-[var(--ht-ivory)]/30 hover:text-[var(--ht-ivory)] border border-white/10 rounded transition-colors"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveTimelineItem(i, 1)}
                        className="w-6 h-6 text-[10px] text-[var(--ht-ivory)]/30 hover:text-[var(--ht-ivory)] border border-white/10 rounded transition-colors"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => removeTimelineItem(i)}
                        className="text-[10px] text-red-400/40 hover:text-red-400 transition-colors ml-2"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr_1fr] gap-3">
                    <div>
                      <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">日付</label>
                      <input
                        type="text"
                        value={item.date}
                        onChange={(e) => updateTimeline(i, "date", e.target.value)}
                        placeholder="2026.04"
                        className="w-full bg-[#0A0A0F] border border-white/10 rounded px-2 py-1.5 text-xs text-[var(--ht-ivory)] font-heading focus:border-[var(--ht-pink)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">イベント</label>
                      <input
                        type="text"
                        value={item.event}
                        onChange={(e) => updateTimeline(i, "event", e.target.value)}
                        className="w-full bg-[#0A0A0F] border border-white/10 rounded px-2 py-1.5 text-xs text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">補足</label>
                      <input
                        type="text"
                        value={item.sub}
                        onChange={(e) => updateTimeline(i, "sub", e.target.value)}
                        placeholder="任意"
                        className="w-full bg-[#0A0A0F] border border-white/10 rounded px-2 py-1.5 text-xs text-[var(--ht-ivory)]/50 font-body focus:border-[var(--ht-pink)] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getAbout, saveAbout, resetAbout, type AboutContent, type AboutAxis } from "@/lib/cms";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminAboutPage() {
  const [about, setAbout] = useState<AboutContent | null>(null);

  useEffect(() => {
    setAbout(getAbout());
  }, []);

  if (!about) return null;

  const save = (updated: AboutContent) => {
    setAbout(updated);
    saveAbout(updated);
  };

  const updateField = <K extends keyof AboutContent>(key: K, value: AboutContent[K]) => {
    save({ ...about, [key]: value });
  };

  const updateAxis = (index: number, field: keyof AboutAxis, value: string) => {
    const axes = [...about.axes];
    axes[index] = { ...axes[index], [field]: value };
    save({ ...about, axes });
  };

  const addAxis = () => {
    save({ ...about, axes: [...about.axes, { icon: "🔗", title: "NEW", desc: "" }] });
  };

  const removeAxis = (index: number) => {
    save({ ...about, axes: about.axes.filter((_, i) => i !== index) });
  };

  const updateCreatorField = (field: string, value: string) => {
    save({ ...about, creator: { ...about.creator, [field]: value } });
  };

  const updateLink = (index: number, field: "label" | "url", value: string) => {
    const links = [...about.creator.links];
    links[index] = { ...links[index], [field]: value };
    save({ ...about, creator: { ...about.creator, links } });
  };

  const addLink = () => {
    save({
      ...about,
      creator: { ...about.creator, links: [...about.creator.links, { label: "", url: "" }] },
    });
  };

  const removeLink = (index: number) => {
    save({
      ...about,
      creator: { ...about.creator, links: about.creator.links.filter((_, i) => i !== index) },
    });
  };

  const handleReset = () => {
    if (!confirm("ABOUTをデフォルトに戻しますか？")) return;
    setAbout(resetAbout());
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[var(--ht-ivory)]">アバウト管理</h1>
          <p className="text-xs text-[var(--ht-ivory)]/30 mt-1 font-body">ABOUTページの内容を管理</p>
        </div>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-xs font-heading tracking-wider border border-white/10 text-[var(--ht-ivory)]/40 hover:text-[var(--ht-ivory)] hover:border-white/30 transition-colors rounded"
        >
          リセット
        </button>
      </div>

      <div className="space-y-10">
        {/* ===== PROJECT セクション ===== */}
        <section className="bg-[#111115] rounded-xl border border-white/5 p-6">
          <h2 className="font-heading text-sm text-[var(--ht-pink)] tracking-wider mb-5">PROJECT セクション</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">見出し（サブタイトル）</label>
              <input
                type="text"
                value={about.projectHeading}
                onChange={(e) => updateField("projectHeading", e.target.value)}
                className="w-full bg-[#0A0A0F] border border-white/10 rounded px-3 py-2 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">本文</label>
              <textarea
                value={about.projectBody}
                onChange={(e) => updateField("projectBody", e.target.value)}
                rows={8}
                className="w-full bg-[#0A0A0F] border border-white/10 rounded px-3 py-2 text-sm text-[var(--ht-ivory)] font-body leading-relaxed focus:border-[var(--ht-pink)] focus:outline-none resize-none"
              />
              <p className="text-[10px] text-[var(--ht-ivory)]/20 mt-1">改行はそのまま反映されます</p>
            </div>
          </div>
        </section>

        {/* ===== 4 AXES セクション ===== */}
        <section className="bg-[#111115] rounded-xl border border-white/5 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-sm text-[var(--ht-pink)] tracking-wider">展開軸（AXES）</h2>
            <button
              onClick={addAxis}
              className="px-3 py-1 text-xs font-heading tracking-wider bg-[var(--ht-pink)] text-[var(--ht-ivory)] hover:bg-[var(--ht-pink)]/80 transition-colors rounded"
            >
              + 追加
            </button>
          </div>

          <div className="space-y-4">
            {about.axes.map((axis, i) => (
              <div key={i} className="bg-[#0A0A0F] border border-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[var(--ht-ivory)]/30 font-heading">AXIS {i + 1}</span>
                  <button
                    onClick={() => removeAxis(i)}
                    className="text-[10px] text-red-400/60 hover:text-red-400 transition-colors"
                  >
                    削除
                  </button>
                </div>
                <div className="grid grid-cols-[60px_1fr] gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">アイコン</label>
                    <input
                      type="text"
                      value={axis.icon}
                      onChange={(e) => updateAxis(i, "icon", e.target.value)}
                      className="w-full bg-[#111115] border border-white/10 rounded px-2 py-2 text-center text-lg focus:border-[var(--ht-pink)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">タイトル</label>
                    <input
                      type="text"
                      value={axis.title}
                      onChange={(e) => updateAxis(i, "title", e.target.value)}
                      className="w-full bg-[#111115] border border-white/10 rounded px-3 py-2 text-sm text-[var(--ht-ivory)] font-heading focus:border-[var(--ht-pink)] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">説明</label>
                  <textarea
                    value={axis.desc}
                    onChange={(e) => updateAxis(i, "desc", e.target.value)}
                    rows={2}
                    className="w-full bg-[#111115] border border-white/10 rounded px-3 py-2 text-xs text-[var(--ht-ivory)]/60 font-body leading-relaxed focus:border-[var(--ht-pink)] focus:outline-none resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CREATOR セクション ===== */}
        <section className="bg-[#111115] rounded-xl border border-white/5 p-6">
          <h2 className="font-heading text-sm text-[var(--ht-pink)] tracking-wider mb-5">CREATOR セクション</h2>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
            {/* クリエイター画像 */}
            <ImageUploader
              currentImage={about.creator.image}
              uploadPath="images/about/creator.jpg"
              onUploaded={(newPath) => updateCreatorField("image", newPath)}
              aspectRatio="1/1"
              label="クリエイター画像"
            />

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">名前</label>
                  <input
                    type="text"
                    value={about.creator.name}
                    onChange={(e) => updateCreatorField("name", e.target.value)}
                    className="w-full bg-[#0A0A0F] border border-white/10 rounded px-3 py-2 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">肩書き</label>
                  <input
                    type="text"
                    value={about.creator.role}
                    onChange={(e) => updateCreatorField("role", e.target.value)}
                    className="w-full bg-[#0A0A0F] border border-white/10 rounded px-3 py-2 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">紹介文</label>
                <textarea
                  value={about.creator.bio}
                  onChange={(e) => updateCreatorField("bio", e.target.value)}
                  rows={5}
                  className="w-full bg-[#0A0A0F] border border-white/10 rounded px-3 py-2 text-sm text-[var(--ht-ivory)]/60 font-body leading-relaxed focus:border-[var(--ht-pink)] focus:outline-none resize-none"
                />
              </div>

              {/* リンク一覧 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] text-[var(--ht-ivory)]/30">外部リンク</label>
                  <button
                    onClick={addLink}
                    className="text-[10px] text-[var(--ht-teal)] hover:text-[var(--ht-pink)] transition-colors font-heading"
                  >
                    + リンク追加
                  </button>
                </div>
                <div className="space-y-2">
                  {about.creator.links.map((link, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => updateLink(i, "label", e.target.value)}
                        placeholder="ラベル"
                        className="w-28 bg-[#0A0A0F] border border-white/10 rounded px-2 py-1.5 text-xs text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none"
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => updateLink(i, "url", e.target.value)}
                        placeholder="https://..."
                        className="flex-1 bg-[#0A0A0F] border border-white/10 rounded px-2 py-1.5 text-xs text-[var(--ht-ivory)]/60 font-mono focus:border-[var(--ht-pink)] focus:outline-none"
                      />
                      <button
                        onClick={() => removeLink(i)}
                        className="text-xs text-red-400/40 hover:text-red-400 transition-colors px-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

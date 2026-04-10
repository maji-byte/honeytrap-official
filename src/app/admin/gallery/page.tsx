"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getGallery, saveGallery, resetGallery } from "@/lib/cms";
import type { GalleryItem } from "@/data/gallery";
import ImageUploader from "@/components/admin/ImageUploader";

const categoryOptions = ["KEY VISUAL", "JACKET", "MANGA", "PROMO"] as const;
const aspectOptions = ["portrait", "square", "landscape"] as const;
const aspectLabels: Record<string, string> = {
  portrait: "縦長 (3:4)",
  square: "正方形 (1:1)",
  landscape: "横長 (16:9)",
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setItems(getGallery());
  }, []);

  const save = (updated: GalleryItem[]) => {
    setItems(updated);
    saveGallery(updated);
  };

  const addItem = () => {
    const newItem: GalleryItem = {
      id: `gallery-${Date.now()}`,
      src: "",
      alt: "新しい画像",
      category: "KEY VISUAL",
      aspect: "square",
    };
    const updated = [...items, newItem];
    save(updated);
    setEditingId(newItem.id);
  };

  const updateItem = (id: string, field: keyof GalleryItem, value: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    save(updated);
  };

  const deleteItem = (id: string) => {
    if (!confirm("この画像を削除しますか？")) return;
    save(items.filter((item) => item.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const updated = [...items];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    save(updated);
  };

  const handleReset = () => {
    if (!confirm("ギャラリーをデフォルトに戻しますか？")) return;
    const reset = resetGallery();
    setItems(reset);
    setEditingId(null);
  };

  const editing = items.find((item) => item.id === editingId);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-[var(--ht-ivory)]">
            ギャラリー管理
          </h1>
          <p className="text-xs text-[var(--ht-ivory)]/30 mt-1 font-body">
            ギャラリーページの画像を管理
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-heading tracking-wider border border-white/10 text-[var(--ht-ivory)]/40 hover:text-[var(--ht-ivory)] hover:border-white/30 transition-colors rounded"
          >
            リセット
          </button>
          <button
            onClick={addItem}
            className="px-5 py-2 text-xs font-heading tracking-wider bg-[var(--ht-pink)] text-[var(--ht-ivory)] hover:bg-[var(--ht-pink)]/80 transition-colors rounded"
          >
            + 画像を追加
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* 一覧 */}
        <div>
          <div className="text-xs text-[var(--ht-ivory)]/30 mb-3 font-body">
            {items.length} 件の画像
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setEditingId(item.id)}
                className={`group relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  editingId === item.id
                    ? "border-[var(--ht-pink)] ring-1 ring-[var(--ht-pink)]/30"
                    : "border-transparent hover:border-white/10"
                }`}
              >
                <div
                  className={`w-full bg-[#111115] ${
                    item.aspect === "portrait"
                      ? "aspect-[3/4]"
                      : item.aspect === "landscape"
                      ? "aspect-video"
                      : "aspect-square"
                  }`}
                >
                  {item.src ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        sizes="200px"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl text-[var(--ht-ivory)]/10">
                        🖼️
                      </span>
                    </div>
                  )}
                </div>

                {/* Overlay info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <p className="text-[10px] text-[var(--ht-ivory)] truncate font-body">
                    {item.alt}
                  </p>
                  <p className="text-[9px] text-[var(--ht-ivory)]/40 font-heading">
                    {item.category}
                  </p>
                </div>

                {/* 順番ボタン */}
                <div className="absolute top-1 right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveItem(index, -1);
                    }}
                    className="w-5 h-5 bg-black/60 text-white/60 text-[10px] rounded hover:bg-black/80"
                  >
                    ↑
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveItem(index, 1);
                    }}
                    className="w-5 h-5 bg-black/60 text-white/60 text-[10px] rounded hover:bg-black/80"
                  >
                    ↓
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 編集パネル */}
        <div className="lg:sticky lg:top-6 self-start">
          {editing ? (
            <div className="bg-[#111115] rounded-xl border border-white/5 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-sm text-[var(--ht-ivory)]">
                  画像を編集
                </h3>
                <button
                  onClick={() => deleteItem(editing.id)}
                  className="text-xs text-red-400/60 hover:text-red-400 transition-colors font-body"
                >
                  削除
                </button>
              </div>

              {/* 画像アップロード */}
              <ImageUploader
                currentImage={editing.src}
                uploadPath={`images/gallery/${editing.id}.jpg`}
                onUploaded={(newPath) => updateItem(editing.id, "src", newPath)}
                aspectRatio={
                  editing.aspect === "portrait"
                    ? "3/4"
                    : editing.aspect === "landscape"
                    ? "16/9"
                    : "1/1"
                }
                label="画像ファイル"
              />

              {/* Alt テキスト */}
              <div>
                <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">
                  説明テキスト
                </label>
                <input
                  type="text"
                  value={editing.alt}
                  onChange={(e) => updateItem(editing.id, "alt", e.target.value)}
                  className="w-full bg-[#0A0A0F] border border-white/10 rounded px-3 py-2 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none"
                />
              </div>

              {/* カテゴリ */}
              <div>
                <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">
                  カテゴリ
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat}
                      onClick={() =>
                        updateItem(
                          editing.id,
                          "category",
                          cat as GalleryItem["category"]
                        )
                      }
                      className={`px-3 py-1.5 text-xs font-heading tracking-wider rounded transition-colors ${
                        editing.category === cat
                          ? "bg-[var(--ht-pink)] text-[var(--ht-ivory)]"
                          : "border border-white/10 text-[var(--ht-ivory)]/40 hover:border-[var(--ht-pink)] hover:text-[var(--ht-pink)]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* アスペクト比 */}
              <div>
                <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">
                  アスペクト比
                </label>
                <div className="flex gap-2">
                  {aspectOptions.map((aspect) => (
                    <button
                      key={aspect}
                      onClick={() =>
                        updateItem(
                          editing.id,
                          "aspect",
                          aspect as GalleryItem["aspect"]
                        )
                      }
                      className={`flex-1 px-2 py-1.5 text-[10px] font-heading tracking-wider rounded transition-colors ${
                        editing.aspect === aspect
                          ? "bg-[var(--ht-teal)] text-[var(--ht-ivory)]"
                          : "border border-white/10 text-[var(--ht-ivory)]/40 hover:border-[var(--ht-teal)]"
                      }`}
                    >
                      {aspectLabels[aspect]}
                    </button>
                  ))}
                </div>
              </div>

              {/* 画像URL直接入力 */}
              <div>
                <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">
                  画像URL（直接入力）
                </label>
                <input
                  type="text"
                  value={editing.src}
                  onChange={(e) => updateItem(editing.id, "src", e.target.value)}
                  placeholder="/images/gallery/example.jpg"
                  className="w-full bg-[#0A0A0F] border border-white/10 rounded px-3 py-2 text-xs text-[var(--ht-ivory)]/60 font-mono focus:border-[var(--ht-pink)] focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="bg-[#111115] rounded-xl border border-white/5 p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
              <span className="text-4xl mb-3 text-[var(--ht-ivory)]/10">
                🖼️
              </span>
              <p className="text-xs text-[var(--ht-ivory)]/30 font-body">
                左の一覧から画像を選択して編集
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

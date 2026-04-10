"use client";

import { useEffect, useState } from "react";
import { getNews, saveNews, resetNews } from "@/lib/cms";
import type { NewsItem } from "@/data/news";
import { categoryColors } from "@/data/news";

type Category = NewsItem["category"];
const categories: Category[] = ["RELEASE", "LIVE", "GOODS", "MEDIA", "INFO"];

const emptyItem: Omit<NewsItem, "id"> = {
  date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
  category: "INFO",
  title: "",
  excerpt: "",
};

export default function AdminNews() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState(emptyItem);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setItems(getNews());
  }, []);

  const handleSave = () => {
    saveNews(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaults = resetNews();
    setItems(defaults);
    setEditId(null);
    setIsAdding(false);
  };

  const handleAdd = () => {
    const item: NewsItem = {
      ...newItem,
      id: `news-${Date.now()}`,
    };
    const updated = [item, ...items];
    setItems(updated);
    saveNews(updated);
    setNewItem(emptyItem);
    setIsAdding(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id: string) => {
    if (!confirm("このニュースを削除しますか？")) return;
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    saveNews(updated);
  };

  const updateItem = (id: string, field: keyof NewsItem, value: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[var(--ht-ivory)] tracking-wider">
            ニュース管理
          </h1>
          <p className="text-sm text-[var(--ht-ivory)]/40 font-body mt-1">
            お知らせの追加・編集・削除
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 border border-white/10 rounded-lg hover:border-white/20 transition-all"
          >
            リセット
          </button>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2 text-xs font-heading tracking-wider bg-[var(--ht-teal)] text-[#1A1A1A] rounded-lg hover:bg-[var(--ht-teal)]/80 transition-all"
          >
            + 新規追加
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

      {/* Add new form */}
      {isAdding && (
        <div className="bg-[#1A1A1F] border border-[var(--ht-teal)]/30 rounded-xl p-5 mb-6">
          <h3 className="font-heading text-sm text-[var(--ht-teal)] tracking-wider mb-4">
            新規ニュース
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">日付</label>
              <input
                type="text"
                value={newItem.date}
                onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                placeholder="2026.04.01"
                className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-teal)] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">カテゴリ</label>
              <select
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value as Category })
                }
                className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-teal)] focus:outline-none transition-colors"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">タイトル</label>
            <input
              type="text"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-teal)] focus:outline-none transition-colors"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">概要</label>
            <textarea
              value={newItem.excerpt}
              onChange={(e) => setNewItem({ ...newItem, excerpt: e.target.value })}
              rows={2}
              className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-teal)] focus:outline-none transition-colors resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              disabled={!newItem.title}
              className="px-5 py-2 text-xs font-heading tracking-wider bg-[var(--ht-teal)] text-[#1A1A1A] rounded-lg hover:bg-[var(--ht-teal)]/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              追加する
            </button>
            <button
              onClick={() => { setIsAdding(false); setNewItem(emptyItem); }}
              className="px-5 py-2 text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 hover:text-[var(--ht-ivory)]/60 transition-colors"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}

      {/* News list */}
      <div className="bg-[#1A1A1F] border border-white/5 rounded-xl overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[100px_90px_1fr_80px] gap-4 px-5 py-3 border-b border-white/5 text-[10px] font-heading tracking-wider text-[var(--ht-ivory)]/30">
          <span>日付</span>
          <span>カテゴリ</span>
          <span>タイトル</span>
          <span className="text-right">操作</span>
        </div>

        {items.map((item) => (
          <div key={item.id}>
            <div className="grid grid-cols-[100px_90px_1fr_80px] gap-4 px-5 py-3 border-b border-white/[0.03] items-center hover:bg-white/[0.02] transition-colors">
              <span className="text-xs text-[var(--ht-ivory)]/40 font-mono">
                {item.date}
              </span>
              <span
                className="inline-block px-2 py-0.5 text-[10px] font-heading tracking-wider text-center rounded"
                style={{
                  backgroundColor: categoryColors[item.category] + "20",
                  color: categoryColors[item.category],
                }}
              >
                {item.category}
              </span>
              <span className="text-sm text-[var(--ht-ivory)] font-body truncate">
                {item.title}
              </span>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setEditId(editId === item.id ? null : item.id)}
                  className="text-xs text-[var(--ht-teal)] hover:text-[var(--ht-teal)]/80 transition-colors"
                >
                  編集
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  削除
                </button>
              </div>
            </div>

            {/* Inline edit */}
            {editId === item.id && (
              <div className="px-5 py-4 bg-white/[0.02] border-b border-white/5 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => updateItem(item.id, "date", e.target.value)}
                    className="bg-[#111115] border border-white/10 rounded-lg px-3 py-2 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
                  />
                  <select
                    value={item.category}
                    onChange={(e) => updateItem(item.id, "category", e.target.value)}
                    className="bg-[#111115] border border-white/10 rounded-lg px-3 py-2 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateItem(item.id, "title", e.target.value)}
                  className="w-full bg-[#111115] border border-white/10 rounded-lg px-3 py-2 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
                />
                <textarea
                  value={item.excerpt}
                  onChange={(e) => updateItem(item.id, "excerpt", e.target.value)}
                  rows={2}
                  className="w-full bg-[#111115] border border-white/10 rounded-lg px-3 py-2 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors resize-none"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

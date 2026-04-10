"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getGoods, saveGoods, resetGoods } from "@/lib/cms";
import type { GoodsItem } from "@/data/goods";
import ImageUploader from "@/components/admin/ImageUploader";

type Status = GoodsItem["status"];
const statuses: Status[] = ["ON SALE", "PRE-ORDER", "SOLD OUT"];
const statusColors: Record<Status, string> = {
  "ON SALE": "#22c55e",
  "PRE-ORDER": "#eab308",
  "SOLD OUT": "#6b7280",
};

export default function AdminGoods() {
  const [items, setItems] = useState<GoodsItem[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setItems(getGoods());
  }, []);

  const handleSave = () => {
    saveGoods(items);
    setSaved(true);
    setEditId(null);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaults = resetGoods();
    setItems(defaults);
    setEditId(null);
  };

  const handleAdd = () => {
    const newItem: GoodsItem = {
      id: `goods-${Date.now()}`,
      name: "新しいグッズ",
      price: "¥0",
      status: "ON SALE",
      image: "",
      externalUrl: "",
    };
    setItems([newItem, ...items]);
    setEditId(newItem.id);
  };

  const handleDelete = (id: string) => {
    if (!confirm("このグッズを削除しますか？")) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof GoodsItem, value: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const cycleStatus = (id: string) => {
    setItems(
      items.map((item) => {
        if (item.id !== id) return item;
        const idx = statuses.indexOf(item.status);
        return { ...item, status: statuses[(idx + 1) % statuses.length] };
      })
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[var(--ht-ivory)] tracking-wider">
            グッズ管理
          </h1>
          <p className="text-sm text-[var(--ht-ivory)]/40 font-body mt-1">
            商品情報・ステータスの管理
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleReset} className="px-4 py-2 text-xs font-heading tracking-wider text-[var(--ht-ivory)]/40 border border-white/10 rounded-lg hover:border-white/20 transition-all">
            リセット
          </button>
          <button onClick={handleAdd} className="px-4 py-2 text-xs font-heading tracking-wider bg-[var(--ht-teal)] text-[#1A1A1A] rounded-lg hover:bg-[var(--ht-teal)]/80 transition-all">
            + 新規追加
          </button>
          <button onClick={handleSave} className={`px-6 py-2 text-xs font-heading tracking-wider rounded-lg transition-all ${saved ? "bg-green-500 text-white" : "bg-[var(--ht-pink)] text-white hover:bg-[var(--ht-pink)]/80"}`}>
            {saved ? "✓ 保存しました" : "保存する"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1A1A1F] border border-white/5 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[50px_1fr_100px_100px_80px] gap-4 px-5 py-3 border-b border-white/5 text-[10px] font-heading tracking-wider text-[var(--ht-ivory)]/30">
          <span>画像</span>
          <span>商品名</span>
          <span>価格</span>
          <span>ステータス</span>
          <span className="text-right">操作</span>
        </div>

        {items.map((item) => (
          <div key={item.id}>
            <div className="grid grid-cols-[50px_1fr_100px_100px_80px] gap-4 px-5 py-3 border-b border-white/[0.03] items-center hover:bg-white/[0.02] transition-colors">
              <div className="w-10 h-10 rounded overflow-hidden relative bg-[#111115] flex-shrink-0">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[var(--ht-ivory)]/10">🛍</div>
                )}
              </div>
              <span className="text-sm text-[var(--ht-ivory)] font-body truncate">
                {item.name}
              </span>
              <span className="text-xs text-[var(--ht-ivory)]/50 font-mono">
                {item.price}
              </span>
              <button
                onClick={() => cycleStatus(item.id)}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-heading tracking-wider cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: statusColors[item.status] + "15",
                  color: statusColors[item.status],
                }}
                title="クリックでステータス切替"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusColors[item.status] }} />
                {item.status}
              </button>
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

            {editId === item.id && (
              <div className="px-5 py-4 bg-white/[0.02] border-b border-white/5 space-y-3">
                <div className="grid grid-cols-[120px_1fr] gap-5">
                  <ImageUploader
                    currentImage={item.image}
                    uploadPath={`images/goods/${item.id}.jpg`}
                    onUploaded={(newPath) => {
                      const updated = items.map((g) =>
                        g.id === item.id ? { ...g, image: newPath } : g
                      );
                      setItems(updated);
                      saveGoods(updated);
                      setSaved(true);
                      setTimeout(() => setSaved(false), 2000);
                    }}
                    aspectRatio="1/1"
                    label="商品画像"
                  />
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">商品名</label>
                        <input type="text" value={item.name} onChange={(e) => updateItem(item.id, "name", e.target.value)} className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">価格</label>
                        <input type="text" value={item.price} onChange={(e) => updateItem(item.id, "price", e.target.value)} className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-mono focus:border-[var(--ht-pink)] focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">ステータス</label>
                        <select value={item.status} onChange={(e) => updateItem(item.id, "status", e.target.value)} className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors">
                          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">外部URL（ECサイト等）</label>
                      <input type="text" value={item.externalUrl} onChange={(e) => updateItem(item.id, "externalUrl", e.target.value)} placeholder="https://..." className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-[var(--ht-ivory)]/50 font-mono focus:border-[var(--ht-pink)] focus:outline-none transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

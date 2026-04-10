"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getMembers, saveMembers, resetMembers } from "@/lib/cms";
import type { Member } from "@/data/members";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setMembers(getMembers());
  }, []);

  const handleSave = () => {
    saveMembers(members);
    setSaved(true);
    setEditId(null);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaults = resetMembers();
    setMembers(defaults);
    setEditId(null);
  };

  const updateMember = (id: string, field: keyof Member, value: string) => {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[var(--ht-ivory)] tracking-wider">
            メンバー管理
          </h1>
          <p className="text-sm text-[var(--ht-ivory)]/40 font-body mt-1">
            プロフィール・キャッチコピーの編集
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

      <div className="space-y-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-[#1A1A1F] border border-white/5 rounded-xl overflow-hidden"
          >
            {/* Header row */}
            <div
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
              onClick={() =>
                setEditId(editId === member.id ? null : member.id)
              }
            >
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-lg overflow-hidden relative flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${member.color}30, ${member.color}60)`,
                }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="48px"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: member.color }}
                  />
                  <h3 className="font-heading text-sm font-bold text-[var(--ht-ivory)]">
                    {member.nameEn}
                  </h3>
                  <span className="text-xs text-[var(--ht-ivory)]/30 font-body">
                    {member.name}
                  </span>
                </div>
                <p className="text-xs text-[var(--ht-ivory)]/40 font-body mt-0.5 truncate">
                  {member.part} / {member.catchcopy}
                </p>
              </div>

              {/* Toggle */}
              <span
                className={`text-[var(--ht-ivory)]/20 transition-transform ${
                  editId === member.id ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>

            {/* Edit form */}
            {editId === member.id && (
              <div className="border-t border-white/5 p-5 space-y-4">
                {/* 画像アップロード + 基本情報 */}
                <div className="grid grid-cols-[140px_1fr] gap-5">
                  <ImageUploader
                    currentImage={member.image}
                    uploadPath={`images/members/${member.id}.jpg`}
                    onUploaded={(newPath) => {
                      const updated = members.map((m) =>
                        m.id === member.id ? { ...m, image: newPath } : m
                      );
                      setMembers(updated);
                      saveMembers(updated);
                      setSaved(true);
                      setTimeout(() => setSaved(false), 2000);
                    }}
                    aspectRatio="3/4"
                    label="メンバー画像"
                  />
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">
                          名前（日本語）
                        </label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) =>
                            updateMember(member.id, "name", e.target.value)
                          }
                          className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">
                          名前（英語）
                        </label>
                        <input
                          type="text"
                          value={member.nameEn}
                          onChange={(e) =>
                            updateMember(member.id, "nameEn", e.target.value)
                          }
                          className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">
                        キャッチコピー
                      </label>
                      <input
                        type="text"
                        value={member.catchcopy}
                        onChange={(e) =>
                          updateMember(member.id, "catchcopy", e.target.value)
                        }
                        className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">
                        性格（ホバー時表示）
                      </label>
                      <input
                        type="text"
                        value={member.personality}
                        onChange={(e) =>
                          updateMember(member.id, "personality", e.target.value)
                        }
                        className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">
                    詳細プロフィール
                  </label>
                  <textarea
                    value={member.description}
                    onChange={(e) =>
                      updateMember(member.id, "description", e.target.value)
                    }
                    rows={3}
                    className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: member.color }}
                  />
                  <span className="text-xs text-[var(--ht-ivory)]/30 font-mono">
                    {member.color}
                  </span>
                  <span className="text-xs text-[var(--ht-ivory)]/20">|</span>
                  <span className="text-xs text-[var(--ht-ivory)]/30 font-body">
                    {member.part}
                  </span>
                  <span className="text-[10px] text-[var(--ht-ivory)]/15 ml-auto">
                    カラー・パートは固定
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

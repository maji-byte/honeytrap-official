"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  getMusicReleases,
  saveMusicReleases,
  resetMusicReleases,
  getStreamingSpotifyUrl,
  saveStreamingSpotifyUrl,
  resetStreamingSpotifyUrl,
  type MusicRelease,
} from "@/lib/cms";
import ImageUploader from "@/components/admin/ImageUploader";
import VideoUploader from "@/components/admin/VideoUploader";
import AudioUploader from "@/components/admin/AudioUploader";

export default function AdminMusic() {
  const [releases, setReleases] = useState<MusicRelease[]>([]);
  const [streamingUrl, setStreamingUrl] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setReleases(getMusicReleases());
    setStreamingUrl(getStreamingSpotifyUrl());
  }, []);

  const handleSave = () => {
    saveMusicReleases(releases);
    saveStreamingSpotifyUrl(streamingUrl);
    setSaved(true);
    setEditId(null);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaults = resetMusicReleases();
    setReleases(defaults);
    setStreamingUrl(resetStreamingSpotifyUrl());
    setEditId(null);
  };

  const handleAdd = () => {
    const newRelease: MusicRelease = {
      id: `release-${Date.now()}`,
      title: "新しい楽曲",
      type: "Single",
      date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
      description: "",
      jacket: "",
      spotifyUrl: "",
      appleMusicUrl: "",
      mvUrl: "",
      audioFile: "",
      comingSoon: false,
    };
    setReleases([newRelease, ...releases]);
    setEditId(newRelease.id);
  };

  const handleDelete = (id: string) => {
    if (!confirm("この楽曲を削除しますか？")) return;
    setReleases(releases.filter((r) => r.id !== id));
  };

  const updateRelease = (id: string, field: keyof MusicRelease, value: string) => {
    setReleases(releases.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[var(--ht-ivory)] tracking-wider">
            楽曲管理
          </h1>
          <p className="text-sm text-[var(--ht-ivory)]/40 font-body mt-1">
            リリース情報の管理
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

      {/* STREAMING セクション用 Spotify URL */}
      <div className="bg-[#1A1A1F] border border-white/5 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 bg-[#1DB954] rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0">♪</div>
          <div>
            <h2 className="font-heading text-sm font-bold text-[var(--ht-ivory)] tracking-wider">
              STREAMING セクション (Spotify 埋め込み)
            </h2>
            <p className="text-xs text-[var(--ht-ivory)]/40 font-body mt-0.5">
              MUSICページのSTREAMINGセクションに表示するSpotifyのトラック／アルバム／アーティスト／プレイリストURL
            </p>
          </div>
        </div>
        <input
          type="text"
          value={streamingUrl}
          onChange={(e) => setStreamingUrl(e.target.value)}
          placeholder="https://open.spotify.com/playlist/..."
          className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-[var(--ht-ivory)] font-mono focus:border-[var(--ht-pink)] focus:outline-none transition-colors"
        />
      </div>

      <div className="space-y-4">
        {releases.map((release) => (
          <div key={release.id} className="bg-[#1A1A1F] border border-white/5 rounded-xl overflow-hidden">
            <div
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
              onClick={() => setEditId(editId === release.id ? null : release.id)}
            >
              {/* Jacket */}
              <div className="w-14 h-14 rounded-lg overflow-hidden relative flex-shrink-0 bg-[#111115]">
                {release.jacket ? (
                  <Image src={release.jacket} alt={release.title} fill className="object-cover" sizes="56px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl text-[var(--ht-ivory)]/10">♪</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-sm font-bold text-[var(--ht-ivory)]">{release.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--ht-pink)]/10 text-[var(--ht-pink)] font-heading">
                    {release.type}
                  </span>
                  {release.comingSoon && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--ht-ivory)]/10 text-[var(--ht-ivory)]/50 font-heading">
                      COMING SOON
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--ht-ivory)]/40 font-mono mt-0.5">{release.date}</p>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={(e) => { e.stopPropagation(); handleDelete(release.id); }} className="text-xs text-red-400 hover:text-red-300 transition-colors">
                  削除
                </button>
                <span className={`text-[var(--ht-ivory)]/20 transition-transform ${editId === release.id ? "rotate-180" : ""}`}>▼</span>
              </div>
            </div>

            {editId === release.id && (
              <div className="border-t border-white/5 p-5 space-y-4">
                {/* Coming Soon トグル */}
                <div className="flex items-center justify-between bg-[#111115] border border-white/5 rounded-lg px-4 py-3">
                  <div>
                    <p className="text-xs font-heading text-[var(--ht-ivory)] tracking-wider">COMING SOON</p>
                    <p className="text-[10px] text-[var(--ht-ivory)]/30 mt-0.5">ONにすると、サイト上でぼかし＋Coming Soon表示になります</p>
                  </div>
                  <button
                    onClick={() => {
                      setReleases(releases.map((r) =>
                        r.id === release.id ? { ...r, comingSoon: !r.comingSoon } : r
                      ));
                    }}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      release.comingSoon ? "bg-[var(--ht-pink)]" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                        release.comingSoon ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
                {/* ジャケット画像 + 基本情報 */}
                <div className="grid grid-cols-[120px_1fr] gap-5">
                  <ImageUploader
                    currentImage={release.jacket}
                    uploadPath={`images/jackets/${release.id}.jpg`}
                    onUploaded={(newPath) => {
                      const updated = releases.map((r) =>
                        r.id === release.id ? { ...r, jacket: newPath } : r
                      );
                      setReleases(updated);
                      saveMusicReleases(updated);
                      setSaved(true);
                      setTimeout(() => setSaved(false), 2000);
                    }}
                    aspectRatio="1/1"
                    label="ジャケット"
                  />
                  <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">タイトル</label>
                    <input type="text" value={release.title} onChange={(e) => updateRelease(release.id, "title", e.target.value)} className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">タイプ</label>
                    <input type="text" value={release.type} onChange={(e) => updateRelease(release.id, "type", e.target.value)} className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">リリース日</label>
                    <input type="text" value={release.date} onChange={(e) => updateRelease(release.id, "date", e.target.value)} className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-mono focus:border-[var(--ht-pink)] focus:outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">説明</label>
                  <textarea value={release.description} onChange={(e) => updateRelease(release.id, "description", e.target.value)} rows={2} className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors resize-none" />
                </div>
                {/* MV: 動画アップロード or URL入力 */}
                <div>
                  <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-2">ミュージックビデオ</label>
                  <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 items-start">
                    <VideoUploader
                      currentVideo={release.mvUrl && !release.mvUrl.startsWith("http") ? release.mvUrl : ""}
                      uploadPath={`videos/mv/${release.id}.mp4`}
                      onUploaded={(newPath) => {
                        const updated = releases.map((r) =>
                          r.id === release.id ? { ...r, mvUrl: newPath } : r
                        );
                        setReleases(updated);
                        saveMusicReleases(updated);
                        setSaved(true);
                        setTimeout(() => setSaved(false), 2000);
                      }}
                      label="動画ファイルをD&D"
                    />
                    <div className="space-y-2">
                      <label className="block text-[10px] text-[var(--ht-ivory)]/30">または外部URL（YouTube / Vimeo）</label>
                      <input type="text" value={release.mvUrl || ""} onChange={(e) => updateRelease(release.id, "mvUrl", e.target.value)} placeholder="https://youtube.com/... or https://vimeo.com/..." className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-[var(--ht-ivory)]/50 font-mono focus:border-[var(--ht-pink)] focus:outline-none transition-colors" />
                      <p className="text-[10px] text-[var(--ht-ivory)]/20">
                        動画ファイルをD&Dするか、YouTube/VimeoのURLを入力
                      </p>
                    </div>
                  </div>
                </div>
                {/* 音声ファイル */}
                <div>
                  <AudioUploader
                    currentAudio={release.audioFile || ""}
                    uploadPath={`audio/${release.id}.mp3`}
                    onUploaded={(newPath) => {
                      const updated = releases.map((r) =>
                        r.id === release.id ? { ...r, audioFile: newPath } : r
                      );
                      setReleases(updated);
                      saveMusicReleases(updated);
                      setSaved(true);
                      setTimeout(() => setSaved(false), 2000);
                    }}
                    label="試聴音源（サイト上で再生されます）"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">Spotify URL</label>
                    <input type="text" value={release.spotifyUrl} onChange={(e) => updateRelease(release.id, "spotifyUrl", e.target.value)} placeholder="https://open.spotify.com/..." className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-[var(--ht-ivory)]/50 font-mono focus:border-[var(--ht-pink)] focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">Apple Music URL</label>
                    <input type="text" value={release.appleMusicUrl} onChange={(e) => updateRelease(release.id, "appleMusicUrl", e.target.value)} placeholder="https://music.apple.com/..." className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-[var(--ht-ivory)]/50 font-mono focus:border-[var(--ht-pink)] focus:outline-none transition-colors" />
                  </div>
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

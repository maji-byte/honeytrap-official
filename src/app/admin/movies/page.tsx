"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  getMovies,
  saveMovies,
  resetMovies,
  type Movie,
} from "@/lib/cms";
import ImageUploader from "@/components/admin/ImageUploader";
import VideoUploader from "@/components/admin/VideoUploader";

export default function AdminMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setMovies(getMovies());
  }, []);

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSave = () => {
    saveMovies(movies);
    showSaved();
    setEditId(null);
  };

  const handleReset = () => {
    const defaults = resetMovies();
    setMovies(defaults);
    setEditId(null);
  };

  const handleAdd = () => {
    const newMovie: Movie = {
      id: `movie-${Date.now()}`,
      title: "新しい映像",
      type: "MV",
      date: new Date().toISOString().slice(0, 7).replace("-", "."),
      description: "",
      videoUrl: "",
      thumbnail: "",
    };
    setMovies([newMovie, ...movies]);
    setEditId(newMovie.id);
  };

  const handleDelete = (id: string) => {
    if (!confirm("この映像を削除しますか？")) return;
    setMovies(movies.filter((m) => m.id !== id));
  };

  const updateMovie = (id: string, field: keyof Movie, value: string) => {
    setMovies(movies.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const typeOptions = ["MV", "TEASER", "LIVE", "MAKING", "OTHER"];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[var(--ht-ivory)] tracking-wider">
            映像管理
          </h1>
          <p className="text-sm text-[var(--ht-ivory)]/40 font-body mt-1">
            MV・ティザー・ライブ映像の管理
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

      <div className="space-y-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-[#1A1A1F] border border-white/5 rounded-xl overflow-hidden">
            <div
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
              onClick={() => setEditId(editId === movie.id ? null : movie.id)}
            >
              {/* Thumbnail */}
              <div className="w-20 h-12 rounded-lg overflow-hidden relative flex-shrink-0 bg-[#111115]">
                {movie.thumbnail ? (
                  <Image src={movie.thumbnail} alt={movie.title} fill className="object-cover" sizes="80px" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg text-[var(--ht-ivory)]/10">▶</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-sm font-bold text-[var(--ht-ivory)] truncate">{movie.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--ht-orange)]/10 text-[var(--ht-orange)] font-heading flex-shrink-0">
                    {movie.type}
                  </span>
                </div>
                <p className="text-xs text-[var(--ht-ivory)]/40 font-mono mt-0.5">{movie.date}</p>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={(e) => { e.stopPropagation(); handleDelete(movie.id); }} className="text-xs text-red-400 hover:text-red-300 transition-colors">
                  削除
                </button>
                <span className={`text-[var(--ht-ivory)]/20 transition-transform ${editId === movie.id ? "rotate-180" : ""}`}>▼</span>
              </div>
            </div>

            {editId === movie.id && (
              <div className="border-t border-white/5 p-5 space-y-4">
                {/* 基本情報 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">タイトル</label>
                    <input type="text" value={movie.title} onChange={(e) => updateMovie(movie.id, "title", e.target.value)} className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">タイプ</label>
                    <select value={movie.type} onChange={(e) => updateMovie(movie.id, "type", e.target.value)} className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors">
                      {typeOptions.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">公開日</label>
                    <input type="text" value={movie.date} onChange={(e) => updateMovie(movie.id, "date", e.target.value)} placeholder="2026.04" className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-mono focus:border-[var(--ht-pink)] focus:outline-none transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">説明</label>
                  <textarea value={movie.description} onChange={(e) => updateMovie(movie.id, "description", e.target.value)} rows={2} className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[var(--ht-ivory)] font-body focus:border-[var(--ht-pink)] focus:outline-none transition-colors resize-none" />
                </div>

                {/* 動画: アップロード or URL */}
                <div>
                  <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-2">動画</label>
                  <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 items-start">
                    <VideoUploader
                      currentVideo={movie.videoUrl && !movie.videoUrl.startsWith("http") ? movie.videoUrl : ""}
                      uploadPath={`videos/movies/${movie.id}.mp4`}
                      onUploaded={(newPath) => {
                        const updated = movies.map((m) =>
                          m.id === movie.id ? { ...m, videoUrl: newPath } : m
                        );
                        setMovies(updated);
                        saveMovies(updated);
                        showSaved();
                      }}
                      label="動画ファイルをD&D"
                    />
                    <div className="space-y-2">
                      <label className="block text-[10px] text-[var(--ht-ivory)]/30">または外部URL（YouTube / Vimeo）</label>
                      <input type="text" value={movie.videoUrl} onChange={(e) => updateMovie(movie.id, "videoUrl", e.target.value)} placeholder="https://youtube.com/... or https://vimeo.com/..." className="w-full bg-[#111115] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-[var(--ht-ivory)]/50 font-mono focus:border-[var(--ht-pink)] focus:outline-none transition-colors" />
                      <p className="text-[10px] text-[var(--ht-ivory)]/20">
                        動画ファイルをD&Dするか、YouTube/VimeoのURLを入力
                      </p>
                    </div>
                  </div>
                </div>

                {/* サムネイル */}
                <div>
                  <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-2">サムネイル画像</label>
                  <div className="w-60">
                    <ImageUploader
                      currentImage={movie.thumbnail}
                      uploadPath={`images/movies/${movie.id}.jpg`}
                      onUploaded={(newPath) => {
                        const updated = movies.map((m) =>
                          m.id === movie.id ? { ...m, thumbnail: newPath } : m
                        );
                        setMovies(updated);
                        saveMovies(updated);
                        showSaved();
                      }}
                      aspectRatio="16/9"
                      label=""
                    />
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

"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

type Props = {
  currentImage: string;
  uploadPath: string; // e.g. "images/members/naruyo.jpg"
  onUploaded: (newPath: string) => void;
  aspectRatio?: string; // e.g. "1/1", "3/4", "16/9"
  label?: string;
};

export default function ImageUploader({
  currentImage,
  uploadPath,
  onUploaded,
  aspectRatio = "1/1",
  label = "画像を変更",
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (file: File) => {
      // プレビュー表示
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);

      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("path", uploadPath);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();
        onUploaded(data.path + "?t=" + Date.now()); // キャッシュバスト
      } catch (err) {
        console.error(err);
        setPreview(null);
        alert("アップロードに失敗しました");
      } finally {
        setIsUploading(false);
      }
    },
    [uploadPath, onUploaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        upload(file);
      }
    },
    [upload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) upload(file);
    },
    [upload]
  );

  const displayImage = preview || currentImage;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[10px] text-[var(--ht-ivory)]/30 mb-1">
          {label}
        </label>
      )}
      <div
        className={`relative overflow-hidden rounded-lg border-2 border-dashed transition-all cursor-pointer ${
          isDragging
            ? "border-[var(--ht-pink)] bg-[var(--ht-pink)]/5"
            : "border-white/10 hover:border-white/20"
        }`}
        style={{ aspectRatio }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {/* 現在の画像 */}
        {displayImage ? (
          <Image
            src={displayImage}
            alt="Preview"
            fill
            className="object-cover"
            sizes="300px"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl text-[var(--ht-ivory)]/10">🖼️</span>
          </div>
        )}

        {/* Overlay */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity ${
            isDragging || isUploading
              ? "opacity-100"
              : "opacity-0 hover:opacity-100"
          } bg-[#111115]/80`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-[var(--ht-pink)] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-[var(--ht-ivory)]/60 font-body">
                アップロード中...
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 px-4 text-center">
              <span className="text-2xl">
                {isDragging ? "📥" : "📤"}
              </span>
              <span className="text-xs text-[var(--ht-ivory)]/60 font-body">
                {isDragging
                  ? "ドロップして差し替え"
                  : "クリックまたはドラッグ&ドロップ"}
              </span>
              <span className="text-[10px] text-[var(--ht-ivory)]/30">
                JPG, PNG, WebP
              </span>
            </div>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {currentImage && (
        <p className="text-[10px] text-[var(--ht-ivory)]/20 font-mono truncate">
          {currentImage.split("?")[0]}
        </p>
      )}
    </div>
  );
}

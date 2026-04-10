"use client";

import { useState, useRef, useCallback } from "react";

type Props = {
  currentVideo: string;
  uploadPath: string;
  onUploaded: (newPath: string) => void;
  label?: string;
};

export default function VideoUploader({
  currentVideo,
  uploadPath,
  onUploaded,
  label = "動画を変更",
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (file: File) => {
      // プレビュー
      const url = URL.createObjectURL(file);
      setPreview(url);

      setIsUploading(true);
      setProgress(0);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("path", uploadPath);

        // XHRでプログレス表示
        const xhr = new XMLHttpRequest();
        const result = await new Promise<{ path: string }>((resolve, reject) => {
          xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
              setProgress(Math.round((e.loaded / e.total) * 100));
            }
          });
          xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(new Error("Upload failed"));
            }
          });
          xhr.addEventListener("error", () => reject(new Error("Network error")));
          xhr.open("POST", "/api/upload");
          xhr.send(formData);
        });

        onUploaded(result.path + "?t=" + Date.now());
      } catch (err) {
        console.error(err);
        setPreview(null);
        alert("アップロードに失敗しました");
      } finally {
        setIsUploading(false);
        setProgress(0);
      }
    },
    [uploadPath, onUploaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("video/")) {
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

  const displayVideo = preview || currentVideo;

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
        style={{ aspectRatio: "16/9" }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {/* 動画プレビュー */}
        {displayVideo ? (
          <video
            src={displayVideo}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            autoPlay
            playsInline
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#111115]">
            <span className="text-4xl text-[var(--ht-ivory)]/10">🎬</span>
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
            <div className="flex flex-col items-center gap-3 w-48">
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-[var(--ht-pink)] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-[var(--ht-ivory)]/60 font-body">
                アップロード中... {progress}%
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 px-4 text-center">
              <span className="text-2xl">{isDragging ? "📥" : "🎬"}</span>
              <span className="text-xs text-[var(--ht-ivory)]/60 font-body">
                {isDragging
                  ? "ドロップして差し替え"
                  : "クリックまたはドラッグ&ドロップ"}
              </span>
              <span className="text-[10px] text-[var(--ht-ivory)]/30">
                MP4, WebM, MOV（200MB以下）
              </span>
            </div>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {currentVideo && (
        <p className="text-[10px] text-[var(--ht-ivory)]/20 font-mono truncate">
          {currentVideo.split("?")[0]}
        </p>
      )}
    </div>
  );
}

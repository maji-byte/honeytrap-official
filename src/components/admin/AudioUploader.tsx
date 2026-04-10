"use client";

import { useRef, useState, useCallback } from "react";

type Props = {
  currentAudio: string;
  uploadPath: string;
  onUploaded: (newPath: string) => void;
  label?: string;
};

export default function AudioUploader({
  currentAudio,
  uploadPath,
  onUploaded,
  label = "音声ファイル",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = useCallback(
    async (file: File) => {
      setUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", uploadPath);

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      });
      xhr.addEventListener("load", () => {
        setUploading(false);
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          onUploaded(data.path + "?t=" + Date.now());
        }
      });
      xhr.addEventListener("error", () => setUploading(false));
      xhr.open("POST", "/api/upload");
      xhr.send(formData);
    },
    [uploadPath, onUploaded]
  );

  const handleFile = (file: File) => {
    if (!file.type.startsWith("audio/")) return;
    upload(file);
  };

  return (
    <div className="space-y-2">
      {label && (
        <p className="text-[10px] text-[var(--ht-ivory)]/30">{label}</p>
      )}

      {/* プレビュー再生 */}
      {currentAudio && !uploading && (
        <audio
          src={currentAudio}
          controls
          className="w-full h-10 [&::-webkit-media-controls-panel]:bg-[#1A1A1F] [&::-webkit-media-controls-current-time-display]:text-[var(--ht-ivory)]/50 [&::-webkit-media-controls-time-remaining-display]:text-[var(--ht-ivory)]/50"
          style={{ filter: "invert(0.85) hue-rotate(180deg)" }}
        />
      )}

      {/* アップロードエリア */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg px-4 py-3 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-[var(--ht-pink)] bg-[var(--ht-pink)]/5"
            : "border-white/10 hover:border-white/20"
        }`}
      >
        {uploading ? (
          <div className="space-y-2">
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-[var(--ht-pink)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] text-[var(--ht-ivory)]/40">{progress}%</p>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-lg">🎵</span>
            <div className="text-left">
              <p className="text-xs text-[var(--ht-ivory)]/40">
                {currentAudio ? "クリックまたはD&Dで差し替え" : "音声ファイルをD&D"}
              </p>
              <p className="text-[10px] text-[var(--ht-ivory)]/20">MP3, WAV, AAC, OGG</p>
            </div>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>

      {currentAudio && (
        <p className="text-[10px] text-[var(--ht-ivory)]/15 font-mono truncate">
          {currentAudio.split("?")[0]}
        </p>
      )}
    </div>
  );
}

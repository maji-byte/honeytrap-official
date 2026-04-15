// 動画URL → 埋め込みURL変換ユーティリティ

// URLにクエリパラメータを安全に追加（既存値は保持）
export function addParams(url: string, params: Record<string, string>): string {
  try {
    const u = new URL(url);
    for (const [k, v] of Object.entries(params)) {
      if (!u.searchParams.has(k)) u.searchParams.set(k, v);
    }
    return u.toString();
  } catch {
    return url;
  }
}

// YouTube URLを埋め込み用に正規化
export function toYouTubeEmbed(url: string): string {
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (embedMatch) return url;
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  return url;
}

// Vimeo URLを埋め込み用に正規化（限定公開のハッシュ対応）
export function toVimeoEmbed(url: string): string {
  if (url.includes("player.vimeo.com")) return url;
  const match = url.match(/vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/);
  if (match) {
    const id = match[1];
    const hash = match[2];
    return hash
      ? `https://player.vimeo.com/video/${id}?h=${hash}`
      : `https://player.vimeo.com/video/${id}`;
  }
  return url;
}

// URLが動画ホスティング先かを判定
export function isYouTube(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

export function isVimeo(url: string): boolean {
  return url.includes("vimeo.com");
}

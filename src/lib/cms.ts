"use client";

import { members as defaultMembers, type Member } from "@/data/members";
import { news as defaultNews, type NewsItem } from "@/data/news";
import { goodsItems as defaultGoods, type GoodsItem } from "@/data/goods";
import { galleryItems as defaultGalleryItems, type GalleryItem } from "@/data/gallery";

// ===== Hero Content =====
export type HeroMediaType = "image" | "video";

export type HeroContent = {
  subtitle: string;
  tagline: string;
  heroMediaType: HeroMediaType;
  heroImage: string;
  heroVideo: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
};

const defaultHero: HeroContent = {
  subtitle: "A GIRLS ROCK BAND FROM THE MANGA",
  tagline: "漫画のページから、ロックが鳴り出す。",
  heroMediaType: "image",
  heroImage: "/images/hero/hero-main.jpg",
  heroVideo: "",
  ctaPrimary: { label: "LISTEN NOW", href: "/music" },
  ctaSecondary: { label: "THE STORY", href: "/story" },
};

// ===== Music Releases =====
export type MusicRelease = {
  id: string;
  title: string;
  type: string;
  date: string;
  description: string;
  jacket: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  mvUrl: string;
  audioFile: string;
  comingSoon?: boolean;
};

const defaultReleases: MusicRelease[] = [
  {
    id: "release-1",
    title: "ほっといて",
    type: "1st Single",
    date: "2026.04.08",
    description: "HoneyTrap 1st Single。漫画「ロックが鳴る！」から生まれた、4人の衝動が詰まった最初の一曲。",
    jacket: "/images/jackets/hottoite.jpg",
    spotifyUrl: "",
    appleMusicUrl: "",
    mvUrl: "",
    audioFile: "/audio/release-1.mp3",
  },
  {
    id: "release-2",
    title: "たぶん青春",
    type: "2nd Single",
    date: "2026.05.15",
    description: "フェンス越しに見た青空。4人の背中が語る、名もなき季節の物語。",
    jacket: "/images/jackets/tabun-seishun.jpg",
    spotifyUrl: "",
    appleMusicUrl: "",
    mvUrl: "",
    audioFile: "/audio/release-2.mp3",
    comingSoon: true,
  },
  {
    id: "release-3",
    title: "門限十八時",
    type: "3rd Single",
    date: "2026.06.20",
    description: "夕焼けに染まる帰り道。鳴世の歌声が、止まった時間を動かす。",
    jacket: "/images/jackets/mongen-18ji.jpg",
    spotifyUrl: "",
    appleMusicUrl: "",
    mvUrl: "",
    audioFile: "/audio/release-3.mp3",
    comingSoon: true,
  },
];

// ===== Streaming (Spotify 埋め込み) =====
const defaultStreamingSpotifyUrl =
  "https://open.spotify.com/artist/3YmAt9U9INQwxAwfgMVfKD";

// ===== Story Teaser (トップページ) =====
export type StoryTeaser = {
  heading: string;
  body: string;
  image: string;
  mangaUrl: string;
  mangaLabel: string;
};

const defaultStoryTeaser: StoryTeaser = {
  heading: "漫画の中から、\nバンドが生まれた。",
  body: "「かっこいい！」ではなく、「私でもできそう」──\nそんな小さな衝動から始まった物語。\nはみ出し者の鳴世と、クセの強い3人が出会い、\n止まっていた青春がロックのリズムで動き出す。\n\n漫画「ロックが鳴る！」の世界から飛び出した\n4人組ガールズバンド HoneyTrap。\nフィクションとリアルの境界が溶ける、\n新しいIP体験が、ここから始まる。",
  image: "/images/story/story-teaser.jpg",
  mangaUrl: "https://rookie.shonenjump.com/series/OmkvmYUPeL8",
  mangaLabel: "READ MANGA →",
};

// ===== Story Page (ストーリーページ全体) =====
export type TimelineItem = {
  date: string;
  event: string;
  sub: string;
};

export type StoryPageContent = {
  originBody: string;
  worldBody: string;
  timeline: TimelineItem[];
};

const defaultStoryPage: StoryPageContent = {
  originBody:
    "「かっこいい！」ではなく、「私でもできそう」。\nそんな小さくて、少し情けない動機から、すべては始まった。\n\n主人公・鳴世は、どこにも居場所がなかった。\n教室の隅で、何者にもなれない自分を持て余していた。\nある日、手に取ったギター。不格好なコード。\nでも、その音には不思議な熱があった。\n\nクールで寡黙なギタリスト・レイ。\n面倒見のいいベーシスト・マコ。\n破天荒なドラマー・ヒナ。\nクセの強い3人と出会い、HoneyTrapは動き出す。",
  worldBody:
    "HoneyTrapは、漫画「ロックが鳴る！」の中で生まれたガールズロックバンド。\nしかし彼女たちの音楽は、漫画のコマの中だけには収まらなかった。\n\nページをめくるたびに聴こえてくるギターリフ。\nコマの外に溢れ出すドラムのビート。\n鳴世の歌声が、紙の上から現実世界へと響き始める。\n\n漫画から音楽へ。音楽からMVへ。MVからライブへ。\nフィクションとリアルの境界線が溶けていく──\nそれがHoneyTrapというプロジェクトの本質。",
  timeline: [
    { date: "2026.03", event: "漫画「ロックが鳴る！」連載開始", sub: "ジャンプルーキー！" },
    { date: "2026.04", event: "HoneyTrap プロジェクト始動", sub: "" },
    { date: "2026.04", event: "公式サイトオープン", sub: "" },
    { date: "2026.04", event: "1st Single「ロックが鳴る」配信開始", sub: "Spotify / Apple Music" },
    { date: "Coming", event: "Music Video 公開", sub: "" },
    { date: "Coming", event: "2nd Single", sub: "" },
    { date: "Future", event: "Live? Anime? ...", sub: "to be continued" },
  ],
};

// ===== Movies (映像) =====
export type Movie = {
  id: string;
  title: string;
  type: string; // MV, TEASER, LIVE, etc.
  date: string;
  description: string;
  videoUrl: string; // YouTube/Vimeo URL or 直接ファイルパス
  thumbnail: string;
};

const defaultMovies: Movie[] = [
  {
    id: "movie-1",
    title: "「ほっといて」 Music Video",
    type: "MV",
    date: "2026.04",
    description: "1st Single のミュージックビデオ。漫画の世界とリアルが交差する映像体験。",
    videoUrl: "",
    thumbnail: "/images/jackets/hottoite.jpg",
  },
  {
    id: "movie-2",
    title: "HoneyTrap Teaser",
    type: "TEASER",
    date: "2026.03",
    description: "プロジェクト始動を告知するティザー映像。",
    videoUrl: "",
    thumbnail: "/images/movies/movie-2.jpg",
  },
];

// ===== About Content =====
export type AboutAxis = {
  icon: string;
  title: string;
  desc: string;
};

export type AboutCreator = {
  name: string;
  role: string;
  bio: string;
  image: string;
  links: { label: string; url: string }[];
};

export type AboutContent = {
  projectHeading: string;
  projectBody: string;
  axes: AboutAxis[];
  creator: AboutCreator;
};

const defaultAbout: AboutContent = {
  projectHeading: "HoneyTrap とは",
  projectBody:
    "HoneyTrapは、イラストレーター・マルチクリエイター chao! が手がける漫画「ロックが鳴る！」から生まれたガールズロックバンドIPです。\n\n漫画の中で描かれる4人の物語は、紙の上だけでは終わりません。\n楽曲制作、MV制作、グッズ展開、そしてその先──\n漫画・音楽・映像・リアルイベントが一つの軸でつながる、\n新しいIP体験を目指しています。",
  axes: [
    { icon: "📖", title: "MANGA", desc: "すべての始まり。ジャンプルーキー！で連載中の「ロックが鳴る！」が物語の根幹。" },
    { icon: "♪", title: "MUSIC", desc: "漫画から生まれた楽曲をSpotify、Apple Music等で配信。" },
    { icon: "🎬", title: "MOVIE", desc: "MVやティザー映像を通じて、HoneyTrapの世界観を映像で体験。" },
    { icon: "🎪", title: "REAL", desc: "グッズ、展示、そしていつかライブへ。フィクションが現実になる瞬間。" },
  ],
  creator: {
    name: "chao!",
    role: "イラストレーター / マルチクリエイター",
    bio: "色鮮やかでポップかつレトロなタッチが特徴。大人には懐かしい、Z世代には新しい──\nそんなスタイルで国内外の企業アートワークを手がける。\nJO1、杏里、Little Glee Monster、ドン・キホーテ、オロナミンC、Hyundaiなど実績多数。",
    image: "/images/about/creator.jpg",
    links: [
      { label: "Official Site", url: "https://www.chao-illustrator.com" },
      { label: "X", url: "https://x.com/chao_artworks" },
      { label: "Instagram", url: "https://www.instagram.com/chao_illustrator" },
    ],
  },
};

// ===== Storage helpers =====
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// デフォルト値で空フィールドを補完するヘルパー
function mergeDefaults<T>(stored: T, fallback: T): T {
  if (!fallback || typeof fallback !== "object" || Array.isArray(fallback)) return stored;
  const result = { ...stored } as Record<string, unknown>;
  const fb = fallback as Record<string, unknown>;
  for (const key in fb) {
    if (fb[key] !== "" && (result[key] === "" || result[key] === undefined || result[key] === null)) {
      result[key] = fb[key];
    }
    // ネストされたオブジェクトも補完
    if (fb[key] && typeof fb[key] === "object" && !Array.isArray(fb[key]) && result[key] && typeof result[key] === "object") {
      result[key] = mergeDefaults(result[key] as Record<string, unknown>, fb[key] as Record<string, unknown>);
    }
  }
  return result as T;
}

function getStorage<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const stored = localStorage.getItem(`ht-cms-${key}`);
    if (!stored) return fallback;
    const parsed = JSON.parse(stored) as T;
    // オブジェクトの場合、デフォルト値で空フィールドを補完
    if (fallback && typeof fallback === "object" && !Array.isArray(fallback)) {
      return mergeDefaults(parsed, fallback);
    }
    return parsed;
  } catch {
    return fallback;
  }
}

function setStorage<T>(key: string, data: T): void {
  if (!isBrowser()) return;
  localStorage.setItem(`ht-cms-${key}`, JSON.stringify(data));
  // カスタムイベントで公開サイト側にリアルタイム通知
  window.dispatchEvent(new CustomEvent("ht-cms-update", { detail: { key } }));
}

// ===== Public API: Read =====
export function getHeroContent(): HeroContent {
  return getStorage("hero", defaultHero);
}

export function getMembers(): Member[] {
  return getStorage("members", defaultMembers);
}

export function getNews(): NewsItem[] {
  return getStorage("news", defaultNews);
}

export function getGoods(): GoodsItem[] {
  return getStorage("goods", defaultGoods);
}

export function getMusicReleases(): MusicRelease[] {
  return getStorage("releases", defaultReleases);
}

export function getStoryTeaser(): StoryTeaser {
  return getStorage("storyTeaser", defaultStoryTeaser);
}

export function getStoryPage(): StoryPageContent {
  return getStorage("storyPage", defaultStoryPage);
}

export function getMovies(): Movie[] {
  return getStorage("movies", defaultMovies);
}

export function getGallery(): GalleryItem[] {
  return getStorage("gallery", defaultGalleryItems);
}

export function getAbout(): AboutContent {
  return getStorage("about", defaultAbout);
}

export function getStreamingSpotifyUrl(): string {
  return getStorage("streamingSpotifyUrl", defaultStreamingSpotifyUrl);
}

// ===== Admin API: Write =====
export function saveHeroContent(data: HeroContent): void {
  setStorage("hero", data);
}

export function saveMembers(data: Member[]): void {
  setStorage("members", data);
}

export function saveNews(data: NewsItem[]): void {
  setStorage("news", data);
}

export function saveGoods(data: GoodsItem[]): void {
  setStorage("goods", data);
}

export function saveMusicReleases(data: MusicRelease[]): void {
  setStorage("releases", data);
}

export function saveStoryTeaser(data: StoryTeaser): void {
  setStorage("storyTeaser", data);
}

export function saveStoryPage(data: StoryPageContent): void {
  setStorage("storyPage", data);
}

export function saveMovies(data: Movie[]): void {
  setStorage("movies", data);
}

export function saveGallery(data: GalleryItem[]): void {
  setStorage("gallery", data);
}

export function saveAbout(data: AboutContent): void {
  setStorage("about", data);
}

export function saveStreamingSpotifyUrl(url: string): void {
  setStorage("streamingSpotifyUrl", url);
}

// ===== Admin API: Reset =====
export function resetHeroContent(): HeroContent {
  setStorage("hero", defaultHero);
  return defaultHero;
}

export function resetMembers(): Member[] {
  setStorage("members", defaultMembers);
  return defaultMembers;
}

export function resetNews(): NewsItem[] {
  setStorage("news", defaultNews);
  return defaultNews;
}

export function resetGoods(): GoodsItem[] {
  setStorage("goods", defaultGoods);
  return defaultGoods;
}

export function resetMusicReleases(): MusicRelease[] {
  setStorage("releases", defaultReleases);
  return defaultReleases;
}

export function resetStoryTeaser(): StoryTeaser {
  setStorage("storyTeaser", defaultStoryTeaser);
  return defaultStoryTeaser;
}

export function resetStoryPage(): StoryPageContent {
  setStorage("storyPage", defaultStoryPage);
  return defaultStoryPage;
}

export function resetMovies(): Movie[] {
  setStorage("movies", defaultMovies);
  return defaultMovies;
}

export function resetGallery(): GalleryItem[] {
  setStorage("gallery", defaultGalleryItems);
  return defaultGalleryItems;
}

export function resetAbout(): AboutContent {
  setStorage("about", defaultAbout);
  return defaultAbout;
}

export function resetStreamingSpotifyUrl(): string {
  setStorage("streamingSpotifyUrl", defaultStreamingSpotifyUrl);
  return defaultStreamingSpotifyUrl;
}

// ===== Default exports (for admin forms) =====
export { defaultHero, defaultStoryTeaser, defaultStoryPage, defaultReleases, defaultMovies, defaultMembers, defaultNews, defaultGoods, defaultGalleryItems, defaultAbout, defaultStreamingSpotifyUrl };

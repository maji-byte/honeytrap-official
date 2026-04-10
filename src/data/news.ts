export type NewsItem = {
  id: string;
  date: string;
  category: "RELEASE" | "LIVE" | "GOODS" | "MEDIA" | "INFO";
  title: string;
  excerpt: string;
};

export const news: NewsItem[] = [
  {
    id: "1",
    date: "2026.04.08",
    category: "RELEASE",
    title: "1st Single「ロックが鳴る」配信開始",
    excerpt: "HoneyTrap初のシングル楽曲がSpotify、Apple Music、各種ストリーミングサービスにて配信スタート。",
  },
  {
    id: "2",
    date: "2026.04.01",
    category: "INFO",
    title: "HoneyTrap Official Site オープン",
    excerpt: "HoneyTrapの公式サイトがオープンしました。最新情報はこちらでお届けします。",
  },
  {
    id: "3",
    date: "2026.03.25",
    category: "MEDIA",
    title: "漫画「ロックが鳴る！」連載中",
    excerpt: "ジャンプルーキー！にて、HoneyTrapの物語を描く漫画「ロックが鳴る！」を連載中。",
  },
  {
    id: "4",
    date: "2026.03.15",
    category: "GOODS",
    title: "1st グッズコレクション 予約受付開始",
    excerpt: "Tシャツ、ステッカー、クリアファイルなどHoneyTrapオリジナルグッズの予約受付を開始。",
  },
  {
    id: "5",
    date: "2026.03.01",
    category: "INFO",
    title: "HoneyTrap プロジェクト始動",
    excerpt: "漫画から飛び出すガールズロックバンド「HoneyTrap」のプロジェクトが正式に始動しました。",
  },
];

export const categoryColors: Record<NewsItem["category"], string> = {
  RELEASE: "#E8456B",
  LIVE: "#6B3FA0",
  GOODS: "#F28C38",
  MEDIA: "#43D6D0",
  INFO: "#8A8A8A",
};

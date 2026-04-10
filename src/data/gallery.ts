export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: "KEY VISUAL" | "JACKET" | "MANGA" | "PROMO";
  aspect: "portrait" | "square" | "landscape";
};

export const galleryItems: GalleryItem[] = [
  { id: "1", src: "/images/gallery/1.jpg", alt: "HoneyTrap メインキービジュアル", category: "KEY VISUAL", aspect: "landscape" },
  { id: "2", src: "/images/gallery/2.jpg", alt: "1st Single ジャケット", category: "JACKET", aspect: "square" },
  { id: "3", src: "/images/gallery/3.jpg", alt: "ロックが鳴る！ 第1話", category: "MANGA", aspect: "portrait" },
  { id: "4", src: "/images/gallery/4.jpg", alt: "プロモーションビジュアル", category: "PROMO", aspect: "portrait" },
  { id: "5", src: "/images/gallery/5.jpg", alt: "メンバー集合ビジュアル", category: "KEY VISUAL", aspect: "landscape" },
  { id: "6", src: "/images/gallery/6.jpg", alt: "ライブシーン", category: "MANGA", aspect: "portrait" },
  { id: "7", src: "/images/gallery/7.jpg", alt: "コンセプトアート", category: "JACKET", aspect: "square" },
  { id: "8", src: "/images/gallery/8.jpg", alt: "個人ビジュアル 鳴世", category: "PROMO", aspect: "portrait" },
];

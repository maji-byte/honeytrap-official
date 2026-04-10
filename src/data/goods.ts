export type GoodsItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  status: "ON SALE" | "PRE-ORDER" | "SOLD OUT";
  externalUrl: string;
};

export const goodsItems: GoodsItem[] = [
  {
    id: "1",
    name: "HoneyTrap Logo Tee - Black",
    price: "¥5,500",
    image: "/images/goods/tee-black.jpg",
    status: "ON SALE",
    externalUrl: "#",
  },
  {
    id: "2",
    name: "HoneyTrap Logo Tee - Ivory",
    price: "¥5,500",
    image: "/images/goods/tee-ivory.jpg",
    status: "ON SALE",
    externalUrl: "#",
  },
  {
    id: "3",
    name: "メンバーステッカーセット",
    price: "¥1,200",
    image: "/images/goods/sticker-set.jpg",
    status: "PRE-ORDER",
    externalUrl: "#",
  },
  {
    id: "4",
    name: "A2クリアポスター",
    price: "¥2,200",
    image: "/images/goods/poster.jpg",
    status: "ON SALE",
    externalUrl: "#",
  },
  {
    id: "5",
    name: "クリアファイルセット (4枚)",
    price: "¥1,800",
    image: "/images/goods/clearfile.jpg",
    status: "SOLD OUT",
    externalUrl: "#",
  },
  {
    id: "6",
    name: "HoneyTrap Sweat - Charcoal",
    price: "¥8,800",
    image: "/images/goods/sweat.jpg",
    status: "PRE-ORDER",
    externalUrl: "#",
  },
];

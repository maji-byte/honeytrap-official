export type Member = {
  id: string;
  name: string;
  nameEn: string;
  part: string;
  partIcon: string;
  catchcopy: string;
  personality: string;
  color: string;
  description: string;
  image: string;
};

export const members: Member[] = [
  {
    id: "naruyo",
    name: "鳴世",
    nameEn: "NARUYO",
    part: "Vocal & Guitar",
    partIcon: "🎤",
    catchcopy: "「私でもできそう」から始まった、止まらない衝動。",
    personality: "天然で不器用だけど、ステージに立つと別人になる。",
    color: "#E8456B",
    description: "「かっこいい」からではなく「私でもできそう」という動機でロックを始めた主人公。はみ出し者の自分を変えたくて、ギターを手に取った。歌声には不思議な熱がある。",
    image: "/images/members/naruyo.jpg",
  },
  {
    id: "rei",
    name: "レイ",
    nameEn: "REI",
    part: "Lead Guitar",
    partIcon: "🎸",
    catchcopy: "音で語る。言葉はいらない。",
    personality: "クールで寡黙。でも演奏になると誰よりも感情的。",
    color: "#43D6D0",
    description: "天才肌のギタリスト。普段は無口で何を考えているかわからないが、ギターを弾くと全てが伝わる。鳴世のことを誰よりも理解している。",
    image: "/images/members/rei.jpg",
  },
  {
    id: "mako",
    name: "マコ",
    nameEn: "MAKO",
    part: "Bass",
    partIcon: "🎸",
    catchcopy: "リズムの底で、全員を支える。",
    personality: "面倒見がよくしっかり者。バンドのお母さん的存在。",
    color: "#F28C38",
    description: "バンドの屋台骨。誰よりも冷静にリズムを刻み、メンバーの暴走を止める役目。でも本当は一番ロックが好きで、一番熱い。",
    image: "/images/members/mako.jpg",
  },
  {
    id: "hina",
    name: "ヒナ",
    nameEn: "HINA",
    part: "Drums",
    partIcon: "🥁",
    catchcopy: "叩いて、叩いて、叩き壊す。",
    personality: "元気で破天荒。ムードメーカーでトラブルメーカー。",
    color: "#6B3FA0",
    description: "驚異的なパワーで叩きまくるドラマー。小柄な体からは想像できないほどの音を出す。常にテンションが高く、バンドのエンジン。",
    image: "/images/members/hina.jpg",
  },
];

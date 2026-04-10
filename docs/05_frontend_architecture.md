# HoneyTrap フロントエンド設計書

## 技術スタック

| ライブラリ | バージョン | 選定理由 |
|---|---|---|
| Next.js | 16.2.3 | App Router / RSC / ISR / 画像最適化 |
| React | 19.2.4 | Server Components / Concurrent |
| TypeScript | ^5 | 型安全性 |
| Tailwind CSS | v4 | CSS変数ベースカラーシステム |
| Framer Motion | ^12 | スクロールアニメーション |

### 追加予定
- `next-seo` — OGP管理 (高)
- `zod` — データバリデーション (中)
- `yet-another-react-lightbox` — ギャラリー (高)
- `lite-youtube-embed` — YouTube最適化 (高)
- `Vitest` + `Playwright` — テスト (中)

## コンポーネント設計

### Atoms (src/components/ui/)
- Button: `{ variant, href?, children, external? }`
- Badge: `{ label, color, textColor? }`
- GradientText: `{ children, className? }`
- Icon: `{ name, size? }`

### Molecules (src/components/)
- SectionHeading ✅
- MemberCard ✅
- NewsCard ✅
- GoodsCard ✅
- PageHero ★新規: `{ tagline, tagColor?, title, height? }`
- SpotifyEmbed ★新規: `{ artistId?, trackId?, type }`
- YouTubeEmbed ★新規: `{ videoId, title }`
- GalleryGrid ★新規: `{ items, selectedCategory? }`

## データ管理 CMS移行パス

| Phase | 対応 |
|---|---|
| 0 (現在) | src/data/*.ts に直接記述 |
| 1 | src/lib/cms.ts 抽象化レイヤー作成 |
| 2 | cms.ts をCMS APIクライアントに差し替え |
| 3 | ISR + On-Demand Revalidation |

**CMS推奨: microCMS**（日本語UI、シンプルAPI、想定工数1-2日）

## パフォーマンス

- next/image + WebP/AVIF自動変換
- next/font/google でセルフホスト
- Lite YouTube Embed で初期ロード600KB→10KB
- "use client" の最小化（Framer Motion部分のみ）

## ISR設計

| ページ | 戦略 | revalidate |
|---|---|---|
| / (TOP) | ISR | 3600s |
| /story, /member, /about, /contact | SSG | — |
| /music, /movie, /gallery | ISR | 86400s |
| /news | ISR | 600s |
| /goods | ISR | 3600s |

## デプロイ (Render.com)

- ビルド: `npm ci && npm run build`
- スタート: `npm start`
- Node: 20.x LTS
- Auto-Deploy: main push時

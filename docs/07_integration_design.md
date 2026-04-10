# HoneyTrap 外部サービス統合設計

## Spotify統合
- **iframe Embed**: `theme=0`(ダーク) + `loading="lazy"`
- トラック単体: 高さ152px / アルバム・アーティスト: 高さ352px
- oEmbed APIでビルド時にメタ情報取得→プレースホルダー表示
- カスタムプレイヤー(Web Playback SDK)は**不採用**(Premiumログイン必須のため)
- ラッパー背景を`#0a0a0a`に合わせ、`border: 0`で溶け込ませる

## YouTube統合
- **Lite YouTube Embed採用**(初期600KB→10KB)
- `youtube-nocookie.com`使用(プライバシー強化)
- サムネイルファースト: `maxresdefault.jpg` → クリックでiframe展開(autoplay=1)
- `rel=0` `modestbranding=1` `playsinline=1`
- アスペクト比: `aspect-ratio: 16/9`, max-width: 960px

## ギャラリー
- **マソンリーレイアウト**(CSS columnsベース、JSライブラリ不要)
- ライトボックス: `yet-another-react-lightbox`(軽量/アクセシブル)
- フィルタ: KEY VISUAL / JACKET / MANGA / PROMO + ALL
- URLクエリ同期(`/gallery?cat=jacket`)
- 画像: next/image + WebP/AVIF + `quality={85}`

## SNS統合
- X: `react-tweet`(SSR静的HTML、JS不要)でポスト表示。常時埋め込みは避ける
- Instagram: 埋め込み不採用。「Instagramで見る」ボタンで外部遷移
- シェア: Intent URLベース(外部JS不要)。Web Share API対応端末はネイティブシート優先

## 外部EC送客
- `target="_blank"` + UTMパラメータ付与
- ステータスバッジ: ON SALE(緑) / PRE-ORDER(黄) / SOLD OUT(灰) / COMING SOON(アクセント色)
- Phase 1: JSON手動管理 → Phase 2: CMS+Webhook ISR → Phase 3: Shopify Storefront API

## 統合優先度

| 機能 | 優先度 | Phase |
|------|--------|-------|
| Spotify Embed | 高 | 1 |
| YouTube (Lite) | 高 | 1 |
| ギャラリー+ライトボックス | 高 | 1 |
| OGP最適化 | 高 | 1 |
| シェアボタン | 中 | 1 |
| グッズ(手動管理) | 中 | 1 |
| EC Webhook連携 | 中 | 2 |
| Shopify API | 低 | 3 |

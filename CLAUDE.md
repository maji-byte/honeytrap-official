# HoneyTrap Official Website — プロジェクト設定

## プロジェクト概要
漫画「ロックが鳴る！」(chao! 作) 発のガールズロックバンド **HoneyTrap** の公式サイト。
コアコンセプト: 「漫画のページから、ロックが鳴り出す。」
**重要**: バンドの公式サイトとして振る舞う。漫画紹介サイトではない。

## 技術スタック
- Next.js 16 (App Router / RSC / ISR)
- React 19, TypeScript 5
- Tailwind CSS v4 (`@theme inline` でデザイントークン管理)
- Framer Motion 12 (スクロールアニメーション)
- デプロイ: Render.com

## ディレクトリ構成
```
src/
├── app/          # App Routerページ (10ページ)
├── components/   # Molecules + ui/ (Atoms)
├── data/         # 型付きJSONデータ (CMS Phase 0)
└── lib/          # ユーティリティ (CMS抽象化レイヤー予定)
docs/             # 設計ドキュメント (01〜07)
.claude/
├── agents/       # 専門Agentファイル (7種)
└── skills/       # ワークフローSkillファイル (6種)
```

## 設計ドキュメント
実装判断の際は以下を参照:
- `docs/01_brand_concept.md` — ブランドコンセプト・DO/DON'T
- `docs/02_ip_strategy.md` — IP戦略・4フェーズロードマップ
- `docs/03_ux_design.md` — UX設計・ペルソナ・サイトマップ
- `docs/04_visual_design_system.md` — カラー・タイポ・スペーシング・アニメーション
- `docs/05_frontend_architecture.md` — 技術設計・コンポーネント・ISR
- `docs/06_content_analysis.md` — 漫画分析・キャラクター・キャッチコピー
- `docs/07_integration_design.md` — Spotify/YouTube/SNS/EC統合

## コーディング規約
- `"use client"` は最小限 (Framer Motion使用部のみ)
- CSS変数は `globals.css` の `@theme inline` で定義
- ハードコードされた色・サイズは禁止（デザイントークン使用）
- 純黒 `#000000` 禁止、box-shadow 原則不使用
- 画像は next/image + WebP/AVIF
- データ型定義は `src/data/*.ts` に集約

## メンバーカラー
- 鳴世 (Vo.&Gt.): `#E8456B` (Hot Pink)
- レイ (Lead Gt.): `#43D6D0` (Teal)
- マコ (Ba.): `#F28C38` (Orange)
- ヒナ (Dr.): `#6B3FA0` (Purple)

## 現在のPhase: Phase 1
フルサイト10ページ構築済み（プレースホルダーコンテンツ）。
次のステップ: 実画像差し替え、Spotify/YouTube実埋め込み、CMS抽象化レイヤー構築。

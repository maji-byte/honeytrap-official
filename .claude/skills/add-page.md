# Add Page Skill

## Description
HoneyTrapサイトに新しいページを追加するワークフロー。
既存のアーキテクチャ・デザインシステムに準拠したページを生成する。

## Trigger
`/add-page` [ページ名]

## Steps
1. ページの要件を確認（目的、コンテンツ、ペルソナ別フロー）
2. 以下を参照して設計:
   - `/docs/03_ux_design.md` — サイトマップ・ユーザーフロー
   - `/docs/04_visual_design_system.md` — デザイントークン
   - `/docs/05_frontend_architecture.md` — コンポーネント構成
3. ファイル作成:
   - `src/app/[page-name]/page.tsx` — ページコンポーネント
   - 必要に応じてデータファイル: `src/data/[page-name].ts`
4. 共通パターンの適用:
   - PageHero セクション（tagline + title）
   - SectionHeading コンポーネント使用
   - Framer Motion whileInView アニメーション
   - レスポンシブグリッド（Tailwind CSS）
5. Header のナビゲーションにリンク追加
6. ISR戦略を決定し `05_frontend_architecture.md` を更新
7. プレビューで表示確認

## Checklist
- [ ] "use client" は最小限か
- [ ] 型定義があるか
- [ ] モバイル表示が適切か
- [ ] デザイントークンを使用しているか
- [ ] ナビゲーションに追加済みか

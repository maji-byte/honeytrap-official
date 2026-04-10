# CMS Migration Skill

## Description
JSONデータファイルからCMS（microCMS）への段階的移行を支援するワークフロー。

## Trigger
`/cms-migrate` [データタイプ: members|news|gallery|goods]

## Context
現在のCMS移行パス:
- Phase 0 (現在): `src/data/*.ts` に直接記述
- Phase 1: `src/lib/cms.ts` 抽象化レイヤー作成
- Phase 2: cms.ts をCMS APIクライアントに差し替え
- Phase 3: ISR + On-Demand Revalidation

## Steps

### Phase 0 → Phase 1 (抽象化レイヤー作成)
1. `src/lib/cms.ts` を作成
2. 各データ型のfetcher関数を定義:
   ```ts
   export async function getMembers(): Promise<Member[]> { ... }
   export async function getNews(): Promise<NewsItem[]> { ... }
   ```
3. 現在は `src/data/*.ts` からインポートして返す
4. 各ページで直接importを `cms.ts` 経由に変更

### Phase 1 → Phase 2 (microCMS接続)
1. `microcms-js-sdk` をインストール
2. microCMSのAPI Schemaを型定義と照合
3. `cms.ts` のfetcher内部をAPIコールに差し替え
4. 環境変数: `MICROCMS_SERVICE_DOMAIN`, `MICROCMS_API_KEY`

### Phase 2 → Phase 3 (ISR有効化)
1. 各ページにrevalidate値を設定（05_frontend_architecture.md参照）
2. Webhook設定: microCMS → Render.com deploy hook
3. On-Demand Revalidation APIルート作成

## Checklist
- [ ] 型定義が維持されているか
- [ ] 既存ページの表示が壊れていないか
- [ ] ISR設定値が設計書と一致するか

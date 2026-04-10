# Add Component Skill

## Description
デザインシステムに準拠した新規コンポーネントを作成するワークフロー。

## Trigger
`/add-component` [コンポーネント名]

## Steps
1. コンポーネントの分類を決定:
   - Atom → `src/components/ui/[Name].tsx`
   - Molecule → `src/components/[Name].tsx`
2. 以下を参照:
   - `/docs/04_visual_design_system.md` — デザイントークン
   - `/docs/05_frontend_architecture.md` — コンポーネント設計
3. 実装規約:
   - TypeScript型定義（Props interface）
   - CSS変数 (`var(--color-*)`) をTailwindクラスで使用
   - `"use client"` はFramer Motion使用時のみ
   - デフォルトexport
4. 既存コンポーネント（SectionHeading, MemberCard等）のパターンに従う
5. 必要に応じて `05_frontend_architecture.md` のコンポーネント一覧を更新

## Template
```tsx
// "use client" // Framer Motion使用時のみ

interface [Name]Props {
  // props定義
}

export default function [Name]({ ...props }: [Name]Props) {
  return (
    // JSX
  );
}
```

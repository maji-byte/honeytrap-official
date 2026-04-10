# HoneyTrap UX設計書

## サイトマップ

```
HoneyTrap Official Site
├── TOP（/）— ハブ。世界観伝達+各コンテンツへの回遊
├── STORY（/story）— 漫画発の出自・バンドの物語。感情的没入
├── MEMBER（/member）— メンバー個々の魅力。推し発見
├── MUSIC（/music）— 楽曲一覧+ストリーミングリンク
├── MOVIE（/movie）— MV・ライブ映像
├── GALLERY（/gallery）— chao!のイラスト・ビジュアル展示
├── NEWS（/news）— 最新情報配信。再訪理由
│   └── /news/:id（個別記事）
├── GOODS（/goods）— グッズ情報+EC導線
├── ABOUT（/about）— プロジェクト概要・クレジット
└── CONTACT（/contact）— 問い合わせ窓口
```

## ペルソナ別ユーザーフロー

| ペルソナ | 入口 | 回遊 | ゴール |
|---------|------|------|--------|
| 音楽ディスカバリー層(16-25) | Spotify/YouTubeリンク→TOP/MUSIC | MUSIC→MEMBER→MOVIE | Spotifyフォロー/SNSフォロー |
| 漫画/アニメIPファン(18-30) | SNS→TOP/STORY | STORY→MEMBER→GALLERY | GOODS購入/SNSシェア |
| chao!ファン(20-35) | chao!のSNS→GALLERY/TOP | GALLERY→MEMBER→GOODS | GOODS購入/MUSIC興味喚起 |
| カジュアル訪問者 | バズ投稿→TOP(3秒勝負) | TOPスクロールで完結 | 1ページ深く/SNSフォロー |

## スマホ体験重点5項目
1. ファーストビュー3秒ルール（スクロールなしで完結）
2. 片手操作最適化（CTA=画面下半分）
3. 通信量とパフォーマンス（Lite YouTube, 遅延読み込み）
4. 試聴体験のシームレス化（ミニプレイヤー画面下部固定）
5. タップターゲット48px以上確保

## アクセシビリティ必須5項目
1. カラーコントラスト WCAG 2.1 AA (4.5:1以上)
2. キーボード操作完全対応
3. 画像・メディアの意味あるalt属性
4. セマンティックHTML+ランドマーク
5. `prefers-reduced-motion` でアニメーション抑制

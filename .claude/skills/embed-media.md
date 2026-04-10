# Embed Media Skill

## Description
Spotify・YouTube・SNSの埋め込みを統合設計書に準拠して実装するワークフロー。

## Trigger
`/embed-media` [spotify|youtube|tweet] [ID]

## Steps

### Spotify
1. 埋め込みタイプを判定: track / album / artist
2. コンポーネント `SpotifyEmbed` を使用:
   ```tsx
   <SpotifyEmbed type="track" id="TRACK_ID" />
   ```
3. 仕様:
   - iframe src: `https://open.spotify.com/embed/{type}/{id}`
   - パラメータ: `theme=0` (ダーク)
   - トラック: height=152px / アルバム・アーティスト: height=352px
   - `loading="lazy"`, `border: 0`
   - ラッパー背景: `#0a0a0a`

### YouTube
1. コンポーネント `YouTubeEmbed` を使用:
   ```tsx
   <YouTubeEmbed videoId="VIDEO_ID" title="動画タイトル" />
   ```
2. 仕様:
   - Lite YouTube Embed使用（初期10KB）
   - `youtube-nocookie.com` ドメイン
   - パラメータ: `rel=0`, `modestbranding=1`, `playsinline=1`
   - `aspect-ratio: 16/9`, `max-width: 960px`

### Tweet (X)
1. `react-tweet` パッケージ使用:
   ```tsx
   import { Tweet } from 'react-tweet';
   <Tweet id="TWEET_ID" />
   ```
2. SSR静的HTML出力（クライアントJS不要）

## Reference
- `/docs/07_integration_design.md`

---
name: pixel-art-generator
description: Generate retro pixel art images, 8-bit and 16-bit sprites, game character art, pixelated icons, and arcade-style scenes — perfect for indie game developers, NFT collections, retro gaming fans, Twitch overlays, profile pictures, and nostalgic 80s/90s aesthetic projects. Supports pixel art characters, pixel landscapes, pixel sprites, and pixelated portraits via the Neta AI image generation API (free trial at neta.art/open).
tools: Bash
---

# Pixel Art Generator

Generate retro pixel art images, 8-bit and 16-bit sprites, game character art, pixelated icons, and arcade-style scenes — perfect for indie game developers, NFT collections, retro gaming fans, Twitch overlays, profile pictures, and nostalgic 80s/90s aesthetic projects. Supports pixel art characters, pixel landscapes, pixel sprites, and pixelated portraits.

## Token

Requires a Neta API token (free trial at <https://www.neta.art/open/>). Pass it via the `--token` flag.

```bash
node <script> "your prompt" --token YOUR_TOKEN
```

## When to use
Use when someone asks to generate or create pixel art generator images.

## Quick start
```bash
node pixelartgenerator.js "your description here" --token YOUR_TOKEN
```

## Options
- `--size` — `portrait`, `landscape`, `square`, `tall` (default: `square`)
- `--ref` — reference image UUID for style inheritance

## Install
```bash
npx skills add blammectrappora/pixel-art-generator
```

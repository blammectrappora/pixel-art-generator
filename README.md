# Pixel Art Generator

Generate retro pixel art images from text descriptions — 8-bit and 16-bit sprites, game characters, pixelated icons, arcade-style scenes, and nostalgic 80s/90s aesthetic art. Just describe what you want and get a crisp, limited-palette pixel art image back as a URL.

Powered by the Neta AI image generation API (api.talesofai.com) — the same service as neta.art/open.

## Install

```bash
npx skills add blammectrappora/pixel-art-generator
```

Or via ClawHub:

```bash
clawhub install pixel-art-generator
```

## Usage

```bash
node pixelartgenerator.js "a knight holding a glowing sword" --token YOUR_TOKEN
```

### More examples

```bash
# A pixel art landscape (wider canvas)
node pixelartgenerator.js "mountain village at sunset" --size landscape --token YOUR_TOKEN

# A character portrait
node pixelartgenerator.js "wizard with a long beard casting fireball" --size portrait --token YOUR_TOKEN

# Reusing a reference image for consistent style
node pixelartgenerator.js "same character, now riding a horse" --ref PICTURE_UUID --token YOUR_TOKEN
```

## Options

| Flag | Description | Default |
| --- | --- | --- |
| `--token` | Your Neta API token (required) | — |
| `--size` | Output dimensions: `square` (1024×1024), `portrait` (832×1216), `landscape` (1216×832), `tall` (704×1408) | `square` |
| `--ref` | Reference image UUID for style inheritance | — |

## Token setup

This skill requires a Neta API token (free trial available at <https://www.neta.art/open/>).

Pass it via the `--token` flag:

```bash
node <script> "your prompt" --token YOUR_TOKEN
```

## Output

Returns a direct image URL.


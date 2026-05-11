#!/usr/bin/env node
import { argv, exit, stdout } from 'node:process';

const STYLE_PROMPT = '16-bit pixel art style, crisp pixels, limited retro color palette, classic arcade game aesthetic, clean sprite-sheet quality, sharp pixel edges, no anti-aliasing, vibrant nostalgic colors';

const SIZES = {
  square: { width: 1024, height: 1024 },
  portrait: { width: 832, height: 1216 },
  landscape: { width: 1216, height: 832 },
  tall: { width: 704, height: 1408 },
};

function parseArgs(args) {
  let prompt = null;
  let size = 'square';
  let tokenFlag = null;
  let ref = null;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--size') {
      size = args[++i];
    } else if (a === '--token') {
      tokenFlag = args[++i];
    } else if (a === '--ref') {
      ref = args[++i];
    } else if (!prompt) {
      prompt = a;
    }
  }
  return { prompt, size, tokenFlag, ref };
}

const { prompt, size, tokenFlag, ref } = parseArgs(argv.slice(2));

if (!prompt) {
  console.error('\n✗ Prompt required. Usage: node pixelartgenerator.js "your description" --token YOUR_TOKEN');
  exit(1);
}

const TOKEN = tokenFlag;

if (!TOKEN) {
  console.error('\n✗ Token required. Pass via: --token YOUR_TOKEN');
  console.error('  Get yours at: https://www.neta.art/open/');
  exit(1);
}

const dims = SIZES[size];
if (!dims) {
  console.error(`\n✗ Invalid size "${size}". Use: square, portrait, landscape, tall`);
  exit(1);
}

const fullPrompt = `${prompt}, ${STYLE_PROMPT}`;

const HEADERS = {
  'x-token': TOKEN,
  'x-platform': 'nieta-app/web',
  'content-type': 'application/json',
};

const body = {
  storyId: 'DO_NOT_USE',
  jobType: 'universal',
  rawPrompt: [{ type: 'freetext', value: fullPrompt, weight: 1 }],
  width: dims.width,
  height: dims.height,
  meta: { entrance: 'PICTURE,VERSE' },
  context_model_series: '8_image_edit',
};

if (ref) {
  body.inherit_params = { collection_uuid: ref, picture_uuid: ref };
}

async function submit() {
  const res = await fetch('https://api.talesofai.com/v3/make_image', {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Submit failed (${res.status}): ${text}`);
  }
  const text = await res.text();
  let taskUuid;
  try {
    const parsed = JSON.parse(text);
    taskUuid = typeof parsed === 'string' ? parsed : parsed.task_uuid;
  } catch {
    taskUuid = text.replace(/^"|"$/g, '').trim();
  }
  if (!taskUuid) throw new Error(`No task_uuid in response: ${text}`);
  return taskUuid;
}

async function poll(taskUuid) {
  for (let i = 0; i < 90; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const res = await fetch(`https://api.talesofai.com/v1/artifact/task/${taskUuid}`, {
      headers: HEADERS,
    });
    if (!res.ok) continue;
    const data = await res.json();
    const status = data.task_status;
    if (status === 'PENDING' || status === 'MODERATION') continue;
    const url =
      (data.artifacts && data.artifacts[0] && data.artifacts[0].url) ||
      data.result_image_url;
    if (!url) throw new Error(`Task ended with status ${status} but no URL: ${JSON.stringify(data)}`);
    return url;
  }
  throw new Error('Timed out waiting for image generation');
}

try {
  const taskUuid = await submit();
  const url = await poll(taskUuid);
  stdout.write(url + '\n');
  exit(0);
} catch (err) {
  console.error(`\n✗ ${err.message}`);
  exit(1);
}

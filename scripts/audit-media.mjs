import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const creditsPath = path.join(root, 'public', 'media', 'credits.json');

function fail(message) {
  console.error(`media audit failed: ${message}`);
  process.exitCode = 1;
}

function jpegDimensions(buffer) {
  let offset = 2;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) return undefined;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    const isStartOfFrame = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);

    if (isStartOfFrame) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7)
      };
    }

    offset += 2 + length;
  }

  return undefined;
}

function imageDimensions(filePath) {
  const buffer = readFileSync(filePath);

  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20)
    };
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    return jpegDimensions(buffer);
  }

  return undefined;
}

if (!existsSync(creditsPath)) {
  fail('public/media/credits.json is missing');
  process.exit();
}

const credits = JSON.parse(readFileSync(creditsPath, 'utf8'));

for (const asset of credits.assets ?? []) {
  const required = ['id', 'path', 'type', 'title', 'credit', 'sourceUrl', 'license', 'licenseUrl', 'alt'];
  for (const key of required) {
    if (!asset[key]) fail(`${asset.id ?? asset.path ?? 'unknown asset'} is missing ${key}`);
  }

  if (!asset.path?.startsWith('/media/')) {
    fail(`${asset.id} must use a /media/ public path`);
    continue;
  }

  const filePath = path.join(root, 'public', asset.path);
  if (!existsSync(filePath)) {
    fail(`${asset.id} file does not exist at ${asset.path}`);
    continue;
  }

  if (asset.type === 'document') {
    if (!asset.path.endsWith('.pdf')) fail(`${asset.id} document assets must be PDF files`);
    continue;
  }

  const dimensions = imageDimensions(filePath);
  if (!dimensions) {
    fail(`${asset.id} has an unsupported image format`);
    continue;
  }

  if (asset.dimensions?.width !== dimensions.width || asset.dimensions?.height !== dimensions.height) {
    fail(`${asset.id} metadata dimensions ${asset.dimensions?.width}x${asset.dimensions?.height} do not match file ${dimensions.width}x${dimensions.height}`);
  }
}

if (!process.exitCode) {
  console.log(`media audit passed: ${credits.assets.length} assets verified`);
}

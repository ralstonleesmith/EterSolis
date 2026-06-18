import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const contentDir = path.join(root, 'content', 'insights');
const required = ['slug', 'issueNumber', 'title', 'subtitle', 'author', 'authorRole', 'publicationDate', 'summary', 'tags', 'status', 'canonicalPath', 'pdfPath', 'coverImage', 'sourceNotes', 'sourcePdf'];
const failures = [];
const slugs = new Set();

function fail(message) {
  failures.push(message);
}

function publicPathExists(publicPath) {
  return fs.existsSync(path.join(root, 'public', publicPath.replace(/^\//, '')));
}

function parse(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    fail(`${path.relative(root, filePath)} is missing JSON frontmatter`);
    return;
  }

  let metadata;
  try {
    metadata = JSON.parse(match[1]);
  } catch (error) {
    fail(`${path.relative(root, filePath)} has invalid JSON frontmatter: ${error.message}`);
    return;
  }

  for (const field of required) {
    if (metadata[field] === undefined || metadata[field] === '') fail(`${path.relative(root, filePath)} missing ${field}`);
  }

  if (metadata.slug) {
    if (!/^[a-z0-9-]+$/.test(metadata.slug)) fail(`${metadata.slug} must be lowercase kebab-case`);
    if (slugs.has(metadata.slug)) fail(`${metadata.slug} is duplicated`);
    slugs.add(metadata.slug);
  }

  if (metadata.canonicalPath !== `/insights/${metadata.slug}`) fail(`${metadata.slug} canonicalPath must be /insights/${metadata.slug}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.publicationDate ?? '')) fail(`${metadata.slug} publicationDate must be YYYY-MM-DD`);
  if (!Array.isArray(metadata.tags) || metadata.tags.length < 3) fail(`${metadata.slug} must include at least three tags`);
  if (!Array.isArray(metadata.sourceNotes) || metadata.sourceNotes.length === 0) fail(`${metadata.slug} must include source notes`);
  if (metadata.pdfPath && !publicPathExists(metadata.pdfPath)) fail(`${metadata.slug} pdfPath does not exist: ${metadata.pdfPath}`);
  if (metadata.coverImage && !publicPathExists(metadata.coverImage)) fail(`${metadata.slug} coverImage does not exist: ${metadata.coverImage}`);

  const body = match[2].trim();
  const h2Count = (body.match(/^##\s+/gm) ?? []).length;
  if (h2Count < 4) fail(`${metadata.slug} must include at least four H2 sections`);
  if (body.length < 2500) fail(`${metadata.slug} body is too thin for a published insight`);
}

if (!fs.existsSync(contentDir)) fail('content/insights is missing');
else for (const fileName of fs.readdirSync(contentDir).filter((name) => name.endsWith('.md'))) parse(path.join(contentDir, fileName));

if (failures.length) {
  console.error('insights validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`insights validation passed: ${slugs.size} issues checked`);

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoots = ['src', 'previews'].map((directory) => path.join(root, directory));
const checkedExtensions = new Set(['.tsx', '.ts', '.jsx', '.js', '.html', '.css']);
const ignoredDirectories = new Set(['.git', '.next', 'node_modules', 'test-results', 'playwright-report']);
const failures = [];

function fail(message) {
  failures.push(message);
}

function walk(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory).flatMap((entry) => {
    const filePath = path.join(directory, entry);
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      if (ignoredDirectories.has(entry)) return [];
      return walk(filePath);
    }

    return [filePath];
  });
}

function collectRoutes() {
  const appRoot = path.join(root, 'src', 'app');
  return new Set(
    walk(appRoot)
      .filter((filePath) => path.basename(filePath) === 'page.tsx')
      .map((filePath) => {
        const routeDirectory = path.dirname(path.relative(appRoot, filePath));
        return routeDirectory === '.' ? '/' : `/${routeDirectory}`;
      })
  );
}

function collectSourceAnchors(files) {
  const anchors = new Set();

  for (const filePath of files) {
    const content = readFileSync(filePath, 'utf8');
    for (const match of content.matchAll(/\bid=["']([^"']+)["']/g)) {
      anchors.add(match[1]);
    }
  }

  return anchors;
}

function collectPreviewAnchors(files) {
  const anchors = new Map();

  for (const filePath of files.filter((file) => file.endsWith('.html'))) {
    const content = readFileSync(filePath, 'utf8');
    anchors.set(
      filePath,
      new Set([...content.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]))
    );
  }

  return anchors;
}

function splitUrl(value) {
  const [withoutHash, hash] = value.split('#');
  const [route] = withoutHash.split('?');
  return { route: route || '/', hash };
}

function isDynamic(value) {
  return value.includes('${') || value.includes('{') || value.includes('}');
}

function validateEmail(value, context) {
  const email = value.replace(/^mailto:/, '').split('?')[0];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fail(`${context} has invalid mailto link: ${value}`);
  }
}

function validateMedia(value, filePath) {
  const mediaPath = value.startsWith('/media/')
    ? path.join(root, 'public', value)
    : path.resolve(path.dirname(filePath), value);

  if (!existsSync(mediaPath)) {
    fail(`${path.relative(root, filePath)} references missing media file ${value}`);
  }
}

function validateSourceLink(value, filePath, routes, sourceAnchors) {
  const context = path.relative(root, filePath);
  if (!value || isDynamic(value) || value.startsWith('http://') || value.startsWith('https://')) return;
  if (value.startsWith('mailto:')) return validateEmail(value, context);
  if (value.startsWith('/media/') || value.startsWith('../public/media/')) return validateMedia(value, filePath);
  if (value.startsWith('#')) {
    if (!sourceAnchors.has(value.slice(1))) fail(`${context} points to missing anchor ${value}`);
    return;
  }
  if (!value.startsWith('/')) return;

  const { route, hash } = splitUrl(value);
  if (route.startsWith('/api/')) return;
  if (!routes.has(route)) fail(`${context} points to missing route ${route}`);
  if (hash && !sourceAnchors.has(hash)) fail(`${context} points to missing anchor #${hash}`);
}

function validatePreviewLink(value, filePath, previewAnchors, routes) {
  const context = path.relative(root, filePath);
  if (!value || value.startsWith('http://') || value.startsWith('https://')) return;
  if (value.startsWith('mailto:')) return validateEmail(value, context);
  if (value.startsWith('/media/') || value.startsWith('../public/media/')) return validateMedia(value, filePath);
  if (value.startsWith('/')) {
    const { route } = splitUrl(value);
    if (!routes.has(route)) fail(`${context} points to missing route ${route}`);
    return;
  }
  if (value.startsWith('#')) {
    if (!previewAnchors.get(filePath)?.has(value.slice(1))) fail(`${context} points to missing anchor ${value}`);
    return;
  }

  const [target, hash] = value.split('#');
  const targetPath = path.resolve(path.dirname(filePath), target);
  if (!existsSync(targetPath)) {
    fail(`${context} points to missing preview file ${value}`);
    return;
  }
  if (hash && !previewAnchors.get(targetPath)?.has(hash)) {
    fail(`${context} points to missing preview anchor ${value}`);
  }
}

const files = sourceRoots.flatMap(walk).filter((filePath) => checkedExtensions.has(path.extname(filePath)));
const routes = collectRoutes();
const sourceAnchors = collectSourceAnchors(files.filter((file) => file.startsWith(path.join(root, 'src'))));
const previewAnchors = collectPreviewAnchors(files);
const linkPatterns = [
  /\b(?:href|src|poster|imageSrc|previewSrc|ogSrc|primaryHref|secondaryHref|url)\s*=\s*["']([^"']+)["']/g,
  /\b(?:href|src|poster|imageSrc|previewSrc|ogSrc|url)\s*:\s*["']([^"']+)["']/g
];

for (const filePath of files) {
  const content = readFileSync(filePath, 'utf8');
  for (const pattern of linkPatterns) {
    for (const match of content.matchAll(pattern)) {
      if (filePath.endsWith('.html') || filePath.endsWith('.css')) {
        validatePreviewLink(match[1], filePath, previewAnchors, routes);
      } else {
        validateSourceLink(match[1], filePath, routes, sourceAnchors);
      }
    }
  }
}

if (failures.length) {
  console.error('link audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`link audit passed: ${files.length} source and preview files checked`);

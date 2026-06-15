import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const previewsRoot = path.join(root, 'previews');
const port = Number(process.env.PREVIEW_PORT ?? 4173);
const mime = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.svg', 'image/svg+xml; charset=utf-8']
]);

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0] || '/');
  const normalized = decoded === '/' ? '/index.html' : decoded;
  const resolved = path.resolve(previewsRoot, `.${normalized}`);
  if (!resolved.startsWith(previewsRoot)) return undefined;
  return resolved;
}

const server = createServer((request, response) => {
  const filePath = safePath(request.url ?? '/');
  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Preview file not found. Run npm run preview:capture or open previews/index.html.');
    return;
  }

  response.writeHead(200, {
    'content-type': mime.get(path.extname(filePath).toLowerCase()) ?? 'application/octet-stream',
    'cache-control': 'no-store'
  });
  response.end(readFileSync(filePath));
});

server.listen(port, '127.0.0.1', () => {
  console.log(`EterSolis previews: http://127.0.0.1:${port}/`);
});

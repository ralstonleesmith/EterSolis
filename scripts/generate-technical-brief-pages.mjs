import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pdfPath = path.join(root, 'public/media/technical-intelligence-brief/cepa-technical-intelligence-brief-color-chemicals-issue-001-2026-07-05.pdf');
const outputDir = path.join(root, 'public/media/technical-intelligence-brief/pages');

function commandExists(command) {
  return spawnSync('command', ['-v', command], { shell: true, stdio: 'ignore' }).status === 0;
}

if (!existsSync(pdfPath)) {
  console.error(`Technical brief PDF is missing: ${pdfPath}`);
  process.exit(1);
}

if (!commandExists('pdftoppm')) {
  console.error([
    'Cannot generate technical brief page images because pdftoppm is not installed.',
    'Install Poppler locally or in CI, then rerun:',
    '  npm run brief:pages',
    '',
    'Expected output:',
    '  public/media/technical-intelligence-brief/pages/page-001.png ...'
  ].join('\n'));
  process.exit(1);
}

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

const prefix = path.join(outputDir, 'page');
const result = spawnSync('pdftoppm', ['-png', '-r', '160', pdfPath, prefix], { stdio: 'inherit' });
if (result.status !== 0) process.exit(result.status ?? 1);

console.log(`Technical brief page images generated in ${path.relative(root, outputDir)}`);

import fs from 'node:fs';
import path from 'node:path';

export type InsightIssue = {
  slug: string;
  issueNumber: string;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  publicationDate: string;
  summary: string;
  tags: string[];
  status: 'draft' | 'published';
  canonicalPath: string;
  pdfPath: string;
  coverImage: string;
  sourceNotes: string[];
  sourcePdf: string;
  body: string;
  sections: Array<{ title: string; content: string }>;
};

const contentDirectory = path.join(process.cwd(), 'content', 'insights');
const requiredFields = ['slug', 'issueNumber', 'title', 'subtitle', 'author', 'authorRole', 'publicationDate', 'summary', 'tags', 'status', 'canonicalPath', 'pdfPath', 'coverImage', 'sourceNotes', 'sourcePdf'] as const;

function parseMarkdownIssue(filePath: string): InsightIssue {
  const raw = fs.readFileSync(filePath, 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`${filePath} is missing JSON frontmatter`);
  const metadata = JSON.parse(match[1]) as Record<string, unknown>;
  for (const field of requiredFields) {
    if (metadata[field] === undefined || metadata[field] === '') throw new Error(`${filePath} is missing ${field}`);
  }

  if (!Array.isArray(metadata.tags) || metadata.tags.length === 0) throw new Error(`${filePath} must include tags`);
  if (!Array.isArray(metadata.sourceNotes) || metadata.sourceNotes.length === 0) throw new Error(`${filePath} must include sourceNotes`);
  if (metadata.status !== 'draft' && metadata.status !== 'published') throw new Error(`${filePath} has invalid status`);

  const body = match[2].trim();
  const sections = body
    .split(/\n(?=## )/g)
    .filter(Boolean)
    .map((section) => {
      const [heading, ...contentLines] = section.split('\n');
      return { title: heading.replace(/^##\s+/, '').trim(), content: contentLines.join('\n').trim() };
    });

  if (sections.length < 4) throw new Error(`${filePath} must include at least four sections`);

  return {
    slug: String(metadata.slug),
    issueNumber: String(metadata.issueNumber),
    title: String(metadata.title),
    subtitle: String(metadata.subtitle),
    author: String(metadata.author),
    authorRole: String(metadata.authorRole),
    publicationDate: String(metadata.publicationDate),
    summary: String(metadata.summary),
    tags: metadata.tags.map(String),
    status: metadata.status,
    canonicalPath: String(metadata.canonicalPath),
    pdfPath: String(metadata.pdfPath),
    coverImage: String(metadata.coverImage),
    sourceNotes: metadata.sourceNotes.map(String),
    sourcePdf: String(metadata.sourcePdf),
    body,
    sections
  };
}

export function getInsightIssues() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs
    .readdirSync(contentDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => parseMarkdownIssue(path.join(contentDirectory, fileName)))
    .sort((left, right) => right.publicationDate.localeCompare(left.publicationDate));
}

export function getPublishedInsightIssues() {
  return getInsightIssues().filter((issue) => issue.status === 'published');
}

export function getInsightIssue(slug: string) {
  return getInsightIssues().find((issue) => issue.slug === slug);
}

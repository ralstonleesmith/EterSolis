'use client';

import Image from 'next/image';
import { KeyboardEvent, TouchEvent, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Download, Printer } from 'lucide-react';
import Link from 'next/link';

type PageImage = {
  page: number;
  src: string;
  width: number;
  height: number;
  alt: string;
};

type Props = {
  title: string;
  pdfPath: string;
  printPath: string;
  pageCount: number;
  pages: readonly PageImage[];
};

export function TechnicalBriefReader({ title, pdfPath, printPath, pageCount, pages }: Props) {
  const availablePages = useMemo(() => pages.length > 0 ? pages : [], [pages]);
  const [pageIndex, setPageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const current = availablePages[pageIndex] ?? availablePages[0];
  const displayPage = current?.page ?? 1;
  const availableCount = availablePages.length;

  function goToIndex(index: number) {
    if (availablePages.length === 0) return;
    setPageIndex(Math.min(Math.max(index, 0), availablePages.length - 1));
  }

  function previous() {
    goToIndex(pageIndex - 1);
  }

  function next() {
    goToIndex(pageIndex + 1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      previous();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta > 0) previous();
    else next();
  }

  useEffect(() => {
    const adjacent = [availablePages[pageIndex - 1], availablePages[pageIndex + 1]].filter(Boolean);
    for (const page of adjacent) {
      const image = new window.Image();
      image.src = page.src;
    }
  }, [availablePages, pageIndex]);

  if (!current) {
    return (
      <div className="ui-surface rounded-lg p-6 shadow-soft">
        <p className="font-bold text-muted">Reader page assets have not been generated yet.</p>
      </div>
    );
  }

  return (
    <div
      className="ui-surface overflow-hidden rounded-lg bg-white shadow-soft dark:bg-black"
      tabIndex={0}
      role="region"
      aria-label={`${title} manual page reader`}
      onKeyDown={handleKeyDown}
    >
      <div className="flex flex-col gap-4 border-b border-coal/10 p-4 md:flex-row md:items-center md:justify-between dark:border-white/10">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-subtle">Manual publication reader</p>
          <p className="mt-1 text-sm font-bold text-muted">
            Page {displayPage} of {pageCount}. {availableCount < pageCount ? `${availableCount} page image${availableCount === 1 ? '' : 's'} currently generated.` : 'All page images generated.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={previous}
            disabled={pageIndex === 0}
            className="ui-control inline-flex h-11 w-11 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <label className="flex items-center gap-2 text-sm font-black text-body">
            <span>Page</span>
            <input
              aria-label="Current page"
              className="ui-field h-11 w-20 rounded-lg px-3 text-center"
              type="number"
              min={1}
              max={availableCount}
              value={pageIndex + 1}
              onChange={(event) => goToIndex(Number(event.target.value) - 1)}
            />
          </label>
          <button
            type="button"
            onClick={next}
            disabled={pageIndex >= availablePages.length - 1}
            className="ui-control inline-flex h-11 w-11 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <Link href={printPath} className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-sunshine px-4 text-sm font-black text-black">
            Print <Printer className="h-4 w-4" />
          </Link>
          <a href={pdfPath} className="ui-control inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-black">
            PDF <Download className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div
        className="relative bg-neutral-100 p-3 md:p-6 dark:bg-black"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mx-auto max-w-5xl">
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            className="h-auto w-full rounded-md border border-coal/10 bg-white shadow-sm dark:border-white/10"
            sizes="(min-width: 1280px) 960px, 100vw"
            priority={pageIndex === 0}
            unoptimized
          />
        </div>
      </div>

      <div className="grid gap-2 border-t border-coal/10 p-4 dark:border-white/10">
        <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Page thumbnails">
          {availablePages.map((page, index) => (
            <button
              key={page.src}
              type="button"
              onClick={() => goToIndex(index)}
              className={`min-w-14 rounded-lg border px-3 py-2 text-xs font-black ${index === pageIndex ? 'border-sunshine bg-sunshine text-black' : 'border-coal/10 text-body dark:border-white/10'}`}
              aria-label={`Go to page ${page.page}`}
              aria-current={index === pageIndex ? 'page' : undefined}
            >
              {page.page}
            </button>
          ))}
        </div>
        <p className="text-xs font-bold leading-5 text-muted">
          Use arrows, keyboard arrow keys, swipe gestures or the page selector. The reader never auto-advances.
        </p>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "@/app/lib/gallery";

/** Photos shown before the first "Load more", and per click after that. */
const PAGE_SIZE = 16;
/** Horizontal distance (px) a swipe must cover to change photos. */
const SWIPE_MIN = 48;
/** Slop before a touch counts as a horizontal drag instead of a tap. */
const DRAG_SLOP = 10;

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [open, setOpen] = useState<number | null>(null);
  const [drag, setDrag] = useState(0);
  const touch = useRef<{
    x: number;
    y: number;
    dx: number;
    dragging: boolean;
  } | null>(null);
  const swiped = useRef(false);

  const move = useCallback(
    (delta: number) =>
      setOpen((i) =>
        i === null ? i : (i + delta + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, move]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, dx: 0, dragging: false };
    swiped.current = false;
    setDrag(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const start = touch.current;
    if (!start) return;
    const t = e.touches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (!start.dragging && Math.abs(dx) > DRAG_SLOP && Math.abs(dx) > Math.abs(dy)) {
      start.dragging = true;
    }
    if (start.dragging) {
      // The ref, not the state, decides the swipe: a flick can end before
      // React commits the last move's render.
      start.dx = dx;
      setDrag(dx);
    }
  };

  const onTouchEnd = () => {
    const start = touch.current;
    touch.current = null;
    if (start?.dragging) {
      // A swipe is not a tap — keep the backdrop click from closing the viewer.
      swiped.current = true;
      if (Math.abs(start.dx) > SWIPE_MIN) move(start.dx < 0 ? 1 : -1);
    }
    setDrag(0);
  };

  if (photos.length === 0) {
    return (
      <div className="panel rounded-2xl px-6 py-20 text-center">
        <p className="eyebrow">Coming soon</p>
        <p className="font-display mt-3 text-2xl text-gold-soft">
          New photos are on the way
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Follow us on Instagram in the meantime — we post every week.
        </p>
      </div>
    );
  }

  const shown = photos.slice(0, visible);
  const remaining = photos.length - shown.length;

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {shown.map((photo, i) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block aspect-4/5 w-full cursor-zoom-in overflow-hidden rounded-xl border border-line/70"
            >
              <span className="sr-only">Enlarge: {photo.alt}</span>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-ink/30 transition-colors duration-500 group-hover:bg-ink/0"
              />
            </button>
          </li>
        ))}
      </ul>

      <p aria-live="polite" className="mt-8 text-center text-xs tracking-[0.22em] text-muted/80 uppercase">
        Showing {shown.length} of {photos.length}
      </p>

      {remaining > 0 ? (
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="btn btn-outline"
          >
            Load {Math.min(remaining, PAGE_SIZE)} more
          </button>
        </div>
      ) : null}

      {open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[open].alt}
          onClick={() => {
            if (swiped.current) {
              swiped.current = false;
              return;
            }
            setOpen(null);
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          className="animate-fade fixed inset-0 z-60 flex touch-pan-y items-center justify-center overflow-hidden bg-ink/96 p-4 backdrop-blur-sm sm:p-10"
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute top-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ink/70 text-gold"
          >
            <span className="sr-only">Close</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            className="absolute left-3 z-20 hidden h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-ink/70 text-gold sm:left-8 sm:flex"
          >
            <span className="sr-only">Previous photo</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            className="absolute right-3 z-20 hidden h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-ink/70 text-gold sm:right-8 sm:flex"
          >
            <span className="sr-only">Next photo</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <figure
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-3xl flex-col items-center"
            style={{
              transform: `translateX(${drag}px)`,
              transition: drag === 0 ? "transform 220ms ease-out" : "none",
            }}
          >
            <div className="relative h-[72svh] w-full">
              <Image
                src={photos[open].src}
                alt={photos[open].alt}
                fill
                priority
                draggable={false}
                sizes="(max-width: 1024px) 92vw, 768px"
                className="rounded-xl object-contain select-none"
              />
            </div>
            <figcaption className="mt-4 max-w-lg text-center text-xs leading-relaxed text-muted">
              {photos[open].alt}
              <span className="mt-1 block text-muted/80">
                {open + 1} / {photos.length}
              </span>
              <span className="mt-2 block tracking-[0.18em] text-muted/60 uppercase sm:hidden">
                Swipe to browse
              </span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}

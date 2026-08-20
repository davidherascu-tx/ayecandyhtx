"use client";

import Image from "next/image";
import { flushSync } from "react-dom";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { GalleryPhoto } from "@/app/lib/gallery";

/** Photos shown before the first "Load more", and per click after that. */
const PAGE_SIZE = 16;
/** Fraction of the viewer's width a drag must cover to change photos. */
const SWIPE_RATIO = 0.18;
/** A short, fast flick counts too: px/ms, over at least this many px. */
const FLICK_SPEED = 0.35;
const FLICK_MIN = 24;
/** Slop before a touch counts as a horizontal drag instead of a tap. */
const DRAG_SLOP = 8;
/** Slide animation; the commit timer matches it. */
const SLIDE_MS = 280;
const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";
/** The track holds prev/current/next, so the current photo sits one over. */
const CENTER = "translate3d(-100%, 0, 0)";
const SLOTS = [-1, 0, 1];

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [open, setOpen] = useState<number | null>(null);
  const isOpen = open !== null;

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const gesture = useRef({
    active: false,
    horizontal: false,
    x: 0,
    y: 0,
    dx: 0,
    at: 0,
    vx: 0,
  });
  /** True while a slide is animating to its committed photo. */
  const busy = useRef(false);
  /** The photo that animation is heading to, relative to the current one. */
  const pending = useRef(0);
  /** True when the touch that just ended was a swipe, not a tap. */
  const swiped = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const move = useCallback(
    (delta: number) =>
      setOpen((i) =>
        i === null ? i : (i + delta + photos.length) % photos.length,
      ),
    [photos.length],
  );

  const close = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    pending.current = 0;
    busy.current = false;
    setOpen(null);
  }, []);

  /** Land the photo a running slide is heading to, right now. */
  const commit = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    const dir = pending.current;
    pending.current = 0;
    busy.current = false;
    // Sync, so the layout effect re-centres the track before anything paints
    // or a follow-up gesture reads it.
    if (dir) flushSync(() => move(dir));
  }, [move]);

  /** Animate to a neighbour (±1) or back to centre (0), then commit the index. */
  const settle = useCallback(
    (dir: number) => {
      const track = trackRef.current;
      if (!track) return;
      track.style.transition = `transform ${SLIDE_MS}ms ${EASE}`;
      track.style.transform =
        dir === 0
          ? CENTER
          : `translate3d(${dir > 0 ? "-200%" : "0%"}, 0, 0)`;
      if (dir === 0) return;
      busy.current = true;
      pending.current = dir;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(commit, SLIDE_MS);
    },
    [commit],
  );

  /** Interrupting a running slide lands it first, so the next starts centred. */
  const nudge = useCallback(
    (dir: number) => {
      if (busy.current) commit();
      settle(dir);
    },
    [commit, settle],
  );

  // Re-centre without a transition once the new photo is in the track.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = "none";
    track.style.transform = CENTER;
    track.getBoundingClientRect(); // flush, so the next drag starts from centre
  }, [open]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") nudge(1);
      if (e.key === "ArrowLeft") nudge(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, nudge]);

  useEffect(() => {
    if (!isOpen) return;
    const surface = dialogRef.current;
    if (!surface) return;

    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      // Grabbing a photo mid-slide lands it, so the drag starts from centre.
      if (busy.current) commit();
      const t = e.touches[0];
      gesture.current = {
        active: true,
        horizontal: false,
        x: t.clientX,
        y: t.clientY,
        dx: 0,
        at: e.timeStamp,
        vx: 0,
      };
      swiped.current = false;
    };

    const onMove = (e: TouchEvent) => {
      const g = gesture.current;
      if (!g.active) return;
      const t = e.touches[0];
      const dx = t.clientX - g.x;
      const dy = t.clientY - g.y;

      if (!g.horizontal) {
        if (Math.abs(dy) > DRAG_SLOP && Math.abs(dy) >= Math.abs(dx)) {
          g.active = false;
          return;
        }
        if (Math.abs(dx) <= DRAG_SLOP) return;
        g.horizontal = true;
        const track = trackRef.current;
        if (track) {
          track.style.transition = "none";
          track.style.willChange = "transform";
        }
      }

      // Own the gesture: no rubber-banding, no iOS edge-swipe mid-drag.
      e.preventDefault();
      const dt = e.timeStamp - g.at;
      if (dt > 0) g.vx = (dx - g.dx) / dt;
      g.at = e.timeStamp;
      g.dx = dx;
      // touchmove is already frame-aligned, so paint straight to the DOM:
      // no re-render, and no extra frame of rAF latency.
      const track = trackRef.current;
      if (track) {
        track.style.transform = `translate3d(calc(-100% + ${dx}px), 0, 0)`;
      }
    };

    const onEnd = () => {
      const g = gesture.current;
      if (!g.active) return;
      g.active = false;
      const track = trackRef.current;
      if (track) track.style.willChange = "";
      if (!g.horizontal) return;
      // A swipe is not a tap — keep the trailing click from closing the viewer.
      swiped.current = true;
      const width = viewportRef.current?.clientWidth || 1;
      const far = Math.abs(g.dx) > width * SWIPE_RATIO;
      // Only a flick that is still travelling the way the drag went counts,
      // so pulling a photo back to centre does not fling it onward.
      const flick =
        Math.abs(g.vx) > FLICK_SPEED &&
        Math.abs(g.dx) > FLICK_MIN &&
        Math.sign(g.vx) === Math.sign(g.dx);
      settle(far || flick ? (g.dx < 0 ? 1 : -1) : 0);
    };

    surface.addEventListener("touchstart", onStart, { passive: true });
    surface.addEventListener("touchmove", onMove, { passive: false });
    surface.addEventListener("touchend", onEnd, { passive: true });
    surface.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      surface.removeEventListener("touchstart", onStart);
      surface.removeEventListener("touchmove", onMove);
      surface.removeEventListener("touchend", onEnd);
      surface.removeEventListener("touchcancel", onEnd);
    };
  }, [isOpen, commit, settle]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={photos[open].alt}
          onClick={() => {
            if (swiped.current) {
              swiped.current = false;
              return;
            }
            close();
          }}
          style={{ touchAction: "pan-y pinch-zoom" }}
          className="animate-fade fixed inset-0 z-60 flex items-center justify-center overflow-hidden bg-ink p-4 sm:p-10"
        >
          <button
            type="button"
            onClick={close}
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
              nudge(-1);
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
              nudge(1);
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
          >
            <div
              ref={viewportRef}
              className="relative h-[72svh] w-full overflow-hidden"
            >
              <div
                ref={trackRef}
                className="flex h-full w-full"
                style={{ transform: CENTER }}
              >
                {SLOTS.map((off) => {
                  const i = (open + off + photos.length) % photos.length;
                  const photo = photos[i];
                  return (
                    <div
                      // Photo keys let React move the slides instead of
                      // reloading them; too few photos to be unique, so fall
                      // back to the slot.
                      key={photos.length >= SLOTS.length ? photo.src : `slot${off}`}
                      className="relative h-full w-full shrink-0"
                    >
                      <Image
                        src={photo.src}
                        alt={off === 0 ? photo.alt : ""}
                        fill
                        draggable={false}
                        loading="eager"
                        sizes="(max-width: 1024px) 92vw, 768px"
                        className="rounded-xl object-contain select-none"
                      />
                    </div>
                  );
                })}
              </div>
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

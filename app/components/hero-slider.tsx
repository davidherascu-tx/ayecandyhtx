"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { happyHours, music, openHours, site } from "@/app/lib/site";

type Slide = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  body?: string;
  rows?: { days: string; time: string; closed?: boolean }[];
};

const slides: Slide[] = [
  {
    src: "/slider/slider_1.webp",
    alt: "The backlit gold bar at Aye Candy, lined with bottles and green velvet stools",
    eyebrow: "Spring Branch, Houston",
    title: "Aye Candy Speakeasy",
    body: site.tagline,
  },
  {
    src: "/slider/slider_3.webp",
    alt: "Guests laughing over cocktails in the candlelit lounge at Aye Candy",
    eyebrow: "Open Hours",
    title: "Come see us",
    rows: openHours,
  },
  {
    src: "/slider/slider_2.webp",
    alt: "A coupe cocktail garnished with a marigold on the bar top",
    eyebrow: "Happy Hour",
    title: `${music.title} — ${music.lead} ${music.detail}`,
    rows: happyHours,
  },
];

const INTERVAL = 6500;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Aye Candy highlights"
      className="relative h-[88svh] min-h-[560px] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      onTouchStart={(e) => {
        touchStart.current = e.changedTouches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 50) go(index + (delta < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${slides.length}`}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-20 sm:px-8 sm:pb-24">
        <div key={index} className="animate-rise max-w-2xl">
          <p className="eyebrow">{slides[index].eyebrow}</p>
          <h1 className="font-display mt-4 text-4xl leading-[1.05] font-semibold text-balance sm:text-6xl lg:text-7xl">
            <span className="gold-text">{slides[index].title}</span>
          </h1>

          {slides[index].body ? (
            <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/80 sm:text-lg">
              {slides[index].body}
            </p>
          ) : null}

          {slides[index].rows ? (
            <dl className="mt-6 space-y-2">
              {slides[index].rows.map((row) => (
                <div
                  key={row.days}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
                >
                  <dt className="min-w-[13rem] text-sm tracking-[0.14em] uppercase text-cream/85">
                    {row.days}
                  </dt>
                  <dd
                    className={`font-display text-xl ${
                      row.closed ? "text-muted" : "text-gold-soft"
                    }`}
                  >
                    {row.time}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={site.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              Make a reservation
            </a>
            <a href="#signature" className="btn btn-outline">
              What we pour
            </a>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            <span className="sr-only">Previous slide</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            <span className="sr-only">Next slide</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="ml-2 flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => go(i)}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-10 bg-gold" : "w-4 bg-cream/30 hover:bg-cream/60"
                }`}
              >
                <span className="sr-only">Go to slide {i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

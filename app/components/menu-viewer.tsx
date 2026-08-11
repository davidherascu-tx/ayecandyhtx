"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type MenuSheet = {
  id: string;
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const sheets: MenuSheet[] = [
  {
    id: "cocktails",
    label: "Cocktails",
    src: "/cocktail_06_24_2025.webp",
    alt: "Aye Candy signature cocktail menu",
    width: 792,
    height: 1024,
  },
  {
    id: "wine",
    label: "Wine",
    src: "/wine_06_24_2025.webp",
    alt: "Aye Candy wine list",
    width: 792,
    height: 1024,
  },
];

export default function MenuViewer() {
  const [active, setActive] = useState(sheets[0].id);
  const [zoomed, setZoomed] = useState(false);
  const sheet = sheets.find((s) => s.id === active) ?? sheets[0];

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoomed]);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Menus"
        className="mx-auto flex w-fit gap-1 rounded-full border border-gold/25 bg-ink-2 p-1.5"
      >
        {sheets.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={s.id === active}
            aria-controls={`panel-${s.id}`}
            id={`tab-${s.id}`}
            onClick={() => setActive(s.id)}
            className={`rounded-full px-7 py-3 text-[0.72rem] font-semibold tracking-[0.22em] uppercase transition-colors ${
              s.id === active
                ? "bg-gold text-ink"
                : "text-cream/70 hover:text-gold-soft"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div
        id={`panel-${sheet.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${sheet.id}`}
        className="mt-10"
      >
        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="panel group mx-auto block w-full max-w-3xl cursor-zoom-in overflow-hidden rounded-2xl p-2 sm:p-3"
        >
          <span className="sr-only">Enlarge the {sheet.label.toLowerCase()} menu</span>
          <Image
            key={sheet.src}
            src={sheet.src}
            alt={sheet.alt}
            width={sheet.width}
            height={sheet.height}
            quality={90}
            sizes="(max-width: 768px) 96vw, 768px"
            className="animate-fade h-auto w-full rounded-xl"
          />
        </button>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setZoomed(true)}
            className="btn btn-outline"
          >
            Enlarge menu
          </button>
          <a
            href={sheet.src}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Open in new tab
          </a>
        </div>
      </div>

      {zoomed ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={sheet.alt}
          onClick={() => setZoomed(false)}
          className="animate-fade fixed inset-0 z-60 flex items-start justify-center overflow-auto bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="fixed top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ink text-gold"
          >
            <span className="sr-only">Close</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <Image
            src={sheet.src}
            alt={sheet.alt}
            width={sheet.width}
            height={sheet.height}
            quality={90}
            sizes="(max-width: 1024px) 100vw, 900px"
            className="h-auto w-full max-w-3xl rounded-xl"
          />
        </div>
      ) : null}
    </div>
  );
}

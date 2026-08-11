"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/app/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line/80 bg-ink/92 backdrop-blur-lg"
          : "border-b border-transparent bg-gradient-to-b from-ink/85 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
          <Image
            src="/logo.webp"
            alt={site.name}
            width={470}
            height={314}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative text-[0.72rem] font-medium tracking-[0.22em] uppercase transition-colors ${
                  active ? "text-gold" : "text-cream/75 hover:text-gold-soft"
                }`}
              >
                {link.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold hidden px-6 py-3 text-[0.68rem] sm:inline-flex"
          >
            Reservations
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line/70 bg-ink/97 backdrop-blur-lg lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line/50 py-4 text-sm tracking-[0.2em] uppercase text-cream/85 hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={site.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn btn-gold mt-6 w-full"
          >
            Book a table
          </a>
        </nav>
      </div>
    </header>
  );
}

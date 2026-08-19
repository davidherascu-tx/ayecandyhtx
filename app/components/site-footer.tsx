import Image from "next/image";
import Link from "next/link";
import {
  happyHours,
  music,
  navLinks,
  openHours,
  site,
} from "@/app/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line/70 bg-ink-2">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Image
            src="/logo.webp"
            alt={site.name}
            width={470}
            height={314}
            sizes="120px"
            className="h-20 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            {site.tagline}
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              <span className="sr-only">Instagram</span>
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
              </svg>
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              <span className="sr-only">Facebook</span>
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.12-2.41-.12-2.39 0-4.03 1.46-4.03 4.14V9.9H7.5V13h2.76v8h3.24Z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-gold-soft">
            Hours
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            {openHours.map((h) => (
              <div key={h.days}>
                <dt className="text-cream/90">{h.days}</dt>
                <dd className={h.closed ? "text-muted/80" : "text-muted"}>
                  {h.time}
                </dd>
              </div>
            ))}
          </dl>
          <h3 className="mt-6 text-[0.7rem] tracking-[0.28em] text-gold uppercase">
            Happy Hour
          </h3>
          {happyHours.map((h) => (
            <p key={h.days} className="mt-2 text-sm text-muted">
              {h.days}
              <br />
              {h.time}
            </p>
          ))}
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-gold-soft">
            Find Us
          </h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-muted">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-colors hover:text-gold-soft"
            >
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </a>
            <a
              href={site.phoneHref}
              className="block transition-colors hover:text-gold-soft"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="block break-all transition-colors hover:text-gold-soft"
            >
              {site.email}
            </a>
          </address>
          <h3 className="mt-6 text-[0.7rem] tracking-[0.28em] text-gold uppercase">
            {music.title}
          </h3>
          <p className="mt-2 text-sm text-muted">
            {music.lead} {music.detail}
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-gold-soft">
            Explore
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted transition-colors hover:text-gold-soft"
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
            className="btn btn-gold mt-6 w-full"
          >
            Reservations
          </a>
        </div>
      </div>

      <div className="border-t border-line/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center text-xs text-muted/80 sm:flex-row sm:px-8 sm:text-left">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>Must be {site.minimumAge}+ to enter. Please drink responsibly.</p>
        </div>
      </div>
    </footer>
  );
}

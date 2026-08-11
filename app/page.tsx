import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/app/components/hero-slider";
import RecommendedBadge from "@/app/components/recommended-badge";
import {
  happyHours,
  music,
  openHours,
  signatureCocktails,
  site,
} from "@/app/lib/site";

const pourPhotos = [
  { src: "/left_banner.webp", alt: "Watermelon High cocktail with a Tajín rim and fresh mint" },
  { src: "/center_banner.webp", alt: "Two guests toasting coupes at the glowing bar" },
  { src: "/right_banner.webp", alt: "A rocks cocktail with a shaved chocolate rim and marigold" },
];

export default function Home() {
  return (
    <>
      <HeroSlider />

      {/* ---------- Quick facts ---------- */}
      <section className="border-y border-line/70 bg-ink-2">
        <div className="mx-auto grid max-w-7xl gap-px px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
          <InfoCard title="Open Hours">
            <ul className="space-y-1.5">
              {openHours.map((h) => (
                <li key={h.days} className="text-sm">
                  <span className="block text-cream/85">{h.days}</span>
                  <span className={h.closed ? "text-muted/70" : "text-gold-soft"}>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="Happy Hour">
            {happyHours.map((h) => (
              <p key={h.days} className="text-sm">
                <span className="block text-cream/85">{h.days}</span>
                <span className="font-display text-2xl text-gold-soft">
                  {h.time}
                </span>
              </p>
            ))}
          </InfoCard>

          <InfoCard title={music.title}>
            <p className="font-display text-2xl text-gold-soft">{music.lead}</p>
            <p className="mt-1 text-sm text-muted">{music.detail}</p>
          </InfoCard>

          <InfoCard title="Location">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cream/85 transition-colors hover:text-gold-soft"
            >
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </a>
            <a
              href={site.phoneHref}
              className="mt-2 block text-sm text-gold-soft"
            >
              {site.phone}
            </a>
          </InfoCard>
        </div>
      </section>

      {/* ---------- Welcome ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-gold/20">
              <Image
                src="/bar-entrance.webp"
                alt="The blue and white candy shop storefront at 1849 Bingle Rd"
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden
              className="absolute -right-3 -bottom-3 -z-10 h-full w-full rounded-2xl border border-gold/25 sm:-right-5 sm:-bottom-5"
            />
          </div>

          <div>
            <p className="eyebrow">Behind the door</p>
            <h2 className="font-display mt-4 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
              More than meets the eye
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                As you walk along Bingle Rd in Spring Branch, you’ll notice a
                cheerful storefront drawing a lot of attention. A bright blue and
                white awning tops what appears to be a quaint candy shop — but
                behind these doors, there’s more than meets the eye.
              </p>
              <p>
                Step inside and you’re greeted by one of the coolest cocktail
                bars on the west side of Houston: a sophisticated, grown‑up room
                built for unwinding after work, lingering over something stirred,
                and staying later than you planned.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/menu" className="btn btn-gold">
                View the menu
              </Link>
              <Link href="/private-events" className="btn btn-outline">
                Private events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Signature cocktails ---------- */}
      <section
        id="signature"
        className="scroll-mt-24 border-y border-line/70 bg-ink-2 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <p className="eyebrow">From the bar</p>
            <h2 className="font-display mt-4 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
              <span className="gold-text">Signature Cocktails We Recommend</span>
            </h2>
            <div className="rule mt-6" aria-hidden>
              <span className="text-xs">✦</span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-5">
            {pourPhotos.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-square overflow-hidden rounded-xl border border-line/70 sm:aspect-4/3"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 31vw, 30vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <ul className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {signatureCocktails.map((drink) => (
              <li key={drink.name}>
                <div className="flex items-baseline gap-4">
                  <h3 className="font-display text-2xl font-semibold text-gold-soft">
                    {drink.name}
                  </h3>
                  <span
                    aria-hidden
                    className="h-px flex-1 bg-gradient-to-r from-gold/45 to-transparent"
                  />
                  <span className="font-display text-xl text-gold">
                    {drink.price}
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {drink.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/menu" className="btn btn-gold">
              See the full menu
            </Link>
            <a
              href={site.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Reserve a table
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Private events teaser ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/banner_private_event.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/78" />
        </div>

        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <p className="eyebrow">Book the room</p>
          <h2 className="font-display mt-4 text-4xl leading-tight font-semibold text-balance sm:text-5xl">
            Private events at Aye Candy
          </h2>
          <p className="mt-5 text-base leading-relaxed text-cream/80">
            Four packages, from a semi‑private corner for fifteen to the whole
            venue for a hundred. Valet, a fully staffed bar, and a charcuterie
            board available on request.
          </p>
          <Link href="/private-events" className="btn btn-gold mt-9">
            See details
          </Link>
        </div>
      </section>

      {/* ---------- Award + closing CTA ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="panel rounded-2xl px-6 py-14 text-center sm:px-12">
          <RecommendedBadge />

          <h2 className="font-display mt-10 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
            Pull up a stool
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            Reservations go through Toast — grab a table, bring your people, and
            let the bartenders take it from there.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              Make a reservation
            </a>
            <a href={site.phoneHref} className="btn btn-outline">
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-line/70 px-2 py-8 sm:px-6 md:border-r md:last:border-r-0">
      <h2 className="text-[0.68rem] tracking-[0.3em] text-gold uppercase">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

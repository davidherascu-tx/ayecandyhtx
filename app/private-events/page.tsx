import Image from "next/image";
import JsonLd from "@/app/components/json-ld";
import PageHeader from "@/app/components/page-header";
import { breadcrumbJsonLd, pageMetadata } from "@/app/lib/seo";
import { eventContact, eventPackages, site } from "@/app/lib/site";

export const metadata = pageMetadata({
  title: "Private Events",
  description:
    "Platinum, Gold, Silver and Bronze private event packages at Aye Candy — full or semi-private venue rental for 15 to 100 guests in Spring Branch, Houston.",
  path: "/private-events",
  imageAlt: "A private event set up in the Aye Candy lounge",
});

export default function PrivateEventsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Private Events", "/private-events")} />
      <PageHeader
        eyebrow="Book the room"
        title="Private Events"
        lead="Full venue buyouts, semi‑private corners, valet at the curb and a fully staffed bar. Tell us the date and we’ll take it from there."
        image="/banner_private_event.webp"
        imageAlt=""
      />

      {/* ---------- Story ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div className="space-y-6 text-base leading-relaxed text-muted">
            <p>
              As you walk along Bingle Rd in Spring Branch, you’ll notice a
              cheerful storefront drawing a lot of attention. A bright blue and
              white awning tops what appears to be a quaint candy shop, but
              behind these doors, there’s more than meets the eye.
            </p>
            <p>
              It’s called Aye Candy, and you’ll find more than just sugary sweets
              at this location. As you enter this one‑of‑a‑kind establishment,
              you’re greeted with one of the coolest cocktail bars on the west
              side of Houston. Founder Cristy Velasco has created a true gem,
              adding to the vibrant feel of this beloved neighborhood. But behind
              its ultra‑cool walls is a story as unique as its decor and
              cocktails.
            </p>
            <p>
              Recognizing that the neighborhood had attracted buzzy restaurants
              over the past few years, Cristy partnered with her mother, Mely
              Velasco, and brother, Rafael Velasco, to open a bar that no one
              would expect. One that went beyond a typical sports bar, offering a
              sophisticated and mature setting that would fit in perfectly in any
              metropolitan city. While Spring Branch is no stranger to bar scenes,
              the area lacked a place where adults could gather after work to
              relax and unwind in a more elevated setting.
            </p>
            <p>
              Since its opening, Aye Candy has captured the hearts and minds of
              Spring Branch residents. Whether it’s in line at Costco or in one of
              many news reports, people can’t stop talking about the
              neighborhood’s newest addition. What makes this speakeasy stand
              out?
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-gold/20 lg:aspect-4/3">
              <Image
                src="/private_event.webp"
                alt="The Aye Candy lounge arranged for a private party"
                fill
                sizes="(max-width: 1024px) 45vw, 34vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-gold/20 lg:aspect-4/3">
              <Image
                src="/private_event_2.webp"
                alt="Candlelit seating in the private event space at Aye Candy"
                fill
                sizes="(max-width: 1024px) 45vw, 34vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Packages ---------- */}
      <section className="border-y border-line/70 bg-ink-2 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <p className="eyebrow">Choose your night</p>
            <h2 className="font-display mt-4 text-4xl font-semibold text-balance sm:text-5xl">
              <span className="gold-text">Event Packages</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {eventPackages.map((pkg) => (
              <article
                key={pkg.tier}
                className="panel flex flex-col rounded-2xl p-8 sm:p-10"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-3xl font-semibold">
                    <span className="gold-text">{pkg.tier}</span>
                  </h3>
                  <span className="rounded-full border border-gold/30 px-4 py-1.5 text-[0.65rem] tracking-[0.2em] text-gold uppercase">
                    {pkg.capacity}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-cream/85">
                  {pkg.headline}
                </p>

                <ul className="mt-6 space-y-3 text-sm text-muted">
                  {pkg.perks.map((perk) => (
                    <li key={perk} className="flex gap-3">
                      <span aria-hidden className="mt-1.5 text-[0.6rem] text-gold">
                        ✦
                      </span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="panel rounded-2xl px-6 py-12 text-center sm:px-12">
          <p className="eyebrow">Let’s plan it</p>
          <h2 className="font-display mt-4 text-3xl font-semibold text-balance sm:text-4xl">
            Feel free to contact us if you have any additional questions or
            concerns
          </h2>

          <dl className="mt-10 grid gap-8 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-[0.65rem] tracking-[0.28em] text-gold uppercase">
                Event coordinator
              </dt>
              <dd className="mt-2 text-cream/90">{eventContact.coordinator}</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-[0.28em] text-gold uppercase">
                E‑mail
              </dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${eventContact.email}`}
                  className="break-all text-cream/90 transition-colors hover:text-gold-soft"
                >
                  {eventContact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-[0.28em] text-gold uppercase">
                Call
              </dt>
              <dd className="mt-2">
                <a
                  href={site.phoneHref}
                  className="text-cream/90 transition-colors hover:text-gold-soft"
                >
                  {eventContact.call}
                </a>
                <span className="block text-xs text-muted/80">
                  *{eventContact.callNote}*
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-[0.28em] text-gold uppercase">
                Text
              </dt>
              <dd className="mt-2">
                <a
                  href={site.textPhoneHref}
                  className="text-cream/90 transition-colors hover:text-gold-soft"
                >
                  {eventContact.text}
                </a>
              </dd>
            </div>
          </dl>

          <a
            href={`mailto:${eventContact.email}?subject=${encodeURIComponent(
              "Private event inquiry — Aye Candy",
            )}`}
            className="btn btn-gold mt-10"
          >
            Email the coordinator
          </a>
        </div>
      </section>
    </>
  );
}

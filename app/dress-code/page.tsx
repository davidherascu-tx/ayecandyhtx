import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/app/components/page-header";
import { site } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Dress Code",
  description:
    "The dress code at Aye Candy — smart casual and elevated. What to wear, what to leave at home, and the 21+ ID policy.",
};

/**
 * PLACEHOLDER COPY — written to match an upscale speakeasy so the page is
 * complete and live-ready. Swap these lists for the venue's official policy.
 */
const encouraged = [
  "Elevated smart casual — this is a night out, not a sports bar",
  "Collared shirts, blouses, dresses and tailored tops",
  "Dark or clean denim, trousers, skirts",
  "Dress shoes, heels, boots and clean fashion sneakers",
  "Blazers and jackets always welcome",
];

const notPermitted = [
  "Athletic wear, gym shorts, sweatpants and jerseys",
  "Tank tops or sleeveless shirts on gentlemen",
  "Flip flops, slides and shower sandals",
  "Hats, beanies, du‑rags and hoods worn indoors",
  "Work boots, excessively baggy or torn clothing",
  "Anything with offensive language or imagery",
];

export default function DressCodePage() {
  return (
    <>
      <PageHeader
        eyebrow="House rules"
        title="Dress Code"
        lead="Aye Candy is an elevated cocktail lounge. Dress like you’re going somewhere — the room does."
        image="/slider/slider_3.webp"
        imageAlt=""
      />

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="panel rounded-2xl p-8 sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-gold-soft">
              Come dressed in
            </h2>
            <ul className="mt-6 space-y-3.5 text-sm leading-relaxed text-muted">
              {encouraged.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-1.5 text-[0.6rem] text-gold">
                    ✦
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="panel rounded-2xl p-8 sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-gold-soft">
              Please leave at home
            </h2>
            <ul className="mt-6 space-y-3.5 text-sm leading-relaxed text-muted">
              {notPermitted.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-1.5 text-[0.6rem] text-gold/60">
                    ✕
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="panel mt-6 rounded-2xl p-8 sm:p-10">
          <h2 className="font-display text-2xl font-semibold text-gold-soft">
            At the door
          </h2>
          <ul className="mt-6 space-y-3.5 text-sm leading-relaxed text-muted">
            <li className="flex gap-3">
              <span aria-hidden className="mt-1.5 text-[0.6rem] text-gold">
                ✦
              </span>
              <span>
                Guests must be {site.minimumAge} or older. A valid,
                government‑issued photo ID is required for every guest, every
                visit — no exceptions.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="mt-1.5 text-[0.6rem] text-gold">
                ✦
              </span>
              <span>
                Dress code is enforced Friday and Saturday evenings and during
                private events. On quieter nights we relax it a little — when in
                doubt, dress up.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="mt-1.5 text-[0.6rem] text-gold">
                ✦
              </span>
              <span>
                Management reserves the right to refuse entry or service at its
                discretion. Please drink responsibly and never drink and drive.
              </span>
            </li>
          </ul>

          <p className="mt-8 text-sm text-muted">
            Questions before you head over? Call{" "}
            <a
              href={site.phoneHref}
              className="text-gold-soft underline-offset-4 hover:underline"
            >
              {site.phone}
            </a>{" "}
            or email{" "}
            <a
              href={`mailto:${site.email}`}
              className="break-all text-gold-soft underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            .
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={site.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            Reserve a table
          </a>
          <Link href="/menu" className="btn btn-outline">
            View the menu
          </Link>
        </div>
      </section>
    </>
  );
}

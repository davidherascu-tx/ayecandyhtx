import Link from "next/link";
import JsonLd from "@/app/components/json-ld";
import MenuViewer from "@/app/components/menu-viewer";
import PageHeader from "@/app/components/page-header";
import { breadcrumbJsonLd, pageMetadata } from "@/app/lib/seo";
import { happyHours, site } from "@/app/lib/site";

export const metadata = pageMetadata({
  title: "Menu",
  description:
    "Signature cocktails and the wine list at Aye Candy, the speakeasy on Bingle Rd in Spring Branch, Houston. Happy hour Tuesday and Wednesday, 5–7 PM.",
  path: "/menu",
  imageAlt: "A signature cocktail from the Aye Candy menu",
});

export default function MenuPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Menu", "/menu")} />
      <PageHeader
        eyebrow="Cocktails & Wine"
        title="The Menu"
        lead="Everything is made to order behind the candy shop door. Menus change with the season — tap a sheet to enlarge it."
        image="/slider/slider_2.webp"
        imageAlt=""
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <MenuViewer />

        <div className="panel mt-16 rounded-2xl px-6 py-10 text-center sm:px-12">
          <p className="eyebrow">Good to know</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Happy hour runs {happyHours[0].days.toLowerCase()},{" "}
            {happyHours[0].time}. Ask your bartender about the cocktail of the
            month — it never makes it onto the printed sheet. A 20% gratuity is
            automatically added to all checks.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              Reserve a table
            </a>
            <Link href="/private-events" className="btn btn-outline">
              Book a private event
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

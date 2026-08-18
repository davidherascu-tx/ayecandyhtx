import type { Metadata } from "next";
import { openHours, signatureCocktails, site } from "@/app/lib/site";

/**
 * Every page's canonical URL and social image has to be absolute, so both are
 * built from `site.url`. Update that one constant when the domain changes and
 * the canonicals, the sitemap and the JSON-LD all follow.
 */
export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

/** Social card images, sized so crawlers can lay out a preview before fetching. */
const ogImages = {
  "/": { url: "/Aye-Candy_banner.webp", width: 1600, height: 1330 },
  "/menu": { url: "/menu_image_cocktail.webp", width: 768, height: 1025 },
  "/private-events": { url: "/banner_private_event.webp", width: 1600, height: 1081 },
  "/dress-code": { url: "/slider/slider_3.webp", width: 1600, height: 1067 },
  "/gallery": { url: "/Aye-Candy_banner.webp", width: 1600, height: 1330 },
} as const;

export type PageRoute = keyof typeof ogImages;

/** The routes that belong in the sitemap, in the order they matter to us. */
export const routes: { path: PageRoute; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/menu", priority: 0.9 },
  { path: "/private-events", priority: 0.9 },
  { path: "/gallery", priority: 0.7 },
  { path: "/dress-code", priority: 0.6 },
];

/**
 * Builds a page's metadata with the pieces that are easy to forget: a
 * self-referencing canonical, and Open Graph / Twitter cards carrying that
 * page's own title, description and image rather than the site-wide default.
 *
 * The root layout supplies the title template, so `title` here is the bare
 * page name ("Menu"), not the full "Menu | Aye Candy".
 */
export function pageMetadata({
  title,
  description,
  path,
  imageAlt,
}: {
  title: string;
  description: string;
  path: PageRoute;
  imageAlt: string;
}): Metadata {
  const image = ogImages[path];
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: absoluteUrl(path),
      title: fullTitle,
      description,
      images: [{ ...image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}

/**
 * The venue itself, as structured data. This is what earns the rich result in
 * local search — the hours panel, the star rating slot, the "Reserve" action —
 * so the address, phone and hours here must match the real listing exactly.
 *
 * `BarOrPub` is a schema.org subtype of LocalBusiness, so it inherits every
 * LocalBusiness property Google looks for.
 */
export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  "@id": absoluteUrl("/#business"),
  name: site.legalName,
  alternateName: site.name,
  description: site.tagline,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: absoluteUrl("/Aye-Candy_banner.webp"),
  logo: absoluteUrl("/logo.webp"),
  priceRange: site.priceRange,
  servesCuisine: "Cocktails",
  currenciesAccepted: "USD",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  hasMap: site.mapsUrl,
  sameAs: [site.social.facebook, site.social.instagram, site.guruUrl],
  // Only the days we actually open — a closed day is expressed by absence.
  openingHoursSpecification: openHours
    .filter((h) => h.schema)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.schema!.dayOfWeek,
      opens: h.schema!.opens,
      closes: h.schema!.closes,
    })),
  hasMenu: {
    "@type": "Menu",
    url: absoluteUrl("/menu"),
    name: "Signature Cocktails & Wine",
    hasMenuSection: {
      "@type": "MenuSection",
      name: "Signature Cocktails",
      hasMenuItem: signatureCocktails.map((c) => ({
        "@type": "MenuItem",
        name: c.name,
        description: c.description,
        offers: {
          "@type": "Offer",
          price: c.price,
          priceCurrency: "USD",
        },
      })),
    },
  },
  acceptsReservations: site.reservationUrl,
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: site.reservationUrl,
      inLanguage: "en-US",
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/IOSPlatform",
        "https://schema.org/AndroidPlatform",
      ],
    },
    result: { "@type": "Reservation", name: `Table at ${site.name}` },
  },
};

/** Ties every page back to one site entity so Google groups them. */
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: site.url,
  name: site.name,
  publisher: { "@id": absoluteUrl("/#business") },
  inLanguage: "en-US",
};

/**
 * Breadcrumb trail for a subpage. Google renders this in place of the raw URL
 * under the result title, so "Aye Candy › Menu" replaces "ayecandyhtx.com/menu".
 */
export function breadcrumbJsonLd(name: string, path: PageRoute) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name, item: absoluteUrl(path) },
    ],
  };
}

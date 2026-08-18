import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import AgeGate from "@/app/components/age-gate";
import JsonLd from "@/app/components/json-ld";
import SiteFooter from "@/app/components/site-footer";
import SiteHeader from "@/app/components/site-header";
import { businessJsonLd, websiteJsonLd } from "@/app/lib/seo";
import { AGE_MAX_AGE_MS, AGE_STORAGE_KEY, site } from "@/app/lib/site";

const display = Cormorant_Garamond({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body-family",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Speakeasy Cocktail Bar in Spring Branch, Houston`,
    template: `%s | ${site.name}`,
  },
  description:
    "Aye Candy is a speakeasy cocktail bar hidden behind a candy shop on Bingle Rd in Spring Branch, Houston. Signature cocktails, happy hour, live music every other Saturday, and private event packages.",
  applicationName: site.name,
  category: "Bar",
  keywords: [
    "Aye Candy",
    "speakeasy Houston",
    "cocktail bar Spring Branch",
    "Bingle Rd bar",
    "private events Houston",
    "speakeasy near me",
    "live music Houston bar",
    "cocktail lounge Houston",
    "Houston 77055 bar",
  ],
  // Pages override this with their own path; the home page inherits "/".
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: `${site.name} — Speakeasy Cocktail Bar, Houston`,
    description:
      "A candy shop out front. A speakeasy behind the door. Signature cocktails on Bingle Rd in Spring Branch.",
    images: [
      {
        url: "/Aye-Candy_banner.webp",
        width: 1600,
        height: 1330,
        alt: "Friends toasting signature cocktails at Aye Candy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Speakeasy Cocktail Bar, Houston`,
    description:
      "A candy shop out front. A speakeasy behind the door. Signature cocktails on Bingle Rd in Spring Branch.",
    images: ["/Aye-Candy_banner.webp"],
  },
  // Without max-image-preview:large Google shows a thumbnail instead of the
  // full-width photo, which is most of the appeal for a venue like this.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Renders nothing until a token is set — see site.googleSiteVerification.
  verification: site.googleSiteVerification
    ? { google: site.googleSiteVerification }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#08070a",
};

/**
 * Runs before first paint so a guest whose age check is still valid never sees
 * the gate flash. The gate itself is server-rendered visible by default.
 *
 * A missing value gives Number(null) === 0 and a legacy "true" gives NaN — both
 * falsy, so anything that isn't a fresh timestamp is treated as unverified.
 */
const ageGateScript = `try{var t=Number(localStorage.getItem(${JSON.stringify(
  AGE_STORAGE_KEY,
)}));if(t&&Date.now()-t<${AGE_MAX_AGE_MS}){document.documentElement.setAttribute("data-age-ok","1")}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: ageGateScript }} />
        {/* Site-wide structured data — the venue, and the site it belongs to. */}
        <JsonLd data={businessJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <AgeGate />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

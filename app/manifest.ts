import type { MetadataRoute } from "next";
import { site } from "@/app/lib/site";

/**
 * Served at /manifest.webmanifest. Lets a guest add the site to a phone home
 * screen, and satisfies the installability checks Lighthouse runs under SEO
 * and PWA. Colours mirror the theme colour set in the root layout's viewport.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Speakeasy Cocktail Bar, Houston`,
    short_name: site.name,
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#08070a",
    theme_color: "#08070a",
    categories: ["food", "lifestyle", "entertainment"],
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

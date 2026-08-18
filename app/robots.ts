import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/app/lib/seo";

/**
 * Served at /robots.txt.
 *
 * Everything is crawlable — the age gate is a CSS overlay, not a redirect, so
 * the page content is in the HTML for crawlers regardless. The Sitemap line is
 * how Google discovers the sitemap without it being submitted by hand.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}

import type { MetadataRoute } from "next";
import { absoluteUrl, routes } from "@/app/lib/seo";

/**
 * Served at /sitemap.xml — this is the URL to submit under Sitemaps in Google
 * Search Console. The route list lives in seo.ts so it cannot drift from the
 * canonical URLs the pages declare.
 *
 * `lastModified` is stamped at build time: a redeploy is the only thing that
 * can change what these static pages say, so build time is the honest answer.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}

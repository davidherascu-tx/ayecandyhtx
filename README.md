This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## SEO & Google Search Console

Everything search engines need is generated from `app/lib/site.ts` and
`app/lib/seo.ts` — update the venue details in one place and the metadata,
sitemap and structured data all follow.

| Route | What it is |
| --- | --- |
| `/robots.txt` | Crawl rules + a pointer to the sitemap (`app/robots.ts`) |
| `/sitemap.xml` | All five pages (`app/sitemap.ts`) |
| `/manifest.webmanifest` | Home-screen install metadata (`app/manifest.ts`) |

Each page ships a self-referencing canonical URL, its own Open Graph and
Twitter card, and JSON-LD structured data: a `BarOrPub` listing (address,
phone, opening hours, cocktail menu, reservation link), a `WebSite` entity,
and a `BreadcrumbList` on the subpages.

### Connecting Search Console

1. Go to [Google Search Console](https://search.google.com/search-console) and
   add a property for `https://ayecandyhtx.com`.
2. Choose the **HTML tag** verification method and copy the `content` value —
   the long string, not the whole tag.
3. Paste it into `googleSiteVerification` in `app/lib/site.ts`, or set
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in the deployment environment.
   While it is empty no verification tag is rendered.
4. Deploy, then press **Verify** in Search Console.
5. Under **Sitemaps**, submit `sitemap.xml`.

> The canonical URLs, sitemap and structured data are all built from
> `site.url`. If the production domain is ever anything other than
> `https://ayecandyhtx.com`, change it there first.

### Checking the structured data

Paste a deployed URL into the
[Rich Results Test](https://search.google.com/test/rich-results) to confirm
Google reads the venue listing and breadcrumbs.

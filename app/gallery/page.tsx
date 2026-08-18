import GalleryGrid from "@/app/components/gallery-grid";
import JsonLd from "@/app/components/json-ld";
import PageHeader from "@/app/components/page-header";
import { galleryPhotos } from "@/app/lib/gallery";
import { breadcrumbJsonLd, pageMetadata } from "@/app/lib/seo";
import { site } from "@/app/lib/site";

export const metadata = pageMetadata({
  title: "Gallery",
  description:
    "Inside Aye Candy — the gold back bar, candlelit brick walls, signature cocktails and the nights that fill the room on Bingle Rd in Spring Branch, Houston.",
  path: "/gallery",
  imageAlt: "The candlelit bar room at Aye Candy",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Gallery", "/gallery")} />
      <PageHeader
        eyebrow="Inside the room"
        title="Gallery"
        lead="The bar, the drinks, and the nights that fill the room. More photos are added all the time."
        image="/Aye-Candy_banner.webp"
        imageAlt=""
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <GalleryGrid photos={galleryPhotos} />

        <div className="mt-16 text-center">
          <p className="text-sm text-muted">
            See the latest on Instagram —{" "}
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-soft underline-offset-4 hover:underline"
            >
              @ayecandyhtx
            </a>
          </p>
          <a
            href={site.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold mt-8"
          >
            Reserve a table
          </a>
        </div>
      </section>
    </>
  );
}

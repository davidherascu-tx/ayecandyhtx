import Image from "next/image";

export default function PageHeader({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line/70">
      {image ? (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/80 to-ink" />
        </div>
      ) : null}

      <div className="relative mx-auto max-w-4xl px-5 pt-24 pb-16 text-center sm:px-8 sm:pt-32 sm:pb-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="font-display mt-4 text-4xl leading-tight font-semibold text-balance sm:text-6xl">
          <span className="gold-text">{title}</span>
        </h1>
        {lead ? (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/80">
            {lead}
          </p>
        ) : null}
        <div className="rule mt-8" aria-hidden>
          <span className="text-xs">✦</span>
        </div>
      </div>
    </section>
  );
}

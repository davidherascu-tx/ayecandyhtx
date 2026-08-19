"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AGE_MAX_AGE_MS, AGE_STORAGE_KEY, site } from "@/app/lib/site";

/** True when a confirmation is stored and still inside the expiry window. */
function isStillVerified() {
  try {
    const confirmedAt = Number(window.localStorage.getItem(AGE_STORAGE_KEY));
    return Boolean(confirmedAt) && Date.now() - confirmedAt < AGE_MAX_AGE_MS;
  } catch {
    return false;
  }
}

/**
 * Blocking age agreement. Rendered on every page.
 *
 * Visibility is driven entirely by `data-age-ok` on <html> plus the CSS rule in
 * globals.css — never by unmounting — so the gate can come back when the stored
 * confirmation ages out. The inline script in the root layout stamps that
 * attribute before first paint, so a still-valid guest never sees a flash.
 */
export default function AgeGate() {
  const [declined, setDeclined] = useState(false);

  useEffect(() => {
    // The confirmation expires on a clock, so re-check when the guest comes
    // back to the tab rather than interrupting an active reader with a timer.
    const sync = () => {
      if (isStillVerified()) return;
      document.documentElement.removeAttribute("data-age-ok");
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") sync();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", sync);
    window.addEventListener("pageshow", sync); // back/forward cache restores

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", sync);
      window.removeEventListener("pageshow", sync);
    };
  }, []);

  function accept() {
    try {
      window.localStorage.setItem(AGE_STORAGE_KEY, String(Date.now()));
    } catch {
      // Private browsing / storage disabled — the gate simply asks again later.
    }
    document.documentElement.setAttribute("data-age-ok", "1");
    setDeclined(false);
  }

  return (
    <div
      id="age-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="flex items-center justify-center bg-ink/95 px-5 py-10 backdrop-blur-md"
    >
      <div className="panel animate-rise relative w-full max-w-lg overflow-hidden rounded-2xl px-7 py-10 text-center sm:px-12 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        <Image
          src="/logo.webp"
          alt=""
          width={470}
          height={314}
          priority
          // Renders 144px wide (168px from sm up). Without `sizes` Next serves
          // a 1080px-wide file for a slot a seventh that size.
          sizes="(min-width: 640px) 168px, 144px"
          className="mx-auto h-24 w-auto sm:h-28"
        />

        {!declined ? (
          <>
            <p className="eyebrow mt-7">Please verify</p>
            <h2
              id="age-gate-title"
              className="font-display mt-3 text-3xl leading-tight font-semibold sm:text-4xl"
            >
              Are you {site.minimumAge} or older?
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
              You must be {site.minimumAge} years of age or older to enter{" "}
              {site.name}. By entering this site you confirm that you meet the
              legal drinking age and agree to enjoy our cocktails responsibly.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button type="button" onClick={accept} className="btn btn-gold w-full sm:w-auto">
                Yes, I am {site.minimumAge}+
              </button>
              <button
                type="button"
                onClick={() => setDeclined(true)}
                className="btn btn-outline w-full sm:w-auto"
              >
                No, take me back
              </button>
            </div>

            <p className="mt-7 text-[0.68rem] tracking-[0.25em] text-muted/80 uppercase">
              Drink responsibly · Never drink and drive
            </p>
          </>
        ) : (
          <>
            <p className="eyebrow mt-7">Sorry</p>
            <h2
              id="age-gate-title"
              className="font-display mt-3 text-3xl leading-tight font-semibold sm:text-4xl"
            >
              Come back when you turn {site.minimumAge}
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
              You must be at least {site.minimumAge} years old to view this
              site. We hope to pour you something special one day.
            </p>
            <button
              type="button"
              onClick={() => setDeclined(false)}
              className="btn btn-outline mt-8"
            >
              Go back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

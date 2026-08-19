"use client";

import { useEffect, useRef } from "react";
import { site } from "@/app/lib/site";

const BADGE_CSS = "https://awards.infcdn.net/2024/badge-circledLeaves27.css";

/** Measured height of the rendered badge, reserved up-front so loading it shifts nothing. */
const BADGE_HEIGHT = 200;

/**
 * Restaurant Guru "Recommended" award badge.
 *
 * Markup is reproduced from the snippet Restaurant Guru issues for this venue —
 * the id/class names are what their stylesheet targets, so leave them alone.
 *
 * Their stylesheet pulls two uncacheable font files totalling ~712 KiB. Loading
 * it the normal way put all of that on the critical path and blocked first
 * render by ~800ms for a badge sitting near the foot of the page, so it is
 * injected only once the badge nears the viewport. The anchor stays in the
 * server-rendered HTML so crawlers still see the link.
 *
 * Nothing here hides the anchor while the stylesheet is in flight: if that CSS
 * is slow or never arrives, a plain text link to the award page is a fine
 * outcome, whereas a hidden-until-loaded badge fails to an empty box. The
 * reserved height below keeps either outcome from shifting the layout.
 */
export default function RecommendedBadge({
  className = "",
}: {
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slot = ref.current;
    if (!slot) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        if (document.querySelector("link[data-rg-badge]")) return;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = BADGE_CSS;
        link.dataset.rgBadge = "";
        document.head.appendChild(link);
      },
      // Start fetching before it scrolls into view so it arrives already styled.
      { rootMargin: "400px" },
    );

    observer.observe(slot);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex items-center justify-center ${className}`}
      style={{ minHeight: BADGE_HEIGHT }}
    >
      <a
        id="b-circledLeaves27"
        target="_blank"
        rel="noopener noreferrer"
        href={site.guruUrl}
        className="b-circledLeaves27--dark b-circledLeaves27--2025"
      >
        <span className="b-circledLeaves27__title">Recommended</span>
        <span className="b-circledLeaves27__separator"></span>
        <span className="b-circledLeaves27__name">Aye Candy</span>
      </a>
    </div>
  );
}

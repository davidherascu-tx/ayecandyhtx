/**
 * Restaurant Guru "Recommended" award badge.
 *
 * Markup is reproduced from the snippet Restaurant Guru issues for this venue —
 * the id/class names are what their stylesheet targets, so leave them alone.
 * React 19 hoists the <link> into <head> and de-dupes it by precedence.
 */
export default function RecommendedBadge({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex justify-center ${className}`}>
      <link
        rel="stylesheet"
        href="https://awards.infcdn.net/2024/badge-circledLeaves27.css"
        precedence="default"
      />
      <a
        id="b-circledLeaves27"
        target="_blank"
        rel="noopener noreferrer"
        href="https://restaurantguru.com/Aye-Candy-Houston"
        className="b-circledLeaves27--dark b-circledLeaves27--2025"
      >
        <span className="b-circledLeaves27__title">Recommended</span>
        <span className="b-circledLeaves27__separator"></span>
        <span className="b-circledLeaves27__name">Aye Candy</span>
      </a>
    </div>
  );
}

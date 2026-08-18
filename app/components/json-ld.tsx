/**
 * Renders a structured-data payload as a JSON-LD script tag.
 *
 * `<` is escaped to its unicode form because JSON.stringify does not sanitise
 * for HTML — without it a `</script>` inside any string would close the tag
 * early and turn the rest of the payload into executable markup.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

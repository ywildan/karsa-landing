/**
 * Gradient bridge between two sections with different background colors.
 * Rendered between the sections with negative vertical margins, so it
 * overlaps the bottom padding of the previous section and the top padding
 * of the next one without adding any layout height: the hard solid edge
 * becomes a smooth fade from `from` (previous section bg) to `to` (next
 * section bg).
 */
export function SectionBlend({ from, to }: { from: string; to: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative z-[5] -my-10 h-20 md:-my-14 md:h-28"
      style={{ backgroundImage: `linear-gradient(to bottom, ${from} 0%, ${to} 100%)` }}
    />
  );
}

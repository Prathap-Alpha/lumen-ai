/*
 * LumenLogo — "Lumen" wordmark with an orbiting-dot glyph.
 * Editorial, minimal, single-color (currentColor).
 */
export default function LumenLogo({
  className = "",
  showWord = true,
}: {
  className?: string;
  showWord?: boolean;
}) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 sm:h-8 sm:w-8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Orbit ring */}
        <circle
          cx="16"
          cy="16"
          r="13"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.45"
        />
        {/* Core */}
        <circle cx="16" cy="16" r="5" fill="currentColor" />
        {/* Orbiting dot */}
        <circle cx="29" cy="16" r="2.4" fill="currentColor" />
      </svg>
      {showWord && (
        <span
          className="font-display text-[1.85rem] sm:text-[2.15rem] leading-none tracking-tight"
          style={{ fontWeight: 500, letterSpacing: "-0.01em" }}
        >
          Lumen
        </span>
      )}
    </div>
  );
}

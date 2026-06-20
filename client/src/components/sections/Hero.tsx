/*
 * Hero — Full-viewport intro.
 * Desktop: 3D orb fills the right; editorial type on the left.
 * Mobile: orb sits centered behind shrunken type; smaller hero height.
 */
import LumenOrb from "../LumenOrb";

const HERO_BG = "/assets/hero-bg.webp";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative w-full min-h-[640px] h-[100svh] sm:min-h-[720px] sm:h-screen overflow-hidden grain"
    >
      {/* Soft atmospheric background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${HERO_BG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.55,
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(242,240,235,0.4) 80%, var(--color-lumen-cream) 100%)",
        }}
      />

      {/* 3D scene */}
      <div className="absolute inset-0 z-10">
        <LumenOrb />
      </div>

      {/* Foreground text overlays */}
      <div className="relative z-20 container h-full flex flex-col justify-between pt-24 sm:pt-32 pb-10 sm:pb-16 pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          <p className="font-mono-eyebrow text-foreground/60 mb-4 sm:mb-6 text-[10px] sm:text-xs">
            01 — Lumen / Applied Intelligence Studio
          </p>
          <h1 className="font-display text-[2.5rem] xs:text-[3rem] sm:text-[4.5rem] lg:text-[6rem] leading-[0.95] tracking-tight text-foreground">
            Intelligence,
            <br />
            <span className="italic font-light">illuminated.</span>
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 sm:gap-6 pointer-events-auto">
          <div className="max-w-md">
            <p className="font-display text-base sm:text-xl text-foreground/85 leading-snug">
              An applied-intelligence studio born in{" "}
              <span className="italic">Botswana</span>, built for the world.
            </p>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-foreground/55 leading-relaxed max-w-sm">
              Twenty-four products across finance, industry, healthcare and
              private AI — from production ERPs to on-device computer vision.
            </p>
          </div>
          <a
            href="#industries"
            className="group inline-flex items-center gap-3 font-mono-eyebrow text-foreground/70 hover:text-foreground transition-colors duration-300"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-foreground/30 group-hover:border-foreground transition-all duration-300 group-hover:translate-y-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-3.5 w-3.5"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" />
              </svg>
            </span>
            Scroll to begin
          </a>
        </div>
      </div>
    </section>
  );
}

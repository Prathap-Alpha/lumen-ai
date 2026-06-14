/*
 * Footer — Minimal, anchored, with marquee wordmark.
 */
import LumenLogo from "./LumenLogo";

export default function Footer() {
  return (
    <footer className="relative bg-[oklch(0.14_0.008_70)] text-[oklch(0.92_0.012_85)] pt-12 pb-10 overflow-hidden">
      {/* Marquee wordmark */}
      <div className="relative overflow-hidden mb-10 select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <span
              key={i}
              className="font-display italic font-light text-[12vw] leading-none text-white/[0.04] pr-8"
            >
              Lumen · Intelligence illuminated · Lumen · Intelligence illuminated ·{" "}
            </span>
          ))}
        </div>
      </div>

      <div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-white/10">
        <LumenLogo className="text-white" />
        <p className="font-mono-eyebrow text-white/40 text-[0.65rem]">
          © {new Date().getFullYear()} Lumen Intelligence Ltd · Built in Botswana, serving worldwide
        </p>
        <div className="flex gap-6 font-mono-eyebrow text-white/55">
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">X</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

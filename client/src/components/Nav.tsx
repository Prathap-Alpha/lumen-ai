/*
 * Nav — Fixed minimal navigation with backdrop blur on scroll.
 * Editorial spacing, mono eyebrow nav items.
 * Mobile: hamburger -> full-screen overlay drawer.
 */
import { useEffect, useState } from "react";
import LumenLogo from "./LumenLogo";

const items = [
  { label: "Industries", href: "#industries" },
  { label: "Work", href: "#work" },
  { label: "Offerings", href: "#offerings" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Team", href: "#team" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "py-3 bg-[oklch(0.962_0.012_85/0.7)] backdrop-blur-xl border-b border-border/60"
            : "py-4 sm:py-6 bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between gap-3">
          <a
            href="#top"
            className="text-foreground hover:opacity-80 transition-opacity shrink-0"
            onClick={() => setOpen(false)}
          >
            <LumenLogo />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono-eyebrow text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex font-mono-eyebrow items-center gap-2 px-4 py-2.5 bg-foreground text-background rounded-full btn-press transition-all duration-300 hover:gap-3"
          >
            <span>Get in touch</span>
            <span aria-hidden>→</span>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/25 bg-background/40 backdrop-blur-md btn-press"
          >
            <span
              className={`absolute h-px w-5 bg-foreground transition-all duration-300 ease-out ${
                open ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-foreground transition-all duration-300 ease-out ${
                open ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-out ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-[oklch(0.96_0.012_85/0.96)] backdrop-blur-2xl" />
        <nav className="relative z-10 flex h-full flex-col justify-center px-8 pt-20 pb-12">
          <ul className="space-y-5">
            {items.map((item, i) => (
              <li
                key={item.href}
                className={`transition-all duration-500 ${
                  open
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-5xl leading-tight tracking-tight text-foreground hover:italic transition-all"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div
            className={`mt-12 transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: open ? "350ms" : "0ms" }}
          >
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="font-mono-eyebrow inline-flex items-center gap-3 px-6 py-4 bg-foreground text-background rounded-full"
            >
              <span>Get in touch</span>
              <span aria-hidden>→</span>
            </a>
          </div>
          <p
            className={`mt-12 font-mono-eyebrow text-foreground/45 transition-all duration-500 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: open ? "450ms" : "0ms" }}
          >
            Lumen — Gaborone · Worldwide
          </p>
        </nav>
      </div>
    </>
  );
}

/*
 * Contact — Final CTA, dark background, three actions.
 * Closes the long-scroll with intention.
 */
import { useReveal } from "@/hooks/useReveal";

const EMAIL = "prathap.bb@gmail.com";
const PHONE = "+267 72720011";
const PHONE_TEL = "+26772720011";

const ACTIONS = [
  {
    label: "Email us",
    sublabel: "Start a conversation",
    href: `mailto:${EMAIL}?subject=Lumen%20%E2%80%94%20Enquiry`,
    primary: false,
  },
  {
    label: "Schedule a demonstration",
    sublabel: "See the system at work",
    href: `mailto:${EMAIL}?subject=Lumen%20%E2%80%94%20Schedule%20a%20demonstration`,
    primary: true,
  },
  {
    label: "Call +267 72720011",
    sublabel: "Speak with us directly",
    href: `tel:${PHONE_TEL}`,
    primary: false,
  },
];

export default function Contact() {
  const ref = useReveal();
  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 sm:py-44 bg-[oklch(0.14_0.008_70)] text-[oklch(0.95_0.012_85)] overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 70% 40%, oklch(0.74 0.13 75 / 0.5), transparent 60%)",
        }}
      />
      <div className="container relative">
        <div className="max-w-4xl">
          <p className="reveal font-mono-eyebrow text-white/45 mb-6">
            06 — Begin
          </p>
          <h2 className="reveal font-display text-[2.6rem] sm:text-[4rem] lg:text-[6rem] leading-[0.92] tracking-tight">
            Be the
            <br />
            <span className="italic font-light text-[oklch(0.74_0.13_75)]">
              next quiet
            </span>
            <br />
            leap forward.
          </h2>
          <p className="reveal mt-8 text-white/65 max-w-lg leading-relaxed text-lg">
            One conversation is enough to know whether we are right for each
            other. We will tell you, candidly, either way.
          </p>
        </div>

        <div className="reveal mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {ACTIONS.map((a) => (
            <a
              key={a.label}
              href={a.href}
              className={`group btn-press block text-left rounded-md p-6 transition-all duration-300 ${
                a.primary
                  ? "bg-[oklch(0.74_0.13_75)] text-[oklch(0.14_0.008_70)] hover:bg-[oklch(0.78_0.13_75)]"
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
            >
              <p
                className={`font-mono-eyebrow mb-3 ${
                  a.primary ? "text-black/50" : "text-white/45"
                }`}
              >
                {a.sublabel}
              </p>
              <div className="flex items-center justify-between gap-4">
                <span className="font-display text-xl sm:text-2xl leading-tight">
                  {a.label}
                </span>
                <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="reveal mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-white/10 text-sm text-white/55">
          <div>
            <p className="font-mono-eyebrow text-white/40 mb-2">Headquarters</p>
            <p>Gaborone, Botswana</p>
          </div>
          <div>
            <p className="font-mono-eyebrow text-white/40 mb-2">Coverage</p>
            <p>Worldwide engagements</p>
          </div>
          <div>
            <p className="font-mono-eyebrow text-white/40 mb-2">Email</p>
            <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">
              {EMAIL}
            </a>
          </div>
          <div>
            <p className="font-mono-eyebrow text-white/40 mb-2">Phone</p>
            <a href={`tel:${PHONE_TEL}`} className="hover:text-white transition-colors">
              {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

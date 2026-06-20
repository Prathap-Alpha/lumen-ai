/*
 * Industries — Editorial card grid (compact).
 * 9 industries, tighter 3:4 cards, 4-col desktop (with 4-3-2 wrap),
 * 3-col tablet, 2-col mobile. Cards ~40% smaller than v1.
 */
import { useReveal } from "@/hooks/useReveal";

type Industry = {
  no: string;
  name: string;
  caption: string;
  img: string;
};

const INDUSTRIES: Industry[] = [
  {
    no: "01",
    name: "Insurance",
    caption: "Underwriting, claims, fraud.",
    img: "/assets/industry-insurance.webp",
  },
  {
    no: "02",
    name: "Banking & Finance",
    caption: "Risk, AML, advisory.",
    img: "/assets/industry-banking.webp",
  },
  {
    no: "03",
    name: "Manufacturing",
    caption: "Predictive maintenance, yield.",
    img: "/assets/industry-manufacturing.webp",
  },
  {
    no: "04",
    name: "Mining",
    caption: "Geology, ore-sort, safety.",
    img: "/assets/industry-mining.webp",
  },
  {
    no: "05",
    name: "Hospitals",
    caption: "Triage, scheduling, records.",
    img: "/assets/industry-hospitals.webp",
  },
  {
    no: "06",
    name: "Healthcare",
    caption: "Diagnostics, care pathways.",
    img: "/assets/industry-healthcare.webp",
  },
  {
    no: "07",
    name: "Logistics",
    caption: "Routing, warehousing, fleet.",
    img: "/assets/industry-logistics.webp",
  },
  {
    no: "08",
    name: "Agriculture",
    caption: "Yield, irrigation, supply.",
    img: "/assets/industry-agriculture.webp",
  },
  {
    no: "09",
    name: "SMEs",
    caption: "Books, ops, customer care.",
    img: "/assets/industry-smes.webp",
  },
];

export default function Industries() {
  const ref = useReveal();
  return (
    <section
      id="industries"
      ref={ref}
      className="relative py-28 sm:py-36 bg-background"
    >
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 sm:mb-16">
          <div className="max-w-2xl">
            <p className="reveal font-mono-eyebrow text-foreground/55 mb-5">
              02 — Industries we serve
            </p>
            <h2 className="reveal font-display text-[2.4rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[0.96] tracking-tight">
              We move with the
              <br />
              <span className="italic font-light">industries that move</span>{" "}
              the world.
            </h2>
          </div>
          <div className="reveal max-w-sm">
            <p className="text-foreground/65 leading-relaxed">
              From Gaborone to global. Nine sectors where intelligence creates
              measurable, immediate value — and where we deliver it.
            </p>
          </div>
        </div>

        {/* Compact cards grid: 2-col mobile, 3-col tablet, 4-col desktop, 5-col XL */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {INDUSTRIES.map((ind, i) => (
            <article
              key={ind.no}
              className="reveal group relative aspect-[3/4] overflow-hidden rounded-md bg-secondary"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <img
                src={ind.img}
                alt={ind.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
              {/* Soft inkwash overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, transparent 35%, rgba(26,20,16,0.78) 100%)",
                }}
              />
              {/* Top eyebrow */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="font-mono-eyebrow text-[10px] sm:text-[11px] text-white/85">
                  {ind.no}
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-3.5 w-3.5 text-white"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              {/* Bottom title block */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-display text-base sm:text-lg lg:text-xl leading-tight">
                  {ind.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/75 mt-1 leading-snug">
                  {ind.caption}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

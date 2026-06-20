/*
 * Work / Portfolio — 24 products across 6 categories.
 * Editorial Futurism: cream bg, charcoal text, sun-gold accent.
 * Each product card: name (Fraunces) + one-liner + status pill + tech caption.
 * Hover: border turns gold, card lifts 2px. Staggered reveal per card.
 * NO duplicates — each product appears exactly once.
 */
import { useEffect, useRef } from "react";

type Status = "Live" | "Shipping" | "Built" | "Demo";

interface Product {
  name: string;
  desc: string;
  status: Status;
  tech: string;
}

interface Category {
  index: string;
  title: string;
  products: Product[];
}

const CATEGORIES: Category[] = [
  {
    index: "01",
    title: "Finance & Insurance",
    products: [
      { name: "Omni ERP", desc: "Group-wide insurance ERP backbone.", status: "Live", tech: "React · Node · Postgres" },
      { name: "Omni Native Apps", desc: "Native mobile front-ends for Omni.", status: "Shipping", tech: "Swift · Kotlin" },
      { name: "Health Quotations", desc: "Instant health-cover quoting engine.", status: "Live", tech: "Node · Rules engine" },
      { name: "Claims PO Ingest", desc: "Automated claims purchase-order intake.", status: "Built", tech: "Python · OCR · Queue" },
      { name: "Wordings Library", desc: "Searchable policy-wordings repository.", status: "Built", tech: "Next · Search index" },
      { name: "Smart Underwriting Upload", desc: "AI-assisted underwriting document upload.", status: "Demo", tech: "LLM · RAG · OCR" },
    ],
  },
  {
    index: "02",
    title: "Automation & Private AI",
    products: [
      { name: "Alpha Stack", desc: "Private, on-prem AI automation stack.", status: "Live", tech: "LLM · RAG · On-prem" },
      { name: "Data Extraction Toolkit", desc: "Structured data from any document.", status: "Shipping", tech: "Python · OCR · Vision" },
      { name: "FX Freshness Guard", desc: "Monitors and validates FX-rate freshness.", status: "Built", tech: "Node · Scheduler" },
      { name: "Autonomous Bug Triage", desc: "AI triages and routes incoming bugs.", status: "Demo", tech: "LLM · Webhooks" },
      { name: "Test Bridge", desc: "Automated test orchestration layer.", status: "Built", tech: "TypeScript · CI" },
    ],
  },
  {
    index: "03",
    title: "Industry, Trade & Retail",
    products: [
      { name: "Motovac ERP", desc: "ERP for automotive parts & trade.", status: "Live", tech: "React · Node · SQL" },
      { name: "TswanaFuel", desc: "Fuel retail / distribution platform.", status: "Shipping", tech: "Next · Postgres" },
      { name: "Chemspec Intelligence", desc: "Chemical-spec intelligence & lookup.", status: "Built", tech: "Python · Search" },
      { name: "Sentinel", desc: "On-device computer-vision monitoring.", status: "Demo", tech: "Python · ONNX · Edge" },
      { name: "Auto City", desc: "Automotive retail management system.", status: "Built", tech: "React · Node" },
      { name: "Call Pro", desc: "Call-centre / telephony operations tool.", status: "Shipping", tech: "Node · WebRTC" },
    ],
  },
  {
    index: "04",
    title: "Healthcare & Public Sector",
    products: [
      { name: "Dr. AI", desc: "Clinical decision-support assistant.", status: "Demo", tech: "LLM · RAG" },
      { name: "Vendor Onboarding", desc: "Streamlined supplier onboarding flow.", status: "Built", tech: "Next · Workflow" },
      { name: "Lekgetho", desc: "Tax-automation concept (public sector).", status: "Demo", tech: "Python · Rules" },
    ],
  },
  {
    index: "05",
    title: "Sports & Consumer",
    products: [
      { name: "Dinaledi Football", desc: "Football vision analytics.", status: "Demo", tech: "Python · Vision · ML" },
      { name: "Rizq", desc: "Gulf-market consumer fintech.", status: "Built", tech: "React Native · Node" },
    ],
  },
  {
    index: "06",
    title: "AI Assistants",
    products: [
      { name: "ARIA", desc: "Boardroom AI assistant.", status: "Live", tech: "LLM · RAG · Voice" },
      { name: "Phepa", desc: "Desktop file / organizer assistant.", status: "Built", tech: "Electron · LLM" },
    ],
  },
];

// Featured — accounting software + the flagship assistant, spotlit above the grid.
const FEATURED = [
  {
    name: "Aria",
    kicker: "Our flagship",
    desc: "Our super-star boardroom assistant — voice, vision and live financial recall, sitting beside the people who run the numbers.",
    tech: "LLM · RAG · Voice",
  },
  {
    name: "GRC Club",
    kicker: "Accounting software",
    desc: "End-to-end accounting built the way a finance team actually works — capture, control, and clean, defensible books.",
    tech: "Next · Postgres · OCR",
  },
  {
    name: "Nako Pula",
    kicker: "Accounting software",
    desc: "SME accounting made for Botswana — effortless to run, rigorous underneath. Engineered by Nako Tech.",
    tech: "PWA · Offline-first · OCR",
  },
];

const statusClass: Record<Status, string> = {
  Live: "bg-[var(--color-lumen-gold)] text-[var(--color-lumen-ink)] border-transparent",
  Shipping:
    "bg-transparent text-[var(--color-lumen-gold-dark)] border-[var(--color-lumen-gold)]",
  Built: "bg-transparent text-foreground/70 border-foreground/35",
  Demo: "bg-transparent text-foreground/45 border-foreground/20",
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    el.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function Work() {
  const ref = useReveal();
  let cardCounter = 0;

  return (
    <section id="work" ref={ref} className="relative py-24 sm:py-32 grain">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className="reveal font-mono-eyebrow text-[var(--color-lumen-gold-dark)] mb-5">
            03 — Selected work
          </p>
          <h2 className="reveal font-display text-[2.25rem] sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight">
            Twenty-four products.
            <br />
            <span className="italic font-light text-[var(--color-lumen-gold-dark)]">
              One studio.
            </span>
          </h2>
          <p className="reveal mt-6 text-sm sm:text-base text-foreground/60 leading-relaxed max-w-xl">
            From production ERPs and accounting software to on-device computer
            vision and a boardroom assistant — built and shipped across the group.
          </p>
        </div>

        {/* Featured — accounting software + flagship assistant */}
        <div className="mb-20 sm:mb-24">
          <div className="reveal flex items-baseline gap-4 border-b border-[var(--color-lumen-gold)]/45 pb-4 mb-8">
            <span className="font-mono-eyebrow text-[var(--color-lumen-gold-dark)]">
              ★ Featured
            </span>
            <span className="ml-auto font-mono-eyebrow text-foreground/40">
              Accounting software · flagship AI
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-foreground/10">
            {FEATURED.map((f, i) => (
              <article
                key={f.name}
                className="reveal group relative bg-background border-r border-b border-foreground/10 p-7 sm:p-8 transition-all duration-300 ease-out hover:-translate-y-0.5"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="pointer-events-none absolute inset-0 border border-transparent group-hover:border-[var(--color-lumen-gold)] transition-colors duration-300" />
                <p className="font-mono-eyebrow text-[var(--color-lumen-gold-dark)] mb-4">
                  {f.kicker}
                </p>
                <h4 className="font-display text-2xl sm:text-[1.75rem] tracking-tight leading-tight mb-3">
                  {f.name}
                </h4>
                <p className="text-sm text-foreground/65 leading-relaxed">
                  {f.desc}
                </p>
                <p className="mt-5 pt-4 border-t border-foreground/10 font-mono-eyebrow text-[10px] text-foreground/45">
                  {f.tech}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-16 sm:space-y-20">
          {CATEGORIES.map((cat) => (
            <div key={cat.index}>
              <div className="reveal flex items-baseline gap-4 border-b border-foreground/15 pb-4 mb-8">
                <span className="font-mono-eyebrow text-[var(--color-lumen-gold-dark)]">
                  {cat.index}
                </span>
                <h3 className="font-display text-xl sm:text-2xl tracking-tight">
                  {cat.title}
                </h3>
                <span className="ml-auto font-mono-eyebrow text-foreground/40">
                  {cat.products.length} products
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-foreground/10">
                {cat.products.map((p) => {
                  const delay = (cardCounter++ % 3) * 60;
                  return (
                    <article
                      key={p.name}
                      className="reveal group relative bg-background border-r border-b border-foreground/10 p-6 sm:p-7 transition-all duration-300 ease-out hover:-translate-y-0.5"
                      style={{ transitionDelay: `${delay}ms` }}
                    >
                      {/* gold hover border */}
                      <span className="pointer-events-none absolute inset-0 border border-transparent group-hover:border-[var(--color-lumen-gold)] transition-colors duration-300" />
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h4 className="font-display text-lg sm:text-xl tracking-tight leading-tight">
                          {p.name}
                        </h4>
                        <span
                          className={`shrink-0 font-mono-eyebrow text-[9px] px-2.5 py-1 rounded-full border ${statusClass[p.status]}`}
                        >
                          {p.status}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/65 leading-relaxed min-h-[2.5rem]">
                        {p.desc}
                      </p>
                      <p className="mt-4 pt-3 border-t border-foreground/10 font-mono-eyebrow text-[10px] text-foreground/45">
                        {p.tech}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

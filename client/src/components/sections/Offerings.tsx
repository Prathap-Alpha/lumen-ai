/*
 * Offerings — Five-column editorial list with hover-reveal long descriptions.
 * Inspired by editorial magazine spreads.
 */
import { useReveal } from "@/hooks/useReveal";

const OFFERINGS = [
  {
    no: "I",
    title: "AI-Powered Analytics",
    short: "Actionable insight from your data.",
    long: "Decision-grade analytics that distill noise into clarity — pricing models, demand forecasts, risk surfaces. Built on your data, delivered to your dashboards.",
  },
  {
    no: "II",
    title: "Process Automation",
    short: "Reduce repetition, raise accuracy.",
    long: "From claims intake to ledger reconciliation, we automate the work that wears teams down — quietly, reliably, with audit trails by default.",
  },
  {
    no: "III",
    title: "Industry-Specific Modules",
    short: "Tailored to your sector's reality.",
    long: "Pre-built capabilities for insurance underwriting, hospital triage, mining safety, manufacturing yield, SME bookkeeping and healthcare diagnostics.",
  },
  {
    no: "IV",
    title: "Compliance & Security",
    short: "Safeguards built in, not bolted on.",
    long: "Data residency, role-based access, model audit trails and regulatory alignment for GDPR, POPIA, HIPAA and Botswana DPA.",
  },
  {
    no: "V",
    title: "Scalable Architecture",
    short: "Grows with the organisation.",
    long: "Cloud-native, on-premise or hybrid. Start with one workflow, scale to the enterprise. No re-platforming, no rebuilds.",
  },
];

export default function Offerings() {
  const ref = useReveal();
  return (
    <section
      id="offerings"
      ref={ref}
      className="relative py-28 sm:py-36 bg-[oklch(0.18_0.008_70)] text-[oklch(0.92_0.012_85)] overflow-hidden"
    >
      {/* Subtle gradient accent */}
      <div
        className="pointer-events-none absolute -top-1/3 -right-1/4 w-[55vw] h-[55vw] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.74 0.13 75 / 0.7), transparent 70%)",
        }}
      />
      <div className="container relative">
        <div className="max-w-3xl mb-20">
          <p className="reveal font-mono-eyebrow text-white/45 mb-5">
            04 — What we offer
          </p>
          <h2 className="reveal font-display text-[2.4rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[0.96] tracking-tight">
            Five disciplines.
            <br />
            <span className="italic font-light text-[oklch(0.74_0.13_75)]">
              One quiet promise.
            </span>
          </h2>
          <p className="reveal mt-7 text-white/65 max-w-xl leading-relaxed">
            That the intelligence we deliver is measurable, defensible, and
            yours — for as long as you need it.
          </p>
        </div>

        <div className="divide-y divide-white/10 border-t border-white/10">
          {OFFERINGS.map((o, i) => (
            <div
              key={o.no}
              className="reveal group grid grid-cols-12 gap-4 py-8 sm:py-10 transition-colors duration-500 hover:bg-white/[0.025]"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="col-span-2 sm:col-span-1 font-mono-eyebrow text-white/40 pt-2">
                {o.no}
              </div>
              <div className="col-span-10 sm:col-span-4">
                <h3 className="font-display text-2xl sm:text-3xl tracking-tight transition-colors group-hover:text-[oklch(0.74_0.13_75)]">
                  {o.title}
                </h3>
                <p className="mt-1 text-sm text-white/55">{o.short}</p>
              </div>
              <div className="col-span-12 sm:col-span-7 sm:pl-8">
                <p className="text-white/75 leading-relaxed max-w-xl">
                  {o.long}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

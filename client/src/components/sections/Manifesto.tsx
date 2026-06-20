/*
 * Manifesto — Four numbered principles in asymmetric grid.
 * Echoes the "We fund bold ideas / We think long term" structure of Atom.
 */
import { useReveal } from "@/hooks/useReveal";

const PRINCIPLES = [
  {
    no: "1",
    title: "We think in systems.",
    body: "Intelligence is not a feature you bolt on. It is a property of the system. We design the whole loop — data, models, decisions, outcomes — and we own its behaviour.",
  },
  {
    no: "2",
    title: "We measure what matters.",
    body: "Every engagement begins with a metric the board would recognise: claims cycle time, downtime hours, patient throughput. If we cannot move the metric, we will not take the work.",
  },
  {
    no: "3",
    title: "We work where the work is.",
    body: "Boardrooms in Gaborone. Trading floors in London. Hospital wards in Maun. We embed alongside your teams until the system runs without us.",
  },
  {
    no: "4",
    title: "We answer to our outcomes.",
    body: "No glossy decks, no synthetic demos. Working software, in production, accountable to the people whose work it touches.",
  },
];

export default function Manifesto() {
  const ref = useReveal();
  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative py-28 sm:py-36 bg-background"
    >
      <div className="container">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className="reveal font-mono-eyebrow text-foreground/55 mb-5">
            05 — How we work
          </p>
          <h2 className="reveal font-display text-[2.4rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[0.96] tracking-tight">
            Four principles.
            <br />
            <span className="italic font-light">No exceptions.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {PRINCIPLES.map((p, i) => (
            <article
              key={p.no}
              className="reveal flex gap-6 sm:gap-8"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="shrink-0">
                <span className="font-display text-6xl sm:text-7xl leading-none italic font-light text-[oklch(0.74_0.13_75)]">
                  {p.no}
                </span>
              </div>
              <div className="pt-1">
                <h3 className="font-display text-2xl sm:text-3xl leading-tight mb-3 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed max-w-md">
                  {p.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

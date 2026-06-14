/*
 * Team — Two-card editorial layout for Bharath and Prathap.
 * Placeholder portraits, large names, role mono-eyebrow.
 */
import { useReveal } from "@/hooks/useReveal";

const TEAM = [
  {
    name: "Bharath Balasubramanian",
    role: "Technical Director",
    img: "/manus-storage/bharath-portrait_3142137b.jpeg",
    isReal: true,
    bio: "Architects the systems that translate models into measurable business outcomes. Lead engineer for every Lumen deployment.",
  },
  {
    name: "Prathap Ganesharajah",
    role: "Messenger",
    img: "/manus-storage/prathap-portrait_ee725d6d.png",
    isReal: true,
    bio: "Carries Lumen's intelligence to the boardrooms, balance sheets and operating teams who need it most. Translator between technology and outcome.",
  },
];

export default function Team() {
  const ref = useReveal();
  return (
    <section
      id="team"
      ref={ref}
      className="relative py-28 sm:py-36 bg-[oklch(0.94_0.014_82)]"
    >
      <div className="container">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className="reveal font-mono-eyebrow text-foreground/55 mb-5">
            05 — Team
          </p>
          <h2 className="reveal font-display text-[2.4rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[0.96] tracking-tight">
            A small, deliberate
            <br />
            <span className="italic font-light">company of two.</span>
          </h2>
          <p className="reveal mt-7 text-foreground/65 max-w-xl leading-relaxed">
            Lumen is built around two complementary disciplines — the engineer
            who builds the intelligence, and the messenger who places it where
            it earns its keep.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {TEAM.map((member, i) => (
            <article
              key={member.name}
              className="reveal group"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-secondary mb-6">
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(26,20,16,0.15) 100%)",
                  }}
                />
                <span className="absolute top-5 left-5 font-mono-eyebrow text-foreground/55">
                  {`0${i + 1}`}{member.isReal ? "" : " — Placeholder portrait"}
                </span>
              </div>
              <p className="font-mono-eyebrow text-foreground/55 mb-2">
                {member.role}
              </p>
              <h3 className="font-display text-3xl sm:text-4xl leading-tight tracking-tight mb-4">
                {member.name}
              </h3>
              <p className="text-foreground/70 leading-relaxed max-w-md">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/*
 * Home — Lumen single-page composition.
 * Order: Hero → Industries → Offerings → Manifesto → Team → Contact → Footer.
 * Design: warm cream, charcoal, sun-gold accent. Editorial typography.
 */
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Industries from "@/components/sections/Industries";
import Offerings from "@/components/sections/Offerings";
import Manifesto from "@/components/sections/Manifesto";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Industries />
        <Offerings />
        <Manifesto />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { OrbitEngine } from "@/components/OrbitEngine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FEROXA — Weby, hosting, podpora a bezpečnost na jednom místě" },
      {
        name: "description",
        content:
          "Firemní weby a e-shopy na míru: design, hosting s 99,9 % dostupností, bezpečnost, SEO a lidská podpora. Jeden partner místo pěti dodavatelů.",
      },
      { property: "og:title", content: "FEROXA — Weby, hosting, podpora a bezpečnost" },
      {
        property: "og:description",
        content:
          "Web na míru, spolehlivý hosting, bezpečnost a podpora od skutečných lidí. Vše pod jednou střechou.",
      },
    ],
  }),
  component: Index,
});

const SERVICES = [
  {
    title: "Weby a e-shopy",
    text: "Rychlé, přehledné a připravené přinášet poptávky. Bez šablon, bez kompromisů.",
  },
  {
    title: "Design a identita",
    text: "Vizuál, logo i typografie, které dávají vaší firmě důvěryhodnost na první pohled.",
  },
  {
    title: "Hosting a provoz",
    text: "Dostupnost 99,9 %, denní zálohy, monitoring a rychlé načítání po celé Evropě.",
  },
  {
    title: "Bezpečnost",
    text: "SSL, pravidelné aktualizace, ochrana proti útokům a spamu. Bez starostí na vaší straně.",
  },
  {
    title: "SEO a viditelnost",
    text: "Technická optimalizace i obsah, aby vás zákazníci našli dřív než konkurenci.",
  },
  {
    title: "Podpora bez ticketů",
    text: "Napíšete, zavoláte — odpovíme. Úpravy do 24 hodin, žádné čekání ve frontě.",
  },
];

function Index() {
  return (
    <main className="min-h-screen bg-feroxa-bg text-foreground dark">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-6 text-center">
        <p className="font-mono text-xs tracking-[0.35em] text-feroxa-cyan">
          FEROXA // DIGITAL SYSTEMS
        </p>
        <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
          Vaše firma potřebuje víc než jen šablonu.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-white/70">
          Postavíme web, zajistíme hosting, ohlídáme bezpečnost a zvedneme telefon, když bude
          potřeba. Jeden partner pro celý digitální provoz vaší firmy.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#sluzby"
            className="rounded-md bg-feroxa-cyan px-6 py-3 text-sm font-semibold tracking-wide text-feroxa-bg transition-opacity hover:opacity-90"
          >
            Prohlédnout služby
          </a>
          <a
            href="mailto:info@feroxa.cz"
            className="rounded-md border border-white/20 px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-white/10"
          >
            Nezávazná konzultace
          </a>
        </div>
      </div>

      <OrbitEngine />
      <p className="pb-16 text-center font-mono text-[0.7rem] tracking-[0.25em] text-white/40 uppercase">
        [ táhněte pro prozkoumání ]
      </p>

      <section id="sluzby" className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-black tracking-tight text-white">Co pro vás děláme</h2>
          <p className="mt-3 max-w-2xl text-white/60">
            Kompletní servis pro firmy, které chtějí web, co funguje — a nikoho, kdo by je s ním
            nechal samotné.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <article
                key={s.title}
                className="rounded-lg border border-white/10 bg-feroxa-panel/60 p-6 transition-colors hover:border-feroxa-cyan/40"
              >
                <span className="font-mono text-xs tracking-[0.2em] text-feroxa-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center font-mono text-xs tracking-[0.2em] text-white/40">
        FEROXA // info@feroxa.cz
      </footer>
    </main>
  );
}

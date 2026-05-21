import { createFileRoute } from "@tanstack/react-router";
import { Globe, Award, FlaskConical, Target, Building2, Users } from "lucide-react";
import labImg from "@/assets/lab-scientist.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ciplostem — India's Pharmaceutical Forerunner" },
      { name: "description", content: "Ciplostem is brought to you by a team of India's leading scientists in regenerative medicine." },
    ],
  }),
  component: About,
});

const facts = [
  { icon: Globe, title: "Foothold in 40+ countries", body: "Trusted across global markets." },
  { icon: Award, title: "Top 10 Indian pharma", body: "Consistently ranked amongst India's leading pharmaceutical companies." },
  { icon: FlaskConical, title: "500+ scientists", body: "Working across 6 global R&D centers." },
  { icon: Target, title: "Anti-infective leader", body: "Unchallenged dominance for over a decade." },
  { icon: Building2, title: "21 manufacturing sites", body: "Across India and the US." },
  { icon: Users, title: "800+ brands", body: "Several feature in India's top 50 pharma brands." },
];

function About() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh" />
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <span className="text-xs font-semibold tracking-widest uppercase text-coral">About</span>
            <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold leading-tight">
              A single idea, <span className="text-gradient">decades of impact.</span>
            </h1>
            <p className="mt-6 text-lg text-foreground/75 leading-relaxed max-w-xl">
              Back in 1973, a team came together with a single, resilient idea —
              that science could redefine the rules of medicine. From that
              spark, India built one of the world's most respected generic
              and specialty pharmaceutical forerunners. Ciplostem is its
              next chapter.
            </p>
          </div>
          <div className="relative reveal" style={{ animationDelay: "0.15s" }}>
            <div className="absolute -inset-4 bg-gradient-coral rounded-[2.5rem] blur-2xl opacity-30 animate-blob" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-glow">
              <img src={labImg} alt="Pharma scientist" loading="lazy" width={1200} height={800} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-display text-4xl md:text-5xl font-bold">By the numbers.</h2>
        <p className="mt-3 text-foreground/70 max-w-2xl">Quality, safety and scale — the foundations behind every Ciplostem dose.</p>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map((f, i) => (
            <div key={f.title} className="group rounded-3xl bg-white p-7 border border-border/40 shadow-soft hover:shadow-glow transition-all hover:-translate-y-1 reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-aurora shadow-coral">
                <f.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-foreground/70 text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-[2.5rem] p-10 md:p-14 bg-gradient-aurora text-white shadow-glow">
          <h3 className="font-display text-3xl md:text-4xl font-bold">Audited by the world's toughest regulators.</h3>
          <p className="mt-4 text-white/90 max-w-3xl">
            Our facilities are inspected and audited as per cGMP guidelines by USFDA, MHRA UK,
            SAHPRA South Africa, TGA Australia, ANVISA Brazil, WHO Geneva, TPD Health Canada,
            PPB Kenya, NDA Uganda, MOH Sudan, INVIMA Colombia, TFDA Tanzania, BfArM Germany —
            and others across Africa, Asia and CIS regions.
          </p>
        </div>
      </section>
    </div>
  );
}

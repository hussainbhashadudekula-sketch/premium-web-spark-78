import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Microscope, HeartPulse, Sparkles, Activity, Award } from "lucide-react";
import heroImg from "@/assets/hero-main.jpg";
import patientImg from "@/assets/patient-cycling.jpg";
import stemImg from "@/assets/stem-cells.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ciplostem — DCGI-approved Stem Cell Therapy for Knee Osteoarthritis" },
      { name: "description", content: "A first-in-class, standardized, off-the-shelf stem cell therapy for knee osteoarthritis. Backed by science. Approved by DCGI." },
    ],
  }),
  component: Home,
});

const stats = [
  { v: "40%", l: "Indians could suffer from osteoarthritis" },
  { v: "1st", l: "DCGI-approved off-the-shelf stem cell therapy" },
  { v: "30%", l: "Prevalence of knee OA in India" },
  { v: "IV", l: "Grades of progression — early action matters" },
];

const pillars = [
  { icon: Microscope, title: "First-in-class science", body: "Standardized adult mesenchymal stem cells, manufactured at GMP scale.", grad: "bg-gradient-coral" },
  { icon: ShieldCheck, title: "DCGI approved", body: "Backed by India's Drug Controller General — the gold standard of safety.", grad: "bg-gradient-ocean" },
  { icon: HeartPulse, title: "Off-the-shelf", body: "Ready when you are — no harvesting, no waiting, no complex logistics.", grad: "bg-gradient-aurora" },
];

function Home() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh" />
        <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-gradient-coral blur-3xl opacity-40 animate-blob -z-10" />
        <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-gradient-ocean blur-3xl opacity-30 animate-blob -z-10" />

        <div className="mx-auto max-w-7xl px-6 pt-12 pb-24 lg:pt-20 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-4 py-1.5 text-xs font-semibold text-primary border border-primary/20 shadow-soft">
              <Sparkles className="h-3.5 w-3.5" /> First-in-class · DCGI Approved
            </span>
            <h1 className="mt-6 font-display text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Move again.<br />
              <span className="text-gradient">Live again.</span>
            </h1>
            <p className="mt-6 text-lg text-foreground/75 max-w-xl leading-relaxed">
              Ciplostem is a standardized, off-the-shelf stem cell therapy
              approved by the Drug Controller General of India for the
              treatment of knee osteoarthritis.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/knee-assessment" className="group inline-flex items-center gap-2 rounded-full bg-gradient-aurora px-6 py-3.5 text-sm font-semibold text-white shadow-glow hover:shadow-coral transition-shadow">
                Take the Knee OA Test
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white/70 backdrop-blur px-6 py-3.5 text-sm font-semibold hover:bg-white transition-colors">
                Learn the science
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 max-w-md">
              {stats.slice(0, 2).map((s) => (
                <div key={s.l} className="rounded-2xl bg-white/60 backdrop-blur p-4 border border-white/60 shadow-soft">
                  <div className="text-3xl font-display font-bold text-gradient">{s.v}</div>
                  <div className="text-xs text-foreground/60 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative reveal" style={{ animationDelay: "0.2s" }}>
            <div className="absolute -inset-6 bg-gradient-aurora rounded-[3rem] blur-2xl opacity-40 animate-blob" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-glow border border-white/60">
              <img src={heroImg} alt="Stem cell therapy capsules" className="w-full h-auto object-cover" width={1600} height={1100} />
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl px-5 py-4 shadow-soft border border-white/60 animate-float">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-coral" />
                <div>
                  <div className="text-xs text-foreground/60">Approved by</div>
                  <div className="font-semibold text-sm">DCGI · Government of India</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 glass rounded-2xl px-5 py-4 shadow-soft border border-white/60 animate-float" style={{ animationDelay: "1.5s" }}>
              <div className="flex items-center gap-3">
                <Activity className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-xs text-foreground/60">Mechanism</div>
                  <div className="font-semibold text-sm">Cartilage regeneration</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="bg-gradient-aurora py-10">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={s.l} className="text-white reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-4xl font-display font-bold drop-shadow">{s.v}</div>
              <div className="text-xs opacity-90 mt-1 leading-snug">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-coral">Why Ciplostem</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Three things that make us different.</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div key={p.title} className="group relative rounded-3xl bg-white p-8 shadow-soft border border-border/40 hover:shadow-glow transition-all duration-500 hover:-translate-y-1 reveal" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${p.grad} shadow-coral`}>
                <p.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold">{p.title}</h3>
              <p className="mt-3 text-foreground/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KNEE OA SECTION */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60 -z-10" />
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-[2.5rem] overflow-hidden shadow-glow relative">
            <img src={patientImg} alt="Active senior" className="w-full h-auto" loading="lazy" width={1400} height={900} />
            <div className="absolute bottom-6 left-6 right-6 glass-dark text-white rounded-2xl p-5">
              <p className="text-sm">"Nearly <strong>40%</strong> of people in India could be suffering from osteoarthritis — and the knee joint is most commonly affected."</p>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">Knee Osteoarthritis</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold leading-tight">
              A chronic, progressive disorder. <span className="text-gradient">You can stay ahead of it.</span>
            </h2>
            <p className="mt-5 text-foreground/75 leading-relaxed">
              Knee OA gradually breaks down cartilage in the joint. Left
              unchecked, it can progress from Grade I to Grade IV — the most
              severe form of joint damage. Early action protects your
              mobility.
            </p>
            <ul className="mt-6 space-y-3">
              {["Pain that deepens with joint use","Stiffness and loss of motion","Swelling and warmth around the joint","Crunching sounds when moving"].map((x) => (
                <li key={x} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gradient-aurora" />
                  <span className="text-foreground/80">{x}</span>
                </li>
              ))}
            </ul>
            <Link to="/knee-assessment" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-coral px-6 py-3.5 text-sm font-semibold text-white shadow-coral hover:scale-105 transition-transform">
              Check your knee risk — free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SCIENCE BAND */}
      <section className="mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-coral">The Science</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Standardized stem cells. Premium manufacturing.</h2>
          <p className="mt-5 text-foreground/75 leading-relaxed">
            Each dose of Ciplostem is produced under stringent GMP standards
            using adult mesenchymal stem cells. The cells help regenerate
            cartilage, reduce inflammation, and restore the joint's natural
            mechanics — one knee, one step at a time.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { v: "GMP", l: "Manufacturing" },
              { v: "QC×7", l: "Quality checks" },
              { v: "−196°C", l: "Cryo-preserved" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white p-4 border border-border/50 shadow-soft">
                <div className="text-2xl font-display font-bold text-gradient">{s.v}</div>
                <div className="text-xs text-foreground/60 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-ocean rounded-[2.5rem] blur-2xl opacity-30 animate-blob" />
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-glow">
            <img src={stemImg} alt="Stem cells microscopy" loading="lazy" width={1200} height={800} className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-16 bg-gradient-aurora shadow-glow">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/30 blur-3xl animate-blob" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center text-white">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Ready to know your knee?</h2>
              <p className="mt-4 text-white/90 max-w-md">Take our 60-second Knee OA self-assessment. Get an instant, personalized risk score.</p>
            </div>
            <div className="flex md:justify-end gap-3 flex-wrap">
              <Link to="/knee-assessment" className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-3.5 text-sm font-semibold hover:scale-105 transition-transform">
                Start Free Test <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-6 py-3.5 text-sm font-semibold hover:bg-white/10 transition-colors">
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

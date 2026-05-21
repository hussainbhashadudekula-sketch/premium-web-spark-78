import { createFileRoute, Link } from "@tanstack/react-router";
import { FlaskConical, Syringe, ShieldCheck, BookOpen } from "lucide-react";
import docImg from "@/assets/doctor-knee.jpg";

export const Route = createFileRoute("/for-doctors")({
  head: () => ({
    meta: [
      { title: "For Doctors — Ciplostem Clinical Information" },
      { name: "description", content: "Clinical info on Ciplostem stem cell therapy: mechanism of action, dosing, safety profile, and ordering." },
    ],
  }),
  component: ForDoctors,
});

const sections = [
  { icon: FlaskConical, title: "Mechanism of action", body: "Allogeneic adult mesenchymal stem cells modulate the joint microenvironment, supporting chondrocyte function and reducing inflammatory cytokines." },
  { icon: Syringe, title: "Administration", body: "Single intra-articular injection per knee, performed under aseptic conditions. Off-the-shelf — no harvest, no expansion delay." },
  { icon: ShieldCheck, title: "Safety profile", body: "Evaluated in DCGI-approved clinical studies. The most commonly reported reactions are mild transient injection-site symptoms." },
  { icon: BookOpen, title: "Patient selection", body: "Symptomatic knee OA, Kellgren-Lawrence Grade II–III, who have not responded adequately to conservative therapy." },
];

function ForDoctors() {
  return (
    <div className="overflow-hidden">
      <section className="relative py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh" />
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">For Doctors</span>
            <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold leading-tight">
              The first off-the-shelf <span className="text-gradient">stem cell therapy</span> for knee OA.
            </h1>
            <p className="mt-6 text-lg text-foreground/75 max-w-xl">
              Approved by the DCGI. Manufactured under cGMP. Ready for your
              outpatient injection workflow without donor harvest or culture
              expansion delays.
            </p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-ocean text-white px-6 py-3.5 text-sm font-semibold shadow-glow hover:scale-105 transition-transform">
              Request a medical rep
            </Link>
          </div>
          <div className="relative reveal" style={{ animationDelay: "0.15s" }}>
            <div className="absolute -inset-4 bg-gradient-ocean rounded-[2.5rem] blur-2xl opacity-30 animate-blob" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-glow">
              <img src={docImg} alt="Doctor with holographic knee" loading="lazy" width={1400} height={900} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-6">
        {sections.map((s, i) => (
          <div key={s.title} className="group rounded-3xl bg-white p-8 border border-border/40 shadow-soft hover:shadow-glow transition-all hover:-translate-y-1 reveal" style={{ animationDelay: `${i*0.1}s` }}>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-aurora shadow-coral">
              <s.icon className="h-7 w-7 text-white" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold">{s.title}</h3>
            <p className="mt-3 text-foreground/70 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2.5rem] bg-ink text-white p-10 md:p-14 shadow-glow relative overflow-hidden">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-coral blur-3xl opacity-40 animate-blob" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-ocean blur-3xl opacity-40 animate-blob" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-bold">Prescribing & full LBL information</h3>
              <p className="mt-3 text-white/80">Download the manufacturer's leaflet, patient education leaflet, and separate LBL documents.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-3 text-sm font-semibold">Request documents</Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10">Adverse event reporting</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

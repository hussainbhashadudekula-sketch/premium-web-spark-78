import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import patientImg from "@/assets/patient-cycling.jpg";

export const Route = createFileRoute("/for-patients")({
  head: () => ({
    meta: [
      { title: "For Patients — Understanding Knee Osteoarthritis | Ciplostem" },
      { name: "description", content: "Learn about knee OA: symptoms, grades, and how stem cell therapy can help you regain mobility." },
    ],
  }),
  component: ForPatients,
});

const facts = [
  { title: "A painful condition of the joint", body: "Pain often comes from deep within the knee." },
  { title: "Cartilage damage", body: "The firm, rubbery cushion between bones wears down." },
  { title: "Inability to slide smoothly", body: "Bone ends grind, causing pain and stiffness." },
  { title: "The most common form of arthritis", body: "Especially in the knee joint." },
];

const grades = [
  { name: "Grade I", note: "Cartilage healthy", color: "from-[#a5d8ff] to-[#5b8def]" },
  { name: "Grade II", note: "Cartilage damage starts", color: "from-[#ffd6b0] to-[#ffb59a]" },
  { name: "Grade III", note: "Cartilage damage, bony spurs", color: "from-[#ffb59a] to-[#ff8a65]" },
  { name: "Grade IV", note: "Severe damage + joint narrowing", color: "from-[#ff8a65] to-[#c5443b]" },
];

const symptoms = [
  { title: "Joint pain", body: "Pain deep within the joint, worse with use, better with rest." },
  { title: "Stiffness & loss of motion", body: "Limited range; the joint can freeze in a bent position." },
  { title: "Swelling & warmth", body: "Caused by cartilage damage and irritation." },
  { title: "Cracking of the joint", body: "Crunching sounds as cartilage roughens." },
];

function ForPatients() {
  return (
    <div className="overflow-hidden">
      <section className="relative py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh" />
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <span className="text-xs font-semibold tracking-widest uppercase text-coral">For Patients</span>
            <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold leading-tight">
              Knee OA in India is <span className="text-gradient">nearly 30%.</span>
            </h1>
            <p className="mt-6 text-lg text-foreground/75 max-w-xl">
              Unfortunately, knee osteoarthritis is progressive in nature and
              can eventually lead to severe joint damage. The good news?
              Knowing where you stand gives you back control.
            </p>
            <Link to="/knee-assessment" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-aurora text-white px-6 py-3.5 text-sm font-semibold shadow-glow hover:scale-105 transition-transform">
              Take the Knee OA Test
            </Link>
          </div>
          <div className="relative reveal" style={{ animationDelay: "0.15s" }}>
            <div className="absolute -inset-4 bg-gradient-coral rounded-[2.5rem] blur-2xl opacity-30 animate-blob" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-glow">
              <img src={patientImg} alt="Active senior cycling" loading="lazy" width={1400} height={900} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Disease info */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-display text-4xl md:text-5xl font-bold">Here's what you should know about knee OA.</h2>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facts.map((f, i) => (
            <div key={f.title} className="rounded-3xl bg-white p-7 border border-border/40 shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all reveal" style={{ animationDelay: `${i*0.08}s` }}>
              <CheckCircle2 className="h-7 w-7 text-coral" />
              <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-foreground/70">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Grades */}
      <section className="bg-gradient-to-b from-secondary/40 to-transparent py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-coral" />
            <h2 className="font-display text-4xl md:text-5xl font-bold">You just can't afford to ignore it.</h2>
          </div>
          <p className="mt-4 text-foreground/75 max-w-3xl">If you ignore knee OA, it could progress from Grade I to Grade IV — the most severe form of joint damage.</p>

          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {grades.map((g, i) => (
              <div key={g.name} className="group rounded-3xl bg-white p-6 border border-border/40 shadow-soft hover:shadow-glow hover:-translate-y-2 transition-all reveal" style={{ animationDelay: `${i*0.1}s` }}>
                <div className={`h-32 rounded-2xl bg-gradient-to-br ${g.color} flex items-center justify-center text-white font-display text-3xl font-bold shadow-coral`}>
                  {g.name}
                </div>
                <p className="mt-4 text-sm text-foreground/75 leading-snug">{g.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-display text-4xl md:text-5xl font-bold">Signs you could be suffering from OA.</h2>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {symptoms.map((s, i) => (
            <div key={s.title} className="group rounded-3xl bg-white p-8 border border-border/40 shadow-soft hover:shadow-glow transition-all reveal" style={{ animationDelay: `${i*0.1}s` }}>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-coral shadow-coral">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 text-foreground/70">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-[2.5rem] p-10 md:p-14 bg-gradient-aurora text-white shadow-glow text-center">
          <h3 className="font-display text-3xl md:text-4xl font-bold">Know for sure if you have Knee OA.</h3>
          <Link to="/knee-assessment" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-3.5 text-sm font-semibold hover:scale-105 transition-transform">
            Click here for the Knee OA Test
          </Link>
        </div>
      </section>
    </div>
  );
}

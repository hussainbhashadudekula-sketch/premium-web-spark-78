import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, AlertTriangle, Activity, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/knee-assessment")({
  head: () => ({
    meta: [
      { title: "Free Knee OA Self-Assessment | Ciplostem" },
      { name: "description", content: "Take our 60-second self-assessment to know your risk of knee osteoarthritis." },
    ],
  }),
  component: KneeAssessment,
});

const schema = z.object({
  full_name: z.string().trim().min(2).max(100),
  age: z.coerce.number().int().min(10).max(120),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  city: z.string().trim().max(100).optional().or(z.literal("")),
  pain_level: z.coerce.number().int().min(0).max(10),
  stiffness: z.boolean(),
  swelling: z.boolean(),
  cracking: z.boolean(),
  limited_motion: z.boolean(),
  duration_months: z.coerce.number().int().min(0).max(1200),
});

type Form = z.infer<typeof schema>;

function computeRisk(f: Form): { score: number; level: string; tip: string } {
  let s = 0;
  s += Math.min(10, f.pain_level) * 4;
  if (f.stiffness) s += 10;
  if (f.swelling) s += 10;
  if (f.cracking) s += 8;
  if (f.limited_motion) s += 12;
  if (f.age >= 40) s += 5;
  if (f.age >= 55) s += 10;
  if (f.duration_months >= 6) s += 8;
  if (f.duration_months >= 24) s += 12;
  s = Math.min(100, s);
  if (s < 25) return { score: s, level: "Low", tip: "Your symptoms appear mild. Maintain joint health with regular low-impact exercise." };
  if (s < 55) return { score: s, level: "Moderate", tip: "You may have early-stage knee OA. Consult an orthopedic specialist for evaluation." };
  if (s < 80) return { score: s, level: "High", tip: "Your symptoms suggest meaningful knee OA. We strongly recommend a clinical assessment soon." };
  return { score: s, level: "Severe", tip: "Your symptoms indicate severe knee OA. Please consult an orthopedist immediately." };
}

const initial: Form = {
  full_name: "", age: 40, email: "", phone: "", city: "",
  pain_level: 3, stiffness: false, swelling: false, cracking: false, limited_motion: false,
  duration_months: 0,
};

function KneeAssessment() {
  const [form, setForm] = useState<Form>(initial);
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<{ score: number; level: string; tip: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: async () => {
      const parsed = schema.parse(form);
      const risk = computeRisk(parsed);
      const { error } = await supabase.from("assessments").insert({
        full_name: parsed.full_name,
        age: parsed.age,
        email: parsed.email || null,
        phone: parsed.phone || null,
        city: parsed.city || null,
        pain_level: parsed.pain_level,
        stiffness: parsed.stiffness,
        swelling: parsed.swelling,
        cracking: parsed.cracking,
        limited_motion: parsed.limited_motion,
        duration_months: parsed.duration_months,
        risk_score: risk.score,
        risk_level: risk.level,
      });
      if (error) throw error;
      return risk;
    },
    onSuccess: (risk) => {
      setResult(risk);
      toast.success("Assessment saved");
    },
    onError: (err: any) => {
      if (err instanceof z.ZodError) {
        const fe: Record<string, string> = {};
        err.errors.forEach((e) => { if (e.path[0]) fe[e.path[0] as string] = e.message; });
        setErrors(fe);
        toast.error("Please complete the form");
      } else toast.error(err.message);
    },
  });

  if (result) {
    const colorMap: Record<string, string> = {
      Low: "bg-gradient-ocean",
      Moderate: "bg-gradient-aurora",
      High: "bg-gradient-coral",
      Severe: "bg-gradient-coral",
    };
    return (
      <div className="min-h-[80vh] py-20 px-6 bg-gradient-mesh">
        <div className="mx-auto max-w-3xl reveal">
          <div className={`rounded-[2.5rem] p-10 md:p-14 text-white shadow-glow ${colorMap[result.level]}`}>
            <Activity className="h-12 w-12" />
            <p className="mt-6 text-sm uppercase tracking-widest opacity-90">Your Knee OA Risk</p>
            <h1 className="mt-2 font-display text-6xl md:text-7xl font-bold">{result.level}</h1>
            <div className="mt-6 flex items-end gap-4">
              <div className="text-7xl font-display font-bold">{result.score}</div>
              <div className="text-2xl opacity-80 pb-2">/ 100</div>
            </div>
            <p className="mt-6 text-white/90 max-w-xl text-lg leading-relaxed">{result.tip}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => { setResult(null); setForm(initial); setStep(1); }} className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-3 text-sm font-semibold shadow-soft border border-border/50">
              <RotateCcw className="h-4 w-4" /> Take again
            </button>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-aurora text-white px-6 py-3 text-sm font-semibold shadow-glow">Talk to our care team</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-12 px-6 bg-gradient-mesh">
      <div className="mx-auto max-w-3xl">
        <div className="text-center reveal">
          <span className="text-xs font-semibold tracking-widest uppercase text-coral">Self-assessment</span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold">Knee OA Risk Test</h1>
          <p className="mt-3 text-foreground/70">60 seconds. Free. Personalized.</p>
        </div>

        <div className="mt-8 rounded-[2rem] bg-white p-6 md:p-10 shadow-soft border border-border/40">
          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {[1,2,3].map((n) => (
              <div key={n} className={`h-1.5 flex-1 rounded-full ${step >= n ? "bg-gradient-aurora" : "bg-secondary"}`} />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-5 reveal">
              <h2 className="font-display text-2xl font-bold">A bit about you</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Full name" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} err={errors.full_name} />
                <Field label="Age" type="number" value={String(form.age)} onChange={(v) => setForm({ ...form, age: Number(v) })} err={errors.age} />
                <Field label="Email (optional)" type="email" value={form.email ?? ""} onChange={(v) => setForm({ ...form, email: v })} />
                <Field label="Phone (optional)" value={form.phone ?? ""} onChange={(v) => setForm({ ...form, phone: v })} />
                <Field label="City (optional)" value={form.city ?? ""} onChange={(v) => setForm({ ...form, city: v })} />
              </div>
              <button onClick={() => setStep(2)} className="rounded-full bg-gradient-aurora text-white px-6 py-3 text-sm font-semibold shadow-glow">Next →</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 reveal">
              <h2 className="font-display text-2xl font-bold">How is your knee pain?</h2>
              <div>
                <label className="text-sm font-medium">Pain level (0 = none, 10 = worst imaginable)</label>
                <input type="range" min={0} max={10} value={form.pain_level} onChange={(e) => setForm({ ...form, pain_level: Number(e.target.value) })} className="w-full mt-3 accent-coral" />
                <div className="mt-2 text-3xl font-display font-bold text-gradient">{form.pain_level}</div>
              </div>
              <Field label="How many months have you had symptoms?" type="number" value={String(form.duration_months)} onChange={(v) => setForm({ ...form, duration_months: Number(v) })} />
              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold">← Back</button>
                <button onClick={() => setStep(3)} className="rounded-full bg-gradient-aurora text-white px-6 py-3 text-sm font-semibold shadow-glow">Next →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 reveal">
              <h2 className="font-display text-2xl font-bold">Symptoms you notice</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { k: "stiffness", l: "Stiffness or loss of motion" },
                  { k: "swelling", l: "Swelling or warmth around the joint" },
                  { k: "cracking", l: "Cracking / crunching sounds" },
                  { k: "limited_motion", l: "Limited range of motion" },
                ].map((s) => (
                  <label key={s.k} className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${(form as any)[s.k] ? "bg-gradient-coral text-white border-transparent shadow-coral" : "bg-white border-border hover:border-coral"}`}>
                    <input type="checkbox" className="sr-only" checked={(form as any)[s.k]} onChange={(e) => setForm({ ...form, [s.k]: e.target.checked } as Form)} />
                    {(form as any)[s.k] ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5 text-coral" />}
                    <span className="text-sm font-medium">{s.l}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold">← Back</button>
                <button
                  onClick={() => mutation.mutate()}
                  disabled={mutation.isPending}
                  className="rounded-full bg-gradient-aurora text-white px-7 py-3 text-sm font-semibold shadow-glow disabled:opacity-60"
                >
                  {mutation.isPending ? "Calculating..." : "See my risk →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", err }: { label: string; value: string; onChange: (v: string) => void; type?: string; err?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-2xl border border-border bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
      {err && <p className="mt-1 text-xs text-destructive">{err}</p>}
    </div>
  );
}

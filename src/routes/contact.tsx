import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Ciplostem — Reach our patient care & medical teams" },
      { name: "description", content: "Get in touch with the Ciplostem team. Patient helpline, doctor support, and treatment centers across India." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(1500),
  audience: z.enum(["patient", "doctor"]),
});

const centers = [
  { name: "Mumbai — HQ & Treatment Center", addr: "Lower Parel, Mumbai", lat: 19.0028, lng: 72.8262 },
  { name: "Delhi NCR", addr: "Saket District", lat: 28.5245, lng: 77.2066 },
  { name: "Bengaluru", addr: "HSR Layout", lat: 12.9116, lng: 77.6446 },
  { name: "Hyderabad", addr: "Banjara Hills", lat: 17.4126, lng: 78.4376 },
  { name: "Chennai", addr: "Anna Nagar", lat: 13.0850, lng: 80.2101 },
  { name: "Kolkata", addr: "Park Street", lat: 22.5535, lng: 88.3525 },
  { name: "Pune", addr: "Koregaon Park", lat: 18.5362, lng: 73.8939 },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", audience: "patient" as "patient" | "doctor" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: async (data: typeof form) => {
      const parsed = schema.parse(data);
      const { error } = await supabase.from("contact_submissions").insert({
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phone || null,
        subject: parsed.subject || null,
        message: parsed.message,
        audience: parsed.audience,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Thanks — we'll be in touch within 24 hours.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "", audience: "patient" });
      setErrors({});
    },
    onError: (err: any) => {
      if (err instanceof z.ZodError) {
        const fe: Record<string, string> = {};
        err.errors.forEach((e) => { if (e.path[0]) fe[e.path[0] as string] = e.message; });
        setErrors(fe);
      } else {
        toast.error(err.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="overflow-hidden">
      <section className="relative py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl reveal">
            <span className="text-xs font-semibold tracking-widest uppercase text-coral">Contact</span>
            <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold">Talk to <span className="text-gradient">our team.</span></h1>
            <p className="mt-5 text-lg text-foreground/75">Patients, doctors, partners — we're here to help.</p>
          </div>

          <div className="mt-14 grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <form
              onSubmit={(e) => { e.preventDefault(); mutation.mutate(form); }}
              className="lg:col-span-3 rounded-3xl bg-white p-8 md:p-10 shadow-soft border border-border/40 space-y-5"
            >
              <div className="flex gap-2 p-1 rounded-full bg-secondary w-fit">
                {(["patient", "doctor"] as const).map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setForm({ ...form, audience: a })}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${form.audience === a ? "bg-gradient-aurora text-white shadow-coral" : "text-foreground/70"}`}
                  >
                    I'm a {a === "patient" ? "Patient" : "Doctor"}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={errors.name} />
                <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={errors.email} />
                <Field label="Phone (optional)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} error={errors.phone} />
                <Field label="Subject (optional)" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} error={errors.subject} />
              </div>
              <div>
                <label className="text-sm font-medium">Your message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5 w-full rounded-2xl border border-border bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Tell us how we can help..."
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-aurora text-white px-7 py-3.5 text-sm font-semibold shadow-glow hover:scale-[1.02] transition-transform disabled:opacity-60"
              >
                {mutation.isPending ? "Sending..." : <>Send message <Send className="h-4 w-4" /></>}
              </button>
            </form>

            {/* Contact details */}
            <div className="lg:col-span-2 space-y-4">
              <InfoCard icon={Phone} title="Patient helpline" lines={["1800-209-XXXX", "Mon–Sat · 9am–7pm"]} grad="bg-gradient-coral" />
              <InfoCard icon={Mail} title="Email" lines={["care@ciplostem.in", "doctors@ciplostem.in"]} grad="bg-gradient-ocean" />
              <InfoCard icon={MapPin} title="Headquarters" lines={["Lower Parel", "Mumbai 400013, India"]} grad="bg-gradient-aurora" />
              <InfoCard icon={Clock} title="Response" lines={["Within 24 working hours"]} grad="bg-gradient-coral" />
            </div>
          </div>
        </div>
      </section>

      {/* Map + treatment centers */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-coral">Where to find us</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Treatment centers across India.</h2>
          </div>
        </div>
        <div className="mt-10 grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-3xl overflow-hidden shadow-glow border border-border/40 aspect-[4/3] lg:aspect-auto">
            <iframe
              title="Ciplostem treatment centers"
              src="https://www.openstreetmap.org/export/embed.html?bbox=68.0%2C8.0%2C97.5%2C36.0&layer=mapnik&marker=19.0028%2C72.8262"
              className="w-full h-full min-h-[420px] border-0"
              loading="lazy"
            />
          </div>
          <div className="lg:col-span-2 space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {centers.map((c, i) => (
              <div key={c.name} className="group rounded-2xl bg-white p-5 border border-border/40 shadow-soft hover:shadow-coral hover:-translate-y-0.5 transition-all reveal" style={{ animationDelay: `${i*0.05}s` }}>
                <div className="flex items-start gap-3">
                  <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-aurora shadow-coral">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{c.name}</h4>
                    <p className="text-sm text-foreground/60">{c.addr}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${c.lat},${c.lng}`}
                      target="_blank" rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs font-medium text-primary hover:underline"
                    >Open in Google Maps →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", error }: { label: string; value: string; onChange: (v: string) => void; type?: string; error?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-2xl border border-border bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function InfoCard({ icon: Icon, title, lines, grad }: { icon: any; title: string; lines: string[]; grad: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft border border-border/40 hover:shadow-glow transition-all">
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${grad} shadow-coral`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h4 className="mt-4 font-display text-lg font-bold">{title}</h4>
      <div className="mt-1 text-sm text-foreground/70">
        {lines.map((l) => <div key={l}>{l}</div>)}
      </div>
    </div>
  );
}

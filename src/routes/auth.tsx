import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Sparkles, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Sign in — Ciplostem" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Check your email if confirmation is required, then sign in.");
        setMode("signin");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-mesh">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-coral blur-3xl opacity-30 animate-blob" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gradient-ocean blur-3xl opacity-30 animate-blob" />

      <div className="relative w-full max-w-md reveal">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-aurora shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-2xl font-bold">Ciplo<span className="text-gradient">stem</span></span>
        </Link>

        <div className="rounded-3xl bg-white p-8 shadow-glow border border-white/60">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-coral">
            <Lock className="h-3.5 w-3.5" /> Admin access
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold">{mode === "signin" ? "Sign in" : "Create account"}</h1>
          <p className="mt-1 text-sm text-foreground/60">
            {mode === "signin" ? "Access the admin dashboard." : "Sign up — then ask an admin to grant your role."}
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-border bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-border bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <button type="submit" disabled={busy}
              className="w-full rounded-full bg-gradient-aurora text-white px-6 py-3 text-sm font-semibold shadow-glow disabled:opacity-60">
              {busy ? "Please wait..." : (mode === "signin" ? "Sign in" : "Create account")}
            </button>
          </form>

          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 w-full text-center text-sm text-primary hover:underline">
            {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
          </button>
        </div>

        <Link to="/" className="block text-center mt-4 text-sm text-foreground/60 hover:text-foreground">← Back to site</Link>
      </div>
    </div>
  );
}

import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { LogOut, Users, ClipboardList, Activity, Sparkles, Mail, Phone, Calendar, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchAdminData, checkIsAdmin } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Ciplostem" }] }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [sessionReady, setSessionReady] = useState(false);
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"assessments" | "contacts">("assessments");

  const adminCheck = useServerFn(checkIsAdmin);
  const fetchData = useServerFn(fetchAdminData);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) { navigate({ to: "/auth" }); return; }
      setSessionReady(true);
      try {
        const res = await adminCheck({});
        setAllowed(res.isAdmin);
        if (!res.isAdmin) toast.error("Your account is signed in, but you don't have the admin role yet.");
      } catch (e: any) {
        setAllowed(false); toast.error(e.message);
      }
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s) navigate({ to: "/auth" });
    });
    unsub = () => data.subscription.unsubscribe();
    return () => unsub?.();
  }, [navigate, adminCheck]);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-data"],
    queryFn: () => fetchData({}),
    enabled: allowed === true,
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  if (!sessionReady || allowed === null) {
    return <div className="min-h-screen flex items-center justify-center"><div className="text-sm text-foreground/60">Loading…</div></div>;
  }

  if (allowed === false) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center rounded-3xl bg-white p-8 shadow-glow border border-border/40">
          <h1 className="font-display text-2xl font-bold">No admin access</h1>
          <p className="mt-2 text-sm text-foreground/70">You're signed in but don't have the admin role. Ask an existing admin to grant your account access.</p>
          <div className="mt-6 flex justify-center gap-2">
            <button onClick={signOut} className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold">Sign out</button>
            <Link to="/" className="rounded-full bg-gradient-aurora text-white px-4 py-2 text-sm font-semibold shadow-glow">Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const assessments = data?.assessments ?? [];
  const contacts = data?.contacts ?? [];

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Top bar */}
      <header className="sticky top-0 z-30 glass border-b border-white/40">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-aurora shadow-glow">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="font-display text-lg font-bold">Ciplo<span className="text-gradient">stem</span> Admin</span>
          </Link>
          <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-soft border border-border/40">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Stat cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat icon={ClipboardList} label="Assessments" value={assessments.length} grad="bg-gradient-aurora" />
          <Stat icon={Users} label="Contact messages" value={contacts.length} grad="bg-gradient-coral" />
          <Stat icon={Activity} label="High-risk assessments" value={assessments.filter((a: any) => a.risk_level === "High" || a.risk_level === "Severe").length} grad="bg-gradient-ocean" />
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 p-1 rounded-full bg-white/70 backdrop-blur w-fit border border-border/40">
          <TabBtn active={tab === "assessments"} onClick={() => setTab("assessments")}>Assessments</TabBtn>
          <TabBtn active={tab === "contacts"} onClick={() => setTab("contacts")}>Contact messages</TabBtn>
        </div>

        <div className="mt-6 rounded-3xl bg-white shadow-soft border border-border/40 overflow-hidden">
          {isLoading ? (
            <div className="p-10 text-center text-sm text-foreground/60">Loading data…</div>
          ) : tab === "assessments" ? (
            assessments.length === 0 ? <Empty msg="No assessments yet" /> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/60 text-left">
                    <tr>
                      <Th>Name</Th><Th>Age</Th><Th>City</Th><Th>Pain</Th><Th>Risk</Th><Th>Symptoms</Th><Th>Contact</Th><Th>When</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessments.map((a: any) => (
                      <tr key={a.id} className="border-t border-border/40 hover:bg-secondary/30">
                        <Td className="font-medium">{a.full_name}</Td>
                        <Td>{a.age}</Td>
                        <Td>{a.city || "—"}</Td>
                        <Td>{a.pain_level}/10</Td>
                        <Td><RiskBadge level={a.risk_level} score={a.risk_score} /></Td>
                        <Td className="text-xs">
                          {[a.stiffness && "Stiffness", a.swelling && "Swelling", a.cracking && "Cracking", a.limited_motion && "Limited motion"].filter(Boolean).join(" · ") || "—"}
                        </Td>
                        <Td className="text-xs">
                          {a.email && <div className="flex items-center gap-1"><Mail className="h-3 w-3" />{a.email}</div>}
                          {a.phone && <div className="flex items-center gap-1"><Phone className="h-3 w-3" />{a.phone}</div>}
                        </Td>
                        <Td className="text-xs text-foreground/60"><Calendar className="inline h-3 w-3 mr-1" />{new Date(a.created_at).toLocaleString()}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            contacts.length === 0 ? <Empty msg="No contact submissions yet" /> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/60 text-left">
                    <tr><Th>Name</Th><Th>Audience</Th><Th>Email</Th><Th>Phone</Th><Th>Subject</Th><Th>Message</Th><Th>When</Th></tr>
                  </thead>
                  <tbody>
                    {contacts.map((c: any) => (
                      <tr key={c.id} className="border-t border-border/40 hover:bg-secondary/30 align-top">
                        <Td className="font-medium">{c.name}</Td>
                        <Td><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${c.audience === "doctor" ? "bg-gradient-ocean text-white" : "bg-gradient-coral text-white"}`}>{c.audience}</span></Td>
                        <Td className="text-xs">{c.email}</Td>
                        <Td className="text-xs">{c.phone || "—"}</Td>
                        <Td className="text-xs">{c.subject || "—"}</Td>
                        <Td className="text-xs max-w-md whitespace-pre-wrap">{c.message}</Td>
                        <Td className="text-xs text-foreground/60 whitespace-nowrap">{new Date(c.created_at).toLocaleString()}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>

        <p className="mt-6 text-xs text-foreground/50 flex items-center gap-1">
          <MapPin className="h-3 w-3" /> Showing latest 500 records per table.
        </p>
      </main>
    </div>
  );
}

function Stat({ icon: Icon, label, value, grad }: { icon: any; label: string; value: number; grad: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft border border-border/40">
      <div className="flex items-center justify-between">
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${grad} shadow-coral`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="text-4xl font-display font-bold text-gradient">{value}</div>
      </div>
      <p className="mt-4 text-sm text-foreground/70">{label}</p>
    </div>
  );
}

function TabBtn({ active, onClick, children }: any) {
  return (
    <button onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${active ? "bg-gradient-aurora text-white shadow-coral" : "text-foreground/70 hover:text-foreground"}`}>
      {children}
    </button>
  );
}

function Th({ children }: any) { return <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-foreground/60">{children}</th>; }
function Td({ children, className = "" }: any) { return <td className={`px-4 py-3 ${className}`}>{children}</td>; }
function Empty({ msg }: { msg: string }) { return <div className="p-16 text-center text-sm text-foreground/60">{msg}</div>; }

function RiskBadge({ level, score }: { level: string; score: number }) {
  const map: Record<string, string> = {
    Low: "bg-gradient-ocean",
    Moderate: "bg-gradient-aurora",
    High: "bg-gradient-coral",
    Severe: "bg-gradient-coral",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white ${map[level] ?? "bg-secondary"}`}>
      {level} <span className="opacity-80">· {score}</span>
    </span>
  );
}

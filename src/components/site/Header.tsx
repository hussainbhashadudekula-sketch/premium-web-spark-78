import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/for-patients", label: "For Patients" },
  { to: "/knee-assessment", label: "Knee OA Test" },
  { to: "/for-doctors", label: "For Doctors" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl border border-white/40 px-4 md:px-6 py-3 transition-all duration-500",
            scrolled ? "glass shadow-soft" : "bg-white/40 backdrop-blur-md",
          )}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-aurora shadow-glow">
              <Sparkles className="h-5 w-5 text-white drop-shadow" />
              <span className="absolute inset-0 rounded-xl bg-gradient-coral opacity-0 group-hover:opacity-60 blur-xl transition-opacity" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight">
              Ciplo<span className="text-gradient">stem</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    active ? "text-primary" : "text-foreground/75 hover:text-foreground",
                  )}
                >
                  {l.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-aurora" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/knee-assessment"
              className="inline-flex items-center gap-1 rounded-full bg-gradient-aurora px-4 py-2 text-sm font-semibold text-white shadow-glow hover:scale-105 transition-transform"
            >
              Free Knee OA Test
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/60"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-2 rounded-2xl glass shadow-soft border border-white/40 p-3 animate-fade-up">
            <div className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "px-3 py-2.5 rounded-lg text-sm font-medium",
                    pathname === l.to
                      ? "bg-gradient-aurora text-white"
                      : "hover:bg-white/70",
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

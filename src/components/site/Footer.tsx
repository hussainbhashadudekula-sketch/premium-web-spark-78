import { Link } from "@tanstack/react-router";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-coral blur-3xl opacity-30 animate-blob" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-ocean blur-3xl opacity-30 animate-blob" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-aurora shadow-glow">
                <Sparkles className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-2xl font-bold">
                Ciplo<span className="text-gradient">stem</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-white/70 leading-relaxed">
              A first-in-class, standardized, off-the-shelf stem cell therapy
              approved by the Drug Controller General of India (DCGI) for the
              treatment of knee osteoarthritis.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-coral transition-colors">About Ciplostem</Link></li>
              <li><Link to="/for-patients" className="hover:text-coral transition-colors">For Patients</Link></li>
              <li><Link to="/for-doctors" className="hover:text-coral transition-colors">For Doctors</Link></li>
              <li><Link to="/knee-assessment" className="hover:text-coral transition-colors">Knee OA Test</Link></li>
              <li><Link to="/contact" className="hover:text-coral transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">Reach us</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-coral" />Ciplostem HQ, Lower Parel, Mumbai 400013</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-coral" />1800-209-XXXX</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-coral" />care@ciplostem.in</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-6 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Ciplostem. For information only. Use under medical supervision.</p>
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            <Link to="/auth" className="hover:text-white">Admin</Link>
            <span>•</span>
            <span>Made for India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

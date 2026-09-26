import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Certifications", href: "/certifications" },
  { name: "Clients", href: "/clients" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
            SS
          </div>

          <div>
            <div className="text-lg font-bold tracking-tight text-slate-950">
              Surgical Secure
            </div>

            <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
              Medical Products
            </div>
          </div>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="/request-quote"
          className="hidden items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 lg:flex"
        >
          Request a Quote
          <ArrowUpRight size={16} />
        </a>

        {/* Mobile button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl p-2 text-slate-800 lg:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/request-quote"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            >
              Request a Quote
              <ArrowUpRight size={16} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
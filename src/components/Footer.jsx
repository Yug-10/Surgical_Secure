import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
    

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-12">

          {/* Company */}
          <div className="lg:col-span-5">

            <a
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold">
                SS
              </div>

              <div>
                <div className="text-xl font-bold tracking-tight">
                  Surgical Secure
                </div>

                <div className="text-xs font-medium tracking-wider text-slate-400">
                  MEDICAL PRODUCTS
                </div>
              </div>
            </a>

            <p className="mt-6 max-w-md leading-7 text-slate-400">
              Surgical Secure manufactures and supplies medical and
              surgical products for healthcare organizations,
              distributors, and professional customers.
            </p>

            {/* Contact */}
            <div className="mt-8 space-y-4">

              <a
                href="mailto:info@surgicalsecure.com"
                className="flex items-center gap-3 text-sm text-slate-300 transition hover:text-white"
              >
                <Mail size={18} className="text-blue-500" />
                info@surgicalsecure.com
              </a>

              <a
                href="tel:+910000000000"
                className="flex items-center gap-3 text-sm text-slate-300 transition hover:text-white"
              >
                <Phone size={18} className="text-blue-500" />
                +91 00000 00000
              </a>

              <div className="flex items-start gap-3 text-sm text-slate-300">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <span>
                  Your company address
                  <br />
                  Gujarat, India
                </span>
              </div>

            </div>

          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <a
                  href="/about"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/clients"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Our Clients
                </a>
              </li>

              <li>
                <a
                  href="/certifications"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Certifications
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Contact Us
                </a>
              </li>

            </ul>

          </div>

          {/* Products */}
          <div className="lg:col-span-2">

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Products
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <a
                  href="/products/iv-infusion-set"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  IV Infusion Sets
                </a>
              </li>

              <li>
                <a
                  href="/products/latex-bulb"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Latex Bulbs
                </a>
              </li>

              <li>
                <a
                  href="/products/simple-latex"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Latex Products
                </a>
              </li>

              <li>
                <a
                  href="/request-quote"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Request a Quote
                </a>
              </li>

            </ul>

          </div>

          {/* CTA */}
          <div className="lg:col-span-3">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <p className="text-sm font-semibold text-white">
                Looking for medical products?
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Tell us about your requirements and our team will
                get back to you.
              </p>

              <a
                href="/request-quote"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Request a Quote
                <ArrowUpRight size={16} />
              </a>

            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-slate-800" />

        {/* Bottom */}
        <div className="flex flex-col gap-5 text-sm sm:flex-row sm:items-center sm:justify-between">

          <p className="text-slate-500">
            © {new Date().getFullYear()} Surgical Secure. All rights reserved.
          </p>

          <div className="flex gap-6">

            <a
              href="/privacy-policy"
              className="text-slate-500 transition hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="/terms"
              className="text-slate-500 transition hover:text-white"
            >
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
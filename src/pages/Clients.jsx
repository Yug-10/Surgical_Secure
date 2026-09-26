

import {
  Building2,
  Hospital,
  Stethoscope,
  Truck,
  Globe2,
  Handshake,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const clientTypes = [
  {
    icon: Hospital,
    title: "Hospitals",
    description:
      "Supporting hospitals and healthcare institutions with medical product requirements.",
  },
  {
    icon: Stethoscope,
    title: "Clinics & Healthcare Facilities",
    description:
      "Providing products for clinics, healthcare centers, and professional medical environments.",
  },
  {
    icon: Truck,
    title: "Distributors",
    description:
      "Working with medical distributors and supply partners serving healthcare markets.",
  },
  {
    icon: Building2,
    title: "Medical Suppliers",
    description:
      "Supporting businesses involved in the sourcing and distribution of medical products.",
  },
];

const clientLogos = [
  "Healthcare Partner",
  "Medical Distribution",
  "Hospital Network",
  "Healthcare Group",
  "Medical Supplies",
  "Clinical Partners",
];

function Clients() {
  return (
    <main className="overflow-hidden bg-white">

      {/* -------------------------------------------------
          HERO
      -------------------------------------------------- */}
      <section className="relative bg-slate-950 py-24 text-white sm:py-32">

        {/* Decorative circles */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300">
              <Globe2 size={16} className="text-blue-400" />
              Our Healthcare Network
            </div>

            <h1 className="mt-7 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Built around
              <span className="block text-blue-400">
                trusted partnerships.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Surgical Secure works with healthcare organizations,
              distributors, suppliers, and professional customers
              to support their medical product requirements.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <a
                href="/request-quote"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-500"
              >
                Become a Partner
                <ArrowRight size={18} />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </a>

            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------
          INTRO / NUMBERS
      -------------------------------------------------- */}
      <section className="border-b border-slate-200">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">

          <div className="border-b border-slate-200 p-8 md:border-b-0 md:border-r lg:p-12">
            <p className="text-4xl font-bold text-slate-900">
              B2B
            </p>

            <p className="mt-2 text-sm font-medium text-slate-500">
              Healthcare focused
            </p>
          </div>

          <div className="border-b border-slate-200 p-8 md:border-b-0 md:border-r lg:p-12">
            <p className="text-4xl font-bold text-slate-900">
              Global
            </p>

            <p className="mt-2 text-sm font-medium text-slate-500">
              Supply opportunities
            </p>
          </div>

          <div className="p-8 lg:p-12">
            <p className="text-4xl font-bold text-slate-900">
              Long-Term
            </p>

            <p className="mt-2 text-sm font-medium text-slate-500">
              Partnership focused
            </p>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------
          WHO WE SERVE
      -------------------------------------------------- */}
      <section className="py-24 sm:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">

            {/* Left */}
            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Who We Serve
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
                One supply partner.
                <span className="block text-slate-400">
                  Multiple healthcare needs.
                </span>
              </h2>

              <p className="mt-6 leading-8 text-slate-600">
                Our customers operate across different parts of the
                healthcare supply chain. We adapt our approach to
                their product, quantity, packaging, and supply
                requirements.
              </p>

            </div>

            {/* Right */}
            <div className="grid gap-5 sm:grid-cols-2">

              {clientTypes.map((client) => {
                const Icon = client.icon;

                return (
                  <div
                    key={client.title}
                    className="group rounded-3xl border border-slate-200 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                  >

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={24} />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-slate-900">
                      {client.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {client.description}
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-blue-600">
                      <CheckCircle2 size={15} />
                      Healthcare focused
                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------
          CLIENT LOGO WALL
      -------------------------------------------------- */}
      <section className="bg-slate-50 py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Our Partners
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Organizations we work with
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Our growing network includes healthcare organizations,
              medical suppliers, distributors, and professional
              customers.
            </p>

          </div>

          {/* Logo Grid */}
          <div className="mt-14 grid grid-cols-2 overflow-hidden rounded-3xl border border-slate-200 bg-white sm:grid-cols-3">

            {clientLogos.map((logo, index) => (
              <div
                key={logo}
                className={`
                  flex min-h-32 items-center justify-center
                  border-slate-200 p-8
                  ${index % 2 !== 1 ? "border-r" : ""}
                  ${index < 4 ? "border-b" : ""}
                  sm:border-r
                `}
              >

                <div className="text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                    <Building2
                      size={22}
                      className="text-slate-400"
                    />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-slate-500">
                    {logo}
                  </p>

                </div>

              </div>
            ))}

          </div>

          <p className="mt-5 text-center text-xs text-slate-400">
            Replace these placeholders with your actual customer
            or partner logos.
          </p>

        </div>
      </section>

      {/* -------------------------------------------------
          PARTNERSHIP PROCESS
      -------------------------------------------------- */}
      <section className="py-24 sm:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              How We Work
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              From requirement to supply
            </h2>

          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-4">

            {[
              {
                number: "01",
                title: "Requirement",
                text: "Share your product, quantity, specifications, and supply requirements.",
              },
              {
                number: "02",
                title: "Discussion",
                text: "Our team reviews your requirements and discusses the relevant details.",
              },
              {
                number: "03",
                title: "Quotation",
                text: "We provide pricing and relevant commercial information.",
              },
              {
                number: "04",
                title: "Supply",
                text: "After confirmation, we coordinate the next steps for your order.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="relative rounded-3xl border border-slate-200 bg-white p-7"
              >

                <span className="text-sm font-bold text-blue-600">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.text}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>



    </main>
  );
}

export default Clients;


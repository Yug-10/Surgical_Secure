import {
  ShieldCheck,
  HeartPulse,
  Users,
  Award,
} from "lucide-react";

function About() {
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              About Surgical Secure
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Supporting healthcare with dependable medical products
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Surgical Secure manufactures and supplies medical and
              surgical products for healthcare organizations, distributors,
              and professional customers.
            </p>

          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Who We Are
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              A focused medical products company
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Surgical Secure is focused on the manufacture and supply
              of medical and surgical products designed for healthcare
              applications.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Our product portfolio includes IV infusion sets, latex
              bulbs, and other latex-based medical products. We work
              with customers to understand their product requirements,
              specifications, packaging, and supply needs.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Our goal is to provide consistent products and responsive
              service while maintaining appropriate quality and
              manufacturing practices.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-6 sm:grid-cols-2">

            <div className="rounded-3xl bg-slate-50 p-8">
              <HeartPulse className="text-blue-600" size={32} />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Medical Focus
              </h3>

              <p className="mt-3 text-slate-600">
                Products developed for healthcare and medical
                applications.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-8">
              <ShieldCheck className="text-blue-600" size={32} />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Quality Focus
              </h3>

              <p className="mt-3 text-slate-600">
                Focused on consistent product quality and
                manufacturing practices.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-8">
              <Users className="text-blue-600" size={32} />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Customer Focus
              </h3>

              <p className="mt-3 text-slate-600">
                Working with customers to understand their
                requirements and supply needs.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-8">
              <Award className="text-blue-600" size={32} />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Standards
              </h3>

              <p className="mt-3 text-slate-600">
                Committed to maintaining applicable quality and
                regulatory practices.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Mission */}
      <section className="bg-slate-50 py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">

          <p className="text-xl font-semibold uppercase tracking-[0.2em] text-blue-600">
            Our Mission
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl text-slate-900">
            Delivering dependable products for healthcare needs
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We aim to build long-term relationships with healthcare
            organizations, distributors, and customers through
            dependable products, responsive communication, and
            consistent service.
          </p>

        </div>
      </section>

    </main>
  );
}

export default About;
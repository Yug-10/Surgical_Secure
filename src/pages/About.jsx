
import {
  ShieldCheck,
  HeartPulse,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Factory,
  Stethoscope,
} from "lucide-react";

function About() {
  return (
    <main className="bg-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950">

        <div className="absolute inset-0">
          <img
            src="/images/surgery.jpg"
            alt="Medical healthcare environment"
            className="h-full w-full object-cover opacity-25"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/50" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">

          <div className="max-w-3xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              <ShieldCheck size={16} />
              Trusted Medical Products
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              About Surgical Secure
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Supporting healthcare with
              <span className="block text-blue-400">
                dependable medical products
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Surgical Secure manufactures and supplies medical and
              surgical products for healthcare organizations,
              distributors, and professional customers.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <a
                href="/products"
                className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Explore Products
                <ArrowRight size={17} className="ml-2" />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Contact Us
              </a>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="py-24 lg:py-28">

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">

          {/* Image */}

          <div className="relative">

            <div className="overflow-hidden rounded-[2rem] shadow-2xl">

              <img
                src="/images/About1.jpg"
                alt="Medical gloves"
                className="h-[520px] w-full object-cover"
              />

            </div>

            {/* Floating card */}

            <div className="absolute -bottom-8 -right-5 hidden w-64 rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:block">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <HeartPulse size={23} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Healthcare Focus
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Medical & surgical products
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* Content */}

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Who We Are
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              A focused medical products company
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Surgical Secure is focused on the manufacture and supply
              of medical and surgical products designed for healthcare
              applications.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Our product portfolio includes IV infusion sets, latex
              bulbs, gloves, and other medical products. We work with
              customers to understand their product requirements,
              specifications, packaging, and supply needs.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Our goal is to provide consistent products and responsive
              service while maintaining appropriate quality and
              manufacturing practices.
            </p>


            {/* Highlights */}

            <div className="mt-8 space-y-4">

              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={21}
                  className="mt-1 shrink-0 text-blue-600"
                />

                <p className="text-sm leading-6 text-slate-600">
                  Medical-focused product portfolio
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={21}
                  className="mt-1 shrink-0 text-blue-600"
                />

                <p className="text-sm leading-6 text-slate-600">
                  Focus on consistent product quality
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={21}
                  className="mt-1 shrink-0 text-blue-600"
                />

                <p className="text-sm leading-6 text-slate-600">
                  Responsive customer communication
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PRODUCT IMAGE STRIP
      ===================================================== */}

      <section className="bg-slate-50 py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Our Focus
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Products designed around healthcare needs
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              We focus on supplying medical products that support
              healthcare professionals, organizations, and distribution
              partners.
            </p>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {/* Card 1 */}

            <div className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">

              <div className="h-64 overflow-hidden">

                <img
                  src="/images/iv.webp"
                  alt="IV infusion set"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

              <div className="p-7">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Stethoscope size={22} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  IV & Medical Sets
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Medical products designed for dependable healthcare
                  applications and supply requirements.
                </p>

              </div>

            </div>


            {/* Card 2 */}

            <div className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">

              <div className="h-64 overflow-hidden">

                <img
                  src="/images/glove.jpg"
                  alt="Medical gloves"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

              <div className="p-7">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ShieldCheck size={22} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  Protective Products
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Products supporting hygiene, protection, and everyday
                  healthcare environments.
                </p>

              </div>

            </div>


            {/* Card 3 */}

            <div className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">

              <div className="h-64 overflow-hidden">

                <img
                  src="/images/Machine.jpg"
                  alt="Surgical healthcare environment"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

              </div>

              <div className="p-7">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Factory size={22} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  Manufacturing Focus
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  A focused approach to manufacturing, product
                  consistency, and customer supply requirements.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-2xl">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              What Matters To Us
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Built around quality, people, and reliability
            </h2>

          </div>


          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Medical Focus */}

            <div className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <HeartPulse size={24} />
              </div>

              <h3 className="mt-6 text-lg font-bold text-slate-900">
                Medical Focus
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Products developed for healthcare and medical
                applications.
              </p>

            </div>


            {/* Quality */}

            <div className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck size={24} />
              </div>

              <h3 className="mt-6 text-lg font-bold text-slate-900">
                Quality Focus
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Focused on consistent product quality and appropriate
                manufacturing practices.
              </p>

            </div>


            {/* Customers */}

            <div className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Users size={24} />
              </div>

              <h3 className="mt-6 text-lg font-bold text-slate-900">
                Customer Focus
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Working with customers to understand their requirements
                and supply needs.
              </p>

            </div>


            {/* Standards */}

            <div className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Award size={24} />
              </div>

              <h3 className="mt-6 text-lg font-bold text-slate-900">
                Standards
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Committed to maintaining applicable quality and
                regulatory practices.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MISSION
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950 py-24 lg:py-28">

        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-950">
            <Award size={27} />
          </div>

          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            Our Mission
          </p>

          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Delivering dependable products for healthcare needs
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            We aim to build long-term relationships with healthcare
            organizations, distributors, and customers through
            dependable products, responsive communication, and
            consistent service.
          </p>

          <a
            href="/contact"
            className="mt-9 inline-flex items-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Work With Us
            <ArrowRight size={17} className="ml-2" />
          </a>

        </div>

      </section>

    </main>
  );
}

export default About;

// import {
//   ShieldCheck,
//   HeartPulse,
//   Users,
//   Award,
// } from "lucide-react";

// function About() {
//   return (
//     <main className="bg-white">

//       {/* Hero */}
//       <section className="bg-slate-50 py-24">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="max-w-3xl">

//             <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
//               About Surgical Secure
//             </p>

//             <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
//               Supporting healthcare with dependable medical products
//             </h1>

//             <p className="mt-6 text-lg leading-8 text-slate-600">
//               Surgical Secure manufactures and supplies medical and
//               surgical products for healthcare organizations, distributors,
//               and professional customers.
//             </p>

//           </div>
//         </div>
//       </section>

//       {/* Company Introduction */}
//       <section className="py-24">
//         <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">

//           <div>
//             <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
//               Who We Are
//             </p>

//             <h2 className="mt-4 text-3xl font-bold text-slate-900">
//               A focused medical products company
//             </h2>

//             <p className="mt-6 leading-8 text-slate-600">
//               Surgical Secure is focused on the manufacture and supply
//               of medical and surgical products designed for healthcare
//               applications.
//             </p>

//             <p className="mt-4 leading-8 text-slate-600">
//               Our product portfolio includes IV infusion sets, latex
//               bulbs, and other latex-based medical products. We work
//               with customers to understand their product requirements,
//               specifications, packaging, and supply needs.
//             </p>

//             <p className="mt-4 leading-8 text-slate-600">
//               Our goal is to provide consistent products and responsive
//               service while maintaining appropriate quality and
//               manufacturing practices.
//             </p>
//           </div>

//           {/* Stats */}
//           <div className="grid gap-6 sm:grid-cols-2">

//             <div className="rounded-3xl bg-slate-50 p-8">
//               <HeartPulse className="text-blue-600" size={32} />

//               <h3 className="mt-6 text-xl font-bold text-slate-900">
//                 Medical Focus
//               </h3>

//               <p className="mt-3 text-slate-600">
//                 Products developed for healthcare and medical
//                 applications.
//               </p>
//             </div>

//             <div className="rounded-3xl bg-slate-50 p-8">
//               <ShieldCheck className="text-blue-600" size={32} />

//               <h3 className="mt-6 text-xl font-bold text-slate-900">
//                 Quality Focus
//               </h3>

//               <p className="mt-3 text-slate-600">
//                 Focused on consistent product quality and
//                 manufacturing practices.
//               </p>
//             </div>

//             <div className="rounded-3xl bg-slate-50 p-8">
//               <Users className="text-blue-600" size={32} />

//               <h3 className="mt-6 text-xl font-bold text-slate-900">
//                 Customer Focus
//               </h3>

//               <p className="mt-3 text-slate-600">
//                 Working with customers to understand their
//                 requirements and supply needs.
//               </p>
//             </div>

//             <div className="rounded-3xl bg-slate-50 p-8">
//               <Award className="text-blue-600" size={32} />

//               <h3 className="mt-6 text-xl font-bold text-slate-900">
//                 Standards
//               </h3>

//               <p className="mt-3 text-slate-600">
//                 Committed to maintaining applicable quality and
//                 regulatory practices.
//               </p>
//             </div>

//           </div>

//         </div>
//       </section>

//       {/* Mission */}
//       <section className="bg-slate-50 py-24 text-white">
//         <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">

//           <p className="text-xl font-semibold uppercase tracking-[0.2em] text-blue-600">
//             Our Mission
//           </p>

//           <h2 className="mt-4 text-3xl font-bold sm:text-4xl text-slate-900">
//             Delivering dependable products for healthcare needs
//           </h2>

//           <p className="mt-6 text-lg leading-8 text-slate-600">
//             We aim to build long-term relationships with healthcare
//             organizations, distributors, and customers through
//             dependable products, responsive communication, and
//             consistent service.
//           </p>

//         </div>
//       </section>

//     </main>
//   );
// }

// export default About;
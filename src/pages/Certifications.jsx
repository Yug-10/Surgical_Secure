import {
  Award,
  ShieldCheck,
  FileCheck2,
  Download,
  CheckCircle2,
} from "lucide-react";

const certifications = [
  {
    title: "ISO 13485",
    subtitle: "Medical Devices Quality Management System",
    description:
      "Quality management certification applicable to the manufacture and supply of medical devices.",
    number: "ISO 13485:2016",
    icon: ShieldCheck,
    file: "/certifications/iso-13485.pdf",
  },
  {
    title: "ISO 9001",
    subtitle: "Quality Management System",
    description:
      "Certification demonstrating a structured approach to quality management and continuous improvement.",
    number: "ISO 9001:2015",
    icon: Award,
    file: "/certifications/iso-9001.pdf",
  },
  {
    title: "Manufacturing License",
    subtitle: "Medical Device Manufacturing Authorization",
    description:
      "Documentation relating to the company's authorization to manufacture applicable medical products.",
    number: "License Certificate",
    icon: FileCheck2,
    file: "/certifications/manufacturing-license.pdf",
  },
];

function Certifications() {
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Certifications & Compliance
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Quality and regulatory commitment
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Surgical Secure maintains appropriate quality and
              regulatory documentation to support the manufacture
              and supply of medical products.
            </p>
          </div>

        </div>
      </section>

      

      {/* Certifications */}
      <section className="bg-white py-24">  
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Our Documents
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Certifications & licenses
            </h2>

            <p className="mt-4 text-slate-600">
              View our available quality certificates and
              manufacturing documentation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">

            {certifications.map((certificate) => {
              const Icon = certificate.icon;

              return (
                <div
                  key={certificate.title}
                  className="group rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icon size={28} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-7 text-2xl font-bold text-slate-900">
                    {certificate.title}
                  </h3>

                  <p className="mt-2 font-medium text-blue-600">
                    {certificate.subtitle}
                  </p>

                  <p className="mt-4 leading-7 text-slate-600">
                    {certificate.description}
                  </p>

                  {/* Certificate Number */}
                  <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                    <CheckCircle2
                      size={17}
                      className="text-green-600"
                    />

                    <span>{certificate.number}</span>
                  </div>

                  {/* View / Download */}
                  <a
                    href={certificate.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-600"
                  >
                    <Download size={18} />
                    View Certificate
                  </a>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* Quality Commitment */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Our Commitment
              </p>

              <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                Documentation you can verify
              </h2>

              <p className="mt-6 leading-8 text-slate-600">
                We believe customers should have access to relevant
                documentation about our quality systems and
                manufacturing activities.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                For additional documentation or certificate
                verification, customers can contact our team directly.
              </p>

              <a
                href="/contact"
                className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Contact Our Team
              </a>
            </div>

            {/* Feature Cards */}
            
            <div className="grid gap-5 sm:grid-cols-2">

              <div className="rounded-3xl border border-slate-200 p-7">
                <ShieldCheck
                  size={28}
                  className="text-blue-600"
                />

                <h3 className="mt-5 font-bold text-slate-900">
                  Quality Systems
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Structured processes supporting consistent
                  manufacturing and quality management.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 p-7">
                <FileCheck2
                  size={28}
                  className="text-blue-600"
                />

                <h3 className="mt-5 font-bold text-slate-900">
                  Documentation
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Relevant certificates and regulatory documents
                  available for customer review.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

  
   </main>
  );
}

export default Certifications;
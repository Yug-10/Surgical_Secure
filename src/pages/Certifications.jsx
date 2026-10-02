import { useEffect, useState } from "react";
import {
  ShieldCheck,
  ExternalLink,
  CalendarDays,
  FileText,
} from "lucide-react";

function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | FETCH PUBLISHED CERTIFICATIONS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/certifications"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch certifications"
          );
        }

        setCertifications(data.certifications || []);
      } catch (err) {
        console.error(
          "Public certifications error:",
          err
        );

        setError(
          err.message ||
            "Failed to load certifications."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  return (
    <main className="bg-slate-50">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-white py-20 sm:py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Certifications
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Quality & Compliance
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Our certifications reflect our commitment to
              quality, compliance, and dependable medical
              manufacturing standards.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          CERTIFICATIONS
      ===================================================== */}

      <section className="py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* LOADING */}

          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">

              <div className="text-center">

                <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

                <p className="mt-4 text-sm text-slate-500">
                  Loading certifications...
                </p>

              </div>

            </div>
          )}


          {/* ERROR */}

          {!loading && error && (

            <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center">

              <p className="font-semibold text-red-700">
                Unable to load certifications
              </p>

              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>

            </div>

          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            certifications.length === 0 && (

              <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                <ShieldCheck
                  size={40}
                  className="mx-auto text-slate-400"
                />

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  No certifications available
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Published certifications will appear here.
                </p>

              </div>

            )}


          {/* =================================================
              CERTIFICATION GRID
          ================================================= */}

          {!loading &&
            !error &&
            certifications.length > 0 && (

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {certifications.map((certification) => (

                  <article
                    key={certification.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >

                    {/* =================================================
                        CERTIFICATION LOGO / EMBLEM
                    ================================================= */}

                    <div className="flex h-28 items-center justify-center border-b border-slate-100 bg-slate-50">

                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-blue-600 bg-white shadow-sm">

                        {/* Inner Ring */}

                        <div className="absolute inset-1 rounded-full border border-blue-200" />

                        {/* Emblem */}

                        <div className="relative text-center">

                          <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-blue-600">
                            Certified
                          </div>

                          <div className="mt-1 text-lg font-black leading-none text-slate-800">
                            {certification.name
                              ?.replace(/ISO/gi, "")
                              .trim()
                              .split(" ")[0] || "ISO"}
                          </div>

                          <div className="mt-1 text-[7px] font-semibold uppercase tracking-wider text-slate-400">
                            Quality
                          </div>

                        </div>

                      </div>

                    </div>


                    {/* =================================================
                        CARD CONTENT
                    ================================================= */}

                    <div className="p-5">

                      {/* NAME + STATUS */}

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <h2 className="truncate text-base font-bold text-slate-900">
                            {certification.name}
                          </h2>

                          {certification.certificate_number && (
                            <p className="mt-1 text-xs text-slate-400">
                              No.{" "}
                              {certification.certificate_number}
                            </p>
                          )}

                        </div>


                        {/* STATUS */}

                        <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-green-600">
                          Certified
                        </span>

                      </div>


                      {/* DESCRIPTION */}

                      {certification.description && (

                        <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">
                          {certification.description}
                        </p>

                      )}


                      {/* =================================================
                          VALIDITY
                      ================================================= */}

                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">

                        {/* ISSUE DATE */}

                        <div className="flex items-center gap-2">

                          <CalendarDays
                            size={14}
                            className="text-blue-600"
                          />

                          <div>

                            <p className="text-[10px] text-slate-400">
                              Issued
                            </p>

                            <p className="text-[11px] font-semibold text-slate-700">
                              {certification.issue_date
                                ? String(
                                    certification.issue_date
                                  ).slice(0, 10)
                                : "—"}
                            </p>

                          </div>

                        </div>


                        {/* EXPIRY */}

                        <div className="text-right">

                          <p className="text-[10px] text-slate-400">
                            Valid Until
                          </p>

                          <p className="text-[11px] font-semibold text-slate-700">
                            {certification.expiry_date
                              ? String(
                                  certification.expiry_date
                                ).slice(0, 10)
                              : "Valid"}
                          </p>

                        </div>

                      </div>


                      {/* =================================================
                          CERTIFICATE DOCUMENT
                      ================================================= */}

                      {certification.document_url && (

                        <a
                          href={
                            certification.document_url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                        >

                          <FileText size={14} />

                          View Certificate

                          <ExternalLink size={13} />

                        </a>

                      )}

                    </div>

                  </article>

                ))}

              </div>

            )}

        </div>

      </section>

    </main>
  );
}

export default Certifications;

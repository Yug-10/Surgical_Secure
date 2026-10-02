import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Globe,
} from "lucide-react";

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/clients"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch clients"
          );
        }

        // Only published clients are shown
        const publishedClients = (data.clients || []).filter(
          (client) => client.status === "published"
        );

        setClients(publishedClients);

      } catch (err) {
        console.error("Clients page error:", err);
        setError("Unable to load clients.");

      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <main className="bg-slate-50">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32">

        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              Our Clients
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Trusted by healthcare organizations
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              We work with healthcare organizations and medical
              industry partners that value dependable quality,
              consistency, and professional service.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          CLIENTS
      ===================================================== */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* LOADING */}

          {loading && (

            <div className="flex min-h-[300px] items-center justify-center">

              <div className="text-center">

                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

                <p className="mt-4 text-sm text-slate-500">
                  Loading clients...
                </p>

              </div>

            </div>

          )}


          {/* ERROR */}

          {!loading && error && (

            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

              <p className="font-semibold text-red-700">
                {error}
              </p>

              <p className="mt-2 text-sm text-red-600">
                Please try again later.
              </p>

            </div>

          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            clients.length === 0 && (

              <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center">

                <Building2
                  size={48}
                  className="mx-auto text-slate-300"
                />

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  Our client network is growing
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-slate-500">
                  Client information will appear here as it is
                  added and published through our administration
                  system.
                </p>

              </div>
            )}


          {/* CLIENT GRID */}

          {!loading &&
            !error &&
            clients.length > 0 && (

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {clients.map((client) => (

                  <article
                    key={client.id}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >

                    {/* LOGO */}

                    <div className="flex h-52 items-center justify-center bg-slate-50 p-10">

                      {client.logo_url ? (

                        <img
                          src={client.logo_url}
                          alt={`${client.name} logo`}
                          className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";
                          }}
                        />

                      ) : (

                        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50 text-2xl font-bold text-blue-600">
                          {client.name
                            ?.slice(0, 2)
                            .toUpperCase()}
                        </div>

                      )}

                    </div>


                    {/* CONTENT */}

                    <div className="p-7">

                      <div className="flex items-start justify-between gap-4">

                        <h2 className="text-xl font-bold text-slate-900">
                          {client.name}
                        </h2>

                        {client.website && (

                          <a
                            href={client.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${client.name} website`}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-blue-600 hover:text-white"
                          >
                            <ArrowUpRight size={18} />
                          </a>

                        )}

                      </div>


                      {client.description && (

                        <p className="mt-4 text-sm leading-7 text-slate-600">
                          {client.description}
                        </p>

                      )}


                      {client.website && (

                        <div className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-400">

                          <Globe size={14} />

                          <span className="truncate">
                            {client.website}
                          </span>

                        </div>

                      )}

                    </div>

                  </article>

                ))}

              </div>

            )}

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="border-t border-slate-200 bg-white py-20">

        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Partner With Us
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Looking for a dependable medical manufacturing partner?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Contact our team to discuss your requirements,
            products, and potential collaboration.
          </p>

          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Contact Us
            <ArrowUpRight size={17} />
          </a>

        </div>

      </section>

    </main>
  );
}

export default Clients;

import { useEffect, useState } from "react";
import {
  Package,
  Users,
  Award,
  ClipboardList,
  ArrowRight,
  ExternalLink,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [productsResponse, inquiriesResponse] =
          await Promise.all([
            fetch("http://localhost:5000/api/products"),
            fetch("http://localhost:5000/api/inquiries"),
          ]);

        const productsData = await productsResponse.json();
        const inquiriesData = await inquiriesResponse.json();

        setProducts(productsData.products || []);

        setInquiries(
          inquiriesData.inquiries ||
          inquiriesData.data ||
          []
        );
      } catch (error) {
        console.error(
          "Dashboard loading error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const stats = [
    {
      title: "Products",
      value: products.length,
      description: "Published products",
      icon: Package,
      link: "/admin/products",
    },
    {
      title: "Inquiries",
      value: inquiries.length,
      description: "Customer inquiries",
      icon: ClipboardList,
      link: "/admin/inquiries",
    },
    {
      title: "Clients",
      value: "—",
      description: "Manage your clients",
      icon: Users,
      link: "/admin/clients",
    },
    {
      title: "Certifications",
      value: "—",
      description: "Manage certifications",
      icon: Award,
      link: "/admin/certifications",
    },
  ];

  return (
    <div className="min-h-full">

      {/* Header */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Overview
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Admin Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-slate-600">
                Manage Surgical Secure products, clients,
                certifications and customer inquiries from
                one place.
              </p>

            </div>


            <div className="flex gap-3">

              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <ExternalLink size={16} />
                View Website
              </a>

              <Link
                to="/admin/products"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={17} />
                Add Product
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* Main */}

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* Stats */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat) => {

            const Icon = stat.icon;

            return (
              <Link
                key={stat.title}
                to={stat.link}
                className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={21} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                  />

                </div>

                <p className="mt-6 text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900">
                  {loading ? "..." : stat.value}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {stat.description}
                </p>

              </Link>
            );
          })}

        </div>


        {/* Bottom section */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Recent inquiries */}

          <section className="lg:col-span-2 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>

                <h2 className="font-bold text-slate-900">
                  Recent Inquiries
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Latest customer requests
                </p>

              </div>

              <Link
                to="/admin/inquiries"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all
              </Link>

            </div>


            <div className="divide-y divide-slate-100">

              {loading && (
                <div className="px-6 py-10 text-center text-sm text-slate-500">
                  Loading inquiries...
                </div>
              )}


              {!loading && inquiries.length === 0 && (
                <div className="px-6 py-10 text-center">

                  <ClipboardList
                    size={30}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 text-sm font-medium text-slate-700">
                    No inquiries yet
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Customer quote requests will appear here.
                  </p>

                </div>
              )}


              {!loading &&
                inquiries
                  .slice(0, 5)
                  .map((inquiry) => (

                    <div
                      key={inquiry.id}
                      className="flex items-center justify-between gap-4 px-6 py-4"
                    >

                      <div className="min-w-0">

                        <p className="truncate text-sm font-semibold text-slate-900">
                          {inquiry.name ||
                            inquiry.company ||
                            "Customer"}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {inquiry.email || "No email"}
                        </p>

                      </div>


                      <div className="shrink-0 text-right">

                        <p className="text-xs text-slate-400">
                          {inquiry.created_at
                            ? new Date(
                                inquiry.created_at
                              ).toLocaleDateString()
                            : ""}
                        </p>

                      </div>

                    </div>

                  ))}

            </div>

          </section>


          {/* Quick actions */}

          <section className="rounded-2xl bg-slate-900 p-6 text-white">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
              Quick Actions
            </p>

            <h2 className="mt-3 text-xl font-bold">
              Manage your website
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Quickly access the areas you use most.
            </p>


            <div className="mt-6 space-y-3">

              <Link
                to="/admin/products"
                className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/15"
              >
                Manage Products
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/admin/Orders"
                className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/15"
              >
                View Inquiries
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/admin/clients"
                className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/15"
              >
                Manage Clients
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/admin/certifications"
                className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/15"
              >
                Manage Certifications
                <ArrowRight size={16} />
              </Link>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;


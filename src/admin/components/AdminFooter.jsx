

import { Link } from "react-router-dom";
import {
  ShieldCheck,
  LayoutDashboard,
  Package,
  Users,
  Award,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

function AdminFooter() {
  return (
    <footer className="border-t border-blue-900 bg-[#06162d] text-white">

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* =================================================
            TOP
        ================================================= */}

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {/* BRAND */}

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                <ShieldCheck size={21} />
              </div>

              <div>

                <p className="font-bold text-white">
                  Surgical Secure
                </p>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300">
                  Administration
                </p>

              </div>

            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-blue-200/70">
              Centralized administration for products,
              clients, certifications and customer quote
              requests.
            </p>

          </div>


          {/* QUICK LINKS */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Management
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">

              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 text-sm text-blue-200/70 transition hover:text-white"
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>

              <Link
                to="/admin/products"
                className="flex items-center gap-2 text-sm text-blue-200/70 transition hover:text-white"
              >
                <Package size={15} />
                Products
              </Link>

              <Link
                to="/admin/clients"
                className="flex items-center gap-2 text-sm text-blue-200/70 transition hover:text-white"
              >
                <Users size={15} />
                Clients
              </Link>

              <Link
                to="/admin/certifications"
                className="flex items-center gap-2 text-sm text-blue-200/70 transition hover:text-white"
              >
                <Award size={15} />
                Certifications
              </Link>

              <Link
                to="/admin/orders"
                className="flex items-center gap-2 text-sm text-blue-200/70 transition hover:text-white"
              >
                <MessageSquare size={15} />
                Quote Requests
              </Link>

            </div>

          </div>


          {/* PUBLIC WEBSITE */}

          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Website
            </h3>

            <p className="mt-4 text-sm leading-6 text-blue-200/70">
              Visit the public Surgical Secure website to
              review the changes made from the administration
              panel.
            </p>

            <Link
              to="/"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-blue-800 bg-blue-950/50 px-4 py-2.5 text-xs font-semibold text-blue-100 transition hover:border-blue-500 hover:bg-blue-900/50 hover:text-white"
            >
              Visit Website
              <ExternalLink size={14} />
            </Link>

          </div>

        </div>


        {/* =================================================
            DIVIDER
        ================================================= */}

        <div className="my-8 border-t border-blue-900/70" />


        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">

          <p className="text-blue-300/60">
            © {new Date().getFullYear()} Surgical Secure.
            Administration Panel.
          </p>

          <p className="text-blue-300/50">
            Authorized personnel only.
          </p>

        </div>

      </div>    

    </footer>
  );
}

export default AdminFooter;

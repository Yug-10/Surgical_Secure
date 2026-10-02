
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Award,
  MessageSquare,
  LogOut,
  ShieldCheck,
} from "lucide-react";

function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Clients",
      path: "/admin/clients",
      icon: Users,
    },
    {
      name: "Certifications",
      path: "/admin/certifications",
      icon: Award,
    },
    {
      name: "Quote Requests",
      path: "/admin/orders",
      icon: MessageSquare,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    navigate("/admin/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-blue-900/60 bg-[#071a35] text-white shadow-lg">

      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="flex min-h-[72px] items-center justify-between gap-6">

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/admin/dashboard"
            className="flex shrink-0 items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-950/40">
              <ShieldCheck size={22} />
            </div>

            <div className="hidden sm:block">

              <p className="text-sm font-bold tracking-wide text-white">
                Surgical Secure
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-blue-300">
                Admin Panel
              </p>

            </div>

          </Link>


          {/* =================================================
              NAVIGATION
          ================================================= */}

          <nav className="hidden items-center gap-1 lg:flex">

            {menuItems.map((item) => {

              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-950/30"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }`}
                >

                  <Icon size={16} />

                  {item.name}

                </Link>
              );
            })}

          </nav>


          {/* =================================================
              LOGOUT
          ================================================= */}

          <button
            type="button"
            onClick={handleLogout}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-blue-800 bg-blue-950/50 px-3.5 py-2.5 text-sm font-medium text-blue-100 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
          >

            <LogOut size={16} />

            <span className="hidden sm:inline">
              Logout
            </span>

          </button>

        </div>


        {/* =================================================
            MOBILE NAVIGATION
        ================================================= */}

        <div className="flex gap-1 overflow-x-auto border-t border-blue-900/60 py-2 lg:hidden">

          {menuItems.map((item) => {

            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-blue-200 hover:bg-white/10 hover:text-white"
                }`}
              >

                <Icon size={14} />

                {item.name}

              </Link>
            );
          })}

        </div>

      </div>

    </header>
  );
}

export default AdminNavbar;
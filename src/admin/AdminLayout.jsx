import AdminNavbar from "./components/AdminNavbar";
import AdminFooter from "./components/AdminFooter";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">

      <AdminNavbar />

      <main className="flex-1">
        {children}
      </main>

      <AdminFooter />

    </div>
  );
}

export default AdminLayout;

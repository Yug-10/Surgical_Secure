import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Layout
import PublicLayout from "./components/PublicLayout";
import ProtectedRoute from "./admin/ProtectedRoute";

// Admin Layout
import AdminLayout from "./admin/AdminLayout";

// Admin Pages
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminClients from "./admin/AdminClients";
import AdminCertifications from "./admin/AdminCertification";
import AdminOrders from "./admin/AdminOrders";

// Public Pages
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Certifications from "./pages/Certifications";
import Clients from "./pages/Clients";
import Contact from "./pages/Contact";
import RequestQuote from "./pages/RequestQuote";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =====================================================
            PUBLIC WEBSITE
        ===================================================== */}

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        <Route
          path="/products"
          element={
            <PublicLayout>
              <Products />
            </PublicLayout>
          }
        />

        <Route
          path="/products/:slug"
          element={
            <PublicLayout>
              <ProductDetails />
            </PublicLayout>
          }
        />

        <Route
          path="/certifications"
          element={
            <PublicLayout>
              <Certifications />
            </PublicLayout>
          }
        />

        <Route
          path="/clients"
          element={
            <PublicLayout>
              <Clients />
            </PublicLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        <Route
          path="/request-quote"
          element={
            <PublicLayout>
              <RequestQuote />
            </PublicLayout>
          }
        />


        {/* =====================================================
            ADMIN LOGIN
            No Admin Navbar / Footer
        ===================================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* =====================================================
            ADMIN PANEL
        ===================================================== */}
        <Route element={<ProtectedRoute />}>
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminLayout>
              <AdminProducts />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/clients"
          element={
            <AdminLayout>
              <AdminClients />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/certifications"
          element={
            <AdminLayout>
              <AdminCertifications />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminLayout>
              <AdminOrders />
            </AdminLayout>
          }
        />
</Route>
      </Routes>
      

    </BrowserRouter>
  );
}

export default App;

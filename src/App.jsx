import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import ProductCard from "./components/ProductCard";

import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Certifications from "./pages/Certifications";
import Clients from "./pages/Clients";
import Contact from "./pages/Contact";
import RequestQuote from "./pages/RequestQuote";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/products" element={<Products />} />

        <Route path="/certifications" element={<Certifications />} />

        <Route path="/clients" element={<Clients />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/request-quote" element={<RequestQuote />} />

        <Route path="/products/:slug" element={<ProductDetails />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  
  );
}

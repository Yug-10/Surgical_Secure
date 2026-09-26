import { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Products() {
  const [filter, setFilter] = useState("All");

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((product) => product.category === filter);

  return (
    <main className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Products
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Medical & Surgical Products
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Explore our range of medical and surgical products
            manufactured for healthcare applications.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-3">
          {["All", "IV Sets", "Latex Products"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                filter === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </main>
  );
}

export default Products;
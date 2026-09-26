import { Link, useParams } from "react-router-dom";
import products from "../data/products";

function ProductDetails() {
  const { slug } = useParams();

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Product Not Found
          </h1>

          <p className="mt-4 text-slate-600">
            The product you are looking for does not exist.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold text-white"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <Link
            to="/products"
            className="text-sm font-semibold text-blue-600"
          >
            ← Back to Products
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Image */}
            <div className="overflow-hidden rounded-3xl bg-slate-100">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Information */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                {product.category}
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {product.name}
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                {product.description}
              </p>

              <Link
                to="/request-quote"
                className="mt-8 inline-flex rounded-full bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Request a Quote
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <h2 className="text-3xl font-bold text-slate-900">
            Specifications
          </h2>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
            {product.specifications.map((specification) => (
              <div
                key={specification.label}
                className="grid gap-2 border-b border-slate-200 p-5 last:border-0 sm:grid-cols-2"
              >
                <div className="font-semibold text-slate-900">
                  {specification.label}
                </div>

                <div className="text-slate-600">
                  {specification.value}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Applications */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <h2 className="text-3xl font-bold text-slate-900">
            Applications
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.applications.map((application) => (
              <div
                key={application}
                className="rounded-2xl border border-slate-200 bg-white p-5 font-medium text-slate-700"
              >
                {application}
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
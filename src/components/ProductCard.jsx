import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No image available
          </div>
        )}

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

        {/* Arrow */}
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 opacity-0 shadow-lg transition group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </div>

      </div>

      {/* Content */}
      <div className="p-6">

        <div className="mb-3 text-xs font-bold tracking-[0.2em] text-blue-600">
          {product.number}
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          {product.name}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
          {product.description}
        </p>

        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-900">
          View Product
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>

      </div>
    </Link>
  );
}
import { ArrowUpRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import getImageUrl from "../utils/imageUrl";

function ProductCard({ product }) {
  const imageUrl = getImageUrl(product?.image_url || product?.image);
  const slug = product?.slug;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={slug ? `/products/${slug}` : "/products"} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product?.name || "Medical product"}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(event) => {
                console.error("Product image failed:", imageUrl);
                event.currentTarget.style.display = "none";
                event.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}

          <div className={`${imageUrl ? "hidden" : ""} absolute inset-0 flex flex-col items-center justify-center text-slate-400`}>
            <Package size={42} strokeWidth={1.5} />
            <span className="mt-2 text-xs">No image available</span>
          </div>
        </div>

        <div className="p-6">
          {product?.category && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              {product.category}
            </p>
          )}

          <div className="mt-2 flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-900">
              {product?.name || "Product"}
            </h2>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-hover:bg-blue-600 group-hover:text-white">
              <ArrowUpRight size={17} />
            </span>
          </div>

          {product?.product_code && (
            <p className="mt-2 text-xs font-medium text-slate-400">
              {product.product_code}
            </p>
          )}

          {product?.short_description && (
            <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
              {product.short_description}
            </p>
          )}

          <span className="mt-5 inline-flex text-sm font-semibold text-blue-600">
            View product →
          </span>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;

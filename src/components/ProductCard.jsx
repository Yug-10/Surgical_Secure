import { Link } from "react-router-dom";

function ProductCard({ product }) {
  if (!product) return null;

  const imageUrl = product.image_url
    ? product.image_url.startsWith("http")
      ? product.image_url
      : product.image_url.startsWith("/")
        ? product.image_url
        : `/${product.image_url}`
    : null;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => {
              console.error(
                "Product image failed:",
                imageUrl
              );

              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No image available
          </div>
        )}

      </div>

      {/* Content */}
      <div className="p-6">

        <div className="mb-3 flex items-center justify-between gap-3">

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            {product.category}
          </span>

          {product.product_code && (
            <span className="text-xs text-slate-400">
              {product.product_code}
            </span>
          )}

        </div>

        <h2 className="text-xl font-bold text-slate-900">
          {product.name}
        </h2>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {product.short_description}
        </p>

        <div className="mt-5 text-sm font-semibold text-blue-600">
          View Product →
        </div>

      </div>
    </Link>
  );
}

export default ProductCard;
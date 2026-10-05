import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getImageUrl from "../utils/imageUrl";

function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`http://localhost:5000/api/products/${encodeURIComponent(slug)}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Product not found");
        setProduct(data.product);
      } catch (err) {
        console.error("Product details error:", err);
        setError(err.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  if (loading) return <main className="min-h-screen bg-slate-50 px-6 py-24"><div className="mx-auto max-w-7xl text-center text-slate-500">Loading product...</div></main>;

  if (error || !product) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-slate-900">Product Not Found</h1>
          <p className="mt-4 text-slate-600">{error || "The requested product could not be found."}</p>
          <Link to="/products" className="mt-8 inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Back to Products</Link>
        </div>
      </main>
    );
  }

  const imageUrl = getImageUrl(product.image_url);

  return (
    <main className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8"><Link to="/products" className="text-sm font-medium text-blue-600 hover:text-blue-700">← Back to Products</Link></div>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="aspect-square bg-slate-100">
              {imageUrl ? (
                <img src={imageUrl} alt={product.name} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">No image available</div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{product.category}</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{product.name}</h1>
            {product.product_code && <p className="mt-4 text-sm font-medium text-slate-500">Product Code: <span className="text-slate-700">{product.product_code}</span></p>}
            {product.short_description && <p className="mt-6 text-lg leading-8 text-slate-600">{product.short_description}</p>}
            <div className="mt-10"><h2 className="text-xl font-semibold text-slate-900">Product Description</h2><p className="mt-4 leading-7 text-slate-600">{product.description || "—"}</p></div>
            {product.specifications && <div className="mt-8"><h2 className="text-xl font-semibold text-slate-900">Specifications</h2><p className="mt-4 leading-7 text-slate-600">{product.specifications}</p></div>}
            {product.packaging && <div className="mt-8"><h2 className="text-xl font-semibold text-slate-900">Packaging</h2><p className="mt-4 leading-7 text-slate-600">{product.packaging}</p></div>}
            <div className="mt-10"><Link to={`/request-quote?product=${encodeURIComponent(product.name)}`} className="inline-flex rounded-full bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-sm hover:bg-blue-700">Request a Quote</Link></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;

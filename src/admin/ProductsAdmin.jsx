import { useEffect, useMemo, useState } from "react";

function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/admin/products"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load products");
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(products.map((product) => product.category)),
    ];
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      product.product_code
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Delete "${product.name}"?`
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/admin/products/${product.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete product"
        );
      }

      await fetchProducts();

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSaved = async () => {
    handleFormClose();
    await fetchProducts();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900">
        <div className="flex items-center justify-between px-6 py-5 lg:px-10">

          <div>
            <p className="text-sm text-blue-400">
              Administration
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Products
            </h1>
          </div>

          <button
            onClick={handleAdd}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-700"
          >
            + Add Product
          </button>

        </div>
      </header>

      <main className="p-6 lg:p-10">

        {/* Search */}
        <div className="mb-8 grid gap-4 md:grid-cols-[1fr_220px]">

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search products or product code..."
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
          >
            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

        </div>

        {/* Products */}
        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">

            <p className="text-lg font-semibold">
              No products found
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Add a product or change your search.
            </p>

          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead className="border-b border-white/10 bg-white/5">
                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Code
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">

                  {filteredProducts.map((product) => (

                    <tr
                      key={product.id}
                      className="transition hover:bg-white/[0.03]"
                    >

                      {/* Product */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-4">

                          <div className="h-14 w-14 overflow-hidden rounded-xl bg-slate-800">

                            {product.image_url ? (
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-xs text-slate-600">
                                No image
                              </div>
                            )}

                          </div>

                          <div>
                            <p className="font-semibold">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {product.slug}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* Code */}
                      <td className="px-6 py-5 text-sm text-slate-400">
                        {product.product_code || "—"}
                      </td>

                      {/* Category */}
                      <td className="px-6 py-5">

                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                          {product.category}
                        </span>

                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            product.status === "published"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {product.status}
                        </span>

                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">

                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() =>
                              handleEdit(product)
                            }
                            className="rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/10"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(product)
                            }
                            className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/20"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </main>

      {/* Add/Edit Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={handleFormClose}
          onSaved={handleSaved}
        />
      )}

    </div>
  );
}


/* =====================================================
   PRODUCT FORM
===================================================== */

function ProductForm({
  product,
  onClose,
  onSaved,
}) {
  const isEditing = Boolean(product);

  const [form, setForm] = useState({
    name: product?.name || "",
    product_code: product?.product_code || "",
    category: product?.category || "IV Sets",
    short_description:
      product?.short_description || "",
    description:
      product?.description || "",
    specifications:
      product?.specifications || "",
    packaging:
      product?.packaging || "",
    image_url:
      product?.image_url || "",
    status:
      product?.status || "published",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token =
        localStorage.getItem("adminToken");

      const url = isEditing
        ? `http://localhost:5000/api/admin/products/${product.id}`
        : "http://localhost:5000/api/admin/products";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save product"
        );
      }

      await onSaved();

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-900">

        {/* Modal Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-slate-900 px-6 py-5">

          <div>
            <h2 className="text-xl font-bold">
              {isEditing
                ? "Edit Product"
                : "Add Product"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage product information shown on your website.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-slate-400 hover:bg-white/5 hover:text-white"
          >
            ✕
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          <div className="grid gap-5 md:grid-cols-2">

            {/* Name */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Product Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="IV Infusion Set"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            {/* Product Code */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Product Code
              </label>

              <input
                name="product_code"
                value={form.product_code}
                onChange={handleChange}
                placeholder="SS-IV-001"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
              >
                <option value="IV Sets">
                  IV Sets
                </option>

                <option value="Latex Products">
                  Latex Products
                </option>

                <option value="Gloves">
                  Gloves
                </option>
              </select>
            </div>

            {/* Short Description */}
            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Short Description
              </label>

              <textarea
                name="short_description"
                value={form.short_description}
                onChange={handleChange}
                rows="3"
                placeholder="Brief product description..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

            </div>

            {/* Description */}
            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Full Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                placeholder="Detailed product description..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

            </div>

            {/* Specifications */}
            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Specifications
              </label>

              <textarea
                name="specifications"
                value={form.specifications}
                onChange={handleChange}
                rows="4"
                placeholder="Product specifications..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

            </div>

            {/* Packaging */}
            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Packaging
              </label>

              <textarea
                name="packaging"
                value={form.packaging}
                onChange={handleChange}
                rows="4"
                placeholder="100 pieces per box"
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

            </div>

            {/* Image */}
            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Image URL
              </label>

              <input
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="/images/ivset.jpg"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

              <p className="mt-2 text-xs text-slate-600">
                Example: /images/ivset.jpg
              </p>

            </div>

            {/* Status */}
            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
              >
                <option value="published">
                  Published
                </option>

                <option value="draft">
                  Draft
                </option>
              </select>

            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-white/10 pt-6">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-3 text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : isEditing
                ? "Update Product"
                : "Add Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ProductsAdmin;


import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Trash2,
  Pencil,
  ExternalLink,
  Package,
  X,
  Image as ImageIcon,
  Upload,
} from "lucide-react";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const emptyForm = {
    name: "",
    slug: "",
    product_code: "",
    category: "",
    short_description: "",
    description: "",
    specifications: "",
    packaging: "",
    image_url: "",
    status: "published",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // ==========================================
  // GET PRODUCTS
  // ==========================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await fetch("http://localhost:5000/api/admin/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load products");
      }

      setProducts(data.products || []);
    } catch (err) {
      console.error("Products error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==========================================
  // FORM HANDLING
  // ==========================================

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleNameChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: editingProduct ? prev.slug : generateSlug(value),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // OPEN ADD FORM
  // ==========================================
  const openAddForm = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setImagePreview("");
    setMessage("");
    setError("");
    setShowForm(true);
  };

  // ==========================================
  // OPEN EDIT FORM
  // ==========================================

  const openEditForm = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      slug: product.slug || "",
      product_code: product.product_code || "",
      category: product.category || "",
      short_description: product.short_description || "",
      description: product.description || "",
      specifications: product.specifications || "",
      packaging: product.packaging || "",
      image_url: product.image_url || "",
      status: product.status || "published",
    });

    setImagePreview(
  product.image_url
    ? `http://localhost:5000${product.image_url}`
    : ""
);

    setMessage("");
    setError("");
    setShowForm(true);
  };

//   // ==========================================
//   // SAVE PRODUCT
//   // ==========================================

const handleImageUpload = async (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    setError("Only JPG, JPEG, PNG and WEBP images are allowed.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setError("Image must be smaller than 5MB.");
    return;
  }

  try {
    setUploadingImage(true);
    setError("");
    setMessage("");

    // Local preview immediately
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error(
        "Admin session expired. Please login again."
      );
    }

    const uploadData = new FormData();

    uploadData.append("image", file);

    const response = await fetch(
      "http://localhost:5000/api/admin/products/upload-image",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to upload image"
      );
    }

    setFormData((prev) => ({
      ...prev,
      image_url: data.image_url,
    }));

    setImagePreview(
      `http://localhost:5000${data.image_url}`
    );

    setMessage("Image uploaded successfully.");

  } catch (err) {
    console.error("Image upload error:", err);

    setImagePreview("");

    setError(
      err.message || "Failed to upload image"
    );

  } finally {
    setUploadingImage(false);

    // Allow selecting the same file again
    e.target.value = "";
  }
};




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const url = editingProduct
        ? `http://localhost:5000/api/admin/products/${editingProduct.id}`
        : "http://localhost:5000/api/admin/products";

      const method = editingProduct ? "PUT" : "POST";

      // const response = await fetch(url, {
      //   method,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error("Admin session expired. Please login again.");
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save product");
      }

      setMessage(
        editingProduct
          ? "Product updated successfully."
          : "Product added successfully.",
      );

      setShowForm(false);
      setEditingProduct(null);
      setFormData(emptyForm);

      await fetchProducts();
    } catch (err) {
      console.error("Save product error:", err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Delete "${product.name}"? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      // const response = await fetch(
      //   `http://localhost:5000/api/admin/products/${product.id}`,
      //   {
      //     method: "DELETE",
      //   }
      // );

      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error("Admin session expired. Please login again.");
      }

      const response = await fetch(
        `http://localhost:5000/api/admin/products/${product.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      setMessage("Product deleted successfully.");

      setProducts((prev) => prev.filter((item) => item.id !== product.id));
    } catch (err) {
      console.error("Delete product error:", err);
      setError(err.message);
    }
  };

  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      product.name?.toLowerCase().includes(searchText) ||
      product.product_code?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText);

    const matchesCategory = category === "All" || product.category === category;

    const matchesStatus = status === "All" || product.status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-full bg-slate-100">
      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Management
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                Products
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage products displayed on your website.
              </p>
            </div>

            <button
              onClick={openAddForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* ========================================
          CONTENT
      ======================================== */}

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Messages */}

        {message && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* ========================================
            FILTER BAR
        ======================================== */}

        <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
            {/* Search */}

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Category */}

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Categories" : item}
                </option>
              ))}
            </select>

            {/* Status */}

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>

              <option value="published">Published</option>

              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Product count */}

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredProducts.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">
              {products.length}
            </span>{" "}
            products
          </p>
        </div>

        {/* ========================================
            LOADING
        ======================================== */}

        {loading && (
          <div className="rounded-2xl bg-white p-16 text-center shadow-sm ring-1 ring-slate-200">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500">Loading products...</p>
          </div>
        )}

        {/* ========================================
            EMPTY
        ======================================== */}

        {!loading && filteredProducts.length === 0 && (
          <div className="rounded-2xl bg-white p-16 text-center shadow-sm ring-1 ring-slate-200">
            <Package size={42} className="mx-auto text-slate-300" />

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              No products found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}

        {/* ========================================
            PRODUCT TABLE
        ======================================== */}

        {!loading && filteredProducts.length > 0 && (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Code
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* Product */}

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                            {product.image_url ? (
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <Package size={22} className="text-slate-300" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900">
                              {product.name}
                            </p>

                            <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                              {product.short_description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {product.category || "Other"}
                        </span>
                      </td>

                      {/* Code */}

                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-slate-600">
                          {product.product_code || "—"}
                        </span>
                      </td>

                      {/* Status */}

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            product.status === "published"
                              ? "bg-green-50 text-green-700"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>

                      {/* Actions */}

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <a
                            href={`/products/${product.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-blue-600"
                            title="View product"
                          >
                            <ExternalLink size={16} />
                          </a>

                          <button
                            onClick={() => openEditForm(product)}
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                            title="Edit product"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(product)}
                            className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                            title="Delete product"
                          >
                            <Trash2 size={16} />
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

      {/* ========================================
          ADD / EDIT MODAL
      ======================================== */}

      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center">
            <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
              {/* Modal header */}

              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {editingProduct ? "Edit Product" : "Add Product"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {editingProduct
                      ? "Update product information."
                      : "Add a new product to your catalog."}
                  </p>
                </div>

                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="max-h-[75vh] overflow-y-auto p-6"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  {/* Name */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Product Name *
                    </label>

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleNameChange}
                      required
                      placeholder="IV Infusion Set"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Slug */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Slug *
                    </label>

                    <input
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      required
                      placeholder="iv-infusion-set"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Code */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Product Code
                    </label>

                    <input
                      name="product_code"
                      value={formData.product_code}
                      onChange={handleChange}
                      placeholder="SS-IV-001"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Category */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Category *
                    </label>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select category</option>

                      <option value="IV Sets">IV Sets</option>

                      <option value="Latex Products">Latex Products</option>

                      <option value="Gloves">Gloves</option>

                      <option value="Surgical Products">
                        Surgical Products
                      </option>

                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Short description */}

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Short Description *
                    </label>

                    <textarea
                      name="short_description"
                      value={formData.short_description}
                      onChange={handleChange}
                      required
                      rows="3"
                      placeholder="Short product description..."
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Description */}

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Complete product description..."
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Specifications */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Specifications
                    </label>

                    <textarea
                      name="specifications"
                      value={formData.specifications}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Medical grade components..."
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Packaging */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Packaging
                    </label>

                    <textarea
                      name="packaging"
                      value={formData.packaging}
                      onChange={handleChange}
                      rows="4"
                      placeholder="100 pieces per box"
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Image */}

                  

<div className="md:col-span-2">

  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Product Image
  </label>

  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">

    <div className="grid gap-5 md:grid-cols-[180px_1fr] md:items-center">

      {/* Preview */}

      <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">

        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Product preview"
            className="h-full w-full object-contain p-3"
          />
        ) : (
          <div className="text-center text-slate-400">
            <ImageIcon
              size={40}
              className="mx-auto"
            />

            <p className="mt-2 text-xs">
              No image selected
            </p>
          </div>
        )}

      </div>

      {/* Upload */}

      <div>

        <p className="text-sm font-semibold text-slate-700">
          Upload product image
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          JPG, JPEG, PNG or WEBP.
          Maximum file size: 5MB.
        </p>

        <label
          className={`mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
            uploadingImage
              ? "cursor-not-allowed bg-slate-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >

          <Upload size={17} />

          {uploadingImage
            ? "Uploading..."
            : "Choose Image"}

          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImageUpload}
            disabled={uploadingImage}
            className="hidden"
          />

        </label>

        {formData.image_url && (
          <p className="mt-3 break-all text-xs text-green-600">
            Image uploaded successfully
          </p>
        )}

      </div>

    </div>

  </div>

</div>

                  {/* Status */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Status
                    </label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="published">Published</option>

                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                {/* Buttons */}

                <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {saving
                      ? "Saving..."
                      : editingProduct
                        ? "Update Product"
                        : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;

//original code

// import { useEffect, useState } from "react";
// import {
//   Plus,
//   Search,
//   Trash2,
//   Pencil,
//   ExternalLink,
//   Package,
//   X,
//   Image as ImageIcon,
//   upload,
// } from "lucide-react";

// function AdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [status, setStatus] = useState("All");

//   const [showForm, setShowForm] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const emptyForm = {
//     name: "",
//     slug: "",
//     product_code: "",
//     category: "",
//     short_description: "",
//     description: "",
//     specifications: "",
//     packaging: "",
//     image_url: "",
//     status: "published",
//   };

//   const [formData, setFormData] = useState(emptyForm);

//   // ==========================================
//   // GET PRODUCTS
//   // ==========================================

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const token = localStorage.getItem("adminToken");

//       const response = await fetch(
//         "http://localhost:5000/api/admin/products",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to load products"
//         );
//       }

//       setProducts(data.products || []);
//     } catch (err) {
//       console.error("Products error:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // ==========================================
//   // FORM HANDLING
//   // ==========================================

//   const generateSlug = (value) => {
//     return value
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/^-+|-+$/g, "");
//   };

//   const handleNameChange = (e) => {
//     const value = e.target.value;

//     setFormData((prev) => ({
//       ...prev,
//       name: value,
//       slug: editingProduct
//         ? prev.slug
//         : generateSlug(value),
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ==========================================
//   // OPEN ADD FORM
//   // ==========================================

//   const openAddForm = () => {
//     setEditingProduct(null);
//     setFormData(emptyForm);
//     setMessage("");
//     setError("");
//     setShowForm(true);
//   };

//   // ==========================================
//   // OPEN EDIT FORM
//   // ==========================================

//   const openEditForm = (product) => {
//     setEditingProduct(product);

//     setFormData({
//       name: product.name || "",
//       slug: product.slug || "",
//       product_code: product.product_code || "",
//       category: product.category || "",
//       short_description:
//         product.short_description || "",
//       description: product.description || "",
//       specifications:
//         product.specifications || "",
//       packaging: product.packaging || "",
//       image_url: product.image_url || "",
//       status: product.status || "published",
//     });

//     setMessage("");
//     setError("");
//     setShowForm(true);
//   };

//   // ==========================================
//   // SAVE PRODUCT
//   // ==========================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setSaving(true);
//       setError("");
//       setMessage("");

//       const url = editingProduct
//         ? `http://localhost:5000/api/admin/products/${editingProduct.id}`
//         : "http://localhost:5000/api/admin/products";

//       const method = editingProduct
//         ? "PUT"
//         : "POST";

//       // const response = await fetch(url, {
//       //   method,
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       //   body: JSON.stringify(formData),
//       // });

//       const token = localStorage.getItem("adminToken");

// if (!token) {
//   throw new Error("Admin session expired. Please login again.");
// }

// const response = await fetch(url, {
//   method,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify(formData),
// });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to save product"
//         );
//       }

//       setMessage(
//         editingProduct
//           ? "Product updated successfully."
//           : "Product added successfully."
//       );

//       setShowForm(false);
//       setEditingProduct(null);
//       setFormData(emptyForm);

//       await fetchProducts();

//     } catch (err) {
//       console.error("Save product error:", err);
//       setError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ==========================================
//   // DELETE PRODUCT
//   // ==========================================

//   const handleDelete = async (product) => {
//     const confirmed = window.confirm(
//       `Delete "${product.name}"? This cannot be undone.`
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       setError("");
//       setMessage("");

//       // const response = await fetch(
//       //   `http://localhost:5000/api/admin/products/${product.id}`,
//       //   {
//       //     method: "DELETE",
//       //   }
//       // );

//       const token = localStorage.getItem("adminToken");

// if (!token) {
//   throw new Error("Admin session expired. Please login again.");
// }

// const response = await fetch(
//   `http://localhost:5000/api/admin/products/${product.id}`,
//   {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }
// );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to delete product"
//         );
//       }

//       setMessage("Product deleted successfully.");

//       setProducts((prev) =>
//         prev.filter((item) => item.id !== product.id)
//       );

//     } catch (err) {
//       console.error("Delete product error:", err);
//       setError(err.message);
//     }
//   };

//   // ==========================================
//   // FILTER PRODUCTS
//   // ==========================================

//   const categories = [
//     "All",
//     ...new Set(
//       products
//         .map((product) => product.category)
//         .filter(Boolean)
//     ),
//   ];

//   const filteredProducts = products.filter((product) => {

//     const searchText = search.toLowerCase();

//     const matchesSearch =
//       product.name
//         ?.toLowerCase()
//         .includes(searchText) ||
//       product.product_code
//         ?.toLowerCase()
//         .includes(searchText) ||
//       product.category
//         ?.toLowerCase()
//         .includes(searchText);

//     const matchesCategory =
//       category === "All" ||
//       product.category === category;

//     const matchesStatus =
//       status === "All" ||
//       product.status === status;

//     return (
//       matchesSearch &&
//       matchesCategory &&
//       matchesStatus
//     );
//   });

//   return (
//     <div className="min-h-full bg-slate-100">

//       {/* ========================================
//           PAGE HEADER
//       ======================================== */}

//       <div className="border-b border-slate-200 bg-white">

//         <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

//           <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

//             <div>

//               <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
//                 Management
//               </p>

//               <h1 className="mt-1 text-3xl font-bold text-slate-900">
//                 Products
//               </h1>

//               <p className="mt-2 text-sm text-slate-500">
//                 Manage products displayed on your website.
//               </p>

//             </div>

//             <button
//               onClick={openAddForm}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
//             >
//               <Plus size={18} />
//               Add Product
//             </button>

//           </div>

//         </div>

//       </div>

//       {/* ========================================
//           CONTENT
//       ======================================== */}

//       <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

//         {/* Messages */}

//         {message && (
//           <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
//             {message}
//           </div>
//         )}

//         {error && (
//           <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
//             {error}
//           </div>
//         )}

//         {/* ========================================
//             FILTER BAR
//         ======================================== */}

//         <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">

//           <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">

//             {/* Search */}

//             <div className="relative">

//               <Search
//                 size={18}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//               />

//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={search}
//                 onChange={(e) =>
//                   setSearch(e.target.value)
//                 }
//                 className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//               />

//             </div>

//             {/* Category */}

//             <select
//               value={category}
//               onChange={(e) =>
//                 setCategory(e.target.value)
//               }
//               className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
//             >

//               {categories.map((item) => (
//                 <option key={item} value={item}>
//                   {item === "All"
//                     ? "All Categories"
//                     : item}
//                 </option>
//               ))}

//             </select>

//             {/* Status */}

//             <select
//               value={status}
//               onChange={(e) =>
//                 setStatus(e.target.value)
//               }
//               className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
//             >

//               <option value="All">
//                 All Status
//               </option>

//               <option value="published">
//                 Published
//               </option>

//               <option value="draft">
//                 Draft
//               </option>

//             </select>

//           </div>

//         </div>

//         {/* Product count */}

//         <div className="mb-4 flex items-center justify-between">

//           <p className="text-sm text-slate-500">
//             Showing{" "}
//             <span className="font-semibold text-slate-900">
//               {filteredProducts.length}
//             </span>{" "}
//             of{" "}
//             <span className="font-semibold text-slate-900">
//               {products.length}
//             </span>{" "}
//             products
//           </p>

//         </div>

//         {/* ========================================
//             LOADING
//         ======================================== */}

//         {loading && (

//           <div className="rounded-2xl bg-white p-16 text-center shadow-sm ring-1 ring-slate-200">

//             <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

//             <p className="mt-4 text-sm text-slate-500">
//               Loading products...
//             </p>

//           </div>

//         )}

//         {/* ========================================
//             EMPTY
//         ======================================== */}

//         {!loading &&
//           filteredProducts.length === 0 && (

//             <div className="rounded-2xl bg-white p-16 text-center shadow-sm ring-1 ring-slate-200">

//               <Package
//                 size={42}
//                 className="mx-auto text-slate-300"
//               />

//               <h2 className="mt-4 text-lg font-bold text-slate-900">
//                 No products found
//               </h2>

//               <p className="mt-2 text-sm text-slate-500">
//                 Try changing your search or filters.
//               </p>

//             </div>
//           )}

//         {/* ========================================
//             PRODUCT TABLE
//         ======================================== */}

//         {!loading &&
//           filteredProducts.length > 0 && (

//             <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">

//               <div className="overflow-x-auto">

//                 <table className="w-full min-w-[900px]">

//                   <thead className="border-b border-slate-200 bg-slate-50">

//                     <tr>

//                       <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
//                         Product
//                       </th>

//                       <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
//                         Category
//                       </th>

//                       <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
//                         Code
//                       </th>

//                       <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
//                         Status
//                       </th>

//                       <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
//                         Actions
//                       </th>

//                     </tr>

//                   </thead>

//                   <tbody className="divide-y divide-slate-100">

//                     {filteredProducts.map((product) => (

//                       <tr
//                         key={product.id}
//                         className="transition hover:bg-slate-50"
//                       >

//                         {/* Product */}

//                         <td className="px-6 py-4">

//                           <div className="flex items-center gap-4">

//                             <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">

//                               {product.image_url ? (

//                                 <img
//                                   src={product.image_url}
//                                   alt={product.name}
//                                   className="h-full w-full object-cover"
//                                 />

//                               ) : (

//                                 <div className="flex h-full items-center justify-center">
//                                   <Package
//                                     size={22}
//                                     className="text-slate-300"
//                                   />
//                                 </div>

//                               )}

//                             </div>

//                             <div className="min-w-0">

//                               <p className="font-semibold text-slate-900">
//                                 {product.name}
//                               </p>

//                               <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
//                                 {product.short_description}
//                               </p>

//                             </div>

//                           </div>

//                         </td>

//                         {/* Category */}

//                         <td className="px-6 py-4">

//                           <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
//                             {product.category || "Other"}
//                           </span>

//                         </td>

//                         {/* Code */}

//                         <td className="px-6 py-4">

//                           <span className="font-mono text-xs text-slate-600">
//                             {product.product_code || "—"}
//                           </span>

//                         </td>

//                         {/* Status */}

//                         <td className="px-6 py-4">

//                           <span
//                             className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                               product.status === "published"
//                                 ? "bg-green-50 text-green-700"
//                                 : "bg-yellow-50 text-yellow-700"
//                             }`}
//                           >
//                             {product.status}
//                           </span>

//                         </td>

//                         {/* Actions */}

//                         <td className="px-6 py-4">

//                           <div className="flex justify-end gap-2">

//                             <a
//                               href={`/products/${product.slug}`}
//                               target="_blank"
//                               rel="noreferrer"
//                               className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-blue-600"
//                               title="View product"
//                             >
//                               <ExternalLink size={16} />
//                             </a>

//                             <button
//                               onClick={() =>
//                                 openEditForm(product)
//                               }
//                               className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
//                               title="Edit product"
//                             >
//                               <Pencil size={16} />
//                             </button>

//                             <button
//                               onClick={() =>
//                                 handleDelete(product)
//                               }
//                               className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
//                               title="Delete product"
//                             >
//                               <Trash2 size={16} />
//                             </button>

//                           </div>

//                         </td>

//                       </tr>

//                     ))}

//                   </tbody>

//                 </table>

//               </div>

//             </div>

//           )}

//       </main>

//       {/* ========================================
//           ADD / EDIT MODAL
//       ======================================== */}

//       {showForm && (

//         <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">

//           <div className="flex min-h-full items-center justify-center">

//             <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">

//               {/* Modal header */}

//               <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

//                 <div>

//                   <h2 className="text-xl font-bold text-slate-900">
//                     {editingProduct
//                       ? "Edit Product"
//                       : "Add Product"}
//                   </h2>

//                   <p className="mt-1 text-sm text-slate-500">
//                     {editingProduct
//                       ? "Update product information."
//                       : "Add a new product to your catalog."}
//                   </p>

//                 </div>

//                 <button
//                   onClick={() => setShowForm(false)}
//                   className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
//                 >
//                   <X size={20} />
//                 </button>

//               </div>

//               {/* Form */}

//               <form
//                 onSubmit={handleSubmit}
//                 className="max-h-[75vh] overflow-y-auto p-6"
//               >

//                 <div className="grid gap-5 md:grid-cols-2">

//                   {/* Name */}

//                   <div>

//                     <label className="mb-2 block text-sm font-semibold text-slate-700">
//                       Product Name *
//                     </label>

//                     <input
//                       name="name"
//                       value={formData.name}
//                       onChange={handleNameChange}
//                       required
//                       placeholder="IV Infusion Set"
//                       className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />

//                   </div>

//                   {/* Slug */}

//                   <div>

//                     <label className="mb-2 block text-sm font-semibold text-slate-700">
//                       Slug *
//                     </label>

//                     <input
//                       name="slug"
//                       value={formData.slug}
//                       onChange={handleChange}
//                       required
//                       placeholder="iv-infusion-set"
//                       className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />

//                   </div>

//                   {/* Code */}

//                   <div>

//                     <label className="mb-2 block text-sm font-semibold text-slate-700">
//                       Product Code
//                     </label>

//                     <input
//                       name="product_code"
//                       value={formData.product_code}
//                       onChange={handleChange}
//                       placeholder="SS-IV-001"
//                       className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />

//                   </div>

//                   {/* Category */}

//                   <div>

//                     <label className="mb-2 block text-sm font-semibold text-slate-700">
//                       Category *
//                     </label>

//                     <select
//                       name="category"
//                       value={formData.category}
//                       onChange={handleChange}
//                       required
//                       className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     >

//                       <option value="">
//                         Select category
//                       </option>

//                       <option value="IV Sets">
//                         IV Sets
//                       </option>

//                       <option value="Latex Products">
//                         Latex Products
//                       </option>

//                       <option value="Gloves">
//                         Gloves
//                       </option>

//                       <option value="Surgical Products">
//                         Surgical Products
//                       </option>

//                       <option value="Other">
//                         Other
//                       </option>

//                     </select>

//                   </div>

//                   {/* Short description */}

//                   <div className="md:col-span-2">

//                     <label className="mb-2 block text-sm font-semibold text-slate-700">
//                       Short Description *
//                     </label>

//                     <textarea
//                       name="short_description"
//                       value={formData.short_description}
//                       onChange={handleChange}
//                       required
//                       rows="3"
//                       placeholder="Short product description..."
//                       className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />

//                   </div>

//                   {/* Description */}

//                   <div className="md:col-span-2">

//                     <label className="mb-2 block text-sm font-semibold text-slate-700">
//                       Description
//                     </label>

//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       rows="4"
//                       placeholder="Complete product description..."
//                       className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />

//                   </div>

//                   {/* Specifications */}

//                   <div>

//                     <label className="mb-2 block text-sm font-semibold text-slate-700">
//                       Specifications
//                     </label>

//                     <textarea
//                       name="specifications"
//                       value={formData.specifications}
//                       onChange={handleChange}
//                       rows="4"
//                       placeholder="Medical grade components..."
//                       className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />

//                   </div>

//                   {/* Packaging */}

//                   <div>

//                     <label className="mb-2 block text-sm font-semibold text-slate-700">
//                       Packaging
//                     </label>

//                     <textarea
//                       name="packaging"
//                       value={formData.packaging}
//                       onChange={handleChange}
//                       rows="4"
//                       placeholder="100 pieces per box"
//                       className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />

//                   </div>

//                   {/* Image */}

//                   <div className="md:col-span-2">

//                     <label className="mb-2 block text-sm font-semibold text-slate-700">
//                       Image URL
//                     </label>

//                     <input
//                       name="image_url"
//                       value={formData.image_url}
//                       onChange={handleChange}
//                       placeholder="/images/ivset.jpg"
//                       className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />

//                   </div>

//                   {/* Status */}

//                   <div>

//                     <label className="mb-2 block text-sm font-semibold text-slate-700">
//                       Status
//                     </label>

//                     <select
//                       name="status"
//                       value={formData.status}
//                       onChange={handleChange}
//                       className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     >

//                       <option value="published">
//                         Published
//                       </option>

//                       <option value="draft">
//                         Draft
//                       </option>

//                     </select>

//                   </div>

//                 </div>

//                 {/* Buttons */}

//                 <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowForm(false)
//                     }
//                     className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     disabled={saving}
//                     className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
//                   >
//                     {saving
//                       ? "Saving..."
//                       : editingProduct
//                       ? "Update Product"
//                       : "Add Product"}
//                   </button>

//                 </div>

//               </form>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }

// export default AdminProducts;

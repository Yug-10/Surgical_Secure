import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  FileText,
  ExternalLink,
  CheckCircle,
  Clock,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/certifications";

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  certificate_number: "",
  issue_date: "",
  expiry_date: "",
  document_url: "",
  status: "published",
};

function AdminCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingCertification, setEditingCertification] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
  |--------------------------------------------------------------------------
  | FETCH CERTIFICATIONS
  |--------------------------------------------------------------------------
  */

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/admin/all`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch certifications"
        );
      }

      setCertifications(data.certifications || []);

    } catch (err) {
      console.error("Fetch certifications error:", err);
      setError(err.message || "Failed to load certifications");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);


  /*
  |--------------------------------------------------------------------------
  | FORM INPUT
  |--------------------------------------------------------------------------
  */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /*
  |--------------------------------------------------------------------------
  | OPEN ADD FORM
  |--------------------------------------------------------------------------
  */

  const openAddForm = () => {
    setEditingCertification(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowForm(true);
  };


  /*
  |--------------------------------------------------------------------------
  | OPEN EDIT FORM
  |--------------------------------------------------------------------------
  */

  const openEditForm = (certification) => {
    setEditingCertification(certification);

    setForm({
      name: certification.name || "",
      slug: certification.slug || "",
      description: certification.description || "",
      certificate_number:
        certification.certificate_number || "",
      issue_date: certification.issue_date
        ? String(certification.issue_date).slice(0, 10)
        : "",
      expiry_date: certification.expiry_date
        ? String(certification.expiry_date).slice(0, 10)
        : "",
      document_url: certification.document_url || "",
      status: certification.status || "draft",
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };


  /*
  |--------------------------------------------------------------------------
  | CLOSE FORM
  |--------------------------------------------------------------------------
  */

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingCertification(null);
    setForm(emptyForm);
    setError("");
  };


  /*
  |--------------------------------------------------------------------------
  | ADD / UPDATE
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Certification name is required.");
      return;
    }

    if (!form.slug.trim()) {
      setError("Slug is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const url = editingCertification
        ? `${API_URL}/admin/${editingCertification.id}`
        : `${API_URL}/admin`;

      const method = editingCertification
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          slug: form.slug.trim(),
          description: form.description.trim(),
          certificate_number:
            form.certificate_number.trim(),
          issue_date: form.issue_date || null,
          expiry_date: form.expiry_date || null,
          document_url: form.document_url.trim(),
          status: form.status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Failed to ${
              editingCertification ? "update" : "add"
            } certification`
        );
      }

      setSuccess(
        editingCertification
          ? "Certification updated successfully."
          : "Certification added successfully."
      );

      await fetchCertifications();

      setShowForm(false);
      setEditingCertification(null);
      setForm(emptyForm);

    } catch (err) {
      console.error("Save certification error:", err);
      setError(
        err.message || "Something went wrong."
      );

    } finally {
      setSaving(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (certification) => {
    const confirmed = window.confirm(
      `Delete "${certification.name}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(certification.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/admin/${certification.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete certification"
        );
      }

      setSuccess("Certification deleted successfully.");

      setCertifications((previous) =>
        previous.filter(
          (item) => item.id !== certification.id
        )
      );

    } catch (err) {
      console.error(
        "Delete certification error:",
        err
      );

      setError(
        err.message ||
          "Failed to delete certification."
      );

    } finally {
      setDeletingId(null);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | QUICK PUBLISH / DRAFT
  |--------------------------------------------------------------------------
  */

  const changeStatus = async (
    certification,
    newStatus
  ) => {
    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/admin/${certification.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: certification.name,
            slug: certification.slug,
            description:
              certification.description || "",
            certificate_number:
              certification.certificate_number || "",
            issue_date:
              certification.issue_date
                ? String(certification.issue_date).slice(
                    0,
                    10
                  )
                : null,
            expiry_date:
              certification.expiry_date
                ? String(certification.expiry_date).slice(
                    0,
                    10
                  )
                : null,
            document_url:
              certification.document_url || "",
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to change certification status"
        );
      }

      setSuccess(
        newStatus === "published"
          ? "Certification published."
          : "Certification moved to draft."
      );

      await fetchCertifications();

    } catch (err) {
      console.error(
        "Change certification status error:",
        err
      );

      setError(
        err.message ||
          "Failed to change certification status."
      );
    }
  };


  /*
  |--------------------------------------------------------------------------
  | GENERATE SLUG
  |--------------------------------------------------------------------------
  */

  const generateSlug = () => {
    const slug = form.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setForm((previous) => ({
      ...previous,
      slug,
    }));
  };


  return (
    <div className="min-h-screen bg-slate-100">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-7 lg:px-8">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Administration
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                Certifications
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage certificates displayed on your website.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Certification
            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            <CheckCircle size={18} />
            {success}
          </div>
        )}


        {/* ERROR */}

        {error && !showForm && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}


        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">

            <div className="text-center">

              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Loading certifications...
              </p>

            </div>

          </div>

        ) : certifications.length === 0 ? (

          /* =================================================
              EMPTY
          ================================================= */

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <FileText size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No certifications yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Add your ISO certificates, manufacturing
              licenses, and other certifications.
            </p>

            <button
              type="button"
              onClick={openAddForm}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={17} />
              Add Certification
            </button>

          </div>

        ) : (

          /* =================================================
              CERTIFICATION TABLE
          ================================================= */

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead className="border-b border-slate-200 bg-slate-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Certification
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Certificate No.
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Validity
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

                  {certifications.map(
                    (certification) => (

                      <tr
                        key={certification.id}
                        className="transition hover:bg-slate-50"
                      >

                        {/* NAME */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-4">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                              <FileText size={20} />
                            </div>

                            <div>

                              <p className="font-semibold text-slate-900">
                                {certification.name}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                /{certification.slug}
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* NUMBER */}

                        <td className="px-6 py-5">

                          <span className="text-sm text-slate-600">
                            {certification.certificate_number ||
                              "—"}
                          </span>

                        </td>


                        {/* DATES */}

                        <td className="px-6 py-5">

                          <div className="text-sm text-slate-600">

                            <p>
                              Issue:{" "}
                              {certification.issue_date
                                ? String(
                                    certification.issue_date
                                  ).slice(0, 10)
                                : "—"}
                            </p>

                            <p className="mt-1">
                              Expiry:{" "}
                              {certification.expiry_date
                                ? String(
                                    certification.expiry_date
                                  ).slice(0, 10)
                                : "—"}
                            </p>

                          </div>

                        </td>


                        {/* STATUS */}

                        <td className="px-6 py-5">

                          {certification.status ===
                          "published" ? (

                            <button
                              type="button"
                              onClick={() =>
                                changeStatus(
                                  certification,
                                  "draft"
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 transition hover:bg-green-100"
                              title="Move to draft"
                            >
                              <CheckCircle size={14} />
                              Published
                            </button>

                          ) : (

                            <button
                              type="button"
                              onClick={() =>
                                changeStatus(
                                  certification,
                                  "published"
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                              title="Publish"
                            >
                              <Clock size={14} />
                              Draft
                            </button>

                          )}

                        </td>


                        {/* ACTIONS */}

                        <td className="px-6 py-5">

                          <div className="flex justify-end gap-2">

                            {certification.document_url && (

                              <a
                                href={
                                  certification.document_url
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                                title="Open certificate"
                              >
                                <ExternalLink size={16} />
                              </a>

                            )}

                            <button
                              type="button"
                              onClick={() =>
                                openEditForm(
                                  certification
                                )
                              }
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                              title="Edit"
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              type="button"
                              disabled={
                                deletingId ===
                                certification.id
                              }
                              onClick={() =>
                                handleDelete(
                                  certification
                                )
                              }
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                              title="Delete"
                            >
                              {deletingId ===
                              certification.id ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-500" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>


      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

          <div className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  {editingCertification
                    ? "Edit Certification"
                    : "Add Certification"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingCertification
                    ? "Update certification information."
                    : "Add a new certification to your website."}
                </p>

              </div>

              <button
                type="button"
                onClick={closeForm}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6"
            >

              {error && (

                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>

              )}


              {/* NAME + SLUG */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Certification Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="ISO 13485"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Slug *
                  </label>

                  <div className="flex gap-2">

                    <input
                      type="text"
                      name="slug"
                      value={form.slug}
                      onChange={handleChange}
                      placeholder="iso-13485"
                      className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />

                    <button
                      type="button"
                      onClick={generateSlug}
                      className="rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Generate
                    </button>

                  </div>

                </div>

              </div>


              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe this certification..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* CERTIFICATE NUMBER */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Certificate Number
                </label>

                <input
                  type="text"
                  name="certificate_number"
                  value={form.certificate_number}
                  onChange={handleChange}
                  placeholder="CERT-12345"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>


              {/* DATES */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Issue Date
                  </label>

                  <input
                    type="date"
                    name="issue_date"
                    value={form.issue_date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>


                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Expiry Date
                  </label>

                  <input
                    type="date"
                    name="expiry_date"
                    value={form.expiry_date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>


              {/* DOCUMENT */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Certificate Document URL
                </label>

                <input
                  type="text"
                  name="document_url"
                  value={form.document_url}
                  onChange={handleChange}
                  placeholder="/certifications/iso-13485.pdf"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Example: /certifications/iso-13485.pdf
                </p>

              </div>


              {/* STATUS */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="published">
                    Published
                  </option>

                  <option value="draft">
                    Draft
                  </option>
                </select>

              </div>


              {/* ACTIONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {saving ? (

                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-white" />
                      Saving...
                    </>

                  ) : (

                    <>
                      <Save size={17} />
                      {editingCertification
                        ? "Update Certification"
                        : "Add Certification"}
                    </>

                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminCertifications;

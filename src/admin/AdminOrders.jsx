import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  X,
  RefreshCw,
  Mail,
  Phone,
  Building2,
  Package,
  CalendarDays,
  MessageSquare,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/inquiries";

const STATUS_OPTIONS = [
  "new",
  "contacted",
  "quoted",
  "confirmed",
  "completed",
  "cancelled",
];

function AdminOrders() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedInquiry, setSelectedInquiry] =
    useState(null);

  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
  |--------------------------------------------------------------------------
  | FETCH INQUIRIES
  |--------------------------------------------------------------------------
  */

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch inquiries"
        );
      }

      setInquiries(data.inquiries || []);

    } catch (err) {
      console.error("Fetch inquiries error:", err);

      setError(
        err.message || "Failed to load quote requests."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);


  /*
  |--------------------------------------------------------------------------
  | FILTER
  |--------------------------------------------------------------------------
  */

  const filteredInquiries = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return inquiries.filter((inquiry) => {
      const matchesStatus =
        statusFilter === "all" ||
        inquiry.status === statusFilter;

      if (!searchValue) {
        return matchesStatus;
      }

      const searchableText = [
        inquiry.name,
        inquiry.email,
        inquiry.phone,
        inquiry.company,
        inquiry.product_name,
        inquiry.product_slug,
        inquiry.message,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        matchesStatus &&
        searchableText.includes(searchValue)
      );
    });
  }, [inquiries, search, statusFilter]);


  /*
  |--------------------------------------------------------------------------
  | UPDATE STATUS
  |--------------------------------------------------------------------------
  */

  const updateStatus = async (inquiry, newStatus) => {
    try {
      setUpdatingId(inquiry.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/${inquiry.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...inquiry,
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status"
        );
      }

      setInquiries((previous) =>
        previous.map((item) =>
          item.id === inquiry.id
            ? {
                ...item,
                status: newStatus,
              }
            : item
        )
      );

      if (
        selectedInquiry &&
        selectedInquiry.id === inquiry.id
      ) {
        setSelectedInquiry({
          ...selectedInquiry,
          status: newStatus,
        });
      }

      setSuccess("Request status updated.");

    } catch (err) {
      console.error("Update inquiry error:", err);

      setError(
        err.message ||
          "Failed to update request status."
      );

    } finally {
      setUpdatingId(null);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  */

  const deleteInquiry = async (inquiry) => {
    const confirmed = window.confirm(
      `Delete the request from "${inquiry.name}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(inquiry.id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/${inquiry.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete request"
        );
      }

      setInquiries((previous) =>
        previous.filter(
          (item) => item.id !== inquiry.id
        )
      );

      if (
        selectedInquiry &&
        selectedInquiry.id === inquiry.id
      ) {
        setSelectedInquiry(null);
      }

      setSuccess("Quote request deleted.");

    } catch (err) {
      console.error("Delete inquiry error:", err);

      setError(
        err.message ||
          "Failed to delete quote request."
      );

    } finally {
      setDeletingId(null);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | STATUS COLORS
  |--------------------------------------------------------------------------
  */

  const getStatusClass = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-50 text-blue-700";

      case "contacted":
        return "bg-purple-50 text-purple-700";

      case "quoted":
        return "bg-amber-50 text-amber-700";

      case "confirmed":
        return "bg-green-50 text-green-700";

      case "completed":
        return "bg-emerald-50 text-emerald-700";

      case "cancelled":
        return "bg-red-50 text-red-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };


  /*
  |--------------------------------------------------------------------------
  | FORMAT DATE
  |--------------------------------------------------------------------------
  */

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString();
  };


  /*
  |--------------------------------------------------------------------------
  | COUNTS
  |--------------------------------------------------------------------------
  */

  const newCount = inquiries.filter(
    (item) => item.status === "new"
  ).length;

  const quotedCount = inquiries.filter(
    (item) => item.status === "quoted"
  ).length;

  const confirmedCount = inquiries.filter(
    (item) => item.status === "confirmed"
  ).length;


  return (
    <div className="min-h-screen bg-slate-100">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-7 lg:px-8">

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Administration
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                Quote Requests
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage customer inquiries and quotation requests.
              </p>

            </div>

            <button
              type="button"
              onClick={fetchInquiries}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw
                size={17}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <p className="text-sm text-slate-500">
              Total Requests
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {inquiries.length}
            </p>

          </div>


          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">

            <p className="text-sm text-blue-600">
              New Requests
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-700">
              {newCount}
            </p>

          </div>


          <div className="rounded-2xl border border-green-100 bg-green-50 p-5">

            <p className="text-sm text-green-600">
              Confirmed
            </p>

            <p className="mt-2 text-3xl font-bold text-green-700">
              {confirmedCount}
            </p>

          </div>

        </div>


        {/* =================================================
            SUCCESS / ERROR
        ================================================= */}

        {success && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}


        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 lg:flex-row">

            {/* SEARCH */}

            <div className="relative flex-1">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search customer, company, product, email..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>


            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">
                All Statuses
              </option>

              {STATUS_OPTIONS.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status.charAt(0).toUpperCase() +
                    status.slice(1)}
                </option>
              ))}
            </select>

          </div>

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {loading ? (

            <div className="flex min-h-[350px] items-center justify-center">

              <div className="text-center">

                <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

                <p className="mt-4 text-sm text-slate-500">
                  Loading quote requests...
                </p>

              </div>

            </div>

          ) : filteredInquiries.length === 0 ? (

            <div className="flex min-h-[350px] items-center justify-center px-6 text-center">

              <div>

                <MessageSquare
                  size={42}
                  className="mx-auto text-slate-300"
                />

                <h2 className="mt-4 text-lg font-bold text-slate-900">
                  No quote requests found
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your search or status filter.
                </p>

              </div>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px]">

                <thead className="border-b border-slate-200 bg-slate-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Quantity
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Date
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {filteredInquiries.map((inquiry) => (

                    <tr
                      key={inquiry.id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* CUSTOMER */}

                      <td className="px-6 py-5">

                        <div>

                          <p className="font-semibold text-slate-900">
                            {inquiry.name ||
                              "Unknown"}
                          </p>

                          {inquiry.company && (
                            <p className="mt-1 text-xs text-slate-400">
                              {inquiry.company}
                            </p>
                          )}

                          <p className="mt-1 text-xs text-slate-500">
                            {inquiry.email}
                          </p>

                        </div>

                      </td>


                      {/* PRODUCT */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <Package size={17} />
                          </div>

                          <span className="text-sm font-medium text-slate-700">
                            {inquiry.product_name ||
                              inquiry.product_slug ||
                              "General Inquiry"}
                          </span>

                        </div>

                      </td>


                      {/* QUANTITY */}

                      <td className="px-6 py-5">

                        <span className="text-sm text-slate-600">
                          {inquiry.quantity ||
                            "—"}
                        </span>

                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-5">

                        <select
                          value={
                            inquiry.status ||
                            "new"
                          }
                          disabled={
                            updatingId ===
                            inquiry.id
                          }
                          onChange={(event) =>
                            updateStatus(
                              inquiry,
                              event.target.value
                            )
                          }
                          className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${getStatusClass(
                            inquiry.status ||
                              "new"
                          )}`}
                        >

                          {STATUS_OPTIONS.map(
                            (status) => (
                              <option
                                key={status}
                                value={status}
                              >
                                {status
                                  .charAt(0)
                                  .toUpperCase() +
                                  status.slice(1)}
                              </option>
                            )
                          )}

                        </select>

                      </td>


                      {/* DATE */}

                      <td className="px-6 py-5">

                        <span className="text-sm text-slate-500">
                          {formatDate(
                            inquiry.created_at
                          )}
                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td className="px-6 py-5">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedInquiry(
                                inquiry
                              )
                            }
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                            title="View details"
                          >
                            <Eye size={16} />
                          </button>


                          <button
                            type="button"
                            disabled={
                              deletingId ===
                              inquiry.id
                            }
                            onClick={() =>
                              deleteInquiry(
                                inquiry
                              )
                            }
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                            title="Delete"
                          >

                            {deletingId ===
                            inquiry.id ? (
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-500" />
                            ) : (
                              <Trash2 size={16} />
                            )}

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>


      {/* =====================================================
          DETAILS MODAL
      ===================================================== */}

      {selectedInquiry && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Quote Request
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Request Details
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedInquiry(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>

            </div>


            {/* DETAILS */}

            <div className="space-y-6 p-6">

              {/* CUSTOMER */}

              <div className="rounded-xl border border-slate-200 p-5">

                <h3 className="font-semibold text-slate-900">
                  Customer
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">

                  <div className="flex gap-3">

                    <Building2
                      size={17}
                      className="mt-0.5 text-blue-600"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Name
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedInquiry.name ||
                          "—"}
                      </p>
                    </div>

                  </div>


                  <div className="flex gap-3">

                    <Building2
                      size={17}
                      className="mt-0.5 text-blue-600"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Company
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedInquiry.company ||
                          "—"}
                      </p>
                    </div>

                  </div>


                  <div className="flex gap-3">

                    <Mail
                      size={17}
                      className="mt-0.5 text-blue-600"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Email
                      </p>

                      <a
                        href={`mailto:${selectedInquiry.email}`}
                        className="mt-1 block text-sm font-medium text-blue-600 hover:underline"
                      >
                        {selectedInquiry.email ||
                          "—"}
                      </a>
                    </div>

                  </div>


                  <div className="flex gap-3">

                    <Phone
                      size={17}
                      className="mt-0.5 text-blue-600"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Phone
                      </p>

                      <a
                        href={`tel:${selectedInquiry.phone}`}
                        className="mt-1 block text-sm font-medium text-blue-600 hover:underline"
                      >
                        {selectedInquiry.phone ||
                          "—"}
                      </a>
                    </div>

                  </div>

                </div>

              </div>


              {/* PRODUCT */}

              <div className="rounded-xl border border-slate-200 p-5">

                <h3 className="font-semibold text-slate-900">
                  Product Request
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">

                  <div>

                    <p className="text-xs text-slate-400">
                      Product
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedInquiry.product_name ||
                        selectedInquiry.product_slug ||
                        "General Inquiry"}
                    </p>

                  </div>


                  <div>

                    <p className="text-xs text-slate-400">
                      Quantity
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedInquiry.quantity ||
                        "—"}
                    </p>

                  </div>

                </div>

              </div>


              {/* MESSAGE */}

              {selectedInquiry.message && (

                <div className="rounded-xl border border-slate-200 p-5">

                  <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                    <MessageSquare
                      size={17}
                      className="text-blue-600"
                    />
                    Message
                  </h3>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                    {selectedInquiry.message}
                  </p>

                </div>

              )}


              {/* STATUS */}

              <div className="rounded-xl border border-slate-200 p-5">

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                  <div>

                    <h3 className="font-semibold text-slate-900">
                      Request Status
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Change the progress of this request.
                    </p>

                  </div>

                  <select
                    value={
                      selectedInquiry.status ||
                      "new"
                    }
                    disabled={
                      updatingId ===
                      selectedInquiry.id
                    }
                    onChange={(event) =>
                      updateStatus(
                        selectedInquiry,
                        event.target.value
                      )
                    }
                    className={`rounded-full border-0 px-4 py-2 text-sm font-semibold outline-none ${getStatusClass(
                      selectedInquiry.status ||
                        "new"
                    )}`}
                  >

                    {STATUS_OPTIONS.map(
                      (status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status
                            .charAt(0)
                            .toUpperCase() +
                            status.slice(1)}
                        </option>
                      )
                    )}

                  </select>

                </div>

              </div>


              {/* DATE */}

              <div className="flex items-center gap-3 text-sm text-slate-500">

                <CalendarDays
                  size={17}
                  className="text-slate-400"
                />

                Submitted:

                <span className="font-medium text-slate-700">
                  {formatDate(
                    selectedInquiry.created_at
                  )}
                </span>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminOrders;

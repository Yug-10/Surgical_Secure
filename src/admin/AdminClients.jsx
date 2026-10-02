
// import { useEffect, useState } from "react";
// import {
//   Plus,
//   Search,
//   Pencil,
//   Trash2,
//   ExternalLink,
//   Users,
//   X,
// } from "lucide-react";

// function AdminClients() {
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");

//   const [showForm, setShowForm] = useState(false);
//   const [editingClient, setEditingClient] = useState(null);

//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const emptyForm = {
//     name: "",
//     slug: "",
//     logo_url: "",
//     website: "",
//     description: "",
//     status: "published",
//   };

//   const [formData, setFormData] = useState(emptyForm);


//   // ==========================================
//   // GET CLIENTS
//   // ==========================================

//   const fetchClients = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await fetch(
//         "http://localhost:5000/api/clients"
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to load clients"
//         );
//       }

//       setClients(data.clients || []);

//     } catch (err) {
//       console.error("Clients error:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     fetchClients();
//   }, []);


//   // ==========================================
//   // SLUG
//   // ==========================================

//   const generateSlug = (value) => {
//     return value
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/^-+|-+$/g, "");
//   };


//   // ==========================================
//   // FORM
//   // ==========================================

//   const handleNameChange = (e) => {
//     const value = e.target.value;

//     setFormData((prev) => ({
//       ...prev,
//       name: value,
//       slug: editingClient
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
//   // ADD
//   // ==========================================

//   const openAddForm = () => {
//     setEditingClient(null);
//     setFormData(emptyForm);
//     setMessage("");
//     setError("");
//     setShowForm(true);
//   };


//   // ==========================================
//   // EDIT
//   // ==========================================

//   const openEditForm = (client) => {
//     setEditingClient(client);

//     setFormData({
//       name: client.name || "",
//       slug: client.slug || "",
//       logo_url: client.logo_url || "",
//       website: client.website || "",
//       description: client.description || "",
//       status: client.status || "published",
//     });

//     setMessage("");
//     setError("");
//     setShowForm(true);
//   };


//   // ==========================================
//   // SAVE
//   // ==========================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setSaving(true);
//       setError("");
//       setMessage("");
// const url = editingClient
//   ? `http://localhost:5000/api/clients/admin/${editingClient.id}`
//   : "http://localhost:5000/api/clients/admin";

//       const method = editingClient
//         ? "PUT"
//         : "POST";

//       const response = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to save client"
//         );
//       }

//       setMessage(
//         editingClient
//           ? "Client updated successfully."
//           : "Client added successfully."
//       );

//       setShowForm(false);
//       setEditingClient(null);
//       setFormData(emptyForm);

//       await fetchClients();

//     } catch (err) {
//       console.error("Save client error:", err);
//       setError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   };


//   // ==========================================
//   // DELETE
//   // ==========================================

//   const handleDelete = async (client) => {
//     const confirmed = window.confirm(
//       `Delete "${client.name}"?`
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       setError("");
//       setMessage("");

//       const response = await fetch(
//         `http://localhost:5000/api/admin/clients/${client.id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to delete client"
//         );
//       }

//       setMessage("Client deleted successfully.");

//       setClients((prev) =>
//         prev.filter(
//           (item) => item.id !== client.id
//         )
//       );

//     } catch (err) {
//       console.error("Delete client error:", err);
//       setError(err.message);
//     }
//   };


//   // ==========================================
//   // SEARCH
//   // ==========================================

//   const filteredClients = clients.filter((client) => {
//     const value = search.toLowerCase();

//     return (
//       client.name
//         ?.toLowerCase()
//         .includes(value) ||
//       client.description
//         ?.toLowerCase()
//         .includes(value)
//     );
//   });


//   return (
//     <div className="min-h-full bg-slate-100">

//       {/* HEADER */}

//       <div className="border-b border-slate-200 bg-white">

//         <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

//           <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

//             <div>

//               <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
//                 Management
//               </p>

//               <h1 className="mt-1 text-3xl font-bold text-slate-900">
//                 Clients
//               </h1>

//               <p className="mt-2 text-sm text-slate-500">
//                 Manage the clients displayed on your website.
//               </p>

//             </div>


//             <button
//               onClick={openAddForm}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
//             >
//               <Plus size={18} />
//               Add Client
//             </button>

//           </div>

//         </div>

//       </div>


//       {/* CONTENT */}

//       <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

//         {/* MESSAGES */}

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


//         {/* SEARCH */}

//         <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">

//           <div className="relative">

//             <Search
//               size={18}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//             />

//             <input
//               type="text"
//               placeholder="Search clients..."
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//               className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//             />

//           </div>

//         </div>


//         {/* LOADING */}

//         {loading && (

//           <div className="rounded-2xl bg-white p-16 text-center shadow-sm ring-1 ring-slate-200">

//             <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

//             <p className="mt-4 text-sm text-slate-500">
//               Loading clients...
//             </p>

//           </div>

//         )}


//         {/* EMPTY */}

//         {!loading &&
//           filteredClients.length === 0 && (

//             <div className="rounded-2xl bg-white p-16 text-center shadow-sm ring-1 ring-slate-200">

//               <Users
//                 size={42}
//                 className="mx-auto text-slate-300"
//               />

//               <h2 className="mt-4 text-lg font-bold text-slate-900">
//                 No clients found
//               </h2>

//               <p className="mt-2 text-sm text-slate-500">
//                 Add your first client to get started.
//               </p>

//               <button
//                 onClick={openAddForm}
//                 className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
//               >
//                 <Plus size={17} />
//                 Add Client
//               </button>

//             </div>
//           )}


//         {/* CLIENT GRID */}

//         {!loading &&
//           filteredClients.length > 0 && (

//             <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

//               {filteredClients.map((client) => (

//                 <div
//                   key={client.id}
//                   className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
//                 >

//                   {/* LOGO */}

//                   <div className="flex h-40 items-center justify-center bg-slate-50 p-8">

//                     {client.logo_url ? (

//                       <img
//                         src={client.logo_url}
//                         alt={client.name}
//                         className="max-h-full max-w-full object-contain"
//                       />

//                     ) : (

//                       <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-bold text-blue-600">
//                         {client.name
//                           ?.slice(0, 2)
//                           .toUpperCase()}
//                       </div>

//                     )}

//                   </div>


//                   {/* INFO */}

//                   <div className="p-5">

//                     <div className="flex items-start justify-between gap-3">

//                       <div>

//                         <h2 className="font-bold text-slate-900">
//                           {client.name}
//                         </h2>

//                         <span
//                           className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
//                             client.status === "published"
//                               ? "bg-green-50 text-green-700"
//                               : "bg-yellow-50 text-yellow-700"
//                           }`}
//                         >
//                           {client.status}
//                         </span>

//                       </div>

//                     </div>


//                     {client.description && (

//                       <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
//                         {client.description}
//                       </p>

//                     )}


//                     {/* ACTIONS */}

//                     <div className="mt-5 flex gap-2">

//                       {client.website && (

//                         <a
//                           href={client.website}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
//                         >
//                           <ExternalLink size={14} />
//                           Website
//                         </a>

//                       )}

//                       <button
//                         onClick={() =>
//                           openEditForm(client)
//                         }
//                         className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
//                       >
//                         <Pencil size={16} />
//                       </button>

//                       <button
//                         onClick={() =>
//                           handleDelete(client)
//                         }
//                         className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
//                       >
//                         <Trash2 size={16} />
//                       </button>

//                     </div>

//                   </div>

//                 </div>

//               ))}

//             </div>
//           )}

//       </main>


//       {/* ADD / EDIT MODAL */}

//       {showForm && (

//         <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">

//           <div className="flex min-h-full items-center justify-center">

//             <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">

//               {/* HEADER */}

//               <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

//                 <div>

//                   <h2 className="text-xl font-bold text-slate-900">
//                     {editingClient
//                       ? "Edit Client"
//                       : "Add Client"}
//                   </h2>

//                   <p className="mt-1 text-sm text-slate-500">
//                     Add information about the client.
//                   </p>

//                 </div>

//                 <button
//                   onClick={() =>
//                     setShowForm(false)
//                   }
//                   className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
//                 >
//                   <X size={20} />
//                 </button>

//               </div>


//               {/* FORM */}

//               <form
//                 onSubmit={handleSubmit}
//                 className="p-6"
//               >

//                 <div className="grid gap-5 md:grid-cols-2">

//                   {/* NAME */}

//                   <div>

//                     <label className="mb-2 block text-sm font-semibold text-slate-700">
//                       Client Name *
//                     </label>

//                     <input
//                       name="name"
//                       value={formData.name}
//                       onChange={handleNameChange}
//                       required
//                       placeholder="ABC Healthcare"
//                       className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />

//                   </div>


//                   {/* SLUG */}

//                   <div>

//                     <label className="mb-2 block text-sm font-semibold text-slate-700">
//                       Slug *
//                     </label>

//                     <input
//                       name="slug"
//                       value={formData.slug}
//                       onChange={handleChange}
//                       required
//                       placeholder="abc-healthcare"
//                       className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />

//                   </div>


//                   {/* LOGO */}

//                   <div className="md:col-span-2">

//                     <label className="mb-2 block text-sm font-semibold text-slate-700">
//                       Logo URL
//                     </label>

//                     <input
//                       name="logo_url"
//                       value={formData.logo_url}
//                       onChange={handleChange}
//                       placeholder="/images/clients/abc.png"
//                       className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />

//                   </div>


//                   {/* WEBSITE */}

//                   <div className="md:col-span-2">

//                     <label className="mb-2 block text-sm font-semibold text-slate-700">
//                       Website
//                     </label>

//                     <input
//                       name="website"
//                       value={formData.website}
//                       onChange={handleChange}
//                       placeholder="https://example.com"
//                       className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />

//                   </div>


//                   {/* DESCRIPTION */}

//                   <div className="md:col-span-2">

//                     <label className="mb-2 block text-sm font-semibold text-slate-700">
//                       Description
//                     </label>

//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       rows="4"
//                       placeholder="Client description..."
//                       className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                     />

//                   </div>


//                   {/* STATUS */}

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


//                 {/* BUTTONS */}

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
//                       : editingClient
//                       ? "Update Client"
//                       : "Add Client"}
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

// export default AdminClients;

import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ExternalLink,
  Users,
  X,
} from "lucide-react";

function AdminClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const emptyForm = {
    name: "",
    slug: "",
    logo_url: "",
    website: "",
    description: "",
    status: "published",
  };

  const [formData, setFormData] = useState(emptyForm);


  // =====================================================
  // GET CLIENTS
  // =====================================================

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/clients"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load clients"
        );
      }

      setClients(data.clients || []);

    } catch (err) {
      console.error("Clients error:", err);
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchClients();
  }, []);


  // =====================================================
  // GENERATE SLUG
  // =====================================================

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };


  // =====================================================
  // NAME CHANGE
  // =====================================================

  const handleNameChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: editingClient
        ? prev.slug
        : generateSlug(value),
    }));
  };


  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // =====================================================
  // OPEN ADD FORM
  // =====================================================

  const openAddForm = () => {
    setEditingClient(null);
    setFormData(emptyForm);
    setMessage("");
    setError("");
    setShowForm(true);
  };


  // =====================================================
  // OPEN EDIT FORM
  // =====================================================

  const openEditForm = (client) => {
    setEditingClient(client);

    setFormData({
      name: client.name || "",
      slug: client.slug || "",
      logo_url: client.logo_url || "",
      website: client.website || "",
      description: client.description || "",
      status: client.status || "published",
    });

    setMessage("");
    setError("");
    setShowForm(true);
  };


  // =====================================================
  // ADD / UPDATE CLIENT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      // -----------------------------------------------
      // CORRECT API URL
      // -----------------------------------------------

      const url = editingClient
        ? `http://localhost:5000/api/clients/admin/${editingClient.id}`
        : "http://localhost:5000/api/clients/admin";

      const method = editingClient
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save client"
        );
      }

      setMessage(
        editingClient
          ? "Client updated successfully."
          : "Client added successfully."
      );

      setShowForm(false);
      setEditingClient(null);
      setFormData(emptyForm);

      await fetchClients();

    } catch (err) {
      console.error("Save client error:", err);
      setError(err.message);

    } finally {
      setSaving(false);
    }
  };


  // =====================================================
  // DELETE CLIENT
  // =====================================================

  const handleDelete = async (client) => {
    const confirmed = window.confirm(
      `Delete "${client.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      // -----------------------------------------------
      // CORRECT DELETE API URL
      // -----------------------------------------------

      const response = await fetch(
        `http://localhost:5000/api/clients/admin/${client.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete client"
        );
      }

      setMessage("Client deleted successfully.");

      setClients((prev) =>
        prev.filter(
          (item) => item.id !== client.id
        )
      );

    } catch (err) {
      console.error("Delete client error:", err);
      setError(err.message);
    }
  };


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredClients = clients.filter((client) => {
    const value = search.toLowerCase();

    return (
      client.name
        ?.toLowerCase()
        .includes(value) ||
      client.description
        ?.toLowerCase()
        .includes(value)
    );
  });


  return (
    <div className="min-h-full bg-slate-100">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Management
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                Clients
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage the clients displayed on your website.
              </p>

            </div>

            <button
              onClick={openAddForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Client
            </button>

          </div>

        </div>

      </div>


      {/* =================================================
          MAIN
      ================================================= */}

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

        {/* SUCCESS MESSAGE */}

        {message && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
            {message}
          </div>
        )}


        {/* ERROR MESSAGE */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}


        {/* SEARCH */}

        <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search clients..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="rounded-2xl bg-white p-16 text-center shadow-sm ring-1 ring-slate-200">

            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading clients...
            </p>

          </div>

        )}


        {/* EMPTY */}

        {!loading &&
          filteredClients.length === 0 && (

            <div className="rounded-2xl bg-white p-16 text-center shadow-sm ring-1 ring-slate-200">

              <Users
                size={42}
                className="mx-auto text-slate-300"
              />

              <h2 className="mt-4 text-lg font-bold text-slate-900">
                No clients found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Add your first client to get started.
              </p>

              <button
                onClick={openAddForm}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={17} />
                Add Client
              </button>

            </div>
          )}


        {/* CLIENT GRID */}

        {!loading &&
          filteredClients.length > 0 && (

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {filteredClients.map((client) => (

                <div
                  key={client.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
                >

                  {/* LOGO */}

                  <div className="flex h-40 items-center justify-center bg-slate-50 p-8">

                    {client.logo_url ? (

                      <img
                        src={client.logo_url}
                        alt={client.name}
                        className="max-h-full max-w-full object-contain"
                      />

                    ) : (

                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-bold text-blue-600">
                        {client.name
                          ?.slice(0, 2)
                          .toUpperCase()}
                      </div>

                    )}

                  </div>


                  {/* CLIENT INFO */}

                  <div className="p-5">

                    <h2 className="font-bold text-slate-900">
                      {client.name}
                    </h2>

                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        client.status === "published"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {client.status}
                    </span>


                    {client.description && (

                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
                        {client.description}
                      </p>

                    )}


                    {/* ACTIONS */}

                    <div className="mt-5 flex gap-2">

                      {client.website && (

                        <a
                          href={client.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                        >
                          <ExternalLink size={14} />
                          Website
                        </a>

                      )}

                      <button
                        onClick={() =>
                          openEditForm(client)
                        }
                        className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(client)
                        }
                        className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

      </main>


      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {showForm && (

        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">

          <div className="flex min-h-full items-center justify-center">

            <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">

              {/* MODAL HEADER */}

              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    {editingClient
                      ? "Edit Client"
                      : "Add Client"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Add information about the client.
                  </p>

                </div>

                <button
                  onClick={() =>
                    setShowForm(false)
                  }
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={20} />
                </button>

              </div>


              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="p-6"
              >

                <div className="grid gap-5 md:grid-cols-2">

                  {/* NAME */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Client Name *
                    </label>

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleNameChange}
                      required
                      placeholder="ABC Healthcare"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>


                  {/* SLUG */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Slug *
                    </label>

                    <input
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      required
                      placeholder="abc-healthcare"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>


                  {/* LOGO */}

                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Logo URL
                    </label>

                    <input
                      name="logo_url"
                      value={formData.logo_url}
                      onChange={handleChange}
                      placeholder="/images/clients/abc.png"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>


                  {/* WEBSITE */}

                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Website
                    </label>

                    <input
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>


                  {/* DESCRIPTION */}

                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Client description..."
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>


                  {/* STATUS */}

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

                      <option value="published">
                        Published
                      </option>

                      <option value="draft">
                        Draft
                      </option>

                    </select>

                  </div>

                </div>


                {/* FORM BUTTONS */}

                <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-6">

                  <button
                    type="button"
                    onClick={() =>
                      setShowForm(false)
                    }
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
                      : editingClient
                      ? "Update Client"
                      : "Add Client"}
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

export default AdminClients;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function AdminLogin() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/admin/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//             password,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Login failed"
//         );
//       }

//       // Save authentication information
//       localStorage.setItem(
//         "adminToken",
//         data.token
//       );

//       localStorage.setItem(
//         "adminUser",
//         JSON.stringify(data.admin)
//       );

//       navigate("/admin/dashboard");

//     } catch (error) {
//       console.error("Login error:", error);

//       setError(
//         error.message ||
//         "Unable to login"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

//       <div className="w-full max-w-md">

//         {/* Logo */}
//         <div className="mb-8 text-center">
//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">
//             SS
//           </div>

//           <h1 className="mt-5 text-3xl font-bold text-white">
//             Surgical Secure
//           </h1>

//           <p className="mt-2 text-sm text-slate-400">
//             Administration Portal
//           </p>
//         </div>

//         {/* Login Card */}
//         <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">

//           <h2 className="text-2xl font-semibold text-white">
//             Admin Login
//           </h2>

//           <p className="mt-2 text-sm text-slate-400">
//             Sign in to manage your website.
//           </p>

//           {error && (
//             <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
//               {error}
//             </div>
//           )}

//           <form
//             onSubmit={handleSubmit}
//             className="mt-8 space-y-5"
//           >

//             {/* Email */}
//             <div>
//               <label className="mb-2 block text-sm font-medium text-slate-300">
//                 Email
//               </label>

//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) =>
//                   setEmail(e.target.value)
//                 }
//                 placeholder="admin@surgicalsecure.com"
//                 required
//                 className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="mb-2 block text-sm font-medium text-slate-300">
//                 Password
//               </label>

//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) =>
//                   setPassword(e.target.value)
//                 }
//                 placeholder="Enter your password"
//                 required
//                 className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
//               />
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading
//                 ? "Signing in..."
//                 : "Sign In"}
//             </button>

//           </form>

//         </div>

//         <p className="mt-6 text-center text-xs text-slate-600">
//           Surgical Secure Admin Portal
//         </p>

//       </div>

//     </main>
//   );
// }

// export default AdminLogin;


import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // Save JWT token
      localStorage.setItem(
        "adminToken",
        data.token
      );

      // Save admin information
      localStorage.setItem(
        "adminUser",
        JSON.stringify(data.admin)
      );

      // Go to admin dashboard
      navigate("/admin/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.message || "Unable to login"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">

      <div className="w-full max-w-md">

        {/* Logo */}

        <div className="mb-8 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-900/30">
            SS
          </div>

          <h1 className="mt-5 text-3xl font-bold text-white">
            Surgical Secure
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Administration Portal
          </p>

        </div>


        {/* Login Card */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">

          <h2 className="text-2xl font-semibold text-white">
            Admin Login
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to manage your website.
          </p>


          {/* Error */}

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}


          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Username */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="SSadmin"
                required
                autoComplete="username"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

            </div>


            {/* Password */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

            </div>


            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </form>

        </div>


        {/* Footer */}

        <p className="mt-6 text-center text-xs text-slate-600">
          Surgical Secure Admin Portal
        </p>

      </div>

    </main>
  );
}

export default AdminLogin;

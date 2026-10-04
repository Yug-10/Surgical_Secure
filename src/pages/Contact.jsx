// import {
//   Mail,
//   Phone,
//   MapPin,
//   Clock,
// } from "lucide-react";

// function Contact() {
//   return (
//     <main className="bg-white">

//       {/* Hero */}
//       <section className="bg-slate-50 py-24">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="max-w-3xl">
//             <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
//               Contact Us
//             </p>

//             <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
//               Let's discuss your requirements
//             </h1>

//             <p className="mt-6 text-lg leading-8 text-slate-600">
//               Contact Surgical Secure for product information,
//               quotation requests, distribution inquiries, or general
//               business enquiries.
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="py-24">
//         <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">

//           {/* Information */}
//           <div>

//             <h2 className="text-3xl font-bold text-slate-900">
//               Get in touch
//             </h2>

//             <p className="mt-5 leading-7 text-slate-600">
//               Our team is available to discuss your product
//               requirements and answer your questions.
//             </p>

//             <div className="mt-10 space-y-6">

//               <div className="flex gap-4">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                   <Mail size={22} />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-slate-900">
//                     Email
//                   </p>

//                   <a
//                     href="mailto:info@surgicalsecure.com"
//                     className="mt-1 block text-slate-600 hover:text-blue-600"
//                   >
//                     info@surgicalsecure.com
//                   </a>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                   <Phone size={22} />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-slate-900">
//                     Phone
//                   </p>

//                   <a
//                     href="tel:+910000000000"
//                     className="mt-1 block text-slate-600 hover:text-blue-600"
//                   >
//                     +91 00000 00000
//                   </a>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                   <MapPin size={22} />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-slate-900">
//                     Address
//                   </p>

//                   <p className="mt-1 text-slate-600">
//                     Your company address
//                     <br />
//                     Gujarat, India
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                   <Clock size={22} />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-slate-900">
//                     Business Hours
//                   </p>

//                   <p className="mt-1 text-slate-600">
//                     Monday – Saturday
//                     <br />
//                     9:00 AM – 6:00 PM
//                   </p>
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="rounded-3xl bg-slate-50 p-6 sm:p-10">

//             <h2 className="text-2xl font-bold text-slate-900">
//               Send us a message
//             </h2>

//             <form className="mt-8 space-y-5">

//               <div>
//                 <label className="text-sm font-semibold text-slate-700">
//                   Name *
//                 </label>

//                 <input
//                   type="text"
//                   required
//                   placeholder="Your name"
//                   className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-semibold text-slate-700">
//                   Email *
//                 </label>

//                 <input
//                   type="email"
//                   required
//                   placeholder="you@company.com"
//                   className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-semibold text-slate-700">
//                   Subject
//                 </label>

//                 <input
//                   type="text"
//                   placeholder="How can we help?"
//                   className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-semibold text-slate-700">
//                   Message *
//                 </label>

//                 <textarea
//                   rows="5"
//                   required
//                   placeholder="Write your message..."
//                   className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
//               >
//                 Send Message
//               </button>

//             </form>

//           </div>

//         </div>
//       </section>

//     </main>
//   );
// }

// export default Contact;


// import {
//   Mail,
//   Phone,
//   MapPin,
//   Clock,
//   CheckCircle,
//   AlertCircle,
// } from "lucide-react";

// import { useState } from "react";

// function Contact() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setSuccess("");
//     setError("");

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/inquiries",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             name: form.name,
//             email: form.email,

//             // Map contact form fields
//             product: form.subject || "General Inquiry",
//             requirements: form.message,

//             // Required by your inquiry API
//             quantity: 1,

//             // Optional fields
//             company: null,
//             phone: null,
//             country: null,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message ||
//             "Failed to send your message."
//         );
//       }

//       setSuccess(
//         "Thank you. Your message has been sent successfully. Our team will contact you soon."
//       );

//       setForm({
//         name: "",
//         email: "",
//         subject: "",
//         message: "",
//       });

//     } catch (err) {
//       console.error("Contact form error:", err);

//       setError(
//         err.message ||
//           "Unable to send your message. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="bg-white">

//       {/* Hero */}
//       <section className="bg-slate-50 py-24">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="max-w-3xl">

//             <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
//               Contact Us
//             </p>

//             <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
//               Let's discuss your requirements
//             </h1>

//             <p className="mt-6 text-lg leading-8 text-slate-600">
//               Contact Surgical Secure for product information,
//               quotation requests, distribution inquiries, or
//               general business enquiries.
//             </p>

//           </div>

//         </div>
//       </section>


//       {/* Contact Section */}
//       <section className="py-24">

//         <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">


//           {/* Information */}
//           <div>

//             <h2 className="text-3xl font-bold text-slate-900">
//               Get in touch
//             </h2>

//             <p className="mt-5 leading-7 text-slate-600">
//               Our team is available to discuss your product
//               requirements and answer your questions.
//             </p>


//             <div className="mt-10 space-y-6">


//               {/* Email */}
//               <div className="flex gap-4">

//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                   <Mail size={22} />
//                 </div>

//                 <div>

//                   <p className="font-semibold text-slate-900">
//                     Email
//                   </p>

//                   <a
//                     href="mailto:info@surgicalsecure.com"
//                     className="mt-1 block text-slate-600 hover:text-blue-600"
//                   >
//                     info@surgicalsecure.com
//                   </a>

//                 </div>

//               </div>


//               {/* Phone */}
//               <div className="flex gap-4">

//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                   <Phone size={22} />
//                 </div>

//                 <div>

//                   <p className="font-semibold text-slate-900">
//                     Phone
//                   </p>

//                   <a
//                     href="tel:+910000000000"
//                     className="mt-1 block text-slate-600 hover:text-blue-600"
//                   >
//                     +91 00000 00000
//                   </a>

//                 </div>

//               </div>


//               {/* Address */}
//               <div className="flex gap-4">

//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                   <MapPin size={22} />
//                 </div>

//                 <div>

//                   <p className="font-semibold text-slate-900">
//                     Address
//                   </p>

//                   <p className="mt-1 text-slate-600">
//                     Your company address
//                     <br />
//                     Gujarat, India
//                   </p>

//                 </div>

//               </div>


//               {/* Business Hours */}
//               <div className="flex gap-4">

//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                   <Clock size={22} />
//                 </div>

//                 <div>

//                   <p className="font-semibold text-slate-900">
//                     Business Hours
//                   </p>

//                   <p className="mt-1 text-slate-600">
//                     Monday – Saturday
//                     <br />
//                     9:00 AM – 6:00 PM
//                   </p>

//                 </div>

//               </div>

//             </div>

//           </div>


//           {/* Contact Form */}
//           <div className="rounded-3xl bg-slate-50 p-6 sm:p-10">

//             <h2 className="text-2xl font-bold text-slate-900">
//               Send us a message
//             </h2>


//             {/* Success */}
//             {success && (
//               <div className="mt-6 flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">

//                 <CheckCircle
//                   size={20}
//                   className="shrink-0"
//                 />

//                 <p>
//                   {success}
//                 </p>

//               </div>
//             )}


//             {/* Error */}
//             {error && (
//               <div className="mt-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

//                 <AlertCircle
//                   size={20}
//                   className="shrink-0"
//                 />

//                 <p>
//                   {error}
//                 </p>

//               </div>
//             )}


//             <form
//               onSubmit={handleSubmit}
//               className="mt-8 space-y-5"
//             >


//               {/* Name */}
//               <div>

//                 <label className="text-sm font-semibold text-slate-700">
//                   Name *
//                 </label>

//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                   placeholder="Your name"
//                   className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />

//               </div>


//               {/* Email */}
//               <div>

//                 <label className="text-sm font-semibold text-slate-700">
//                   Email *
//                 </label>

//                 <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                   placeholder="you@company.com"
//                   className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />

//               </div>


//               {/* Subject */}
//               <div>

//                 <label className="text-sm font-semibold text-slate-700">
//                   Subject
//                 </label>

//                 <input
//                   type="text"
//                   name="subject"
//                   value={form.subject}
//                   onChange={handleChange}
//                   placeholder="How can we help?"
//                   className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />

//               </div>


//               {/* Message */}
//               <div>

//                 <label className="text-sm font-semibold text-slate-700">
//                   Message *
//                 </label>

//                 <textarea
//                   name="message"
//                   value={form.message}
//                   onChange={handleChange}
//                   rows="5"
//                   required
//                   placeholder="Write your message..."
//                   className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />

//               </div>


//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {loading
//                   ? "Sending..."
//                   : "Send Message"}
//               </button>

//             </form>

//           </div>

//         </div>

//       </section>

//     </main>
//   );
// }

// export default Contact;





import { useState } from "react";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send your message."
        );
      }

      setSuccess(
        "Thank you. Your message has been sent successfully. Our team will contact you soon."
      );

      setForm({
        name: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact form error:", err);

      setError(
        err.message ||
          "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Contact Us
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Let's discuss your requirements
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Contact Surgical Secure for product information,
              quotation requests, distribution inquiries, or
              general business enquiries.
            </p>

          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">

          {/* Contact Information */}
          <div>

            <h2 className="text-3xl font-bold text-slate-900">
              Get in touch
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Our team is available to discuss your product
              requirements and answer your questions.
            </p>

            <div className="mt-10 space-y-6">

              {/* Email */}
              <div className="flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Mail size={22} />
                </div>

                <div>

                  <p className="font-semibold text-slate-900">
                    Email
                  </p>

                  <a
                    href="mailto:info@surgicalsecure.com"
                    className="mt-1 block text-slate-600 hover:text-blue-600"
                  >
                    info@surgicalsecure.com
                  </a>

                </div>

              </div>

              {/* Phone */}
              <div className="flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Phone size={22} />
                </div>

                <div>

                  <p className="font-semibold text-slate-900">
                    Phone
                  </p>

                  <a
                    href="tel:+910000000000"
                    className="mt-1 block text-slate-600 hover:text-blue-600"
                  >
                    +91 00000 00000
                  </a>

                </div>

              </div>

              {/* Address */}
              <div className="flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <MapPin size={22} />
                </div>

                <div>

                  <p className="font-semibold text-slate-900">
                    Address
                  </p>

                  <p className="mt-1 text-slate-600">
                    Your company address
                    <br />
                    Gujarat, India
                  </p>

                </div>

              </div>

              {/* Business Hours */}
              <div className="flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Clock size={22} />
                </div>

                <div>

                  <p className="font-semibold text-slate-900">
                    Business Hours
                  </p>

                  <p className="mt-1 text-slate-600">
                    Monday – Saturday
                    <br />
                    9:00 AM – 6:00 PM
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Contact Form */}
          <div className="rounded-3xl bg-slate-50 p-6 sm:p-10">

            <h2 className="text-2xl font-bold text-slate-900">
              Send us a message
            </h2>

            {/* Success Message */}
            {success && (
              <div className="mt-6 flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">

                <CheckCircle
                  size={20}
                  className="shrink-0"
                />

                <p>{success}</p>

              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

                <AlertCircle
                  size={20}
                  className="shrink-0"
                />

                <p>{error}</p>

              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Name */}
              <div>

                <label className="text-sm font-semibold text-slate-700">
                  Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Email */}
              <div>

                <label className="text-sm font-semibold text-slate-700">
                  Email *
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@company.com"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Company */}
              <div>

                <label className="text-sm font-semibold text-slate-700">
                  Company
                </label>

                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Phone */}
              <div>

                <label className="text-sm font-semibold text-slate-700">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Subject */}
              <div>

                <label className="text-sm font-semibold text-slate-700">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Message */}
              <div>

                <label className="text-sm font-semibold text-slate-700">
                  Message *
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  placeholder="Write your message..."
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Sending..."
                  : "Send Message"}
              </button>

            </form>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Contact;
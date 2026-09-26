import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

function RequestQuote() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      product: formData.get("product"),
      quantity: formData.get("quantity"),
      requirements: formData.get("requirements"),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/inquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to submit inquiry."
        );
      }

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Request a Quote
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Tell us what you need
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Send us your product requirements and our team will
            get back to you with pricing and availability.
          </p>
        </div>

        {/* Form Card */}
        <div className="mx-auto mt-12 max-w-4xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-10">

          {/* Success */}
          {submitted ? (
            <div className="py-16 text-center">

              <CheckCircle2
                size={56}
                className="mx-auto text-green-600"
              />

              <h2 className="mt-6 text-2xl font-bold text-slate-900">
                Quote Request Received
              </h2>

              <p className="mx-auto mt-3 max-w-md text-slate-600">
                Thank you for contacting Surgical Secure.
                Our team will review your requirements and
                contact you shortly.
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setError("");
                }}
                className="mt-8 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Submit Another Request
              </button>
            </div>
          ) : (

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Contact Information
                </h2>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">

                  {/* Name */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Company Name
                    </label>

                    <input
                      type="text"
                      name="company"
                      placeholder="Your company"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                      required
                      placeholder="you@company.com"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Phone *
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Country */}
                  <div className="sm:col-span-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Country
                    </label>

                    <input
                      type="text"
                      name="country"
                      placeholder="India"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                </div>
              </div>

              {/* Product Requirements */}
              <div className="border-t border-slate-200 pt-8">

                <h2 className="text-xl font-bold text-slate-900">
                  Product Requirements
                </h2>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">

                  {/* Product */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Product *
                    </label>

                    <select
                      name="product"
                      required
                      defaultValue=""
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="" disabled>
                        Select a product
                      </option>

                      <option value="IV Infusion Set">
                        IV Infusion Set
                      </option>

                      <option value="Latex Bulb">
                        Latex Bulb
                      </option>

                      <option value="Simple Latex Products">
                        Simple Latex Products
                      </option>

                      <option value="Other">
                        Other / Custom Requirement
                      </option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="text-sm font-semibold text-slate-700">
                      Quantity *
                    </label>

                    <input
                      type="text"
                      name="quantity"
                      required
                      placeholder="e.g. 10,000 pieces"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Requirements */}
                  <div className="sm:col-span-2">

                    <label className="text-sm font-semibold text-slate-700">
                      Requirements / Specifications
                    </label>

                    <textarea
                      name="requirements"
                      rows="5"
                      placeholder="Please describe your required specifications, packaging, sizes, standards, delivery requirements, etc."
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                </div>
              </div>

              {/* Submit */}
              <div className="border-t border-slate-200 pt-8">

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Sending...
                    </>
                  ) : (
                    "Send Quote Request"
                  )}
                </button>

                <p className="mt-4 text-sm text-slate-500">
                  By submitting this form, you agree that our
                  team may contact you regarding your inquiry.
                </p>

              </div>

            </form>
          )}

        </div>
      </div>
    </main>
  );
}

export default RequestQuote;
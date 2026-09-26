import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

function Contact() {
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
              quotation requests, distribution inquiries, or general
              business enquiries.
            </p>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">

          {/* Information */}
          <div>

            <h2 className="text-3xl font-bold text-slate-900">
              Get in touch
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Our team is available to discuss your product
              requirements and answer your questions.
            </p>

            <div className="mt-10 space-y-6">

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

            <form className="mt-8 space-y-5">

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Name *
                </label>

                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Email *
                </label>

                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="How can we help?"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Message *
                </label>

                <textarea
                  rows="5"
                  required
                  placeholder="Write your message..."
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Contact;
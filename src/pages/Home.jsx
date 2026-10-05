import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Factory,
  PackageCheck,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import getImageUrl from "../utils/imageUrl";

const products = [
  {
    id: 1,
    slug: "iv-infusion-set",
    number: "01",
    name: "IV Infusion Sets",
    description:
      "Reliable infusion solutions designed for consistent medical use and dependable performance.",
    image: "/images/ivset.jpg",
  },
  {
    id: 2,
    slug: "latex-bulb",
    number: "02",
    name: "Latex Bulbs",
    description:
      "Quality latex components manufactured for medical and healthcare applications.",
    image: "/images/latexbulb.webp",
  },
  {
    id: 3,
    slug: "simple-latex",
    number: "03",
    name: "Latex Products",
    description:
      "A range of simple and customized latex products for healthcare requirements.",
    image: "/images/Gloves.webp",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Quality Focused",
    description:
      "Consistent product quality supported by defined manufacturing and inspection processes.",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description:
      "Built around reliable production processes and attention to product specifications.",
  },
  {
    icon: PackageCheck,
    title: "Bulk Supply",
    description:
      "Supporting distributors, healthcare businesses and institutional requirements.",
  },
  {
    icon: BadgeCheck,
    title: "Compliance",
    description:
      "Product and company documentation presented clearly for business customers.",
  },
];

const clients = [
  "CLIENT ONE",
  "CLIENT TWO",
  "CLIENT THREE",
  "CLIENT FOUR",
  "CLIENT FIVE",
  "CLIENT SIX",
];

const heroImages = [
  {
    src: "/images/ivset.jpg",
    title: "IV Infusion Sets",
    subtitle: "Reliable infusion solutions",
  },
  {
    src: "/images/latexbulb.webp",
    title: "Latex Bulbs",
    subtitle: "Medical latex components",
  },
  {
    src: "/images/Gloves.webp",
    title: "Surgical Products",
    subtitle: "Healthcare-focused solutions",
  },
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  // Automatically change hero image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  const previousImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);

  const [homeClients, setHomeClients] = useState([]);

  useEffect(() => {
    const fetchHomeClients = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/clients");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch clients");
        }

        const clientsForHome = (data.clients || []).filter(
          (client) =>
            client.status === "published" &&
            Number(client.show_on_homepage) === 1,
        );

        setHomeClients(clientsForHome);
      } catch (error) {
        console.error("Homepage clients error:", error);
      }
    };

    fetchHomeClients();
  }, []);

  return (
    <main className="bg-white">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[140px]" />

          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-16 px-5 py-24 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-32">
          {/* HERO CONTENT */}
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Surgical & Medical Product Manufacturer
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Precision in
              <span className="block text-slate-400">every product.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Surgical Secure provides reliable surgical and medical products
              with a focus on quality, consistency and dependable supply.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Explore Products
                <ArrowRight size={17} />
              </a>

              <a
                href="/request-quote"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Request a Quote
                <ArrowUpRight size={17} />
              </a>
            </div>

            {/* Small trust indicators */}
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Check size={15} className="text-emerald-400" />
                Medical Products
              </div>

              <div className="flex items-center gap-2">
                <Check size={15} className="text-emerald-400" />
                Bulk Supply
              </div>

              <div className="flex items-center gap-2">
                <Check size={15} className="text-emerald-400" />
                Business Inquiries
              </div>
            </div>
          </div>

          {/* HERO IMAGE CAROUSEL */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur">
              <div className="relative h-full overflow-hidden rounded-[1.5rem]">
                {/* Images */}
                {heroImages.map((image, index) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.title}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                      currentImage === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                {/* Image information */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                    Surgical Secure
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    {heroImages[currentImage].title}
                  </h3>

                  <p className="mt-1 text-sm text-white/60">
                    {heroImages[currentImage].subtitle}
                  </p>
                </div>

                {/* Previous button */}
                <button
                  type="button"
                  onClick={previousImage}
                  aria-label="Previous image"
                  className="absolute left-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
                >
                  <ChevronLeft size={19} />
                </button>

                {/* Next button */}
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
                >
                  <ChevronRight size={19} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-7 right-7 flex gap-2">
                  {heroImages.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setCurrentImage(index)}
                      aria-label={`Show ${image.title}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentImage === index
                          ? "w-7 bg-white"
                          : "w-2 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating quality card */}
            <div className="absolute -bottom-12 -right-3  rounded-2xl border border-white/10 bg-white/10 px-5 py-4 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">
                  <ShieldCheck size={21} className="text-emerald-400" />
                </div>

                <div>
                  <div className="text-lg font-semibold">Quality</div>

                  <div className="text-xs text-slate-400">
                    Built into every process
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ====================================================== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Our Products
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Medical products built for dependable performance
              </h2>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                Explore our range of surgical and medical products designed for
                healthcare applications.
              </p>
            </div>

            <a
              href="/products"
              className="inline-flex items-center font-semibold text-blue-600 transition hover:text-blue-700"
            >
              View all products
              <ArrowRight size={17} className="ml-2" />
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY SURGICAL SECURE
      ====================================================== */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
              Why Surgical Secure
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Built around quality, consistency and trust.
            </h2>

            <p className="mt-5 leading-7 text-slate-500">
              We focus on dependable products, clear communication and supply
              solutions for healthcare businesses.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-7 text-lg font-bold text-slate-950">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CLIENTS
      ====================================================== */}

      <section className="bg-slate-50 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Our Clients
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Trusted by healthcare organizations
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              We work with healthcare organizations and medical industry
              partners across different applications.
            </p>
          </div>

          {homeClients.length > 0 && (
            <div className="mt-14 overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex min-w-max items-center gap-6">
                {homeClients.map((client) => (
                  <div
                    key={client.id}
                    className="group flex h-44 items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    {client.logo_url ? (
                      <img
                        src={getImageUrl(client.logo_url)}
                        alt={client.name}
                        className="max-h-24 max-w-full object-contain transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 font-bold text-blue-600">
                          {client.name?.slice(0, 2).toUpperCase()}
                        </div>

                        <p className="mt-2 text-sm font-semibold text-slate-700">
                          {client.name}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {homeClients.length === 0 && (
            <div className="mt-12 text-center text-sm text-slate-500">
              No featured clients available.
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          CERTIFICATIONS
      ====================================================== */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
              Quality & Certifications
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Documentation you can trust.
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400">
              Access company certifications, product documentation, test reports
              and other relevant compliance information.
            </p>

            <a
              href="/certifications"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              View Certifications
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Quality Certificates",
              "Product Certifications",
              "Test Reports",
              "Compliance Documents",
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Check size={18} />
                </div>

                <p className="font-semibold">{item}</p>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Document {String(index + 1).padStart(2, "0")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
            Let's Work Together
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Looking for a reliable medical product supplier?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-500">
            Tell us what you need. Our team can help with product information,
            bulk requirements and business inquiries.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="/request-quote"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Request a Quote
              <ArrowUpRight size={17} />
            </a>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-7 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Contact Us
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

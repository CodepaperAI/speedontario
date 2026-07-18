import Link from "next/link";
import { SHOP } from "@/lib/shop";
import { listBlogs, formatDate } from "@/lib/upliftai";

export const revalidate = 300;

function BlogFallback() {
  return (
    <div className="w-full h-full speedy-fallback grid place-items-center">
      <div className="relative z-10 text-center px-6">
        <div className="font-display font-extrabold text-white/95 text-3xl md:text-4xl uppercase tracking-tight leading-none">
          Speedy
        </div>
        <div className="mt-1 font-display font-bold text-speedy-yellow text-xs uppercase tracking-widest">
          Auto Service
        </div>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const blogs = (await listBlogs({ limit: 3 })).slice(0, 3);

  return (
    <>
      <section className="stripe-hero text-white">
        <div className="container-x py-20 md:py-28 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-block bg-white/10 border border-white/25 text-xs uppercase tracking-widest px-3 py-1 rounded-sm mb-5">
              Serving St. Catharines
            </div>
            <h1 className="font-display font-extrabold uppercase leading-[0.95] text-5xl md:text-7xl tracking-tight">
              Back on the road.
              <br />
              <span className="text-speedy-yellow">Safely. Quickly.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-xl text-white/90 leading-relaxed">
              Family-run auto service on Hartzel Road. Honest pricing, straight answers, and every job done right the first time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${SHOP.phoneHref}`}
                className="inline-flex items-center gap-2 bg-speedy-yellow text-speedy-blue-dark font-bold uppercase tracking-wide px-6 py-3.5 rounded-sm hover:bg-white transition"
              >
                Call {SHOP.phone}
              </a>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white font-bold uppercase tracking-wide px-6 py-3.5 rounded-sm hover:bg-white hover:text-speedy-blue transition"
              >
                Read the blog
              </Link>
            </div>
          </div>

          <div className="bg-white text-speedy-black rounded-sm p-7 shadow-2xl border-t-4 border-speedy-yellow">
            <div className="text-xs font-bold uppercase tracking-widest text-speedy-blue">Visit our shop</div>
            <div className="mt-2 font-display font-bold text-2xl leading-tight text-speedy-blue">76 Hartzel Road<br />St. Catharines, ON</div>
            <ul className="mt-5 text-sm space-y-1.5">
              {SHOP.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4 border-b border-speedy-gray-100 pb-1.5">
                  <span className="text-speedy-gray-700">{h.day}</span>
                  <span className="font-semibold">{h.time}</span>
                </li>
              ))}
            </ul>
            <a
              href={`tel:${SHOP.phoneHref}`}
              className="mt-5 block text-center bg-speedy-blue hover:bg-speedy-blue-dark text-white font-bold uppercase tracking-wide py-3 rounded-sm transition"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="container-x py-20 md:py-28">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <div>
            <div className="text-speedy-blue text-xs font-bold uppercase tracking-widest mb-3">What we do</div>
            <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl leading-[0.95] tracking-tight max-w-xl text-speedy-blue">
              Everything your car needs — under one roof.
            </h2>
          </div>
          <p className="max-w-md text-speedy-gray-700 text-base leading-relaxed">
            From routine oil changes to complex electrical diagnostics, our certified technicians handle it all. Foreign or domestic, sedan or SUV — we know your vehicle.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {SHOP.services.map((s) => (
            <div
              key={s}
              className="group bg-white border border-speedy-gray-300 hover:border-speedy-blue hover:bg-speedy-blue hover:text-white p-5 rounded-sm transition cursor-default"
            >
              <div className="text-2xl font-display font-black text-speedy-blue group-hover:text-speedy-yellow mb-2">{String(SHOP.services.indexOf(s) + 1).padStart(2, "0")}</div>
              <div className="font-display font-bold uppercase text-sm tracking-wide">{s}</div>
            </div>
          ))}
        </div>
      </section>

      {blogs.length > 0 && (
        <section className="bg-speedy-gray-100 border-y border-speedy-gray-300 py-20 md:py-28">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
              <div>
                <div className="text-speedy-blue text-xs font-bold uppercase tracking-widest mb-3">From the garage</div>
                <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl leading-[0.95] tracking-tight text-speedy-blue">
                  Advice, tips & guides
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden md:inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-wide text-speedy-blue hover:text-speedy-blue-dark transition"
              >
                View all posts →
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {blogs.map((b) => (
                <Link
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="group bg-white border border-speedy-gray-300 hover:border-speedy-blue rounded-sm overflow-hidden transition flex flex-col"
                >
                  <div className="aspect-[16/10] bg-speedy-gray-300 relative overflow-hidden">
                    {b.featuredImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={b.featuredImage}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <BlogFallback />
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs uppercase tracking-widest text-speedy-blue font-bold mb-2">
                      {b.categories?.[0] ?? "News"}
                    </div>
                    <h3 className="font-display font-bold text-xl leading-tight text-speedy-blue group-hover:text-speedy-blue-dark transition">
                      {b.title}
                    </h3>
                    {b.excerpt && (
                      <p className="mt-3 text-sm text-speedy-gray-700 line-clamp-3">{b.excerpt}</p>
                    )}
                    <div className="mt-auto pt-4 text-xs text-speedy-gray-500">
                      {formatDate(b.publishDate ?? b.createdAt)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="md:hidden mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-wide text-speedy-blue hover:text-speedy-blue-dark transition"
              >
                View all posts →
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

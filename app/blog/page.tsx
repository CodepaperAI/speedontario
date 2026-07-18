import Link from "next/link";
import type { Metadata } from "next";
import { listBlogs, formatDate } from "@/lib/upliftai";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog — Auto care tips & guides",
  description:
    "Auto care advice, seasonal maintenance tips, and shop news from Speedy Auto Service St. Catharines.",
};

function BlogFallback({ label = "Speedy" }: { label?: string }) {
  return (
    <div className="w-full h-full speedy-fallback grid place-items-center">
      <div className="relative z-10 text-center px-6">
        <div className="font-display font-extrabold text-white/95 text-3xl md:text-4xl uppercase tracking-tight leading-none">
          {label}
        </div>
        <div className="mt-1 font-display font-bold text-speedy-yellow text-xs uppercase tracking-widest">
          Auto Service
        </div>
      </div>
    </div>
  );
}

export default async function BlogIndex() {
  const blogs = await listBlogs({ limit: 24 });
  const [featured, ...rest] = blogs;

  return (
    <>
      <section className="stripe-hero text-white">
        <div className="container-x py-16 md:py-20">
          <div className="text-xs uppercase tracking-widest text-white/70 font-bold mb-4">
            The Speedy Blog
          </div>
          <h1 className="font-display font-extrabold uppercase text-5xl md:text-7xl leading-[0.95] tracking-tight max-w-4xl">
            Advice from the <span className="text-speedy-yellow">shop floor.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90 leading-relaxed">
            Practical tips, seasonal maintenance guides, and the latest news from our St. Catharines garage.
          </p>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        {blogs.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-16">
            <h2 className="font-display font-extrabold text-3xl uppercase text-speedy-blue">
              No posts yet
            </h2>
            <p className="mt-3 text-speedy-gray-700">
              We're getting our first articles ready — check back soon for auto care tips and shop news.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 bg-speedy-blue hover:bg-speedy-blue-dark text-white px-6 py-3 rounded-sm font-bold uppercase tracking-wide text-sm transition"
            >
              ← Back to home
            </Link>
          </div>
        ) : (
          <>
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid md:grid-cols-[1.15fr_1fr] gap-8 mb-16 items-stretch border border-speedy-gray-300 hover:border-speedy-blue bg-white overflow-hidden rounded-sm transition"
              >
                <div className="aspect-[16/10] md:aspect-auto relative overflow-hidden bg-speedy-gray-300 min-h-[280px]">
                  {featured.featuredImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featured.featuredImage}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <BlogFallback label="Featured" />
                  )}
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-speedy-blue mb-4">
                    <span>Featured</span>
                    {featured.categories?.[0] && (
                      <>
                        <span className="text-speedy-gray-300">·</span>
                        <span className="text-speedy-black">{featured.categories[0]}</span>
                      </>
                    )}
                  </div>
                  <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl leading-[1.05] tracking-tight text-speedy-blue group-hover:text-speedy-blue-dark transition">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="mt-4 text-speedy-gray-700 text-base leading-relaxed line-clamp-3">
                      {featured.excerpt}
                    </p>
                  )}
                  <div className="mt-6 flex items-center gap-4 text-xs text-speedy-gray-500 uppercase tracking-wide font-semibold">
                    <span>{formatDate(featured.publishDate ?? featured.createdAt)}</span>
                    {featured.authorName && (
                      <>
                        <span>·</span>
                        <span>{featured.authorName}</span>
                      </>
                    )}
                    {(featured.customFields?.readingTime as string) && (
                      <>
                        <span>·</span>
                        <span>{String(featured.customFields?.readingTime)}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((b) => (
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
                      <div className="mt-auto pt-4 text-xs text-speedy-gray-500 uppercase tracking-wide font-semibold">
                        {formatDate(b.publishDate ?? b.createdAt)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

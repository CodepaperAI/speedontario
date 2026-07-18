import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlog, listBlogs, formatDate } from "@/lib/upliftai";
import { SHOP } from "@/lib/shop";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Post not found" };

  return {
    title: blog.meta?.seoTitle ?? blog.title,
    description: blog.meta?.seoDescription ?? blog.excerpt ?? undefined,
    keywords: blog.meta?.keywords ?? blog.tags,
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: {
      title: blog.meta?.ogTitle ?? blog.title,
      description: blog.meta?.ogDescription ?? blog.excerpt ?? undefined,
      type: "article",
      url: blog.meta?.ogUrl ?? `${SHOP.siteUrl}/blog/${blog.slug}`,
      siteName: blog.meta?.ogSiteName ?? "Speedy Auto Service St. Catharines",
      locale: blog.meta?.ogLocale ?? "en_CA",
      images: blog.featuredImage ? [{ url: blog.featuredImage }] : undefined,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const others = (await listBlogs({ limit: 6 })).filter((b) => b.slug !== slug).slice(0, 3);
  const readingTime = (blog.customFields?.readingTime as string) ?? "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    datePublished: blog.publishDate ?? blog.createdAt,
    dateModified: blog.updatedAt ?? blog.publishDate,
    author: blog.authorName ? { "@type": "Person", name: blog.authorName } : undefined,
    image: blog.featuredImage || undefined,
    description: blog.meta?.seoDescription ?? blog.excerpt,
    mainEntityOfPage: `${SHOP.siteUrl}/blog/${blog.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Speedy Auto Service St. Catharines",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="stripe-hero text-white">
          <div className="container-x py-16 md:py-24 max-w-4xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white/70 hover:text-white transition mb-6">
              ← All posts
            </Link>
            {blog.categories?.[0] && (
              <div className="inline-block bg-speedy-yellow text-speedy-blue-dark text-xs uppercase tracking-widest px-3 py-1 rounded-sm font-bold mb-5">
                {blog.categories[0]}
              </div>
            )}
            <h1 className="font-display font-extrabold uppercase text-4xl md:text-6xl leading-[0.95] tracking-tight">
              {blog.title}
            </h1>
            {blog.excerpt && (
              <p className="mt-6 text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
                {blog.excerpt}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs uppercase tracking-wide font-semibold text-white/80">
              {blog.authorName && <span>{blog.authorName}</span>}
              {blog.authorName && <span>·</span>}
              <span>{formatDate(blog.publishDate ?? blog.createdAt)}</span>
              {readingTime && (
                <>
                  <span>·</span>
                  <span>{readingTime}</span>
                </>
              )}
            </div>
          </div>
        </header>

        {blog.featuredImage && (
          <div className="container-x -mt-10 md:-mt-16 relative z-10 max-w-4xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full rounded-sm shadow-2xl aspect-[16/9] object-cover"
            />
          </div>
        )}

        <div className="container-x py-16 md:py-20 max-w-3xl">
          <div
            className="prose-speedy"
            dangerouslySetInnerHTML={{ __html: blog.content ?? "" }}
          />

          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-14 pt-8 border-t border-speedy-gray-300">
              <div className="text-xs font-bold uppercase tracking-widest text-speedy-gray-500 mb-3">Tagged</div>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((t) => (
                  <span key={t} className="text-xs uppercase font-semibold px-3 py-1.5 bg-speedy-gray-100 text-speedy-blue rounded-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <section className="bg-speedy-blue text-white">
          <div className="container-x py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-extrabold uppercase text-3xl md:text-4xl leading-tight tracking-tight">
                Need help with your car?
              </h3>
              <p className="mt-2 text-white/90 max-w-lg">
                Book an appointment or drop by our St. Catharines shop — we'll get you back on the road fast.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href={SHOP.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap bg-speedy-yellow text-speedy-blue-dark font-bold uppercase tracking-wide px-8 py-4 rounded-sm hover:bg-white transition text-center"
              >
                Book Appointment
              </a>
              <a
                href={`tel:${SHOP.phoneHref}`}
                className="whitespace-nowrap border-2 border-white text-white font-bold uppercase tracking-wide px-8 py-4 rounded-sm hover:bg-white hover:text-speedy-blue transition text-center"
              >
                Call {SHOP.phone}
              </a>
            </div>
          </div>
        </section>

        {others.length > 0 && (
          <section className="container-x py-16 md:py-20">
            <div className="text-speedy-blue text-xs font-bold uppercase tracking-widest mb-3">Keep reading</div>
            <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl leading-[1] tracking-tight mb-10 text-speedy-blue">
              More from the shop
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {others.map((b) => (
                <Link
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="group bg-white border border-speedy-gray-300 hover:border-speedy-blue rounded-sm overflow-hidden transition flex flex-col"
                >
                  {b.featuredImage && (
                    <div className="aspect-[16/10] bg-speedy-gray-100 relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.featuredImage} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs uppercase tracking-widest text-speedy-blue font-bold mb-2">
                      {b.categories?.[0] ?? "News"}
                    </div>
                    <h3 className="font-display font-bold text-xl leading-tight text-speedy-blue group-hover:text-speedy-blue-dark transition">
                      {b.title}
                    </h3>
                    <div className="mt-auto pt-4 text-xs text-speedy-gray-500 uppercase tracking-wide font-semibold">
                      {formatDate(b.publishDate ?? b.createdAt)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center max-w-lg mx-auto">
      <div className="font-display font-extrabold text-speedy-blue text-7xl mb-4">404</div>
      <h1 className="font-display font-extrabold uppercase text-3xl mb-3">Post not found</h1>
      <p className="text-speedy-gray-700 mb-8">
        The blog post you're looking for doesn't exist or has been unpublished.
      </p>
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 bg-speedy-blue hover:bg-speedy-blue-dark text-white px-6 py-3 rounded-sm font-bold uppercase tracking-wide text-sm transition"
      >
        ← Back to blog
      </Link>
    </div>
  );
}

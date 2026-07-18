import type { MetadataRoute } from "next";
import { listBlogs } from "@/lib/upliftai";
import { SHOP } from "@/lib/shop";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SHOP.siteUrl.replace(/\/$/, "");
  const blogs = await listBlogs({ limit: 100 }).catch(() => []);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/blog`, changeFrequency: "daily", priority: 0.9 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: b.updatedAt ? new Date(b.updatedAt) : undefined,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}

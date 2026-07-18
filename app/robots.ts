import type { MetadataRoute } from "next";
import { SHOP } from "@/lib/shop";

export default function robots(): MetadataRoute.Robots {
  const base = SHOP.siteUrl.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}

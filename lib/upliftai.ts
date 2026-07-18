const API_BASE = "https://api.upliftai.co/api/public/v1";

export type BlogFreshness = {
  lastUpdatedAt?: string;
  ageDays?: number;
  needsRefresh?: boolean;
  freshnessThresholdDays?: number;
};

export type BlogMeta = {
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
};

export type BlogSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  status?: string;
  publishDate?: string;
  publishTime?: string;
  featuredImage?: string;
  categories?: string[];
  tags?: string[];
  seoScore?: number;
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
  authorUrl?: string;
  freshness?: BlogFreshness;
  meta?: BlogMeta;
  customFields?: Record<string, unknown>;
};

export type BlogDetail = BlogSummary & {
  analytics?: {
    contentQualityScore?: number;
    rankingPotential?: string;
    conversionPotential?: string;
    externalLinksCount?: number;
  };
};

type ListResponse = {
  success: boolean;
  data?: {
    blogs: BlogSummary[];
    pagination?: { page: number; limit: number; total: number; totalPages: number };
  };
  error?: string;
};

type DetailResponse = {
  success: boolean;
  data?: { blog: BlogDetail };
  error?: string;
};

function token(): string {
  const t = process.env.UPLIFTAI_TOKEN;
  if (!t) throw new Error("UPLIFTAI_TOKEN is not set");
  return t;
}

export async function listBlogs(params?: { page?: number; limit?: number; status?: "PUBLISH" | "DRAFT" | "ALL" }): Promise<BlogSummary[]> {
  const url = new URL(`${API_BASE}/blogs`);
  if (params?.page) url.searchParams.set("page", String(params.page));
  if (params?.limit) url.searchParams.set("limit", String(params.limit));
  url.searchParams.set("status", params?.status ?? "PUBLISH");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token()}` },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    console.error("UpliftAI listBlogs failed", res.status, await res.text().catch(() => ""));
    return [];
  }
  const json = (await res.json()) as ListResponse;
  if (!json.success || !json.data) return [];
  return json.data.blogs.filter((b) => (b.status ?? "PUBLISH").toUpperCase() === "PUBLISH");
}

export async function getBlog(slug: string): Promise<BlogDetail | null> {
  const res = await fetch(`${API_BASE}/blog/${encodeURIComponent(slug)}`, {
    headers: { Authorization: `Bearer ${token()}` },
    next: { revalidate: 300 },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    console.error("UpliftAI getBlog failed", res.status, await res.text().catch(() => ""));
    return null;
  }
  const json = (await res.json()) as DetailResponse;
  if (!json.success || !json.data) return null;
  return json.data.blog;
}

export function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

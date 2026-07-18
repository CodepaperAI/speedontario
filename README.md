# Speedy Auto Service — St. Catharines

Next.js 15 (App Router) marketing site + blog for the Speedy Auto Service St. Catharines shop, wired to the UpliftAI blog CMS.

## Env vars

Copy `.env.example` → `.env.local` and set:

```
UPLIFTAI_TOKEN=uai_your_token_here
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SHOP_PHONE=(905) 682-0005
NEXT_PUBLIC_SHOP_EMAIL=st.catharines@speedy.com
NEXT_PUBLIC_SHOP_ADDRESS=76 Hartzel Road, St. Catharines ON L2P 1N1
```

## Dev

```
npm install
npm run dev
# http://localhost:3007
```

Routes:
- `/` — home (hero, services, latest 3 posts)
- `/blog` — blog index (featured + grid, from UpliftAI)
- `/blog/[slug]` — blog detail (SEO + JSON-LD, from UpliftAI)
- `/sitemap.xml`, `/robots.txt`

Blog fetch is server-side with `revalidate: 300` (5-minute ISR).

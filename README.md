# Niyosoft Technologies Website

Static Next.js + Tailwind site, exported to `out/` and hosted on Cloudflare Pages.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `out/`. Business details (phone, email, address, domain) live in `src/lib/site.ts`; services in `src/lib/services.ts`.

## Domain

The site URL defaults to `https://niyosoft.in`. If you register a different domain, set `NEXT_PUBLIC_SITE_URL` (for example `https://niyosoft.com`) in the Cloudflare Pages environment variables. It drives canonical URLs, the sitemap and social share tags.

## Deploy to Cloudflare Pages

1. Buy the domain in Cloudflare dashboard > Domain Registration > Register Domains.
2. Push this folder to a GitHub repository.
3. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git, pick the repository.
4. Build settings: framework preset `Next.js (Static HTML Export)`, build command `npm run build`, output directory `out`.
5. After the first deploy: project > Custom domains > add the domain (and `www`).

Manual deploy without Git:

```bash
npm run build
npx wrangler pages deploy out --project-name niyosoft
```

## After launch

- Add the site to Google Search Console and submit `/sitemap.xml`.
- Create a Google Business Profile for the Pollachi office.

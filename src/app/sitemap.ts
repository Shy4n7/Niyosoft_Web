import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const routes = [
  { path: "/", priority: 1 },
  { path: "/projects/", priority: 0.8 },
  { path: "/privacy/", priority: 0.2 },
  { path: "/terms/", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${site.url}${route.path}`, changeFrequency: "monthly", priority: route.priority }));
}

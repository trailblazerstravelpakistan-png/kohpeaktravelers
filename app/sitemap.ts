import type { MetadataRoute } from "next";
import { destinations, dayTours } from "./data";

export const dynamic = "force-static";

// Set NEXT_PUBLIC_SITE_URL in your environment once the domain is final.
const baseUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kohpeaks.com"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/destinations",
    "/packages",
    "/services",
    "/about",
    "/gallery",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const destinationEntries: MetadataRoute.Sitemap = destinations.map((item) => ({
    url: `${baseUrl}/destinations/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const tourEntries: MetadataRoute.Sitemap = dayTours.map((item) => ({
    url: `${baseUrl}/tours/${item.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticEntries, ...destinationEntries, ...tourEntries];
}

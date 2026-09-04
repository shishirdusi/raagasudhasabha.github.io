import type { MetadataRoute } from "next";
import { getAllEvents } from "@/lib/events";

const SITE_URL = "https://www.raagasudhasabha.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = [
    "",
    "/events",
    "/events/past",
    "/about",
    "/archive",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/events" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  // One entry per concert. Upcoming events rank above the archive, and are
  // crawled more often because their ticket availability changes.
  const events: MetadataRoute.Sitemap = getAllEvents().map((e) => ({
    url: `${SITE_URL}/events/${e.id}`,
    lastModified,
    changeFrequency: e.status === "upcoming" ? "daily" : "yearly",
    priority: e.status === "upcoming" ? 0.9 : 0.4,
  }));

  // /cart, /checkout and /order are intentionally excluded — they are
  // per-visitor pages and are marked noindex in their metadata.
  return [...pages, ...events];
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EventCard } from "@/components/event-card";
import { PageHeader, EmptyState } from "@/components/page-header";
import { getUpcoming } from "@/lib/events";
import { SUPPORT_EMAIL } from "@/lib/commerce-config";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description:
    "Upcoming concerts presented by Raaga Sudha Sabha — featuring world-class Indian Classical artists.",
};

export default function UpcomingEventsPage() {
  const upcoming = getUpcoming();

  return (
    <>
      <PageHeader
        kicker="Concerts & Festivals"
        title="Upcoming Events"
        sub="Concerts, festivals and workshops featuring world-class Indian Classical artists."
      />

      <section className="bg-cream-deep/30">
        <div className="container-edge py-14 md:py-20">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="font-display text-display-md text-maroon">
              On our stage
            </h2>
            {upcoming.length > 0 && (
              <span className="smallcaps text-muted">
                {upcoming.length}{" "}
                {upcoming.length === 1 ? "concert" : "concerts"} on sale
              </span>
            )}
          </div>

          {upcoming.length === 0 ? (
            <div className="mt-8">
              <EmptyState message="The next concert is being announced. Sign up below for the newsletter to be the first to know." />
            </div>
          ) : (
            /*
              Every upcoming concert gets the same full-width row. Promoting
              only the first one to "featured" left the rest as narrow
              third-width cards, so the season read as one real event plus
              some offcuts.
            */
            <div className="mt-8 space-y-6">
              {upcoming.map((e) => (
                <EventCard key={e.id} event={e} variant="featured" />
              ))}
            </div>
          )}

          <p className="mt-8 text-sm text-muted">
            For partnership or press enquiries, write to{" "}
            <a className="link-purple" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>

      {/* Cross-link so the two halves of the archive stay one step apart. */}
      <section className="border-t border-pink bg-cream">
        <div className="container-edge flex flex-wrap items-center justify-between gap-4 py-10">
          <p className="font-display text-xl italic text-brand-purple md:text-2xl">
            Looking for a concert we&rsquo;ve already presented?
          </p>
          <Link
            href="/events/past"
            className="smallcaps inline-flex min-h-12 items-center gap-2 border border-maroon/70 px-6 py-3 text-maroon transition hover:bg-maroon/10"
          >
            Browse past events
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EventsList } from "@/components/events-list";
import { PageHeader, EmptyState } from "@/components/page-header";
import { getPast } from "@/lib/events";

export const metadata: Metadata = {
  title: "Past Events",
  description:
    "The Raaga Sudha Sabha concert archive — every performance we have presented, by year.",
};

export default function PastEventsPage() {
  const past = getPast();

  return (
    <>
      <PageHeader
        kicker="From the Archive"
        title="Past Events"
        sub="Every concert we have presented. Filter by year to look back on a season."
      />

      <section className="bg-cream">
        <div className="container-edge py-14 md:py-20">
          {past.length > 0 ? (
            <EventsList events={past} />
          ) : (
            <EmptyState message="Past concerts will be archived here as the season fills out." />
          )}
        </div>
      </section>

      <section className="border-t border-pink bg-cream-deep/30">
        <div className="container-edge flex flex-wrap items-center justify-between gap-4 py-10">
          <p className="font-display text-xl italic text-brand-purple md:text-2xl">
            Want to hear what&rsquo;s next?
          </p>
          <Link
            href="/events"
            className="smallcaps inline-flex min-h-12 items-center gap-2 border border-maroon bg-maroon px-6 py-3 text-cream transition hover:bg-maroon-deep"
          >
            See upcoming events
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

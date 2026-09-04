import Link from "next/link";
import { Ornament } from "@/components/ornament";
import { UPCOMING_BANNER_MESSAGE } from "@/lib/upcoming";
import { cn } from "@/lib/utils";

/**
 * Stands in for the upcoming-concert posters between announcements.
 * Rendered wherever UPCOMING_BANNER_ONLY is on — see lib/upcoming.ts.
 */
export function UpcomingBanner({
  className,
  showArchiveLink = true,
}: {
  className?: string;
  /** Off on pages that already link to the archive elsewhere. */
  showArchiveLink?: boolean;
}) {
  return (
    <div
      className={cn(
        "border border-pink bg-cream/60 px-6 py-14 text-center md:px-10 md:py-20",
        className
      )}
    >
      <Ornament className="mx-auto h-3 w-32 text-brand-purple/70" />

      <p className="mx-auto mt-8 max-w-2xl font-display text-3xl italic leading-snug text-brand-purple md:text-4xl">
        {UPCOMING_BANNER_MESSAGE}
      </p>

      <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink/80">
        Our next season is being planned. Sign up for the newsletter and
        we&rsquo;ll write to you the moment the programme is announced.
      </p>

      {showArchiveLink && (
        <Link
          href="/events/past"
          className="smallcaps mt-8 inline-flex min-h-12 items-center border border-maroon/70 px-6 py-3 text-maroon transition hover:bg-maroon/10"
        >
          Browse past concerts
        </Link>
      )}

      <Ornament className="mx-auto mt-10 h-3 w-32 text-brand-purple/70" />
    </div>
  );
}

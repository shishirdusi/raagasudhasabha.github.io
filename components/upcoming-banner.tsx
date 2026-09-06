import { UPCOMING_BANNER_MESSAGE } from "@/lib/upcoming";
import { cn } from "@/lib/utils";

/**
 * Stands in for the upcoming-concert posters between announcements.
 * Rendered wherever UPCOMING_BANNER_ONLY is on — see lib/upcoming.ts.
 *
 * Deliberately just the message: no subline, link or ornament.
 *
 * "compact" is for the home page, where this sits above the hero and must
 * not out-shout the welcome message. "default" is for the events page,
 * where it is the actual content of the Upcoming section.
 */
export function UpcomingBanner({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "compact";
}) {
  const compact = size === "compact";

  return (
    <div
      className={cn(
        "border border-pink bg-cream/60 text-center",
        compact ? "px-5 py-5 md:py-6" : "px-6 py-16 md:px-10 md:py-24",
        className
      )}
    >
      <p
        className={cn(
          "mx-auto max-w-2xl font-display italic leading-snug text-brand-purple",
          compact ? "text-xl md:text-2xl" : "text-3xl md:text-4xl"
        )}
      >
        {UPCOMING_BANNER_MESSAGE}
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/wordmark";
import { DonateButton } from "@/components/donate-button";
import { CartBadge } from "@/components/cart-badge";

type NavLink = {
  label: string;
  href: string;
  /** Present on items that open a dropdown instead of navigating. */
  children?: { label: string; href: string }[];
};

const links: NavLink[] = [
  { href: "/", label: "Home" },
  {
    href: "/events",
    label: "Events",
    // Two dedicated pages rather than anchors, so each shows only its own
    // events. /events is the upcoming page; the archive lives one level down.
    children: [
      { href: "/events", label: "Upcoming Events" },
      { href: "/events/past", label: "Past Events" },
    ],
  },
  { href: "/about", label: "About" },
  { href: "/archive", label: "Archive" },
  { href: "/contact", label: "Contact" },
];

/** Compact smallcaps version — used in the mobile band only. */
function TaxExemptCompact() {
  return (
    <p className="smallcaps text-[0.65rem] tracking-[0.16em] text-cream/80">
      <span>Tax exempt under section 501(c)(3)</span>
      <span className="text-cream/50"> · </span>
      <span className="text-cream/50">Federal Tax ID 42-2139154</span>
    </p>
  );
}

/**
 * Desktop dropdown. Opens on hover for pointer users and on click/Enter for
 * keyboard and touch, so it isn't hover-only. Escape and an outside click
 * both close it.
 */
function NavDropdown({ item }: { item: NavLink }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // A short delay lets the pointer cross the gap between trigger and panel
  // without the menu snapping shut underneath it.
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  const menuId = `nav-menu-${item.label.toLowerCase()}`;

  return (
    <div
      ref={wrap}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={closeSoon}
      // Closes when focus tabs out of the whole group.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "smallcaps inline-flex min-h-11 items-center gap-1.5 text-base transition",
          open ? "text-gold" : "text-cream/80 hover:text-gold"
        )}
      >
        {item.label}
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      {/*
        Deliberately NOT role="menu" — that role promises arrow-key roving
        focus. This is a navigation disclosure, so the button's aria-expanded
        plus ordinary list semantics describe it correctly and Tab works as
        users expect.
      */}
      <div
        id={menuId}
        className={cn(
          "absolute left-0 top-full z-50 min-w-[15rem] border border-pink bg-cream shadow-xl",
          open ? "block" : "hidden"
        )}
      >
        <ul className="divide-y divide-pink">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={() => setOpen(false)}
                className="smallcaps block px-5 py-4 text-maroon transition hover:bg-pink/40 hover:text-brand-purple"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Mobile accordion equivalent of NavDropdown. */
function MobileDisclosure({
  item,
  onNavigate,
}: {
  item: NavLink;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `mobile-menu-${item.label.toLowerCase()}`;

  return (
    <div className="border-b border-cream/15">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="smallcaps flex min-h-11 w-full items-center justify-between py-3 text-cream/80"
      >
        {item.label}
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      <ul id={panelId} className={cn("pb-2", open ? "block" : "hidden")}>
        {item.children?.map((child) => (
          <li key={child.href}>
            <Link
              href={child.href}
              onClick={() => {
                setOpen(false);
                onNavigate();
              }}
              className="smallcaps block min-h-11 py-3 pl-5 text-cream/70 transition hover:text-gold"
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-maroon-deep text-cream/90">
      {/* Main nav row — bordered on desktop only (mobile gets its border from the tax band) */}
      <div className="md:border-b md:border-cream/15">
        <div className="container-edge flex items-stretch justify-between gap-6 py-2 md:py-3">
          {/* LEFT: logo + brand text stack */}
          <Link
            href="/"
            className="inline-flex flex-col items-center gap-2 text-center"
            aria-label="Raaga Sudha Sabha — home"
          >
            <Wordmark size="lg" className="h-20 md:h-24" />
            <span className="font-display italic leading-none text-2xl text-cream md:text-3xl">
              Raaga Sudha Sabha
            </span>
          </Link>

          {/* RIGHT (desktop): nav vertically centered, tax-exempt anchored to the bottom */}
          <div className="hidden flex-col items-end md:flex">
            <div className="flex flex-1 items-center">
              <nav className="flex items-center gap-8" aria-label="Primary">
                {links.map((l) =>
                  l.children ? (
                    <NavDropdown key={l.label} item={l} />
                  ) : (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="smallcaps text-base text-cream/80 transition hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  )
                )}
                <DonateButton variant="nav">Donate</DonateButton>
                <CartBadge />
              </nav>
            </div>

            <p className="font-display italic leading-tight text-right text-lg text-cream md:text-xl">
              Tax exempt under section 501(c)(3) · Federal Tax ID 42-2139154
            </p>
          </div>

          {/* MOBILE: cart stays reachable without opening the menu */}
          <div className="flex items-start gap-1 md:hidden">
            <CartBadge className="h-11 w-11 justify-center" />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center text-cream"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={cn(
          "border-t border-cream/15 md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav
          className="container-edge flex flex-col py-3"
          aria-label="Primary mobile"
        >
          {links.map((l) =>
            l.children ? (
              <MobileDisclosure
                key={l.label}
                item={l}
                onNavigate={() => setOpen(false)}
              />
            ) : (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="smallcaps min-h-11 border-b border-cream/15 py-3 text-cream/80"
              >
                {l.label}
              </Link>
            )
          )}
          <CartBadge
            showLabel
            onNavigate={() => setOpen(false)}
            className="min-h-11 border-b border-cream/15 py-3"
          />
          <div className="mt-3">
            <DonateButton variant="nav" className="w-full justify-center">
              Donate
            </DonateButton>
          </div>
        </nav>
      </div>

      {/* Tax-exempt band — mobile only; on desktop the line lives in the right column above */}
      <div className="border-b border-cream/15 bg-maroon-deep md:hidden">
        <div className="container-edge py-1.5 text-center">
          <TaxExemptCompact />
        </div>
      </div>
    </header>
  );
}

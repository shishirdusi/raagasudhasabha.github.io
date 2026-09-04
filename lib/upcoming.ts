/**
 * RSVP configuration for *free* events.
 *
 * Concerts are now data-driven: every event, its flyer and its ticket tiers
 * live in content/events.json, and paid events run through the cart and
 * PayPal checkout (see lib/commerce-config.ts). This file only covers the
 * remaining free-admission case, where we collect an RSVP through a Google
 * Form instead of taking payment.
 *
 * To use it, set an event's "ticketing" to "free" in content/events.json and
 * point RSVP_GOOGLE_FORM_URL at the form:
 *   1. Build a Google Form (responses can flow into a Google Sheet).
 *   2. Click Send → the <> embed tab → copy the URL from the iframe src,
 *      or just paste the form's normal "viewform" link below.
 *   3. Set RSVP_OPEN = true.
 *   4. (Optional) set RSVP_EVENT_LABEL to a short string shown above the
 *      form, e.g. "Sanjay Subrahmanyan — September 12, 2026".
 *
 * Setting RSVP_OPEN = false (or RSVP_GOOGLE_FORM_URL = "") hides all RSVP
 * buttons site-wide; useful between concerts.
 */
export const RSVP_GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeCNbW_niJtQP2VTVBYSFW3nDSnhGcC_JUac0TcAf83_VT88g/viewform";

export const RSVP_OPEN = true;

export const RSVP_EVENT_LABEL = "";

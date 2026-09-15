import type { NavLink } from "@/shared/types/content-types";

/**
 * Nav items are stored as `{ label, id }`. An id that starts with "/" is a
 * route; anything else is a section on the home page that we scroll to.
 *
 * LEGACY_IDS keeps nav saved in the CMS before the box tools moved to /lab
 * pointing somewhere real instead of at a dead anchor.
 */
const LEGACY_IDS: Record<string, string> = {
  capabilities: "/lab",
  calculator: "/lab#configure",
};

export type NavTarget =
  | { kind: "route"; href: string }
  | { kind: "section"; id: string };

export function navTarget(link: Pick<NavLink, "id">): NavTarget {
  const id = LEGACY_IDS[link.id] ?? link.id;
  return id.startsWith("/")
    ? { kind: "route", href: id }
    : { kind: "section", id };
}

/** Absolute href for a nav item — for links used away from the home page. */
export function navHref(link: Pick<NavLink, "id">): string {
  const target = navTarget(link);
  return target.kind === "route" ? target.href : `/#${target.id}`;
}

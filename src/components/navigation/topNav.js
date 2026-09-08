import { renderSessionsAvatar } from "../avatar/avatar.js";
import { renderSessionsLogo } from "./logo.js";
import { renderSessionsRailItem } from "./railItem.js";

export const TOP_NAV_ACTIONS = ["search", "notifications", "calendar"];

export function renderTopNav({
  href: logoHref,
  ariaLabel: logoAriaLabel,
  avatar = {
    src: "/assets/user.png",
    alt: "Harry",
  },
} = {}) {
  const actions = TOP_NAV_ACTIONS
    .map((icon) => renderSessionsRailItem({ icon }))
    .join("");

  const avatarMarkup = avatar ? renderSessionsAvatar(avatar) : "";

  const logo = renderSessionsLogo({ href: logoHref, ariaLabel: logoAriaLabel });

  return `<header class="top-nav" aria-label="Primary">${logo}<div class="top-nav__actions" aria-label="Actions"><div class="top-nav__icons">${actions}</div>${avatarMarkup}</div></header>`;
}

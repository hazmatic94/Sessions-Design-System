import { renderSessionsAvatar } from "../avatar/avatar.js";
import {
  renderSessionsMenuDivider,
  renderSessionsMenuItem,
  renderSessionsMenuPanel,
  renderSessionsMenuUserHeader,
} from "../menu/index.js";
import { renderSessionsLogo } from "./logo.js";
import { renderSessionsRailItem } from "./railItem.js";

export const TOP_NAV_ACTIONS = ["search", "notifications"];

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

  const avatarMarkup = avatar ? renderProfileMenu(avatar) : "";

  const logo = renderSessionsLogo({ href: logoHref, ariaLabel: logoAriaLabel });

  return `<header class="top-nav" aria-label="Primary">${logo}<div class="top-nav__actions" aria-label="Actions"><div class="top-nav__icons">${actions}</div>${avatarMarkup}</div></header>`;
}

function renderProfileMenu(avatar) {
  const trigger = renderSessionsAvatar(avatar);
  const panel = renderSessionsMenuPanel({
    className: "top-nav__profile-panel",
    children: [
      renderSessionsMenuUserHeader(),
      renderSessionsMenuDivider(),
      renderSessionsMenuItem({ label: "Account settings", icon: "settings" }),
      renderSessionsMenuItem({ label: "Help & support", icon: "help" }),
      renderSessionsMenuItem({ label: "Log out", icon: "logout" }),
    ].join(""),
  });

  return `<div class="top-nav__profile" data-sessions-profile-menu><button class="top-nav__profile-trigger" type="button" data-sessions-profile-trigger aria-haspopup="menu" aria-expanded="false" aria-label="Open profile menu">${trigger}</button><div class="top-nav__profile-menu" data-sessions-profile-panel hidden>${panel}</div></div>`;
}

export function setupSessionsProfileMenu(root = document) {
  root.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-sessions-profile-trigger]");
    if (trigger) {
      event.preventDefault();
      const menu = trigger.closest("[data-sessions-profile-menu]");
      const open = menu?.querySelector("[data-sessions-profile-panel]")?.hidden !== false;
      root.querySelectorAll("[data-sessions-profile-menu]").forEach((item) => {
        setProfileMenuOpen(item, item === menu && open);
      });
      return;
    }

    if (event.target.closest(".sessions-menu-user-header__close")) {
      const menu = event.target.closest("[data-sessions-profile-menu]");
      if (menu) setProfileMenuOpen(menu, false);
      return;
    }

    if (event.target.closest("[data-sessions-profile-panel]")) return;

    root.querySelectorAll("[data-sessions-profile-menu]").forEach((item) => {
      setProfileMenuOpen(item, false);
    });
  });
}

function setProfileMenuOpen(menu, open) {
  const trigger = menu.querySelector("[data-sessions-profile-trigger]");
  const panel = menu.querySelector("[data-sessions-profile-panel]");
  trigger?.setAttribute("aria-expanded", String(open));
  if (panel) panel.hidden = !open;
}

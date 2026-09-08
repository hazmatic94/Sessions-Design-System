import { escapeHtml } from "../../utils.js";
import { renderSessionsAvatar } from "../avatar/avatar.js";
import { RAIL_NAV_ITEMS, renderSessionsNavItem } from "./railItem.js";
import { renderSessionsLogo } from "./logo.js";

const MENU_ICON = "/assets/IconMenu.svg?v=sessions-rail-v2";
const CLOSE_ICON = "/assets/IconClose.svg?v=sessions-rail-v2";
const CHEVRON_RIGHT_ICON = "/assets/IconCehvronRight.svg?v=sessions-rail-v2";

export function renderMobileMenu({
  href: logoHref,
  ariaLabel: logoAriaLabel,
  menuLabel = "Open menu",
  closeLabel = "Close menu",
  user = {
    name: "Larry June",
    email: "goodjoblarry@gmail.com",
    avatar: {
      src: "/assets/user.png",
      alt: "Larry June",
    },
  },
} = {}) {
  const logo = renderSessionsLogo({ href: logoHref, ariaLabel: logoAriaLabel });
  const toggle = renderMobileMenuToggle({ menuLabel, closeLabel });
  const panel = renderMobileMenuPanel({ user });

  return `<div class="mobile-menu-device"><header class="mobile-menu" aria-label="Mobile navigation">${logo}${toggle}</header><div class="mobile-menu__content" data-mobile-menu-panel aria-hidden="true">${panel}</div></div>`;
}

export function renderMobileMenuPanel({
  user = {
    name: "Larry June",
    email: "goodjoblarry@gmail.com",
    avatar: {
      src: "/assets/user.png",
      alt: "Larry June",
    },
  },
  selected = "home",
} = {}) {
  const avatar = renderSessionsAvatar({
    ...user.avatar,
    name: user.name,
  });
  const navMarkup = RAIL_NAV_ITEMS
    .map((icon) =>
      renderSessionsNavItem({
        icon,
        selected: icon === selected,
      }),
    )
    .join("");
  const helpMarkup = renderSessionsNavItem({ label: "Help & Support" });
  const logoutMarkup = renderSessionsNavItem({
    icon: "logout",
    label: "Log out",
    tone: "danger",
  });

  return `<div class="mobile-menu-panel" aria-label="Mobile menu"><button class="mobile-menu-panel__user" type="button" aria-label="View ${escapeHtml(user.name)} profile"><span class="mobile-menu-panel__user-main">${avatar}<span class="mobile-menu-panel__user-copy"><span class="mobile-menu-panel__user-name">${escapeHtml(user.name)}</span><span class="mobile-menu-panel__user-email">${escapeHtml(user.email)}</span></span></span><span class="mobile-menu-panel__chevron" style="--sessions-rail-icon: url('${CHEVRON_RIGHT_ICON}')" aria-hidden="true"></span></button><hr class="mobile-menu-panel__divider" aria-hidden="true" /><nav class="mobile-menu-panel__nav" aria-label="Primary">${navMarkup}</nav><hr class="mobile-menu-panel__divider" aria-hidden="true" /><nav class="mobile-menu-panel__nav" aria-label="Support">${helpMarkup}</nav><hr class="mobile-menu-panel__divider" aria-hidden="true" /><div class="mobile-menu-panel__footer">${logoutMarkup}</div></div>`;
}

function renderMobileMenuToggle({
  menuLabel = "Open menu",
  closeLabel = "Close menu",
} = {}) {
  return `<button class="sessions-rail-item mobile-menu__toggle" type="button" data-mobile-menu-toggle aria-expanded="false" aria-label="${escapeHtml(menuLabel)}" data-menu-label="${escapeHtml(menuLabel)}" data-close-label="${escapeHtml(closeLabel)}"><span class="sessions-rail-item__icon mobile-menu__toggle-icon mobile-menu__toggle-icon--menu" style="--sessions-rail-icon: url('${MENU_ICON}')" aria-hidden="true"></span><span class="sessions-rail-item__icon mobile-menu__toggle-icon mobile-menu__toggle-icon--close" style="--sessions-rail-icon: url('${CLOSE_ICON}')" aria-hidden="true"></span></button>`;
}

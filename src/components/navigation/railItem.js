import { escapeHtml } from "../../utils.js";

const RAIL_ICONS = {
  home: "/assets/IconHome.svg?v=sessions-rail-v2",
  calendar: "/assets/IconCalendar.svg?v=sessions-rail-v2",
  clients: "/assets/IconClients.svg?v=sessions-rail-v2",
  team: "/assets/IconTeam.svg?v=sessions-rail-v2",
  settings: "/assets/IconSettings.svg?v=sessions-rail-v2",
  search: "/assets/IconSearch.svg?v=sessions-rail-v2",
  notifications: "/assets/IconNotifications.svg?v=sessions-rail-v2",
  menu: "/assets/IconMenu.svg?v=sessions-rail-v2",
  logout: "/assets/IconLogout.svg?v=sessions-rail-v2",
};

export const RAIL_MAIN_ITEMS = ["home", "calendar", "clients", "team"];
export const RAIL_ITEM_ICONS = [...RAIL_MAIN_ITEMS, "settings"];
export const RAIL_NAV_ITEMS = [...RAIL_MAIN_ITEMS, "settings"];

function renderRailItemIconMarkup(icon, badge = icon === "calendar" || icon === "notifications") {
  const iconSrc = RAIL_ICONS[icon] ?? RAIL_ICONS.home;

  if (icon === "calendar") {
    return `<span class="sessions-rail-item__icon sessions-rail-item__icon--svg" aria-hidden="true">${calendarIconMarkup({ badge })}</span>`;
  }

  if (icon === "notifications") {
    return `<span class="sessions-rail-item__icon sessions-rail-item__icon--svg" aria-hidden="true">${notificationsIconMarkup({ badge })}</span>`;
  }

  if (icon === "team") {
    return `<span class="sessions-rail-item__icon sessions-rail-item__icon--svg" aria-hidden="true">${teamIconMarkup()}</span>`;
  }

  if (icon === "logout") {
    return `<span class="sessions-rail-item__icon sessions-rail-item__icon--img" aria-hidden="true"><img src="${RAIL_ICONS.logout}" width="24" height="24" alt="" /></span>`;
  }

  return `<span class="sessions-rail-item__icon" style="--sessions-rail-icon: url('${iconSrc}')" aria-hidden="true"></span>`;
}

function teamIconMarkup() {
  return `<svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M3.75 5.3125C3.75 4.40082 4.11216 3.52648 4.75682 2.88182C5.40148 2.23716 6.27582 1.875 7.1875 1.875C8.09918 1.875 8.97352 2.23716 9.61818 2.88182C10.2628 3.52648 10.625 4.40082 10.625 5.3125C10.625 6.22418 10.2628 7.09852 9.61818 7.74318C8.97352 8.38784 8.09918 8.75 7.1875 8.75C6.27582 8.75 5.40148 8.38784 4.75682 7.74318C4.11216 7.09852 3.75 6.22418 3.75 5.3125ZM11.875 7.1875C11.875 6.81816 11.9477 6.45243 12.0891 6.1112C12.2304 5.76997 12.4376 5.45993 12.6988 5.19876C12.9599 4.9376 13.27 4.73043 13.6112 4.58909C13.9524 4.44775 14.3182 4.375 14.6875 4.375C15.0568 4.375 15.4226 4.44775 15.7638 4.58909C16.105 4.73043 16.4151 4.9376 16.6762 5.19876C16.9374 5.45993 17.1446 5.76997 17.2859 6.1112C17.4273 6.45243 17.5 6.81816 17.5 7.1875C17.5 7.93342 17.2037 8.64879 16.6762 9.17624C16.1488 9.70368 15.4334 10 14.6875 10C13.9416 10 13.2262 9.70368 12.6988 9.17624C12.1713 8.64879 11.875 7.93342 11.875 7.1875ZM1.25 15.9375C1.25 14.3628 1.87556 12.8526 2.98905 11.7391C4.10255 10.6256 5.61278 10 7.1875 10C8.76222 10 10.2724 10.6256 11.3859 11.7391C12.4994 12.8526 13.125 14.3628 13.125 15.9375V15.94L13.1242 16.0392C13.1224 16.1451 13.0937 16.2489 13.0408 16.3408C12.9879 16.4326 12.9125 16.5095 12.8217 16.5642C11.121 17.5883 9.17272 18.128 7.1875 18.125C5.1275 18.125 3.19917 17.555 1.55417 16.5642C1.46321 16.5096 1.38764 16.4328 1.33457 16.3409C1.28151 16.2491 1.25269 16.1452 1.25083 16.0392L1.25 15.9375ZM14.375 15.94L14.3742 16.06C14.3695 16.3378 14.3032 16.611 14.18 16.86C15.6348 16.9497 17.0878 16.6597 18.3967 16.0183C18.4979 15.9689 18.5838 15.8929 18.6455 15.7986C18.7071 15.7043 18.742 15.5951 18.7467 15.4825C18.7761 14.7835 18.6245 14.0888 18.3066 13.4656C17.9887 12.8424 17.5153 12.3119 16.9321 11.9254C16.349 11.5389 15.6759 11.3096 14.9781 11.2596C14.2803 11.2096 13.5815 11.3406 12.9492 11.64C13.8768 12.8805 14.3769 14.3885 14.3742 15.9375L14.375 15.94Z"/></svg>`;
}

function badgeCircleMarkup() {
  return '<circle class="sessions-rail-item__badge" cx="16.6667" cy="3.74996" r="3.33333" fill="var(--color-notification-dot)"/>';
}

export function renderCalendarBadgeIcon({ badge = true } = {}) {
  return calendarIconMarkup({ badge });
}

function calendarIconMarkup({ badge = true } = {}) {
  const badgeMarkup = badge ? badgeCircleMarkup() : "";

  return `<svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M5.625 1.875C5.79076 1.875 5.94973 1.94085 6.06694 2.05806C6.18415 2.17527 6.25 2.33424 6.25 2.5V3.75H13.75V2.5C13.75 2.33424 13.8158 2.17527 13.9331 2.05806C14.0503 1.94085 14.2092 1.875 14.375 1.875C14.5408 1.875 14.6997 1.94085 14.8169 2.05806C14.9342 2.17527 15 2.33424 15 2.5V3.75H15.625C16.288 3.75 16.9239 4.01339 17.3928 4.48223C17.8616 4.95107 18.125 5.58696 18.125 6.25V15.625C18.125 16.288 17.8616 16.9239 17.3928 17.3928C16.9239 17.8616 16.288 18.125 15.625 18.125H4.375C3.71196 18.125 3.07607 17.8616 2.60723 17.3928C2.13839 16.9239 1.875 16.288 1.875 15.625V6.25C1.875 5.58696 2.13839 4.95107 2.60723 4.48223C3.07607 4.01339 3.71196 3.75 4.375 3.75H5V2.5C5 2.33424 5.06585 2.17527 5.18306 2.05806C5.30027 1.94085 5.45924 1.875 5.625 1.875ZM16.875 9.375C16.875 9.04348 16.7433 8.72554 16.5089 8.49112C16.2745 8.2567 15.9565 8.125 15.625 8.125H4.375C4.04348 8.125 3.72554 8.2567 3.49112 8.49112C3.2567 8.72554 3.125 9.04348 3.125 9.375V15.625C3.125 15.9565 3.2567 16.2745 3.49112 16.5089C3.72554 16.7433 4.04348 16.875 4.375 16.875H15.625C15.9565 16.875 16.2745 16.7433 16.5089 16.5089C16.7433 16.2745 16.875 15.9565 16.875 15.625V9.375Z"/>
  ${badgeMarkup}
</svg>`;
}

function notificationsIconMarkup({ badge = true } = {}) {
  const badgeMarkup = badge ? badgeCircleMarkup() : "";

  return `<svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M4.37502 7.5C4.37502 6.00816 4.96765 4.57742 6.02254 3.52252C7.07744 2.46763 8.50818 1.875 10 1.875C11.4919 1.875 12.9226 2.46763 13.9775 3.52252C15.0324 4.57742 15.625 6.00816 15.625 7.5V8.125C15.625 9.89417 16.2917 11.5058 17.39 12.725C17.4584 12.8008 17.5072 12.8923 17.5321 12.9913C17.557 13.0904 17.5573 13.194 17.5329 13.2932C17.5084 13.3923 17.4601 13.484 17.392 13.5601C17.324 13.6363 17.2383 13.6946 17.1425 13.73C15.8559 14.205 14.5092 14.555 13.1167 14.7658C13.148 15.1943 13.0907 15.6246 12.9483 16.0299C12.8059 16.4352 12.5814 16.8068 12.2889 17.1214C11.9965 17.4361 11.6423 17.6871 11.2484 17.8587C10.8546 18.0303 10.4296 18.1189 10 18.1189C9.57042 18.1189 9.14544 18.0303 8.75161 17.8587C8.35778 17.6871 8.00357 17.4361 7.7111 17.1214C7.41862 16.8068 7.19416 16.4352 7.05174 16.0299C6.90932 15.6246 6.852 15.1943 6.88335 14.7658C5.50973 14.5577 4.16084 14.2103 2.85752 13.7292C2.7618 13.6938 2.67618 13.6356 2.60815 13.5595C2.54012 13.4835 2.49175 13.3919 2.46725 13.2929C2.44276 13.1938 2.44288 13.0903 2.46763 12.9913C2.49237 12.8923 2.54097 12.8009 2.60918 12.725C3.74819 11.4639 4.37758 9.82433 4.37502 8.125V7.5ZM8.12668 14.9167C8.11602 15.1693 8.15658 15.4215 8.24592 15.6581C8.33526 15.8947 8.47153 16.1107 8.64654 16.2933C8.82154 16.4758 9.03167 16.6211 9.26427 16.7203C9.49687 16.8196 9.74714 16.8707 10 16.8707C10.2529 16.8707 10.5032 16.8196 10.7358 16.7203C10.9684 16.6211 11.1785 16.4758 11.3535 16.2933C11.5285 16.1107 11.6648 15.8947 11.7541 15.6581C11.8435 15.4215 11.884 15.1693 11.8734 14.9167C10.627 15.0289 9.37305 15.0289 8.12668 14.9167Z"/>
  ${badgeMarkup}
</svg>`;
}

export function renderSessionsRailItem({
  icon = "home",
  label,
  selected = false,
  badge = icon === "calendar" || icon === "notifications",
  href,
} = {}) {
  const resolvedLabel = label ?? defaultLabel(icon);
  const classes = [
    "sessions-rail-item",
    selected ? "is-selected" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const iconMarkup = renderRailItemIconMarkup(icon, badge);

  if (href) {
    return `<a class="${classes}" href="${href}" aria-label="${resolvedLabel}"${selected ? ' aria-current="page"' : ""}>${iconMarkup}</a>`;
  }

  return `<button class="${classes}" type="button" aria-label="${resolvedLabel}"${selected ? ' aria-pressed="true"' : ""}>${iconMarkup}</button>`;
}

export function renderSessionsNavItem({
  icon,
  label,
  selected = false,
  badge = icon === "calendar" || icon === "notifications",
  href,
  tone,
} = {}) {
  const hasIcon = icon != null;
  const resolvedLabel = label ?? (hasIcon ? defaultLabel(icon) : "");
  const classes = [
    "sessions-nav-item",
    selected ? "is-selected" : "",
    tone === "danger" ? "is-danger" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const iconMarkup = hasIcon ? renderRailItemIconMarkup(icon, badge) : "";
  const content = `${iconMarkup}<span class="sessions-nav-item__label">${escapeHtml(resolvedLabel)}</span>`;

  if (href) {
    return `<a class="${classes}" href="${escapeHtml(href)}" aria-label="${escapeHtml(resolvedLabel)}"${selected ? ' aria-current="page"' : ""}>${content}</a>`;
  }

  return `<button class="${classes}" type="button" aria-label="${escapeHtml(resolvedLabel)}"${selected ? ' aria-pressed="true"' : ""}>${content}</button>`;
}

export function renderSessionsLeftRail({ selected = "home" } = {}) {
  const mainMarkup = RAIL_MAIN_ITEMS
    .map((icon) =>
      renderSessionsRailItem({
        icon,
        selected: icon === selected,
      }),
    )
    .join("");

  const settingsMarkup = renderSessionsRailItem({
    icon: "settings",
    selected: selected === "settings",
  });

  return `<nav class="sessions-left-rail" aria-label="Primary"><div class="sessions-left-rail__items">${mainMarkup}</div><div class="sessions-left-rail__bottom"><hr class="sessions-left-rail__divider" aria-hidden="true" />${settingsMarkup}</div></nav>`;
}

function defaultLabel(icon) {
  return icon.charAt(0).toUpperCase() + icon.slice(1);
}

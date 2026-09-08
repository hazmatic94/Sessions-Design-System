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

  if (icon === "logout") {
    return `<span class="sessions-rail-item__icon sessions-rail-item__icon--img" aria-hidden="true"><img src="${RAIL_ICONS.logout}" width="24" height="24" alt="" /></span>`;
  }

  return `<span class="sessions-rail-item__icon" style="--sessions-rail-icon: url('${iconSrc}')" aria-hidden="true"></span>`;
}

function badgeCircleMarkup() {
  return '<circle class="sessions-rail-item__badge" cx="16.6667" cy="3.74996" r="3.33333"/>';
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

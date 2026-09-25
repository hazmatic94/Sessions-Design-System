import { renderSessionsAvatar } from "../avatar/avatar.js";
import { renderSessionsButton } from "../button/button.js";
import {
  renderSessionsMenuDivider,
  renderSessionsMenuItem,
  renderSessionsMenuPanel,
  renderSessionsMenuUserHeader,
} from "../menu/index.js";
import { renderSessionsChip } from "../chip/chip.js";
import {
  renderSessionsNotificationCardList,
} from "../cards/notificationCard.js";
import { setupSessionsNotifications } from "../cards/notificationInteractions.js";
import { renderMetricCardScrollRegion, setupSessionsMetricCardScrollHints, updateSessionsMetricCardScrollHints } from "../cards/metricCardScrollHint.js";
import { renderSessionsPageHeader } from "../patterns/pageHeader.js";
import { renderSessionsSurface } from "../patterns/surface.js";
import { renderSessionsTabs } from "../tabs/tabs.js";
import { setupSessionsTabs } from "../tabs/interactions.js";
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
    .map((icon) => renderTopNavAction(icon))
    .join("");

  const avatarMarkup = avatar ? renderProfileMenu(avatar) : "";

  const logo = renderSessionsLogo({ href: logoHref, ariaLabel: logoAriaLabel });

  return `<header class="top-nav" aria-label="Primary">${logo}<div class="top-nav__actions" aria-label="Actions"><div class="top-nav__icons">${actions}</div>${avatarMarkup}</div></header>${renderNotificationsSurface()}`;
}

function renderTopNavAction(icon) {
  const markup = renderSessionsRailItem({ icon });
  if (icon !== "notifications") return markup;

  return markup.replace(
    "<button ",
    '<button data-sessions-notifications-trigger aria-expanded="false" aria-haspopup="dialog" ',
  );
}

function renderNotificationsSurface() {
  const close = renderSessionsButton({
    variant: "secondary",
    icon: "close",
    ariaLabel: "Close notifications",
    className: "sessions-surface-close",
  }).replace("<button ", '<button data-sessions-notifications-close ');

  return `<div class="sessions-surface-scrim" data-sessions-notifications-scrim hidden></div><div class="sessions-surface-drawer" data-sessions-notifications-surface hidden>${close}${renderSessionsSurface({ children: renderNotificationsIntro() })}</div>`;
}

function renderNotificationsIntro() {
  const notifications = [
    { title: "Appointment", meta: "Thu, Sep 1 at 2:30pm • Motion", serviceName: "Taper fade", duration: "45min", staffName: "Harry Maher", price: 60 },
    { title: "Appointment", meta: "Fri, Sep 4 at 11:00am • Walk-in", serviceName: "Beard trim", duration: "30min", staffName: "Larry June", price: 35, unread: true },
    { title: "Cancelled appointment", meta: "Thu, Sep 1 at 2:30pm • Motion", serviceName: "Taper fade", duration: "45min", staffName: "Harry Maher", price: 60 },
    { title: "Appointment", meta: "Sat, Sep 5 at 10:00am • Online", serviceName: "Skin fade", duration: "45min", staffName: "Larry June", price: 55, unread: true },
    { title: "Rescheduled appointment", meta: "Mon, Sep 7 at 4:15pm • Phone", serviceName: "Buzz cut", duration: "30min", staffName: "Harry Maher", price: 40 },
    { title: "Appointment", meta: "Tue, Sep 8 at 1:00pm • Walk-in", serviceName: "Line up", duration: "20min", staffName: "Larry June", price: 25, unread: true },
    { title: "Appointment", meta: "Wed, Sep 9 at 9:30am • Online", serviceName: "Hot towel shave", duration: "30min", staffName: "Harry Maher", price: 45 },
    { title: "Reminder", meta: "Thu, Sep 10 at 3:00pm • Motion", serviceName: "Kids cut", duration: "30min", staffName: "Larry June", price: 30, unread: true },
  ];
  const tabs = renderSessionsTabs({
    tabs: [
      { label: "All", value: "all" },
      { label: "Unread", value: "unread" },
    ],
    selected: "all",
  });
  const list = renderMetricCardScrollRegion(
    renderSessionsNotificationCardList(notifications, { className: "sessions-notifications__list" }),
  );

  return `<div class="sessions-notifications"><div class="sessions-notifications__heading">${renderSessionsPageHeader({ title: "Notifications" })}${renderSessionsChip({ label: String(notifications.length) })}</div></div><div class="sessions-notifications__tabs">${tabs}</div>${list}`;
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
  setupSessionsTabs();
  setupSessionsNotifications();
  setupSessionsMetricCardScrollHints(root);
  root.addEventListener("click", (event) => {
    const notificationsTrigger = event.target.closest("[data-sessions-notifications-trigger]");
    if (notificationsTrigger) {
      event.preventDefault();
      const surface = root.querySelector("[data-sessions-notifications-surface]");
      const open = surface?.hidden !== false;
      setNotificationsOpen(root, open);
      if (open) {
        root.querySelectorAll("[data-sessions-profile-menu]").forEach((item) => {
          setProfileMenuOpen(item, false);
        });
      }
      return;
    }

    if (event.target.closest("[data-sessions-notifications-close]")) {
      setNotificationsOpen(root, false);
      return;
    }

    if (event.target.closest("[data-sessions-notifications-surface]")) {
      const tab = event.target.closest(".sessions-notifications__tabs [role='tab']");
      if (tab || event.target.closest("[data-sessions-notification]")) {
        const value = tab?.dataset.tabValue;
        queueMicrotask(() => applyNotificationFilter(root, value));
      }
      return;
    }

    const trigger = event.target.closest("[data-sessions-profile-trigger]");
    if (trigger) {
      event.preventDefault();
      const menu = trigger.closest("[data-sessions-profile-menu]");
      const open = menu?.querySelector("[data-sessions-profile-panel]")?.hidden !== false;
      root.querySelectorAll("[data-sessions-profile-menu]").forEach((item) => {
        setProfileMenuOpen(item, item === menu && open);
      });
      if (open) setNotificationsOpen(root, false);
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
    setNotificationsOpen(root, false);
  });
}

function applyNotificationFilter(root, value) {
  const selectedValue = value
    ?? root.querySelector(".sessions-notifications__tabs .sessions-tabs__tab--selected")?.dataset.tabValue
    ?? "all";
  const unreadOnly = selectedValue === "unread";
  const cards = [...root.querySelectorAll(".sessions-surface-drawer .sessions-notification-card")];

  cards.forEach((card) => {
    const isUnread = card.classList.contains("sessions-notification-card--unread");
    card.classList.toggle("is-filtered-out", unreadOnly && !isUnread);
  });

  const chip = root.querySelector(".sessions-notifications .sessions-chip");
  if (chip) {
    const count = unreadOnly
      ? cards.filter((card) => card.classList.contains("sessions-notification-card--unread")).length
      : cards.length;
    chip.textContent = String(count);
  }

  updateSessionsMetricCardScrollHints(root);
}

function setNotificationsOpen(root, open) {
  const surface = root.querySelector("[data-sessions-notifications-surface]");
  const scrim = root.querySelector("[data-sessions-notifications-scrim]");
  const trigger = root.querySelector("[data-sessions-notifications-trigger]");
  trigger?.setAttribute("aria-expanded", String(open));
  if (surface) surface.hidden = !open;
  if (scrim) scrim.hidden = !open;
}

function setProfileMenuOpen(menu, open) {
  const trigger = menu.querySelector("[data-sessions-profile-trigger]");
  const panel = menu.querySelector("[data-sessions-profile-panel]");
  trigger?.setAttribute("aria-expanded", String(open));
  if (panel) panel.hidden = !open;
}

import { renderSessionsButton, renderSecondaryButton } from "../button/button.js";
import { renderSessionsClientCard } from "../cards/clientCard.js";
import { renderSessionsNotificationCard } from "../cards/notificationCard.js";
import { renderSessionsPageHeader } from "./pageHeader.js";
import { renderSessionsSurface } from "./surface.js";

const UPCOMING = [
  {
    title: "Appointment",
    meta: "Thu, Sep 1 at 2:30pm • Motion",
    serviceName: "Taper fade",
    duration: "45min",
    staffName: "Larry June",
    price: 60,
    status: "Booked",
  },
  {
    title: "Appointment",
    meta: "Thu, Sep 15 at 2:30pm • Motion",
    serviceName: "Taper fade",
    duration: "45min",
    staffName: "Larry June",
    price: 60,
    status: "Booked",
  },
];

function renderUpcomingAppointment(appointment) {
  return renderSessionsNotificationCard({
    ...appointment,
    interactive: false,
    footer: renderSecondaryButton({ label: "Checkout" }),
  });
}

export function renderSessionsClientProfile({ client, appointments = UPCOMING } = {}) {
  const cards = appointments.map((appointment) => renderUpcomingAppointment(appointment)).join("");

  return `<div class="sessions-client-profile"><div class="sessions-client-profile__header">${renderSessionsPageHeader({
    title: "Client profile",
    body: "View, add, edit and delete client details.",
  })}</div>${renderSessionsClientCard({
    name: client.name,
    email: client.email,
    avatarSrc: client.avatarSrc,
    avatarInitial: client.avatarInitial,
    editProfileHref: "",
  })}<section class="sessions-client-profile__upcoming-section"><h3 class="sessions-client-profile__upcoming">Upcoming</h3><div class="sessions-client-profile__list">${cards}</div></section></div>`;
}

export function renderSessionsClientProfileDrawer() {
  const close = renderSessionsButton({
    variant: "secondary",
    icon: "close",
    ariaLabel: "Close client profile",
    className: "sessions-surface-close",
  }).replace("<button ", '<button data-sessions-client-profile-close ');

  return `<div class="sessions-surface-scrim" data-sessions-client-profile-scrim hidden></div><div class="sessions-surface-drawer" data-sessions-client-profile role="dialog" aria-label="Client profile" hidden>${close}${renderSessionsSurface({ children: `<div data-sessions-client-profile-body></div>` })}</div>`;
}

function setClientProfileOpen(root, open) {
  const surface = root.querySelector("[data-sessions-client-profile]");
  const scrim = root.querySelector("[data-sessions-client-profile-scrim]");
  if (surface) surface.hidden = !open;
  if (scrim) scrim.hidden = !open;
}

function setClientActionsOpen(actions, open) {
  const trigger = actions.querySelector(".sessions-button");
  const menu = actions.querySelector(".sessions-client-card__menu");
  actions.classList.toggle("is-open", open);
  trigger?.setAttribute("aria-expanded", String(open));
  if (menu) menu.hidden = !open;
}

function closeClientActions(root) {
  root.querySelectorAll("[data-sessions-client-actions].is-open").forEach((actions) => {
    setClientActionsOpen(actions, false);
  });
}

export function setupSessionsClientProfiles(root, { clients = [] } = {}) {
  const findClient = (name) => clients.find((client) => client.name === name);

  root.addEventListener("click", (event) => {
    if (event.target.closest("[data-sessions-client-profile-close], [data-sessions-client-profile-scrim]")) {
      closeClientActions(root);
      setClientProfileOpen(root, false);
      return;
    }

    const trigger = event.target.closest("[data-sessions-client-actions] > .sessions-button");
    if (trigger) {
      event.preventDefault();
      const actions = trigger.closest("[data-sessions-client-actions]");
      const open = actions.classList.contains("is-open");
      closeClientActions(root);
      setClientActionsOpen(actions, !open);
      return;
    }

    if (event.target.closest("[data-sessions-client-action]")) {
      event.preventDefault();
      closeClientActions(root);
      return;
    }

    if (!event.target.closest(".sessions-client-card__menu")) closeClientActions(root);

    const row = event.target.closest("[data-sessions-client-row]");
    if (!row || event.target.closest(".sessions-checkbox")) return;
    const client = findClient(row.dataset.sessionsClientName);
    const body = root.querySelector("[data-sessions-client-profile-body]");
    if (!client || !body) return;
    body.innerHTML = renderSessionsClientProfile({ client });
    setClientProfileOpen(root, true);
  });

  root.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (root.querySelector("[data-sessions-client-actions].is-open")) {
      closeClientActions(root);
      return;
    }
    setClientProfileOpen(root, false);
  });
}

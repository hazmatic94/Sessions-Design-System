import { renderSessionsButton, renderGhostButton, renderSecondaryButton } from "../button/button.js";
import { renderSessionsAvatar } from "../avatar/avatar.js";
import { renderSessionsClientCard } from "../cards/clientCard.js";
import { renderSessionsNotificationCard } from "../cards/notificationCard.js";
import { renderSessionsClientForm } from "./addClient.js";
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

function splitClientName(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return { firstName: parts[0] || "", lastName: parts.slice(1).join(" ") };
}

function splitClientPhone(phone = "") {
  const match = phone.trim().match(/^(\+\d+)\s*(.*)$/);
  if (!match) return { countryCode: "+61", phone: phone.trim() };
  return { countryCode: match[1], phone: match[2] };
}

function renderClientEdit(client) {
  const { firstName, lastName } = splitClientName(client.name);
  const { countryCode, phone } = splitClientPhone(client.phone || "");
  const back = renderGhostButton({
    label: "Back",
    icon: "chevron-left",
    className: "sessions-client-edit__back",
  }).replace("<button ", '<button data-sessions-edit-client-cancel ');
  const cancel = renderSessionsButton({
    variant: "secondary",
    label: "Cancel",
  }).replace("<button ", '<button data-sessions-edit-client-cancel ');
  const save = renderSessionsButton({
    variant: "primary",
    label: "Save",
    type: "submit",
  }).replace("<button ", '<button form="sessions-edit-client-form" ');

  return `<div class="sessions-client-edit" data-sessions-edit-client><div class="sessions-notifications">${back}<div class="sessions-notifications__heading">${renderSessionsPageHeader({
    title: "Profile",
    body: "Manage your client's personal profile",
  })}</div>${renderSessionsAvatar({
    src: client.avatarSrc,
    name: client.name,
    initial: client.avatarInitial,
    size: "large",
  })}${renderSessionsClientForm({
    idPrefix: "edit-client",
    formId: "sessions-edit-client-form",
    formAttribute: "data-sessions-edit-client-form",
    firstName,
    lastName,
    email: client.email,
    phone,
    countryCode,
  })}<div class="sessions-client-edit__actions">${cancel}${save}</div></div></div>`;
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

function clientFromListRow(row) {
  const name = row.dataset.sessionsClientName || "";
  const email = row.querySelector(".sessions-client-list__email")?.textContent?.trim() || "";
  const avatarImg = row.querySelector(".sessions-avatar img");
  const avatarInitial = row.querySelector(".sessions-avatar__initial")?.textContent?.trim();

  return {
    name,
    email,
    avatarSrc: avatarImg?.getAttribute("src") || "",
    avatarInitial,
  };
}

function clientProfileBindingEl(root) {
  return root === document ? document.documentElement : root;
}

export function setupSessionsClientProfiles(root = document, { clients = [] } = {}) {
  const binding = clientProfileBindingEl(root);
  if (binding.dataset.sessionsClientProfilesBound === "true") return;
  binding.dataset.sessionsClientProfilesBound = "true";

  const findClient = (name) => clients.find((client) => client.name === name);
  let currentClient = null;

  const showProfile = () => {
    const body = root.querySelector("[data-sessions-client-profile-body]");
    if (!currentClient || !body) return;
    body.innerHTML = renderSessionsClientProfile({ client: currentClient });
  };

  root.addEventListener("click", (event) => {
    if (event.target.closest("[data-sessions-edit-client-cancel]")) {
      event.preventDefault();
      showProfile();
      return;
    }

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

    const action = event.target.closest("[data-sessions-client-action]");
    if (action) {
      event.preventDefault();
      closeClientActions(root);
      if (action.dataset.sessionsClientAction === "edit") {
        const body = root.querySelector("[data-sessions-client-profile-body]");
        if (currentClient && body) body.innerHTML = renderClientEdit(currentClient);
      }
      return;
    }

    if (!event.target.closest(".sessions-client-card__menu")) closeClientActions(root);

    const row = event.target.closest("[data-sessions-client-row]");
    if (!row || event.target.closest(".sessions-checkbox")) return;
    const body = root.querySelector("[data-sessions-client-profile-body]");
    if (!body) return;
    const client =
      findClient(row.dataset.sessionsClientName) ?? clientFromListRow(row);
    if (!client.name) return;
    currentClient = client;
    body.innerHTML = renderSessionsClientProfile({ client });
    setClientProfileOpen(root, true);
  });

  root.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (root.querySelector("[data-sessions-client-actions].is-open")) {
      closeClientActions(root);
      return;
    }
    if (root.querySelector("[data-sessions-edit-client]")) {
      showProfile();
      return;
    }
    setClientProfileOpen(root, false);
  });

  root.addEventListener("submit", (event) => {
    if (event.target.closest("[data-sessions-edit-client-form]")) event.preventDefault();
  });
}

import { renderSessionsAvatar } from "../avatar/avatar.js";
import { renderSecondaryButton } from "../button/button.js";
import { renderSessionsCheckbox } from "../checkbox/checkbox.js";
import { renderSessionsMenuItem } from "../menu/item.js";
import { renderSessionsMenuPanel } from "../menu/panel.js";
import { escapeHtml } from "../../utils.js";

const SORT_ICON = "/assets/IconArrow.svg";

const TEAM_ACTIONS = [
  { value: "edit", label: "Edit" },
  { value: "calendar", label: "View calendar" },
  { value: "shifts", label: "View scheduled shifts" },
  { value: "time-off", label: "Add time off" },
];

function renderTeamActions(name) {
  const items = TEAM_ACTIONS.map((item) =>
    renderSessionsMenuItem({
      icon: "",
      label: item.label,
      className: "sessions-team-list__option",
      attributes: {
        role: "menuitem",
        "data-sessions-team-action": item.value,
      },
    }),
  ).join("");
  const button = renderSecondaryButton({
    label: "Actions",
    icon: "chevron-down",
    iconPosition: "end",
    ariaLabel: `Actions for ${name}`,
  });

  return `<div class="sessions-team-list__actions" data-sessions-team-actions>${button}<div class="sessions-team-list__menu" role="menu" hidden>${renderSessionsMenuPanel({ children: items })}</div></div>`;
}

function renderContact({ email, phone }) {
  if (!email && !phone) return `<div class="sessions-team-list__contact"></div>`;

  const emailMarkup = email
    ? `<p class="sessions-team-list__email">${escapeHtml(email)}</p>`
    : "";
  const phoneMarkup = phone
    ? `<p class="sessions-team-list__phone">${escapeHtml(phone)}</p>`
    : "";

  return `<div class="sessions-team-list__contact">${emailMarkup}${phoneMarkup}</div>`;
}

export function renderSessionsTeamMemberRow({
  name = "",
  email = "",
  phone = "",
  role = "",
  avatarSrc = "",
  avatarInitial,
  checked = false,
} = {}) {
  const checkbox = renderSessionsCheckbox({
    checked,
    attributes: { "aria-label": `Select ${name}` },
  });
  const avatar = renderSessionsAvatar({
    src: avatarSrc,
    name,
    initial: avatarInitial || name,
    size: "small",
  });
  return `<div class="sessions-team-list__row${checked ? " is-selected" : ""}">${checkbox}<div class="sessions-team-list__member">${avatar}<p class="sessions-team-list__name">${escapeHtml(name)}</p></div>${renderContact({ email, phone })}<span class="sessions-team-list__role">${escapeHtml(role)}</span>${renderTeamActions(name)}</div>`;
}

function setTeamActionsOpen(actions, open) {
  const trigger = actions.querySelector(".sessions-button");
  const menu = actions.querySelector(".sessions-team-list__menu");
  actions.classList.toggle("is-open", open);
  trigger?.setAttribute("aria-expanded", String(open));
  if (menu) menu.hidden = !open;
}

function closeTeamActions(root, except) {
  root.querySelectorAll("[data-sessions-team-actions].is-open").forEach((actions) => {
    if (actions !== except) setTeamActionsOpen(actions, false);
  });
}

export function setupSessionsTeamLists(root = document) {
  if (root.dataset.sessionsTeamListsBound === "true") return;
  root.dataset.sessionsTeamListsBound = "true";

  root.querySelectorAll("[data-sessions-team-actions] > .sessions-button").forEach((trigger) => {
    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-expanded", "false");
  });

  root.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-sessions-team-actions] > .sessions-button");
    if (trigger) {
      event.preventDefault();
      const actions = trigger.closest("[data-sessions-team-actions]");
      const open = actions.classList.contains("is-open");
      closeTeamActions(root);
      setTeamActionsOpen(actions, !open);
      return;
    }

    const option = event.target.closest("[data-sessions-team-action]");
    if (option) {
      event.preventDefault();
      closeTeamActions(root);
      return;
    }

    if (event.target.closest(".sessions-team-list__menu")) return;
    closeTeamActions(root);
  });

  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeTeamActions(root);
  });
}

export function renderSessionsTeamList({ rows = [] } = {}) {
  const headerCheckbox = renderSessionsCheckbox({
    attributes: { "aria-label": "Select all team members" },
  });
  const header = `<div class="sessions-team-list__row sessions-team-list__head">${headerCheckbox}<span class="sessions-team-list__sort">Name<span class="sessions-team-list__sort-icon" style="--sessions-team-list-sort: url('${SORT_ICON}')" aria-hidden="true"></span></span><span>Contact</span><span>Permission role</span><span></span></div>`;
  const body = rows.map((row) => renderSessionsTeamMemberRow(row)).join("");

  return `<div class="sessions-team-list">${header}${body}</div>`;
}

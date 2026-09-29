import { renderSessionsAvatar } from "../avatar/avatar.js";
import { renderSessionsCheckbox } from "../checkbox/checkbox.js";
import { escapeHtml } from "../../utils.js";

const SORT_ICON = "/assets/IconArrow.svg";

function renderClientIdentity({ name, email, avatarSrc, avatarInitial }) {
  const avatar = renderSessionsAvatar({
    src: avatarSrc,
    name,
    initial: avatarInitial || name,
    size: "small",
  });

  return `<div class="sessions-client-list__client">${avatar}<div class="sessions-client-list__details"><p class="sessions-client-list__name">${escapeHtml(name)}</p><p class="sessions-client-list__email">${escapeHtml(email)}</p></div></div>`;
}

export function renderSessionsClientListRow({
  name = "",
  email = "",
  phone = "",
  sales = "",
  createdOn = "",
  avatarSrc = "",
  avatarInitial,
  checked = false,
} = {}) {
  const checkbox = renderSessionsCheckbox({
    checked,
    attributes: { "aria-label": `Select ${name}` },
  });

  return `<div class="sessions-client-list__row${checked ? " is-selected" : ""}" data-sessions-client-row data-sessions-client-name="${escapeHtml(name)}">${checkbox}${renderClientIdentity({
    name,
    email,
    avatarSrc,
    avatarInitial,
  })}<span class="sessions-client-list__value">${escapeHtml(phone)}</span><span class="sessions-client-list__value">${escapeHtml(sales)}</span><span class="sessions-client-list__value">${escapeHtml(createdOn)}</span></div>`;
}

export function renderSessionsClientList({ rows = [] } = {}) {
  const headerCheckbox = renderSessionsCheckbox({
    attributes: { "aria-label": "Select all clients" },
  });
  const header = `<div class="sessions-client-list__row sessions-client-list__head">${headerCheckbox}<span>Client name</span><span>Mobile number</span><span>Sales</span><span class="sessions-client-list__sort">Created on<span class="sessions-client-list__sort-icon" style="--sessions-client-list-sort: url('${SORT_ICON}')" aria-hidden="true"></span></span></div>`;
  const body = rows.map((row) => renderSessionsClientListRow(row)).join("");

  return `<div class="sessions-client-list">${header}${body}</div>`;
}

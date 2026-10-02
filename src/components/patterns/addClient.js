import { renderSessionsButton } from "../button/button.js";
import { renderSessionsInput } from "../input/input.js";
import { renderSessionsPageHeader } from "./pageHeader.js";
import { renderSessionsSurface } from "./surface.js";

const COUNTRY_CODES = ["+61", "+64", "+44", "+1"];

export function renderSessionsAddClientDrawer() {
  const close = renderSessionsButton({
    variant: "secondary",
    icon: "close",
    ariaLabel: "Close add client",
    className: "sessions-surface-close",
  }).replace("<button ", '<button data-sessions-add-client-close ');
  const cancel = renderSessionsButton({
    variant: "secondary",
    label: "Cancel",
  }).replace("<button ", '<button data-sessions-add-client-close ');
  const save = renderSessionsButton({
    variant: "primary",
    label: "Save",
    type: "submit",
  }).replace("<button ", '<button form="sessions-add-client-form" ');
  const body = `<div class="sessions-notifications" data-sessions-add-client-body><div class="sessions-notifications__heading">${renderSessionsPageHeader({
    title: "Add new client",
    body: "Add your new clients information here",
  })}</div>${renderAddClientForm()}</div><div class="sessions-add-client__actions">${cancel}${save}</div>`;

  return `<div class="sessions-surface-scrim" data-sessions-add-client-scrim hidden></div><div class="sessions-surface-drawer" data-sessions-add-client role="dialog" aria-label="Add new client" hidden>${close}${renderSessionsSurface({ children: body })}</div>`;
}

function renderAddClientForm({
  idPrefix = "add-client",
  formId = "sessions-add-client-form",
  formAttribute = "data-sessions-add-client-form",
  firstName = "",
  lastName = "",
  email = "",
  phone = "",
  countryCode = "+61",
  note = "",
} = {}) {
  const first = renderSessionsInput({
    label: "First name",
    placeholder: "e.g. James",
    name: "firstName",
    id: `${idPrefix}-first-name`,
    value: firstName,
  });
  const last = renderSessionsInput({
    label: "Last name",
    placeholder: "e.g. Ederveen",
    name: "lastName",
    id: `${idPrefix}-last-name`,
    value: lastName,
  });
  const emailField = renderSessionsInput({
    label: "Email",
    placeholder: "e.g. James",
    name: "email",
    type: "email",
    id: `${idPrefix}-email`,
    value: email,
    fullWidth: true,
  });
  const phoneField = renderSessionsInput({
    label: "",
    placeholder: "e.g. 0461455500",
    name: "phone",
    type: "tel",
    id: `${idPrefix}-phone`,
    value: phone,
    ariaLabel: "Phone number",
  });
  const noteField = renderSessionsInput({
    label: "Note",
    placeholder: "Add your note here",
    name: "note",
    id: `${idPrefix}-note`,
    value: note,
    multiline: true,
    fullWidth: true,
  });

  return `<form class="sessions-add-client__form" id="${formId}" ${formAttribute}><div class="sessions-add-client__names">${first}${last}</div>${emailField}<div class="sessions-add-client__phone"><span class="sessions-input__label">Phone</span><div class="sessions-add-client__phone-row">${renderCountryCode(countryCode)}${phoneField}</div></div>${noteField}</form>`;
}

export function renderSessionsClientForm(options) {
  return renderAddClientForm(options);
}

function renderCountryCode(selected = "+61") {
  const options = COUNTRY_CODES.map(
    (code) => `<option value="${code}"${code === selected ? " selected" : ""}>${code}</option>`,
  ).join("");

  return `<label class="sessions-input sessions-add-client__code"><span class="sessions-input__control"><select class="sessions-input__field" name="countryCode" aria-label="Country code">${options}</select></span></label>`;
}

function setAddClientOpen(root, open) {
  const surface = root.querySelector("[data-sessions-add-client]");
  const scrim = root.querySelector("[data-sessions-add-client-scrim]");
  if (surface) surface.hidden = !open;
  if (scrim) scrim.hidden = !open;
}

export function setupSessionsAddClient(root) {
  root.addEventListener("click", (event) => {
    if (event.target.closest("[data-sessions-add-client-open]")) {
      setAddClientOpen(root, true);
      return;
    }

    const drawer = root.querySelector("[data-sessions-add-client]");
    if (!drawer || drawer.hidden) return;
    if (event.target.closest("[data-sessions-add-client-close], [data-sessions-add-client-scrim]")) {
      setAddClientOpen(root, false);
    }
  });

  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setAddClientOpen(root, false);
  });
  root.addEventListener("submit", (event) => {
    if (event.target.closest("[data-sessions-add-client-form]")) event.preventDefault();
  });
}

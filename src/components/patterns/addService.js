import { renderSessionsButton } from "../button/button.js";
import { renderSessionsInput } from "../input/input.js";
import { renderSessionsPageHeader } from "./pageHeader.js";
import { renderSessionsSurface } from "./surface.js";

export function renderSessionsAddServiceDrawer() {
  const close = renderSessionsButton({
    variant: "secondary",
    icon: "close",
    ariaLabel: "Close add service",
    className: "sessions-surface-close",
  }).replace("<button ", '<button data-sessions-add-service-close ');
  const cancel = renderSessionsButton({
    variant: "secondary",
    label: "Cancel",
  }).replace("<button ", '<button data-sessions-add-service-close ');
  const save = renderSessionsButton({
    variant: "primary",
    label: "Save",
    type: "button",
    disabled: true,
  }).replace("<button ", '<button data-sessions-add-service-continue ');
  const body = `<div class="sessions-notifications" data-sessions-add-service-body><div class="sessions-notifications__heading">${renderSessionsPageHeader({
    title: "Service details",
    body: "Add your new service details here",
  })}</div>${renderAddServiceForm()}</div><div class="sessions-add-client__actions">${cancel}${save}</div>`;

  return `<div class="sessions-surface-scrim" data-sessions-add-service-scrim hidden></div><div class="sessions-surface-drawer" data-sessions-add-service role="dialog" aria-label="Service details" hidden>${close}${renderSessionsSurface({ children: body })}</div>`;
}

function renderAddServiceForm() {
  const name = countedField(
    renderSessionsInput({
      label: "Service name",
      placeholder: "Add a service name, e.g. Men's Haircut",
      name: "serviceName",
      id: "add-service-name",
      fullWidth: true,
    }),
    255,
  );
  const description = countedField(
    renderSessionsInput({
      label: "Description (Optional)",
      placeholder: "Add a short description",
      name: "description",
      id: "add-service-description",
      multiline: true,
      fullWidth: true,
    }),
    1000,
  );

  return `<form class="sessions-add-client__form" id="sessions-add-service-form" data-sessions-add-service-form>${name}${description}<div class="sessions-add-service__pricing"><h3 class="sessions-add-service__pricing-title">Pricing and duration</h3>${renderPricingForm()}</div></form>`;
}

function countedField(markup, max) {
  const field = markup
    .replace("<input ", `<input maxlength="${max}" `)
    .replace("<textarea ", `<textarea maxlength="${max}" `);
  return `<div class="sessions-add-service__counted">${field}<span class="sessions-add-service__count" data-sessions-add-service-count>0/${max}</span></div>`;
}

function renderPricingForm() {
  return `<div class="sessions-add-client__form">${renderSelect({
    label: "Price type",
    name: "priceType",
    id: "add-service-price-type",
    value: "fixed",
    options: [
      ["fixed", "Fixed"],
      ["free", "Free"],
      ["from", "From"],
    ],
  })}${renderPriceField()}${renderSelect({
    label: "Duration",
    name: "duration",
    id: "add-service-duration",
    value: "60",
    options: [
      ["15", "15 min"],
      ["30", "30 min"],
      ["45", "45 min"],
      ["60", "1 hr"],
      ["90", "1 hr 30 min"],
      ["120", "2 hr"],
    ],
  })}</div>`;
}

function renderSelect({ label, name, id, value, options }) {
  const items = options
    .map(([optionValue, optionLabel]) => {
      const selected = optionValue === value ? " selected" : "";
      return `<option value="${optionValue}"${selected}>${optionLabel}</option>`;
    })
    .join("");
  return `<label class="sessions-input sessions-add-service__select"><span class="sessions-input__label">${label}</span><span class="sessions-input__control"><select class="sessions-input__field" name="${name}" id="${id}">${items}</select></span></label>`;
}

function renderPriceField() {
  return `<label class="sessions-input sessions-add-service__price"><span class="sessions-input__label">Price</span><span class="sessions-input__control"><span class="sessions-add-service__prefix">A$</span><input class="sessions-input__field" name="price" id="add-service-price" inputmode="decimal" value="0.00" data-sessions-add-service-price /><span class="sessions-add-service__stepper"><button type="button" data-sessions-add-service-price-step="1" aria-label="Increase price"><img src="/assets/IconChevronUp.svg" alt="" /></button><button type="button" data-sessions-add-service-price-step="-1" aria-label="Decrease price"><img src="/assets/IconChevronDown.svg" alt="" /></button></span></span></label>`;
}

function setAddServiceOpen(root, open) {
  const surface = root.querySelector("[data-sessions-add-service]");
  const scrim = root.querySelector("[data-sessions-add-service-scrim]");
  if (surface) surface.hidden = !open;
  if (scrim) scrim.hidden = !open;
  if (open) {
    syncAddServiceContinue(root);
    requestAnimationFrame(() => syncAddServiceScroll(root));
  }
}

function syncAddServiceScroll(root) {
  const drawer = root.querySelector("[data-sessions-add-service]");
  const body = root.querySelector("[data-sessions-add-service-body]");
  if (!drawer || !body) return;
  const overflow = body.scrollHeight - body.clientHeight > 1;
  const atEnd = body.scrollTop + body.clientHeight >= body.scrollHeight - 1;
  drawer.classList.toggle("is-scrollable", overflow && !atEnd);
}

function syncAddServiceContinue(root) {
  const button = root.querySelector("[data-sessions-add-service-continue]");
  const name = root.querySelector("#add-service-name");
  if (button) button.disabled = !name?.value.trim();
}

export function setupSessionsAddService(root) {
  root.addEventListener("click", (event) => {
    if (event.target.closest("[data-sessions-add-service-open]")) {
      setAddServiceOpen(root, true);
      return;
    }

    const drawer = root.querySelector("[data-sessions-add-service]");
    if (!drawer || drawer.hidden) return;

    const step = Number(event.target.closest("[data-sessions-add-service-price-step]")?.dataset.sessionsAddServicePriceStep);
    if (step) {
      const field = root.querySelector("[data-sessions-add-service-price]");
      if (!field) return;
      const next = Math.max(0, (Number(field.value) || 0) + step);
      field.value = next.toFixed(2);
      return;
    }

    if (event.target.closest("[data-sessions-add-service-close], [data-sessions-add-service-scrim]")) {
      setAddServiceOpen(root, false);
    }
  });

  root.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const drawer = root.querySelector("[data-sessions-add-service]");
    if (drawer && !drawer.hidden) setAddServiceOpen(root, false);
  });

  root.addEventListener("input", (event) => {
    const field = event.target.closest("[data-sessions-add-service] .sessions-input__field");
    if (!field) return;
    if (field.maxLength >= 0) {
      const count = field.closest(".sessions-add-service__counted")?.querySelector("[data-sessions-add-service-count]");
      if (count) count.textContent = `${field.value.length}/${field.maxLength}`;
    }
    if (field.id === "add-service-name") syncAddServiceContinue(root);
  });

  root.addEventListener("scroll", (event) => {
    if (event.target.closest?.("[data-sessions-add-service-body]")) syncAddServiceScroll(root);
  }, true);

  window.addEventListener("resize", () => syncAddServiceScroll(root));

  root.addEventListener("submit", (event) => {
    if (event.target.closest("[data-sessions-add-service-form]")) event.preventDefault();
  });
}

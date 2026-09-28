import { renderSecondaryButton } from "../button/button.js";
import { renderSessionsMenuItem } from "../menu/item.js";
import { renderSessionsMenuPanel } from "../menu/panel.js";
import { renderSessionsSearch } from "../search/search.js";

const SORT_OPTIONS = [
  { value: "first-name-az", label: "First name (A-Z)" },
  { value: "first-name-za", label: "First name (Z-A)" },
  { value: "created-oldest", label: "Created at (oldest first)" },
  { value: "created-newest", label: "Created at (newest first)" },
];

function renderSortMenu(selected) {
  const items = SORT_OPTIONS.map((item) =>
    renderSessionsMenuItem({
      icon: "",
      label: item.label,
      state: item.value === selected ? "selected" : "default",
      className: "sessions-filter-bar__option",
      attributes: {
        role: "menuitemradio",
        "aria-checked": item.value === selected ? "true" : "false",
        "data-sessions-filter-sort-option": item.value,
      },
    }),
  ).join("");

  return `<div class="sessions-filter-bar__menu" role="menu" hidden>${renderSessionsMenuPanel({ children: items })}</div>`;
}

export function renderSessionsFilterBar({
  placeholder = "Name, email or phone",
  sortLabel = "Created at (newest first)",
  sortOptions = SORT_OPTIONS,
  filtersLabel = "",
  name = "client-search",
} = {}) {
  const selected =
    sortOptions.find((item) => item.label === sortLabel)?.value ?? sortOptions[0]?.value ?? "created-newest";
  const search = renderSessionsSearch({
    placeholder,
    ariaLabel: placeholder,
    name,
  });
  const filters = filtersLabel
    ? renderSecondaryButton({
        label: filtersLabel,
        icon: "filters",
        ariaLabel: filtersLabel,
      })
    : "";
  const sort = renderSecondaryButton({
    label: sortLabel,
    icon: "sort",
    iconPosition: "end",
    ariaLabel: sortLabel,
  });
  const sortControl = sortOptions.length
    ? `<div class="sessions-filter-bar__sort" data-sessions-filter-sort data-sessions-filter-sort-value="${selected}">${sort}${renderSortMenu(selected)}</div>`
    : sort;
  const leading = filters ? `<div class="sessions-filter-bar__start">${search}${filters}</div>` : search;

  return `<div class="sessions-filter-bar">${leading}${sortControl}</div>`;
}

function setFilterSortOpen(sort, open) {
  const trigger = sort.querySelector(".sessions-button");
  const menu = sort.querySelector(".sessions-filter-bar__menu");
  sort.classList.toggle("is-open", open);
  trigger?.setAttribute("aria-haspopup", "menu");
  trigger?.setAttribute("aria-expanded", String(open));
  if (menu) menu.hidden = !open;
}

function closeFilterSorts(root, except) {
  root.querySelectorAll("[data-sessions-filter-sort].is-open").forEach((sort) => {
    if (sort !== except) setFilterSortOpen(sort, false);
  });
}

function applyFilterSort(sort, value) {
  const option = SORT_OPTIONS.find((item) => item.value === value);
  sort.dataset.sessionsFilterSortValue = value;
  const label = sort.querySelector(".sessions-button__label");
  if (label && option) label.textContent = option.label;
  sort.querySelector(".sessions-button")?.setAttribute("aria-label", option?.label ?? value);
  sort.querySelectorAll("[data-sessions-filter-sort-option]").forEach((item) => {
    const selected = item.dataset.sessionsFilterSortOption === value;
    item.classList.toggle("is-selected", selected);
    item.setAttribute("aria-checked", String(selected));
  });
  setFilterSortOpen(sort, false);
  sort.dispatchEvent(
    new CustomEvent("sessions:filter-sort", { bubbles: true, detail: { value } }),
  );
}

export function setupSessionsFilterBars(root = document) {
  if (root.dataset.sessionsFilterBarsBound === "true") return;
  root.dataset.sessionsFilterBarsBound = "true";

  root.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-sessions-filter-sort] > .sessions-button");
    if (trigger) {
      event.preventDefault();
      const sort = trigger.closest("[data-sessions-filter-sort]");
      const open = sort.classList.contains("is-open");
      closeFilterSorts(root);
      setFilterSortOpen(sort, !open);
      return;
    }

    const option = event.target.closest("[data-sessions-filter-sort-option]");
    if (option) {
      event.preventDefault();
      applyFilterSort(option.closest("[data-sessions-filter-sort]"), option.dataset.sessionsFilterSortOption);
      return;
    }

    if (event.target.closest(".sessions-filter-bar__menu")) return;
    closeFilterSorts(root);
  });

  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeFilterSorts(root);
  });
}

import { escapeHtml } from "../../utils.js";

const SEARCH_ICON = "/assets/IconSearch.svg";

export function renderSessionsSearch({
  placeholder = "Search",
  value = "",
  name = "search",
  id,
  ariaLabel,
} = {}) {
  const label = ariaLabel || placeholder;

  return `<label class="sessions-search"><span class="sessions-search__icon" style="--sessions-search-icon: url('${SEARCH_ICON}')" aria-hidden="true"></span><input class="sessions-search__field" type="search" name="${escapeHtml(name)}"${id ? ` id="${escapeHtml(id)}"` : ""} placeholder="${escapeHtml(placeholder)}" aria-label="${escapeHtml(label)}"${value ? ` value="${escapeHtml(value)}"` : ""} /></label>`;
}

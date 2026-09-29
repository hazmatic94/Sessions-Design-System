import { escapeHtml } from "../../utils.js";
import { renderSessionsAvatar } from "../avatar/avatar.js";
import { renderSecondaryButton } from "../button/button.js";
import { renderSessionsCheckbox } from "../checkbox/checkbox.js";
import {
  renderSessionsMenuDivider,
  renderSessionsMenuItem,
  renderSessionsMenuPanel,
} from "../menu/index.js";
import {
  parseNavigatorDate,
  renderSessionsCalendarViewNavigator,
  renderSessionsNavigator,
  toNavigatorDateValue,
} from "./navigator.js?v=sessions-calendar-header-icons-v1";

const TEAM_ICON = "/assets/IconTeam.svg";
const CHEVRON_DOWN_ICON = "/assets/IconChevronDown.svg";
// ponytail: en-US short weekday + day + month; re-pick if mobile format changes
export const CALENDAR_HEADER_MOBILE_DATE_SIZING_TEXT = "Wed 31 Aug";

export function formatCalendarHeaderMobileDate(value = new Date()) {
  const date = parseNavigatorDate(value);

  return `${date.toLocaleDateString("en-US", { weekday: "short" })} ${date.getDate()} ${date.toLocaleDateString("en-US", { month: "short" })}`;
}

function renderMobileCalendarHeaderDateButton({ date, dateLabel }) {
  const dateValue = toNavigatorDateValue(date);
  const resolvedDateLabel = dateLabel ?? formatCalendarHeaderMobileDate(dateValue);

  return `<button class="sessions-button sessions-button--secondary sessions-button--icon-end sessions-calendar-header-row__mobile-date" type="button" data-sessions-calendar-header-mobile-date data-sessions-calendar-header-mobile-date-value="${escapeHtml(dateValue)}" aria-haspopup="dialog" aria-label="${escapeHtml(resolvedDateLabel)}"><span class="sessions-calendar-header-row__mobile-date-wrap"><span class="sessions-calendar-header-row__mobile-date-sizing" aria-hidden="true">${escapeHtml(CALENDAR_HEADER_MOBILE_DATE_SIZING_TEXT)}</span><span class="sessions-calendar-header-row__mobile-date-label" data-sessions-calendar-header-mobile-date-label>${escapeHtml(resolvedDateLabel)}</span></span>${renderHeaderAssetIcon(CHEVRON_DOWN_ICON)}</button>`;
}

function renderHeaderAssetIcon(src, className = "") {
  const classes = ["sessions-button__icon", "sessions-button__icon--img", className]
    .filter(Boolean)
    .join(" ");

  return `<img class="${classes}" src="${src}" width="24" height="24" alt="" aria-hidden="true" />`;
}

function renderHeaderIconButton({ src, ariaLabel, className = "", attributes = {} }) {
  const attrs = Object.entries(attributes)
    .map(([key, value]) => `${key}="${escapeHtml(String(value ?? ""))}"`)
    .join(" ");

  return `<button class="sessions-button sessions-button--secondary sessions-button--icon-only ${className}" type="button" aria-label="${escapeHtml(ariaLabel)}"${attrs ? ` ${attrs}` : ""}>${renderHeaderAssetIcon(src)}</button>`;
}

function renderTeamMemberRow({ person, checked = true }) {
  const avatar = person.avatarSrc
    ? renderSessionsAvatar({
        src: person.avatarSrc,
        alt: "",
        size: "small",
        className: "sessions-team-menu__avatar",
      })
    : renderSessionsAvatar({
        initial: person.avatarInitial ?? person.name,
        alt: "",
        size: "small",
        className: "sessions-team-menu__avatar",
      });

  return `<label class="sessions-team-menu__member">${renderSessionsCheckbox({
    checked,
    attributes: { "data-sessions-team-member": person.name },
  })}${avatar}<span class="sessions-team-menu__name">${escapeHtml(person.name)}</span></label>`;
}

function renderTeamMenu({ team, youName }) {
  const you = team.find((person) => person.name === youName) ?? team[0];
  const youLabel = you ? `${you.name} (You)` : "You";
  const filters = [
    renderSessionsMenuItem({
      icon: "scheduled",
      label: "Scheduled team",
      className: "sessions-team-menu__option",
      attributes: { "data-sessions-team-filter": "scheduled" },
    }),
    renderSessionsMenuItem({
      icon: "team",
      label: "All team",
      className: "sessions-team-menu__option",
      attributes: { "data-sessions-team-filter": "all" },
    }),
  ].join("");
  const youAvatar = you
    ? you.avatarSrc
      ? renderSessionsAvatar({
          src: you.avatarSrc,
          alt: "",
          size: "small",
          className: "sessions-team-menu__avatar",
        })
      : renderSessionsAvatar({
          initial: you.avatarInitial ?? you.name,
          alt: "",
          size: "small",
          className: "sessions-team-menu__avatar",
        })
    : "";
  const youRow = `<button class="sessions-menu-item is-selected sessions-team-menu__option" type="button" data-sessions-team-filter="you" aria-pressed="true">${youAvatar}<span class="sessions-menu-item__label">${escapeHtml(youLabel)}</span></button>`;
  const members = [
    `<label class="sessions-team-menu__member">${renderSessionsCheckbox({
      checked: false,
      attributes: { "data-sessions-team-all": "" },
    })}<span class="sessions-team-menu__name">All team members</span></label>`,
    ...team.map((person) =>
      renderTeamMemberRow({ person, checked: person.name === you?.name }),
    ),
  ].join("");

  return `<div class="sessions-team-menu__panel" role="menu" hidden>${renderSessionsMenuPanel({
    children: `${filters}${youRow}${renderSessionsMenuDivider()}${members}`,
  })}</div>`;
}

function renderTeamMenuButton({ team, youName, teamAriaLabel }) {
  return `<div class="sessions-team-menu" data-sessions-team-menu data-sessions-team-you="${escapeHtml(youName)}">${renderHeaderIconButton({
    src: TEAM_ICON,
    ariaLabel: teamAriaLabel,
    className: "sessions-calendar-header-row__team",
    attributes: {
      "data-sessions-team-menu-trigger": "",
      "aria-haspopup": "menu",
      "aria-expanded": "false",
    },
  })}${renderTeamMenu({ team, youName })}</div>`;
}

function renderCalendarHeaderAddButton({ label }) {
  return `<button class="sessions-button sessions-button--primary sessions-button--icon-end sessions-calendar-header-row__add" type="button" data-sessions-add-trigger aria-haspopup="menu" aria-expanded="false"><span class="sessions-button__label">${escapeHtml(label)}</span>${renderHeaderAssetIcon(CHEVRON_DOWN_ICON, "sessions-calendar-header-row__add-chevron")}</button>`;
}

function renderDesktopCalendarHeaderRow({
  date,
  view,
  todayLabel,
  addLabel,
  team,
  youName,
  teamAriaLabel,
}) {
  return `<div class="sessions-calendar-header-row__layout sessions-calendar-header-row__layout--desktop"><div class="sessions-calendar-header-row__group sessions-calendar-header-row__group--start">${renderSecondaryButton({
    label: todayLabel,
    className: "sessions-calendar-header-row__today",
  })}${renderSessionsNavigator({ date })}${renderTeamMenuButton({
    team,
    youName,
    teamAriaLabel,
  })}</div><div class="sessions-calendar-header-row__spacer" aria-hidden="true"></div><div class="sessions-calendar-header-row__group sessions-calendar-header-row__group--end">${renderSessionsCalendarViewNavigator({
    view,
  })}${renderCalendarHeaderAddButton({
    label: addLabel,
  })}</div></div>`;
}

function renderMobileCalendarHeaderRow({ date, dateLabel, team, youName, teamAriaLabel }) {
  return `<div class="sessions-calendar-header-row__layout sessions-calendar-header-row__layout--mobile"><div class="sessions-calendar-header-row__group sessions-calendar-header-row__group--start">${renderMobileCalendarHeaderDateButton({
    date,
    dateLabel,
  })}</div><div class="sessions-calendar-header-row__spacer" aria-hidden="true"></div><div class="sessions-calendar-header-row__group sessions-calendar-header-row__group--end">${renderTeamMenuButton({
    team,
    youName,
    teamAriaLabel,
  })}</div></div>`;
}

export function renderSessionsCalendarHeaderRow({
  date = "2026-08-18",
  dateLabel,
  view = "day",
  todayLabel = "Today",
  addLabel = "Add",
  teamAriaLabel = "Team",
  team = [],
  youName = "",
  className = "",
} = {}) {
  const classes = ["sessions-calendar-header-row", className].filter(Boolean).join(" ");

  return `<header class="${classes}" data-sessions-calendar-header-row>${renderDesktopCalendarHeaderRow({
    date,
    view,
    todayLabel,
    addLabel,
    team,
    youName,
    teamAriaLabel,
  })}${renderMobileCalendarHeaderRow({
    date,
    dateLabel: dateLabel ?? formatCalendarHeaderMobileDate(date),
    team,
    youName,
    teamAriaLabel,
  })}</header>`;
}

function setTeamMenuOpen(menu, open) {
  const trigger = menu.querySelector("[data-sessions-team-menu-trigger]");
  const panel = menu.querySelector(".sessions-team-menu__panel");
  menu.classList.toggle("is-open", open);
  trigger?.setAttribute("aria-expanded", String(open));
  if (panel) panel.hidden = !open;
}

function syncTeamAllCheckbox(menu) {
  const all = menu.querySelector("[data-sessions-team-all]");
  const members = [...menu.querySelectorAll("[data-sessions-team-member]")];
  if (all) all.checked = members.length > 0 && members.every((input) => input.checked);
}

function teamMemberNames(menu) {
  return [...menu.querySelectorAll("[data-sessions-team-member]")].map(
    (input) => input.dataset.sessionsTeamMember,
  );
}

function checkedTeamNames(menu) {
  return [...menu.querySelectorAll("[data-sessions-team-member]")]
    .filter((input) => input.checked)
    .map((input) => input.dataset.sessionsTeamMember);
}

function applyTeamChecks(menu, names) {
  const selected = new Set(names);
  menu.querySelectorAll("[data-sessions-team-member]").forEach((input) => {
    input.checked = selected.has(input.dataset.sessionsTeamMember);
  });
  syncTeamAllCheckbox(menu);
}

function keepSomeoneSelected(menu, preferred) {
  const members = [...menu.querySelectorAll("[data-sessions-team-member]")];
  if (members.some((input) => input.checked)) return;
  const you = menu.dataset.sessionsTeamYou;
  const keep =
    members.find((input) => input === preferred) ??
    members.find((input) => input.dataset.sessionsTeamMember === you) ??
    members[0];
  if (keep) keep.checked = true;
}

function publishTeamSelection(root, menu, preferred) {
  keepSomeoneSelected(menu, preferred);
  syncTeamAllCheckbox(menu);
  const names = checkedTeamNames(menu);
  root.querySelectorAll("[data-sessions-team-menu]").forEach((other) => {
    if (other !== menu) applyTeamChecks(other, names);
  });
  menu.dispatchEvent(
    new CustomEvent("sessions:team-selection", { bubbles: true, detail: { names } }),
  );
}

export function setupSessionsTeamMenus(root = document) {
  root.addEventListener("click", (event) => {
    const filter = event.target.closest("[data-sessions-team-filter]");
    if (filter) {
      const menu = filter.closest("[data-sessions-team-menu]");
      if (!menu) return;
      const mode = filter.dataset.sessionsTeamFilter;
      const you = menu.dataset.sessionsTeamYou;
      // ponytail: no shift data, so Scheduled team shows everyone until a roster exists
      const names = teamMemberNames(menu).filter((name) => mode !== "you" || name === you);
      applyTeamChecks(menu, names);
      menu.querySelectorAll("[data-sessions-team-filter]").forEach((item) => {
        const selected = item === filter;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      publishTeamSelection(root, menu);
      return;
    }

    const trigger = event.target.closest("[data-sessions-team-menu-trigger]");
    if (trigger) {
      event.preventDefault();
      const menu = trigger.closest("[data-sessions-team-menu]");
      if (!menu) return;
      const open = !menu.classList.contains("is-open");
      root.querySelectorAll("[data-sessions-team-menu].is-open").forEach((item) => {
        if (item !== menu) setTeamMenuOpen(item, false);
      });
      setTeamMenuOpen(menu, open);
      return;
    }

    if (event.target.closest("[data-sessions-team-menu]")) return;

    root.querySelectorAll("[data-sessions-team-menu].is-open").forEach((menu) => {
      setTeamMenuOpen(menu, false);
    });
  });

  root.addEventListener("change", (event) => {
    const all = event.target.closest("[data-sessions-team-all]");
    if (all) {
      const menu = all.closest("[data-sessions-team-menu]");
      if (!menu) return;
      menu.querySelectorAll("[data-sessions-team-member]").forEach((input) => {
        input.checked = all.checked;
      });
      publishTeamSelection(root, menu);
      return;
    }

    const member = event.target.closest("[data-sessions-team-member]");
    if (!member) return;
    const menu = member.closest("[data-sessions-team-menu]");
    if (!menu) return;
    publishTeamSelection(root, menu, member);
  });
}

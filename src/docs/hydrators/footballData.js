import { escapeHtml } from "../../utils.js";
import { formatKickoffTime } from "../../utils/formatKickoffTime.js";
import { formatMatchDate } from "../../utils/formatMatchDate.js";
import {
  formatMatchMinutes,
  minutesPlayedFromKickoff,
} from "../../utils/formatMatchMinutes.js";

const FALLBACK = {
  competition: "Premier League",
  date: "20 July 2026",
  time: "13:00",
  teams: [
    {
      name: "Manchester United",
      crest: "https://crests.football-data.org/66.png",
      alt: "Manchester United",
    },
    {
      name: "Liverpool FC",
      crest: "https://crests.football-data.org/64.png",
      alt: "Liverpool",
    },
  ],
};

const FALLBACK_ICON = "/assets/nav-icons/soccer.svg";
const LIVE_MATCH_STATUSES = new Set(["LIVE", "IN_PLAY", "PAUSED", "HALFTIME"]);
const FALLBACK_LIVE_MINUTES = 24;

export const SPORTSBOOK_DEMO_FALLBACK = FALLBACK;

let matchPromise;
const liveDateRowTimers = new Map();

function teamCrest(team) {
  return team?.crest || team?.logo || FALLBACK_ICON;
}

function teamsFromMatch(match) {
  if (!match?.homeTeam?.name || !match?.awayTeam?.name) return null;

  return [
    {
      name: match.homeTeam.name,
      crest: teamCrest(match.homeTeam),
      alt: match.homeTeam.shortName || match.homeTeam.name,
    },
    {
      name: match.awayTeam.name,
      crest: teamCrest(match.awayTeam),
      alt: match.awayTeam.shortName || match.awayTeam.name,
    },
  ];
}

function isLiveMatch(match) {
  return LIVE_MATCH_STATUSES.has(match?.status);
}

function kickoffMsFromMatch(match) {
  if (!match) {
    return Date.now() - FALLBACK_LIVE_MINUTES * 60 * 1000;
  }

  if (Number.isFinite(match.minute)) {
    return Date.now() - match.minute * 60 * 1000;
  }

  if (match.utcDate) {
    return new Date(match.utcDate).getTime();
  }

  return Date.now() - FALLBACK_LIVE_MINUTES * 60 * 1000;
}

function competitionHeaderMarkup(label) {
  return `<div class="joker-competition-header"><span class="joker-competition-header__label">${escapeHtml(label)}</span></div>`;
}

function dateRowMarkup(label) {
  return `<div class="joker-date-row"><span class="joker-date-row__label">${escapeHtml(label)}</span></div>`;
}

function liveDateRowMarkup(minutes) {
  return `
    <div class="joker-date-row joker-date-row--live">
      <span class="joker-date-row__live-prefix">Playing for</span>
      <span class="joker-date-row__live-time" data-live-date-row-time>${escapeHtml(formatMatchMinutes(minutes))}</span>
    </div>
  `;
}

function teamInfoMarkup({ name, crest, alt }) {
  return `
    <div class="joker-team-info">
      <span class="joker-team-info__logo-wrap">
        <img
          class="joker-team-info__logo"
          src="${escapeHtml(crest)}"
          alt="${escapeHtml(alt || name)}"
          loading="lazy"
          referrerpolicy="no-referrer"
        />
      </span>
      <span class="joker-team-info__name">${escapeHtml(name)}</span>
    </div>
  `;
}

function viewMarketsMarkup() {
  return `
    <button type="button" class="joker-view-markets">
      <span class="joker-view-markets__label">View markets</span>
      <span class="joker-view-markets__chevron" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </span>
    </button>
  `;
}

function oddsPanelWithTeamMarkup(team, odds = "2.50") {
  return `
    <button type="button" class="joker-odds-panel is-with-team" data-odds-panel-demo aria-pressed="false">
      <span class="joker-odds-panel__leading">
        ${teamInfoMarkup(team)}
      </span>
      <span class="joker-odds-panel__value">${escapeHtml(odds)}</span>
    </button>
  `;
}

function oddsPanelLineClass(line) {
  const numeric = Number.parseFloat(String(line).replace(/^\+/, ""));
  if (!Number.isFinite(numeric) || numeric === 0) return "";
  return numeric > 0 ? " is-positive" : " is-negative";
}

function formatOddsPanelLine(line) {
  const raw = String(line).trim();
  const numeric = Number.parseFloat(raw.replace(/^\+/, ""));
  if (Number.isFinite(numeric) && numeric > 0 && !raw.startsWith("+")) {
    return `+${raw}`;
  }
  return raw;
}

function oddsPanelWithLineMarkup(team, line, odds = "1.87") {
  const label = formatOddsPanelLine(line);

  return `
    <button type="button" class="joker-odds-panel is-with-team is-with-line" data-odds-panel-demo aria-pressed="false">
      <span class="joker-odds-panel__leading">
        ${teamInfoMarkup(team)}
        <span class="joker-odds-panel__line${oddsPanelLineClass(line)}">${escapeHtml(label)}</span>
      </span>
      <span class="joker-odds-panel__value">${escapeHtml(odds)}</span>
    </button>
  `;
}

function upcomingMatchesMarkup({ date, time, teams }) {
  const [homeTeam, awayTeam] = teams;

  return `
    <div class="joker-upcoming-matches-group">
      ${dateRowMarkup(date)}
      <div class="joker-upcoming-matches">
        <div class="joker-upcoming-matches__leading">
          <span class="joker-time"><span class="joker-time__label">${escapeHtml(time)}</span></span>
          <div class="joker-upcoming-matches__team-stack">
            ${teamInfoMarkup(homeTeam)}
            ${teamInfoMarkup(awayTeam)}
          </div>
        </div>
        <div class="joker-upcoming-matches__actions">
          ${viewMarketsMarkup()}
        </div>
      </div>
    </div>
  `;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function matchQueryPaths() {
  const today = new Date();
  const end = new Date(today);
  end.setDate(end.getDate() + 21);

  const from = isoDate(today);
  const to = isoDate(end);

  return [
    `/api/football-data/v4/matches?dateFrom=${from}&dateTo=${to}&status=SCHEDULED&limit=20`,
    "/api/football-data/v4/competitions/PL/matches?status=SCHEDULED&limit=20",
    `/api/football-data/v4/matches?dateFrom=${from}&dateTo=${to}&limit=20`,
    "/api/football-data/v4/matches?limit=20",
  ];
}

function liveMatchQueryPaths() {
  const today = isoDate(new Date());

  return [
    "/api/football-data/v4/matches?status=LIVE&limit=20",
    "/api/football-data/v4/matches?status=IN_PLAY&limit=20",
    `/api/football-data/v4/matches?date=${today}&limit=20`,
    "/api/football-data/v4/matches?limit=20",
  ];
}

async function fetchMatches(path) {
  const response = await fetch(path);
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      payload.message || payload.error || `Football Data API failed (${response.status})`,
    );
  }

  return payload;
}

async function fetchLiveMatch() {
  if (!matchPromise) {
    matchPromise = (async () => {
      let lastError = "No upcoming matches found for your API plan.";

      for (const path of matchQueryPaths()) {
        try {
          const payload = await fetchMatches(path);
          const match = payload.matches?.find((entry) => teamsFromMatch(entry));
          if (match) return match;
        } catch (error) {
          lastError = error.message || lastError;
          if (error.message?.includes("token") || error.message?.includes("403")) {
            throw error;
          }
        }
      }

      throw new Error(lastError);
    })().catch((error) => {
      matchPromise = null;
      throw error;
    });
  }

  return matchPromise;
}

async function fetchLiveInPlayMatch() {
  for (const path of liveMatchQueryPaths()) {
    try {
      const payload = await fetchMatches(path);
      const match = payload.matches?.find((entry) => isLiveMatch(entry) && teamsFromMatch(entry));
      if (match) return match;
    } catch (error) {
      if (error.message?.includes("token") || error.message?.includes("403")) {
        throw error;
      }
    }
  }

  return null;
}

function stopLiveDateRowTimers() {
  liveDateRowTimers.forEach((timerId) => window.clearInterval(timerId));
  liveDateRowTimers.clear();
}

function startLiveDateRowTimer(node, getKickoffMs) {
  const update = () => {
    const timeNode = node.querySelector("[data-live-date-row-time]");
    if (!timeNode) return;
    timeNode.textContent = formatMatchMinutes(minutesPlayedFromKickoff(getKickoffMs()));
  };

  update();
  const timerId = window.setInterval(update, 1000);
  liveDateRowTimers.set(node, timerId);
}

function hydrateCompetitionHeaders(nodes, match) {
  const label = match?.competition?.name || FALLBACK.competition;
  nodes.forEach((node) => {
    node.innerHTML = competitionHeaderMarkup(label);
  });
}

function hydrateDateRows(nodes, match) {
  const label = match?.utcDate ? formatMatchDate(match.utcDate) : FALLBACK.date;
  nodes.forEach((node) => {
    node.innerHTML = dateRowMarkup(label);
  });
}

function hydrateTeamInfo(nodes, match) {
  const teams = match ? teamsFromMatch(match) : FALLBACK.teams;
  nodes.forEach((node) => {
    node.innerHTML = teams.map((team) => teamInfoMarkup(team)).join("");
  });
}

function hydrateOddsPanelWithTeam(nodes, match) {
  const teams = match ? teamsFromMatch(match) : FALLBACK.teams;
  const team = teams[0];

  nodes.forEach((node) => {
    node.innerHTML = oddsPanelWithTeamMarkup(team);
  });
}

function hydrateOddsPanelWithLine(nodes, match) {
  const teams = match ? teamsFromMatch(match) : FALLBACK.teams;
  const [homeTeam, awayTeam] = teams;

  nodes.forEach((node) => {
    node.innerHTML = [
      oddsPanelWithLineMarkup(homeTeam, "-0.5", "1.87"),
      oddsPanelWithLineMarkup(awayTeam, "+0.5", "1.95"),
    ].join("");
  });
}

function hydrateUpcomingMatches(nodes, match) {
  const teams = match ? teamsFromMatch(match) : FALLBACK.teams;
  const time = match?.utcDate ? formatKickoffTime(match.utcDate) : FALLBACK.time;
  const date = match?.utcDate ? formatMatchDate(match.utcDate) : FALLBACK.date;

  nodes.forEach((node) => {
    node.innerHTML = upcomingMatchesMarkup({ date, time, teams });
  });
}

async function hydrateLiveDateRows(nodes) {
  if (!nodes.length) return;

  let kickoffMs = kickoffMsFromMatch(null);

  try {
    const match = await fetchLiveInPlayMatch();
    kickoffMs = kickoffMsFromMatch(match);
  } catch (error) {
    console.warn("Live Date Row demo using fallback kickoff", error);
  }

  nodes.forEach((node) => {
    node.innerHTML = liveDateRowMarkup(minutesPlayedFromKickoff(kickoffMs));
    startLiveDateRowTimer(node, () => kickoffMs);
  });
}

export async function hydrateFootballDataDemos(root = document) {
  stopLiveDateRowTimers();

  const competitionNodes = root.querySelectorAll("[data-competition-header-demo]");
  const dateNodes = root.querySelectorAll("[data-date-row-demo]");
  const liveDateNodes = root.querySelectorAll("[data-live-date-row-demo]");
  const teamNodes = root.querySelectorAll("[data-team-info-demo]");
  const oddsPanelTeamNodes = root.querySelectorAll("[data-odds-panel-team-demo]");
  const oddsPanelLineNodes = root.querySelectorAll("[data-odds-panel-line-demo]");
  const upcomingMatchesNodes = root.querySelectorAll("[data-upcoming-matches-demo]");

  if (
    !competitionNodes.length &&
    !dateNodes.length &&
    !liveDateNodes.length &&
    !teamNodes.length &&
    !oddsPanelTeamNodes.length &&
    !oddsPanelLineNodes.length &&
    !upcomingMatchesNodes.length
  ) {
    return;
  }

  void hydrateLiveDateRows(liveDateNodes);

  try {
    const match = await fetchLiveMatch();

    hydrateCompetitionHeaders(competitionNodes, match);
    hydrateDateRows(dateNodes, match);
    hydrateTeamInfo(teamNodes, match);
    hydrateOddsPanelWithTeam(oddsPanelTeamNodes, match);
    hydrateOddsPanelWithLine(oddsPanelLineNodes, match);
    hydrateUpcomingMatches(upcomingMatchesNodes, match);
  } catch (error) {
    console.warn("Football Data demo falling back to static content", error);

    hydrateCompetitionHeaders(competitionNodes, null);
    hydrateDateRows(dateNodes, null);
    hydrateTeamInfo(teamNodes, null);
    hydrateOddsPanelWithTeam(oddsPanelTeamNodes, null);
    hydrateOddsPanelWithLine(oddsPanelLineNodes, null);
    hydrateUpcomingMatches(upcomingMatchesNodes, null);
  }
}

export {
  fetchLiveMatch as fetchShowroomMatch,
  fetchLiveInPlayMatch as fetchShowroomLiveMatch,
  kickoffMsFromMatch as getShowroomKickoffMs,
  teamsFromMatch as getShowroomTeamsFromMatch,
};

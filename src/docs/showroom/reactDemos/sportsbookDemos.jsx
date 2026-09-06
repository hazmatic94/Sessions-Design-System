import { createElement, useEffect, useState } from "react";
import { BetSlipRow } from "../../../components/BetSlipRow/BetSlipRow.tsx";
import { CompetitionHeader } from "../../../components/CompetitionHeader/CompetitionHeader.tsx";
import { DateRow } from "../../../components/DateRow/DateRow.tsx";
import { LiveMatchScore } from "../../../components/LiveMatchScore/LiveMatchScore.tsx";
import { OddsPanel } from "../../../components/OddsPanel/OddsPanel.tsx";
import { OddsRow } from "../../../components/OddsRow/OddsRow.tsx";
import { OddsSelection } from "../../../components/OddsSelection/OddsSelection.tsx";
import { ScoreChip } from "../../../components/ScoreChip/ScoreChip.tsx";
import { Tabs } from "../../../components/Tabs/Tabs.tsx";
import { TeamInfo } from "../../../components/TeamInfo/TeamInfo.tsx";
import { Time } from "../../../components/Time/Time.tsx";
import { UpcomingMatches } from "../../../components/UpcomingMatches/UpcomingMatches.tsx";
import { ViewMarkets } from "../../../components/ViewMarkets/ViewMarkets.tsx";
import { formatKickoffTime } from "../../../utils/formatKickoffTime.ts";
import { formatMatchDate } from "../../../utils/formatMatchDate.ts";
import { minutesPlayedFromKickoff } from "../../../utils/formatMatchMinutes.ts";
import {
  fetchShowroomLiveMatch,
  fetchShowroomMatch,
  getShowroomKickoffMs,
  getShowroomTeamsFromMatch,
  SPORTSBOOK_DEMO_FALLBACK,
} from "../../hydrators/footballData.js";

const oddsSelectionOptions = [
  { label: "1", odds: "2.50" },
  { label: "X", odds: "3.20" },
  { label: "2", odds: "2.80" },
];

const FALLBACK_LIVE_SCORES = [0, 2];

const BET_SLIP_ROW_FALLBACK = {
  teamName: "United States",
  odds: "1.87",
  matchup: "United States v Mexico",
};

export const BET_SLIP_ROW_VARIATIONS = [
  {
    demoKey: "sportsbook-bet-slip-row-full-time",
    marketType: "Full Time Result",
    selection: "Win",
  },
  {
    demoKey: "sportsbook-bet-slip-row-correct-score",
    marketType: "Correct Score",
    selection: "1 - 2",
  },
  {
    demoKey: "sportsbook-bet-slip-row-asian-handicap",
    marketType: "Asian Handicap",
    selection: "+1.0",
  },
];

const [BET_SLIP_ROW_DEFAULT] = BET_SLIP_ROW_VARIATIONS;

function createBetSlipRowDemo(marketType, selection) {
  return function BetSlipRowDemo() {
    return createElement(BetSlipRow, {
      teamName: BET_SLIP_ROW_FALLBACK.teamName,
      odds: BET_SLIP_ROW_FALLBACK.odds,
      marketType,
      selection,
      matchup: BET_SLIP_ROW_FALLBACK.matchup,
      onRemove: () => {},
    });
  };
}

function scoresFromMatch(match) {
  const home = match?.score?.fullTime?.home ?? match?.score?.home;
  const away = match?.score?.fullTime?.away ?? match?.score?.away;

  return [
    Number.isFinite(home) ? home : FALLBACK_LIVE_SCORES[0],
    Number.isFinite(away) ? away : FALLBACK_LIVE_SCORES[1],
  ];
}

function TabsDemo() {
  const [value, setValue] = useState("home");

  return createElement(Tabs, {
    tabs: [
      { label: "Home", value: "home" },
      { label: "My Bets", value: "my-bets", badge: 4 },
    ],
    value,
    onChange: setValue,
    "aria-label": "Tab group",
  });
}

function CompetitionHeaderDemo() {
  const [label, setLabel] = useState(SPORTSBOOK_DEMO_FALLBACK.competition);

  useEffect(() => {
    let cancelled = false;

    fetchShowroomMatch()
      .then((match) => {
        if (!cancelled) {
          setLabel(match?.competition?.name || SPORTSBOOK_DEMO_FALLBACK.competition);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return createElement(CompetitionHeader, null, label);
}

function DateRowDemo() {
  const [label, setLabel] = useState(SPORTSBOOK_DEMO_FALLBACK.date);

  useEffect(() => {
    let cancelled = false;

    fetchShowroomMatch()
      .then((match) => {
        if (!cancelled && match?.utcDate) {
          setLabel(formatMatchDate(match.utcDate));
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return createElement(DateRow, null, label);
}

function LiveDateRowDemo() {
  const [minutesPlayed, setMinutesPlayed] = useState(24);

  useEffect(() => {
    let cancelled = false;
    let kickoffMs = getShowroomKickoffMs(null);
    let timerId;

    const startTimer = () => {
      const update = () => {
        setMinutesPlayed(minutesPlayedFromKickoff(kickoffMs));
      };

      update();
      timerId = window.setInterval(update, 1000);
    };

    fetchShowroomLiveMatch()
      .then((match) => {
        if (match) {
          kickoffMs = getShowroomKickoffMs(match);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) {
          startTimer();
        }
      });

    return () => {
      cancelled = true;
      if (timerId) {
        window.clearInterval(timerId);
      }
    };
  }, []);

  return createElement(DateRow, { variant: "live", minutesPlayed });
}

function TeamInfoDemo() {
  const [teams, setTeams] = useState(SPORTSBOOK_DEMO_FALLBACK.teams);

  useEffect(() => {
    let cancelled = false;

    fetchShowroomMatch()
      .then((match) => {
        if (!cancelled) {
          setTeams(getShowroomTeamsFromMatch(match) || SPORTSBOOK_DEMO_FALLBACK.teams);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return createElement(
    "div",
    { className: "football-data-demo" },
    teams.map((team) =>
      createElement(
        TeamInfo,
        {
          key: team.name,
          logoSrc: team.crest,
          logoAlt: team.alt || team.name,
        },
        team.name,
      ),
    ),
  );
}

function OddsPanelDefaultDemo() {
  const [selected, setSelected] = useState(false);

  return createElement(
    OddsPanel,
    {
      selected,
      onClick: () => setSelected((value) => !value),
    },
    "2.50",
  );
}

function OddsPanelWithTeamDemo() {
  const [selected, setSelected] = useState(false);
  const [team, setTeam] = useState(SPORTSBOOK_DEMO_FALLBACK.teams[0]);

  useEffect(() => {
    let cancelled = false;

    fetchShowroomMatch()
      .then((match) => {
        if (!cancelled) {
          const teams = getShowroomTeamsFromMatch(match) || SPORTSBOOK_DEMO_FALLBACK.teams;
          setTeam(teams[0]);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return createElement(
    OddsPanel,
    {
      logoSrc: team.crest,
      logoAlt: team.alt || team.name,
      teamName: team.name,
      selected,
      onClick: () => setSelected((value) => !value),
    },
    "2.50",
  );
}

function OddsPanelWithLineDemo() {
  const [selected, setSelected] = useState(false);
  const [teams, setTeams] = useState(SPORTSBOOK_DEMO_FALLBACK.teams);

  useEffect(() => {
    let cancelled = false;

    fetchShowroomMatch()
      .then((match) => {
        if (!cancelled) {
          setTeams(getShowroomTeamsFromMatch(match) || SPORTSBOOK_DEMO_FALLBACK.teams);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const [homeTeam, awayTeam] = teams;

  return createElement(
    "div",
    { className: "football-data-demo" },
    createElement(
      OddsPanel,
      {
        logoSrc: homeTeam.crest,
        logoAlt: homeTeam.alt || homeTeam.name,
        teamName: homeTeam.name,
        line: "-0.5",
        selected,
        onClick: () => setSelected((value) => !value),
      },
      "1.87",
    ),
    createElement(
      OddsPanel,
      {
        logoSrc: awayTeam.crest,
        logoAlt: awayTeam.alt || awayTeam.name,
        teamName: awayTeam.name,
        line: "+0.5",
      },
      "1.95",
    ),
  );
}

function UpcomingMatchesDemo() {
  const [payload, setPayload] = useState({
    date: SPORTSBOOK_DEMO_FALLBACK.date,
    time: SPORTSBOOK_DEMO_FALLBACK.time,
    teams: SPORTSBOOK_DEMO_FALLBACK.teams.map((team) => ({
      name: team.name,
      logoSrc: team.crest,
      logoAlt: team.alt || team.name,
    })),
  });

  useEffect(() => {
    let cancelled = false;

    fetchShowroomMatch()
      .then((match) => {
        if (cancelled) return;

        const teams = getShowroomTeamsFromMatch(match) || SPORTSBOOK_DEMO_FALLBACK.teams;
        setPayload({
          date: match?.utcDate ? formatMatchDate(match.utcDate) : SPORTSBOOK_DEMO_FALLBACK.date,
          time: match?.utcDate ? formatKickoffTime(match.utcDate) : SPORTSBOOK_DEMO_FALLBACK.time,
          teams: teams.map((team) => ({
            name: team.name,
            logoSrc: team.crest,
            logoAlt: team.alt || team.name,
          })),
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return createElement(UpcomingMatches, {
    date: payload.date,
    time: payload.time,
    teams: payload.teams,
    onViewMarkets: () => {},
  });
}

function LiveMatchScoreDemo() {
  const [minutesPlayed, setMinutesPlayed] = useState(24);
  const [teams, setTeams] = useState(
    SPORTSBOOK_DEMO_FALLBACK.teams.map((team, index) => ({
      name: team.name,
      logoSrc: team.crest,
      logoAlt: team.alt || team.name,
      score: FALLBACK_LIVE_SCORES[index] ?? 0,
    })),
  );

  useEffect(() => {
    let cancelled = false;
    let kickoffMs = getShowroomKickoffMs(null);
    let timerId;

    const startTimer = () => {
      const update = () => {
        setMinutesPlayed(minutesPlayedFromKickoff(kickoffMs));
      };

      update();
      timerId = window.setInterval(update, 1000);
    };

    fetchShowroomLiveMatch()
      .then((match) => {
        if (cancelled) return;

        const matchTeams = getShowroomTeamsFromMatch(match) || SPORTSBOOK_DEMO_FALLBACK.teams;
        const [homeScore, awayScore] = scoresFromMatch(match);

        if (match) {
          kickoffMs = getShowroomKickoffMs(match);
        }

        setTeams(
          matchTeams.map((team, index) => ({
            name: team.name,
            logoSrc: team.crest,
            logoAlt: team.alt || team.name,
            score: index === 0 ? homeScore : awayScore,
          })),
        );
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) {
          startTimer();
        }
      });

    return () => {
      cancelled = true;
      if (timerId) {
        window.clearInterval(timerId);
      }
    };
  }, []);

  return createElement(LiveMatchScore, {
    minutesPlayed,
    teams,
  });
}

function OddsSelectionDemo() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return createElement(OddsSelection, {
    selectedIndex,
    onSelect: setSelectedIndex,
    options: oddsSelectionOptions,
  });
}

/** @type {Record<string, () => import("react").ReactElement>} */
export const SPORTSBOOK_REACT_DEMOS = {
  "sportsbook-tabs": () => createElement(TabsDemo),
  "sportsbook-competition-header": () => createElement(CompetitionHeaderDemo),
  "sportsbook-date-row": () => createElement(DateRowDemo),
  "sportsbook-date-row-live": () => createElement(LiveDateRowDemo),
  "sportsbook-team-info": () => createElement(TeamInfoDemo),
  "sportsbook-time": () => createElement(Time, null, "19:30"),
  "sportsbook-score-chip": () =>
    createElement(
      "div",
      { className: "score-chip-group-demo" },
      createElement(ScoreChip, null, "0"),
      createElement(ScoreChip, null, "2"),
    ),
  "sportsbook-view-markets": () => createElement(ViewMarkets),
  "sportsbook-odds-row": () =>
    createElement(
      "div",
      { className: "odds-row-group-demo" },
      ["1", "X", "2"].map((label) => createElement(OddsRow, { key: label }, label)),
    ),
  "sportsbook-odds-panel": () => createElement(OddsPanelDefaultDemo),
  "sportsbook-odds-panel-team": () => createElement(OddsPanelWithTeamDemo),
  "sportsbook-odds-panel-line": () => createElement(OddsPanelWithLineDemo),
  "sportsbook-odds-panel-unavailable": () =>
    createElement(OddsPanel, { unavailable: true }, "2.50"),
  "sportsbook-upcoming-matches": () => createElement(UpcomingMatchesDemo),
  "sportsbook-live-match-score": () => createElement(LiveMatchScoreDemo),
  "sportsbook-bet-slip-row": createBetSlipRowDemo(
    BET_SLIP_ROW_DEFAULT.marketType,
    BET_SLIP_ROW_DEFAULT.selection,
  ),
  ...Object.fromEntries(
    BET_SLIP_ROW_VARIATIONS.map((variation) => [
      variation.demoKey,
      createBetSlipRowDemo(variation.marketType, variation.selection),
    ]),
  ),
  "sportsbook-odds-selection": () => createElement(OddsSelectionDemo),
};

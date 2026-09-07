import {pageHero, section} from '../shell/pageLayout.js';
import {cardExampleCard} from './cardsPage.js';

export function renderSportsbookPage(page) {
  return `
    ${pageHero(page)}
    ${section('Tabs', '', tabGroupExamples(), 'button-example-section card-example-section')}
    ${section('Competition Header', '', competitionHeaderExamples(), 'button-example-section card-example-section')}
    ${section('Date Row', '', dateRowExamples(), 'button-example-section card-example-section')}
    ${section('Team Info', '', teamInfoExamples(), 'button-example-section card-example-section')}
    ${section('Time', '', timeExamples(), 'button-example-section card-example-section')}
    ${section('Score Chip', '', scoreChipExamples(), 'button-example-section card-example-section')}
    ${section('View Markets', '', viewMarketsExamples(), 'button-example-section card-example-section')}
    ${section('Odds Row', '', oddsRowExamples(), 'button-example-section card-example-section')}
    ${section('Odds Panel', '', oddsPanelExamples(), 'button-example-section card-example-section')}
    ${section('Upcoming Matches', '', upcomingMatchesExamples(), 'button-example-section card-example-section')}
    ${section('Live Match Score', '', liveMatchScoreExamples(), 'button-example-section card-example-section')}
    ${section('Bet Slip Row', '', betSlipRowExamples(), 'button-example-section card-example-section')}
    ${section('Odds Selection', '', oddsSelectionExamples(), 'button-example-section card-example-section')}
  `;
}

function tabGroupExamples() {
  return cardExampleCard({
    id: 'tab-group-example',
    tocTitle: 'Default',
    reactDemo: 'sportsbook-tabs',
    codeId: 'tab-group-code',
    filename: 'Tabs.tsx',
    code: sampleTabsCode(),
    className: 'is-tabs',
  });
}

function competitionHeaderExamples() {
  return cardExampleCard({
    id: 'competition-header-example',
    tocTitle: 'Default',
    reactDemo: 'sportsbook-competition-header',
    codeId: 'competition-header-code',
    filename: 'CompetitionHeader.tsx',
    code: sampleCompetitionHeaderCode(),
    className: 'is-competition-header',
  });
}

function dateRowExamples() {
  return `
    ${cardExampleCard({
      id: 'date-row-example',
      tocTitle: 'Default',
      reactDemo: 'sportsbook-date-row',
      codeId: 'date-row-code',
      filename: 'DateRow.tsx',
      code: sampleDateRowCode(),
      className: 'is-date-row',
    })}
    ${cardExampleCard({
      id: 'date-row-live-example',
      tocTitle: 'Live',
      reactDemo: 'sportsbook-date-row-live',
      codeId: 'date-row-live-code',
      filename: 'DateRow.tsx',
      code: sampleLiveDateRowCode(),
      className: 'is-date-row',
    })}
  `;
}

function teamInfoExamples() {
  return cardExampleCard({
    id: 'team-info-example',
    tocTitle: 'Default',
    reactDemo: 'sportsbook-team-info',
    codeId: 'team-info-code',
    filename: 'TeamInfo.tsx',
    code: sampleTeamInfoCode(),
    className: 'is-team-info',
  });
}

function viewMarketsExamples() {
  return cardExampleCard({
    id: 'view-markets-example',
    tocTitle: 'Default',
    reactDemo: 'sportsbook-view-markets',
    codeId: 'view-markets-code',
    filename: 'ViewMarkets.tsx',
    code: sampleViewMarketsCode(),
    className: 'is-view-markets',
  });
}

function oddsRowExamples() {
  return cardExampleCard({
    id: 'odds-row-example',
    tocTitle: '1X2',
    reactDemo: 'sportsbook-odds-row',
    codeId: 'odds-row-code',
    filename: 'OddsRow.tsx',
    code: sampleOddsRowCode(),
    className: 'is-odds-row',
  });
}

function oddsPanelExamples() {
  return `
    ${cardExampleCard({
      id: 'odds-panel-example',
      tocTitle: 'Default',
      reactDemo: 'sportsbook-odds-panel',
      codeId: 'odds-panel-code',
      filename: 'OddsPanel.tsx',
      code: sampleOddsPanelCode(),
      className: 'is-odds-panel',
    })}
    ${cardExampleCard({
      id: 'odds-panel-with-team-example',
      tocTitle: 'With team',
      reactDemo: 'sportsbook-odds-panel-team',
      codeId: 'odds-panel-with-team-code',
      filename: 'OddsPanel.tsx',
      code: sampleOddsPanelWithTeamCode(),
      className: 'is-odds-panel-with-team',
    })}
    ${cardExampleCard({
      id: 'odds-panel-with-line-example',
      tocTitle: 'With line',
      reactDemo: 'sportsbook-odds-panel-line',
      codeId: 'odds-panel-with-line-code',
      filename: 'OddsPanel.tsx',
      code: sampleOddsPanelWithLineCode(),
      className: 'is-odds-panel-with-line',
    })}
    ${cardExampleCard({
      id: 'odds-panel-unavailable-example',
      tocTitle: 'Unavailable',
      reactDemo: 'sportsbook-odds-panel-unavailable',
      codeId: 'odds-panel-unavailable-code',
      filename: 'OddsPanel.tsx',
      code: sampleOddsPanelUnavailableCode(),
      className: 'is-odds-panel',
    })}
  `;
}

function timeExamples() {
  return cardExampleCard({
    id: 'time-example',
    tocTitle: 'Default',
    reactDemo: 'sportsbook-time',
    codeId: 'time-code',
    filename: 'Time.tsx',
    code: sampleTimeCode(),
    className: 'is-time',
  });
}

function scoreChipExamples() {
  return cardExampleCard({
    id: 'score-chip-example',
    tocTitle: 'Default',
    reactDemo: 'sportsbook-score-chip',
    codeId: 'score-chip-code',
    filename: 'ScoreChip.tsx',
    code: sampleScoreChipCode(),
    className: 'is-score-chip',
  });
}

function upcomingMatchesExamples() {
  return cardExampleCard({
    id: 'upcoming-matches-example',
    tocTitle: 'Default',
    reactDemo: 'sportsbook-upcoming-matches',
    codeId: 'upcoming-matches-code',
    filename: 'UpcomingMatches.tsx',
    code: sampleUpcomingMatchesCode(),
    className: 'is-upcoming-matches',
  });
}

function liveMatchScoreExamples() {
  return cardExampleCard({
    id: 'live-match-score-example',
    tocTitle: 'Default',
    reactDemo: 'sportsbook-live-match-score',
    codeId: 'live-match-score-code',
    filename: 'LiveMatchScore.tsx',
    code: sampleLiveMatchScoreCode(),
    className: 'is-live-match-score',
  });
}

function betSlipRowExamples() {
  return cardExampleCard({
    id: 'bet-slip-row-example',
    tocTitle: 'Default',
    reactDemo: 'sportsbook-bet-slip-row',
    codeId: 'bet-slip-row-code',
    filename: 'BetSlipRow.tsx',
    code: sampleBetSlipRowCode(),
    className: 'is-bet-slip-row',
  });
}

function oddsSelectionExamples() {
  return cardExampleCard({
    id: 'odds-selection-example',
    tocTitle: '1X2',
    reactDemo: 'sportsbook-odds-selection',
    codeId: 'odds-selection-code',
    filename: 'OddsSelection.tsx',
    code: sampleOddsSelectionCode(),
    className: 'is-odds-selection',
  });
}

function sampleCompetitionHeaderCode() {
  return `import { CompetitionHeader } from "@joker/design-system";

export function CompetitionHeaderExample() {
  return <CompetitionHeader>{match.competition.name}</CompetitionHeader>;
}

// Showroom demo loads live competition data when FOOTBALL_DATA_API_TOKEN is set.`;
}

function sampleLiveDateRowCode() {
  return `import { useEffect, useState } from "react";
import { DateRow } from "@joker/design-system";

export function LiveDateRowExample({ kickoffAt }) {
  const [minutesPlayed, setMinutesPlayed] = useState(0);

  useEffect(() => {
    const kickoffMs = new Date(kickoffAt).getTime();
    const update = () => {
      setMinutesPlayed(Math.max(0, Math.floor((Date.now() - kickoffMs) / 60000)));
    };
    update();
    const timerId = window.setInterval(update, 1000);
    return () => window.clearInterval(timerId);
  }, [kickoffAt]);

  return <DateRow variant="live" minutesPlayed={minutesPlayed} />;
}`;
}

function sampleDateRowCode() {
  return `import { DateRow } from "@joker/design-system";

function formatMatchDate(utcDate) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(utcDate));
}

export function DateRowExample() {
  return <DateRow>{formatMatchDate(match.utcDate)}</DateRow>;
}

// Showroom demo loads live match dates when FOOTBALL_DATA_API_TOKEN is set.`;
}

function sampleTeamInfoCode() {
  return `import { TeamInfo } from "@joker/design-system";

export function TeamInfoExample() {
  return (
    <TeamInfo logoSrc={team.crest} logoAlt={team.name}>
      {team.name}
    </TeamInfo>
  );
}

// Showroom demo loads the first available match from Football Data API
// when FOOTBALL_DATA_API_TOKEN is set for yarn dev:showroom.`;
}

function sampleViewMarketsCode() {
  return `import { ViewMarkets } from "@joker/design-system";

export function ViewMarketsExample() {
  return <ViewMarkets />;
}`;
}

function sampleOddsRowCode() {
  return `import { OddsRow } from "@joker/design-system";

const labels = ["1", "X", "2"];

export function OddsRowExample() {
  return (
    <>
      {labels.map((label) => (
        <OddsRow key={label}>{label}</OddsRow>
      ))}
    </>
  );
}`;
}

function sampleOddsPanelCode() {
  return `import { useState } from "react";
import { OddsPanel } from "@joker/design-system";

export function OddsPanelExample() {
  const [selected, setSelected] = useState(false);

  return (
    <OddsPanel selected={selected} onClick={() => setSelected((value) => !value)}>
      2.50
    </OddsPanel>
  );
}`;
}

function sampleOddsPanelWithTeamCode() {
  return `import { useState } from "react";
import { OddsPanel } from "@joker/design-system";

export function OddsPanelWithTeamExample() {
  const [selected, setSelected] = useState(false);

  return (
    <OddsPanel
      logoSrc={team.crest}
      logoAlt={team.name}
      teamName={team.name}
      selected={selected}
      onClick={() => setSelected((value) => !value)}
    >
      2.50
    </OddsPanel>
  );
}

// Showroom demo loads the first available match from Football Data API
// when FOOTBALL_DATA_API_TOKEN is set for yarn dev:showroom.`;
}

function sampleOddsPanelWithLineCode() {
  return `import { useState } from "react";
import { OddsPanel } from "@joker/design-system";

export function OddsPanelWithLineExample() {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <OddsPanel
        logoSrc={homeTeam.crest}
        logoAlt={homeTeam.name}
        teamName={homeTeam.name}
        line="-0.5"
        selected={selected}
        onClick={() => setSelected((value) => !value)}
      >
        1.87
      </OddsPanel>
      <OddsPanel
        logoSrc={awayTeam.crest}
        logoAlt={awayTeam.name}
        teamName={awayTeam.name}
        line="+0.5"
      >
        1.95
      </OddsPanel>
    </>
  );
}

// Negatives render in joker-red-400; positives in joker-green-400.
// Supports values like -0.5, -1.0, -1.5 and +0.5, +1.0, +1.5.`;
}

function sampleOddsPanelUnavailableCode() {
  return `import { OddsPanel } from "@joker/design-system";

export function OddsPanelUnavailableExample() {
  return <OddsPanel unavailable>2.50</OddsPanel>;
}`;
}

function sampleTimeCode() {
  return `import { Time } from "@joker/design-system";

export function TimeExample() {
  return <Time>19:30</Time>;
}`;
}

function sampleScoreChipCode() {
  return `import { ScoreChip } from "@joker/design-system";

export function ScoreChipExample() {
  return <ScoreChip>{score}</ScoreChip>;
}`;
}

function sampleUpcomingMatchesCode() {
  return `import { UpcomingMatches } from "@joker/design-system";

function formatKickoffTime(utcDate) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(utcDate));
}

function formatMatchDate(utcDate) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(utcDate));
}

export function UpcomingMatchesExample({ match }) {
  return (
    <UpcomingMatches
      date={formatMatchDate(match.utcDate)}
      time={formatKickoffTime(match.utcDate)}
      teams={[
        {
          name: match.homeTeam.name,
          logoSrc: match.homeTeam.crest,
          logoAlt: match.homeTeam.shortName,
        },
        {
          name: match.awayTeam.name,
          logoSrc: match.awayTeam.crest,
          logoAlt: match.awayTeam.shortName,
        },
      ]}
      onViewMarkets={() => openMarkets(match.id)}
    />
  );
}

// Showroom demo loads live match data when FOOTBALL_DATA_API_TOKEN is set.`;
}

function sampleLiveMatchScoreCode() {
  return `import { useEffect, useState } from "react";
import { LiveMatchScore } from "@joker/design-system";

export function LiveMatchScoreExample({ match, kickoffAt }) {
  const [minutesPlayed, setMinutesPlayed] = useState(0);

  useEffect(() => {
    const kickoffMs = new Date(kickoffAt).getTime();
    const update = () => {
      setMinutesPlayed(Math.max(0, Math.floor((Date.now() - kickoffMs) / 60000)));
    };
    update();
    const timerId = window.setInterval(update, 1000);
    return () => window.clearInterval(timerId);
  }, [kickoffAt]);

  return (
    <LiveMatchScore
      minutesPlayed={minutesPlayed}
      teams={[
        {
          name: match.homeTeam.name,
          logoSrc: match.homeTeam.crest,
          logoAlt: match.homeTeam.shortName,
          score: match.score.fullTime.home ?? 0,
        },
        {
          name: match.awayTeam.name,
          logoSrc: match.awayTeam.crest,
          logoAlt: match.awayTeam.shortName,
          score: match.score.fullTime.away ?? 0,
        },
      ]}
    />
  );
}

// Pair with CompetitionHeader at the list/page level.
// Showroom demo loads live in-play data when FOOTBALL_DATA_API_TOKEN is set.`;
}

function sampleBetSlipRowCode() {
  return `import { BetSlipRow } from "@joker/design-system";

export function BetSlipRowExample({ row, onRemove }) {
  return (
    <BetSlipRow
      teamName={row.teamName}
      odds={row.odds}
      marketType={row.marketType}
      selection={row.selection}
      matchup={row.matchup}
      onRemove={onRemove}
    />
  );
}

// row.marketType / row.selection cover Full Time Result, Correct Score, Asian Handicap, etc.`;
}

function sampleOddsSelectionCode() {
  return `import { useState } from "react";
import { OddsSelection } from "@joker/design-system";

export function OddsSelectionExample() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <OddsSelection
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
      options={[
        { label: "1", odds: "2.50" },
        { label: "X", odds: "3.20" },
        { label: "2", odds: "2.80" },
      ]}
    />
  );
}`;
}

function sampleTabsCode() {
  return `import { useState } from "react";
import { Tabs } from "@joker/design-system";

const tabs = [
  { label: "Home", value: "home" },
  { label: "My Bets", value: "my-bets", badge: activeBetCount },
];

export function TabsExample() {
  const [value, setValue] = useState("home");
  const activeBetCount = 4;

  return <Tabs tabs={tabs} value={value} onChange={setValue} />;
}`;
}

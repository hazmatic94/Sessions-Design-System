import {pageHero, section} from '../shell/pageLayout.js';
import {cardExampleCard} from './cardsPage.js';

export function renderRoulettePage(page) {
  return `
    ${pageHero(page)}
    ${section('Roulette Components', '', rouletteWheelExamples(), 'button-example-section card-example-section')}
    ${section('Odds Button Group', '', oddsButtonGroupExamples(), 'button-example-section card-example-section')}
    ${section('Game area slot', 'Wheel stretched inside a sized container — crop follows parent aspect ratio.', rouletteGameShellWheelExample(), 'button-example-section game-container-section')}
  `;
}

function rouletteWheelExamples() {
  return cardExampleCard({
    id: 'roulette-win-chip-example',
    tocTitle: 'Win chip',
    reactDemo: 'roulette-win-chip',
    codeId: 'roulette-win-chip-code',
    filename: 'RouletteWinChip.tsx',
    code: sampleRouletteWinChipCode(),
    className: 'is-roulette-win-chip',
  });
}

function rouletteGameShellWheelExample() {
  return cardExampleCard({
    id: 'roulette-game-shell-wheel-example',
    tocTitle: 'Game area slot',
    reactDemo: 'roulette-game-shell-wheel',
    codeId: 'roulette-game-shell-wheel-code',
    filename: 'RouletteWrapper.tsx',
    code: sampleRouletteGameShellWheelCode(),
    className: 'is-roulette-wheel is-game-shell-canvas',
  });
}

function oddsButtonGroupExamples() {
  return `
    ${cardExampleCard({
      id: 'roulette-odds-button-group-example',
      tocTitle: 'Red / Black / Green',
      reactDemo: 'card-odds-roulette',
      codeId: 'roulette-odds-button-group-code',
      filename: 'RouletteOddsButtonGroup.tsx',
      code: sampleRouletteOddsGroupCode(),
      className: 'is-odds-button-group is-showroom-300',
    })}
    ${cardExampleCard({
      id: 'roulette-odds-button-group-mobile-example',
      tocTitle: 'Red / Black / Green Mobile',
      reactDemo: 'card-odds-roulette-mobile',
      codeId: 'roulette-odds-button-group-mobile-code',
      filename: 'MobileRouletteOddsButtonGroup.tsx',
      code: sampleMobileRouletteOddsGroupCode(),
      className: 'is-odds-button-group',
    })}
  `;
}

function sampleRouletteGameShellWheelCode() {
  return `import {
  RouletteWheel,
  RouletteWrapper,
  ROULETTE_FIXED_LANDING_POSITION,
  ROULETTE_WHEEL_NATIVE_WIDTH,
} from "@joker/design-system";
import "@joker/design-system/styles/roulette.css";

export function RouletteGameAreaSlot() {
  return (
    <div className="game-area-wheel" style={{ flex: 1, minHeight: 0 }}>
      <RouletteWrapper>
        <RouletteWheel
          size={ROULETTE_WHEEL_NATIVE_WIDTH}
          ballPosition={ROULETTE_FIXED_LANDING_POSITION}
          showBall
        />
      </RouletteWrapper>
    </div>
  );
}`;
}

function sampleRouletteWinChipCode() {
  return `import { RouletteWinChip } from "@joker/design-system";

export function RouletteWinChipExample() {
  return (
    <RouletteWinChip
      betColor="red"
      multiplier="2.00x"
      settled
      size={112}
    />
  );
}`;
}

function sampleRouletteOddsGroupCode() {
  return `import { OddsButtonGroup } from "@joker/design-system";

export function RouletteOddsGroup() {
  return (
    <OddsButtonGroup
      label="Bet type"
      layout="stacked"
      showOdds={false}
      showDirection={false}
      ariaLabel="Roulette bet choice"
      options={[
        { value: "red", label: "Red", sideIcon: "red" },
        { value: "black", label: "Black", sideIcon: "black" },
        { value: "green", label: "Green", sideIcon: "green" },
      ]}
      onValueChange={(value) => {
        console.log(value);
      }}
    />
  );
}`;
}

function sampleMobileRouletteOddsGroupCode() {
  return `import { MobileRouletteOddsGroup } from "@joker/design-system";

export function RouletteMobileOddsExample() {
  return <MobileRouletteOddsGroup />;
}`;
}

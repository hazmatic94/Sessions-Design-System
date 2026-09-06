import {pageHero, section} from '../shell/pageLayout.js';
import {cardExampleCard} from './cardsPage.js';

export function renderHiloPage(page) {
  return `
    ${pageHero(page)}
    ${section('Game Card', '', gameCardExamples(), 'button-example-section card-example-section')}
    ${section('Game Card Stack', '', gameCardStackExamples(), 'button-example-section card-example-section')}
    ${section('Skip Button', '', skipButtonExamples(), 'button-example-section card-example-section')}
    ${section('HiLo Ellipse Button', '', hiLoEllipseButtonExamples(), 'button-example-section card-example-section')}
    ${section('Higher Card', '', higherCardExamples(), 'button-example-section card-example-section')}
    ${section('Lower Card', '', lowerCardExamples(), 'button-example-section card-example-section')}
    ${section('Game Card Mini', '', gameCardMiniExamples(), 'button-example-section card-example-section')}
    ${section('Odds Button Group', '', oddsButtonGroupExamples(), 'button-example-section card-example-section')}
  `;
}

function gameCardExamples() {
  return cardExampleCard({
    id: 'game-card-default-example',
    tocTitle: 'Default',
    reactDemo: 'hilo-game-card',
    codeId: 'game-card-code',
    filename: 'GameCard.tsx',
    code: sampleGameCardCode(),
    className: 'is-game-card',
  });
}

function gameCardStackExamples() {
  return cardExampleCard({
    id: 'game-card-stack-default-example',
    tocTitle: 'Default',
    reactDemo: 'hilo-game-card-stack',
    codeId: 'game-card-stack-code',
    filename: 'GameCardStack.tsx',
    code: sampleGameCardStackCode(),
    className: 'is-game-card-stack',
  });
}

function skipButtonExamples() {
  return cardExampleCard({
    id: 'skip-button-default-example',
    tocTitle: 'Default',
    reactDemo: 'hilo-skip-button',
    codeId: 'skip-button-code',
    filename: 'SkipButton.tsx',
    code: sampleSkipButtonCode(),
    className: 'is-skip-button',
  });
}

function hiLoEllipseButtonExamples() {
  return cardExampleCard({
    id: 'hilo-ellipse-button-default-example',
    tocTitle: 'Default',
    reactDemo: 'hilo-ellipse-button',
    codeId: 'hilo-ellipse-button-code',
    filename: 'HiLoEllipseButton.tsx',
    code: sampleHiLoEllipseButtonCode(),
    className: 'is-hilo-ellipse-button',
  });
}

function higherCardExamples() {
  return cardExampleCard({
    id: 'higher-card-default-example',
    tocTitle: 'Default',
    reactDemo: 'hilo-higher-card',
    codeId: 'higher-card-code',
    filename: 'HigherCard.tsx',
    code: sampleHigherCardCode(),
    className: 'is-higher-card',
  });
}

function lowerCardExamples() {
  return cardExampleCard({
    id: 'lower-card-default-example',
    tocTitle: 'Default',
    reactDemo: 'hilo-lower-card',
    codeId: 'lower-card-code',
    filename: 'LowerCard.tsx',
    code: sampleLowerCardCode(),
    className: 'is-lower-card',
  });
}

function gameCardMiniExamples() {
  return cardExampleCard({
    id: 'game-card-mini-default-example',
    tocTitle: 'Default',
    reactDemo: 'hilo-game-card-mini',
    codeId: 'game-card-mini-code',
    filename: 'GameCardMini.tsx',
    code: sampleGameCardMiniCode(),
    className: 'is-game-card-mini',
  });
}

function oddsButtonGroupExamples() {
  return `
    ${cardExampleCard({
      id: 'hilo-odds-button-group-example',
      tocTitle: 'Higher / Lower',
      reactDemo: 'card-odds-hilo',
      codeId: 'hilo-odds-button-group-code',
      filename: 'HiLoOddsButtonGroup.tsx',
      code: sampleHiLoOddsGroupCode(),
      className: 'is-odds-button-group is-showroom-300',
    })}
    ${cardExampleCard({
      id: 'hilo-odds-button-group-mobile-example',
      tocTitle: 'Higher / Lower Mobile Inline',
      reactDemo: 'card-odds-hilo-mobile',
      codeId: 'hilo-odds-button-group-mobile-code',
      filename: 'MobileHiLoOddsButtonGroup.tsx',
      code: sampleMobileHiLoOddsGroupCode(),
      className: 'is-odds-button-group',
    })}
  `;
}

function sampleGameCardCode() {
  return `import { GameCard, GameCardFace } from "@joker/design-system";
import type { GameCardFaceColor, GameCardRank, GameCardSuit } from "@joker/design-system";
import "@joker/design-system/styles.css";

type ExampleProps = {
  rank: GameCardRank; // "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K"
  suit: GameCardSuit; // "clubs" | "diamonds" | "hearts" | "spades"
  color?: GameCardFaceColor; // "black" | "red"
};

export function Example({ rank, suit, color }: ExampleProps) {
  return (
    <GameCard>
      <GameCardFace rank={rank} suit={suit} color={color} />
    </GameCard>
  );
}`;
}

function sampleGameCardStackCode() {
  return `import { GameCardFace, GameCardStack } from "@joker/design-system";
import type { GameCardFaceColor, GameCardRank, GameCardSuit } from "@joker/design-system";
import "@joker/design-system/styles.css";

type ExampleProps = {
  rank: GameCardRank; // "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K"
  suit: GameCardSuit; // "clubs" | "diamonds" | "hearts" | "spades"
  color?: GameCardFaceColor; // "black" | "red"
};

export function Example({ rank, suit, color }: ExampleProps) {
  return (
    <GameCardStack>
      <GameCardFace rank={rank} suit={suit} color={color} />
    </GameCardStack>
  );
}`;
}

function sampleSkipButtonCode() {
  return `import { SkipButton } from "@joker/design-system";
import "@joker/design-system/styles.css";

export function Example() {
  return <SkipButton onClick={() => {}} />;
}`;
}

function sampleHiLoEllipseButtonCode() {
  return `import { HiLoEllipseButton } from "@joker/design-system";
import type { HiLoEllipseButtonVariant } from "@joker/design-system";
import "@joker/design-system/styles.css";

type ExampleProps = {
  variant: HiLoEllipseButtonVariant; // "skip" | "higher" | "lower"
};

export function Example({ variant }: ExampleProps) {
  return <HiLoEllipseButton variant={variant} onClick={() => {}} />;
}`;
}

function sampleHigherCardCode() {
  return `import { HigherCard } from "@joker/design-system";
import "@joker/design-system/styles.css";

export function Example() {
  return <HigherCard multiplier="X4.20" />;
}`;
}

function sampleLowerCardCode() {
  return `import { LowerCard } from "@joker/design-system";
import "@joker/design-system/styles.css";

export function Example() {
  return <LowerCard multiplier="X4.20" />;
}`;
}

function sampleGameCardMiniCode() {
  return `import { GameCardMini, GameCardMiniFace } from "@joker/design-system";
import "@joker/design-system/styles.css";

export function Example() {
  return (
    <GameCardMini>
      <GameCardMiniFace rank="8" suit="hearts" />
    </GameCardMini>
  );
}`;
}

function sampleHiLoOddsGroupCode() {
  return `import { OddsButtonGroup } from "@joker/design-system";

export function HiLoOddsGroup() {
  return (
    <OddsButtonGroup
      options={[
        { value: "lower", label: "Lower / Same", direction: "down" },
        { value: "higher", label: "Higher / Same", direction: "up" },
      ]}
    />
  );
}`;
}

function sampleMobileHiLoOddsGroupCode() {
  return `import { MobileHiLoOddsGroup } from "@joker/design-system";

export function HiLoMobileOddsExample() {
  return <MobileHiLoOddsGroup />;
}`;
}

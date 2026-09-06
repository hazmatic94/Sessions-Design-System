import {componentExampleWrapper, pageHero, section} from '../shell/pageLayout.js';
import {showroomCardPreviewMarkup} from '../markup/showroomCardPreviewMarkup.js?v=home-showroom-grid-v1';

export function renderCardsPage(page) {
  return `
    ${pageHero(page)}
    ${section('Card', '', showroomCardExamples(), 'button-example-section card-example-section')}
    ${section('Enter Bet Precursor', '', enterBetPrecursorExamples(), 'button-example-section card-example-section')}
    ${section('Mines In-Game Card', '', minesInGameCardExamples(), 'button-example-section card-example-section')}
  `;
}

export function cardExampleCard({
  id,
  tocTitle,
  preview,
  reactDemo,
  codeId,
  filename,
  code,
  className = '',
  stageClassName = '',
  size = 'md',
}) {
  return componentExampleWrapper({
    id,
    tocTitle,
    preview,
    reactDemo,
    codeId,
    filename,
    code,
    size,
    className,
    stageClassName,
  });
}

function showroomCardExamples() {
  return cardExampleCard({
    id: 'showroom-card',
    tocTitle: 'Default',
    preview: showroomCardPreviewMarkup({
      title: 'This is a title',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    }),
    codeId: 'showroom-card-code',
    filename: 'ShowroomCard.tsx',
    code: sampleShowroomCardCode(),
    stageClassName: 'showroom-card-example-stage',
  });
}

function enterBetPrecursorExamples() {
  return cardExampleCard({
    id: 'enter-bet-precursor-default-example',
    tocTitle: 'Default',
    reactDemo: 'card-enter-bet-precursor',
    codeId: 'enter-bet-precursor-code',
    filename: 'EnterBetPrecursor.tsx',
    code: sampleEnterBetPrecursorCode(),
    className: 'is-enter-bet-precursor',
  });
}

export function minesInGameCardExamples() {
  return cardExampleCard({
    id: 'mines-ingame-card-default-example',
    tocTitle: 'Default',
    reactDemo: 'card-mines-ingame',
    codeId: 'mines-ingame-card-code',
    filename: 'MinesInGameCard.tsx',
    code: sampleMinesInGameCardCode(),
    className: 'is-mines-ingame-card',
  });
}

function sampleEnterBetPrecursorCode() {
  return `import { EnterBetPrecursor } from "@joker/design-system";

export function Example() {
  return (
    <EnterBetPrecursor message="Enter a bet amount to start playing" />
  );
}`;
}

function sampleMinesInGameCardCode() {
  return `import { MinesInGameCard } from "@joker/design-system";

export function Example() {
  return (
    <MinesInGameCard
      currentProfit="800"
      nextValue="1050"
      currentMultiplier="8.0x"
      nextMultiplier="10.5x"
    />
  );
}`;
}

function sampleShowroomCardCode() {
  return `import { useState } from "react";
import { ShowroomCard } from "@joker/design-system";
import "@joker/design-system/styles/showroom-card.css";

export function CardExample() {
  const [favourited, setFavourited] = useState(false);

  return (
    <ShowroomCard
      title="This is a title"
      body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      favourited={favourited}
      onFavouriteChange={setFavourited}
    />
  );
}`;
}

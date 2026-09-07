import {pageHero, section} from '../shell/pageLayout.js';
import {cardExampleCard} from './cardsPage.js';

export function renderMinesPage(page) {
  return `
    ${pageHero(page)}
    ${section('Mines Tile', '', minesTileExamples(), 'button-example-section card-example-section')}
    ${section('Win Tile', '', winTileExamples(), 'button-example-section card-example-section')}
    ${section('Loss Tile', '', lossTileExamples(), 'button-example-section card-example-section')}
    ${section('Safe Tile', '', safeTileExamples(), 'button-example-section card-example-section')}
    ${section('Mines In-Game Card', '', minesInGameCardExamples(), 'button-example-section card-example-section')}
    ${section('Mines In-Game Overlay', '', minesInGameOverlayExamples(), 'button-example-section card-example-section')}
  `;
}

function minesTileExamples() {
  return `
    ${cardExampleCard({
      id: 'mines-tile-default-example',
      tocTitle: 'Default',
      reactDemo: 'mines-tile-default',
      codeId: 'mines-tile-code',
      filename: 'MinesTile.tsx',
      code: sampleMinesTileCode(),
      className: 'is-mines-tile',
    })}
    ${cardExampleCard({
      id: 'mines-tile-unselected-example',
      tocTitle: 'Unselected',
      reactDemo: 'mines-tile-unselected',
      codeId: 'mines-tile-unselected-code',
      filename: 'MinesTile.tsx',
      code: sampleMinesTileUnselectedCode(),
      className: 'is-mines-tile',
    })}
  `;
}

function winTileExamples() {
  return `
    ${cardExampleCard({
      id: 'win-tile-revealed-example',
      tocTitle: 'Revealed',
      reactDemo: 'mines-win-tile-revealed',
      codeId: 'win-tile-revealed-code',
      filename: 'WinTile.tsx',
      code: sampleWinTileRevealedCode(),
      className: 'is-win-tile',
    })}
    ${cardExampleCard({
      id: 'win-tile-reveal-example',
      tocTitle: 'Reveal',
      reactDemo: 'mines-win-tile-reveal',
      codeId: 'win-tile-reveal-code',
      filename: 'WinTile.tsx',
      code: sampleWinTileRevealCode(),
      className: 'is-win-tile',
    })}
  `;
}

function lossTileExamples() {
  return `
    ${cardExampleCard({
      id: 'loss-tile-revealed-example',
      tocTitle: 'Revealed',
      reactDemo: 'mines-loss-tile-revealed',
      codeId: 'loss-tile-revealed-code',
      filename: 'LossTile.tsx',
      code: sampleLossTileRevealedCode(),
      className: 'is-loss-tile',
    })}
    ${cardExampleCard({
      id: 'loss-tile-reveal-example',
      tocTitle: 'Reveal',
      reactDemo: 'mines-loss-tile-reveal',
      codeId: 'loss-tile-reveal-code',
      filename: 'LossTile.tsx',
      code: sampleLossTileRevealCode(),
      className: 'is-loss-tile',
    })}
  `;
}

function safeTileExamples() {
  return `
    ${cardExampleCard({
      id: 'safe-tile-revealed-example',
      tocTitle: 'Revealed',
      reactDemo: 'mines-safe-tile-revealed',
      codeId: 'safe-tile-revealed-code',
      filename: 'SafeTile.tsx',
      code: sampleSafeTileRevealedCode(),
      className: 'is-safe-tile',
    })}
    ${cardExampleCard({
      id: 'safe-tile-reveal-example',
      tocTitle: 'Reveal',
      reactDemo: 'mines-safe-tile-reveal',
      codeId: 'safe-tile-reveal-code',
      filename: 'SafeTile.tsx',
      code: sampleSafeTileRevealCode(),
      className: 'is-safe-tile',
    })}
  `;
}

function minesInGameCardExamples() {
  return cardExampleCard({
    id: 'mines-ingame-card-default-example',
    tocTitle: 'Default',
    reactDemo: 'mines-ingame',
    codeId: 'mines-ingame-card-code',
    filename: 'MinesInGameCard.tsx',
    code: sampleMinesInGameCardCode(),
    className: 'is-mines-ingame-card',
  });
}

function minesInGameOverlayExamples() {
  return `
    ${cardExampleCard({
      id: 'mines-ingame-overlay-desktop-example',
      tocTitle: 'Desktop',
      reactDemo: 'mines-ingame-overlay-desktop',
      codeId: 'mines-ingame-overlay-desktop-code',
      filename: 'MinesInGameOverlay.tsx',
      code: sampleMinesInGameOverlayCode('desktop'),
      className: 'is-mines-ingame-overlay is-mines-ingame-overlay-desktop',
    })}
    ${cardExampleCard({
      id: 'mines-ingame-overlay-mobile-example',
      tocTitle: 'Mobile',
      reactDemo: 'mines-ingame-overlay-mobile',
      codeId: 'mines-ingame-overlay-mobile-code',
      filename: 'MinesInGameOverlay.tsx',
      code: sampleMinesInGameOverlayCode('mobile'),
      className: 'is-mines-ingame-overlay is-mines-ingame-overlay-mobile',
    })}
  `;
}

function sampleMinesTileCode() {
  return `import { MinesTile } from "@joker/design-system";

export function MinesTileExample() {
  return <MinesTile />;
}`;
}

function sampleMinesTileUnselectedCode() {
  return `import { MinesTile } from "@joker/design-system";

export function MinesTileUnselectedExample() {
  return <MinesTile selected={false} />;
}`;
}

function sampleWinTileRevealedCode() {
  return `import { WinTile } from "@joker/design-system";

export function WinTileRevealedExample() {
  return <WinTile revealed />;
}`;
}

function sampleWinTileRevealCode() {
  return `import { MinesTile, WinTile } from "@joker/design-system";

export function WinTileRevealExample() {
  return (
    <div className="mines-gold-flip-demo__stack">
      <WinTile multiplier="1.57x" />
      <MinesTile
        className="mines-gold-flip-demo__cover"
        aria-label="Flip tile to reveal gold"
        role="button"
        tabIndex={0}
      />
    </div>
  );
}`;
}

function sampleLossTileRevealedCode() {
  return `import { LossTile } from "@joker/design-system";

export function LossTileRevealedExample() {
  return <LossTile revealed />;
}`;
}

function sampleLossTileRevealCode() {
  return `import { useState } from "react";
import { LossTile } from "@joker/design-system";

export function LossTileRevealExample() {
  const [revealed, setRevealed] = useState(false);

  return <LossTile revealed={revealed} onRevealedChange={setRevealed} />;
}`;
}

function sampleSafeTileRevealedCode() {
  return `import { SafeTile } from "@joker/design-system";

export function SafeTileRevealedExample() {
  return <SafeTile revealed />;
}`;
}

function sampleSafeTileRevealCode() {
  return `import { useState } from "react";
import { SafeTile } from "@joker/design-system";

export function SafeTileRevealExample() {
  const [revealed, setRevealed] = useState(false);

  return <SafeTile revealed={revealed} onRevealedChange={setRevealed} />;
}`;
}

function sampleMinesInGameCardCode() {
  return `import { MinesBettingPanel } from "@joker/design-system";

export function Example() {
  return (
    <MinesBettingPanel
      inGame
      defaultMinesAmount="1"
      inGameCardProps={{
        currentProfit: "800",
        nextValue: "1050",
        currentMultiplier: "8.0x",
        nextMultiplier: "10.5x",
      }}
      onCashout={() => {}}
    />
  );
}`;
}

function sampleMinesInGameOverlayCode(layout = "desktop") {
  return `import { MinesInGameCard, MinesInGameOverlay } from "@joker/design-system";

export function Example() {
  return (
    <MinesInGameOverlay layout="${layout}" onCashout={() => {}}>
      <MinesInGameCard
        currentProfit="0"
        nextValue="1050"
        currentMultiplier="1.0x"
        nextMultiplier="1.5x"
      />
    </MinesInGameOverlay>
  );
}`;
}

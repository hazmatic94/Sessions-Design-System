import {pageHero, section} from '../shell/pageLayout.js';
import {
  comingSoonGameMenuItems,
  gameMenuItems,
  navigationItemRegistry,
} from '../../data/navigationData.js?v=fc-plus-nav-v2';
import {slug} from '../../utils.js';
import {navigationExampleCard} from './navigationPage.js';

export function renderGameRailsPage(page) {
  return `
    ${pageHero(page)}
    ${section('Game Header Rail', '', gameHeaderRailExamples(), 'button-example-section navigation-example-section')}
    ${section('Game Footer Rail', '', gameFooterRailExamples(), 'button-example-section navigation-example-section')}
  `;
}

function gameHeaderRailVariantMeta(game) {
  const demoKey = `game-rails-header-${slug(game.label)}`;

  if (game === navigationItemRegistry.roulette) {
    return {
      filename: 'RouletteGameHeaderRail.tsx',
      code: sampleRouletteGameHeaderRailCode(),
      reactDemo: demoKey,
    };
  }

  return {
    filename: 'GameHeaderRail.tsx',
    code: sampleGameHeaderRailCode({label: game.label, icon: game.icon}),
    reactDemo: demoKey,
  };
}

function gameHeaderRailExamples() {
  const games = [...gameMenuItems, ...comingSoonGameMenuItems];

  return games
    .map(game => {
      const meta = gameHeaderRailVariantMeta(game);
      const exampleId = `game-header-rail-${slug(game.label)}`;

      return navigationExampleCard({
        id: exampleId,
        tocTitle: game.label,
        reactDemo: meta.reactDemo,
        codeId: `${exampleId}-code`,
        filename: meta.filename,
        code: meta.code,
        className: 'is-game-header-rail is-wide-stage-inline',
      });
    })
    .join('');
}

function gameFooterRailExamples() {
  return navigationExampleCard({
    id: 'game-footer-rail-component',
    tocTitle: 'Default',
    reactDemo: 'game-rails-footer',
    codeId: 'game-footer-rail-code',
    filename: 'GameFooterRail.tsx',
    code: sampleGameFooterRailCode(),
    className: 'is-game-footer-rail is-wide-stage-inline',
  });
}

function sampleGameHeaderRailCode({label = 'CocoHut', icon = 'coco-hut'} = {}) {
  return `import { GameHeaderRail } from "@joker/design-system";

export function Example() {
  return (
    <GameHeaderRail
      game={{ label: "${label}", icon: "${icon}" }}
      rightLabel="Fair Play"
      rightIcon="fair-play"
    />
  );
}`;
}

function sampleRouletteGameHeaderRailCode() {
  return `import { RouletteGameHeaderRail } from "@joker/design-system";

export function Example() {
  return <RouletteGameHeaderRail />;
}`;
}

function sampleGameFooterRailCode() {
  return `import { GameFooterRail } from "@joker/design-system";

export function Example() {
  return <GameFooterRail />;
}`;
}

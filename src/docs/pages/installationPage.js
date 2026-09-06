import { codePanel, section } from '../shell/pageLayout.js';

export function renderInstallationPage(page) {
  return `
    <section class="page-hero introduction-hero">
      <div class="page-hero-main">
        <div class="page-hero-copy">
          <div class="page-hero-text">
            <h1>${page.title}</h1>
            <p class="lede">${page.subtitle}</p>
          </div>
        </div>
      </div>
      <hr class="introduction-divider" aria-hidden="true" />
    </section>
    <div class="installation-page">
    ${section(
      'Install Package',
      '',
      `
      <p class="section-support-copy">Requires React and React DOM 18 or later as peer dependencies.</p>
      ${codePanel('install-package-code', 'terminal', sampleInstallCommand())}
    `,
    )}
    ${section(
      'Import Global Styles',
      '',
      `
      <p class="section-support-copy">Pull this in once at the app root. It loads fonts, tokens, button, inputs, components, and shell styles.</p>
      ${codePanel('global-styles-code', 'main.tsx', sampleGlobalStylesImport())}
    `,
    )}
    ${section(
      'Use Components',
      '',
      `
      <p class="section-support-copy">Import React components from the package root. Most of the system ships through this entry.</p>
      ${codePanel('use-components-code', 'Example.tsx', samplePackageComponentUsage())}
    `,
    )}
    ${section(
      'Use Design Tokens',
      '',
      `
      <p class="section-support-copy">Tokens are CSS custom properties from <code>styles.css</code>. Use them in your own CSS after the global import.</p>
      ${codePanel('use-tokens-code', 'card.css', sampleDesignTokenUsage())}
    `,
    )}
    ${section(
      'Package Exports',
      '',
      `
      <p class="section-support-copy">Public entry points from <code>package.json</code>. The root export is the React surface; everything else is styles, deep imports, or assets.</p>
      ${codePanel('package-exports-code', '@joker/design-system', samplePackageExports())}
    `,
    )}
    ${section(
      'Root Export Surface',
      '',
      `
      <p class="section-support-copy">What you get from <code>import { … } from "@joker/design-system"</code>, grouped the way the package is organised.</p>
      ${codePanel('root-export-surface-code', 'dist/index', sampleRootExportSurface())}
    `,
    )}
    </div>
  `;
}

function sampleInstallCommand() {
  return `npm install @joker/design-system`;
}

function sampleGlobalStylesImport() {
  return `import "@joker/design-system/styles.css";`;
}

function samplePackageComponentUsage() {
  return `import { Button } from "@joker/design-system";

export function Example() {
  return (
    <Button variant="primary">
      Confirm
    </Button>
  );
}`;
}

function sampleDesignTokenUsage() {
  return `.card {
  background: var(--color-surface-primary);
  color: var(--color-text-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-16);
}`;
}

function samplePackageExports() {
  return `@joker/design-system
├─ .                                              # React components + types (dist/index)
├─ styles.css                                     # tokens + button + inputs + components + shell
├─ styles/*.css                                   # optional individual sheets
├─ components/Button.css
├─ components/Input.css
├─ components/ShowroomCard/ShowroomCard.css
├─ components/RouletteWheel                       # deep import
├─ components/RouletteWheel/rouletteWheelPaths
└─ assets/*                                       # icons, images, audio`;
}

function sampleRootExportSurface() {
  return `@joker/design-system
├─ primitives
│  ├─ Button, SkipButton, Input, Select, Tabs
│  ├─ Chip, StatusChip, ScoreChip, Navigation
│  └─ OtpInput, PlusMinusInput, MultiplierInput
├─ betting
│  ├─ BettingPanelSurface
│  ├─ PlaceBetFooter, CashoutFooter, InGameDualActionFooter
│  └─ Mines / HiLo / CoinFlip / Roulette / CocoHut / Crash panels
├─ game chrome
│  ├─ GameShell, AppShell, FullGameShell, GameChromeShell
│  └─ GameHeaderRail, GameFooterRail, game-specific rails
├─ game pieces
│  ├─ GameCard*, HigherCard, LowerCard, WinModalCard
│  ├─ Mines tiles, WinTile, LossTile, SafeTile
│  ├─ Coin*, CoinProgression, RouletteWheel, RouletteChip
│  └─ WinStreakRow, EnterBetPrecursor, sounds helpers
└─ sportsbook
   ├─ OddsButton, OddsButtonGroup, OddsPanel, OddsRow
   ├─ MobileOddsGroup, MobileHiLoOddsGroup, MobileRouletteOddsGroup
   └─ UpcomingMatches, LiveMatchScore, BetSlipRow, CompetitionHeader, TeamInfo, ViewMarkets`;
}

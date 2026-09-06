import {escapeHtml, slug} from '../utils.js';
import {renderBettingPanelSurfacePage} from '../docs/pages/bettingPanelSurfacePage.js?v=betting-panel-footers-v8';
import {renderButtonsPage} from '../docs/pages/buttonsPage.js?v=game-container-page-v1';
import {renderCardsPage} from '../docs/pages/cardsPage.js?v=showroom-card-move-v2';
import {renderCoinFlipPage} from '../docs/pages/coinFlipPage.js?v=coin-progression-scale-v2';
import {renderGameContainerPage} from '../docs/pages/gameContainerPage.js?v=footer-settings-v1';
import {renderRoulettePage} from '../docs/pages/roulettePage.js?v=roulette-win-chip-static-v1';
import {renderShowroomPage} from '../docs/pages/showroomPage.js?v=showroom-card-move-v1';
import {renderSportsbookPage} from '../docs/pages/sportsbookPage.js?v=game-container-page-v1';
import {renderHiloPage} from '../docs/pages/hiloPage.js?v=hide-legacy-betting-panels-v1';
import {renderMinesPage} from '../docs/pages/minesPage.js?v=hide-legacy-betting-panels-v1';
import {renderChipsPage} from '../docs/pages/chipsPage.js?v=game-container-page-v1';
import {renderFoundationPage} from '../docs/pages/foundations/index.js?v=wallet-icon-v1';
import {renderHomePage} from '../docs/pages/homePage.js?v=home-logo-v5-loop';
import {renderIntroductionPage} from '../docs/pages/introductionPage.js?v=game-container-page-v1';
import {renderInstallationPage} from '../docs/pages/installationPage.js?v=installation-exports-v1';
import {renderInputsPage} from '../docs/pages/inputsPage.js?v=plus-minus-value-v1';
import {renderGameRailsPage} from '../docs/pages/gameRailsPage.js?v=fair-play-inline-v2';
import {renderModalsPage} from '../docs/pages/modalsPage.js?v=modals-page-v3';
import {renderNavigationPage} from '../docs/pages/navigationPage.js?v=wallet-icon-v1';
import {codePanel, pageHero, section} from '../docs/shell/pageLayout.js';
import {hydrateLucideIcons, lucideIcon} from '../utils/lucideIcon.js?v=nav-outline-v1';

export {hydrateLucideIcons, lucideIcon};

export const templates = {
  home: page => renderHomePage(page),
  installation: page => renderInstallationPage(page),

  foundation: page => renderFoundationPage(page),

  component: page =>
    page.title === 'Buttons'
      ? renderButtonsPage(page)
      : page.title === 'Inputs'
        ? renderInputsPage(page)
        : page.title === 'Navigation'
          ? renderNavigationPage(page)
          : page.title === 'Chips'
            ? renderChipsPage(page)
            : page.title === 'Cards'
              ? renderCardsPage(page)
              : page.title === 'Betting Panel'
                ? renderBettingPanelSurfacePage(page)
              : page.title === 'Game Rails'
                ? renderGameRailsPage(page)
                : page.title === 'Modals'
                ? renderModalsPage(page)
                : `
    ${pageHero(page)}
    ${section(
      'Live Preview',
      'A reserved preview area for the production component once Joker component designs are added.',
      `
      <div class="preview-shell">
        <div class="preview-placeholder">
          <strong>${page.title} preview slot</strong>
          <span>Use this area for live examples, responsive states, and implementation-backed component demos.</span>
        </div>
      </div>
    `,
    )}
    ${section(
      'Variants',
      'Every component page supports a repeatable variant model.',
      `
      <div class="variant-grid">
        ${variantTile('Primary', 'Main product action or default expression.')}
        ${variantTile('Secondary', 'Supporting action or lower emphasis expression.')}
        ${variantTile('Danger', 'Destructive or irreversible action pattern.')}
      </div>
    `,
    )}
    ${section(
      'States',
      'Document interaction, validation, loading, empty, disabled, and error states in one predictable place.',
      `
      <div class="state-list">
        ${stateRow('Default', 'Resting state used for most product contexts.')}
        ${stateRow('Hover and focus', 'Interaction states with visible keyboard focus requirements.')}
        ${stateRow('Disabled', 'Unavailable state with clear affordance and accessible messaging.')}
        ${stateRow('Loading', 'Progress state for asynchronous actions.')}
      </div>
    `,
    )}
    ${section(
      'Usage Guidelines',
      'Use this area for product rules, accessibility requirements, and implementation constraints.',
      `
      <div class="card-grid">
        ${guideline('Do', 'Describe the intended product use and the strongest default recommendation.')}
        ${guideline('Avoid', 'Capture misuse, ambiguous patterns, and cases where another component is better.')}
      </div>
    `,
    )}
    ${section('Code Example', 'Production-ready examples can be copied directly from this section.', codePanel('component-code', `${slug(page.title)}.tsx`, sampleComponentCode(page.title), {collapsible: true}))}
  `,

  game: page =>
    page.title === 'Coin Flip'
      ? renderCoinFlipPage(page)
      : page.title === 'Hilo'
        ? renderHiloPage(page)
        : page.title === 'Mines'
          ? renderMinesPage(page)
          : page.title === 'Roulette'
              ? renderRoulettePage(page)
              : page.title === 'Sportsbook'
                ? renderSportsbookPage(page)
                : `
    ${pageHero(page)}
    ${section(
      'Game Overview',
      'Game pages capture shared product context, decisions, and working notes for a game surface.',
      `
      <div class="card-grid">
        ${guideline('Purpose', page.subtitle)}
        ${guideline('Ownership', 'Connect this page to design, product, engineering, analytics, and compliance owners as needed.')}
      </div>
    `,
    )}
    ${section(
      'Working Sections',
      'Add recurring notes, open questions, decisions, and implementation guidance.',
      `
      <div class="resource-list">
        ${resourceItem('Scope', 'What this game page covers and what stays out of scope')}
        ${resourceItem('Decisions', 'Agreed product and design decisions')}
        ${resourceItem('Open questions', 'Unresolved items that still need alignment')}
        ${resourceItem('Implementation', 'Composable components, patterns, and data contracts')}
      </div>
    `,
    )}
  `,

  template: page =>
    page.title === 'Game Container'
      ? renderGameContainerPage(page)
      : `
    ${pageHero(page)}
    ${section(
      'Template Structure',
      'Templates turn system standards into reusable page-level starting points.',
      `
      <div class="template-grid">
        ${docCard('Header', 'Page title, primary context, and key action placement.', '#/components/buttons')}
        ${docCard('Content', 'Recommended layout regions and responsive behavior.', '#/foundations/spacing')}
        ${docCard('State handling', 'Empty, loading, permission, and error standards.', '#/components/tables')}
        ${docCard('Instrumentation', 'Analytics and event naming notes for product consistency.', '#/components/cards')}
      </div>
    `,
    )}
    ${section('Starter Code', 'Use this slot for future template scaffolds.', codePanel('template-code', `${slug(page.title)}-template.tsx`, sampleTemplateCode(page.title)))}
  `,

  resource: page =>
    page.title === 'Showroom'
      ? renderShowroomPage(page)
      : page.title === 'Introduction'
        ? renderIntroductionPage(page)
        : `
    ${pageHero(page)}
    ${section(
      'Resource Template',
      'This page is ready for internal standards, governance, and release documentation.',
      `
      <div class="resource-list">
        ${resourceItem('Purpose', page.subtitle)}
        ${resourceItem('Audience', 'Design, engineering, product, and AI coding tools')}
        ${resourceItem('Workflow', 'Draft, review, approve, ship, and announce')}
        ${resourceItem('Maintenance', 'Owners, review cadence, and deprecation policy')}
      </div>
    `,
    )}
  `,
};


function spacingGuidelineRow(scope, tokens, guidance) {
  return `
    <article class="spacing-guideline-row">
      <strong>${scope}</strong>
      <code>${tokens}</code>
      <p>${guidance}</p>
    </article>
  `;
}




function stat(value, label, description) {
  return `<article class="stat-card"><strong>${value}</strong><h3>${label}</h3><span>${description}</span></article>`;
}

function docCard(title, description, href) {
  return `
    <a class="doc-card" href="${href}">
      <header>
        <h3>${title}</h3>
        <span class="status-pill">Open</span>
      </header>
      <p>${description}</p>
    </a>
  `;
}

function guideline(title, description) {
  return `<article class="guideline-card"><h3>${title}</h3><p>${description}</p></article>`;
}


function variantTile(title, description) {
  return `<article class="variant-tile"><strong>${title}</strong><span>${description}</span></article>`;
}

function stateRow(title, description) {
  return `<article class="state-row"><h3>${title}</h3><p>${description}</p></article>`;
}

function resourceItem(title, description) {
  return `<article class="resource-item"><strong>${title}</strong><span>${description}</span></article>`;
}

function flowStep(number, title, description) {
  return `<article class="flow-step"><h3>${number}. ${title}</h3><p>${description}</p></article>`;
}













function sampleComponentCode(title) {
  const componentName = title.replace(/\s+/g, '');
  return `import { ${componentName} } from "@joker/design-system";

export function Example() {
  return (
    <${componentName} />
  );
}`;
}

function sampleTemplateCode(title) {
  const templateName = title.replace(/\s+/g, '');
  return `export const ${templateName}Template = {
  regions: ["header", "content", "supporting-panel"],
  foundations: ["spacing", "typography", "color"],
  patterns: [],
  components: []
};`;
}

function sampleFlowCode(title) {
  return `# ${title} Flow

- Entry:
- Decision:
- Review:
- Completion:
- Recovery:
- Analytics:
- API states:`;
}

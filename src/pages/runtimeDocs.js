import {renderBettingPanelSurfacePage} from '../docs/pages/bettingPanelSurfacePage.js?v=sessions-pages-v1';
import {renderButtonsPage} from '../docs/pages/buttonsPage.js?v=sessions-button-v17';
import {renderCardsPage} from '../docs/pages/cardsPage.js?v=sessions-pages-v1';
import {renderCoinFlipPage} from '../docs/pages/coinFlipPage.js?v=sessions-pages-v1';
import {renderGameContainerPage} from '../docs/pages/gameContainerPage.js?v=sessions-pages-v1';
import {renderRoulettePage} from '../docs/pages/roulettePage.js?v=sessions-pages-v1';
import {renderSportsbookPage} from '../docs/pages/sportsbookPage.js?v=sessions-pages-v1';
import {renderHiloPage} from '../docs/pages/hiloPage.js?v=sessions-pages-v1';
import {renderMinesPage} from '../docs/pages/minesPage.js?v=sessions-pages-v1';
import {renderChipsPage} from '../docs/pages/chipsPage.js?v=sessions-pages-v1';
import {renderFoundationPage} from '../docs/pages/foundations/index.js?v=sessions-product-icons-v1';
import {renderHomePage} from '../docs/pages/homePage.js?v=sessions-nav-trim-v1';
import {renderIntroductionPage} from '../docs/pages/introductionPage.js?v=sessions-pages-v1';
import {renderInstallationPage} from '../docs/pages/installationPage.js?v=sessions-pages-v1';
import {renderInputsPage} from '../docs/pages/inputsPage.js?v=sessions-input-v6';
import {renderGameRailsPage} from '../docs/pages/gameRailsPage.js?v=sessions-pages-v1';
import {renderModalsPage} from '../docs/pages/modalsPage.js?v=sessions-pages-v1';
import {renderNavigationPage} from '../docs/pages/navigationPage.js?v=sessions-rail-v3';
import {codePanel, pageHero, section} from '../docs/shell/pageLayout.js';
import {hydrateLucideIcons, lucideIcon} from '../utils/lucideIcon.js?v=nav-outline-v1';
import {slug} from '../utils.js';

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
                    : fallbackComponentPage(page),

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
              : fallbackComponentPage(page),

  template: page =>
    page.title === 'Game Container'
      ? renderGameContainerPage(page)
      : fallbackComponentPage(page),

  resource: page =>
    page.title === 'Introduction'
      ? renderIntroductionPage(page)
      : fallbackComponentPage(page),
};

function fallbackComponentPage(page) {
  return `
    ${pageHero(page)}
    ${section(
      'Live Preview',
      '',
      `
      <div class="preview-shell">
        <div class="preview-placeholder">
          <strong>${page.title} preview slot</strong>
          <span>Drop the next Sessions component into this frame.</span>
        </div>
      </div>
    `,
    )}
    ${section(
      'Code Example',
      '',
      codePanel(
        'component-code',
        `${slug(page.title)}.tsx`,
        `export function Example() {\n  return <${page.title.replace(/\s+/g, '')} />;\n}`,
        {collapsible: true},
      ),
    )}
  `;
}

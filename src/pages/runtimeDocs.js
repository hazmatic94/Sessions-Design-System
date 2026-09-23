import {renderAvatarPage} from '../docs/pages/avatarPage.js?v=sessions-avatar-sizes-v3';
import {renderButtonsPage} from '../docs/pages/buttonsPage.js?v=sessions-button-icons-v2';
import {renderCardsPage} from '../docs/pages/cardsPage.js?v=sessions-list-card-scroll-v1';
import {renderCoinFlipPage} from '../docs/pages/coinFlipPage.js?v=sessions-pages-v1';
import {renderGameContainerPage} from '../docs/pages/gameContainerPage.js?v=sessions-pages-v1';
import {renderRoulettePage} from '../docs/pages/roulettePage.js?v=sessions-pages-v1';
import {renderSportsbookPage} from '../docs/pages/sportsbookPage.js?v=sessions-pages-v1';
import {renderHiloPage} from '../docs/pages/hiloPage.js?v=sessions-pages-v1';
import {renderMinesPage} from '../docs/pages/minesPage.js?v=sessions-pages-v1';
import {renderChipsPage} from '../docs/pages/chipsPage.js?v=sessions-chip-v4';
import {renderFoundationPage} from '../docs/pages/foundations/index.js?v=sessions-product-icons-v2';
import {renderHomePage} from '../docs/pages/homePage.js?v=sessions-home-h2-v1';
import {renderIntroductionPage} from '../docs/pages/introductionPage.js?v=sessions-page-h2-v1';
import {renderInstallationPage} from '../docs/pages/installationPage.js?v=sessions-page-h2-v1';
import {renderInputsPage} from '../docs/pages/inputsPage.js?v=sessions-page-h2-v1';
import {renderModalsPage} from '../docs/pages/modalsPage.js?v=sessions-pages-v1';
import {renderNavigationPage} from '../docs/pages/navigationPage.js?v=sessions-page-h2-v1';
import {renderLegendItemPatternPage} from '../docs/pages/patterns/legendItemPage.js?v=sessions-patterns-v1';
import {renderAppointmentRowsPatternPage} from '../docs/pages/patterns/appointmentRowsPage.js?v=sessions-responsive-demo-v1';
import {renderChartGridPatternPage} from '../docs/pages/patterns/chartGridPage.js?v=sessions-chart-grid-v40';
import {renderMetricRowPatternPage} from '../docs/pages/patterns/metricRowPage.js?v=sessions-patterns-v1';
import {renderMetricValuePatternPage} from '../docs/pages/patterns/metricValuePage.js?v=sessions-patterns-v1';
import {renderCalendarHeaderRowPatternPage} from '../docs/pages/patterns/calendarHeaderRowPage.js?v=sessions-calendar-header-v2';
import {renderNavigatorPatternPage} from '../docs/pages/patterns/navigatorPage.js?v=sessions-navigator-v3';
import {renderPageHeaderPatternPage} from '../docs/pages/patterns/pageHeaderPage.js?v=sessions-patterns-v1';
import {renderStaffHeaderPatternPage} from '../docs/pages/patterns/staffHeaderPage.js?v=sessions-staff-header-v3';
import {renderHourBlockPatternPage} from '../docs/pages/patterns/hourBlockPage.js?v=sessions-hour-calendar-v5';
import {renderFooterPatternPage} from '../docs/pages/patterns/footerPage.js?v=sessions-footer-v1';
import {codePanel, pageHero, section} from '../docs/shell/pageLayout.js?v=sessions-footer-v1';
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
      : page.title === 'Avatar'
        ? renderAvatarPage(page)
        : page.title === 'Inputs'
        ? renderInputsPage(page)
        : page.title === 'Navigation'
          ? renderNavigationPage(page)
          : page.title === 'Chips'
            ? renderChipsPage(page)
            : page.title === 'Cards'
              ? renderCardsPage(page)
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

  pattern: page =>
    page.title === 'Page Header'
      ? renderPageHeaderPatternPage(page)
      : page.title === 'Metric Value'
        ? renderMetricValuePatternPage(page)
        : page.title === 'Metric Row'
          ? renderMetricRowPatternPage(page)
          : page.title === 'Legend Item'
            ? renderLegendItemPatternPage(page)
            : page.title === 'Chart Grid'
              ? renderChartGridPatternPage(page)
              : page.title === 'Appointment Rows'
                ? renderAppointmentRowsPatternPage(page)
                : page.title === 'Navigator'
                  ? renderNavigatorPatternPage(page)
                  : page.title === 'Calendar Header Row'
                    ? renderCalendarHeaderRowPatternPage(page)
                    : page.title === 'Staff Header'
                      ? renderStaffHeaderPatternPage(page)
                      : page.title === 'Hour Block'
                        ? renderHourBlockPatternPage(page)
                        : page.title === 'Footer'
                          ? renderFooterPatternPage(page)
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

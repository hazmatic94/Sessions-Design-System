import {escapeHtml, slug} from '../utils.js';
import {renderFoundationPage} from '../docs/pages/foundations/index.js?v=wallet-icon-v1';
import {renderHomePage} from '../docs/pages/homePage.js?v=sessions-clean-v1';
import {renderIntroductionPage} from '../docs/pages/introductionPage.js?v=sessions-clean-v1';
import {renderInstallationPage} from '../docs/pages/installationPage.js?v=sessions-clean-v1';
import {renderComponentsOverviewPage} from '../docs/pages/componentsOverviewPage.js?v=sessions-clean-v1';
import {codePanel, pageHero, section} from '../docs/shell/pageLayout.js';
import {hydrateLucideIcons, lucideIcon} from '../utils/lucideIcon.js?v=nav-outline-v1';

export {hydrateLucideIcons, lucideIcon};

export const templates = {
  home: page => renderHomePage(page),
  installation: page => renderInstallationPage(page),
  foundation: page => renderFoundationPage(page),

  component: page =>
    page.title === 'Overview'
      ? renderComponentsOverviewPage(page)
      : `
    ${pageHero(page)}
    ${section(
      'Live Preview',
      'A reserved preview area for the production component.',
      `
      <div class="preview-shell">
        <div class="preview-placeholder">
          <strong>${escapeHtml(page.title)} preview slot</strong>
          <span>Drop live examples, variants, and implementation-backed demos here.</span>
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
      'Document interaction, validation, loading, empty, disabled, and error states in one place.',
      `
      <div class="state-list">
        ${stateRow('Default', 'Resting state used for most product contexts.')}
        ${stateRow('Hover and focus', 'Interaction states with visible keyboard focus.')}
        ${stateRow('Disabled', 'Unavailable state with clear affordance.')}
        ${stateRow('Loading', 'Progress state for asynchronous actions.')}
      </div>
    `,
    )}
    ${section(
      'Usage Guidelines',
      'Product rules, accessibility requirements, and implementation constraints.',
      `
      <div class="card-grid">
        ${guideline('Do', 'Describe the intended use and the strongest default.')}
        ${guideline('Avoid', 'Capture misuse and cases where another component is better.')}
      </div>
    `,
    )}
    ${section(
      'Code Example',
      'Production-ready examples can be copied from this section.',
      codePanel(
        'component-code',
        `${slug(page.title)}.tsx`,
        sampleComponentCode(page.title),
        {collapsible: true},
      ),
    )}
  `,

  resource: page =>
    page.title === 'Introduction'
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

function sampleComponentCode(title) {
  const componentName = title.replace(/\s+/g, '');
  return `import { ${componentName} } from "@sessions/design-system";

export function Example() {
  return (
    <${componentName} />
  );
}`;
}

import {codePanel, section} from '../shell/pageLayout.js';

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
      'Run The Docs Site',
      '',
      `
      <p class="section-support-copy">From the repo root, serve the site with the local no-cache server.</p>
      ${codePanel('install-package-code', 'terminal', 'python3 serve-dev.py 4173')}
    `,
    )}
    ${section(
      'Where New Components Live',
      '',
      `
      <p class="section-support-copy">Add source under <code>src/components</code>, then register a docs page so it shows up in the sidebar.</p>
      ${codePanel(
        'add-component-code',
        'src/docs/pages',
        `// 1. Create src/components/YourComponent/
// 2. Add a docs page in src/docs/pages/
// 3. Register the route in src/system-data.js

{
  title: 'Components',
  items: [
    {label: 'Overview', route: '/components'},
    {label: 'Your Component', route: '/components/your-component'},
  ],
}`,
      )}
    `,
    )}
    ${section(
      'Use Design Tokens',
      '',
      `
      <p class="section-support-copy">Foundations already ship as CSS custom properties from <code>src/styles/tokens.css</code>. Use them in new component CSS.</p>
      ${codePanel(
        'use-tokens-code',
        'card.css',
        `.card {
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  border-radius: var(--radius-m);
  padding: var(--spacing-24);
}`,
      )}
    `,
    )}
    </div>
  `;
}

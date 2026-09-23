import {codePanel, section} from '../shell/pageLayout.js';

export function renderInstallationPage(page) {
  return `
    <section class="page-hero introduction-hero">
      <div class="page-hero-main">
        <div class="page-hero-copy">
          <div class="page-hero-text">
            <h2>${page.title}</h2>
            <p class="lede">${page.subtitle}</p>
          </div>
        </div>
      </div>
      <hr class="introduction-divider" aria-hidden="true" />
    </section>
    <div class="installation-page">
    ${section(
      'Install In Another Repo',
      '',
      `
      <p class="section-support-copy">Link the package from a local path, then copy assets into your app.</p>
      ${codePanel(
        'install-package-code',
        'terminal',
        `npm install ../Sessions-Design-System

# copy icons, fonts, and images into your app public folder
cp -R node_modules/@sessions/design-system/assets ./public/assets`,
      )}
    `,
    )}
    ${section(
      'Import Styles + Components',
      '',
      `
      <p class="section-support-copy">Load the CSS bundle once, then import whatever you need from the package entry.</p>
      ${codePanel(
        'use-package-code',
        'app.js',
        `import "@sessions/design-system/styles";
import {
  renderSessionsButton,
  renderSessionsHourColumn,
} from "@sessions/design-system";

document.querySelector("#slot").innerHTML = renderSessionsHourColumn({
  hour: 11,
  bookings: [{
    startMinute: 0,
    span: 3,
    customerName: "Jack Doe",
    serviceType: "Skin Fade",
  }],
});`,
      )}
    `,
    )}
    ${section(
      'Run The Docs Site',
      '',
      `
      <p class="section-support-copy">From this repo root, serve the docs with the local no-cache server.</p>
      ${codePanel('install-docs-code', 'terminal', 'npm run dev')}
    `,
    )}
    ${section(
      'Use Design Tokens',
      '',
      `
      <p class="section-support-copy">Tokens ship as CSS custom properties from <code>tokens.css</code> (included in the styles bundle).</p>
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

import {codePanel, pageHero, section} from '../shell/pageLayout.js';

export function renderComponentsOverviewPage(page) {
  return `
    ${pageHero(page)}
    ${section(
      'Empty Library',
      '',
      `
      <div class="preview-shell">
        <div class="preview-placeholder">
          <strong>No Sessions components yet</strong>
          <span>JokerPlus games, betting panels, and showroom demos have been removed. This section is the workshop for the next library.</span>
        </div>
      </div>
    `,
    )}
    ${section(
      'How To Add One',
      '',
      `
      <div class="card-grid">
        <article class="guideline-card">
          <h3>1. Build the component</h3>
          <p>Create a folder in <code>src/components</code> with the markup, styles, and states you want to ship.</p>
        </article>
        <article class="guideline-card">
          <h3>2. Document it</h3>
          <p>Add a page under <code>src/docs/pages</code> using the standard preview, variants, states, guidelines, and code sections.</p>
        </article>
        <article class="guideline-card">
          <h3>3. Put it in the nav</h3>
          <p>Register the route in <code>src/system-data.js</code> so it appears in the Components group.</p>
        </article>
      </div>
    `,
    )}
    ${section(
      'Starter Route',
      '',
      codePanel(
        'component-starter-code',
        'system-data.js',
        `{
  title: 'Components',
  items: [
    {label: 'Overview', route: '/components'},
    {label: 'Button', route: '/components/button'},
  ],
}`,
        {collapsible: true},
      ),
    )}
  `;
}

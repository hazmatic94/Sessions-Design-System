import {navGroups} from '../../../system-data.js';
import {lucideIcon} from '../../../utils/lucideIcon.js?v=nav-outline-v1';
import {pageHero} from '../../shell/pageLayout.js';

export function renderIconsPage(page) {
  return `
    ${pageHero(page)}
    ${iconsFoundation()}
  `;
}

function iconsFoundation() {
  return `
    <section id="product-icons" class="section-block icon-swatch-section-block">
      <div class="icon-swatch-section">
        <div class="icon-swatch-grid">
          ${productIconNames().map(iconCatalogSwatch).join('')}
        </div>
      </div>
    </section>
  `;
}

const componentUiIcons = [
  'check',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'copy',
  'menu',
  'moon',
  'search',
  'sun',
  'x',
  'rocket',
  'package',
  'palette',
  'type',
  'layers',
  'timer',
  'shapes',
  'box',
  'plus',
];

function productIconNames() {
  const icons = new Set(componentUiIcons);

  navGroups.forEach(group => {
    group.items?.forEach(item => {
      if (typeof item === 'object' && item.icon) icons.add(item.icon);
    });
  });

  return [...icons].sort((a, b) => a.localeCompare(b));
}

function iconCatalogSwatch(name) {
  return `
    <article class="icon-swatch-card">
      <div class="icon-swatch-card__preview">
        <div class="icon-swatch-card__icon-wrap" aria-hidden="true">
          ${lucideIcon(name, 'icon-swatch-card__icon')}
        </div>
        <button
          type="button"
          class="docs-token-chip docs-token-chip--copy color-swatch-card__hex-chip icon-swatch-card__copy-chip"
          data-copy
          data-copy-value="${escapeHtmlAttr(lucideIcon(name))}"
          data-copy-label="Copy SVG for ${name}"
          aria-label="Copy SVG for ${name}"
        >Copy SVG</button>
      </div>
      <span class="icon-swatch-card__label">${name}</span>
    </article>
  `;
}

function escapeHtmlAttr(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

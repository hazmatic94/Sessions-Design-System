import { navigationItemRegistry } from '../../../data/navigationData.js?v=crash-coming-soon-v1';
import { navGroups } from '../../../system-data.js';
import { navigationIconSvg } from '../../../data/navigationSvgIcons.js?v=wallet-icon-v1';
import { lucideIcon } from '../../../utils/lucideIcon.js?v=nav-outline-v1';
import { pageHero } from '../../shell/pageLayout.js';

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
  'chevron-up',
  'copy',
  'heart',
  'layout-dashboard',
  'list',
  'menu',
  'moon',
  'receipt-text',
  'search',
  'search-filled',
  'star',
  'sun',
  'trash-2',
  'x',
];

function productIconNames() {
  const icons = new Set(componentUiIcons);

  navGroups.forEach(group => {
    group.items?.forEach(item => {
      if (typeof item === 'object' && item.icon) icons.add(item.icon);
    });

    group.groups?.forEach(subgroup => {
      subgroup.items?.forEach(item => {
        if (typeof item === 'object' && item.icon) icons.add(item.icon);
      });
    });
  });

  Object.values(navigationItemRegistry).forEach(item => {
    if (item.icon) icons.add(item.icon);
  });

  return [...icons].sort((a, b) => a.localeCompare(b));
}

function iconCatalogSwatch(name) {
  return `
    <article class="icon-swatch-card">
      <div class="icon-swatch-card__preview">
        <div class="icon-swatch-card__icon-wrap" aria-hidden="true">
          ${iconCatalogMarkup(name)}
        </div>
        <button
          type="button"
          class="docs-token-chip docs-token-chip--copy color-swatch-card__hex-chip icon-swatch-card__copy-chip"
          data-copy
          data-copy-value="${escapeHtmlAttr(iconCatalogSvgRaw(name))}"
          data-copy-label="Copy SVG for ${name}"
          aria-label="Copy SVG for ${name}"
        >Copy SVG</button>
      </div>
      <span class="icon-swatch-card__label">${name}</span>
    </article>
  `;
}

function iconCatalogMarkup(name) {
  return (
    navigationIconSvg(name, 'icon-swatch-card__icon') ||
    lucideIcon(name, 'icon-swatch-card__icon')
  );
}

function iconCatalogSvgRaw(name) {
  return navigationIconSvg(name) || lucideIcon(name);
}

function escapeHtmlAttr(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

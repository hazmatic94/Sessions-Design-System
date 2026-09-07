import {productIconFiles, productIconLabel, productIconPath} from '../../../data/productIcons.js?v=sessions-product-icons-v1';
import {pageHero} from '../../shell/pageLayout.js';

const ICON_ASSET_VERSION = 'sessions-product-icons-v1';

export function renderIconsPage(page) {
  return `
    ${pageHero(page)}
    ${iconsFoundation()}
  `;
}

function iconsFoundation() {
  const icons = [...productIconFiles].sort((a, b) =>
    productIconLabel(a).localeCompare(productIconLabel(b)),
  );

  return `
    <section id="product-icons" class="section-block icon-swatch-section-block">
      <div class="icon-swatch-section">
        <div class="icon-swatch-grid">
          ${icons.map(iconCatalogSwatch).join('')}
        </div>
      </div>
    </section>
  `;
}

function iconCatalogSwatch(file) {
  const label = productIconLabel(file);
  const assetPath = `${productIconPath(file)}?v=${ICON_ASSET_VERSION}`;

  return `
    <article class="icon-swatch-card">
      <div class="icon-swatch-card__preview">
        <div class="icon-swatch-card__icon-wrap" aria-hidden="true">
          <img
            class="icon-swatch-card__icon"
            src="${assetPath}"
            alt=""
            width="20"
            height="20"
            loading="lazy"
            decoding="async"
          />
        </div>
        <button
          type="button"
          class="docs-token-chip docs-token-chip--copy color-swatch-card__hex-chip icon-swatch-card__copy-chip"
          data-copy
          data-copy-src="${assetPath}"
          data-copy-label="Copy SVG for ${label}"
          aria-label="Copy SVG for ${label}"
        >Copy SVG</button>
      </div>
      <span class="icon-swatch-card__label">${label}</span>
    </article>
  `;
}

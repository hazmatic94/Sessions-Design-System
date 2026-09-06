import { spacingTokens } from '../../../system-data.js';
import { pageHero } from '../../shell/pageLayout.js';

export function renderSpacingPage(page) {
  return `
    ${pageHero(page)}
    ${spacingFoundation()}
  `;
}

function spacingFoundation() {
  return `
    <section id="spacing-scale" class="section-block spacing-swatch-section">
      <div class="spacing-swatch-grid">
        ${spacingTokens.map(spacingSwatch).join('')}
      </div>
    </section>
  `;
}

function spacingSwatch(token) {
  const variable = spacingCssVariableName(token.name);
  const pxValue = `${token.value}px`;

  return `
    <article class="color-swatch-card spacing-swatch-card" style="--spacing-size: ${token.value}px">
      <div class="color-swatch-card__swatch spacing-swatch-card__swatch">
        <span class="spacing-swatch-card__bar" aria-hidden="true"></span>
      </div>
      <div class="color-swatch-card__meta">
        <span class="color-swatch-card__token">${pxValue}</span>
        <button
          class="docs-token-chip docs-token-chip--copy color-swatch-card__hex-chip"
          type="button"
          data-copy
          data-copy-value="${variable}"
          data-copy-label="Copy ${variable}"
          aria-label="Copy ${variable}"
        >${variable}</button>
      </div>
    </article>
  `;
}

function spacingCssVariableName(name) {
  return `--${name.replace(/([a-zA-Z])(\d)/g, '$1-$2').toLowerCase()}`;
}

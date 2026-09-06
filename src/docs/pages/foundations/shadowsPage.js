import { shadowTokens } from '../../../system-data.js';
import { pageHero } from '../../shell/pageLayout.js';

export function renderShadowsPage(page) {
  return `
    ${pageHero(page)}
    ${shadowsFoundation()}
  `;
}

function shadowsFoundation() {
  return `
    <section id="shadow-scale" class="section-block shadow-swatch-section">
      <div class="primitive-color-groups">
        <section class="primitive-color-group" aria-label="Shadow Scale">
          <h3>Shadow Scale</h3>
          <div class="primitive-color-grid">
            ${shadowTokens.map(shadowSwatch).join('')}
          </div>
        </section>
      </div>
    </section>
  `;
}

function shadowSwatch(token) {
  const variable = shadowCssVariableName(token.name);

  return `
    <article class="color-swatch-card shadow-swatch-card" style="--shadow-value: ${token.value}">
      <div class="color-swatch-card__swatch shadow-swatch-card__swatch">
        <span class="shadow-swatch-card__preview" aria-hidden="true"></span>
      </div>
      <div class="color-swatch-card__meta">
        <span class="color-swatch-card__token">${token.label}</span>
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

function shadowCssVariableName(name) {
  return `--${name.replace(/([a-zA-Z])(\d)/g, '$1-$2').toLowerCase()}`;
}

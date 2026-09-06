import { radiusTokens } from '../../../system-data.js';
import { pageHero } from '../../shell/pageLayout.js';

export function renderRadiusPage(page) {
  return `
    ${pageHero(page)}
    ${radiusFoundation()}
  `;
}

function radiusFoundation() {
  return `
    <section id="corner-radius" class="section-block radius-swatch-section">
      <div class="primitive-color-groups">
        <section class="primitive-color-group" aria-label="Corner Radius">
          <h3>Corner Radius</h3>
          <div class="primitive-color-grid">
            ${radiusTokens.map(radiusSwatch).join('')}
          </div>
        </section>
      </div>
    </section>
  `;
}

function radiusSwatch(token) {
  const pxValue = `${token.value}px`;
  const variable = radiusCssVariableName(token.name);

  return `
    <article class="color-swatch-card radius-swatch-card" style="--radius-size: ${token.value}px">
      <div class="color-swatch-card__swatch radius-swatch-card__swatch">
        <span class="radius-swatch-card__shape" aria-hidden="true">
          <span class="radius-swatch-card__corner radius-swatch-card__corner--tl"></span>
          <span class="radius-swatch-card__corner radius-swatch-card__corner--tr"></span>
          <span class="radius-swatch-card__edge radius-swatch-card__edge--top"></span>
          <span class="radius-swatch-card__edge radius-swatch-card__edge--left"></span>
          <span class="radius-swatch-card__edge radius-swatch-card__edge--right"></span>
        </span>
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

function radiusCssVariableName(name) {
  return `--${name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])(\d)/g, '$1-$2')
    .toLowerCase()}`;
}

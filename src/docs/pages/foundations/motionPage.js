import {
  motionDurationTokens,
  motionEasingTokens,
  motionPatternTokens,
} from '../../../system-data.js';
import { pageHero } from '../../shell/pageLayout.js';

export function renderMotionPage(page) {
  return `
    ${pageHero(page)}
    ${motionFoundation()}
  `;
}

function motionFoundation() {
  return `
    <section id="motion-tokens" class="section-block motion-swatch-section">
      <div class="primitive-color-groups">
        ${motionSwatchGroup('Duration', motionDurationTokens.map(motionDurationSwatch))}
        ${motionSwatchGroup('Easing', motionEasingTokens.map(motionEasingSwatch))}
        ${motionSwatchGroup('Interaction Patterns', motionPatternTokens.map(motionPatternSwatch))}
      </div>
    </section>
  `;
}

function motionSwatchGroup(title, cards) {
  return `
    <section class="primitive-color-group" aria-label="${title}">
      <h3>${title}</h3>
      <div class="primitive-color-grid">
        ${cards.join('')}
      </div>
    </section>
  `;
}

function motionSwatchCard({title, variable, previewHtml}) {
  return `
    <article class="color-swatch-card motion-swatch-card">
      <div class="color-swatch-card__swatch motion-swatch-card__swatch">
        <div class="motion-swatch-card__preview">${previewHtml}</div>
      </div>
      <div class="color-swatch-card__meta">
        <span class="color-swatch-card__token">${title}</span>
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

function motionTokenTitle(name) {
  const stripped = name.replace(/^(motion|ease)/, '');
  return stripped.replace(/([A-Z])/g, ' $1').trim();
}

function motionDurationSwatch(token) {
  const variable = motionCssVariableName(token.name);
  return motionSwatchCard({
    title: motionTokenTitle(token.name),
    variable,
    previewHtml: `<span class="motion-duration-preview" style="--motion-preview-duration: ${token.value}" aria-hidden="true"></span>`,
  });
}

function motionEasingSwatch(token) {
  const variable = motionCssVariableName(token.name);
  return motionSwatchCard({
    title: motionTokenTitle(token.name),
    variable,
    previewHtml: `<span class="motion-easing-preview" style="--motion-preview-ease: ${token.value}" aria-hidden="true"></span>`,
  });
}

function motionPatternSwatch(token) {
  const variable = motionCssVariableName(token.name);
  return motionSwatchCard({
    title: motionTokenTitle(token.name),
    variable,
    previewHtml: `<span class="motion-pattern-preview ${token.preview}" aria-hidden="true"><span></span></span>`,
  });
}

function motionCssVariableName(name) {
  return `--${name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;
}

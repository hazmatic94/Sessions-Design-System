import {
  primitiveColorFamilies,
  semanticColorGroups,
} from '../../../system-data.js';
import { slug } from '../../../utils.js';
import { pageHero } from '../../shell/pageLayout.js';

export function renderColoursPage(page) {
  return `
    ${pageHero(page)}
    ${colorsFoundation()}
  `;
}

function colorsFoundation() {
  return `
    <section id="primitive-colors" class="section-block color-grid-section">
      <div class="primitive-color-groups">
        ${primitiveColorFamilies.map(colorFamilyGroup).join('')}
      </div>
    </section>
    <section id="semantic-colors" class="section-block semantic-token-section">
      <div class="semantic-token-groups">
        ${semanticColorGroups.map(semanticColorGroup).join('')}
      </div>
    </section>
  `;
}
function colorSwatch(token) {
  const cssVariable = primitiveCssVariableName(token.name);
  const hexValue = token.value.toUpperCase();

  return `
    <article class="color-swatch-card">
      <div class="color-swatch-card__swatch" style="background: var(${cssVariable})">
        ${token.base ? '<span class="base-tag">base</span>' : ''}
      </div>
      <div class="color-swatch-card__meta">
        <span class="color-swatch-card__token">${hexValue}</span>
        <button
          class="docs-token-chip docs-token-chip--copy color-swatch-card__hex-chip"
          type="button"
          data-copy
          data-copy-value="${cssVariable}"
          data-copy-label="Copy ${cssVariable}"
          aria-label="Copy ${cssVariable}"
        >${cssVariable}</button>
      </div>
    </article>
  `;
}

function primitiveCssVariableName(name) {
  return `--${name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])(\d)/g, '$1-$2')
    .toLowerCase()}`;
}

function primitiveColorUsage(token, familyName) {
  if (token.base) return 'Base primitive for this ramp.';
  if (familyName === 'bgWhite')
    return 'White primitive and inverse surface value.';
  if (familyName === 'bgBlack')
    return 'Neutral black primitive for dark surfaces, borders, and text mapping.';
  if (familyName === 'jokerGold')
    return 'Brand gold primitive for premium accents and action mapping.';
  if (familyName === 'jokerGreen')
    return 'Success primitive for positive feedback and completion states.';
  if (familyName === 'jokerRed')
    return 'Error primitive for danger, validation, and destructive states.';
  if (familyName === 'jokerAlert')
    return 'Warning primitive for caution, pending, and attention states.';
  return 'Primitive colour value.';
}
function primitiveColorTokens() {
  return primitiveColorFamilies.flatMap(family =>
    family.tokens.map(token => ({
      ...token,
      family: family.title,
    })),
  );
}

function colorFamilyGroup(family) {
  const title = colorFamilyTitle(family.title);
  return `
    <section id="${slug(title)}" class="primitive-color-group" aria-label="${title}">
      <h3>${title}</h3>
      <div class="primitive-color-grid">
        ${family.tokens.map(token => colorSwatch({...token, family: family.title})).join('')}
      </div>
    </section>
  `;
}

function colorFamilyTitle(title) {
  if (title === 'bgWhite') return 'Joker White';
  if (title === 'bgBlack') return 'Joker Black';
  if (title === 'jokerGreen') return 'Joker Green';
  if (title === 'jokerRed') return 'Joker Red';
  if (title === 'jokerAlert') return 'Joker Alert';
  return 'Joker Gold';
}

function semanticColorGroup(group) {
  return `
    <section id="${slug(group.title)}" class="semantic-token-group primitive-color-group" aria-label="${group.title}">
      <h3>${group.title}</h3>
      <div class="primitive-color-grid">
        ${group.tokens.map(semanticTokenCard).join('')}
      </div>
    </section>
  `;
}

function semanticTokenCard(token) {
  const color = semanticTokenColor(token.value);
  const cssVariable = semanticCssVariableName(token.name);
  const valueLabel = color.value?.startsWith('#')
    ? color.value.toUpperCase()
    : token.value;

  return `
    <article class="color-swatch-card">
      <div class="color-swatch-card__swatch" style="background: ${color.value}"></div>
      <div class="color-swatch-card__meta">
        <span class="color-swatch-card__token">${valueLabel}</span>
        <button
          class="docs-token-chip docs-token-chip--copy color-swatch-card__hex-chip"
          type="button"
          data-copy
          data-copy-value="${cssVariable}"
          data-copy-label="Copy ${cssVariable}"
          aria-label="Copy ${cssVariable}"
        >${cssVariable}</button>
      </div>
    </article>
  `;
}

function semanticCssVariableName(name) {
  return `--${name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\./g, '-')
    .toLowerCase()}`;
}

function semanticTokenColor(value) {
  if (value === 'whiteAlpha08')
    return {value: 'rgb(255 255 255 / 0.08)', text: 'light'};
  const primitive = primitiveColorTokens().find(token => token.name === value);
  return primitive || {value: 'var(--joker-white-50)', text: 'dark'};
}

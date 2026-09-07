import { codePanel, pageHero, section } from '../../shell/pageLayout.js';
import { slug } from '../../../utils.js';

export function renderFoundationFallbackPage(page) {
  return `
    ${pageHero(page)}
    ${foundationTokenTemplate(page)}
  `;
}

function foundationTokenTemplate(page) {
  return `
    ${section(
      'Token Model',
      'Primitive tokens, semantic aliases, and usage standards can be added here without changing the page template.',
      `
      <div class="token-grid">
        ${tokenCard('Primitive', '--sessions-${slug(page.title)}-100', 'Raw values from the Sessions foundation set.')}
        ${tokenCard('Semantic', '--surface-primary', 'Meaningful aliases mapped to primitives for product use.')}
        ${tokenCard('Usage', 'Product standard', 'Guidance for where and how this foundation should be applied.')}
      </div>
    `,
    )}
    ${section(
      'Documentation Slots',
      'Each foundation page is ready for examples, token tables, accessibility notes, and implementation details.',
      `
      <div class="resource-list">
        ${resourceItem('Primitive tokens', 'Ready for raw token values')}
        ${resourceItem('Semantic tokens', 'Ready for product aliases')}
        ${resourceItem('Usage guidelines', 'Ready for standards and edge cases')}
        ${resourceItem('Implementation', 'Ready for CSS, JSON, or TypeScript exports')}
      </div>
    `,
    )}
    ${section('Code Export', 'Example structure for future token export documentation.', codePanel('foundation-code', 'tokens.json', sampleTokenCode(page.title)))}
  `;
}
function tokenCard(title, token, description) {
  return `
    <article class="token-card">
      <div class="token-swatch" style="background: ${tokenBackground(title)}"></div>
      <h3>${title}</h3>
      <div class="token-meta">${token}</div>
      <p>${description}</p>
    </article>
  `;
}

function tokenBackground(title) {
  if (title === 'Primitive') return 'var(--joker-alert-400)';
  if (title === 'Semantic') return 'var(--black-600)';
  return 'linear-gradient(135deg, var(--joker-white-50) 0 50%, var(--black-300) 50% 100%)';
}


function resourceItem(title, description) {
  return `<article class="resource-item"><strong>${title}</strong><span>${description}</span></article>`;
}

function sampleTokenCode(title) {
  return `{
  "$schema": "https://tokens.studio/schemas/tokens.json",
  "${slug(title)}": {
    "primitive": {},
    "semantic": {},
    "usage": "Add Sessions ${title.toLowerCase()} standards here"
  }
}`;
}

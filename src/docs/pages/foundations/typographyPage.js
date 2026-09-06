import { pageHero } from '../../shell/pageLayout.js';

const typographyHeadingStyles = [
  {
    label: 'Heading / H1',
    token: '--text-heading-h1',
    kind: 'heading',
    size: 48,
    weight: 500,
    lineHeight: 0.9,
  },
  {
    label: 'Heading / H2',
    token: '--text-heading-h2',
    kind: 'heading',
    size: 32,
    weight: 500,
    lineHeight: 0.95,
  },
  {
    label: 'Heading / H3',
    token: '--text-heading-h3',
    kind: 'heading',
    size: 24,
    weight: 500,
    lineHeight: 1,
  },
];

const typographyBodyStyles = [
  {
    label: 'Body / 18',
    token: '--text-body-18',
    kind: 'body',
    size: 18,
    weight: 400,
    lineHeight: 1.45,
  },
  {
    label: 'Body / 16',
    token: '--text-body-16',
    kind: 'body',
    size: 16,
    weight: 400,
    lineHeight: 1.45,
  },
  {
    label: 'Body / 14',
    token: '--text-body-14',
    kind: 'body',
    size: 14,
    weight: 400,
    lineHeight: 1.45,
  },
  {
    label: 'Body / 12',
    token: '--text-body-12',
    kind: 'body',
    size: 12,
    weight: 400,
    lineHeight: 1.4,
  },
];


export const typographyTokenCount =
  typographyHeadingStyles.length + typographyBodyStyles.length;

export function renderTypographyPage(page) {
  return `
    ${pageHero(page)}
    ${typographyFoundation()}
  `;
}

function typographyFoundation() {
  return `
    <section id="typography-tokens" class="section-block typography-token-section">
      <div class="typography-token-groups">
        ${typographyTokenGroup('Heading Text', typographyHeadingStyles)}
        ${typographyTokenGroup('Body Text', typographyBodyStyles)}
      </div>
    </section>
  `;
}

const TYPOGRAPHY_SAMPLE_TEXT = 'Every component has a purpose.';

function typographyWeightLabel(weight) {
  if (weight >= 600) return `Semibold / ${weight}`;
  if (weight >= 500) return `Medium / ${weight}`;
  return `Regular / ${weight}`;
}

function typographyTokenGroup(title, rows) {
  return `
    <section class="typography-token-group" aria-label="${title}">
      <div class="typography-token-list">
        ${rows
          .map(
            (row, index) => `
          ${typographyTokenCard(row)}
          ${index < rows.length - 1 ? '<hr class="typography-token-divider" aria-hidden="true" />' : ''}
        `,
          )
          .join('')}
      </div>
    </section>
  `;
}

function typographySpecChip(label, value) {
  return `<span class="docs-token-chip"><span class="docs-token-chip__label">${label}:</span><span class="docs-token-chip__value">${value}</span></span>`;
}

function typographyTokenChipParts(token) {
  const lastDash = token.lastIndexOf('-');
  if (lastDash === -1) {
    return {prefix: token, suffix: ''};
  }

  return {
    prefix: token.slice(0, lastDash + 1),
    suffix: token.slice(lastDash + 1),
  };
}

function typographyTokenChip(token, {copy = false} = {}) {
  if (copy) {
    return `
      <button
        class="docs-token-chip docs-token-chip--copy color-swatch-card__hex-chip"
        type="button"
        data-copy
        data-copy-value="${token}"
        data-copy-label="Copy ${token}"
        aria-label="Copy ${token}"
      >${token}</button>
    `;
  }

  const {prefix, suffix} = typographyTokenChipParts(token);
  const content = `<span class="docs-token-chip__label">${prefix}</span><span class="docs-token-chip__value">${suffix}</span>`;
  return `<span class="docs-token-chip">${content}</span>`;
}

function typographySpecChips(row, lineHeightPx, letterSpacing) {
  const chips = [
    typographySpecChip('Weight', typographyWeightLabel(row.weight)),
    typographySpecChip('Font Size', `${row.size}px`),
    typographySpecChip('Line Height', lineHeightPx),
    typographySpecChip('Letter Spacing', letterSpacing),
  ];

  return chips
    .map((chip, index) =>
      index === 0
        ? chip
        : `<span class="typography-token-chip-divider" aria-hidden="true"></span>${chip}`,
    )
    .join('');
}

function typographyTokenCard(row) {
  const lineHeight = row.lineHeight ?? (row.kind === 'heading' ? 0.9 : 1.45);
  const lineHeightPx = `${Math.round(row.size * lineHeight)}px`;
  const letterSpacing =
    row.letterSpacing ?? (row.kind === 'heading' ? '-3%' : '5%');

  return `
    <article class="typography-token-card">
      <p class="typography-token-card__label">${row.label}</p>
      <p class="typography-token-card__sample ${row.kind}" style="font-size: ${row.size}px; font-weight: ${row.weight}; line-height: ${lineHeight}; letter-spacing: ${letterSpacing};">${TYPOGRAPHY_SAMPLE_TEXT}</p>
      <div class="typography-token-card__chips">
        ${typographyTokenChip(row.token, {copy: true})}
        <div class="typography-token-card__specs">
          ${typographySpecChips(row, lineHeightPx, letterSpacing)}
        </div>
      </div>
    </article>
  `;
}

import { pageHero } from '../../shell/pageLayout.js';

const typographyHeadingStyles = [
  {
    label: 'Heading / H1',
    token: '--text-heading-h1',
    kind: 'heading',
    size: 42,
    weight: 500,
    lineHeight: 'normal',
    letterSpacing: 0,
  },
  {
    label: 'Heading / H2',
    token: '--text-heading-h2',
    kind: 'heading',
    size: 32,
    weight: 500,
    lineHeight: 'normal',
    letterSpacing: 0,
  },
  {
    label: 'Heading / H3',
    token: '--text-heading-h3',
    kind: 'heading',
    size: 24,
    weight: 500,
    lineHeight: 'normal',
    letterSpacing: 0,
  },
];

const typographyBodyStyles = [
  {
    label: 'Body / Big',
    token: '--text-body-big',
    kind: 'body',
    size: 20,
    weight: 400,
    lineHeight: 1.45,
    letterSpacing: '4.5%',
  },
  {
    label: 'Body / Big Medium',
    token: '--text-body-big-medium',
    kind: 'body',
    size: 20,
    weight: 500,
    lineHeight: 1.45,
    letterSpacing: '4.5%',
  },
  {
    label: 'Body / B1',
    token: '--text-body-b1',
    kind: 'body',
    size: 16,
    weight: 400,
    lineHeight: 'normal',
    letterSpacing: '4.5%',
  },
  {
    label: 'Body / B1 Medium',
    token: '--text-body-b1-medium',
    kind: 'body',
    size: 16,
    weight: 500,
    lineHeight: 'normal',
    letterSpacing: '4.5%',
  },
  {
    label: 'Body / 18',
    token: '--text-body-18',
    kind: 'body',
    size: 18,
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
    ${typographyTokenSection('Heading Text', typographyHeadingStyles, 'typography-heading-tokens')}
    ${typographyTokenSection('Body Text', typographyBodyStyles, 'typography-body-tokens')}
  `;
}

function typographyTokenSection(title, rows, id) {
  return `
    <section id="${id}" class="section-block typography-token-section" aria-label="${title}">
      <div class="typography-token-group">
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

function typographyLetterSpacingCss(letterSpacing) {
  if (typeof letterSpacing === 'number') {
    return letterSpacing === 0 ? '0' : `${letterSpacing}px`;
  }

  if (typeof letterSpacing === 'string' && letterSpacing.endsWith('%')) {
    const value = Number.parseFloat(letterSpacing);
    return Number.isFinite(value) ? `${value / 100}em` : '0';
  }

  return letterSpacing;
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
  const lineHeight = row.lineHeight ?? (row.kind === 'heading' ? 'normal' : 1.45);
  const lineHeightLabel =
    lineHeight === 'normal' ? 'Auto' : `${Math.round(row.size * lineHeight)}px`;
  const letterSpacing =
    row.letterSpacing ?? (row.kind === 'heading' ? 0 : '4.5%');
  const letterSpacingLabel =
    typeof letterSpacing === 'number' ? `${letterSpacing}px` : letterSpacing;
  const letterSpacingCss = typographyLetterSpacingCss(letterSpacing);

  return `
    <article class="typography-token-card">
      <p class="typography-token-card__label">${row.label}</p>
      <p class="typography-token-card__sample ${row.kind}" style="font-size: ${row.size}px; font-weight: ${row.weight}; line-height: ${lineHeight}; letter-spacing: ${letterSpacingCss};">${TYPOGRAPHY_SAMPLE_TEXT}</p>
      <div class="typography-token-card__chips">
        ${typographyTokenChip(row.token, {copy: true})}
        <div class="typography-token-card__specs">
          ${typographySpecChips(row, lineHeightLabel, letterSpacingLabel)}
        </div>
      </div>
    </article>
  `;
}

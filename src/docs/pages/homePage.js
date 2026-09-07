import {homeShowroomCardMarkup} from '../markup/homeShowroomCardMarkup.js?v=sessions-clean-v1';

const HOME_TICKER_ITEMS = [
  'Sessions',
  'v1.0',
  'Foundations',
  'Components',
  'Ready to build',
];

const HOME_SHOWROOM_CARDS = [
  {
    railLabel: 'Foundations',
    body: 'Colour, type, spacing, radius, shadows, motion, and icons.',
    href: '#/foundations/colours',
    icon: 'palette',
    innerMedia: `
      <article class="color-swatch-card color-swatch-card--home-showroom">
        <div class="color-swatch-card__swatch" style="background: var(--joker-gold-400)">
          <span class="base-tag">brand</span>
        </div>
        <div class="color-swatch-card__meta">
          <span class="color-swatch-card__token">#FFDEA8</span>
        </div>
      </article>
    `,
  },
  {
    railLabel: 'Components',
    body: 'Buttons, inputs, cards, and the rest of the library — frames ready for new work.',
    href: '#/components/buttons',
    icon: 'box',
    innerMedia: `
      <div class="home-showroom-card__empty-slot">
        <span data-lucide="plus" aria-hidden="true"></span>
        <strong>Empty preview frames</strong>
      </div>
    `,
  },
  {
    railLabel: 'Games',
    body: 'Sportsbook, Coin Flip, Hilo, Mines, and Roulette pages with empty frames.',
    href: '#/games/sportsbook',
    icon: 'shapes',
    innerMedia: `
      <div class="home-showroom-card__empty-slot">
        <span data-lucide="plus" aria-hidden="true"></span>
        <strong>Empty preview frames</strong>
      </div>
    `,
  },
];

function homeTickerSegment(label) {
  return `
    <span class="home-ticker__item">${label}</span>
    <span class="home-ticker__separator" aria-hidden="true">|</span>
  `;
}

function homeTickerSegments() {
  return HOME_TICKER_ITEMS.map(homeTickerSegment).join('');
}

function homeTickerTrack() {
  const segments = homeTickerSegments();
  const repeatedSegments = segments.repeat(4);
  return `
    <div class="home-ticker__track">
      <div class="home-ticker__group">${repeatedSegments}</div>
      <div class="home-ticker__group" aria-hidden="true">${repeatedSegments}</div>
    </div>
  `;
}

export function renderHomePage(_page) {
  return `
    <div class="home-page home-page--enter">
      <div class="home-ticker" aria-label="Release information">
        ${homeTickerTrack()}
      </div>
      <section class="home-hero" aria-label="Sessions Design System">
        <div class="home-hero-wordmark">
          <p class="home-hero-kicker">Design System</p>
          <h1 class="home-hero-title">Sessions</h1>
        </div>
      </section>
      <div class="home-body">
        <section class="home-intro" aria-labelledby="home-intro-title">
          <div class="page-hero-text home-intro__copy">
            <div class="home-intro__text">
              <h1 id="home-intro-title">Build Once. Reuse Everywhere.</h1>
              <p class="lede">The docs layout stays. The product library is empty on purpose — add the next Sessions component here.</p>
            </div>
            <a class="joker-cta-preview secondary home-intro__cta" href="#/getting-started/introduction">Get started</a>
          </div>
        </section>
        <hr class="introduction-divider home-body-divider" aria-hidden="true" />
        <section class="home-included" aria-labelledby="home-included-title">
          <h2 id="home-included-title" class="home-included__title">What's Included</h2>
          <div class="home-included__grid home-showroom-cards__grid">
            ${HOME_SHOWROOM_CARDS.map(card => homeShowroomCardMarkup(card)).join('')}
          </div>
        </section>
      </div>
    </div>
  `;
}

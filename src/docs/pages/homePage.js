import {
  COMPONENTS_HOME_BET_INPUT,
  FOUNDATIONS_HOME_COLOR_SWATCH,
  GAMES_HOME_COIN,
  homeShowroomCardMarkup,
} from '../markup/homeShowroomCardMarkup.js?v=home-card-links-v1';

const HOME_TICKER_ITEMS = [
  'Build Stable',
  'v1.0',
  'Updated Jul 2026',
  'React',
  'TypeScript',
  'Responsive',
  'Production Ready',
];

const HOME_SHOWROOM_CARDS = [
  {
    railLabel: 'Foundations',
    body: 'Design tokens for colour, type, spacing, motion and iconography.',
    href: '#/foundations/colours',
    innerMedia: FOUNDATIONS_HOME_COLOR_SWATCH,
  },
  {
    railLabel: 'Components',
    body: 'Shared UI components, betting patterns and game assets.',
    href: '#/components/buttons',
    innerMedia: COMPONENTS_HOME_BET_INPUT,
  },
  {
    railLabel: 'Games',
    body: 'Game patterns, live previews and the shared Game Container.',
    href: '#/games/sportsbook',
    innerMedia: GAMES_HOME_COIN,
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
      <section
        class="home-hero"
        aria-label="Joker Design System hero"
        data-home-hero-grid
        data-home-hero-grid-video="./assets/JokerGoldLogoV5-loop.mov?v=home-logo-v5-loop"
      >
        <div class="home-hero-video-wrap" data-home-hero-video-wrap>
          <video
            class="home-hero-video"
            data-home-hero-grid-video
            src="./assets/JokerGoldLogoV5-loop.mov?v=home-logo-v5-loop"
            autoplay
            muted
            playsinline
            preload="auto"
            aria-hidden="true"
          ></video>
        </div>
        <canvas class="home-hero-grid-canvas" data-home-hero-grid-canvas aria-hidden="true"></canvas>
      </section>
      <div class="home-body">
        <section class="home-intro" aria-labelledby="home-intro-title">
          <div class="page-hero-text home-intro__copy">
            <div class="home-intro__text">
              <h1 id="home-intro-title">Build Once. Reuse Everywhere.</h1>
              <p class="lede">A design system built to create consistent products through reusable foundations, components, and game patterns.</p>
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

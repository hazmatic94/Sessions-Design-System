import {
  componentSummaries,
  foundationNotes,
  navGroups,
  resources,
} from '../../system-data.js?v=sessions-nav-trim-v1';
import {flattenNavGroups} from './navModel.js?v=nav-fix-2210';

const routePageTitles = {
  '/components/buttons': 'Buttons',
  '/components/inputs': 'Inputs',
  '/components/navigation': 'Navigation',
  '/components/game-rails': 'Game Rails',
  '/components/cards': 'Cards',
  '/components/betting-panel': 'Betting Panel',
  '/components/modals': 'Modals',
  '/components/tables': 'Tables',
  '/components/badges': 'Badges',
  '/components/chips': 'Chips',
};

const componentRoutes = new Set([
  '/components/buttons',
  '/components/inputs',
  '/components/navigation',
  '/components/game-rails',
  '/components/cards',
  '/components/betting-panel',
  '/components/modals',
  '/components/tables',
  '/components/badges',
  '/components/chips',
]);

function resolvePageTitle(section, label, route) {
  return routePageTitles[route] || label;
}

function buildPages() {
  const pages = {
    '/home': {
      section: 'Getting Started',
      title: 'Home',
      subtitle:
        'A design system for building consistent Sessions products from shared foundations and components.',
      kind: 'home',
    },
    '/installation': {
      section: 'Getting Started',
      title: 'Installation',
      subtitle:
        'Run the docs site locally, then drop new components into the existing preview frames.',
      kind: 'installation',
    },
    '/getting-started/introduction': {
      section: 'Getting Started',
      title: 'Introduction',
      subtitle:
        'The Sessions Design System keeps the docs pages and preview frames. The old product demos are gone so new components can go in.',
      kind: 'resource',
    },
  };

  flattenNavGroups(navGroups).forEach(({section, label, route}) => {
    if (pages[route]) return;
    const title = resolvePageTitle(section, label, route);
    pages[route] = createPage(section, title, route);
  });

  return pages;
}

function createPage(section, title, route) {
  if (section === 'Foundations') {
    return {
      section,
      title,
      kind: 'foundation',
      subtitle: foundationNotes[title],
    };
  }

  if (section === 'Components' || componentRoutes.has(route)) {
    return {
      section: 'Components',
      title,
      kind: 'component',
      subtitle: componentSummaries[title],
    };
  }

  return {
    section,
    title,
    kind: 'resource',
    subtitle: resources[title],
  };
}

export const pageRegistry = buildPages();
export const pageOrder = [
  '/home',
  '/getting-started/introduction',
  '/installation',
  ...flattenNavGroups(navGroups)
    .map(entry => entry.route)
    .filter(
      route =>
        route !== '/home' &&
        route !== '/getting-started/introduction' &&
        route !== '/installation',
    ),
];

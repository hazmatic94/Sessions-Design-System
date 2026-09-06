import {
  componentSummaries,
  foundationNotes,
  gameSummaries,
  navGroups,
  resources,
  templateSummaries,
} from '../../system-data.js?v=buttons-lede-v1';
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
  '/components/betting-panel',
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
        'A design system built to create consistent products through reusable foundations, components, and game patterns.',
      kind: 'home',
    },
    '/installation': {
      section: 'Getting Started',
      title: 'Installation',
      subtitle:
        'Install the package, import styles.css once, then pull React components and CSS tokens into a React 18+ project.',
      kind: 'installation',
    },
    '/getting-started/introduction': {
      section: 'Getting Started',
      title: 'Introduction',
      subtitle:
        'The Joker Design System provides the shared foundations, components, and patterns used to build consistent experiences across every Joker product.',
      kind: 'resource',
    },
    "/getting-started/introduction": {
      section: "Getting Started",
      title: "Introduction",
      subtitle: "Overview of the Joker Design System, how the showroom is organized, and where to start.",
      kind: "resource",
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

  if (section === 'Games') {
    return {
      section,
      title,
      kind: 'game',
      subtitle: gameSummaries[title],
    };
  }

  if (section === 'Templates') {
    return {
      section,
      title,
      kind: 'template',
      subtitle: templateSummaries[title],
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

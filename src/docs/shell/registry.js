import {
  componentSummaries,
  foundationNotes,
  navGroups,
  resources,
} from '../../system-data.js?v=sessions-clean-v1';
import {flattenNavGroups} from './navModel.js?v=nav-fix-2210';

const componentRoutes = new Set(['/components']);

function buildPages() {
  const pages = {
    '/home': {
      section: 'Getting Started',
      title: 'Home',
      subtitle:
        'A design system for building consistent Sessions products from shared foundations and new components.',
      kind: 'home',
    },
    '/installation': {
      section: 'Getting Started',
      title: 'Installation',
      subtitle:
        'Run the docs site locally, then add new components into this library.',
      kind: 'installation',
    },
    '/getting-started/introduction': {
      section: 'Getting Started',
      title: 'Introduction',
      subtitle:
        'The Sessions Design System is the shared visual language for Sessions products.',
      kind: 'resource',
    },
    '/components': {
      section: 'Components',
      title: 'Overview',
      subtitle: componentSummaries.Overview,
      kind: 'component',
    },
  };

  flattenNavGroups(navGroups).forEach(({section, label, route}) => {
    if (pages[route]) return;
    pages[route] = createPage(section, label, route);
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

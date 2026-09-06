import {renderNav} from './nav.js?v=remove-nav-search-v1';
import {renderPage} from './pageRenderer.js?v=odds-group-gap-8-v1';
import {pageRegistry} from './registry.js?v=buttons-lede-v1';
import {state} from './state.js?v=docs-routing-v1';

const SPORTSBOOK_LEGACY_ROUTES = new Set([
  '/components/tabs',
  '/components/competition-header',
  '/components/date-row',
  '/components/team-info',
  '/components/view-markets',
  '/components/time',
]);

export function normalizeRoute(hash) {
  const clean = hash.replace(/^#/, '').split('/').slice(0, 3).join('/');
  if (SPORTSBOOK_LEGACY_ROUTES.has(clean)) return '/games/sportsbook';
  if (
    clean === '/foundations/color-variables' ||
    clean === '/foundations/colors'
  )
    return '/foundations/colours';
  if (!clean || clean === '/' || clean === '/overview') return '/home';
  return pageRegistry[clean] ? clean : '/installation';
}

export function resolveCurrentRoute() {
  const hashRoute = location.hash.replace(/^#/, '');
  if (hashRoute && hashRoute !== '/') {
    return normalizeRoute(location.hash);
  }

  if (pageRegistry[location.pathname]) {
    return location.pathname;
  }

  if (SPORTSBOOK_LEGACY_ROUTES.has(location.pathname)) {
    return '/games/sportsbook';
  }

  return normalizeRoute(location.hash);
}

export function navigateToRoute(route, {updateHash = true} = {}) {
  const nextRoute = normalizeRoute(route);
  const nextHash = `#${nextRoute}`;
  const shouldRender = state.route !== nextRoute;

  state.route = nextRoute;

  if (updateHash && location.hash !== nextHash) {
    location.hash = nextHash;
  }

  if (shouldRender) {
    renderNav();
    renderPage();
  }

  document.body.classList.remove('sidebar-open');
}

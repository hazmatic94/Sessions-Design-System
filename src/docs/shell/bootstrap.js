import {hydrateLucideIcons} from '../../utils/lucideIcon.js?v=nav-outline-v1';
import {setupBrandLogoVideos} from '../demo/brandLogoVideo.js?v=sessions-icon-v1';
import {setupCustomScrollbars} from '../demo/customScrollbar.js?v=scrollbar-3px-v1';
import {setupInteractions} from '../interactions/setupInteractions.js?v=sessions-product-icons-v1';
import {renderNav} from './nav.js?v=remove-nav-search-v1';
import {renderPage} from './pageRenderer.js?v=sessions-rail-v3';
import {pageRegistry} from './registry.js?v=sessions-nav-trim-v1';
import {resolveCurrentRoute} from './routes.js?v=sessions-clean-v1';
import {state} from './state.js?v=docs-routing-v1';
import {setupThemeToggle} from './themeToggle.js?v=theme-toggle-soon-v1';

export async function bootstrapDocsApp() {
  setupThemeToggle();
  setupBrandLogoVideos();
  state.route = resolveCurrentRoute();
  if (pageRegistry[state.route] && location.pathname + location.hash !== `/#${state.route}`) {
    history.replaceState(null, '', `/#${state.route}`);
  }
  hydrateLucideIcons(document);
  renderNav();
  renderPage();
  setupInteractions();
  setupCustomScrollbars();
}

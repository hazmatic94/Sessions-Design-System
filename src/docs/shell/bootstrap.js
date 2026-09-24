import {hydrateLucideIcons} from '../../utils/lucideIcon.js?v=nav-outline-v1';
import {setupBrandLogoVideos} from '../demo/brandLogoVideo.js?v=sessions-icon-v1';
import {setupCustomScrollbars} from '../demo/customScrollbar.js?v=scrollbar-3px-v1';
import {setupInteractions} from '../interactions/setupInteractions.js?v=sessions-navigator-v2';
import {setupSessionsCalendars} from '../../components/calendar/interactions.js';
import {setupSessionsMenuItems} from '../../components/menu/interactions.js';
import {setupSessionsTabs} from '../../components/tabs/interactions.js';
import {setupSessionsStaffHeaders} from '../../components/patterns/staffHeader.js?v=sessions-staff-header-v3';
import {setupSessionsCurrentTimeIndicators} from '../../components/patterns/currentTimeIndicator.js';
import {renderNav} from './nav.js?v=sessions-hour-block-v1';
import {renderPage} from './pageRenderer.js?v=sessions-hour-calendar-v5';
import {pageRegistry} from './registry.js?v=sessions-hour-block-v1';
import {resolveCurrentRoute} from './routes.js?v=sessions-hour-block-v1';
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
  setupSessionsCalendars();
  setupSessionsMenuItems();
  setupSessionsTabs();
  setupSessionsStaffHeaders();
  setupSessionsCurrentTimeIndicators();
  setupCustomScrollbars();
}

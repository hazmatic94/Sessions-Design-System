import {lucideIcon} from '../../pages/runtimeDocs.js?v=sessions-clean-v1';
import {pageOrder, pageRegistry} from '../shell/registry.js?v=sessions-nav-trim-v1';

export function bindMobileNavigation() {}

export function bindMobileScrollCues() {}

export function pageSequenceNavigation(route) {
  if (route === '/home') return '';

  const currentIndex = pageOrder.indexOf(route);
  const previousRoute = currentIndex > 0 ? pageOrder[currentIndex - 1] : null;
  const nextRoute =
    currentIndex >= 0 && currentIndex < pageOrder.length - 1
      ? pageOrder[currentIndex + 1]
      : null;
  const navigationLink = (targetRoute, direction) => {
    if (!targetRoute)
      return `<span class="page-sequence-spacer" aria-hidden="true"></span>`;
    const targetPage = pageRegistry[targetRoute];
    return `
      <a class="page-sequence-link joker-cta-preview ghost ${direction}" href="#${targetRoute}" aria-label="${direction === 'previous' ? 'Previous' : 'Next'}: ${targetPage.title}">
        <span class="page-sequence-arrow" aria-hidden="true">${lucideIcon(direction === 'previous' ? 'chevron-left' : 'chevron-right')}</span>
        <span>${targetPage.title}</span>
      </a>
    `;
  };

  return `
    <nav class="page-sequence-nav" aria-label="Previous and next documentation pages">
      ${navigationLink(previousRoute, 'previous')}
      ${navigationLink(nextRoute, 'next')}
    </nav>
  `;
}

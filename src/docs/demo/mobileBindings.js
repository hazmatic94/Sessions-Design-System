import {lucideIcon} from '../../pages/runtimeDocs.js?v=showroom-card-move-v1';
import {pageOrder, pageRegistry} from '../shell/registry.js?v=installation-exports-v1';

export function bindMobileNavigation(root = document) {
  root.querySelectorAll('[data-mobile-nav-toggle]').forEach(toggle => {
    if (toggle.dataset.mobileNavBound === 'true') return;
    toggle.dataset.mobileNavBound = 'true';
    toggle.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      const mobileNav = toggle.closest('[data-mobile-nav]');
      if (!mobileNav) return;
      const isOpen = !mobileNav.classList.contains('is-open');
      mobileNav.classList.toggle('is-open', isOpen);
      mobileNav.querySelectorAll('[data-mobile-nav-toggle]').forEach(button => {
        button.setAttribute('aria-expanded', String(isOpen));
      });
      mobileNav
        .querySelector('.joker-mobile-nav-panel')
        ?.setAttribute('aria-hidden', String(!isOpen));
      const backdrop = mobileNav.querySelector('[data-mobile-nav-backdrop]');
      backdrop?.classList.toggle('is-visible', isOpen);
      backdrop?.setAttribute('aria-hidden', String(!isOpen));
    });
  });

  root.querySelectorAll('[data-mobile-nav-backdrop]').forEach(backdrop => {
    if (backdrop.dataset.mobileNavBackdropBound === 'true') return;
    backdrop.dataset.mobileNavBackdropBound = 'true';
    backdrop.addEventListener('click', event => {
      event.preventDefault();
      const mobileNav = backdrop.closest('[data-mobile-nav]');
      if (!mobileNav) return;
      mobileNav.classList.remove('is-open');
      mobileNav.querySelectorAll('[data-mobile-nav-toggle]').forEach(button => {
        button.setAttribute('aria-expanded', 'false');
      });
      mobileNav
        .querySelector('.joker-mobile-nav-panel')
        ?.setAttribute('aria-hidden', 'true');
      backdrop.classList.remove('is-visible');
      backdrop.setAttribute('aria-hidden', 'true');
    });
  });
}

export function bindMobileScrollCues(root = document) {
  root.querySelectorAll('.joker-mobile-game-shell').forEach(shell => {
    const scroller = shell.querySelector('.joker-mobile-game-content');
    const cue = shell.querySelector('.joker-mobile-scroll-cue');
    if (!scroller || !cue) return;

    const updateCue = () => {
      const canScroll = scroller.scrollHeight > scroller.clientHeight + 1;
      const atBottom =
        scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
      const shouldHide = !canScroll || atBottom;

      cue.classList.toggle('is-hidden', shouldHide);
      cue.setAttribute('aria-hidden', String(shouldHide));
    };

    scroller.addEventListener('scroll', updateCue, {passive: true});
    requestAnimationFrame(updateCue);
  });
}

export function setRailNavigationSelection(target) {
  const rail = target.closest('.joker-product-rail, .joker-mobile-nav');
  if (!rail) return;

  rail.querySelectorAll('[data-product-rail-item]').forEach(item => {
    const isSelected = item === target;
    item.classList.toggle('is-selected', isSelected);
    if (isSelected) {
      item.setAttribute('aria-current', 'page');
    } else {
      item.removeAttribute('aria-current');
    }
  });

  rail.querySelectorAll('[data-game-menu-option]').forEach(option => {
    const isSelected = option === target;
    option.classList.toggle('is-selected', isSelected);
    option.setAttribute('aria-checked', String(isSelected));
  });
}

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

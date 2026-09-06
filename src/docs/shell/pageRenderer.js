import {
  hydrateLucideIcons,
  templates,
} from '../../pages/runtimeDocs.js?v=home-logo-v5-loop';
import {slug} from '../../utils.js';
import {updateBetPanelSubmit} from '../demo/bettingPanel.js?v=betting-cta-pending-v2';
import {updateCustomScrollbars} from '../demo/customScrollbar.js?v=scrollbar-3px-v1';
import {contentRoot} from './dom.js?v=docs-routing-v1';
import {initGameContainerViewports} from '../demo/gameContainerViewport.js?v=game-container-text-zoom-v1';
import {syncStaticGameShellRails} from '../demo/gameShellRails.js?v=game-shell-chrome-950-v3';
import {hydratePageDemos} from '../hydrators/index.js?v=win-modal-coin-loop-v1';
import {
  bindMobileNavigation,
  bindMobileScrollCues,
  pageSequenceNavigation,
} from '../demo/mobileBindings.js';
import {pageFooter} from './pageLayout.js?v=docs-page-footer-v1';
import {pageRegistry} from './registry.js?v=buttons-lede-v1';
import {state} from './state.js?v=docs-routing-v1';

let isInitialPageRender = true;
let isFirstPagePaint = true;
let pageTransitionToken = 0;
let shouldRevealPageContent = false;

function getPageTransitionMs() {
  const value = getComputedStyle(contentRoot)
    .getPropertyValue('--page-transition-duration')
    .trim();
  return Number.parseInt(value, 10) || 280;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function resetPageTransitionState() {
  contentRoot.classList.remove(
    'is-page-leaving',
    'is-page-entering',
    'is-page-animating',
    'is-page-reveal',
  );
}

function resetWorkspaceScroll() {
  // globals.css sets scroll-behavior: smooth — that makes page swaps look
  // like content is sliding down. Force an instant jump to the top.
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  html.scrollTop = 0;
  document.body.scrollTop = 0;
  html.style.scrollBehavior = previous;
}

function schedulePageContentReveal() {
  if (!shouldRevealPageContent || prefersReducedMotion()) return;
  shouldRevealPageContent = false;
  if (contentRoot.dataset.page === 'home') return;

  resetWorkspaceScroll();
  contentRoot.classList.remove('is-page-reveal');
  void contentRoot.offsetWidth;
  contentRoot.classList.add('is-page-reveal');
  requestAnimationFrame(() => {
    resetWorkspaceScroll();
    requestAnimationFrame(resetWorkspaceScroll);
  });
  window.setTimeout(() => {
    contentRoot.classList.remove('is-page-reveal');
  }, 520);
}

function wrapPageEnterBody() {
  if (contentRoot.dataset.page === 'home') return;
  if (contentRoot.querySelector('.page-enter-body')) return;

  const hero = contentRoot.querySelector('.page-hero');
  if (!hero) return;

  const introPage = contentRoot.querySelector('.introduction-page');
  if (introPage && !hero.querySelector('.page-hero-divider, .introduction-divider')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'page-enter-body';
    let node = introPage.firstElementChild;
    if (node?.classList.contains('introduction-divider')) {
      node = node.nextElementSibling;
    }
    while (node) {
      const next = node.nextElementSibling;
      wrapper.appendChild(node);
      node = next;
    }
    if (wrapper.childElementCount) {
      introPage.appendChild(wrapper);
    }
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'page-enter-body';
  while (hero.nextElementSibling) {
    wrapper.appendChild(hero.nextElementSibling);
  }
  if (wrapper.childElementCount) {
    contentRoot.appendChild(wrapper);
  }
}

function applyPageEnterSteps() {
  if (contentRoot.dataset.page === 'home') return;

  contentRoot
    .querySelectorAll('[data-enter-step]')
    .forEach(el => el.removeAttribute('data-enter-step'));

  contentRoot
    .querySelector('.page-hero-text')
    ?.setAttribute('data-enter-step', '1');

  const heroLine = contentRoot.querySelector(
    '.page-hero-divider, .page-hero > .introduction-divider',
  );
  if (heroLine) {
    heroLine.setAttribute('data-enter-step', '2');
  } else {
    contentRoot
      .querySelector('.introduction-page > .introduction-divider')
      ?.setAttribute('data-enter-step', '2');
  }

  contentRoot
    .querySelector('.page-enter-body')
    ?.setAttribute('data-enter-step', '3');
}

function runPageTransition(swapContent) {
  if (prefersReducedMotion()) {
    void Promise.resolve(swapContent());
    return;
  }

  const token = pageTransitionToken;
  const durationMs = getPageTransitionMs();
  let completed = false;

  const clearEnterState = () => {
    if (token !== pageTransitionToken) return;
    contentRoot.classList.remove('is-page-entering', 'is-page-animating');
    contentRoot.removeEventListener('transitionend', onTransitionEnd);
    schedulePageContentReveal();
  };

  const finishLeave = () => {
    if (completed || token !== pageTransitionToken) return;
    completed = true;

    Promise.resolve(swapContent())
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        if (token !== pageTransitionToken) return;

        contentRoot.classList.remove('is-page-leaving');
        contentRoot.classList.add('is-page-entering', 'is-page-animating');

        requestAnimationFrame(() => {
          requestAnimationFrame(clearEnterState);
        });
        window.setTimeout(clearEnterState, durationMs + 50);
      });
  };

  const onTransitionEnd = event => {
    if (event.target !== contentRoot || event.propertyName !== 'opacity')
      return;
    if (contentRoot.classList.contains('is-page-leaving')) {
      finishLeave();
      return;
    }
    if (
      !contentRoot.classList.contains('is-page-entering') &&
      contentRoot.classList.contains('is-page-animating')
    ) {
      if (token !== pageTransitionToken) return;
      contentRoot.classList.remove('is-page-animating');
      contentRoot.removeEventListener('transitionend', onTransitionEnd);
    }
  };

  contentRoot.classList.add('is-page-animating');
  contentRoot.classList.remove('is-page-entering');
  contentRoot.classList.add('is-page-leaving');
  contentRoot.addEventListener('transitionend', onTransitionEnd);
  window.setTimeout(finishLeave, durationMs + 50);
  window.setTimeout(
    () => {
      if (token !== pageTransitionToken) return;
      contentRoot.classList.remove('is-page-animating');
      contentRoot.removeEventListener('transitionend', onTransitionEnd);
    },
    durationMs * 2 + 100,
  );
}

function pageDatasetKey(page) {
  if (page.title === 'Colours') return 'colors';
  return slug(page.title);
}

function firstSentence(text = '') {
  const trimmed = String(text).trim().replace(/\s+/g, ' ');
  if (!trimmed) return '';
  const match = trimmed.match(/^(.+?[.!?])(?:\s|$)/);
  return match ? match[1] : trimmed;
}

function ensureMetaTag(selector, attributes) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
    document.head.appendChild(el);
  }
  return el;
}

function setNamedMeta(name, content) {
  const el = ensureMetaTag(`meta[name="${name}"]`, {name});
  el.setAttribute('content', content);
}

function setPropertyMeta(property, content) {
  const el = ensureMetaTag(`meta[property="${property}"]`, {property});
  el.setAttribute('content', content);
}

function absoluteAssetUrl(path) {
  return new URL(path, window.location.origin).href;
}

function updateDocumentMeta(page) {
  const title = page.title || 'Joker Design System';
  const description =
    firstSentence(page.subtitle) ||
    'Joker Design System — shared foundations, components, and game patterns.';
  const url = new URL(`/#${state.route}`, window.location.origin).href;
  const image = absoluteAssetUrl('/assets/og-image.jpg');

  document.title = title;

  setNamedMeta('description', description);
  setNamedMeta('theme-color', '#131313');
  setNamedMeta('twitter:card', 'summary_large_image');
  setNamedMeta('twitter:title', title);
  setNamedMeta('twitter:description', description);
  setNamedMeta('twitter:image', image);

  setPropertyMeta('og:type', 'website');
  setPropertyMeta('og:site_name', 'Joker Design System');
  setPropertyMeta('og:title', title);
  setPropertyMeta('og:description', description);
  setPropertyMeta('og:url', url);
  setPropertyMeta('og:image', image);
  setPropertyMeta('og:image:width', '1200');
  setPropertyMeta('og:image:height', '630');
  setPropertyMeta('og:image:alt', 'Joker Design System');
}

async function paintPage(page) {
  contentRoot.classList.remove('is-page-leaving');

  try {
    updateDocumentMeta(page);
    contentRoot.dataset.page = pageDatasetKey(page);
    // Sidebar slide-in is a first-land beat only. Coming back to home, the
    // nav is already on screen — replaying it feels wrong.
    const playHomeSidebarEnter = page.kind === 'home' && isFirstPagePaint;
    isFirstPagePaint = false;
    document.documentElement.classList.toggle(
      'is-home-enter',
      playHomeSidebarEnter,
    );
    contentRoot.innerHTML = `${templates[page.kind](page)}${pageSequenceNavigation(state.route)}${pageFooter()}`;
    hydrateLucideIcons(contentRoot);
    bindMobileNavigation(contentRoot);
    bindMobileScrollCues(contentRoot);
    syncStaticGameShellRails(contentRoot);
    await hydratePageDemos(contentRoot);
    contentRoot
      .querySelectorAll('.joker-betting-panel')
      .forEach(updateBetPanelSubmit);
    updateCustomScrollbars();
    initGameContainerViewports(contentRoot);
    requestAnimationFrame(() => initGameContainerViewports(contentRoot));
    resetWorkspaceScroll();
    contentRoot.focus({preventScroll: true});
    wrapPageEnterBody();
    applyPageEnterSteps();
  } catch (error) {
    console.error(error);
    resetPageTransitionState();
    contentRoot.innerHTML = `<pre style="padding:24px;color:#f88;white-space:pre-wrap;">Failed to render ${page.title}:\n${error?.stack || error}</pre>`;
  }
}

export function renderPage() {
  const page = pageRegistry[state.route] || pageRegistry['/home'];

  if (isInitialPageRender) {
    isInitialPageRender = false;
    void paintPage(page);
    return;
  }

  pageTransitionToken += 1;
  shouldRevealPageContent = true;
  runPageTransition(() => paintPage(page));
}

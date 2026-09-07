import {lucideIcon} from '../../pages/runtimeDocs.js?v=sessions-clean-v1';
import {updateCustomScrollbars} from '../demo/customScrollbar.js?v=scrollbar-3px-v1';
import {
  scrollCue,
  scrollCueButton,
  sidebarClose,
  sidebarToggle,
} from '../shell/dom.js?v=mobile-sidebar-close-v2';
import {navigateToRoute} from '../shell/routes.js?v=sessions-clean-v1';
import {copyText} from './copyText.js';

function getCodeDrawerMetrics(panel) {
  const wrapper = panel.closest('.button-example');
  if (!wrapper) return null;
  const styles = getComputedStyle(wrapper);
  const collapsedHeight =
    parseFloat(styles.getPropertyValue('--example-code-collapsed-height')) || 100;
  const drawerTop =
    parseFloat(styles.getPropertyValue('--example-code-drawer-top')) || 24;
  const maxHeight = wrapper.offsetHeight - drawerTop;
  return {collapsedHeight, maxHeight};
}

function applyCodeTogglePresentation(toggle, expanded) {
  toggle.classList.toggle('code-view-button', !expanded);
  toggle.classList.toggle('code-close-button', expanded);
  const label = toggle.querySelector('span');
  const labelText = expanded ? 'Close' : 'View Code';
  if (label) {
    label.textContent = labelText;
  } else {
    toggle.textContent = labelText;
  }
}

function measureCodeDrawerHeight(panel, toggle) {
  const metrics = getCodeDrawerMetrics(panel);
  if (!metrics) return null;

  panel.dataset.codeExpanded = 'true';
  if (toggle) applyCodeTogglePresentation(toggle, true);
  panel.classList.add('is-measuring-code-drawer');

  const height = Math.min(panel.scrollHeight, metrics.maxHeight);

  panel.classList.remove('is-measuring-code-drawer');
  panel.dataset.codeExpanded = 'false';
  if (toggle) applyCodeTogglePresentation(toggle, false);

  return height;
}

function setCodeDrawerHeight(panel, heightPx) {
  panel.style.setProperty('--code-drawer-height', `${heightPx}px`);
}

export function setupInteractions() {
  const updateScrollCue = () => {
    const firstViewportComplete = window.scrollY >= window.innerHeight - 1;
    const pageFitsViewport =
      document.documentElement.scrollHeight <= window.innerHeight + 1;
    const pageEndReached =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 1;
    const shouldHideScrollCue =
      firstViewportComplete || pageFitsViewport || pageEndReached;
    scrollCue?.classList.toggle('is-hidden', shouldHideScrollCue);
    scrollCue?.setAttribute('aria-hidden', String(shouldHideScrollCue));
  };

  scrollCueButton?.addEventListener('click', () => {
    window.scrollBy({top: window.innerHeight, behavior: 'smooth'});
  });
  window.addEventListener('scroll', updateScrollCue, {passive: true});
  window.addEventListener('resize', updateScrollCue, {passive: true});
  requestAnimationFrame(updateScrollCue);

  window.addEventListener('hashchange', () => {
    navigateToRoute(location.hash, {updateHash: false});
    requestAnimationFrame(updateScrollCue);
  });

  sidebarToggle?.addEventListener('click', event => {
    event.stopPropagation();
    document.body.classList.toggle('sidebar-open');
    sidebarToggle.setAttribute(
      'aria-expanded',
      document.body.classList.contains('sidebar-open') ? 'true' : 'false',
    );
    requestAnimationFrame(() => updateCustomScrollbars());
  });

  sidebarClose?.addEventListener('click', event => {
    event.stopPropagation();
    document.body.classList.remove('sidebar-open');
    sidebarToggle?.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('click', event => {
    if (!document.body.classList.contains('sidebar-open')) return;
    if (
      event.target.closest('.sidebar') ||
      event.target.closest('#sidebar-toggle')
    )
      return;
    document.body.classList.remove('sidebar-open');
    sidebarToggle?.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('click', async event => {
    const docsRouteLink = event.target.closest(
      '.nav-link, .brand-logo, .page-sequence-link, .doc-card, .joker-showroom-card-home-stretched-link, .home-intro__cta',
    );
    const docsRouteHref = docsRouteLink?.getAttribute('href');
    if (docsRouteHref?.startsWith('#/')) {
      event.preventDefault();
      navigateToRoute(docsRouteHref);
      requestAnimationFrame(updateScrollCue);
      return;
    }

    const codeToggle = event.target.closest('[data-code-toggle]');
    if (codeToggle) {
      const panel = codeToggle.closest('[data-code-collapsible]');
      if (!panel) return;
      const expanded = panel.dataset.codeExpanded === 'true';
      const nextExpanded = !expanded;
      const metrics = getCodeDrawerMetrics(panel);
      if (metrics) {
        if (nextExpanded) {
          const measuredHeight = measureCodeDrawerHeight(panel, codeToggle);
          const resolvedHeight = measuredHeight ?? metrics.maxHeight;
          setCodeDrawerHeight(panel, metrics.collapsedHeight);
          panel.toggleAttribute(
            'data-code-drawer-at-max',
            resolvedHeight >= metrics.maxHeight - 1,
          );
          requestAnimationFrame(() => {
            setCodeDrawerHeight(panel, resolvedHeight);
          });
        } else {
          setCodeDrawerHeight(panel, metrics.collapsedHeight);
          panel.removeAttribute('data-code-drawer-at-max');
        }
      }
      panel.dataset.codeExpanded = String(nextExpanded);
      codeToggle.setAttribute('aria-expanded', String(nextExpanded));
      applyCodeTogglePresentation(codeToggle, nextExpanded);
      return;
    }

    const copyButton = event.target.closest('[data-copy]');
    if (!copyButton) return;

    const copySrc = copyButton.dataset.copySrc;
    const value = copyButton.dataset.copyValue;
    const target = copyButton.dataset.copy
      ? document.querySelector(copyButton.dataset.copy)
      : null;
    if (!value && !target && !copySrc) return;

    let copyValue = value || target?.textContent.trim();
    if (!copyValue && copySrc) {
      const response = await fetch(copySrc);
      if (!response.ok) return;
      copyValue = await response.text();
    }

    await copyText(copyValue);
    if (
      copyButton.classList.contains('copy-icon-button') ||
      copyButton.classList.contains('code-action-button')
    ) {
      const icon = copyButton.querySelector('.copy-icon');
      copyButton.classList.add('is-copied');
      copyButton.dataset.copyFeedback = 'Copied to clipboard';
      if (icon) icon.innerHTML = lucideIcon('check');
      copyButton.setAttribute('aria-label', 'Copied to clipboard');
      setTimeout(() => {
        copyButton.classList.remove('is-copied');
        delete copyButton.dataset.copyFeedback;
        if (icon) icon.innerHTML = lucideIcon('copy');
        copyButton.setAttribute(
          'aria-label',
          copyButton.dataset.copyLabel || 'Copy color value',
        );
      }, 1400);
      return;
    }

    if (
      copyButton.classList.contains('docs-token-chip--copy') ||
      copyButton.classList.contains('color-swatch-card__hex-chip')
    ) {
      const previous = copyButton.textContent;
      copyButton.classList.add('is-copied');
      copyButton.textContent = 'Copied';
      copyButton.setAttribute('aria-label', 'Copied');
      setTimeout(() => {
        copyButton.classList.remove('is-copied');
        copyButton.textContent = previous;
        copyButton.setAttribute(
          'aria-label',
          copyButton.dataset.copyLabel || 'Copy value',
        );
      }, 1400);
      return;
    }

    if (copyButton.classList.contains('variable-copy-button')) {
      copyButton.classList.add('is-copied');
      copyButton.dataset.copyFeedback = 'Copied to clipboard';
      copyButton.setAttribute('aria-label', 'Copied to clipboard');
      setTimeout(() => {
        copyButton.classList.remove('is-copied');
        delete copyButton.dataset.copyFeedback;
        copyButton.setAttribute(
          'aria-label',
          copyButton.dataset.copyLabel || 'Copy value',
        );
      }, 1400);
      return;
    }

    const previous = copyButton.innerHTML;
    copyButton.textContent = 'Copied to clipboard';
    setTimeout(() => {
      copyButton.innerHTML = previous;
    }, 1400);
  });
}

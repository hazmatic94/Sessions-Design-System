import {lucideIcon} from '../../pages/runtimeDocs.js?v=showroom-card-move-v1';
import {
  formatBetAmountDisplay,
  sanitizeBetAmount,
} from '../../utils/betAmountFormat.js?v=betting-panel-states';
import {
  flashOddsButtonGlow,
  formatMultiplierValue,
  parseMultiplierValue,
  updateBetPanelSubmit,
} from '../demo/bettingPanel.js?v=betting-cta-pending-v2';
import {burstShowroomCardHearts} from '../../utils/showroomCardHeartBurst.js?v=showroom-heart-burst-v2';
import {updateCustomScrollbars} from '../demo/customScrollbar.js?v=scrollbar-3px-v1';
import {
  scrollCue,
  scrollCueButton,
  sidebarClose,
  sidebarToggle,
} from '../shell/dom.js?v=mobile-sidebar-close-v2';
import {
  getDefaultGameContainerZoom,
  initGameContainerViewports,
  updateGameContainerPan,
  updateGameContainerZoomValue,
} from '../demo/gameContainerViewport.js?v=game-container-text-zoom-v1';
import {syncStaticGameShellRails} from '../demo/gameShellRails.js?v=game-shell-chrome-950-v3';
import {revealDocsWinStyleTile} from '../demo/minesTileReveal.js?v=win-tile-sounds-v1';
import {setRailNavigationSelection} from '../demo/mobileBindings.js';
import {navigateToRoute} from '../shell/routes.js?v=game-container-page-v1';
import {playDocsSound} from '../demo/sounds.js';
import {copyText} from './copyText.js';

const ODDS_BUTTON_CLICK_SOUND =
  './assets/buttonClick.mp3?v=odds-button-click-v1';
const PLACE_BET_SOUND = './assets/mineClick.mp3?v=place-bet-v1';

function getCodeDrawerMetrics(panel) {
  const wrapper = panel.closest('.button-example');
  if (!wrapper) return null;
  const styles = getComputedStyle(wrapper);
  const collapsedHeight =
    parseFloat(styles.getPropertyValue('--example-code-collapsed-height')) || 100;
  const drawerTop =
    parseFloat(styles.getPropertyValue('--example-code-drawer-top')) || 24;
  const maxHeight = wrapper.offsetHeight - drawerTop;
  return { collapsedHeight, maxHeight };
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
  let activeGameZoomViewport = null;
  let activeGamePan = null;

  const closeCollapsedRailSearch = activeSearch => {
    document
      .querySelectorAll(
        '.joker-product-rail .joker-rail-search-item.is-search-open',
      )
      .forEach(search => {
        if (search === activeSearch) return;
        search.classList.remove('is-search-open');
      });
  };

  const setActiveGameZoomViewport = target => {
    activeGameZoomViewport =
      target?.closest?.('[data-game-zoom-viewport]') || activeGameZoomViewport;
  };

  const stepGameContainerZoom = (viewport, direction) => {
    const currentZoom = Number.parseFloat(
      viewport?.dataset.zoom || String(getDefaultGameContainerZoom(viewport)),
    );
    updateGameContainerZoomValue(viewport, currentZoom + direction * 0.08);
  };

  initGameContainerViewports();

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
  window.addEventListener('resize', () => syncStaticGameShellRails(), {
    passive: true,
  });
  requestAnimationFrame(updateScrollCue);
  syncStaticGameShellRails();

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

  document.addEventListener('pointerover', event => {
    setActiveGameZoomViewport(event.target);
  });

  document.addEventListener('focusin', event => {
    setActiveGameZoomViewport(event.target);
  });

  document.addEventListener('pointerout', event => {
    const viewport = event.target?.closest?.('[data-game-zoom-viewport]');
    if (!viewport || viewport.contains(event.relatedTarget)) return;
    if (
      activeGameZoomViewport === viewport &&
      document.activeElement !== viewport
    ) {
      activeGameZoomViewport = null;
    }
  });

  document.addEventListener(
    'wheel',
    event => {
      const viewport = event.target?.closest?.('[data-game-zoom-viewport]');
      if (!viewport || (!event.metaKey && !event.ctrlKey)) return;

      event.preventDefault();
      activeGameZoomViewport = viewport;
      stepGameContainerZoom(viewport, event.deltaY < 0 ? 1 : -1);
    },
    {passive: false},
  );

  document.addEventListener('pointerdown', event => {
    const viewport = event.target?.closest?.('[data-game-zoom-viewport]');
    const interactiveTarget = event.target?.closest?.(
      'a, button, input, textarea, select, [data-code-toggle], [data-copy]',
    );
    if (!viewport || interactiveTarget || event.button !== 0) return;

    activeGameZoomViewport = viewport;
    activeGamePan = {
      viewport,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      panX: Number.parseFloat(viewport.dataset.panX || '0'),
      panY: Number.parseFloat(viewport.dataset.panY || '0'),
    };

    viewport.classList.add('is-panning');
    viewport.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });

  document.addEventListener('pointermove', event => {
    if (!activeGamePan) return;

    const deltaX = event.clientX - activeGamePan.startX;
    const deltaY = event.clientY - activeGamePan.startY;
    updateGameContainerPan(
      activeGamePan.viewport,
      activeGamePan.panX + deltaX,
      activeGamePan.panY + deltaY,
    );
  });

  const stopGameContainerPan = event => {
    if (!activeGamePan) return;

    activeGamePan.viewport.releasePointerCapture?.(event.pointerId);
    activeGamePan.viewport.classList.remove('is-panning');
    activeGamePan = null;
  };

  document.addEventListener('pointerup', stopGameContainerPan);
  document.addEventListener('pointercancel', stopGameContainerPan);

  document.addEventListener('click', async event => {
    const docsRouteLink = event.target.closest(
      '.nav-link, .brand-logo, .page-sequence-link, .doc-card',
    );
    const docsRouteHref = docsRouteLink?.getAttribute('href');
    if (docsRouteHref?.startsWith('#/')) {
      event.preventDefault();
      navigateToRoute(docsRouteHref);
      requestAnimationFrame(updateScrollCue);
      return;
    }

    const railSearch = event.target.closest('.joker-rail-search-item');
    if (railSearch?.classList.contains('is-coming-soon')) return;

    const railSearchInProductRail = event.target.closest(
      '.joker-product-rail .joker-rail-search-item',
    );
    const railSearchInput = railSearchInProductRail?.querySelector('input');
    const rail = railSearchInProductRail?.closest('.joker-product-rail');
    const isCollapsedRailSearch = Boolean(
      railSearchInProductRail &&
      rail &&
      (rail.classList.contains('is-collapsed') ||
        window.matchMedia('(max-width: 1000px)').matches),
    );

    closeCollapsedRailSearch(railSearchInProductRail);

    if (isCollapsedRailSearch) {
      if (event.target !== railSearchInput) {
        event.preventDefault();
        railSearchInProductRail.classList.add('is-search-open');
        railSearchInput?.focus({preventScroll: true});
      }
      return;
    }

    const showroomPill = event.target.closest('[data-showroom-pill]');
    if (showroomPill) {
      const group = showroomPill.closest('[data-showroom-pill-group]');

      group?.querySelectorAll('[data-showroom-pill]').forEach(pill => {
        const isSelected = pill === showroomPill;
        pill.classList.toggle('is-selected', isSelected);
        pill.setAttribute('aria-checked', String(isSelected));
      });

      return;
    }

    const oddsSelectionPanel = event.target.closest('[data-odds-selection-panel]');
    if (oddsSelectionPanel && !oddsSelectionPanel.classList.contains('is-unavailable')) {
      const group = oddsSelectionPanel.closest('[data-odds-selection-demo]');

      group?.querySelectorAll('[data-odds-selection-panel]').forEach((panel) => {
        const isSelected = panel === oddsSelectionPanel;
        panel.classList.toggle('is-selected', isSelected);
        panel.setAttribute('aria-pressed', String(isSelected));
      });

      return;
    }

    const oddsPanelDemo = event.target.closest('[data-odds-panel-demo]');
    if (oddsPanelDemo && !oddsPanelDemo.classList.contains('is-unavailable')) {
      const selected = oddsPanelDemo.classList.toggle('is-selected');
      oddsPanelDemo.setAttribute('aria-pressed', String(selected));
      return;
    }

    const jokerTab = event.target.closest('[data-joker-tab]');
    if (jokerTab && !jokerTab.disabled) {
      const group = jokerTab.closest('[data-joker-tab-group]');

      group?.querySelectorAll('[data-joker-tab]').forEach((tab) => {
        const isSelected = tab === jokerTab;
        tab.classList.toggle('is-selected', isSelected);
        tab.setAttribute('aria-selected', String(isSelected));
      });

      return;
    }

    const showroomCardAction = event.target.closest(
      '[data-showroom-card-action]',
    );
    if (showroomCardAction) {
      const isActive = showroomCardAction.classList.toggle('is-active');
      showroomCardAction.setAttribute('aria-pressed', String(isActive));
      if (isActive) {
        burstShowroomCardHearts(showroomCardAction);
      }
      return;
    }

    const minesTileClick = event.target.closest('[data-mines-tile-click]');
    if (
      minesTileClick &&
      !minesTileClick.classList.contains('joker-mines-tile--unselected')
    ) {
      playDocsSound('./assets/mineClick.mp3');
      return;
    }

    const safeTileReveal = event.target.closest('[data-safe-tile-reveal]');
    if (
      safeTileReveal &&
      !safeTileReveal.classList.contains('joker-safe-tile--settled')
    ) {
      const smoke = safeTileReveal.querySelector('.joker-safe-tile-smoke');
      const bombIcon = safeTileReveal.querySelector(
        '.joker-safe-tile-bomb-icon',
      );
      const glow = safeTileReveal.querySelector('.joker-safe-tile-glow');
      const pulses = safeTileReveal.querySelector('.joker-safe-tile-pulses');
      const overlay = safeTileReveal.querySelector('.joker-safe-tile-overlay');
      const shieldIcon = safeTileReveal.querySelector('.joker-safe-tile-icon');

      playDocsSound('./assets/bomb.mp3');
      safeTileReveal.classList.add(
        'joker-safe-tile--revealed',
        'joker-safe-tile--revealing',
        'joker-safe-tile--bomb-revealing',
      );
      smoke?.removeAttribute('hidden');
      bombIcon?.removeAttribute('hidden');

      window.setTimeout(() => {
        playDocsSound('./assets/shield.mp3');
        safeTileReveal.classList.remove('joker-safe-tile--bomb-revealing');
        safeTileReveal.classList.add('joker-safe-tile--shield-revealing');
        smoke?.setAttribute('hidden', '');
        overlay?.classList.add('joker-safe-tile-overlay--visible');
        shieldIcon?.removeAttribute('hidden');
        glow?.removeAttribute('hidden');
        pulses?.removeAttribute('hidden');
      }, 500);

      window.setTimeout(() => {
        safeTileReveal.classList.remove(
          'joker-safe-tile--revealing',
          'joker-safe-tile--shield-revealing',
        );
        safeTileReveal.classList.add(
          'joker-safe-tile--settled',
          'joker-safe-tile--opened',
        );
        glow?.setAttribute('hidden', '');
        pulses?.setAttribute('hidden', '');
      }, 1380);
      safeTileReveal.setAttribute('aria-label', 'Safe tile revealed');
      safeTileReveal.removeAttribute('role');
      safeTileReveal.removeAttribute('tabindex');
      return;
    }

    const lossTileReveal = event.target.closest('[data-loss-tile-reveal]');
    if (
      lossTileReveal &&
      !lossTileReveal.classList.contains('joker-loss-tile--revealed')
    ) {
      playDocsSound('./assets/bomb.mp3');
      const smoke = lossTileReveal.querySelector('.joker-loss-tile-smoke');
      lossTileReveal.classList.add(
        'joker-loss-tile--revealed',
        'joker-loss-tile--revealing',
      );
      smoke?.removeAttribute('hidden');
      window.setTimeout(() => {
        lossTileReveal.classList.remove('joker-loss-tile--revealing');
        smoke?.setAttribute('hidden', '');
      }, 920);
      lossTileReveal.setAttribute('aria-label', 'Loss tile revealed');
      lossTileReveal.removeAttribute('role');
      lossTileReveal.removeAttribute('tabindex');
      return;
    }

    const winTileReveal = event.target.closest('[data-win-tile-reveal]');
    if (
      winTileReveal &&
      !winTileReveal.classList.contains('joker-win-tile--revealed')
    ) {
      revealDocsWinStyleTile(winTileReveal, 'joker-win-tile');
      return;
    }

    const betSubmit = event.target.closest('[data-bet-submit]');
    if (betSubmit) {
      if (
        betSubmit.disabled ||
        betSubmit.getAttribute('aria-disabled') === 'true'
      ) {
        event.preventDefault();
        return;
      }

      playDocsSound(PLACE_BET_SOUND);
      return;
    }

    const oddsButton = event.target.closest(
      '.joker-odds-button-group .joker-cta-preview.hi-lo',
    );
    if (oddsButton) {
      if (oddsButton.disabled) return;

      playDocsSound(ODDS_BUTTON_CLICK_SOUND);

      const group = oddsButton.closest('.joker-odds-button-group');
      const wasSelected = oddsButton.classList.contains('is-selected');

      group?.querySelectorAll('.joker-cta-preview.hi-lo').forEach(button => {
        const isSelected = button === oddsButton;
        button.classList.toggle('is-selected', isSelected);
        button.setAttribute('aria-pressed', String(isSelected));
        if (!isSelected) {
          button.classList.remove('is-select-glow');
        }
      });

      if (!wasSelected) {
        flashOddsButtonGlow(oddsButton);
      }

      updateBetPanelSubmit(oddsButton.closest('.joker-betting-panel'));
      return;
    }

    const oddsExampleButton = event.target.closest(
      '.button-example-stage .joker-cta-preview.hi-lo',
    );
    if (oddsExampleButton) {
      const isSelected = oddsExampleButton.classList.toggle('is-selected');
      oddsExampleButton.setAttribute('aria-pressed', String(isSelected));
      return;
    }

    const dropdownOption = event.target.closest('[data-dropdown-option]');
    if (dropdownOption) {
      const dropdown = dropdownOption.closest('[data-dropdown-field]');
      const value = dropdownOption.dataset.dropdownOption;
      const label = dropdownOption.textContent.trim();
      const dropdownValue = dropdown.querySelector('[data-dropdown-value]');
      if (dropdownValue) {
        const dynamiteText = dropdownOption
          .querySelector('.joker-dynamite-value span')
          ?.textContent?.trim();
        if (dropdown.querySelector('.joker-dynamite-icon') && dynamiteText) {
          dropdownValue.textContent = dynamiteText;
        } else {
          dropdownValue.innerHTML =
            dropdownOption.querySelector('.joker-dynamite-value')?.outerHTML ??
            label;
        }
      }
      const dropdownToggle = dropdown.querySelector('[data-dropdown-toggle]');
      dropdownToggle?.setAttribute('aria-expanded', 'false');
      dropdownToggle?.blur();
      dropdown.classList.remove('is-open');
      dropdown.dataset.value = value;
      if (dropdown.dataset.goldNuggetsTarget) {
        const totalTiles = Number.parseInt(
          dropdown.dataset.totalTiles || '25',
          10,
        );
        const minesCount = Number.parseInt(value || '0', 10);
        const goldNuggets =
          Number.isFinite(totalTiles) && Number.isFinite(minesCount)
            ? Math.max(0, totalTiles - minesCount)
            : 0;
        const target = document.getElementById(
          dropdown.dataset.goldNuggetsTarget,
        );
        if (target) target.textContent = String(goldNuggets);
      }
      if (dropdown.dataset.basketTarget && dropdownOption.dataset.basketValue) {
        const target = document.getElementById(dropdown.dataset.basketTarget);
        if (target) target.textContent = dropdownOption.dataset.basketValue;
      }
      dropdown.querySelectorAll('[data-dropdown-option]').forEach(option => {
        const isSelected = option === dropdownOption;
        option.setAttribute('aria-selected', String(isSelected));
      });
      dropdown.classList.remove('is-selected');
      return;
    }

    const dropdownToggle = event.target.closest('[data-dropdown-toggle]');
    if (dropdownToggle) {
      const dropdown = dropdownToggle.closest('[data-dropdown-field]');
      const isOpen = dropdown.classList.toggle('is-open');
      dropdownToggle.setAttribute('aria-expanded', String(isOpen));
      document
        .querySelectorAll('[data-dropdown-field].is-open')
        .forEach(otherDropdown => {
          if (otherDropdown === dropdown) return;
          otherDropdown.classList.remove('is-open');
          otherDropdown
            .querySelector('[data-dropdown-toggle]')
            ?.setAttribute('aria-expanded', 'false');
        });
      return;
    }

    const roundsToWinOption = event.target.closest(
      '[data-rounds-to-win-option]',
    );
    if (roundsToWinOption) {
      if (roundsToWinOption.disabled) return;

      playDocsSound(ODDS_BUTTON_CLICK_SOUND);

      const group = roundsToWinOption.closest('.joker-rounds-to-win-options');
      const wasSelected = roundsToWinOption.classList.contains('is-selected');

      group?.querySelectorAll('[data-rounds-to-win-option]').forEach(option => {
        const isSelected = option === roundsToWinOption;
        option.classList.toggle('is-selected', isSelected);
        option.setAttribute('aria-checked', String(isSelected));
        if (!isSelected) {
          option.classList.remove('is-select-glow');
        }
      });

      if (!wasSelected) {
        flashOddsButtonGlow(roundsToWinOption);
      }

      updateBetPanelSubmit(roundsToWinOption.closest('.joker-betting-panel'));
      return;
    }

    const gameMenuToggle = event.target.closest('[data-game-menu-toggle]');
    if (gameMenuToggle) {
      if (
        gameMenuToggle.disabled ||
        gameMenuToggle.classList.contains('is-coming-soon')
      )
        return;
      const gameMenu = gameMenuToggle.closest('[data-game-menu]');
      const isOpen = gameMenu.classList.toggle('is-open');
      gameMenuToggle.setAttribute('aria-expanded', String(isOpen));
      return;
    }

    const gameMenuOption = event.target.closest('[data-game-menu-option]');
    if (gameMenuOption) {
      if (
        gameMenuOption.classList.contains('is-coming-soon') ||
        gameMenuOption.disabled
      )
        return;
      event.preventDefault();
      setRailNavigationSelection(gameMenuOption);
      return;
    }

    const multiplierStep = event.target.closest('[data-multiplier-step]');
    if (multiplierStep) {
      const field = multiplierStep.closest('.joker-input-field.multiplier');
      const input = field?.querySelector('[data-multiplier-input]');
      if (!input) return;

      const direction = multiplierStep.dataset.multiplierStep === 'up' ? 1 : -1;
      const currentValue = parseMultiplierValue(input.value);
      const nextValue = Math.max(
        1,
        Math.round((currentValue + direction * 0.1) * 10) / 10,
      );
      input.value = formatMultiplierValue(nextValue);
      input.focus();
      input.setSelectionRange(input.value.length - 1, input.value.length - 1);
      return;
    }

    const railNavDemoItem = event.target.closest('[data-rail-nav-demo-item]');
    if (railNavDemoItem) {
      event.preventDefault();

      const isSelected = !railNavDemoItem.classList.contains('is-selected');
      railNavDemoItem.classList.toggle('is-selected', isSelected);

      if (isSelected) {
        railNavDemoItem.setAttribute('aria-current', 'page');
      } else {
        railNavDemoItem.removeAttribute('aria-current');
      }

      return;
    }

    const productRailItem = event.target.closest('[data-product-rail-item]');
    if (productRailItem) {
      if (productRailItem.classList.contains('is-coming-soon')) return;
      event.preventDefault();
      setRailNavigationSelection(productRailItem);
      return;
    }

    if (!event.target.closest('[data-dropdown-field]')) {
      document
        .querySelectorAll('[data-dropdown-field].is-open')
        .forEach(dropdown => {
          dropdown.classList.remove('is-open');
          dropdown
            .querySelector('[data-dropdown-toggle]')
            ?.setAttribute('aria-expanded', 'false');
        });
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

    const value = copyButton.dataset.copyValue;
    const target = copyButton.dataset.copy
      ? document.querySelector(copyButton.dataset.copy)
      : null;
    if (!value && !target) return;

    await copyText(value || target.textContent.trim());
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

  document.addEventListener('input', event => {
    const target = event.target instanceof Element ? event.target : null;

    const betAmountInput =
      target instanceof HTMLInputElement &&
      target.hasAttribute('data-bet-amount-input')
        ? target
        : target?.closest('[data-bet-amount-input]');
    if (betAmountInput) {
      const nextRaw = sanitizeBetAmount(betAmountInput.value);
      const nextDisplay = formatBetAmountDisplay(nextRaw);
      if (nextDisplay !== betAmountInput.value) {
        betAmountInput.value = nextDisplay;
      }
      betAmountInput.dataset.rawValue = nextRaw;
      updateBetPanelSubmit(betAmountInput.closest('.joker-betting-panel'));
      return;
    }

    const numberOnlyInput = target?.closest('[data-number-only]');
    if (numberOnlyInput) {
      numberOnlyInput.value = numberOnlyInput.value.replace(/\D/g, '');
      updateBetPanelSubmit(numberOnlyInput.closest('.joker-betting-panel'));
      return;
    }

    const multiplierInput = target?.closest('[data-multiplier-input]');
    if (multiplierInput) {
      const numericValue = multiplierInput.value.replace(/[^\d.]/g, '');
      multiplierInput.value = numericValue ? `${numericValue}x` : '';
      return;
    }

    const otpInput = target?.closest('[data-otp-input]');
    if (!otpInput) return;

    const digit = otpInput.value.replace(/\D/g, '').slice(-1);
    otpInput.value = digit;

    if (!digit) {
      otpInput.removeAttribute('data-filled');
      delete otpInput.dataset.rawValue;
      return;
    }

    otpInput.dataset.rawValue = digit;
    otpInput.setAttribute('data-filled', 'true');

    window.setTimeout(() => {
      if (otpInput.dataset.rawValue === digit) otpInput.value = '*';
    }, 220);

    const group = otpInput.closest('.joker-otp-group');
    const inputs = [...group.querySelectorAll('[data-otp-input]')];
    const nextInput = inputs[inputs.indexOf(otpInput) + 1];
    nextInput?.focus();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeCollapsedRailSearch();
      const activeRailSearch = document.activeElement?.closest?.(
        '.joker-product-rail .joker-rail-search-item',
      );
      if (activeRailSearch) document.activeElement.blur();
    }

    if ((event.metaKey || event.ctrlKey) && activeGameZoomViewport) {
      const zoomIn = event.key === '+' || event.key === '=';
      const zoomOut = event.key === '-' || event.key === '_';
      const resetZoom = event.key === '0';

      if (zoomIn || zoomOut || resetZoom) {
        event.preventDefault();
        if (resetZoom) {
          updateGameContainerZoomValue(
            activeGameZoomViewport,
            getDefaultGameContainerZoom(activeGameZoomViewport),
          );
          updateGameContainerPan(activeGameZoomViewport, 0, 0);
        } else {
          stepGameContainerZoom(activeGameZoomViewport, zoomIn ? 1 : -1);
        }
        return;
      }
    }

    const target = event.target instanceof Element ? event.target : null;
    const multiplierInput = target?.closest('[data-multiplier-input]');
    if (multiplierInput && event.key === 'Enter') {
      multiplierInput.value = formatMultiplierValue(
        parseMultiplierValue(multiplierInput.value),
      );
      multiplierInput.blur();
      return;
    }

    const otpInput = target?.closest('[data-otp-input]');
    if (!otpInput || event.key !== 'Backspace') return;

    if (otpInput.value && otpInput.value !== '*') return;
    event.preventDefault();
    otpInput.value = '';
    otpInput.removeAttribute('data-filled');
    delete otpInput.dataset.rawValue;

    const group = otpInput.closest('.joker-otp-group');
    const inputs = [...group.querySelectorAll('[data-otp-input]')];
    const previousInput = inputs[inputs.indexOf(otpInput) - 1];
    previousInput?.focus();
  });

  document.addEventListener('focusout', event => {
    const target = event.target instanceof Element ? event.target : null;
    const multiplierInput = target?.closest('[data-multiplier-input]');
    if (!multiplierInput) return;

    multiplierInput.value = formatMultiplierValue(
      parseMultiplierValue(multiplierInput.value),
    );
  });
}

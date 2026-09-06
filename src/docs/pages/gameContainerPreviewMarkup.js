import { navigationItemRegistry } from '../../data/navigationData.js';
import { escapeHtml } from '../../utils.js';
import { lucideIcon } from '../../utils/lucideIcon.js?v=nav-outline-v1';
import {
  mobileNavigationPreview,
  navItemIcon,
  sideRailPreview,
  topRailPreview,
} from './navigationPreviewMarkup.js';

export function gameContainerPreview() {
  return `
    <div class="joker-game-shell joker-game-shell-preview-frame" aria-label="Joker game container preview">
      <div class="joker-game-shell-top-rail">
        ${topRailPreview()}
      </div>
      <div class="joker-game-shell-body">
        <div class="joker-game-shell-side">
          ${sideRailPreview()}
        </div>
        <div class="joker-page-wrapper">
          <main class="joker-game-inner" aria-label="Game stage">
            ${gameHeaderRailPreview({game: navigationItemRegistry.mines})}
            <div class="joker-game-inner-layout joker-game-shell-play-area">
              <div class="joker-game-inner-betting joker-game-shell-betting">
                ${minesBettingPanelPreview({idPrefix: 'game-shell-mines-betting-panel'})}
              </div>
              <div class="joker-game-inner-canvas joker-game-shell-empty-stage" aria-label="Game canvas"></div>
            </div>
            ${gameFooterRailPreview()}
          </main>
        </div>
      </div>
    </div>
  `;
}

export function gameChromeShellPreview() {
  return `
    <div class="joker-game-chrome-preview" aria-label="Game app shell preview">
      <div class="joker-game-shell-top-rail">
        ${topRailPreview()}
      </div>
      <div class="joker-game-shell-body">
        <div class="joker-game-shell-side">
          ${sideRailPreview()}
        </div>
        <div class="joker-page-wrapper">
          <div class="joker-game-chrome-slot" aria-label="Game inner slot"></div>
        </div>
      </div>
    </div>
  `;
}

export function gameChromeShellMobilePreview() {
  return `
    <div class="joker-mobile-game-shell joker-mobile-game-shell-preview-frame joker-mobile-game-chrome-preview" aria-label="Mobile game app shell preview">
      ${mobileNavigationPreview({open: false})}
      <main class="joker-mobile-game-content" aria-label="Mobile game inner slot">
        <div class="joker-page-wrapper">
          <div class="joker-game-chrome-slot" aria-label="Game inner slot"></div>
        </div>
      </main>
    </div>
  `;
}

export function gameInnerPreview() {
  return `
    <main class="joker-game-inner" aria-label="Game inner preview">
      ${gameHeaderRailPreview({game: navigationItemRegistry.mines})}
      <div class="joker-game-inner-layout joker-game-shell-play-area">
        <div class="joker-game-inner-betting joker-game-shell-betting">
          ${minesBettingPanelPreview({idPrefix: 'game-inner-mines-betting-panel'})}
        </div>
        <div class="joker-game-inner-canvas joker-game-shell-empty-stage" aria-label="Game canvas"></div>
      </div>
      ${gameFooterRailPreview()}
    </main>
  `;
}

export function gameInnerMobilePreview() {
  return `
    <div class="joker-mobile-game-inner-frame joker-mobile-game-inner-preview" aria-label="Mobile game inner preview">
      ${gameHeaderRailPreview({game: navigationItemRegistry.mines})}
      <div class="joker-mobile-game-stage joker-game-shell-empty-stage" aria-label="Mobile game canvas"></div>
      <div class="joker-mobile-game-betting joker-game-shell-betting">
        ${minesBettingPanelMobilePreview({idPrefix: 'mobile-game-inner-mines-betting-panel'})}
      </div>
      ${gameFooterRailPreview()}
    </div>
  `;
}

export function gameContainerMobilePreview() {
  return `
    <div class="joker-mobile-game-shell joker-mobile-game-shell-preview-frame" aria-label="Joker mobile game container preview">
      ${mobileNavigationPreview({open: false})}
      <main class="joker-mobile-game-content" aria-label="Mobile game content">
        <div class="joker-page-wrapper">
          <div class="joker-mobile-game-inner-frame">
            ${gameHeaderRailPreview({game: navigationItemRegistry.mines})}
            <div class="joker-mobile-game-stage joker-game-shell-empty-stage" aria-label="Mobile game canvas"></div>
            <div class="joker-mobile-game-betting joker-game-shell-betting">
              ${minesBettingPanelMobilePreview({idPrefix: 'mobile-game-shell-mines-betting-panel'})}
            </div>
            ${gameFooterRailPreview()}
          </div>
        </div>
      </main>
    </div>
  `;
}

export function gameHeaderInfoIconPreview() {
  return `
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.875 10C1.875 5.5125 5.5125 1.875 10 1.875C14.4875 1.875 18.125 5.5125 18.125 10C18.125 14.4875 14.4875 18.125 10 18.125C5.5125 18.125 1.875 14.4875 1.875 10ZM9.13 8.79833C10.085 8.32083 11.1608 9.18417 10.9017 10.22L10.3108 12.5833L10.3458 12.5667C10.4927 12.5021 10.6587 12.4965 10.8096 12.551C10.9605 12.6054 11.0846 12.7158 11.1564 12.8593C11.2281 13.0028 11.2419 13.1684 11.195 13.3217C11.148 13.4751 11.0439 13.6046 10.9042 13.6833L10.8708 13.7017C9.915 14.1792 8.83917 13.3158 9.09833 12.28L9.69 9.91667L9.655 9.93333C9.58128 9.9743 9.50003 9.99993 9.41615 10.0087C9.33226 10.0174 9.24748 10.0091 9.1669 9.98418C9.08632 9.95929 9.01161 9.91834 8.94727 9.86381C8.88294 9.80927 8.8303 9.74229 8.79254 9.66687C8.75478 9.59146 8.73267 9.50919 8.72754 9.425C8.72242 9.34082 8.73439 9.25647 8.76272 9.17704C8.79106 9.0976 8.83518 9.02472 8.89243 8.96279C8.94968 8.90086 9.01887 8.85115 9.09583 8.81667L9.13 8.79833ZM10 7.5C10.1658 7.5 10.3247 7.43415 10.4419 7.31694C10.5592 7.19973 10.625 7.04076 10.625 6.875C10.625 6.70924 10.5592 6.55027 10.4419 6.43306C10.3247 6.31585 10.1658 6.25 10 6.25C9.83424 6.25 9.67527 6.31585 9.55806 6.43306C9.44085 6.55027 9.375 6.70924 9.375 6.875C9.375 7.04076 9.44085 7.19973 9.55806 7.31694C9.67527 7.43415 9.83424 7.5 10 7.5Z" fill="currentColor"></path>
    </svg>
  `;
}

export function gameHeaderRailPreview({
  game = navigationItemRegistry.crash,
  rightLabel = 'Fair Play',
  rightIcon = 'fair-play',
} = {}) {
  const gameLabel = game.label || 'Crash';
  const gameIcon = game.icon || 'crash';

  return `
    <div class="joker-game-header-rail" aria-label="${escapeHtml(gameLabel)} game header">
      <div class="joker-game-header-group">
        <span class="joker-game-header-info" aria-hidden="true">${gameHeaderInfoIconPreview()}</span>
        <span class="joker-game-header-title">
          ${navItemIcon(gameIcon, 'joker-game-header-game-icon')}
          <span>${escapeHtml(gameLabel)}</span>
        </span>
      </div>
      <div class="joker-game-header-group joker-game-header-fair-play">
        ${gameHeaderRailIcon(rightIcon, 'joker-game-header-fair-play-icon')}
        <span>${escapeHtml(rightLabel)}</span>
      </div>
    </div>
  `;
}

export function gameHeaderRailIcon(name, className = '') {
  return navItemIcon(name, className);
}

const FOOTER_RAIL_ICONS = {
  'star-icon': '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false"><path d="M9.56615 2.91569C9.6014 2.82971 9.66142 2.75617 9.73858 2.7044C9.81575 2.65264 9.90657 2.625 9.99949 2.625C10.0924 2.625 10.1832 2.65264 10.2604 2.7044C10.3376 2.75617 10.3976 2.82971 10.4328 2.91569L12.2037 7.17485C12.2368 7.25455 12.2913 7.32356 12.3611 7.37428C12.431 7.425 12.5134 7.45548 12.5995 7.46235L17.1978 7.83069C17.6137 7.86402 17.782 8.38319 17.4653 8.65402L13.962 11.6557C13.8965 11.7117 13.8478 11.7846 13.821 11.8665C13.7943 11.9484 13.7906 12.036 13.8103 12.1199L14.8812 16.6074C14.9027 16.6974 14.897 16.7918 14.8649 16.8786C14.8329 16.9654 14.7757 17.0408 14.7008 17.0952C14.6259 17.1496 14.5366 17.1806 14.4441 17.1842C14.3516 17.1879 14.2601 17.164 14.1812 17.1157L10.2437 14.7115C10.1701 14.6666 10.0856 14.6428 9.99949 14.6428C9.91333 14.6428 9.82884 14.6666 9.75532 14.7115L5.81782 17.1165C5.73887 17.1648 5.64736 17.1887 5.55487 17.185C5.46237 17.1814 5.37303 17.1504 5.29813 17.096C5.22322 17.0416 5.16612 16.9663 5.13403 16.8794C5.10194 16.7926 5.0963 16.6982 5.11782 16.6082L6.18865 12.1199C6.20851 12.036 6.20486 11.9483 6.1781 11.8664C6.15134 11.7845 6.10251 11.7116 6.03699 11.6557L2.53365 8.65402C2.4631 8.59388 2.41199 8.51416 2.38679 8.42495C2.36158 8.33574 2.36342 8.24106 2.39206 8.15289C2.4207 8.06473 2.47487 7.98705 2.54769 7.92969C2.62052 7.87233 2.70873 7.83788 2.80115 7.83069L7.39949 7.46235C7.48553 7.45548 7.568 7.425 7.63784 7.37428C7.70768 7.32356 7.76217 7.25455 7.79532 7.17485L9.56615 2.91569Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'settings-icon': '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.2321 1.875C8.46793 1.875 7.81627 2.4275 7.69043 3.18083L7.5421 4.07417C7.52543 4.17417 7.44627 4.29083 7.2946 4.36417C7.00906 4.50143 6.73438 4.66022 6.47293 4.83917C6.3346 4.935 6.1946 4.94417 6.09793 4.90833L5.25043 4.59C4.90397 4.4602 4.52268 4.45755 4.17445 4.58253C3.82621 4.70751 3.53362 4.95201 3.34877 5.2725L2.58043 6.60333C2.39551 6.92363 2.3302 7.29915 2.39611 7.66307C2.46203 8.027 2.65491 8.35575 2.94043 8.59083L3.64043 9.1675C3.7196 9.2325 3.7821 9.35833 3.76877 9.52583C3.74502 9.84178 3.74502 10.1591 3.76877 10.475C3.78127 10.6417 3.7196 10.7683 3.64127 10.8333L2.94043 11.41C2.65491 11.6451 2.46203 11.9738 2.39611 12.3378C2.3302 12.7017 2.39551 13.0772 2.58043 13.3975L3.34877 14.7283C3.53376 15.0487 3.8264 15.293 4.17462 15.4178C4.52285 15.5426 4.90406 15.5399 5.25043 15.41L6.0996 15.0917C6.19543 15.0558 6.33543 15.0658 6.4746 15.16C6.7346 15.3383 7.00877 15.4975 7.29543 15.635C7.4471 15.7083 7.52627 15.825 7.54293 15.9267L7.69127 16.8192C7.8171 17.5725 8.46877 18.125 9.23293 18.125H10.7696C11.5329 18.125 12.1854 17.5725 12.3113 16.8192L12.4596 15.9258C12.4763 15.8258 12.5546 15.7092 12.7071 15.635C12.9938 15.4975 13.2679 15.3383 13.5279 15.16C13.6671 15.065 13.8071 15.0558 13.9029 15.0917L14.7529 15.41C15.0992 15.5394 15.4801 15.5418 15.828 15.4168C16.1758 15.2919 16.4681 15.0476 16.6529 14.7275L17.4221 13.3967C17.607 13.0764 17.6723 12.7009 17.6064 12.3369C17.5405 11.973 17.3476 11.6443 17.0621 11.4092L16.3621 10.8325C16.2829 10.7675 16.2204 10.6417 16.2338 10.4742C16.2575 10.1582 16.2575 9.84095 16.2338 9.525C16.2204 9.35833 16.2829 9.23167 16.3613 9.16667L17.0613 8.59C17.6513 8.105 17.8038 7.265 17.4221 6.6025L16.6538 5.27167C16.4688 4.95132 16.1761 4.707 15.8279 4.58218C15.4797 4.45735 15.0985 4.46013 14.7521 4.59L13.9021 4.90833C13.8071 4.94417 13.6671 4.93417 13.5279 4.83917C13.2668 4.66025 12.9924 4.50145 12.7071 4.36417C12.5546 4.29167 12.4763 4.175 12.4596 4.07417L12.3104 3.18083C12.2497 2.81589 12.0614 2.48435 11.779 2.24522C11.4967 2.0061 11.1387 1.87491 10.7688 1.875H9.23293H9.2321ZM10.0004 13.125C10.8292 13.125 11.6241 12.7958 12.2101 12.2097C12.7962 11.6237 13.1254 10.8288 13.1254 10C13.1254 9.1712 12.7962 8.37634 12.2101 7.79029C11.6241 7.20424 10.8292 6.875 10.0004 6.875C9.17163 6.875 8.37678 7.20424 7.79073 7.79029C7.20467 8.37634 6.87543 9.1712 6.87543 10C6.87543 10.8288 7.20467 11.6237 7.79073 12.2097C8.37678 12.7958 9.17163 13.125 10.0004 13.125Z" fill="currentColor"/></svg>',
  'graph-icon': '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false"><path d="M15.3125 1.875C14.45 1.875 13.75 2.575 13.75 3.4375V16.5625C13.75 17.425 14.45 18.125 15.3125 18.125H15.9375C16.8 18.125 17.5 17.425 17.5 16.5625V3.4375C17.5 2.57417 16.8 1.875 15.9375 1.875H15.3125ZM8.125 7.1875C8.125 6.32417 8.825 5.625 9.6875 5.625H10.3125C11.1758 5.625 11.875 6.325 11.875 7.1875V16.5625C11.875 17.425 11.175 18.125 10.3125 18.125H9.6875C9.2731 18.125 8.87567 17.9604 8.58265 17.6674C8.28962 17.3743 8.125 16.9769 8.125 16.5625V7.1875ZM2.5 10.9375C2.5 10.0742 3.2 9.375 4.0625 9.375H4.6875C5.55083 9.375 6.25 10.075 6.25 10.9375V16.5625C6.25 17.425 5.55 18.125 4.6875 18.125H4.0625C3.6481 18.125 3.25067 17.9604 2.95765 17.6674C2.66462 17.3743 2.5 16.9769 2.5 16.5625V10.9375Z" fill="currentColor"/></svg>',
};

export function gameFooterRailPreview() {
  return `
    <div class="joker-game-footer-rail" aria-label="Game footer">
      <div class="joker-game-footer-actions" aria-label="Game controls">
        ${gameFooterRailAction('Favourites', 'star-icon')}
        ${gameFooterRailAction('Settings', 'settings-icon')}
        ${gameFooterRailAction('Graph', 'graph-icon')}
      </div>
      <div class="joker-game-footer-brand" aria-hidden="true">
        <img class="joker-game-footer-logo" src="./assets/game-rails/joker.svg?v=game-footer-rail" alt="Joker" />
      </div>
    </div>
  `;
}

export function gameFooterRailAction(label, iconName) {
  return `
    <button class="joker-game-footer-action" type="button" aria-label="${escapeHtml(label)}">
      <span class="joker-game-footer-icon" aria-hidden="true">${FOOTER_RAIL_ICONS[iconName] || ''}</span>
    </button>
  `;
}

export function betAmountFieldPreview(idPrefix) {
  return `
    <div class="joker-input-field live prefix full-width currency joker-bet-field">
      <label class="joker-input-label" for="${idPrefix}-bet-amount">Bet amount</label>
      <div class="joker-input-control">
        <span class="joker-input-icon"><img src="./assets/jokerCoin.svg?v=nav" alt="" /></span>
        <input
          id="${idPrefix}-bet-amount"
          type="text"
          inputmode="decimal"
          pattern="[0-9]*[.]?[0-9]*"
          placeholder="0"
          autocomplete="off"
          data-bet-amount-input
        />
      </div>
    </div>
  `;
}

export function minesBettingPanelPreview({
  idPrefix = 'mines-betting-panel',
  inGame = false,
} = {}) {
  return `
    <aside class="joker-betting-panel joker-mines-betting-panel${inGame ? ' is-ingame' : ''}" aria-label="Mines betting panel">
      ${inGame ? '<span class="joker-mines-betting-ingame-scrim" aria-hidden="true"></span>' : ''}

      <div class="joker-mines-betting-main">
        ${betAmountFieldPreview(idPrefix)}

        <span class="joker-betting-divider" aria-hidden="true"></span>

        <div class="joker-betting-fields">
          <span class="joker-betting-divider joker-betting-mobile-field-divider" aria-hidden="true"></span>

          <div class="joker-mines-betting-field-group">
            ${minesAmountDropdownPreview(idPrefix)}

            <div class="joker-input-field full-width joker-gold-nuggets-input joker-gold-nuggets-display joker-basket-input joker-bet-field">
              <span class="joker-input-label" id="${idPrefix}-gold-nuggets-label">Gold bars</span>
              <div class="joker-input-control" role="status" aria-labelledby="${idPrefix}-gold-nuggets-label">
                <img class="joker-gold-nuggets-icon" src="./assets/goldBar.png" alt="" />
                <span class="joker-gold-nuggets-value" id="${idPrefix}-gold-nuggets-value">24</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      ${
        inGame
          ? `
        <div class="joker-mines-betting-ingame-trail">
          ${minesInGameCardPreview({
            currentProfit: '0',
            nextValue: '1050',
            currentMultiplier: '1.0x',
            nextMultiplier: '1.5x',
          })}
          <div class="joker-betting-submit-group joker-betting-cashout-footer">
            <button class="joker-cta-preview hi-lo-skip cashout full-width" type="button">
              <span class="joker-hi-lo-skip-label">Cashout</span>
            </button>
          </div>
        </div>
      `
          : `
        <div class="joker-mines-betting-actions">
          <span class="joker-betting-divider" aria-hidden="true"></span>
          <div class="joker-betting-submit-group is-pending-bet">
            <button class="joker-button joker-button--primary joker-button--medium joker-button--full-width joker-cta-preview default full-width joker-bet-submit is-pending-bet" type="button" data-bet-submit">
              <span class="joker-button__content">Place Bet</span>
            </button>
            ${enterBetPrecursorPreview()}
          </div>
        </div>
      `
      }
    </aside>
  `;
}

export function minesBettingPanelMobilePreview({
  idPrefix = 'mines-betting-panel-mobile',
  inGame = false,
} = {}) {
  return `
    <aside class="joker-betting-panel joker-mines-betting-panel is-mobile${inGame ? ' is-ingame' : ''}" aria-label="Mines mobile betting panel">
      ${inGame ? '<span class="joker-mines-betting-ingame-scrim" aria-hidden="true"></span>' : ''}

      ${
        inGame
          ? ''
          : `
        <div class="joker-betting-submit-group is-pending-bet">
          <button class="joker-button joker-button--primary joker-button--medium joker-button--full-width joker-cta-preview default full-width joker-bet-submit is-pending-bet" type="button" data-bet-submit">
            <span class="joker-button__content">Place Bet</span>
          </button>
          ${enterBetPrecursorPreview()}
        </div>

        <span class="joker-betting-divider" aria-hidden="true"></span>
      `
      }

      ${
        inGame
          ? `
        <div class="joker-mines-betting-ingame-lead">
          <div class="joker-betting-submit-group joker-betting-cashout-footer">
            <button class="joker-cta-preview hi-lo-skip cashout full-width" type="button">
              <span class="joker-hi-lo-skip-label">Cashout</span>
            </button>
          </div>
          ${minesInGameCardPreview({
            currentProfit: '0',
            nextValue: '1050',
            currentMultiplier: '1.0x',
            nextMultiplier: '1.5x',
          })}
        </div>
      `
          : ''
      }

      <div class="joker-mines-betting-main">
        <div class="joker-betting-fields">
          ${betAmountFieldPreview(idPrefix)}

          <span class="joker-betting-divider" aria-hidden="true"></span>

          <div class="joker-mines-betting-field-group">
            ${minesAmountDropdownPreview(idPrefix)}

            <div class="joker-input-field full-width joker-gold-nuggets-input joker-gold-nuggets-display joker-basket-input joker-bet-field">
              <span class="joker-input-label" id="${idPrefix}-gold-nuggets-label">Gold bars</span>
              <div class="joker-input-control" role="status" aria-labelledby="${idPrefix}-gold-nuggets-label">
                <img class="joker-gold-nuggets-icon" src="./assets/goldBar.png" alt="" />
                <span class="joker-gold-nuggets-value" id="${idPrefix}-gold-nuggets-value">24</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  `;
}

export function dynamiteOptionLabel(label) {
  return `<span class="joker-dynamite-value"><img class="joker-dynamite-icon" src="./assets/bomb.png" alt="" /><span>${label}</span></span>`;
}

export function minesAmountDropdownPreview(idPrefix) {
  const options = Array.from({length: 24}, (_, index) => ({
    value: String(index + 1),
    label: `${index + 1} ${index === 0 ? 'Mine' : 'Mines'}`,
  }));

  return `
    <div class="joker-input-field dropdown full-width joker-bet-field joker-dynamite-input" data-dropdown-field data-value="1" data-total-tiles="25" data-gold-nuggets-target="${idPrefix}-gold-nuggets-value">
      <label class="joker-input-label" id="${idPrefix}-mines-label">Dynamite</label>
      <button
        class="joker-input-control joker-dropdown-control"
        type="button"
        data-dropdown-toggle
        aria-labelledby="${idPrefix}-mines-label"
        aria-haspopup="listbox"
        aria-expanded="false"
      >
        <img class="joker-dynamite-icon" src="./assets/bomb.png" alt="" />
        <span class="joker-dropdown-value" data-dropdown-value>${options[0].label}</span>
        <span class="joker-input-icon trailing">${lucideIcon('chevron-down')}</span>
      </button>
      <div class="joker-dropdown-menu" role="listbox" aria-labelledby="${idPrefix}-mines-label">
        ${options
          .map(
            (option, index) => `
          <button
            class="joker-dropdown-option"
            type="button"
            role="option"
            data-dropdown-option="${option.value}"
            aria-selected="${index === 0 ? 'true' : 'false'}"
          >${dynamiteOptionLabel(option.label)}</button>
        `,
          )
          .join('')}
      </div>
    </div>
  `;
}

export function enterBetPrecursorPreview({
  message = 'Enter a bet amount to start playing',
} = {}) {
  return `
    <div class="joker-enter-bet-precursor" role="status">
      <span class="joker-enter-bet-precursor-text">${escapeHtml(message)}</span>
    </div>
  `;
}

export function minesInGameCardPreview({
  currentProfit = '800',
  nextValue = '1050',
  currentMultiplier = '8.0x',
  nextMultiplier = '10.5x',
} = {}) {
  return `
    <div class="joker-mines-ingame-card" aria-label="Mines in-game progress">
      <div class="joker-mines-ingame-card-top">
        <div class="joker-mines-ingame-card-stack">
          <span class="joker-mines-ingame-card-label">Current profit</span>
          <span class="joker-mines-ingame-card-value is-profit">
            <span class="joker-mines-ingame-card-coin" aria-hidden="true"></span>
            <span>${escapeHtml(currentProfit)}</span>
          </span>
        </div>
        <span class="joker-mines-ingame-card-chevron" aria-hidden="true">${lucideIcon('chevron-right')}</span>
        <div class="joker-mines-ingame-card-stack">
          <span class="joker-mines-ingame-card-label">Next</span>
          <span class="joker-mines-ingame-card-value is-next">
            <span class="joker-mines-ingame-card-coin" aria-hidden="true"></span>
            <span>${escapeHtml(nextValue)}</span>
          </span>
        </div>
      </div>
      <div class="joker-mines-ingame-card-bottom">
        <span class="joker-mines-ingame-card-multiplier is-profit">${escapeHtml(currentMultiplier)}</span>
        <span class="joker-mines-ingame-card-bottom-divider" aria-hidden="true"></span>
        <span class="joker-mines-ingame-card-multiplier">${escapeHtml(nextMultiplier)}</span>
      </div>
    </div>
  `;
}

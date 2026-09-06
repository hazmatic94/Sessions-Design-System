import {componentExampleWrapper, pageHero, section} from '../shell/pageLayout.js';
import {
  gameChromeShellMobilePreview,
  gameChromeShellPreview,
  gameContainerMobilePreview,
  gameContainerPreview,
  gameInnerMobilePreview,
  gameInnerPreview,
} from './gameContainerPreviewMarkup.js?v=footer-settings-v1';

export function renderGameContainerPage(page) {
  return `
    ${pageHero(page)}
    ${section('Game Shell', '', gameShellExamples(), 'button-example-section game-container-section')}
  `;
}

function gameContainerExampleCard({
  id,
  tocTitle,
  viewportAttrs,
  previewHtml,
  codeId,
  filename,
  code,
  stageClassName = '',
  className = '',
}) {
  return componentExampleWrapper({
    id,
    tocTitle,
    preview: `
      <div class="game-container-viewport" tabindex="0" ${viewportAttrs}>
        ${previewHtml}
      </div>
    `,
    codeId,
    filename,
    code,
    size: 'lg',
    className: `game-container-example ${className}`.trim(),
    stageClassName: `game-container-stage ${stageClassName}`.trim(),
  });
}

function gameShellExamples() {
  return `
    ${gameContainerExampleCard({
      id: 'game-container-full-game-shell',
      tocTitle: 'FullGameShell',
      viewportAttrs:
        'aria-label="Zoomable full game shell preview" data-game-zoom-viewport data-zoom="0.34" data-pan-x="0" data-pan-y="0"',
      previewHtml: `
        <div class="game-container-preview-set">
          <div class="game-container-preview">${gameContainerPreview()}</div>
          <div class="game-container-mobile-preview">${gameContainerMobilePreview()}</div>
        </div>
      `,
      codeId: 'game-container-code',
      filename: 'FullGameShell.tsx',
      code: sampleGameContainerCode(),
      stageClassName: 'game-container-full-stage',
    })}
    ${gameContainerExampleCard({
      id: 'game-container-app-shell',
      tocTitle: 'AppShell',
      viewportAttrs:
        'aria-label="Zoomable game app shell preview" data-game-zoom-viewport data-zoom="0.31" data-pan-x="0" data-pan-y="0"',
      previewHtml: `
        <div class="game-container-split-set">
          <div class="game-container-split-item">
            <p class="game-container-split-label">Desktop AppShell</p>
            ${gameChromeShellPreview()}
          </div>
          <div class="game-container-split-item">
            <p class="game-container-split-label">Mobile AppShell</p>
            ${gameChromeShellMobilePreview()}
          </div>
        </div>
      `,
      codeId: 'game-container-app-shell-code',
      filename: 'AppShell.tsx',
      code: sampleAppShellCode(),
      stageClassName: 'game-container-split-stage',
      className: 'game-container-split-example',
    })}
    ${gameContainerExampleCard({
      id: 'game-container-game-inner',
      tocTitle: 'Game Inner',
      viewportAttrs:
        'aria-label="Zoomable game inner preview" data-game-zoom-viewport data-zoom="0.39" data-pan-x="0" data-pan-y="0"',
      previewHtml: `
        <div class="game-container-split-set">
          <div class="game-container-split-item">
            <p class="game-container-split-label">Desktop Game Inner</p>
            ${gameInnerPreview()}
          </div>
          <div class="game-container-split-item">
            <p class="game-container-split-label">Mobile Game Inner</p>
            ${gameInnerMobilePreview()}
          </div>
        </div>
      `,
      codeId: 'game-container-game-inner-code',
      filename: 'GameInner.tsx',
      code: sampleGameInnerCode(),
      stageClassName: 'game-container-split-stage',
      className: 'game-container-split-example',
    })}
  `;
}

function sampleGameContainerCode() {
  return `import {
  FullGameShell,
} from "@joker/design-system";

export function HiLoGamePage() {
  return (
    <FullGameShell defaultValue="hilo">
      <HiLoGameCanvas />
    </FullGameShell>
  );
}`;
}

function sampleAppShellCode() {
  return `import {
  AppShell,
} from "@joker/design-system";

export function AppChrome() {
  return (
    <AppShell defaultValue="hilo">
      <GameInnerSlot />
    </AppShell>
  );
}`;
}

function sampleGameInnerCode() {
  return `import {
  GameInner,
  HiLoBettingPanel,
} from "@joker/design-system";

export function StandaloneGameInner() {
  return (
    <GameInner bettingPanel={<HiLoBettingPanel />}>
      <HiLoGameCanvas />
    </GameInner>
  );
}`;
}

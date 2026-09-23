export function renderResponsiveDemo(preview, { mobileWidth = 362 } = {}) {
  return `
    <div class="sessions-responsive-demo">
      <div class="sessions-responsive-demo__viewport sessions-responsive-demo__viewport--desktop">
        ${preview}
      </div>
      <div class="sessions-responsive-demo__divider" aria-hidden="true">
        <span class="sessions-responsive-demo__label">Mobile · ${mobileWidth}px</span>
      </div>
      <div
        class="sessions-responsive-demo__viewport sessions-responsive-demo__viewport--mobile"
        style="--sessions-responsive-demo-mobile-width: ${mobileWidth}px">
        ${preview}
      </div>
    </div>
  `;
}

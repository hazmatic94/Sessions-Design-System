const syncedResponsiveDemos = new WeakSet();

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

export function syncResponsiveDemoChartHeights(root = document) {
  root.querySelectorAll(".sessions-responsive-demo").forEach((demo) => {
    const desktopChart = demo.querySelector(
      ".sessions-responsive-demo__viewport--desktop .sessions-chart-grid",
    );
    const mobileChart = demo.querySelector(
      ".sessions-responsive-demo__viewport--mobile .sessions-chart-grid",
    );

    if (!desktopChart || !mobileChart) return;

    const apply = () => {
      const { height } = desktopChart.getBoundingClientRect();
      if (height > 0) {
        mobileChart.style.setProperty("--sessions-chart-grid-sync-height", `${height}px`);
      }

      mobileChart.querySelector(".sessions-chart-grid__bars")?.setAttribute("preserveAspectRatio", "none");
      mobileChart.querySelector(".sessions-chart-grid__lines")?.setAttribute("preserveAspectRatio", "none");
    };

    apply();

    if (!syncedResponsiveDemos.has(demo)) {
      syncedResponsiveDemos.add(demo);
      new ResizeObserver(apply).observe(desktopChart);
    }
  });
}

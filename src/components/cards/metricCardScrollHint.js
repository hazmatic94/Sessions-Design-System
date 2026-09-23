import { sessionsAsset } from "../../assetBase.js";

const CHEVRON_DOWN_ICON = "IconChevronDown.svg";
const initialized = new WeakSet();

export function renderMetricCardScrollRegion(listMarkup) {
  const chevronIcon = sessionsAsset(CHEVRON_DOWN_ICON);

  return `<div class="sessions-metric-card-scroll" data-sessions-metric-card-scroll>
    <div class="sessions-metric-card-scroll__body" data-sessions-metric-card-scroll-body>${listMarkup}</div>
    <div class="sessions-metric-card-scroll__cue is-hidden" data-sessions-metric-card-scroll-cue aria-hidden="true">
      <span
        class="sessions-metric-card-scroll__chevron"
        style="--sessions-metric-card-scroll-chevron: url('${chevronIcon}')"
        aria-hidden="true"
      ></span>
    </div>
  </div>`;
}

function updateScrollCue(region) {
  const body = region.querySelector("[data-sessions-metric-card-scroll-body]");
  const cue = region.querySelector("[data-sessions-metric-card-scroll-cue]");
  if (!body || !cue) return;

  const { scrollTop, scrollHeight, clientHeight } = body;
  const canScroll = scrollHeight > clientHeight + 1;
  const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
  const shouldHide = !canScroll || atBottom;

  cue.classList.toggle("is-hidden", shouldHide);
  cue.setAttribute("aria-hidden", String(shouldHide));
}

function bindScrollRegion(region) {
  if (initialized.has(region)) {
    updateScrollCue(region);
    return;
  }

  initialized.add(region);

  const body = region.querySelector("[data-sessions-metric-card-scroll-body]");
  if (!body) return;

  const onUpdate = () => updateScrollCue(region);
  body.addEventListener("scroll", onUpdate, { passive: true });

  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver(onUpdate);
    observer.observe(body);
    observer.observe(region);
  }

  requestAnimationFrame(onUpdate);
}

export function setupSessionsMetricCardScrollHints(root = document) {
  root.querySelectorAll("[data-sessions-metric-card-scroll]").forEach(bindScrollRegion);
}

export function updateSessionsMetricCardScrollHints(root = document) {
  root.querySelectorAll("[data-sessions-metric-card-scroll]").forEach(updateScrollCue);
}

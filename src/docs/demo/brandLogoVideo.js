import { setupSeamlessVideoLoop } from "./seamlessVideoLoop.js?v=hero-video-loop-v1";

const logoPairs = [];

export function setupBrandLogoVideos() {
  document.querySelectorAll(".brand-logo-mark > .brand-logo-video").forEach((video) => {
    const mark = video.closest(".brand-logo-mark");
    if (!mark || mark.dataset.logoLoopReady === "true") return;

    const loop = setupSeamlessVideoLoop(video, {
      container: mark,
      readyKey: "logoLoopReady",
      activeClass: "brand-logo-video--active",
      standbyClass: "brand-logo-video--standby",
    });

    logoPairs.push(loop);
  });

  if (!logoPairs.length) return;

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") return;

    logoPairs.forEach(({ getActive }) => {
      const active = getActive();
      if (active.paused) {
        active.play()?.catch(() => {});
      }
    });
  });
}

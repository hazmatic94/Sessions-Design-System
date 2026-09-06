import { applyRouletteWheelSpinFrame } from "../../utils/rouletteWheelImperativeFrame.js";
import {
  rouletteWheelSpinOriginPercent,
  rouletteWheelViewBoxAttribute,
} from "./rouletteWheelPaths.js";

export type RouletteWheelBakedAssembly = {
  stage: HTMLDivElement;
  spinnerWrap: HTMLDivElement;
  ball: HTMLDivElement;
};

const SVG_NS = "http://www.w3.org/2000/svg";

function createSvgElement(tag: string, attributes: Record<string, string> = {}) {
  const element = document.createElementNS(SVG_NS, tag);
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }
  return element;
}

/** Split a baked wheel SVG into the layered stage DOM used by spin + imperative frames. */
export function assembleRouletteWheelBakedStage(
  svgMarkup: string,
  mount: HTMLDivElement,
): RouletteWheelBakedAssembly | null {
  if (typeof document === "undefined") {
    return null;
  }

  const doc = new DOMParser().parseFromString(svgMarkup, "image/svg+xml");
  const root = doc.documentElement;
  const viewBox = root.getAttribute("viewBox") || rouletteWheelViewBoxAttribute();
  const defs = root.querySelector("defs");
  const staticFrame = root.querySelector("#rw-static-frame");
  const outerBallTrack = root.querySelector("#rw-outer-ball-track");
  const spinner = root.querySelector("#rw-wheel-spinner");
  const pointer = root.querySelector("g#rw-pointer");

  if (!staticFrame || !spinner || !pointer) {
    return null;
  }

  const spinOrigin = rouletteWheelSpinOriginPercent();
  mount.classList.add("joker-roulette-wheel__stage");
  mount.style.setProperty("--roulette-spin-origin-x", spinOrigin.left);
  mount.style.setProperty("--roulette-spin-origin-y", spinOrigin.top);

  const defsHost = createSvgElement("svg", {
    class: "joker-roulette-wheel__defs",
    "aria-hidden": "true",
  });
  if (defs) {
    defsHost.appendChild(defs.cloneNode(true));
  }

  const staticSvg = createSvgElement("svg", {
    viewBox,
    fill: "none",
    class: "joker-roulette-wheel__svg joker-roulette-wheel__svg--static",
    "aria-hidden": "true",
  });
  staticSvg.appendChild(staticFrame.cloneNode(true));

  const spinnerWrap = document.createElement("div");
  spinnerWrap.className = "joker-roulette-wheel__wheel-spinner";

  const spinnerSvg = createSvgElement("svg", {
    viewBox,
    fill: "none",
    class: "joker-roulette-wheel__svg joker-roulette-wheel__svg--spinner",
    "aria-hidden": "true",
  });
  spinnerSvg.appendChild(spinner.cloneNode(true));
  spinnerWrap.appendChild(spinnerSvg);

  let outerTrackSvg: SVGSVGElement | null = null;
  if (outerBallTrack) {
    const trackSvg = document.createElementNS(SVG_NS, "svg") as SVGSVGElement;
    trackSvg.setAttribute("viewBox", viewBox);
    trackSvg.setAttribute("fill", "none");
    trackSvg.setAttribute("class", "joker-roulette-wheel__svg joker-roulette-wheel__svg--outer-track");
    trackSvg.setAttribute("aria-hidden", "true");
    trackSvg.appendChild(outerBallTrack.cloneNode(true));
    outerTrackSvg = trackSvg;
  }

  const ball = document.createElement("div");
  ball.className = "joker-roulette-wheel__ball";
  ball.setAttribute("aria-hidden", "true");
  ball.innerHTML =
    '<span class="joker-roulette-wheel__ball-shadow"></span><span class="joker-roulette-wheel__ball-orb"></span>';

  const pointerSvg = createSvgElement("svg", {
    viewBox,
    fill: "none",
    class: "joker-roulette-wheel__svg joker-roulette-wheel__svg--pointer",
    "aria-hidden": "true",
  });
  const pointerLayer = createSvgElement("g", { class: "joker-roulette-wheel__pointer-layer" });
  pointerLayer.appendChild(pointer.cloneNode(true));
  pointerSvg.appendChild(pointerLayer);

  mount.append(defsHost, staticSvg, spinnerWrap, ...(outerTrackSvg ? [outerTrackSvg] : []), ball, pointerSvg);

  return { stage: mount, spinnerWrap, ball };
}

export function syncRouletteWheelBakedStage(
  wheelRoot: HTMLElement,
  frame: Parameters<typeof applyRouletteWheelSpinFrame>[1],
  showBall: boolean,
) {
  applyRouletteWheelSpinFrame(wheelRoot, frame);
  const ball = wheelRoot.querySelector<HTMLElement>(".joker-roulette-wheel__ball");
  if (ball) {
    ball.style.visibility = showBall ? "visible" : "hidden";
  }
}

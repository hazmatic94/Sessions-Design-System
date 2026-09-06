import { findPocketUnderPointer } from "../components/RouletteWheel/rouletteWheelLayout.js";
import { rouletteWheelPointToPercent } from "../components/RouletteWheel/rouletteWheelPaths.js";
import type { RouletteSpinFrame } from "./rouletteWheelSpin.js";

const POINTER_TICK_DEG = 4;
const POINTER_TICK_DECAY = 0.86;
const POINTER_TICK_EPSILON = 0.06;

type PointerTickState = {
  pocketIndex: number | null;
  kick: number;
  pivot: { x: number; y: number } | null;
};

const pointerTickState = new WeakMap<HTMLElement, PointerTickState>();

function getPointerTickState(root: HTMLElement): PointerTickState {
  let state = pointerTickState.get(root);
  if (!state) {
    state = { pocketIndex: null, kick: 0, pivot: null };
    pointerTickState.set(root, state);
  }
  return state;
}

function resetPointerTick(root: HTMLElement) {
  const layer = root.querySelector<SVGGElement>(".joker-roulette-wheel__pointer-layer");
  layer?.removeAttribute("transform");
  pointerTickState.delete(root);
}

function updatePointerTick(root: HTMLElement, wheelRotation: number) {
  const layer = root.querySelector<SVGGElement>(".joker-roulette-wheel__pointer-layer");
  if (!layer) {
    return;
  }

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
    layer.removeAttribute("transform");
    return;
  }

  const state = getPointerTickState(root);
  const pocket = findPocketUnderPointer(wheelRotation);

  if (state.pocketIndex === null) {
    state.pocketIndex = pocket.index;
  } else if (pocket.index !== state.pocketIndex) {
    state.pocketIndex = pocket.index;
    state.kick = POINTER_TICK_DEG;
  }

  state.kick *= POINTER_TICK_DECAY;
  if (state.kick < POINTER_TICK_EPSILON) {
    state.kick = 0;
    layer.removeAttribute("transform");
    return;
  }

  if (!state.pivot) {
    const box = layer.getBBox();
    state.pivot = { x: box.x + box.width / 2, y: box.y };
  }

  layer.setAttribute(
    "transform",
    `rotate(${state.kick.toFixed(3)}, ${state.pivot.x}, ${state.pivot.y})`,
  );
}

/** Apply a spin frame directly to wheel DOM — avoids React re-renders during animation. */
export function applyRouletteWheelSpinFrame(
  root: HTMLElement,
  frame: Pick<
    RouletteSpinFrame,
    "wheelRotation" | "ballPosition" | "ballBounceScale" | "ballBounceLift"
  >,
) {
  const spinner = root.querySelector<HTMLElement>(".joker-roulette-wheel__wheel-spinner");
  spinner?.style.setProperty("--roulette-wheel-rotation", `${frame.wheelRotation}deg`);

  const ball = root.querySelector<HTMLElement>(".joker-roulette-wheel__ball");
  if (ball) {
    const position = rouletteWheelPointToPercent(frame.ballPosition);
    ball.style.left = position.left;
    ball.style.top = position.top;
    ball.style.setProperty("--roulette-ball-bounce-scale", String(frame.ballBounceScale ?? 1));
    ball.style.setProperty(
      "--roulette-ball-bounce-lift",
      `calc(var(--roulette-wheel-size) * ${frame.ballBounceLift ?? 0} / 1116)`,
    );
  }

  updatePointerTick(root, frame.wheelRotation);
}

export function resetRouletteWheelImperativeFrame(root: HTMLElement) {
  resetPointerTick(root);
}

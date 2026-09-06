import type { RouletteSpinFrame } from "./rouletteWheelSpin.js";
/** Apply a spin frame directly to wheel DOM — avoids React re-renders during animation. */
export declare function applyRouletteWheelSpinFrame(root: HTMLElement, frame: Pick<RouletteSpinFrame, "wheelRotation" | "ballPosition" | "ballBounceScale" | "ballBounceLift">): void;
export declare function resetRouletteWheelImperativeFrame(root: HTMLElement): void;
//# sourceMappingURL=rouletteWheelImperativeFrame.d.ts.map
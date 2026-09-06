import { applyRouletteWheelSpinFrame } from "../../utils/rouletteWheelImperativeFrame.js";
export type RouletteWheelBakedAssembly = {
    stage: HTMLDivElement;
    spinnerWrap: HTMLDivElement;
    ball: HTMLDivElement;
};
/** Split a baked wheel SVG into the layered stage DOM used by spin + imperative frames. */
export declare function assembleRouletteWheelBakedStage(svgMarkup: string, mount: HTMLDivElement): RouletteWheelBakedAssembly | null;
export declare function syncRouletteWheelBakedStage(wheelRoot: HTMLElement, frame: Parameters<typeof applyRouletteWheelSpinFrame>[1], showBall: boolean): void;
//# sourceMappingURL=rouletteWheelBakedAssembly.d.ts.map
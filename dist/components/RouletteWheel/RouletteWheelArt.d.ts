import type { ReactNode } from "react";
import type { RouletteWheelArtProps } from "./RouletteWheel.types";
export declare function RouletteWheelStage({ wheelRotation, ballPosition, ballBounceScale, ballBounceLift, showBall, showDebugVisual, targetPocket, theme, children, className, style, }: RouletteWheelArtProps): import("react").JSX.Element;
/** @deprecated Use `RouletteWheelStage` */
export declare const RouletteWheelArt: typeof RouletteWheelStage;
export { WheelSpinner, Rotor } from "./layers/WheelSpinner";
export declare function RouletteWheelAssembly({ children, wheelRotation, }: {
    children?: ReactNode;
    wheelRotation?: number;
}): string | number | boolean | Iterable<ReactNode> | import("react").JSX.Element;
//# sourceMappingURL=RouletteWheelArt.d.ts.map
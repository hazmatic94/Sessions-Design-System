import type { RouletteSpinSnapshot } from "./rouletteWheelLayout";
export type RouletteWheelDebugOverlayProps = {
    snapshot: RouletteSpinSnapshot | null;
    wheelRotation?: number;
    ballPosition?: {
        x: number;
        y: number;
    } | null;
    spinProgress?: number;
    className?: string;
};
export declare function RouletteWheelDebugOverlay({ snapshot, wheelRotation, ballPosition, spinProgress, className, }: RouletteWheelDebugOverlayProps): import("react").JSX.Element | null;
//# sourceMappingURL=RouletteWheelDebugOverlay.d.ts.map
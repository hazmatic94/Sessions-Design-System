import type { RouletteNumber } from "./rouletteWheelLayout";
import type { RouletteWheelProps } from "./RouletteWheel.types";
export type RouletteWheelAnimatedProps = Omit<RouletteWheelProps, "wheelRotation" | "ballPosition" | "ballBounceScale" | "ballBounceLift" | "showBall" | "targetPocket"> & {
    spinDurationMs?: number;
    /** Play the wheel spin sound for the duration of the animation. Defaults to true. */
    soundEnabled?: boolean;
    onSpinComplete?: (resultNumber: RouletteNumber) => void;
    showSpinButton?: boolean;
    spinButtonLabel?: string;
    /** Temporary mapping audit overlay — remove once alignment is verified. */
    showDebugOverlay?: boolean;
    /**
     * Stretch to the parent container — 40px top animation inset, wheel top-center below it.
     * Place inside any sized box; overflow crops naturally by aspect ratio.
     */
    fillContainer?: boolean;
    /** Top animation inset when `fillContainer` — defaults to 40px. */
    insetTop?: number;
};
export declare function RouletteWheelAnimated({ size, spinDurationMs, soundEnabled, onSpinComplete, showSpinButton, spinButtonLabel, showDebugOverlay, fillContainer, insetTop, className, style, ...props }: RouletteWheelAnimatedProps): import("react").JSX.Element;
//# sourceMappingURL=RouletteWheelAnimated.d.ts.map
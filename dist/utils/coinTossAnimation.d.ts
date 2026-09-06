export function getCoinTossLaunchDelayMs(durationMs?: number): number;
/**
 * Six-phase toss curve:
 * 1. compress  2. launch  3. fast spin  4. slow final  5. landing  6. settle
 */
export function sampleCoinTossFrame(progress: any, options: any): {
    progress: number;
    translateY: number;
    scaleX: number;
    scaleY: number;
    rotateX: any;
    rotateZ: number;
    shadowScale: any;
    shadowOpacity: number;
    shadowBlur: number;
    specularShift: number;
    specularOpacity: number;
    motionBlur: number;
};
export function computeTossEndRotation(startDeg: any, outcome: any): any;
export function normalizeTossRestRotation(outcome: any): 0 | 180;
export function createTossTiltZ(): number;
export function runCoinTossAnimation(options: any): Promise<any>;
export function getVisibleTossSide(rotateXDeg: any): "heads" | "tails";
export const COIN_TOSS_DURATION_MS: 1080;
/** Progress where compress ends and the coin launches upward. */
export const COIN_TOSS_LAUNCH_PROGRESS: 0.065;
//# sourceMappingURL=coinTossAnimation.d.ts.map
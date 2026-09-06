export declare const ROULETTE_WHEEL_VIEWBOX: {
    readonly minX: 0;
    readonly minY: 15;
    readonly width: 1116;
    readonly height: 1162;
};
/** Pointer triangle extends above the wheel bbox — nudge the wheel down so the tip clears the crop edge. */
export declare const ROULETTE_WHEEL_POINTER_BLEED_RATIO: number;
/** Canonical rendered wheel width in px. */
export declare const ROULETTE_WHEEL_NATIVE_WIDTH = 1111;
/** Canonical rendered wheel height in px. */
export declare const ROULETTE_WHEEL_NATIVE_HEIGHT = 1162;
/** Default native wheel size for `fillContainer` game canvases. */
export declare const ROULETTE_WHEEL_FILL_CONTAINER_SIZE = 1111;
/** Top padding inside the game canvas above the viewport crop. */
export declare const ROULETTE_WHEEL_VIEWPORT_AREA_INSET_TOP = 40;
export declare function rouletteWheelPointerBleedPx(size: number): number;
export declare function rouletteWheelRenderHeightPx(size: number): number;
export declare function snapRouletteWheelDisplaySize(size: number): number;
export declare function rouletteWheelViewBoxAttribute(): string;
export declare function rouletteWheelPointToPercent(point: {
    x: number;
    y: number;
}): {
    left: string;
    top: string;
};
export declare function rouletteWheelSpinOriginPercent(): {
    left: string;
    top: string;
};
export declare const ROULETTE_WHEEL_CENTER: {
    readonly x: 557.611;
    readonly y: 595.611;
};
export declare const ROULETTE_BOWL_CENTER: {
    readonly x: 557.611;
    readonly y: 595.611;
};
export declare const ROULETTE_BOWL_RADIUS = 300.16;
export declare const ROULETTE_OUTER_RADIUS = 547.611;
export declare const ROULETTE_BALL_TRACK_RADIUS = 318;
export declare const ROULETTE_POCKET_RED_PATHS: string[];
export declare const ROULETTE_POCKET_BLACK_PATHS: string[];
export declare const ROULETTE_POCKET_GREEN_PATHS: string[];
export declare const ROULETTE_NUMBER_PATHS: string[];
export declare const ROULETTE_POINTER_WIDTH = 91;
export declare const ROULETTE_POINTER_HEIGHT = 75.4;
export declare const ROULETTE_POINTER_CORNER_RADIUS = 14;
export declare const ROULETTE_POINTER_BORDER_WIDTH = 6;
export declare const ROULETTE_POINTER_OFFSET_Y = -20;
export type RoulettePointerPaths = {
    backing: string;
    body: string;
};
export declare function buildRoulettePointerBodyPath(cx: number, cy: number, outerRadius: number): string;
/** @deprecated Use `buildRoulettePointerBodyPath` */
export declare function buildRoulettePointerPaths(cx: number, cy: number, outerRadius: number): RoulettePointerPaths;
export declare const ROULETTE_POINTER_BODY_PATH: string;
//# sourceMappingURL=rouletteWheelPaths.d.ts.map
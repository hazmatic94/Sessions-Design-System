export function setupSeamlessVideoLoop(primaryVideo: any, { container, readyKey, activeClass, standbyClass, deferPlayback, }?: {
    container?: any;
    readyKey?: string | undefined;
    activeClass?: string | undefined;
    standbyClass?: string | undefined;
    deferPlayback?: boolean | undefined;
}): {
    getActive: () => any;
    destroy(): void;
    start?: undefined;
} | {
    getActive: () => any;
    start(): void;
    destroy(): void;
};
//# sourceMappingURL=seamlessVideoLoop.d.ts.map
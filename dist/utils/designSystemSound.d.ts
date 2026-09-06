/** SSR-safe one-shot playback — fails silently when autoplay is blocked or the asset is missing. */
export declare function playDesignSystemSound(src: string): void;
/** Resolve a sound file relative to `dist/utils/` — works when bundled by Vite/webpack in GameShell. */
export declare function designSystemSoundUrl(relativeAssetPath: string): string;
//# sourceMappingURL=designSystemSound.d.ts.map
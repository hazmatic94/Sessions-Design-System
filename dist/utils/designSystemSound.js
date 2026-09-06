/** SSR-safe one-shot playback — fails silently when autoplay is blocked or the asset is missing. */
export function playDesignSystemSound(src) {
    if (typeof window === "undefined" || !src) {
        return;
    }
    const audio = new Audio(src);
    audio.play().catch(() => { });
}
/** Resolve a sound file relative to `dist/utils/` — works when bundled by Vite/webpack in GameShell. */
export function designSystemSoundUrl(relativeAssetPath) {
    return new URL(relativeAssetPath, import.meta.url).href;
}

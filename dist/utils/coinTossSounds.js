import { DESIGN_SYSTEM_SOUND_URLS } from "./designSystemSoundAssets.js";
import { playDesignSystemSound } from "./designSystemSound.js";
export function playCoinWhooshSound() {
    playDesignSystemSound(DESIGN_SYSTEM_SOUND_URLS.coinWhoosh);
}
export function playCoinFlipSound() {
    playDesignSystemSound(DESIGN_SYSTEM_SOUND_URLS.coinFlip);
}

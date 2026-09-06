import { DESIGN_SYSTEM_SOUND_URLS } from "./designSystemSoundAssets.js";
import { playDesignSystemSound } from "./designSystemSound.js";
export function playBombSound() {
    playDesignSystemSound(DESIGN_SYSTEM_SOUND_URLS.bomb);
}
export function playMineClickSound() {
    playDesignSystemSound(DESIGN_SYSTEM_SOUND_URLS.mineClick);
}
export function playShieldSound() {
    playDesignSystemSound(DESIGN_SYSTEM_SOUND_URLS.shield);
}
export function playMineGoldSound() {
    playDesignSystemSound(DESIGN_SYSTEM_SOUND_URLS.mineGold);
}

import { DESIGN_SYSTEM_SOUND_URLS } from "./designSystemSoundAssets.js";
import { playDesignSystemSound } from "./designSystemSound.js";
/** Win sting when the coin locks into the receiver. */
export function playCoinReceiverWinSound() {
    playDesignSystemSound(DESIGN_SYSTEM_SOUND_URLS.winStreak);
}
/** Game over sting when the receiver enters the loss state. */
export function playCoinReceiverLossSound() {
    playDesignSystemSound(DESIGN_SYSTEM_SOUND_URLS.gameOver);
}
/** @deprecated Use playCoinReceiverWinSound */
export function playCoinLockClink() {
    playCoinReceiverWinSound();
}

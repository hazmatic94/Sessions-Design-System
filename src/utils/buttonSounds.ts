import { DESIGN_SYSTEM_SOUND_URLS } from "./designSystemSoundAssets.js";
import { playDesignSystemSound } from "./designSystemSound.js";

export function playButtonClickSound() {
  playDesignSystemSound(DESIGN_SYSTEM_SOUND_URLS.buttonClick);
}

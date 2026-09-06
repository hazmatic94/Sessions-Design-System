import { designSystemSoundUrl } from "./designSystemSound.js";

/** Stable URLs for every packaged sound — use for preload in GameShell if needed. */
export const DESIGN_SYSTEM_SOUND_URLS = {
  bomb: designSystemSoundUrl("../../assets/bomb.mp3"),
  buttonClick: designSystemSoundUrl("../../assets/buttonClick.mp3"),
  coinFlip: designSystemSoundUrl("../../assets/coinFlip.mp3"),
  coinWhoosh: designSystemSoundUrl("../../assets/coinWhoosh.mp3"),
  gameOver: designSystemSoundUrl("../../assets/gameOver.mp3"),
  mineClick: designSystemSoundUrl("../../assets/mineClick.mp3"),
  mineGold: designSystemSoundUrl("../../assets/mineGold.mp3"),
  rouletteWheelRoll: designSystemSoundUrl("../../assets/roulette-wheel-roll.mp3"),
  rouletteMarbleBounce: designSystemSoundUrl("../../assets/roulette-marble-bounce.mp3"),
  shield: designSystemSoundUrl("../../assets/shield.mp3"),
  winStreak: designSystemSoundUrl("../../assets/winStreak.mp3"),
} as const;

export type DesignSystemSoundName = keyof typeof DESIGN_SYSTEM_SOUND_URLS;

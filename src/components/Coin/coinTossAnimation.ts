export type CoinTossOutcome = "heads" | "tails";

export type CoinTossAnimationOptions = {
  durationMs?: number;
  startRotateX: number;
  endRotateX: number;
  tiltZ: number;
  liftPx: number;
  onUpdate: (frame: CoinTossFrame) => void;
};

export type CoinTossFrame = {
  progress: number;
  translateY: number;
  scaleX: number;
  scaleY: number;
  rotateX: number;
  rotateZ: number;
  shadowScale: number;
  shadowOpacity: number;
  shadowBlur: number;
  specularShift: number;
  specularOpacity: number;
  motionBlur: number;
};

export {
  COIN_TOSS_DURATION_MS,
  COIN_TOSS_LAUNCH_PROGRESS,
  computeTossEndRotation,
  createTossTiltZ,
  getCoinTossLaunchDelayMs,
  getVisibleTossSide,
  normalizeTossRestRotation,
  runCoinTossAnimation,
  sampleCoinTossFrame,
} from "../../utils/coinTossAnimation.js";

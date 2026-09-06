import { DESIGN_SYSTEM_SOUND_URLS } from "./designSystemSoundAssets.js";
import { ROULETTE_SPIN_DURATION_MS, ROULETTE_WHEEL_SETTLING_START_PROGRESS, } from "./rouletteWheelSpin.js";
import { startRouletteRollPingPong } from "./rouletteWheelRollPlayback.js";
let activeRollStop = null;
let activeBounceAudio = null;
let settlingTimer = null;
let playbackGeneration = 0;
function clearSettlingTimer() {
    if (settlingTimer != null) {
        window.clearTimeout(settlingTimer);
        settlingTimer = null;
    }
}
function stopActiveRoll() {
    activeRollStop?.();
    activeRollStop = null;
}
function playRouletteMarbleBounceSound() {
    if (typeof window === "undefined") {
        return;
    }
    const bounce = new Audio(DESIGN_SYSTEM_SOUND_URLS.rouletteMarbleBounce);
    activeBounceAudio = bounce;
    bounce.play().catch(() => { });
    bounce.addEventListener("ended", () => {
        if (activeBounceAudio === bounce) {
            activeBounceAudio = null;
        }
    }, { once: true });
}
export function stopRouletteWheelSpinSound() {
    playbackGeneration += 1;
    clearSettlingTimer();
    stopActiveRoll();
    if (activeBounceAudio) {
        activeBounceAudio.pause();
        activeBounceAudio.currentTime = 0;
        activeBounceAudio = null;
    }
}
/** Ping-pong the roll (first half, reversed second half), then marble bounce on settle. */
export function playRouletteWheelSpinSound(durationMs = ROULETTE_SPIN_DURATION_MS, settlingStartProgress = ROULETTE_WHEEL_SETTLING_START_PROGRESS) {
    if (typeof window === "undefined") {
        return;
    }
    stopRouletteWheelSpinSound();
    const generation = playbackGeneration;
    void startRouletteRollPingPong(DESIGN_SYSTEM_SOUND_URLS.rouletteWheelRoll).then((stopRoll) => {
        if (!stopRoll || generation !== playbackGeneration) {
            stopRoll?.();
            return;
        }
        activeRollStop = stopRoll;
    });
    const rollDurationMs = Math.max(0, Math.round(durationMs * settlingStartProgress));
    settlingTimer = window.setTimeout(() => {
        settlingTimer = null;
        if (generation !== playbackGeneration) {
            return;
        }
        stopActiveRoll();
        playRouletteMarbleBounceSound();
    }, rollDurationMs);
}

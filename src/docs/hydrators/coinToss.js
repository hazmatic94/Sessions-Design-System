import {
  computeTossEndRotation,
  createTossTiltZ,
  getCoinTossLaunchDelayMs,
  normalizeTossRestRotation,
  runCoinTossAnimation,
} from "../../utils/coinTossAnimation.js?v=coin-flip-sounds-v2";
import { burstCoinTossParticles } from "../../utils/coinTossParticles.js?v=coin-flip-sounds-v2";
import { startCoinTossRingAmbient } from "../../utils/coinTossRingParticles.js?v=betting-panel-states";
import { playDocsSound } from "../demo/sounds.js";

const COIN_WHOOSH_SOUND = "./assets/coinWhoosh.mp3?v=coin-flip-sounds-v2";
const COIN_FLIP_SOUND = "./assets/coinFlip.mp3?v=coin-flip-sounds-v2";
const COIN_TOSS_ANIMATION_MS = 980;

export function applyCoinTossFrame(motionEl, coinEl, shadowEl, frame, coinSizePx) {
  if (motionEl) {
    motionEl.style.setProperty("--coin-toss-translate-y", `${frame.translateY}px`);
    motionEl.style.setProperty("--coin-toss-scale-x", String(frame.scaleX));
    motionEl.style.setProperty("--coin-toss-scale-y", String(frame.scaleY));
    motionEl.style.setProperty("--coin-toss-motion-blur", String(frame.motionBlur ?? 0));
  }

  if (coinEl) {
    coinEl.style.setProperty("--coin-toss-rotate-x", `${frame.rotateX}deg`);
    coinEl.style.setProperty("--coin-toss-rotate-z", `${frame.rotateZ}deg`);
    coinEl.style.setProperty("--coin-toss-specular-shift", `${frame.specularShift}%`);
    coinEl.style.setProperty("--coin-toss-specular-opacity", String(frame.specularOpacity));
  }

  if (shadowEl) {
    shadowEl.style.setProperty("--coin-toss-shadow-scale", String(frame.shadowScale));
    shadowEl.style.setProperty("--coin-toss-shadow-opacity", String(frame.shadowOpacity));
    shadowEl.style.setProperty("--coin-toss-shadow-blur", String(frame.shadowBlur));
  }
}

export function hydrateCoinTossDemos(root = document) {
  root.querySelectorAll("[data-coin-toss-demo]").forEach((demo) => {
    if (demo.dataset.coinTossBound === "true") return;
    demo.dataset.coinTossBound = "true";

    const playfield = demo.querySelector("[data-coin-toss-playfield]") || demo.querySelector("[data-coin-toss-stage]");
    const arena = demo.querySelector("[data-coin-toss-arena]") || playfield?.parentElement;
    const stage = demo.querySelector("[data-coin-toss-stage]");
    const motionEl = demo.querySelector("[data-coin-toss-motion]");
    const coinEl = demo.querySelector("[data-coin-toss-coin]");
    const shadowEl = demo.querySelector("[data-coin-toss-shadow]");
    const trigger = demo.querySelector("[data-coin-toss-trigger]");
    const particlesEl = demo.querySelector("[data-coin-toss-particles]");
    const ringParticlesEl = demo.querySelector("[data-coin-toss-ring-particles]");

    if (!playfield || !stage || !motionEl || !coinEl || !shadowEl || !trigger) return;

    const hintEl = demo.querySelector("[data-coin-toss-hint]");

    const coinSizePx = Number.parseFloat(
      getComputedStyle(arena || playfield).getPropertyValue("--coin-size").replace("px", ""),
    ) || 256;
    const stageSizePx = Number.parseFloat(
      getComputedStyle(arena || playfield).getPropertyValue("--coin-toss-stage-size").replace("px", ""),
    ) || coinSizePx;
    const stopRingAmbient = ringParticlesEl
      ? startCoinTossRingAmbient(ringParticlesEl, stageSizePx, coinSizePx)
      : () => {};
    demo.dataset.coinTossRingAmbientStop = "bound";
    demo._stopCoinTossRingAmbient = stopRingAmbient;
    const liftPx = Math.round(coinSizePx * 0.47);
    let rotation = 0;
    let tossing = false;

    const setHintVisible = (visible) => {
      hintEl?.classList.toggle("is-faded", !visible);
    };

    const restFrame = {
      progress: 1,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
      rotateX: rotation,
      rotateZ: 0,
      shadowScale: 1,
      shadowOpacity: 0,
      shadowBlur: 1,
      specularShift: 0,
      specularOpacity: 0,
      motionBlur: 0,
    };

    applyCoinTossFrame(motionEl, coinEl, shadowEl, restFrame, coinSizePx);

    const flipCoin = async () => {
      if (tossing) return;

      tossing = true;
      trigger.disabled = true;
      playfield.classList.add("is-tossing");
      motionEl.classList.add("is-tossing");
      coinEl.classList.add("is-tossing");
      setHintVisible(false);
      playDocsSound(COIN_WHOOSH_SOUND);
      burstCoinTossParticles(particlesEl, coinSizePx);

      const landingSide = Math.random() > 0.5 ? "heads" : "tails";
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const startRotateX = rotation;
      const endRotateX = computeTossEndRotation(startRotateX, landingSide);
      const tiltZ = createTossTiltZ();
      const flipSoundDelayMs = getCoinTossLaunchDelayMs(COIN_TOSS_ANIMATION_MS);
      const flipSoundTimer = window.setTimeout(() => {
        playDocsSound(COIN_FLIP_SOUND);
      }, flipSoundDelayMs);

      if (reducedMotion) {
        rotation = normalizeTossRestRotation(landingSide);
        applyCoinTossFrame(motionEl, coinEl, shadowEl, {
          ...restFrame,
          rotateX: rotation,
        }, coinSizePx);
      } else {
        await runCoinTossAnimation({
          durationMs: COIN_TOSS_ANIMATION_MS,
          startRotateX,
          endRotateX,
          tiltZ,
          liftPx,
          onUpdate: (frame) => {
            applyCoinTossFrame(motionEl, coinEl, shadowEl, frame, coinSizePx);
          },
        });
        rotation = normalizeTossRestRotation(landingSide);
        applyCoinTossFrame(motionEl, coinEl, shadowEl, {
          ...restFrame,
          rotateX: rotation,
        }, coinSizePx);
      }

      window.clearTimeout(flipSoundTimer);

      motionEl.classList.remove("is-tossing");
      coinEl.classList.remove("is-tossing");
      playfield.classList.remove("is-tossing");
      tossing = false;
      trigger.disabled = false;
      setHintVisible(true);
    };

    trigger.addEventListener("click", flipCoin);
  });
}

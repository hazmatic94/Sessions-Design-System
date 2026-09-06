import { playDocsSound } from "../demo/sounds.js";

const COIN_RECEIVER_WIN_SOUND = "./assets/winStreak.mp3?v=receiver-loss-v1";
const COIN_RECEIVER_CLINK_AT_MS = 120;
const COIN_RECEIVER_SEAL_AT_MS = 520;
const COIN_RECEIVER_LOCK_TOTAL_MS = 1920;
const COIN_RECEIVER_LOSS_PRESS_MS = 140;
const COIN_RECEIVER_LOSS_FLASH_MS = 100;
const COIN_RECEIVER_LOSS_DUST_MS = 480;
const COIN_RECEIVER_LOSS_CHARCOAL_MS = 380;
const COIN_RECEIVER_LOSS_SETTLE_MS = 480;
const COIN_RECEIVER_LOSS_SETTLE_AT_MS =
  COIN_RECEIVER_LOSS_PRESS_MS +
  COIN_RECEIVER_LOSS_FLASH_MS +
  COIN_RECEIVER_LOSS_DUST_MS +
  COIN_RECEIVER_LOSS_CHARCOAL_MS;
const COIN_RECEIVER_LOSS_TOTAL_MS = COIN_RECEIVER_LOSS_SETTLE_AT_MS + COIN_RECEIVER_LOSS_SETTLE_MS;

const COIN_RECEIVER_LOSS_PHASE_CLASSES = [
  "is-loss-pressing",
  "is-loss-flashing",
  "is-loss-splitting",
  "is-loss-split",
  "is-loss-charcoal",
  "is-loss-settling",
  "is-loss-behind-bowl",
  "is-loss-rim",
  "is-loss-animating",
];

function resetProgressionState(steps) {
  steps.forEach((step) => {
    const receiver = step.querySelector(".joker-coin-receiver");
    receiver?.classList.remove("is-chip-rising", "is-locking", "is-sealed", "is-celebrating");
  });
}

export function hydrateCoinProgressionDemos(root = document) {
  root.querySelectorAll("[data-coin-progression-demo]").forEach((demo) => {
    if (demo.dataset.coinProgressionBound === "true") return;
    demo.dataset.coinProgressionBound = "true";

    const steps = [...demo.querySelectorAll("[data-coin-progression-step]")];
    const demoButton = demo.querySelector("[data-coin-progression-demo-trigger]");
    const coinTemplate = demo.querySelector("[data-coin-progression-coin-template]");

    if (!steps.length || !demoButton || !coinTemplate) return;

    let activeIndex = steps.length;
    let completedThrough = steps.length - 1;
    let locking = false;

    const createCoinNode = () => coinTemplate.content.firstElementChild.cloneNode(true);

    const stepState = (index) => {
      if (index <= completedThrough) return "completed";
      if (index === activeIndex) return "active";
      return "inactive";
    };

    const render = () => {
      steps.forEach((step, index) => {
        const state = stepState(index);
        const receiver = step.querySelector(".joker-coin-receiver");
        const mount = step.querySelector(".joker-coin-receiver__mount");
        const chip = step.querySelector(".joker-roulette-win-chip__multiplier");
        const multiplier = chip?.textContent?.trim() ?? "";

        step.classList.toggle("is-completed", state === "completed");
        step.classList.toggle("is-active", state === "active");
        step.classList.toggle("is-locking", locking && index === activeIndex);

        const winChip = step.querySelector(".joker-roulette-win-chip");
        if (winChip) {
          winChip.classList.toggle("is-settled", state === "completed");
          winChip.classList.toggle("is-playing", locking && index === activeIndex);
          winChip.hidden = !(state === "completed" || (locking && index === activeIndex));
        }

        if (receiver) {
          receiver.classList.remove(
            "is-inactive",
            "is-active",
            "is-completed",
            "is-chip-rising",
            "is-locking",
          );
          receiver.classList.add(`is-${state}`);
          if (state === "completed") {
            receiver.classList.add("is-sealed");
          } else {
            receiver.classList.remove("is-sealed");
          }
        }

        if (chip) {
          chip.className = "joker-chip joker-chip--win joker-roulette-win-chip__multiplier";
          chip.textContent = multiplier;
        }

        if (!mount) return;

        const shouldShowCoin = state === "completed" || (locking && index === activeIndex);
        if (shouldShowCoin && !mount.querySelector(".joker-coin-receiver__coin-intact .joker-coin")) {
          mount.replaceChildren(createCoinNode());
        }
        if (!shouldShowCoin) {
          mount.replaceChildren();
        }
      });

      demoButton.disabled = locking;
    };

    const runLockAnimation = (receiver, chip) => {
      receiver.classList.add("is-locking", "is-chip-rising");
      window.setTimeout(() => playDocsSound(COIN_RECEIVER_WIN_SOUND), COIN_RECEIVER_CLINK_AT_MS);
      if (chip) {
        chip.className = "joker-chip joker-chip--win joker-roulette-win-chip__multiplier";
      }
      window.setTimeout(() => {
        receiver.classList.remove("is-chip-rising", "is-locking");
        receiver.classList.add("is-sealed", "is-celebrating");
      }, COIN_RECEIVER_SEAL_AT_MS);
      window.setTimeout(() => {
        receiver.classList.remove("is-celebrating");
      }, COIN_RECEIVER_LOCK_TOTAL_MS);
    };

    const lockStep = (index) => {
      const step = steps[index];
      const receiver = step?.querySelector(".joker-coin-receiver");
      const mount = step?.querySelector(".joker-coin-receiver__mount");
      const chip = step?.querySelector(".joker-roulette-win-chip__multiplier");
      if (!receiver || !mount) return;

      locking = true;
      activeIndex = index;
      render();
      mount.replaceChildren(createCoinNode());
      runLockAnimation(receiver, chip);

      window.setTimeout(() => {
        const nextIndex = index + 1;
        if (nextIndex >= steps.length) {
          completedThrough = steps.length - 1;
          activeIndex = steps.length;
          locking = false;
          render();
          return;
        }

        completedThrough = index;
        lockStep(nextIndex);
      }, COIN_RECEIVER_LOCK_TOTAL_MS);
    };

    demoButton.addEventListener("click", () => {
      if (locking) return;
      activeIndex = 0;
      completedThrough = -1;
      resetProgressionState(steps);
      lockStep(0);
    });

    render();
  });
}

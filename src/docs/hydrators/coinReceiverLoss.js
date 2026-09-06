import {
  resetCoinReceiverSplit,
  setCoinReceiverSplitResting,
} from "../../utils/coinReceiverSplit.js?v=receiver-loss-v1";
import { playDocsSound } from "../demo/sounds.js";

const COIN_RECEIVER_LOSS_SOUND = "./assets/gameOver.mp3?v=receiver-loss-v1";

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
const COIN_RECEIVER_LOSS_RESET_DELAY_MS = 600;

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

export function hydrateCoinReceiverLossDemos(root = document) {
  root.querySelectorAll("[data-coin-receiver-loss-demo]").forEach((demo) => {
    if (demo.dataset.coinReceiverLossBound === "true") return;
    demo.dataset.coinReceiverLossBound = "true";

    const receiver = demo.querySelector(".joker-coin-receiver");
    const demoButton = demo.querySelector("[data-coin-receiver-loss-demo-trigger]");
    if (!receiver || !demoButton) return;

    const mount = receiver.querySelector(".joker-coin-receiver__mount");
    let playing = false;

    receiver.style.setProperty("--coin-receiver-loss-press-ms", `${COIN_RECEIVER_LOSS_PRESS_MS}ms`);
    receiver.style.setProperty("--coin-receiver-loss-flash-ms", `${COIN_RECEIVER_LOSS_FLASH_MS}ms`);
    receiver.style.setProperty("--coin-receiver-loss-dust-ms", `${COIN_RECEIVER_LOSS_DUST_MS}ms`);
    receiver.style.setProperty("--coin-receiver-loss-charcoal-ms", `${COIN_RECEIVER_LOSS_CHARCOAL_MS}ms`);
    receiver.style.setProperty("--coin-receiver-loss-settle-ms", `${COIN_RECEIVER_LOSS_SETTLE_MS}ms`);

    const resetReceiver = () => {
      playing = false;
      resetCoinReceiverSplit(mount);
      receiver.classList.remove(
        "is-loss",
        "is-loss-sealed",
        "is-losing",
        ...COIN_RECEIVER_LOSS_PHASE_CLASSES,
        "is-active",
        "is-inactive",
        "is-completed",
        "is-sealed",
      );
      receiver.classList.add("is-active");
      demoButton.disabled = false;
    };

    const runLossAnimation = () => {
      if (playing) return;
      playing = true;
      demoButton.disabled = true;

      resetCoinReceiverSplit(mount);
      receiver.classList.remove("is-loss", "is-loss-sealed", "is-completed", "is-sealed", ...COIN_RECEIVER_LOSS_PHASE_CLASSES);
      receiver.classList.add("is-active", "is-losing", "is-loss-animating", "is-loss-pressing", "is-loss-rim");
      playDocsSound(COIN_RECEIVER_LOSS_SOUND);

      window.setTimeout(() => {
        receiver.classList.remove("is-loss-pressing");
        receiver.classList.add("is-loss-flashing");
      }, COIN_RECEIVER_LOSS_PRESS_MS);

      window.setTimeout(() => {
        receiver.classList.remove("is-loss-flashing");
        receiver.classList.add("is-loss-splitting");
      }, COIN_RECEIVER_LOSS_PRESS_MS + COIN_RECEIVER_LOSS_FLASH_MS);

      window.setTimeout(() => {
        receiver.classList.remove("is-loss-splitting");
        receiver.classList.add("is-loss-split", "is-loss-charcoal", "is-loss-behind-bowl");
      }, COIN_RECEIVER_LOSS_PRESS_MS + COIN_RECEIVER_LOSS_FLASH_MS + COIN_RECEIVER_LOSS_DUST_MS);

      window.setTimeout(() => {
        receiver.classList.remove("is-loss-charcoal");
        receiver.classList.add("is-loss-settling");
      }, COIN_RECEIVER_LOSS_SETTLE_AT_MS);

      window.setTimeout(() => {
        receiver.classList.remove(
          "is-losing",
          "is-loss-animating",
          "is-loss-settling",
          "is-active",
          "is-loss-splitting",
          "is-loss-split",
          "is-loss-behind-bowl",
          "is-loss-rim",
        );
        receiver.classList.add("is-loss", "is-loss-sealed");
        setCoinReceiverSplitResting(mount);
        window.setTimeout(resetReceiver, COIN_RECEIVER_LOSS_RESET_DELAY_MS);
      }, COIN_RECEIVER_LOSS_TOTAL_MS);
    };

    demoButton.addEventListener("click", runLossAnimation);
    resetReceiver();
  });

  root.querySelectorAll(".joker-coin-receiver.is-loss.is-loss-sealed .joker-coin-receiver__mount").forEach((mount) => {
    setCoinReceiverSplitResting(mount);
  });
}

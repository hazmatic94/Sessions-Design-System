import { createRouletteWinChipNode, playRouletteWinChip } from "./rouletteWinChipDom.js";

const DEMO_VERSION = "win-streak-row-v2";
const STAGGER_MS = 220;

const SAMPLE_WINS = [
  { betColor: "red", multiplier: "3.00x" },
  { betColor: "black", multiplier: "8.00x" },
  { betColor: "green", multiplier: "2.00x" },
  { betColor: "red", multiplier: "5.00x" },
  { betColor: "black", multiplier: "10.00x" },
];

export function mountWinStreakRowDemo(mount) {
  if (mount.dataset.hydrated === DEMO_VERSION) {
    return;
  }

  mount.dataset.hydrated = DEMO_VERSION;
  mount.innerHTML = `
    <div class="joker-win-streak-row" style="--win-streak-row-gap: 8px; --win-streak-row-chip-size: 88px;">
      <ol class="joker-win-streak-row__track" aria-label="5 win streak">
        ${SAMPLE_WINS.map(
          () => `<li class="joker-win-streak-row__slot" aria-hidden="true"></li>`,
        ).join("")}
      </ol>
    </div>
  `;

  const slots = [...mount.querySelectorAll(".joker-win-streak-row__slot")];
  slots.forEach((slot, index) => {
    window.setTimeout(() => {
      const win = SAMPLE_WINS[index];
      const chip = createRouletteWinChipNode({
        betColor: win.betColor,
        multiplier: win.multiplier,
      });

      slot.replaceChildren(chip);
      slot.removeAttribute("aria-hidden");
      playRouletteWinChip(chip, { settle: true });
    }, index * STAGGER_MS);
  });
}

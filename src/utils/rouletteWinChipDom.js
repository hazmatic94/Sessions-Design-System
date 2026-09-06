export const ROULETTE_WIN_CHIP_ENTER_MS = 480;
export const ROULETTE_WIN_CHIP_MULTIPLIER_POP_MS = 400;
export const ROULETTE_WIN_CHIP_RING_ENTER_MS = 320;
export const ROULETTE_WIN_CHIP_PLAYBACK_MS =
  ROULETTE_WIN_CHIP_ENTER_MS + ROULETTE_WIN_CHIP_MULTIPLIER_POP_MS + ROULETTE_WIN_CHIP_RING_ENTER_MS;

function rouletteChipMarkup(color) {
  return `
    <div class="joker-roulette-chip joker-roulette-chip--${color} joker-roulette-win-chip__chip" data-color="${color}" aria-hidden="true">
      <span class="joker-roulette-chip__disc" aria-hidden="true"></span>
      <span class="joker-roulette-chip__face" aria-hidden="true"></span>
      <span class="joker-roulette-chip__center" aria-hidden="true"></span>
    </div>`;
}

export function createRouletteWinChipNode({ betColor, multiplier, size = 88 }) {
  const root = document.createElement("div");
  root.className = "joker-roulette-win-chip";
  root.style.setProperty("--roulette-win-chip-size", `${size}px`);
  root.style.setProperty("--roulette-win-chip-enter-duration", `${ROULETTE_WIN_CHIP_ENTER_MS}ms`);
  root.style.setProperty("--roulette-win-chip-pop-duration", `${ROULETTE_WIN_CHIP_MULTIPLIER_POP_MS}ms`);
  root.style.setProperty("--roulette-win-chip-ring-enter-duration", `${ROULETTE_WIN_CHIP_RING_ENTER_MS}ms`);
  root.style.setProperty("--roulette-win-chip-pop-delay", `${ROULETTE_WIN_CHIP_ENTER_MS}ms`);
  root.style.setProperty(
    "--roulette-win-chip-ring-delay",
    `${ROULETTE_WIN_CHIP_ENTER_MS + ROULETTE_WIN_CHIP_MULTIPLIER_POP_MS}ms`,
  );
  root.dataset.betColor = betColor;
  root.setAttribute("aria-hidden", "true");

  root.innerHTML = `
    <div class="joker-roulette-win-chip__receiver">
      <div class="joker-roulette-win-chip__ring-fx" aria-hidden="true">
        <div class="joker-roulette-win-chip__active-glow"></div>
        <div class="joker-roulette-win-chip__active-sweep"></div>
      </div>
      <div class="joker-roulette-win-chip__icon" aria-hidden="true">
        ${rouletteChipMarkup(betColor)}
      </div>
    </div>
    <span class="joker-chip joker-chip--win joker-roulette-win-chip__multiplier">${multiplier}</span>
  `;

  return root;
}

export function playRouletteWinChip(chipNode, { settle = false } = {}) {
  chipNode.classList.remove("is-settled", "is-playing");
  void chipNode.offsetWidth;
  window.requestAnimationFrame(() => {
    chipNode.classList.add("is-playing");

    if (!settle) {
      return;
    }

    window.setTimeout(() => {
      chipNode.classList.remove("is-playing");
      chipNode.classList.add("is-settled");
    }, ROULETTE_WIN_CHIP_PLAYBACK_MS);
  });
}

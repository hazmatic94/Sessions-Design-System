import { playDocsSound } from "./sounds.js";

const MINE_GOLD_SOUND = "./assets/mineGold.mp3?v=win-tile-sounds-v1";

export function revealDocsWinStyleTile(tile, prefix) {
  const particles = tile.querySelector(`.${prefix}-particles`);
  const chip = tile.querySelector(`.${prefix}-multiplier`);

  if (prefix === "joker-win-tile") {
    playDocsSound(MINE_GOLD_SOUND);
  }

  tile.classList.add(`${prefix}--revealed`, `${prefix}--revealing`);
  particles?.removeAttribute("hidden");

  if (chip) {
    const chipEnterMs = 220;
    const chipVisibleMs = 1200;

    tile.classList.add(`${prefix}--has-multiplier`);
    chip.removeAttribute("hidden");
    chip.style.display = "";
    chip.classList.add(`${prefix}-multiplier--entering`);
    window.setTimeout(() => {
      chip.classList.remove(`${prefix}-multiplier--entering`);
      chip.classList.add(`${prefix}-multiplier--visible`);
    }, chipEnterMs);
    window.setTimeout(() => {
      chip.classList.remove(`${prefix}-multiplier--entering`, `${prefix}-multiplier--visible`);
      chip.setAttribute("hidden", "");
      chip.style.display = "none";
      tile.classList.remove(`${prefix}--has-multiplier`);
      tile.classList.add(`${prefix}--opened`);
    }, chipEnterMs + chipVisibleMs);
  } else {
    window.setTimeout(() => {
      tile.classList.add(`${prefix}--opened`);
    }, 720);
  }

  window.setTimeout(() => {
    tile.classList.remove(`${prefix}--revealing`);
    particles?.setAttribute("hidden", "");
  }, 720);
  tile.setAttribute("aria-label", "Win tile revealed");
  tile.removeAttribute("role");
  tile.removeAttribute("tabindex");
}

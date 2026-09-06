import {
  createRouletteWinChipNode,
  playRouletteWinChip,
  ROULETTE_WIN_CHIP_PLAYBACK_MS,
} from "./rouletteWinChipDom.js";

const DEMO_VERSION = "roulette-win-chip-v11";

const MULTIPLIERS = {
  red: "2.00x",
  black: "2.00x",
  green: "36.00x",
};

const GHOST_BUTTON_CLASS = "joker-cta-preview ghost button-example-control";

function formatColorLabel(color) {
  return color.charAt(0).toUpperCase() + color.slice(1);
}

export function mountRouletteWinChipDemo(mount) {
  if (mount.dataset.hydrated === DEMO_VERSION) {
    return;
  }

  let betColor = "red";
  let playing = false;
  const chipHost = document.createElement("div");
  chipHost.style.minHeight = "132px";
  chipHost.style.display = "grid";
  chipHost.style.placeItems = "center";

  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.gap = "12px";
  controls.style.flexWrap = "wrap";
  controls.style.justifyContent = "center";

  const colors = ["red", "black", "green"];
  const colorButtons = colors.map((color) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = GHOST_BUTTON_CLASS;
    button.textContent = formatColorLabel(color);
    button.dataset.rouletteWinChipColor = color;
    return button;
  });

  controls.append(...colorButtons);
  mount.replaceChildren(chipHost, controls);
  mount.dataset.hydrated = DEMO_VERSION;

  const setControlsDisabled = (disabled) => {
    colorButtons.forEach((button) => {
      button.disabled = disabled;
    });
  };

  const updateColorButtons = () => {
    colorButtons.forEach((button) => {
      const isSelected = button.dataset.rouletteWinChipColor === betColor;
      button.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
  };

  const bindChipReplay = (chip) => {
    chip.style.cursor = playing ? "default" : "pointer";
    chip.onclick = () => {
      if (!playing) {
        playWin();
      }
    };
  };

  const showSettledChip = () => {
    playing = false;
    setControlsDisabled(false);
    chipHost.replaceChildren();
    const chip = createRouletteWinChipNode({
      betColor,
      multiplier: MULTIPLIERS[betColor],
    });
    chip.classList.add("is-settled");
    bindChipReplay(chip);
    chipHost.appendChild(chip);
  };

  const playWin = () => {
    if (playing) return;
    playing = true;
    setControlsDisabled(true);

    chipHost.replaceChildren();
    const chip = createRouletteWinChipNode({
      betColor,
      multiplier: MULTIPLIERS[betColor],
    });
    chipHost.appendChild(chip);
    playRouletteWinChip(chip, { settle: true });

    window.setTimeout(() => {
      playing = false;
      setControlsDisabled(false);
      bindChipReplay(chip);
    }, ROULETTE_WIN_CHIP_PLAYBACK_MS);
  };

  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      betColor = button.dataset.rouletteWinChipColor ?? "red";
      updateColorButtons();
      playWin();
    });
  });

  updateColorButtons();
  showSettledChip();
}

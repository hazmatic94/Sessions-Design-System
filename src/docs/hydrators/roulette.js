export async function hydrateRouletteWinStreakRowDemos(root = document) {
  const streakMounts = [...root.querySelectorAll("[data-win-streak-row-demo]")];
  const chipMounts = [...root.querySelectorAll("[data-roulette-win-chip-demo]")];
  if (!streakMounts.length && !chipMounts.length) {
    return;
  }

  try {
    if (streakMounts.length) {
      const { mountWinStreakRowDemo } = await import("../../utils/winStreakRowDocsDemo.js?v=win-streak-row-v2");
      streakMounts.forEach((mount) => mountWinStreakRowDemo(mount));
    }

    if (chipMounts.length) {
      const { mountRouletteWinChipDemo } = await import("../../utils/rouletteWinChipDocsDemo.js?v=roulette-win-chip-v11");
      chipMounts.forEach((mount) => mountRouletteWinChipDemo(mount));
    }
  } catch (error) {
    console.error("Failed to hydrate roulette card demos", error);
  }
}

export async function hydrateRouletteWheelDemos(root = document) {
  const wheelMounts = [...root.querySelectorAll("[data-roulette-wheel-demo]")];
  const gameShellMounts = [...root.querySelectorAll("[data-roulette-game-shell-wheel-demo]")];
  if (!wheelMounts.length && !gameShellMounts.length) {
    return;
  }

  try {
    const { mountRouletteWheelDemo } = await import(
      "../../utils/rouletteWheelDocsDemo.js?v=roulette-wheel-clean-v2"
    );
    await Promise.all([
      ...wheelMounts.map((mount) => mountRouletteWheelDemo(mount)),
      ...gameShellMounts.map((mount) => mountRouletteWheelDemo(mount)),
    ]);
  } catch (error) {
    console.error("Failed to hydrate roulette wheel demo", error);
    [...wheelMounts, ...gameShellMounts].forEach((mount) => {
      mount.innerHTML = `
        <div class="joker-roulette-wheel" style="--roulette-wheel-size: 1111px;" aria-hidden="true">
          <img class="joker-roulette-wheel__svg" src="./assets/roulette-wheel.svg?v=roulette-visual-v17" alt="" draggable="false" />
        </div>
      `;
    });
  }
}

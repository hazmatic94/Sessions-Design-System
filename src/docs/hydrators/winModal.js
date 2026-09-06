import { parseShowroomBalanceAmount, formatShowroomBalanceAmount } from "../demo/gameShellRails.js";

export function hydrateWinModalShowrooms(root = document) {
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const flyingCoinCount = 7;
  const coinFlightMs = 760;
  const coinStaggerMs = 48;

  root.querySelectorAll("[data-win-modal-showroom]").forEach((showroom) => {
    if (showroom.dataset.winModalBound === "true") {
      return;
    }

    showroom.dataset.winModalBound = "true";

    const shell = showroom.querySelector("[data-win-modal-card-shell]");
    const icon = shell?.querySelector(".joker-win-modal-card-icon-wrap");
    const walletCoin = showroom.querySelector(".joker-win-modal-showroom-rail .joker-wallet-coin");
    const walletBalance = showroom.querySelector("[data-win-modal-wallet-balance]");
    const amountEl = showroom.querySelector("[data-win-modal-wallet-amount]");
    const coinsLayer = showroom.querySelector("[data-win-modal-flying-coins]");
    const credit = Number(showroom.dataset.winModalCredit || "0");

    if (!shell || !icon || !walletCoin || !coinsLayer || !amountEl || credit <= 0) {
      return;
    }

    const applyCredit = () => {
      const nextBalance = parseShowroomBalanceAmount(amountEl.textContent) + credit;
      amountEl.textContent = formatShowroomBalanceAmount(nextBalance);
      walletBalance?.classList.add("is-credited");
      window.setTimeout(() => walletBalance?.classList.remove("is-credited"), 520);
    };

    const launchCoins = () => {
      coinsLayer.innerHTML = "";
      walletBalance?.classList.remove("is-credited");

      const showroomRect = showroom.getBoundingClientRect();
      const iconRect = icon.getBoundingClientRect();
      const walletRect = walletCoin.getBoundingClientRect();
      const originX = iconRect.left + iconRect.width / 2 - showroomRect.left;
      const originY = iconRect.top + iconRect.height / 2 - showroomRect.top;
      const deltaX = walletRect.left + walletRect.width / 2 - showroomRect.left - originX;
      const deltaY = walletRect.top + walletRect.height / 2 - showroomRect.top - originY;

      if (prefersReducedMotion) {
        applyCredit();
        return;
      }

      for (let index = 0; index < flyingCoinCount; index += 1) {
        const coin = document.createElement("img");
        coin.className = "joker-win-modal-card-flying-coin";
        coin.src = "./assets/jokerCoin.svg?v=win-modal-card";
        coin.alt = "";
        coin.style.setProperty("--coin-delta-x", `${deltaX + (index - 3) * 5}px`);
        coin.style.setProperty("--coin-delta-y", `${deltaY + (index % 2 === 0 ? -4 : 4)}px`);
        coin.style.left = `${originX}px`;
        coin.style.top = `${originY}px`;
        coin.style.animationDelay = `${index * coinStaggerMs}ms`;
        coinsLayer.appendChild(coin);
      }

      window.setTimeout(applyCredit, (flyingCoinCount - 1) * coinStaggerMs + coinFlightMs);
    };

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(launchCoins);
    });
  });
}

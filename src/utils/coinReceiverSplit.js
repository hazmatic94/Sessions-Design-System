export function coinReceiverCrackMarkup() {
  return `
    <svg class="joker-coin-receiver__coin-crack" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path
        d="M50 3 L46.5 14 L53 26 L45.5 38 L54 50 L46 62 L52.5 74 L47.5 86 L50 97"
        fill="none"
        stroke="#120804"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M50 3 L46.5 14 L53 26 L45.5 38 L54 50 L46 62 L52.5 74 L47.5 86 L50 97"
        fill="none"
        stroke="#5c3820"
        stroke-width="0.9"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.55"
      />
      <path d="M47 20 L40 24" stroke="#120804" stroke-width="1.2" stroke-linecap="round" opacity="0.7" />
      <path d="M53 42 L60 46" stroke="#120804" stroke-width="1.1" stroke-linecap="round" opacity="0.65" />
      <path d="M48 64 L42 70" stroke="#120804" stroke-width="1" stroke-linecap="round" opacity="0.6" />
    </svg>
  `;
}

export function coinReceiverLossDustMarkup() {
  return `
    <div class="joker-coin-receiver__loss-dust" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
}

export function coinReceiverCoinWrapMarkup(coinMarkup = "") {
  if (!coinMarkup) {
    return `
      <div class="joker-coin-receiver__coin-wrap">
        <div class="joker-coin-receiver__coin-intact"></div>
        ${coinReceiverCrackMarkup()}
        ${coinReceiverLossDustMarkup()}
        <div class="joker-coin-receiver__coin-split" aria-hidden="true">
          <div class="joker-coin-receiver__coin-half joker-coin-receiver__coin-half--left"></div>
          <div class="joker-coin-receiver__coin-half joker-coin-receiver__coin-half--right"></div>
        </div>
      </div>
    `;
  }

  return `
    <div class="joker-coin-receiver__coin-wrap">
      <div class="joker-coin-receiver__coin-intact">${coinMarkup}</div>
      ${coinReceiverCrackMarkup()}
      ${coinReceiverLossDustMarkup()}
      <div class="joker-coin-receiver__coin-split" aria-hidden="true">
        <div class="joker-coin-receiver__coin-half joker-coin-receiver__coin-half--left"></div>
        <div class="joker-coin-receiver__coin-half joker-coin-receiver__coin-half--right"></div>
      </div>
    </div>
  `;
}

export function prepareCoinReceiverSplit(mount) {
  if (!mount) return;

  const intact = mount.querySelector(".joker-coin-receiver__coin-intact");
  const coin = intact?.querySelector(".joker-coin");
  const split = mount.querySelector(".joker-coin-receiver__coin-split");
  const left = split?.querySelector(".joker-coin-receiver__coin-half--left");
  const right = split?.querySelector(".joker-coin-receiver__coin-half--right");

  if (!coin || !left || !right) return;

  left.replaceChildren(coin.cloneNode(true));
  right.replaceChildren(coin.cloneNode(true));
  mount.dataset.coinSplitPrepared = "true";
}

export function resetCoinReceiverSplit(mount) {
  if (!mount) return;

  const split = mount.querySelector(".joker-coin-receiver__coin-split");
  split?.querySelectorAll(".joker-coin-receiver__coin-half").forEach((half) => {
    half.replaceChildren();
  });

  const intact = mount.querySelector(".joker-coin-receiver__coin-intact");
  if (intact) {
    intact.style.opacity = "";
    intact.style.visibility = "";
  }
  if (split) {
    split.style.opacity = "";
    split.style.visibility = "";
  }

  mount.style.opacity = "";
  mount.style.visibility = "";

  delete mount.dataset.coinSplitPrepared;
}

export function setCoinReceiverSplitResting(mount) {
  if (!mount) return;

  resetCoinReceiverSplit(mount);
  mount.style.opacity = "0";
  mount.style.visibility = "hidden";
}

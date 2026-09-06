function createFleckAngle() {
  // Thumb flick: spray upward with a slight outward spread.
  return -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.75;
}

export function burstCoinTossParticles(container: HTMLElement | null, coinSizePx = 256) {
  if (!container) return;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  container.replaceChildren();

  const fleckCount = 7;
  let maxDuration = 0;

  for (let index = 0; index < fleckCount; index += 1) {
    const fleck = document.createElement("span");
    const isDot = index % 3 === 0;
    fleck.className = isDot ? "joker-coin-toss__fleck joker-coin-toss__fleck--dot" : "joker-coin-toss__fleck";
    fleck.setAttribute("aria-hidden", "true");

    const angle = createFleckAngle();
    const distance = coinSizePx * (0.06 + Math.random() * 0.14);
    const duration = 340 + Math.random() * 220;
    const delay = Math.random() * 50;
    const angleDeg = (angle * 180) / Math.PI;

    fleck.style.setProperty("--px", `${Math.cos(angle) * distance}px`);
    fleck.style.setProperty("--py", `${Math.sin(angle) * distance}px`);
    fleck.style.setProperty("--angle", `${angleDeg}deg`);
    fleck.style.setProperty("--duration", `${duration}ms`);
    fleck.style.setProperty("--delay", `${delay}ms`);

    maxDuration = Math.max(maxDuration, duration + delay);
    container.appendChild(fleck);
  }

  window.setTimeout(() => {
    container.replaceChildren();
  }, maxDuration + 40);
}

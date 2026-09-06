function prefersReducedMotion() {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function pickVariant() {
    const roll = Math.random();
    if (roll > 0.5)
        return "mote";
    if (roll > 0.2)
        return "float";
    return "drift";
}
function spawnRingParticle(container, stageSizePx, coinSizePx) {
    const variant = pickVariant();
    const particle = document.createElement("span");
    particle.className = `joker-coin-toss-rings__particle joker-coin-toss-rings__particle--${variant}`;
    particle.setAttribute("aria-hidden", "true");
    const nearCoin = Math.random() > 0.32;
    const originAngle = Math.random() * Math.PI * 2;
    let originX;
    let originY;
    let tx;
    let ty;
    let txMid;
    let tyMid;
    if (nearCoin) {
        const coinRadius = coinSizePx * (0.34 + Math.random() * 0.18);
        originX = Math.cos(originAngle) * coinRadius;
        originY = -(coinSizePx * (0.22 + Math.random() * 0.58));
        const lift = coinSizePx * (0.06 + Math.random() * 0.2);
        const swirl = coinSizePx * (0.04 + Math.random() * 0.14);
        tx = -Math.cos(originAngle) * swirl * 0.55 + (Math.random() - 0.5) * coinSizePx * 0.05;
        ty = -lift;
        txMid = Math.cos(originAngle) * swirl * 0.42;
        tyMid = ty * 0.55;
    }
    else {
        const radiusX = stageSizePx * (0.16 + Math.random() * 0.12);
        const radiusY = stageSizePx * (0.042 + Math.random() * 0.02);
        originX = Math.cos(originAngle) * radiusX;
        originY = Math.sin(originAngle) * radiusY * 0.34;
        const rise = stageSizePx * (0.42 + Math.random() * 0.38);
        const spiral = stageSizePx * (0.06 + Math.random() * 0.13);
        tx = -Math.cos(originAngle) * spiral * (0.45 + Math.random() * 0.35);
        ty = -rise;
        txMid = Math.cos(originAngle) * spiral * (0.28 + Math.random() * 0.18);
        tyMid = ty * (0.5 + Math.random() * 0.12);
    }
    const isDrift = variant === "drift";
    const isFloat = variant === "float";
    const duration = nearCoin
        ? 2200 + Math.random() * 1800
        : isDrift
            ? 2800 + Math.random() * 2200
            : isFloat
                ? 2400 + Math.random() * 1800
                : 2000 + Math.random() * 1600;
    const delay = Math.random() * 1400;
    const scale = isDrift ? 0.55 + Math.random() * 0.45 : isFloat ? 0.45 + Math.random() * 0.4 : 0.35 + Math.random() * 0.35;
    const peakOpacity = 0.2 + Math.random() * (isDrift ? 0.24 : 0.3);
    particle.style.left = `calc(50% + ${originX}px)`;
    particle.style.top = `calc(100% + ${originY}px)`;
    particle.style.setProperty("--tx", `${tx}px`);
    particle.style.setProperty("--ty", `${ty}px`);
    particle.style.setProperty("--tx-mid", `${txMid}px`);
    particle.style.setProperty("--ty-mid", `${tyMid}px`);
    particle.style.setProperty("--duration", `${duration}ms`);
    particle.style.setProperty("--delay", `${delay}ms`);
    particle.style.setProperty("--scale", String(scale));
    particle.style.setProperty("--peak-opacity", String(peakOpacity));
    container.appendChild(particle);
    window.setTimeout(() => {
        particle.remove();
    }, duration + delay + 120);
}
export function startCoinTossRingAmbient(container, stageSizePx = 400, coinSizePx = 256) {
    if (!container || prefersReducedMotion()) {
        return () => { };
    }
    container.replaceChildren();
    let disposed = false;
    const tick = () => {
        if (disposed)
            return;
        const capacity = 128;
        if (container.childElementCount >= capacity)
            return;
        const burst = Math.random() > 0.45 ? 4 : Math.random() > 0.15 ? 2 : 1;
        for (let i = 0; i < burst && container.childElementCount < capacity; i += 1) {
            spawnRingParticle(container, stageSizePx, coinSizePx);
        }
    };
    tick();
    const intervalId = window.setInterval(tick, 58);
    return () => {
        disposed = true;
        window.clearInterval(intervalId);
        container.replaceChildren();
    };
}

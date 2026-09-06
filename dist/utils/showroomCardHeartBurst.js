const HEART_MARKUP = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6Z" fill="currentColor"/></svg>';
/** ponytail: fixed 6-particle burst; upgrade path = configurable count/distance. */
export function burstShowroomCardHearts(button) {
    if (!button || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }
    const anchor = button.closest(".joker-showroom-card-top-rail");
    if (!anchor) {
        return;
    }
    const buttonRect = button.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    const originX = buttonRect.left + buttonRect.width / 2 - anchorRect.left;
    const originY = buttonRect.top + buttonRect.height / 2 - anchorRect.top;
    const layer = document.createElement("span");
    layer.className = "joker-showroom-card-heart-burst";
    layer.setAttribute("aria-hidden", "true");
    layer.style.left = `${originX}px`;
    layer.style.top = `${originY}px`;
    const count = 6;
    for (let index = 0; index < count; index += 1) {
        const particle = document.createElement("span");
        particle.className = "joker-showroom-card-heart-particle";
        const spread = (index / (count - 1) - 0.5) * 1.35;
        const angle = -Math.PI / 2 + spread + (Math.random() - 0.5) * 0.25;
        const distance = 8 + Math.random() * 10;
        particle.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
        particle.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);
        particle.style.animationDelay = `${index * 30}ms`;
        particle.innerHTML = HEART_MARKUP;
        layer.appendChild(particle);
    }
    anchor.appendChild(layer);
    window.setTimeout(() => layer.remove(), 800);
}

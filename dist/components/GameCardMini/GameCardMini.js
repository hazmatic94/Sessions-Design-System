import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import hiloCardTextureSrc from "../../../assets/hiloCardTexture.png";
import styles from "./GameCardMini.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function GameCardMini({ children, className, ...props }) {
    return (_jsx("div", { ...props, className: cx(styles.root, "joker-game-card-mini", className), "aria-label": props["aria-label"] ?? "Game card mini", children: _jsx("div", { className: cx(styles.inner, "joker-game-card-mini__inner"), children: _jsxs("div", { className: cx(styles.surface, "joker-game-card-mini__surface"), children: [_jsx("div", { className: cx(styles.surfaceTexture, "joker-game-card-mini__surface-texture"), style: { backgroundImage: `url(${hiloCardTextureSrc})` }, "aria-hidden": "true" }), _jsx("div", { className: cx(styles.surfaceOverlay, "joker-game-card-mini__surface-overlay"), "aria-hidden": "true" }), _jsx("div", { className: cx(styles.surfaceContent, "joker-game-card-mini__surface-content"), children: _jsx("div", { className: cx(styles.contentFrame, "joker-game-card-mini__content-frame"), children: children }) })] }) }) }));
}

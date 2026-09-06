import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GameFooterRail } from "../GameFooterRail/index.js";
import { GameHeaderRail } from "../GameHeaderRail/index.js";
import { HiLoBettingPanel } from "../HiLoBettingPanel/index.js";
import { Navigation } from "../Navigation.js";
import { navigationItemRegistry } from "../../data/navigationData.js";
import styles from "./GameShell.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function AppShell({ children, className = "", defaultValue = "hilo", mobileAfter, ...navigationProps }) {
    return (_jsx("div", { className: cx(styles.shell, "joker-game-shell", className), children: _jsxs(Navigation, { ...navigationProps, defaultValue: defaultValue, className: "joker-game-shell-navigation", children: [_jsx("div", { className: cx(styles.pageWrapper, "joker-page-wrapper"), children: children }), mobileAfter && (_jsx("div", { className: cx(styles.mobilePagePanel, "joker-mobile-page-panel"), children: mobileAfter }))] }) }));
}
export const GameChromeShell = AppShell;
export function GameInner({ children, game, gameIcon, fairPlayLabel, gameHeaderRail, bettingPanel, bettingPanelProps, className = "", renderMobileBetting = true, }) {
    const resolvedBettingPanel = bettingPanel ?? _jsx(HiLoBettingPanel, { ...bettingPanelProps });
    return (_jsx("div", { className: cx(styles.innerFrame, "joker-game-inner-frame", className), children: _jsxs("main", { className: cx(styles.inner, "joker-game-inner joker-game-shell-stage"), "aria-label": "Game stage", children: [gameHeaderRail ?? (_jsx(GameHeaderRail, { game: game ?? navigationItemRegistry.hilo, gameIcon: gameIcon, rightLabel: fairPlayLabel })), _jsxs("div", { className: cx(styles.layout, "joker-game-inner-layout joker-game-shell-play-area"), children: [_jsx("aside", { className: cx(styles.betting, "joker-game-inner-betting joker-game-shell-betting", !renderMobileBetting && styles.hideMobileBetting), "aria-label": "Betting panel", children: resolvedBettingPanel }), _jsx("div", { className: cx(styles.canvas, "joker-game-inner-canvas joker-game-shell-empty-stage"), "aria-label": "Game canvas", children: children })] }), _jsx(GameFooterRail, {})] }) }));
}
export function FullGameShell({ children, game, gameIcon, fairPlayLabel, gameHeaderRail, bettingPanel, bettingPanelProps, className = "", defaultValue = "hilo", ...navigationProps }) {
    return (_jsx(AppShell, { ...navigationProps, defaultValue: defaultValue, className: className, children: _jsx(GameInner, { game: game, gameIcon: gameIcon, fairPlayLabel: fairPlayLabel, gameHeaderRail: gameHeaderRail, bettingPanel: bettingPanel, bettingPanelProps: bettingPanelProps, children: children }) }));
}
export const GameShell = FullGameShell;

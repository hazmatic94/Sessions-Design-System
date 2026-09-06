import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import jokerCoinSrc from "../../../assets/jokerCoin.svg";
import winModalCoinSpinSrc from "../../../assets/win-modal-coin-spin.mov";
import winModalIconSrc from "../../../assets/win-card-modal.svg";
import { Button } from "../Button/Button";
import styles from "./WinModalCard.module.css";
const FLYING_COIN_COUNT = 7;
const COIN_FLIGHT_MS = 760;
const COIN_STAGGER_MS = 48;
const WALLET_CREDIT_PULSE_MS = 520;
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function getVisibleWalletCoinTarget(root = document) {
    if (!root) {
        return null;
    }
    const coins = Array.from(root.querySelectorAll(".joker-wallet-coin"));
    for (const coin of coins) {
        const rect = coin.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight) {
            return coin;
        }
    }
    return null;
}
function pulseWalletBalance(target) {
    const walletBalance = target?.closest(".joker-wallet-balance");
    if (!walletBalance) {
        return;
    }
    walletBalance.classList.add("is-credited");
    window.setTimeout(() => {
        walletBalance.classList.remove("is-credited");
    }, WALLET_CREDIT_PULSE_MS);
}
function MessageWithHighlight({ message, highlight, }) {
    if (typeof message !== "string" || highlight == null || highlight === "") {
        return _jsx(_Fragment, { children: message });
    }
    const highlightText = String(highlight);
    const index = message.toLowerCase().indexOf(highlightText.toLowerCase());
    if (index === -1) {
        return _jsx(_Fragment, { children: message });
    }
    return (_jsxs(_Fragment, { children: [message.slice(0, index), _jsx("strong", { className: styles.messageHighlight, children: message.slice(index, index + highlightText.length) }), message.slice(index + highlightText.length)] }));
}
function CloseIcon() {
    return (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true", children: [_jsx("path", { d: "M18 6 6 18", strokeLinecap: "round" }), _jsx("path", { d: "m6 6 12 12", strokeLinecap: "round" })] }));
}
export function WinModalCard({ title = "You Won", amountWon = "+88", currency = "JKC", message = "Your winnings have been credited to your account", messageHighlight = "credited", balance, iconSrc = winModalIconSrc, iconVideoSrc = winModalCoinSpinSrc, closeLabel = "Close", flyToWallet = true, walletSearchRoot, onCoinsLand, onClose, className, ...props }) {
    const iconRef = useRef(null);
    const iconVideoRef = useRef(null);
    const onCoinsLandRef = useRef(onCoinsLand);
    const [coinOrigin, setCoinOrigin] = useState(null);
    const [isIconVideoPlaying, setIsIconVideoPlaying] = useState(false);
    const [useIconImageFallback, setUseIconImageFallback] = useState(!iconVideoSrc);
    const [coinFlights, setCoinFlights] = useState([]);
    onCoinsLandRef.current = onCoinsLand;
    useEffect(() => {
        if (!iconVideoSrc) {
            return undefined;
        }
        const video = iconVideoRef.current;
        if (!video) {
            return undefined;
        }
        setIsIconVideoPlaying(false);
        setUseIconImageFallback(false);
        const handlePlaying = () => {
            setIsIconVideoPlaying(true);
        };
        const handleError = () => {
            setUseIconImageFallback(true);
        };
        video.addEventListener("playing", handlePlaying);
        video.addEventListener("error", handleError);
        void video.play().catch(() => {
            setUseIconImageFallback(true);
        });
        return () => {
            video.removeEventListener("playing", handlePlaying);
            video.removeEventListener("error", handleError);
        };
    }, [iconVideoSrc]);
    useLayoutEffect(() => {
        if (!flyToWallet) {
            return undefined;
        }
        if (walletSearchRoot === null) {
            return undefined;
        }
        const prefersReducedMotion = typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            onCoinsLandRef.current?.();
            return undefined;
        }
        const icon = iconRef.current;
        const searchRoot = walletSearchRoot ?? document;
        const target = getVisibleWalletCoinTarget(searchRoot);
        if (!icon || !target) {
            return undefined;
        }
        const iconRect = icon.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const originX = iconRect.left + iconRect.width / 2;
        const originY = iconRect.top + iconRect.height / 2;
        const deltaX = targetRect.left + targetRect.width / 2 - originX;
        const deltaY = targetRect.top + targetRect.height / 2 - originY;
        setCoinOrigin({ x: originX, y: originY });
        setCoinFlights(Array.from({ length: FLYING_COIN_COUNT }, (_, index) => ({
            deltaX: deltaX + (index - (FLYING_COIN_COUNT - 1) / 2) * 5,
            deltaY: deltaY + (index % 2 === 0 ? -4 : 4),
            delayMs: index * COIN_STAGGER_MS,
        })));
        const landDelay = (FLYING_COIN_COUNT - 1) * COIN_STAGGER_MS + COIN_FLIGHT_MS;
        const landTimer = window.setTimeout(() => {
            pulseWalletBalance(target);
            onCoinsLandRef.current?.();
        }, landDelay);
        return () => {
            window.clearTimeout(landTimer);
        };
    }, [amountWon, currency, flyToWallet, message, title, walletSearchRoot]);
    const flyingCoins = coinOrigin && coinFlights.length > 0 && typeof document !== "undefined"
        ? createPortal(_jsx("span", { className: styles.flyingCoins, "aria-hidden": "true", style: {
                "--coin-origin-x": `${coinOrigin.x}px`,
                "--coin-origin-y": `${coinOrigin.y}px`,
            }, children: coinFlights.map((coin, index) => (_jsx("img", { className: styles.flyingCoin, src: jokerCoinSrc, alt: "", style: {
                    "--coin-delta-x": `${coin.deltaX}px`,
                    "--coin-delta-y": `${coin.deltaY}px`,
                    animationDelay: `${coin.delayMs}ms`,
                } }, index))) }), document.body)
        : null;
    const ariaLabel = typeof title === "string"
        ? title
        : typeof amountWon === "string"
            ? `${amountWon} ${currency}`
            : undefined;
    return (_jsxs("div", { ...props, className: cx(styles.root, className), "aria-label": ariaLabel, children: [flyingCoins, _jsxs("div", { className: styles.card, children: [_jsx("button", { type: "button", className: styles.dismiss, onClick: onClose, "aria-label": "Close", children: _jsx(CloseIcon, {}) }), _jsx("span", { ref: iconRef, className: styles.iconWrap, "aria-hidden": "true", children: iconVideoSrc && !useIconImageFallback ? (_jsx("video", { ref: iconVideoRef, className: cx(styles.iconVideo, isIconVideoPlaying && styles.iconVideoIsPlaying), src: iconVideoSrc, autoPlay: true, loop: true, muted: true, playsInline: true, preload: "auto" })) : (_jsx("img", { className: styles.icon, src: iconSrc, alt: "" })) }), _jsxs("div", { className: styles.copy, children: [_jsxs("strong", { className: styles.amount, children: [amountWon, " ", currency] }), _jsx("p", { className: styles.message, children: _jsx(MessageWithHighlight, { message: message, highlight: messageHighlight }) })] }), balance != null && balance !== "" ? (_jsx("div", { className: styles.balancePill, children: _jsxs("div", { className: styles.balancePillInner, children: [_jsx("img", { className: styles.balanceCoin, src: jokerCoinSrc, alt: "" }), _jsx("span", { children: balance })] }) })) : null, _jsx("div", { className: styles.footerActions, children: _jsx(Button, { type: "button", variant: "ghost", fullWidth: true, className: styles.cancelGhost, onClick: onClose, children: closeLabel }) })] })] }));
}

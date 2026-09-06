import { jsx as _jsx } from "react/jsx-runtime";
import { CoinFaceContent } from "./CoinFaceContent";
import { CoinTossable } from "./CoinTossable";
import "./Coin.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function Coin({ side = "heads", tossPhase, tossOutcome, onTossEnd, tossDurationMs, stageSizePx, tapHint, tapHintVisible = true, className, style, ...props }) {
    const isTossable = tossPhase != null && side !== "joker";
    if (isTossable) {
        return (_jsx(CoinTossable, { ...props, side: side === "tails" ? "tails" : "heads", tossPhase: tossPhase, tossOutcome: tossOutcome, onTossEnd: onTossEnd, tossDurationMs: tossDurationMs, stageSizePx: stageSizePx, tapHint: tapHint, tapHintVisible: tapHintVisible, className: className, style: style }));
    }
    return (_jsx("div", { ...props, className: cx("joker-coin", side === "tails" && "joker-coin--tails", side === "joker" && "joker-coin--joker", className), style: style, "aria-hidden": props["aria-hidden"] ?? true, children: _jsx("div", { className: "joker-coin__rim", children: _jsx("div", { className: "joker-coin__face", children: _jsx(CoinFaceContent, { side: side }) }) }) }));
}

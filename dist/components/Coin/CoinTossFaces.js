import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CoinFaceContent } from "./CoinFaceContent";
import { CoinTossEdge } from "./CoinTossEdge";
function CoinTossFaceStack({ side, pauseSheen, }) {
    return (_jsx("div", { className: "joker-coin__rim", children: _jsxs("div", { className: "joker-coin__face", children: [_jsx(CoinFaceContent, { side: side, pauseSheen: pauseSheen }), _jsx("div", { className: "joker-coin-toss__specular", "aria-hidden": "true" })] }) }));
}
function CoinTossFaceShell({ side, pauseSheen, }) {
    return (_jsx("div", { className: `joker-coin-toss__face joker-coin-toss__face--${side}`, children: _jsx(CoinTossFaceStack, { side: side, pauseSheen: pauseSheen }) }));
}
export function CoinTossFaces({ pauseSheen = false }) {
    return (_jsxs("div", { className: "joker-coin-toss__flipper", children: [_jsx(CoinTossEdge, {}), _jsx(CoinTossFaceShell, { side: "heads", pauseSheen: pauseSheen }), _jsx(CoinTossFaceShell, { side: "tails", pauseSheen: pauseSheen })] }));
}

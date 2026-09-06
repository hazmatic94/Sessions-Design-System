import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CoinFaceIcon } from "./CoinFaceIcon";
export function CoinFaceContent({ side, pauseSheen = false }) {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "joker-coin__icon-well", children: _jsx(CoinFaceIcon, { side: side }) }), !pauseSheen ? _jsx("div", { className: "joker-coin__sheen", "aria-hidden": "true" }) : null] }));
}

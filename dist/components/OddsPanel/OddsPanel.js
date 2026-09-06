import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TeamInfo } from "../TeamInfo/TeamInfo";
import styles from "./OddsPanel.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function resolveLine(line) {
    const raw = String(line).trim();
    const numeric = Number.parseFloat(raw.replace(/^\+/, ""));
    if (!Number.isFinite(numeric) || numeric === 0) {
        return { label: raw, tone: "neutral" };
    }
    if (numeric > 0) {
        const body = raw.replace(/^\+/, "");
        return { label: `+${body}`, tone: "positive" };
    }
    return {
        label: raw.startsWith("-") ? raw : String(numeric),
        tone: "negative",
    };
}
export function OddsPanel({ children, selected = false, unavailable = false, logoSrc, logoAlt = "", teamName, line, className, type = "button", disabled, ...props }) {
    const isSelected = unavailable ? false : selected;
    const hasTeam = Boolean(logoSrc && teamName != null && teamName !== "");
    const hasLine = line != null && String(line).trim() !== "";
    const resolvedLine = hasLine ? resolveLine(line) : null;
    return (_jsxs("button", { ...props, type: type, disabled: unavailable || disabled, "aria-pressed": isSelected, "aria-disabled": unavailable || undefined, className: cx(styles.root, "joker-odds-panel", hasTeam && styles.withTeam, hasTeam && "is-with-team", hasLine && styles.withLine, hasLine && "is-with-line", isSelected && "is-selected", unavailable && "is-unavailable", className), children: [hasTeam ? (_jsxs("span", { className: cx(styles.leading, "joker-odds-panel__leading"), children: [_jsx(TeamInfo, { logoSrc: logoSrc, logoAlt: logoAlt, className: cx(styles.team, "joker-odds-panel__team"), children: teamName }), resolvedLine ? (_jsx("span", { className: cx(styles.line, "joker-odds-panel__line", resolvedLine.tone === "positive" && styles.linePositive, resolvedLine.tone === "positive" && "is-positive", resolvedLine.tone === "negative" && styles.lineNegative, resolvedLine.tone === "negative" && "is-negative"), children: resolvedLine.label })) : null] })) : null, _jsx("span", { className: cx(styles.value, "joker-odds-panel__value"), children: children })] }));
}

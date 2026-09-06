import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DateRow } from "../DateRow/DateRow";
import { TeamInfo } from "../TeamInfo/TeamInfo";
import { Time } from "../Time/Time";
import { ViewMarkets } from "../ViewMarkets/ViewMarkets";
import styles from "./UpcomingMatches.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function UpcomingMatches({ date, time, teams, viewMarketsLabel, onViewMarkets, className, ...props }) {
    const [homeTeam, awayTeam] = teams;
    return (_jsxs("div", { ...props, className: cx(styles.group, "joker-upcoming-matches-group", className), children: [_jsx(DateRow, { children: date }), _jsxs("div", { className: cx(styles.row, "joker-upcoming-matches"), children: [_jsxs("div", { className: cx(styles.leading, "joker-upcoming-matches__leading"), children: [_jsx(Time, { children: time }), _jsxs("div", { className: cx(styles.teamStack, "joker-upcoming-matches__team-stack"), children: [_jsx(TeamInfo, { logoSrc: homeTeam.logoSrc, logoAlt: homeTeam.logoAlt, children: homeTeam.name }), _jsx(TeamInfo, { logoSrc: awayTeam.logoSrc, logoAlt: awayTeam.logoAlt, children: awayTeam.name })] })] }), _jsx("div", { className: cx(styles.actions, "joker-upcoming-matches__actions"), children: _jsx(ViewMarkets, { onClick: onViewMarkets, children: viewMarketsLabel }) })] })] }));
}

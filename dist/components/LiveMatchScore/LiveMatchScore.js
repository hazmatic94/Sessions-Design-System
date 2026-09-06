import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DateRow } from "../DateRow/DateRow";
import { ScoreChip } from "../ScoreChip/ScoreChip";
import { TeamInfo } from "../TeamInfo/TeamInfo";
import styles from "./LiveMatchScore.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function LiveMatchScore({ minutesPlayed, teams, className, ...props }) {
    return (_jsxs("div", { ...props, className: cx(styles.group, "joker-live-match-score-group", className), children: [_jsx(DateRow, { variant: "live", minutesPlayed: minutesPlayed }), _jsx("div", { className: cx(styles.row, "joker-live-match-score"), children: _jsx("div", { className: cx(styles.teamStack, "joker-live-match-score__team-stack"), children: teams.map((team) => (_jsxs("div", { className: cx(styles.teamRow, "joker-live-match-score__team-row"), children: [_jsx(TeamInfo, { logoSrc: team.logoSrc, logoAlt: team.logoAlt, children: team.name }), _jsx(ScoreChip, { children: team.score })] }, team.name))) }) })] }));
}

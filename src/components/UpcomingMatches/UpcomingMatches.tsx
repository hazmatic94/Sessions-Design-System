import { DateRow } from "../DateRow/DateRow";
import { TeamInfo } from "../TeamInfo/TeamInfo";
import { Time } from "../Time/Time";
import { ViewMarkets } from "../ViewMarkets/ViewMarkets";
import styles from "./UpcomingMatches.module.css";
import type { UpcomingMatchesProps } from "./UpcomingMatches.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function UpcomingMatches({
  date,
  time,
  teams,
  viewMarketsLabel,
  onViewMarkets,
  className,
  ...props
}: UpcomingMatchesProps) {
  const [homeTeam, awayTeam] = teams;

  return (
    <div {...props} className={cx(styles.group, "joker-upcoming-matches-group", className)}>
      <DateRow>{date}</DateRow>
      <div className={cx(styles.row, "joker-upcoming-matches")}>
        <div className={cx(styles.leading, "joker-upcoming-matches__leading")}>
          <Time>{time}</Time>
          <div className={cx(styles.teamStack, "joker-upcoming-matches__team-stack")}>
            <TeamInfo logoSrc={homeTeam.logoSrc} logoAlt={homeTeam.logoAlt}>
              {homeTeam.name}
            </TeamInfo>
            <TeamInfo logoSrc={awayTeam.logoSrc} logoAlt={awayTeam.logoAlt}>
              {awayTeam.name}
            </TeamInfo>
          </div>
        </div>
        <div className={cx(styles.actions, "joker-upcoming-matches__actions")}>
          <ViewMarkets onClick={onViewMarkets}>{viewMarketsLabel}</ViewMarkets>
        </div>
      </div>
    </div>
  );
}

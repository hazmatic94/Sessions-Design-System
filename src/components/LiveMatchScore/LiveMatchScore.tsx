import { DateRow } from "../DateRow/DateRow";
import { ScoreChip } from "../ScoreChip/ScoreChip";
import { TeamInfo } from "../TeamInfo/TeamInfo";
import styles from "./LiveMatchScore.module.css";
import type { LiveMatchScoreProps } from "./LiveMatchScore.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function LiveMatchScore({
  minutesPlayed,
  teams,
  className,
  ...props
}: LiveMatchScoreProps) {
  return (
    <div {...props} className={cx(styles.group, "joker-live-match-score-group", className)}>
      <DateRow variant="live" minutesPlayed={minutesPlayed} />
      <div className={cx(styles.row, "joker-live-match-score")}>
        <div className={cx(styles.teamStack, "joker-live-match-score__team-stack")}>
          {teams.map((team) => (
            <div
              key={team.name}
              className={cx(styles.teamRow, "joker-live-match-score__team-row")}
            >
              <TeamInfo logoSrc={team.logoSrc} logoAlt={team.logoAlt}>
                {team.name}
              </TeamInfo>
              <ScoreChip>{team.score}</ScoreChip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

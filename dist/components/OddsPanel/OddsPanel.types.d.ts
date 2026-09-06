import type { ButtonHTMLAttributes, ReactNode } from "react";
export type OddsPanelProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: ReactNode;
    selected?: boolean;
    unavailable?: boolean;
    /** Team crest URL — with `teamName`, renders TeamInfo on the left. */
    logoSrc?: string;
    logoAlt?: string;
    /** Team label shown via TeamInfo on the left of the odds value. */
    teamName?: ReactNode;
    /**
     * Handicap / Asian line shown 16px after the team name.
     * Negatives use joker-red-400; positives use joker-green-400.
     */
    line?: string | number;
};
//# sourceMappingURL=OddsPanel.types.d.ts.map
import type { HTMLAttributes } from "react";
export type SafeTileProps = HTMLAttributes<HTMLDivElement> & {
    /** When true, shows the revealed safe tile with shield chrome. Defaults to true. */
    revealed?: boolean;
    /** Initial revealed state for uncontrolled usage. Defaults to true. */
    defaultRevealed?: boolean;
    /** Grid stack order. Higher values paint above neighboring tiles. */
    stackIndex?: number;
    onRevealedChange?: (revealed: boolean) => void;
};
//# sourceMappingURL=SafeTile.types.d.ts.map
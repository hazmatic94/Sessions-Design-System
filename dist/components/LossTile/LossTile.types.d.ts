import type { HTMLAttributes } from "react";
export type LossTileProps = HTMLAttributes<HTMLDivElement> & {
    /** When true, shows the revealed loss tile. Defaults to true. */
    revealed?: boolean;
    /** Initial revealed state for uncontrolled usage. Defaults to true. */
    defaultRevealed?: boolean;
    /** When false, reveal animation runs without bomb sound. Defaults to true. */
    soundOnReveal?: boolean;
    /** Grid stack order. Higher values paint above neighboring tiles. */
    stackIndex?: number;
    onRevealedChange?: (revealed: boolean) => void;
};
//# sourceMappingURL=LossTile.types.d.ts.map
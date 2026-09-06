import type { HTMLAttributes } from "react";
export type MinesTileProps = HTMLAttributes<HTMLDivElement> & {
    /** When false, renders the muted unselected tile without overlay or hover feedback. */
    selected?: boolean;
    /** When false, skips the mine click sound on press. Defaults to true. */
    playClickSound?: boolean;
    /** Grid stack order. Higher values paint above neighboring tiles. */
    stackIndex?: number;
};
//# sourceMappingURL=MinesTile.types.d.ts.map
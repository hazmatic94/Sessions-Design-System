import type { ReactNode } from "react";
export type GameFooterRailAction = {
    label: string;
    icon: ReactNode;
    onClick?: () => void;
};
export type GameFooterRailProps = {
    actions?: GameFooterRailAction[];
    logo?: ReactNode;
    className?: string;
};
//# sourceMappingURL=GameFooterRail.types.d.ts.map
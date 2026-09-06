import type { HTMLAttributes, ReactNode } from "react";
export type OddsSelectionOption = {
    label: string;
    odds: ReactNode;
    unavailable?: boolean;
};
export type OddsSelectionProps = HTMLAttributes<HTMLDivElement> & {
    options: [OddsSelectionOption, OddsSelectionOption, OddsSelectionOption];
    selectedIndex?: number | null;
    defaultSelectedIndex?: number | null;
    onSelect?: (index: number) => void;
};
//# sourceMappingURL=OddsSelection.types.d.ts.map
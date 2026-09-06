import type { HTMLAttributes, ReactNode } from "react";
export type RoundsToWinOption = {
    label: ReactNode;
    value: string;
    disabled?: boolean;
};
export type RoundsToWinInputProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & {
    label?: ReactNode;
    options?: RoundsToWinOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string, option: RoundsToWinOption) => void;
    disabled?: boolean;
    name?: string;
};
//# sourceMappingURL=RoundsToWinInput.types.d.ts.map
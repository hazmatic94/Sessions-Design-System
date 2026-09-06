import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { InputStatus } from "../Input/index.js";
export type SelectOption = {
    value: string;
    label: ReactNode;
};
export type SelectProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> & {
    label?: ReactNode;
    helperText?: ReactNode;
    error?: ReactNode;
    message?: ReactNode;
    status?: InputStatus;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    placeholder?: ReactNode;
    renderValue?: (option: SelectOption | undefined) => ReactNode;
    onChange?: (value: string) => void;
};
//# sourceMappingURL=Select.types.d.ts.map
import type { InputHTMLAttributes, ReactNode } from "react";
export type InputStatus = "success" | "warning" | "error";
export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> & {
    label?: ReactNode;
    helperText?: ReactNode;
    error?: ReactNode;
    message?: ReactNode;
    status?: InputStatus;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    prefix?: ReactNode;
    suffix?: ReactNode;
};
//# sourceMappingURL=Input.types.d.ts.map
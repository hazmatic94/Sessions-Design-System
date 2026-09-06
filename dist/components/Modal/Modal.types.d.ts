import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
export type ModalProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
    title?: ReactNode;
    children?: ReactNode;
    cancelLabel?: ReactNode;
    primaryLabel?: ReactNode;
    onCancel?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    onPrimary?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    onClose?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};
//# sourceMappingURL=Modal.types.d.ts.map
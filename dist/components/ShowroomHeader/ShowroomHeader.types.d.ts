import type { HTMLAttributes } from "react";
export type ShowroomHeaderProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
    logoAlt?: string;
    logoSrc?: string;
    logoutLabel?: string;
    onLogout?: () => void;
};
//# sourceMappingURL=ShowroomHeader.types.d.ts.map
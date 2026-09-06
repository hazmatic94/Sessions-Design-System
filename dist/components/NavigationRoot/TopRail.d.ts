import type { ResolvedNavigationProps } from "./Navigation.types.js";
export declare function JokerLogo({ href }: {
    href: string;
}): import("react").JSX.Element;
export declare function WalletControl({ balance }: {
    balance: string;
}): import("react").JSX.Element;
export declare function WalletAction({ className }: {
    className?: string;
}): import("react").JSX.Element;
export declare function NotificationAction({ className }: {
    className?: string;
}): import("react").JSX.Element;
export declare function AvatarAction({ avatarSrc, className, label, }: {
    avatarSrc: string;
    className?: string;
    label?: string;
}): import("react").JSX.Element;
export declare function MobileNavActions({ avatarSrc }: Pick<ResolvedNavigationProps, "avatarSrc">): import("react").JSX.Element;
export declare function TopRail({ balance, logoHref, avatarSrc }: Pick<ResolvedNavigationProps, "balance" | "logoHref" | "avatarSrc">): import("react").JSX.Element;
//# sourceMappingURL=TopRail.d.ts.map
import type { HTMLAttributes, ReactNode } from "react";

export type ShowroomCardProps = Omit<HTMLAttributes<HTMLElement>, "children" | "title"> & {
  body?: ReactNode;
  brandLabel?: string;
  defaultFavourited?: boolean;
  favourited?: boolean;
  href?: string;
  imageAlt?: string;
  imageSrc?: string;
  onFavouriteChange?: (active: boolean) => void;
  title?: ReactNode;
};

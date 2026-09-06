export type TabItem = {
  label: string;
  value: string;
  disabled?: boolean;
  badge?: number | string;
};

export type TabsProps = {
  tabs?: TabItem[];
  value?: string;
  activeValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  "aria-label"?: string;
};

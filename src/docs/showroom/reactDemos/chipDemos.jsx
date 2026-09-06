import { createElement } from "react";
import { Chip } from "../../../components/Chip/Chip.tsx";
import { StatusChip } from "../../../components/StatusChip/StatusChip.tsx";

const chipVariants = [
  { variant: "start" },
  { variant: "skip" },
  { variant: "win", children: "1.57x" },
  { variant: "loss", children: "0.00x" },
];

/** @type {Record<string, () => import("react").ReactElement>} */
export const CHIP_REACT_DEMOS = {
  "chip-variants": () =>
    createElement(
      "div",
      { className: "chip-preview-row" },
      ...chipVariants.map((item) =>
        createElement(Chip, {
          key: item.variant,
          variant: item.variant,
          children: item.children,
        }),
      ),
    ),
  "status-chip": () => createElement(StatusChip, { matchCount: 12 }),
};

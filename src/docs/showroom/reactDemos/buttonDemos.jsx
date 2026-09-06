import { createElement, useState } from "react";
import { Button } from "../../../components/Button/Button.tsx";
import { OddsButton } from "../../../components/OddsButton/OddsButton.tsx";

function SelectableOddsButton(props) {
  const [selected, setSelected] = useState(Boolean(props.selected));

  return createElement(OddsButton, {
    ...props,
    selected,
    onClick: () => setSelected((value) => !value),
  });
}

/** @type {Record<string, () => import('react').ReactElement>} */
export const BUTTON_REACT_DEMOS = {
  "primary-default": () =>
    createElement(Button, { label: "Confirm", className: "button-example-control showroom-fixed-width" }),
  "primary-disabled": () =>
    createElement(Button, {
      label: "Confirm",
      disabled: true,
      className: "button-example-control showroom-fixed-width",
    }),
  "primary-loading": () =>
    createElement(Button, {
      loading: true,
      "aria-label": "Loading",
      className: "button-example-control showroom-fixed-width",
    }),
  "secondary-default": () =>
    createElement(Button, { label: "Cancel", variant: "secondary", className: "button-example-control" }),
  "secondary-selected": () =>
    createElement(Button, {
      label: "Cancel",
      variant: "secondary",
      selected: true,
      className: "button-example-control",
    }),
  "secondary-disabled": () =>
    createElement(Button, {
      label: "Cancel",
      variant: "secondary",
      disabled: true,
      className: "button-example-control",
    }),
  "secondary-loading": () =>
    createElement(Button, {
      label: "Cancel",
      variant: "secondary",
      loading: true,
      className: "button-example-control",
    }),
  "odds-default": () =>
    createElement(SelectableOddsButton, {
      label: "Lower / Same",
      direction: "down",
      fullWidth: false,
      className: "button-example-control showroom-fixed-width",
    }),
  "cashout": () =>
    createElement(Button, {
      label: "Cashout",
      variant: "cashout",
      fullWidth: false,
      className: "button-example-control showroom-fixed-width",
    }),
  "ghost-default": () =>
    createElement(Button, { label: "Cancel", variant: "ghost", className: "button-example-control" }),
  "ghost-disabled": () =>
    createElement(Button, {
      label: "Cancel",
      variant: "ghost",
      disabled: true,
      className: "button-example-control",
    }),
};

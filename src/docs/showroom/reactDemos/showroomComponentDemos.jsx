import { createElement } from "react";
import { AuthCard } from "../../../components/AuthCard/AuthCard.tsx";

/** @type {Record<string, () => import("react").ReactElement>} */
export const SHOWROOM_COMPONENT_REACT_DEMOS = {
  "showroom-auth-card": () =>
    createElement(AuthCard, {
      onSubmit: (event) => {
        event.preventDefault();
      },
    }),
};

import { createElement, useState } from "react";
import bombSrc from "../../../../assets/bomb.png";
import jokerCoinSrc from "../../../../assets/jokerCoin.svg";
import { BetAmountInput } from "../../../components/BetAmountInput/BetAmountInput.tsx";
import { GoldNuggetsInput } from "../../../components/GoldNuggetsInput/GoldNuggetsInput.tsx";
import { Input } from "../../../components/Input/Input.tsx";
import { MultiplierInput } from "../../../components/MultiplierInput/MultiplierInput.tsx";
import { NumberOfBetsInput } from "../../../components/NumberOfBetsInput/NumberOfBetsInput.tsx";
import { PlusMinusInput } from "../../../components/PlusMinusInput/PlusMinusInput.tsx";
import { RoundsToWinInput } from "../../../components/RoundsToWinInput/RoundsToWinInput.tsx";
import { Select } from "../../../components/Select/Select.tsx";

const dynamiteOptions = Array.from({ length: 12 }, (_, index) => ({
  value: String(index + 1),
  label: `${index + 1} ${index === 0 ? "Mine" : "Mines"}`,
}));

/** @type {Record<string, () => import("react").ReactElement>} */
export const INPUT_REACT_DEMOS = {
  "input-text-default": () =>
    createElement(Input, {
      label: "Field Label",
      placeholder: "Placeholder",
      className: "live text",
    }),
  "input-state-default": () =>
    createElement(Input, {
      label: "Field Label",
      placeholder: "Placeholder",
      className: "text default",
    }),
  "input-state-focus": () =>
    createElement(Input, {
      label: "Field Label",
      placeholder: "Placeholder",
      className: "text focus",
    }),
  "input-state-success": () =>
    createElement(Input, {
      label: "Field Label",
      value: "Valid value",
      status: "success",
      message: "Looks good",
      readOnly: true,
      className: "text success",
    }),
  "input-state-error": () =>
    createElement(Input, {
      label: "Field Label",
      value: "Invalid value",
      error: "Error message",
      readOnly: true,
      className: "text error",
    }),
  "input-state-disabled": () =>
    createElement(Input, {
      label: "Field Label",
      placeholder: "Placeholder",
      disabled: true,
      className: "text disabled",
    }),
  "input-select-generic": () =>
    createElement(Select, {
      label: "Category",
      defaultValue: "a",
      options: [
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
        { value: "c", label: "Option C" },
      ],
      className: "live",
    }),
  "input-dropdown": () =>
    createElement(Select, {
      label: "Dynamite",
      defaultValue: "1",
      options: dynamiteOptions,
      className: "live joker-dynamite-input",
      leftIcon: createElement("img", {
        className: "joker-dynamite-icon",
        src: bombSrc,
        alt: "",
      }),
    }),
  "input-bet-amount": () =>
    createElement(BetAmountInput, {
      label: "Bet amount",
      placeholder: "0",
      prefix: createElement("img", { src: jokerCoinSrc, alt: "" }),
    }),
  "input-gold-nuggets": () =>
    createElement(GoldNuggetsInput, {
      label: "Gold bars",
      value: "24",
    }),
  "input-number-of-bets": () =>
    createElement(NumberOfBetsInput, {
      label: "Number of bets",
      placeholder: "0",
      selected: true,
    }),
  "input-multiplier": () =>
    createElement(MultiplierInput, {
      label: "Cash out at",
      defaultValue: 1,
      className: "live",
    }),
  "input-plus-minus": () => {
    function PlusMinusInputDemo() {
      const [value, setValue] = useState(1);

      return createElement(PlusMinusInput, {
        value,
        min: 0,
        max: 20,
        minusLabel: "Decrease value",
        plusLabel: "Increase value",
        onMinusClick: () => setValue((current) => Math.max(0, current - 1)),
        onPlusClick: () => setValue((current) => Math.min(20, current + 1)),
      });
    }

    return createElement(PlusMinusInputDemo);
  },
  "input-rounds-to-win": () =>
    createElement(RoundsToWinInput, {
      label: "Rounds to win",
      className: "live",
    }),
};

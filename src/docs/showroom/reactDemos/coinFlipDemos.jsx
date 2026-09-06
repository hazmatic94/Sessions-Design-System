import { createElement, useCallback, useState } from "react";
import { Button } from "../../../components/Button/Button.tsx";
import { Coin } from "../../../components/Coin/Coin.tsx";
import { CoinFlipBettingPanel } from "../../../components/CoinFlipBettingPanel/CoinFlipBettingPanel.tsx";
import { CoinProgression } from "../../../components/CoinProgression/CoinProgression.tsx";
import { CoinReceiver } from "../../../components/CoinProgression/CoinReceiver.tsx";

const coinFlipOddsOptions = [
  { value: "heads", label: "Heads", sideIcon: "heads" },
  { value: "tails", label: "Tails", sideIcon: "tails" },
];

const coinFlipBettingPanelProps = {
  oddsOptions: coinFlipOddsOptions,
  onPlaceBet: () => {},
};

const SHOWROOM_WIN_CHIP_SIZE = 112;
const SHOWROOM_COIN_SIZE = "85px";
const SHOWROOM_TOSS_COIN_SIZE = "200px";

function CoinProgressionExample() {
  return createElement(CoinProgression, {
    steps: [{ multiplier: "2.50x" }],
    activeIndex: 0,
    completedThrough: 0,
    receiverSize: SHOWROOM_WIN_CHIP_SIZE,
    renderCoin: () =>
      createElement(Coin, {
        side: "heads",
        style: { "--coin-size": SHOWROOM_COIN_SIZE },
      }),
  });
}

function CoinReceiverStatesDemo() {
  const item = (hint, receiver) =>
    createElement(
      "div",
      { className: "joker-coin-progression-demo__item" },
      createElement("p", { className: "joker-coin-progression-demo__hint" }, hint),
      receiver,
    );

  return createElement(
    "div",
    { className: "joker-coin-progression-demo joker-coin-progression-demo--receiver-states" },
    item("inactive", createElement(CoinReceiver, { state: "inactive" })),
    item("active", createElement(CoinReceiver, { state: "active" })),
    item(
      "completed",
      createElement(
        CoinReceiver,
        { state: "completed" },
        createElement(Coin, { side: "heads" }),
      ),
    ),
    item(
      "loss",
      createElement(
        CoinReceiver,
        { state: "loss" },
        createElement(Coin, { side: "heads" }),
      ),
    ),
  );
}

function CoinReceiverLossDemo() {
  const [losing, setLosing] = useState(false);

  return createElement(
    "div",
    { className: "joker-coin-progression-demo" },
    createElement(
      CoinReceiver,
      {
        state: "active",
        losing,
        onLossComplete: () => setLosing(false),
      },
      createElement(Coin, { side: "heads" }),
    ),
    createElement(
      "div",
      { className: "joker-coin-progression-demo__actions" },
      createElement(Button, {
        label: "Demo",
        variant: "ghost",
        onClick: () => setLosing(true),
        disabled: losing,
      }),
    ),
  );
}

function CoinTossDemo() {
  const [side, setSide] = useState("heads");
  const [phase, setPhase] = useState("idle");
  const [outcome, setOutcome] = useState("heads");
  const [hintVisible, setHintVisible] = useState(true);

  const flip = useCallback(() => {
    if (phase === "tossing") return;
    setHintVisible(false);
    setOutcome(Math.random() > 0.5 ? "heads" : "tails");
    setPhase("tossing");
  }, [phase]);

  return createElement(
    "div",
    { className: "joker-coin-toss-demo" },
    createElement(
      "button",
      {
        type: "button",
        className: "joker-coin-toss__tap-target",
        onClick: flip,
        disabled: phase === "tossing",
        "aria-label": "Flip coin",
      },
      createElement(Coin, {
        side,
        tossPhase: phase,
        tossOutcome: outcome,
        onTossEnd: () => {
          setSide(outcome);
          setPhase("idle");
          setHintVisible(true);
        },
        tapHint: "Tap to flip",
        tapHintVisible: hintVisible,
        style: { "--coin-size": SHOWROOM_TOSS_COIN_SIZE },
      }),
    ),
  );
}

/** @type {Record<string, () => import("react").ReactElement>} */
export const COINFLIP_REACT_DEMOS = {
  "coinflip-heads": () =>
    createElement(Coin, { side: "heads", style: { "--coin-size": "256px" } }),
  "home-games-coin": () =>
    createElement(Coin, { side: "heads", style: { "--coin-size": "168px" } }),
  "coinflip-tails": () =>
    createElement(Coin, { side: "tails", style: { "--coin-size": "256px" } }),
  "coinflip-joker": () =>
    createElement(Coin, { side: "joker", style: { "--coin-size": "256px" } }),
  "coinflip-progression": () => createElement(CoinProgressionExample),
  "coinflip-receiver-states": () => createElement(CoinReceiverStatesDemo),
  "coinflip-receiver-loss": () => createElement(CoinReceiverLossDemo),
  "coinflip-toss": () => createElement(CoinTossDemo),
  "coinflip-betting-desktop": () =>
    createElement(CoinFlipBettingPanel, coinFlipBettingPanelProps),
  "coinflip-betting-ingame": () =>
    createElement(CoinFlipBettingPanel, {
      ...coinFlipBettingPanelProps,
      inGame: true,
      onCashout: () => {},
    }),
  "coinflip-betting-mobile": () =>
    createElement(CoinFlipBettingPanel, {
      ...coinFlipBettingPanelProps,
      layout: "mobile",
    }),
  "coinflip-betting-mobile-ingame": () =>
    createElement(CoinFlipBettingPanel, {
      ...coinFlipBettingPanelProps,
      layout: "mobile",
      inGame: true,
      onCashout: () => {},
    }),
};

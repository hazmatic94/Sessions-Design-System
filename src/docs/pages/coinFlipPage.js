import {pageHero, section} from '../shell/pageLayout.js';
import {cardExampleCard} from './cardsPage.js';

export function renderCoinFlipPage(page) {
  return `
    ${pageHero(page)}
    ${section('Coin', '', coinExamples(), 'button-example-section card-example-section')}
    ${section('Coin Progression', '', coinProgressionExamples(), 'button-example-section card-example-section')}
    ${section('Coin Toss', '', coinTossExamples(), 'button-example-section card-example-section')}
    ${section('Odds Button Group', '', oddsButtonGroupExamples(), 'button-example-section card-example-section')}
  `;
}

function coinExamples() {
  return `
    ${cardExampleCard({
      id: 'coin-heads-example',
      tocTitle: 'Heads',
      reactDemo: 'coinflip-heads',
      codeId: 'coin-heads-code',
      filename: 'Coin.tsx',
      code: sampleCoinCode(),
      className: 'is-coin',
    })}
    ${cardExampleCard({
      id: 'coin-tails-example',
      tocTitle: 'Tails',
      reactDemo: 'coinflip-tails',
      codeId: 'coin-tails-code',
      filename: 'Coin.tsx',
      code: sampleCoinTailsCode(),
      className: 'is-coin',
    })}
    ${cardExampleCard({
      id: 'coin-joker-example',
      tocTitle: 'Mines',
      reactDemo: 'coinflip-joker',
      codeId: 'coin-joker-code',
      filename: 'Coin.tsx',
      code: sampleCoinJokerCode(),
      className: 'is-coin',
    })}
  `;
}

function coinProgressionExamples() {
  return cardExampleCard({
    id: 'coin-progression-example',
    tocTitle: 'Progression',
    reactDemo: 'coinflip-progression',
    codeId: 'coin-progression-code',
    filename: 'CoinProgression.tsx',
    code: sampleCoinProgressionCode(),
    className: 'is-coin is-coin-progression',
  });
}

function coinTossExamples() {
  return cardExampleCard({
    id: 'coin-toss-example',
    tocTitle: 'Thumb toss',
    reactDemo: 'coinflip-toss',
    codeId: 'coin-toss-code',
    filename: 'Coin.tsx',
    code: sampleCoinTossCode(),
    className: 'is-coin is-coin-toss',
  });
}

function oddsButtonGroupExamples() {
  return `
    ${cardExampleCard({
      id: 'coinflip-odds-button-group-example',
      tocTitle: 'Heads / Tails',
      reactDemo: 'card-odds-heads-tails',
      codeId: 'coinflip-odds-button-group-code',
      filename: 'OddsButtonGroup.tsx',
      code: sampleHeadsTailsOddsGroupCode(),
      className: 'is-odds-button-group is-showroom-300',
    })}
    ${cardExampleCard({
      id: 'coinflip-odds-button-group-mobile-example',
      tocTitle: 'Heads / Tails Mobile Inline',
      reactDemo: 'card-odds-heads-tails-mobile',
      codeId: 'coinflip-odds-button-group-mobile-code',
      filename: 'MobileOddsButtonGroup.tsx',
      code: sampleMobileOddsGroupCode(),
      className: 'is-odds-button-group',
    })}
  `;
}

function sampleCoinCode() {
  return `import { Coin } from "@joker/design-system";

export function CoinExample() {
  return <Coin side="heads" style={{ "--coin-size": "256px" }} />;
}`;
}

function sampleCoinTailsCode() {
  return `import { Coin } from "@joker/design-system";

export function CoinTailsExample() {
  return <Coin side="tails" style={{ "--coin-size": "256px" }} />;
}`;
}

function sampleCoinJokerCode() {
  return `import { Coin } from "@joker/design-system";

export function CoinJokerExample() {
  return <Coin side="joker" style={{ "--coin-size": "256px" }} />;
}`;
}

function sampleCoinProgressionCode() {
  return `import { Coin, CoinProgression } from "@joker/design-system";

export function CoinProgressionExample() {
  return (
    <CoinProgression
      steps={[{ multiplier: "2.50x" }]}
      activeIndex={0}
      completedThrough={0}
      receiverSize={112}
      renderCoin={() => <Coin side="heads" style={{ "--coin-size": "85px" }} />}
    />
  );
}`;
}

function sampleCoinTossCode() {
  return `import { useCallback, useState } from "react";
import { Coin } from "@joker/design-system";

export function CoinTossExample() {
  const [side, setSide] = useState<"heads" | "tails">("heads");
  const [phase, setPhase] = useState<"idle" | "tossing">("idle");
  const [outcome, setOutcome] = useState<"heads" | "tails">("heads");
  const [hintVisible, setHintVisible] = useState(true);

  const flip = useCallback(() => {
    if (phase === "tossing") return;
    setHintVisible(false);
    setOutcome(Math.random() > 0.5 ? "heads" : "tails");
    setPhase("tossing");
  }, [phase]);

  return (
    <button type="button" className="joker-coin-toss__tap-target" onClick={flip} disabled={phase === "tossing"} aria-label="Flip coin">
      <Coin
        side={side}
        tossPhase={phase}
        tossOutcome={outcome}
        onTossEnd={() => {
          setSide(outcome);
          setPhase("idle");
          setHintVisible(true);
        }}
        tapHint="Tap to flip"
        tapHintVisible={hintVisible}
        style={{ "--coin-size": "200px" }}
      />
    </button>
  );
}`;
}

function sampleHeadsTailsOddsGroupCode() {
  return `import { OddsButtonGroup } from "@joker/design-system";

export function HeadsTailsOddsGroup() {
  return (
    <OddsButtonGroup
      options={[
        { value: "heads", label: "Heads", sideIcon: "heads" },
        { value: "tails", label: "Tails", sideIcon: "tails" },
      ]}
      onValueChange={(value) => {
        console.log(value);
      }}
    />
  );
}`;
}

function sampleMobileOddsGroupCode() {
  return `import { OddsButtonGroup } from "@joker/design-system";

export function MobileOddsGroup() {
  return (
    <OddsButtonGroup
      label={null}
      layout="inline"
      options={[
        { value: "heads", label: "Heads", sideIcon: "heads" },
        { value: "tails", label: "Tails", sideIcon: "tails" },
      ]}
    />
  );
}`;
}

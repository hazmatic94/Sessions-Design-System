import {componentExampleWrapper, pageHero, section} from '../shell/pageLayout.js';

export function renderInputsPage(page) {
  return `
    ${pageHero(page)}
    ${section('Input Primitive', '', inputPrimitiveExamples(), 'button-example-section input-example-section')}
    ${section('Status States', '', inputStateExamples(), 'button-example-section input-example-section')}
    ${section('Select Field', '', selectFieldExamples(), 'button-example-section input-example-section')}
    ${section('Product Numeric Fields', '', productNumericFieldExamples(), 'button-example-section input-example-section')}
    ${section('Mines Fields', '', minesFieldExamples(), 'button-example-section input-example-section')}
  `;
}

function inputPrimitiveExamples() {
  return `
    ${inputExampleCard({
      id: 'text-input-default-example',
      tocTitle: 'Default',
      reactDemo: 'input-text-default',
      codeId: 'text-input-default-code',
      filename: 'TextInput.tsx',
      code: sampleTextInputCode(),
    })}
  `;
}

function selectFieldExamples() {
  return inputExampleCard({
    id: 'select-input-example',
    tocTitle: 'Default',
    reactDemo: 'input-select-generic',
    codeId: 'select-input-code',
    filename: 'Select.tsx',
    code: sampleSelectInputCode(),
  });
}

function productNumericFieldExamples() {
  return `
    ${inputExampleCard({
      id: 'bet-amount-input-example',
      tocTitle: 'Bet Amount',
      reactDemo: 'input-bet-amount',
      codeId: 'bet-amount-input-code',
      filename: 'BetAmountInput.tsx',
      code: sampleBetAmountInputCode(),
    })}
    ${inputExampleCard({
      id: 'number-of-bets-input-example',
      tocTitle: 'Number of Bets',
      reactDemo: 'input-number-of-bets',
      codeId: 'number-of-bets-input-code',
      filename: 'NumberOfBetsInput.tsx',
      code: sampleNumberOfBetsInputCode(),
    })}
    ${inputExampleCard({
      id: 'multiplier-input-example',
      tocTitle: 'Multiplier',
      reactDemo: 'input-multiplier',
      codeId: 'multiplier-input-code',
      filename: 'MultiplierInput.tsx',
      code: sampleMultiplierInputCode(),
    })}
    ${inputExampleCard({
      id: 'plus-minus-input-example',
      tocTitle: 'Plus Minus',
      reactDemo: 'input-plus-minus',
      codeId: 'plus-minus-input-code',
      filename: 'PlusMinusInput.tsx',
      code: samplePlusMinusInputCode(),
    })}
    ${inputExampleCard({
      id: 'rounds-to-win-input-example',
      tocTitle: 'Rounds to Win',
      reactDemo: 'input-rounds-to-win',
      codeId: 'rounds-to-win-input-code',
      filename: 'RoundsToWinInput.tsx',
      code: sampleRoundsToWinInputCode(),
    })}
  `;
}

function minesFieldExamples() {
  return `
    ${inputExampleCard({
      id: 'mines-dynamite-input-example',
      tocTitle: 'Dynamite',
      reactDemo: 'input-dropdown',
      codeId: 'mines-dynamite-input-code',
      filename: 'Select.tsx',
      code: sampleMinesDynamiteInputCode(),
    })}
    ${inputExampleCard({
      id: 'mines-gold-nuggets-input-example',
      tocTitle: 'Gold bars',
      reactDemo: 'input-gold-nuggets',
      codeId: 'mines-gold-nuggets-input-code',
      filename: 'GoldNuggetsInput.tsx',
      code: sampleMinesGoldNuggetsInputCode(),
    })}
  `;
}

function inputStateExamples() {
  return `
    ${inputExampleCard({
      id: 'input-state-default-example',
      tocTitle: 'Default',
      reactDemo: 'input-state-default',
      codeId: 'input-state-default-code',
      filename: 'InputDefaultState.tsx',
      code: sampleInputDefaultStateCode(),
    })}
    ${inputExampleCard({
      id: 'input-state-focus-example',
      tocTitle: 'Focus',
      reactDemo: 'input-state-focus',
      codeId: 'input-state-focus-code',
      filename: 'InputFocusState.tsx',
      code: sampleInputFocusStateCode(),
    })}
    ${inputExampleCard({
      id: 'input-state-success-example',
      tocTitle: 'Success',
      reactDemo: 'input-state-success',
      codeId: 'input-state-success-code',
      filename: 'InputSuccessState.tsx',
      code: sampleInputSuccessStateCode(),
    })}
    ${inputExampleCard({
      id: 'input-state-error-example',
      tocTitle: 'Error',
      reactDemo: 'input-state-error',
      codeId: 'input-state-error-code',
      filename: 'InputErrorState.tsx',
      code: sampleInputErrorStateCode(),
    })}
    ${inputExampleCard({
      id: 'input-state-disabled-example',
      tocTitle: 'Disabled',
      reactDemo: 'input-state-disabled',
      codeId: 'input-state-disabled-code',
      filename: 'InputDisabledState.tsx',
      code: sampleInputDisabledStateCode(),
    })}
  `;
}

export function inputExampleCard({id, tocTitle, preview, reactDemo, codeId, filename, code}) {
  return componentExampleWrapper({
    id,
    tocTitle,
    preview,
    reactDemo,
    codeId,
    filename,
    code,
    size: 'md',
    className: 'input-example',
    stageClassName: 'input-example-stage',
    previewClassName: 'input-example-preview',
  });
}
function sampleTextInputCode() {
  return `import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { Input } from "@joker/design-system";

export function TextInputExample() {
  const [email, setEmail] = useState("");
  const emailError = email ? "" : "This field is required";
  const isSubmitting = false;

  return (
    <Input
      label="Email"
      placeholder="Enter email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      helperText="We'll never share your email"
      error={emailError}
      required
      disabled={isSubmitting}
      fullWidth
      leftIcon={<Mail />}
      rightIcon={<Check />}
      status={emailError ? "error" : "success"}
    />
  );
}`;
}

function sampleSelectInputCode() {
  return `import { Select } from "@joker/design-system";

export function SelectInputExample() {
  return (
    <Select
      label="Category"
      defaultValue="a"
      options={[
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
        { value: "c", label: "Option C" },
      ]}
    />
  );
}`;
}

function sampleMultiplierInputCode() {
  return `import { MultiplierInput } from "@joker/design-system";

export function MultiplierInputExample() {
  return (
    <MultiplierInput
      label="Cash out at"
      defaultValue={1}
      min={1}
      step={0.1}
      suffix="x"
    />
  );
}`;
}

function samplePlusMinusInputCode() {
  return `import { useState } from "react";
import { PlusMinusInput } from "@joker/design-system";

export function PlusMinusInputExample() {
  const [value, setValue] = useState(1);

  return (
    <PlusMinusInput
      value={value}
      min={0}
      max={20}
      minusLabel="Decrease value"
      plusLabel="Increase value"
      onMinusClick={() => setValue((current) => Math.max(0, current - 1))}
      onPlusClick={() => setValue((current) => Math.min(20, current + 1))}
    />
  );
}`;
}

function sampleRoundsToWinInputCode() {
  return `import { RoundsToWinInput } from "@joker/design-system";

export function RoundsToWinInputExample() {
  return (
    <RoundsToWinInput
      label="Rounds to win"
      options={[
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
      ]}
    />
  );
}`;
}

function sampleBetAmountInputCode() {
  return `import { BetAmountInput } from "@joker/design-system";

export function BetAmountInputExample() {
  return (
    <BetAmountInput
      label="Bet amount"
      placeholder="0"
      message="Numbers only"
    />
  );
}`;
}

function sampleNumberOfBetsInputCode() {
  return `import { NumberOfBetsInput } from "@joker/design-system";

export function NumberOfBetsInputExample() {
  return (
    <NumberOfBetsInput
      label="Number of bets"
      placeholder="0"
      selected
    />
  );
}`;
}

function sampleInputDefaultStateCode() {
  return `import { Input } from "@joker/design-system";

export function InputDefaultStateExample() {
  return <Input label="Field Label" placeholder="Placeholder" />;
}`;
}

function sampleInputFocusStateCode() {
  return `import { Input } from "@joker/design-system";

export function InputFocusStateExample() {
  return <Input label="Field Label" placeholder="Placeholder" />;
}`;
}

function sampleInputSuccessStateCode() {
  return `import { Input } from "@joker/design-system";

export function InputSuccessStateExample() {
  return (
    <Input
      label="Field Label"
      value="Valid value"
      status="success"
      helperText="Looks good"
    />
  );
}`;
}

function sampleInputErrorStateCode() {
  return `import { Input } from "@joker/design-system";

export function InputErrorStateExample() {
  return (
    <Input
      label="Field Label"
      value="Invalid value"
      error="Error message"
    />
  );
}`;
}

function sampleInputDisabledStateCode() {
  return `import { Input } from "@joker/design-system";

export function InputDisabledStateExample() {
  return <Input label="Field Label" placeholder="Placeholder" disabled />;
}`;
}

function sampleMinesDynamiteInputCode() {
  return `import { Select } from "@joker/design-system";

export function MinesDynamiteInputExample() {
  return (
    <Select
      label="Dynamite"
      defaultValue="1"
      options={[
        { value: "1", label: "1 Mine" },
        { value: "2", label: "2 Mines" },
        { value: "3", label: "3 Mines" },
      ]}
    />
  );
}`;
}

function sampleMinesGoldNuggetsInputCode() {
  return `import { GoldNuggetsInput } from "@joker/design-system";

export function MinesGoldNuggetsInputExample() {
  return (
    <GoldNuggetsInput
      label="Gold bars"
      value="24"
    />
  );
}`;
}

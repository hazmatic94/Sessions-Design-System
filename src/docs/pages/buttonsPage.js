import { componentExampleWrapper, pageHero, section } from "../shell/pageLayout.js";

export function renderButtonsPage(page) {
  return `
    ${pageHero(page)}
    ${section('Primary Button', '', primaryButtonExamples(), 'button-example-section card-example-section')}
    ${section('Secondary Button', '', secondaryButtonExamples(), 'button-example-section card-example-section')}
    ${section('Odds Button', '', oddsButtonExamples(), 'button-example-section card-example-section')}
    ${section('Ghost Button', '', ghostButtonExamples(), 'button-example-section card-example-section')}
  `;
}

function primaryButtonExamples() {
  return `
    ${componentExampleWrapper({
      id: 'primary-default-button',
      tocTitle: 'Default Button',
      reactDemo: 'primary-default',
      codeId: 'button-code',
      filename: 'PrimaryButton.tsx',
      code: sampleButtonCode(),
    })}
    ${componentExampleWrapper({
      id: 'primary-disabled-button',
      tocTitle: 'Disabled Button',
      reactDemo: 'primary-disabled',
      codeId: 'disabled-button-code',
      filename: 'PrimaryDisabledButton.tsx',
      code: sampleDisabledButtonCode(),
    })}
    ${componentExampleWrapper({
      id: 'primary-loading-button',
      tocTitle: 'Loading Button',
      reactDemo: 'primary-loading',
      codeId: 'loading-button-code',
      filename: 'PrimaryLoadingButton.tsx',
      code: sampleLoadingButtonCode(),
    })}
  `;
}

function secondaryButtonExamples() {
  return `
    ${componentExampleWrapper({
      id: 'secondary-default-button',
      tocTitle: 'Default Button',
      reactDemo: 'secondary-default',
      codeId: 'secondary-button-code',
      filename: 'SecondaryButton.tsx',
      code: sampleSecondaryButtonCode(),
    })}
    ${componentExampleWrapper({
      id: 'secondary-selected-button',
      tocTitle: 'Selected Button',
      reactDemo: 'secondary-selected',
      codeId: 'secondary-selected-button-code',
      filename: 'SecondarySelectedButton.tsx',
      code: sampleSecondarySelectedButtonCode(),
    })}
    ${componentExampleWrapper({
      id: 'secondary-disabled-button',
      tocTitle: 'Disabled Button',
      reactDemo: 'secondary-disabled',
      codeId: 'secondary-disabled-button-code',
      filename: 'SecondaryDisabledButton.tsx',
      code: sampleSecondaryDisabledButtonCode(),
    })}
    ${componentExampleWrapper({
      id: 'secondary-loading-button',
      tocTitle: 'Loading Button',
      reactDemo: 'secondary-loading',
      codeId: 'secondary-loading-button-code',
      filename: 'SecondaryLoadingButton.tsx',
      code: sampleSecondaryLoadingButtonCode(),
    })}
  `;
}

function oddsButtonExamples() {
  return `
    ${componentExampleWrapper({
      id: 'odds-button',
      tocTitle: 'Odds Button',
      reactDemo: 'odds-default',
      codeId: 'odds-button-code',
      filename: 'OddsButton.tsx',
      code: sampleOddsButtonCode(),
    })}
    ${componentExampleWrapper({
      id: 'cashout-button',
      tocTitle: 'Cashout Button',
      reactDemo: 'cashout',
      codeId: 'cashout-button-code',
      filename: 'CashoutButton.tsx',
      code: sampleCashoutButtonCode(),
    })}
  `;
}

function ghostButtonExamples() {
  return `
    ${componentExampleWrapper({
      id: 'ghost-default-button',
      tocTitle: 'Default Button',
      reactDemo: 'ghost-default',
      codeId: 'ghost-button-code',
      filename: 'GhostButton.tsx',
      code: sampleGhostButtonCode(),
    })}
    ${componentExampleWrapper({
      id: 'ghost-disabled-button',
      tocTitle: 'Disabled Button',
      reactDemo: 'ghost-disabled',
      codeId: 'ghost-disabled-button-code',
      filename: 'GhostDisabledButton.tsx',
      code: sampleGhostDisabledButtonCode(),
    })}
  `;
}

function sampleButtonCode() {
  return `import { Button } from "@joker/design-system";

export function PrimaryButton() {
  return <Button label="Confirm" />;
}

export function PrimaryFullWidthButton() {
  return <Button label="Confirm" fullWidth />;
}`;
}

function sampleDisabledButtonCode() {
  return `import { Button } from "@joker/design-system";

export function PrimaryDisabledButton() {
  return <Button label="Confirm" disabled />;
}`;
}

function sampleSecondaryButtonCode() {
  return `import { Button } from "@joker/design-system";

export function SecondaryButton() {
  return <Button label="Cancel" variant="secondary" />;
}

export function SecondaryFullWidthButton() {
  return <Button label="Cancel" variant="secondary" fullWidth />;
}`;
}

function sampleSecondarySelectedButtonCode() {
  return `import { Button } from "@joker/design-system";

export function SecondarySelectedButton() {
  return <Button label="Cancel" variant="secondary" selected />;
}`;
}

function sampleSecondaryDisabledButtonCode() {
  return `import { Button } from "@joker/design-system";

export function SecondaryDisabledButton() {
  return <Button label="Cancel" variant="secondary" disabled />;
}`;
}

function sampleSecondaryLoadingButtonCode() {
  return `import { Button } from "@joker/design-system";

export function SecondaryLoadingButton() {
  return <Button label="Cancel" variant="secondary" loading />;
}`;
}

function sampleOddsButtonCode() {
  return `import { OddsButton } from "@joker/design-system";

export function OddsButtonExample() {
  return (
    <OddsButton
      label="Lower / Same"
      direction="down"
    />
  );
}`;
}

function skipButtonChevronMarkup() {
  return `
    <svg class="joker-skip-button__chevron" viewBox="0 0 8 8" aria-hidden="true" focusable="false">
      <path d="M2 1.5 5.5 4 2 6.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
    </svg>
  `;
}

function skipButtonPreview() {
  return `
    <button class="joker-skip-button button-example-control" type="button" aria-label="Skip">
      <span class="joker-skip-button__icon" aria-hidden="true">
        ${skipButtonChevronMarkup()}
        ${skipButtonChevronMarkup()}
      </span>
    </button>
  `;
}

function sampleSkipButtonCode() {
  return `import { SkipButton } from "@joker/design-system";
import "@joker/design-system/styles.css";

export function Example() {
  return <SkipButton onClick={() => {}} />;
}`;
}

function sampleHiLoSkipCardButtonCode() {
  return `import { Button } from "@joker/design-system";
import { ChevronRight } from "lucide-react";

export function HiLoSkipCardButton() {
  return (
    <Button variant="hi-lo-skip" fullWidth>
      <span className="joker-hi-lo-skip-label">Skip Card</span>
      <span className="joker-hi-lo-skip-icon" aria-hidden="true">
        <ChevronRight />
      </span>
    </Button>
  );
}`;
}

function sampleCashoutButtonCode() {
  return `import { Button } from "@joker/design-system";

export function CashoutButton() {
  return <Button label="Cashout" variant="cashout" fullWidth />;
}`;
}

function sampleGhostButtonCode() {
  return `import { Button } from "@joker/design-system";

export function GhostButton() {
  return <Button label="Cancel" variant="ghost" />;
}`;
}

function sampleGhostDisabledButtonCode() {
  return `import { Button } from "@joker/design-system";

export function GhostDisabledButton() {
  return <Button label="Cancel" variant="ghost" disabled />;
}`;
}

function sampleLoadingButtonCode() {
  return `import { Button } from "@joker/design-system";

export function PrimaryLoadingButton() {
  return <Button loading>DEPOSIT</Button>;
}`;
}

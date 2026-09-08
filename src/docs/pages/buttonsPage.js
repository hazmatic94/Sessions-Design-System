import { componentExampleWrapper, pageHero, section } from "../shell/pageLayout.js?v=sessions-docs-cta-v1";
import { renderPrimaryButton, renderSecondaryButton, renderGhostButton } from "../../components/button/index.js?v=sessions-button-v17";

export function renderButtonsPage(page) {
  return `
    ${pageHero(page)}
    ${section('Primary Button', '', primaryButtonExamples(), 'button-example-section card-example-section')}
    ${section('Secondary Button', '', secondaryButtonExamples(), 'button-example-section card-example-section')}
    ${section('Ghost Button', '', ghostButtonExamples(), 'button-example-section card-example-section')}
  `;
}

function primaryButtonExamples() {
  return `
    ${componentExampleWrapper({
      id: 'primary-default-button',
      tocTitle: 'Default Button',
      preview: renderPrimaryButton({ label: 'Confirm' }),
      codeId: 'button-code',
      filename: 'PrimaryButton.tsx',
      code: sampleButtonCode(),
    })}
    ${componentExampleWrapper({
      id: 'primary-disabled-button',
      tocTitle: 'Disabled Button',
      preview: renderPrimaryButton({ label: 'Confirm', disabled: true }),
      codeId: 'disabled-button-code',
      filename: 'PrimaryDisabledButton.tsx',
      code: sampleDisabledButtonCode(),
    })}
    ${componentExampleWrapper({
      id: 'primary-loading-button',
      tocTitle: 'Loading Button',
      preview: renderPrimaryButton({ label: 'Confirm', loading: true }),
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
      preview: renderSecondaryButton({ label: 'Cancel' }),
      codeId: 'secondary-button-code',
      filename: 'SecondaryButton.tsx',
      code: sampleSecondaryButtonCode(),
    })}
    ${componentExampleWrapper({
      id: 'secondary-disabled-button',
      tocTitle: 'Disabled Button',
      preview: renderSecondaryButton({ label: 'Cancel', disabled: true }),
      codeId: 'secondary-disabled-button-code',
      filename: 'SecondaryDisabledButton.tsx',
      code: sampleSecondaryDisabledButtonCode(),
    })}
    ${componentExampleWrapper({
      id: 'secondary-loading-button',
      tocTitle: 'Loading Button',
      preview: renderSecondaryButton({ label: 'Cancel', loading: true }),
      codeId: 'secondary-loading-button-code',
      filename: 'SecondaryLoadingButton.tsx',
      code: sampleSecondaryLoadingButtonCode(),
    })}
  `;
}

function ghostButtonExamples() {
  return `
    ${componentExampleWrapper({
      id: 'ghost-default-button',
      tocTitle: 'Default Button',
      preview: renderGhostButton({ label: 'Cancel' }),
      codeId: 'ghost-button-code',
      filename: 'GhostButton.tsx',
      code: sampleGhostButtonCode(),
    })}
    ${componentExampleWrapper({
      id: 'ghost-disabled-button',
      tocTitle: 'Disabled Button',
      preview: renderGhostButton({ label: 'Cancel', disabled: true }),
      codeId: 'ghost-disabled-button-code',
      filename: 'GhostDisabledButton.tsx',
      code: sampleGhostDisabledButtonCode(),
    })}
    ${componentExampleWrapper({
      id: 'ghost-loading-button',
      tocTitle: 'Loading Button',
      preview: renderGhostButton({ label: 'Cancel', loading: true }),
      codeId: 'ghost-loading-button-code',
      filename: 'GhostLoadingButton.tsx',
      code: sampleGhostLoadingButtonCode(),
    })}
  `;
}

function sampleButtonCode() {
  return `import { Button } from "@sessions/design-system";

export function PrimaryButton() {
  return <Button variant="primary">Confirm</Button>;
}

export function PrimaryFullWidthButton() {
  return <Button variant="primary" fullWidth>Confirm</Button>;
}`;
}

function sampleDisabledButtonCode() {
  return `import { Button } from "@sessions/design-system";

export function PrimaryDisabledButton() {
  return <Button variant="primary" disabled>Confirm</Button>;
}`;
}

function sampleSecondaryButtonCode() {
  return `import { Button } from "@sessions/design-system";

export function SecondaryButton() {
  return <Button variant="secondary">Cancel</Button>;
}

export function SecondaryFullWidthButton() {
  return <Button variant="secondary" fullWidth>Cancel</Button>;
}`;
}

function sampleSecondaryDisabledButtonCode() {
  return `import { Button } from "@sessions/design-system";

export function SecondaryDisabledButton() {
  return <Button variant="secondary" disabled>Cancel</Button>;
}`;
}

function sampleSecondaryLoadingButtonCode() {
  return `import { Button } from "@sessions/design-system";

export function SecondaryLoadingButton() {
  return <Button variant="secondary" loading>Cancel</Button>;
}`;
}

function sampleGhostButtonCode() {
  return `import { Button } from "@sessions/design-system";

export function GhostButton() {
  return <Button variant="ghost">Cancel</Button>;
}`;
}

function sampleGhostDisabledButtonCode() {
  return `import { Button } from "@sessions/design-system";

export function GhostDisabledButton() {
  return <Button variant="ghost" disabled>Cancel</Button>;
}`;
}

function sampleGhostLoadingButtonCode() {
  return `import { Button } from "@sessions/design-system";

export function GhostLoadingButton() {
  return <Button variant="ghost" loading>Cancel</Button>;
}`;
}

function sampleLoadingButtonCode() {
  return `import { Button } from "@sessions/design-system";

export function PrimaryLoadingButton() {
  return <Button variant="primary" loading>Confirm</Button>;
}`;
}

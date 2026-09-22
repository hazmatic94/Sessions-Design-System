import { componentExampleWrapper, pageHero, section } from "../shell/pageLayout.js?v=sessions-page-h2-v1";
import {
  renderGhostButton,
  renderPrimaryButton,
  renderSecondaryButton,
} from "../../components/button/index.js?v=sessions-button-v18";

export function renderButtonsPage(page) {
  return `
    ${pageHero(page)}
    ${section('Primary Button', '', primaryButtonExamples(), 'button-example-section card-example-section')}
    ${section('Secondary Button', '', secondaryButtonExamples(), 'button-example-section card-example-section')}
    ${section('Ghost Button', '', ghostButtonExamples(), 'button-example-section card-example-section')}
    ${section('Primary icon layouts', '', iconLayoutExamples({ variant: 'primary', renderButton: renderPrimaryButton, idPrefix: 'primary-button' }), 'button-example-section card-example-section')}
    ${section('Secondary icon layouts', '', iconLayoutExamples({ variant: 'secondary', renderButton: renderSecondaryButton, idPrefix: 'secondary-button' }), 'button-example-section card-example-section')}
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

const ICON_LAYOUT_COPY = {
  primary: {
    textOnly: "Confirm",
    iconStart: "Add service",
    iconEnd: "Next",
    iconOnlyAriaLabel: "Add service",
    filenamePrefix: "Primary",
  },
  secondary: {
    textOnly: "Cancel",
    iconStart: "Add client",
    iconEnd: "Next",
    iconOnlyAriaLabel: "Add client",
    filenamePrefix: "Secondary",
  },
};

function iconLayoutExamples({ variant, renderButton, idPrefix }) {
  const copy = ICON_LAYOUT_COPY[variant];

  return `
    ${componentExampleWrapper({
      id: `${idPrefix}-text-only-example`,
      tocTitle: "Text only",
      preview: renderButton({ label: copy.textOnly }),
      codeId: `${idPrefix}-text-only-code`,
      filename: `${copy.filenamePrefix}Button.tsx`,
      code: sampleButtonTextOnlyCode(variant, copy.textOnly),
    })}
    ${componentExampleWrapper({
      id: `${idPrefix}-icon-start-example`,
      tocTitle: "Icon start",
      preview: renderButton({ label: copy.iconStart, icon: "plus" }),
      codeId: `${idPrefix}-icon-start-code`,
      filename: `${copy.filenamePrefix}ButtonIconStart.tsx`,
      code: sampleButtonIconStartCode(variant, copy.iconStart),
    })}
    ${componentExampleWrapper({
      id: `${idPrefix}-icon-end-example`,
      tocTitle: "Icon end",
      preview: renderButton({
        label: copy.iconEnd,
        icon: "chevron-right",
        iconPosition: "end",
      }),
      codeId: `${idPrefix}-icon-end-code`,
      filename: `${copy.filenamePrefix}ButtonIconEnd.tsx`,
      code: sampleButtonIconEndCode(variant, copy.iconEnd),
    })}
    ${componentExampleWrapper({
      id: `${idPrefix}-icon-only-example`,
      tocTitle: "Icon only",
      preview: renderButton({ icon: "plus", ariaLabel: copy.iconOnlyAriaLabel }),
      codeId: `${idPrefix}-icon-only-code`,
      filename: `${copy.filenamePrefix}IconButton.tsx`,
      code: sampleButtonIconOnlyCode(variant, copy.iconOnlyAriaLabel),
    })}
  `;
}

function sampleButtonTextOnlyCode(variant, label) {
  return `import { Button } from "@sessions/design-system";

export function ${ICON_LAYOUT_COPY[variant].filenamePrefix}Button() {
  return <Button variant="${variant}">${label}</Button>;
}`;
}

function sampleButtonIconStartCode(variant, label) {
  return `import { Button } from "@sessions/design-system";

export function ${ICON_LAYOUT_COPY[variant].filenamePrefix}ButtonIconStart() {
  return (
    <Button variant="${variant}" icon="plus">
      ${label}
    </Button>
  );
}`;
}

function sampleButtonIconEndCode(variant, label) {
  return `import { Button } from "@sessions/design-system";

export function ${ICON_LAYOUT_COPY[variant].filenamePrefix}ButtonIconEnd() {
  return (
    <Button variant="${variant}" icon="chevron-right" iconPosition="end">
      ${label}
    </Button>
  );
}`;
}

function sampleButtonIconOnlyCode(variant, ariaLabel) {
  return `import { Button } from "@sessions/design-system";

export function ${ICON_LAYOUT_COPY[variant].filenamePrefix}IconButton() {
  return <Button variant="${variant}" icon="plus" aria-label="${ariaLabel}" />;
}`;
}

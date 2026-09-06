import {componentExampleWrapper, pageHero, section} from '../shell/pageLayout.js';

export function renderChipsPage(page) {
  return `
    ${pageHero(page)}
    ${section('Chip', '', chipExamples(), 'button-example-section card-example-section')}
    ${section('Status Chip', '', statusChipExamples(), 'button-example-section card-example-section')}
  `;
}

function chipExampleCard({
  id,
  tocTitle,
  preview,
  reactDemo,
  codeId,
  filename,
  code,
  className = '',
}) {
  return componentExampleWrapper({
    id,
    tocTitle,
    preview,
    reactDemo,
    codeId,
    filename,
    code,
    size: 'md',
    className: `chip-example${className ? ` ${className}` : ''}`,
    stageClassName: 'chip-example-stage',
    previewClassName: 'chip-example-preview',
  });
}

function chipExamples() {
  return chipExampleCard({
    id: 'chip-variants-example',
    tocTitle: 'Variants',
    reactDemo: 'chip-variants',
    codeId: 'chip-code',
    filename: 'Chip.tsx',
    code: sampleChipCode(),
    className: 'is-chip',
  });
}

function statusChipExamples() {
  return chipExampleCard({
    id: 'status-chip-example',
    tocTitle: 'Default',
    reactDemo: 'status-chip',
    codeId: 'status-chip-code',
    filename: 'StatusChip.tsx',
    code: sampleStatusChipCode(),
    className: 'is-status-chip',
  });
}

function sampleChipCode() {
  return `import { Chip } from "@joker/design-system";
import "@joker/design-system/styles.css";

export function Example() {
  return (
    <>
      <Chip variant="start" />
      <Chip variant="skip" />
      <Chip variant="win">1.57x</Chip>
      <Chip variant="loss">0.00x</Chip>
    </>
  );
}`;
}

function sampleStatusChipCode() {
  return `import { StatusChip } from "@joker/design-system";

export function StatusChipExample() {
  const matchCount = 12;

  return <StatusChip matchCount={matchCount} />;
}`;
}

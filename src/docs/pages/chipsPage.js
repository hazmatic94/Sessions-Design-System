import { componentExampleWrapper, pageHero, section } from "../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsChip } from "../../components/chip/index.js?v=sessions-chip-v3";

export function renderChipsPage(page) {
  return `
    ${pageHero(page)}
    ${section("Chip", "", chipExamples(), "button-example-section card-example-section")}
    ${section("Status Chip", "", statusChipExamples(), "button-example-section card-example-section")}
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
  className = "",
}) {
  return componentExampleWrapper({
    id,
    tocTitle,
    preview,
    reactDemo,
    codeId,
    filename,
    code,
    size: "md",
    className: `chip-example${className ? ` ${className}` : ""}`,
    stageClassName: "chip-example-stage",
    previewClassName: "chip-example-preview",
  });
}

function chipExamples() {
  return chipExampleCard({
    id: "chip-default-example",
    tocTitle: "Default",
    preview: `${renderSessionsChip({ label: "BOOKED" })}${renderSessionsChip({ label: "CANCELLED", className: "sessions-chip--cancelled" })}`,
    codeId: "chip-code",
    filename: "Chip.tsx",
    code: sampleChipCode(),
    className: "is-chip",
  });
}

function statusChipExamples() {
  return chipExampleCard({
    id: "status-chip-example",
    tocTitle: "Default",
    reactDemo: "status-chip",
    codeId: "status-chip-code",
    filename: "StatusChip.tsx",
    code: sampleStatusChipCode(),
    className: "is-status-chip",
  });
}

function sampleChipCode() {
  return `import { Chip } from "@sessions/design-system";

export function ChipExample() {
  return (
    <>
      <Chip>BOOKED</Chip>
      <Chip variant="cancelled">CANCELLED</Chip>
    </>
  );
}`;
}

function sampleStatusChipCode() {
  return `import { StatusChip } from "@sessions/design-system";

export function StatusChipExample() {
  const matchCount = 12;

  return <StatusChip matchCount={matchCount} />;
}`;
}

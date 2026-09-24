import { componentExampleWrapper, pageHero, section } from "../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsSelector } from "../../components/selector/index.js?v=sessions-selector-v4";

const SERVICE = {
  id: "zero-fade",
  name: "Zero fade",
  duration: 45,
  price: 60,
};

export function renderSelectorsPage(page) {
  return `
    ${pageHero(page)}
    ${section("Selector", "", selectorExample(), "button-example-section card-example-section")}
  `;
}

function selectorExample() {
  return componentExampleWrapper({
    id: "sessions-selector-example",
    tocTitle: "Default",
    preview: renderSessionsSelector({ service: SERVICE }),
    codeId: "sessions-selector-code",
    filename: "Selector.tsx",
    code: sampleSelectorCode(),
    className: "is-sessions-selector",
  });
}

function sampleSelectorCode() {
  return `import { Selector } from "@sessions/design-system";

const service = {
  id: "zero-fade",
  name: "Zero fade",
  duration: 45,
  price: 60,
};

export function ServiceSelector({ selectedId, onSelect }) {
  return (
    <Selector
      service={service}
      selected={selectedId === service.id}
      onSelect={onSelect}
    />
  );
}`;
}

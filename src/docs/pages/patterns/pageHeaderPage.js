import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsPageHeader } from "../../../components/patterns/index.js";

export function renderPageHeaderPatternPage(page) {
  return `
    ${pageHero(page)}
    ${section("Page Header", "", pageHeaderExample(), "button-example-section card-example-section")}
  `;
}

function pageHeaderExample() {
  return componentExampleWrapper({
    id: "sessions-page-header-example",
    tocTitle: "Page Header",
    preview: renderSessionsPageHeader({
      title: "Recent Sales",
      body: "Last 7 days",
    }),
    codeId: "sessions-page-header-code",
    filename: "PageHeader.tsx",
    code: samplePageHeaderCode(),
    className: "is-sessions-page-header",
  });
}

function samplePageHeaderCode() {
  return `import { PageHeader } from "@sessions/design-system";

export function ExamplePageHeader() {
  return (
    <PageHeader
      title="Recent Sales"
      body="Last 7 days"
    />
  );
}`;
}

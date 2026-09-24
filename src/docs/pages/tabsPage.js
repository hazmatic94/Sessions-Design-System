import { componentExampleWrapper, pageHero, section } from "../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsTabs } from "../../components/tabs/index.js";

const TABS = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
];

export function renderTabsPage(page) {
  return `
    ${pageHero(page)}
    ${section("Tabs", "", tabsExample(), "button-example-section card-example-section")}
  `;
}

function tabsExample() {
  return componentExampleWrapper({
    id: "sessions-tabs-example",
    tocTitle: "Default",
    preview: `
      <div class="sessions-tabs-preview">
        ${renderSessionsTabs({
          tabs: TABS,
          selected: "all",
        })}
      </div>
    `,
    codeId: "sessions-tabs-code",
    filename: "Tabs.tsx",
    code: sampleTabsCode(),
    className: "is-sessions-tabs",
  });
}

function sampleTabsCode() {
  return `import { Tabs } from "@sessions/design-system";

const tabs = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
];

export function NotificationTabs() {
  return <Tabs tabs={tabs} selected="all" />;
}`;
}

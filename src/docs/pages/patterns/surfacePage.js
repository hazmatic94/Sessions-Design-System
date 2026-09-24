import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsSurface } from "../../../components/patterns/surface.js";
import { renderSessionsClientRowList } from "../../../components/rows/index.js";

const CLIENT_ROWS = [
  {
    variant: "add",
    label: "Add new client",
  },
  {
    name: "Harry Maher",
    email: "harrymaherdesign@gmail.com",
    avatarInitial: "H",
  },
];

export function renderSurfacePatternPage(page) {
  return `
    ${pageHero(page)}
    ${section("Surface", "", surfaceExample(), "button-example-section card-example-section")}
  `;
}

function surfaceExample() {
  return componentExampleWrapper({
    id: "sessions-surface-example",
    tocTitle: "Default",
    preview: renderSessionsSurface({
      children: renderSessionsClientRowList(CLIENT_ROWS),
    }),
    codeId: "sessions-surface-code",
    filename: "Surface.tsx",
    code: sampleSurfaceCode(),
    className: "is-sessions-surface",
  });
}

function sampleSurfaceCode() {
  return `import { ClientRowList, Surface } from "@sessions/design-system";

const clients = [
  { variant: "add", label: "Add new client" },
  {
    name: "Harry Maher",
    email: "harrymaherdesign@gmail.com",
    avatarInitial: "H",
  },
];

export function ClientPanelSurface() {
  return (
    <Surface>
      <ClientRowList rows={clients} />
    </Surface>
  );
}`;
}

import { componentExampleWrapper, pageHero, section } from "../../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsStaffHeader } from "../../../components/patterns/index.js";

const DEMO_AVATAR = "/assets/user.png?v=sessions-avatar-demo-v3";

export function renderStaffHeaderPatternPage(page) {
  return `
    ${pageHero(page)}
    ${section("Staff Header", "", staffHeaderExample(), "button-example-section card-example-section")}
  `;
}

function staffHeaderExample() {
  return componentExampleWrapper({
    id: "sessions-staff-header-example",
    tocTitle: "Default",
    preview: renderSessionsStaffHeader({
      name: "Larry June",
      avatarSrc: DEMO_AVATAR,
    }),
    codeId: "sessions-staff-header-code",
    filename: "StaffHeader.tsx",
    code: sampleStaffHeaderCode(),
    className: "is-sessions-staff-header",
  });
}

function sampleStaffHeaderCode() {
  return `import { StaffHeader } from "@sessions/design-system";

export function BarberStaffHeader({ name, avatarSrc, onNameClick }) {
  return (
    <StaffHeader
      name={name}
      avatarSrc={avatarSrc}
      onNameClick={onNameClick}
    />
  );
}`;
}

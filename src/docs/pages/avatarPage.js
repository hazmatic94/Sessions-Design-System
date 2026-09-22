import { componentExampleWrapper, pageHero, section } from "../shell/pageLayout.js?v=sessions-page-h2-v1";
import { renderSessionsAvatar } from "../../components/avatar/index.js?v=sessions-avatar-v5";

const DEMO_IMAGE = "/assets/user.png?v=sessions-avatar-demo-v3";

export function renderAvatarPage(page) {
  return `
    ${pageHero(page)}
    ${section("Avatar", "", avatarExamples(), "button-example-section card-example-section")}
    ${section("Sizes", "", avatarSizeExamples(), "button-example-section card-example-section")}
  `;
}

function avatarExamples() {
  return `
    ${componentExampleWrapper({
      id: "sessions-avatar-image-example",
      tocTitle: "Image",
      preview: renderSessionsAvatar({
        src: DEMO_IMAGE,
        alt: "Harry",
      }),
      codeId: "sessions-avatar-image-code",
      filename: "AvatarImage.tsx",
      code: sampleAvatarImageCode(),
      className: "is-sessions-avatar",
    })}
    ${componentExampleWrapper({
      id: "sessions-avatar-initials-example",
      tocTitle: "Initials",
      preview: renderSessionsAvatar({
        initial: "H",
        label: "Harry",
      }),
      codeId: "sessions-avatar-initials-code",
      filename: "AvatarInitials.tsx",
      code: sampleAvatarInitialsCode(),
      className: "is-sessions-avatar",
    })}
  `;
}

function avatarSizeExamples() {
  return componentExampleWrapper({
    id: "sessions-avatar-sizes-example",
    tocTitle: "Small, medium, and large",
    preview: `
      <div class="sessions-avatar-preview-row sessions-avatar-preview-row--sizes">
        ${renderSessionsAvatar({ src: DEMO_IMAGE, alt: "Harry", size: "small" })}
        ${renderSessionsAvatar({ src: DEMO_IMAGE, alt: "Harry", size: "medium" })}
        ${renderSessionsAvatar({ src: DEMO_IMAGE, alt: "Harry", size: "large" })}
      </div>
    `,
    codeId: "sessions-avatar-sizes-code",
    filename: "AvatarSizes.tsx",
    code: sampleAvatarSizesCode(),
    className: "is-sessions-avatar is-sessions-avatar-sizes",
  });
}

function sampleAvatarImageCode() {
  return `import { Avatar } from "@sessions/design-system";

export function ProfileAvatar() {
  return (
    <Avatar
      src="/assets/user.png"
      alt="Harry"
    />
  );
}`;
}

function sampleAvatarInitialsCode() {
  return `import { Avatar } from "@sessions/design-system";

export function ProfileAvatarFallback() {
  return (
    <Avatar
      initial="H"
      label="Harry"
    />
  );
}`;
}

function sampleAvatarSizesCode() {
  return `import { Avatar } from "@sessions/design-system";

export function ProfileAvatarSizes() {
  return (
    <>
      <Avatar src="/assets/user.png" alt="Harry" size="small" />
      <Avatar src="/assets/user.png" alt="Harry" size="medium" />
      <Avatar src="/assets/user.png" alt="Harry" size="large" />
    </>
  );
}`;
}

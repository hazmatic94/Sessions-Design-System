import {lucideIcon} from '../../utils/lucideIcon.js?v=nav-outline-v1';
import {componentExampleWrapper, pageHero, section} from '../shell/pageLayout.js';

const showroomPillItems = [
  {label: 'Favourites', icon: 'star'},
  {label: 'Trash', icon: 'trash-2'},
  {label: 'Originals', icon: 'sparkles'},
  {label: 'Providers', icon: 'package'},
];

export function renderShowroomPage(page) {
  return `
    ${pageHero(page)}
    ${section('Header', '', showroomHeaderExamples(), 'button-example-section showroom-example-section')}
    ${section('Pill', '', showroomPillExamples(), 'button-example-section showroom-example-section')}
    ${section('Auth Card', '', authCardExamples(), 'button-example-section showroom-example-section')}
  `;
}

function authCardExamples() {
  return showroomExampleCard({
    id: 'auth-card-example',
    tocTitle: 'Showroom login',
    reactDemo: 'showroom-auth-card',
    codeId: 'auth-card-code',
    filename: 'AuthCard.tsx',
    code: sampleAuthCardCode(),
    className: 'showroom-example is-auth-card',
    stageClassName: 'showroom-auth-card-example-stage',
  });
}

function sampleAuthCardCode() {
  return `import { AuthCard } from "@joker/design-system";
import "@joker/design-system/styles/auth-card.css";
import "@joker/design-system/styles/button.css";
import "@joker/design-system/styles/inputs.css";

export function ShowroomLoginCard() {
  return (
    <AuthCard
      onSubmit={(event) => {
        event.preventDefault();
        // sign in
      }}
    />
  );
}`;
}

function showroomExampleCard({
  id,
  tocTitle,
  preview,
  reactDemo,
  codeId,
  filename,
  code,
  stageClassName = 'showroom-example-stage',
  className = 'showroom-example',
}) {
  return componentExampleWrapper({
    id,
    tocTitle,
    preview,
    reactDemo,
    codeId,
    filename,
    code,
    className,
    stageClassName,
  });
}

function showroomHeaderExamples() {
  return `
    ${showroomExampleCard({
      id: 'showroom-header-default',
      tocTitle: 'Default',
      preview: `
        <header class="joker-showroom-header" aria-label="Showroom header">
          <img class="joker-showroom-header-logo" src="./assets/jokerLogo.svg?v=showroom" alt="Joker" />
        </header>
      `,
      codeId: 'showroom-header-default-code',
      filename: 'ShowroomHeader.tsx',
      code: sampleShowroomHeaderCode(),
    })}
    ${showroomExampleCard({
      id: 'showroom-header-logout',
      tocTitle: 'Log out icon',
      preview: `
        <header class="joker-showroom-header" aria-label="Showroom header">
          <img class="joker-showroom-header-logo" src="./assets/jokerLogo.svg?v=showroom" alt="Joker" />
          <button class="joker-showroom-header-logout" type="button" aria-label="Log out">
            <span class="joker-showroom-header-logout-icon" aria-hidden="true">${lucideIcon('log-out')}</span>
          </button>
        </header>
      `,
      codeId: 'showroom-header-logout-code',
      filename: 'ShowroomHeader.tsx',
      code: sampleShowroomHeaderLogoutCode(),
    })}
  `;
}

function showroomPillCarouselMarkup({selected = false, singleSelect = false} = {}) {
  return `
    <div
      class="joker-showroom-pill-carousel"
      ${singleSelect ? 'role="radiogroup" aria-label="Showroom category" data-showroom-pill-group' : `aria-label="${selected ? 'Selected ' : ''}Showroom filters"`}
    >
      ${showroomPillItems
        .map(
          (item, index) => `
        <button
          class="joker-showroom-pill${selected || (singleSelect && index === 0) ? ' is-selected' : ''}"
          type="button"
          ${singleSelect ? `role="radio" aria-checked="${index === 0 ? 'true' : 'false'}" data-showroom-pill` : `aria-pressed="${selected ? 'true' : 'false'}"`}
        >
          <span class="joker-showroom-pill-icon" aria-hidden="true">${lucideIcon(item.icon)}</span>
          <span>${item.label}</span>
        </button>
      `,
        )
        .join('')}
    </div>
  `;
}

function showroomPillExamples() {
  return `
    ${showroomExampleCard({
      id: 'showroom-pill-selected',
      tocTitle: 'Selected',
      preview: showroomPillCarouselMarkup({selected: true}),
      codeId: 'showroom-pill-selected-code',
      filename: 'ShowroomPill.tsx',
      code: sampleShowroomPillCode({selected: true}),
      stageClassName: 'showroom-pill-example-stage',
    })}
    ${showroomExampleCard({
      id: 'showroom-pill-unselected',
      tocTitle: 'Unselected',
      preview: showroomPillCarouselMarkup(),
      codeId: 'showroom-pill-unselected-code',
      filename: 'ShowroomPill.tsx',
      code: sampleShowroomPillCode({selected: false}),
      stageClassName: 'showroom-pill-example-stage',
    })}
    ${showroomExampleCard({
      id: 'showroom-pill-single-select',
      tocTitle: 'Single Select',
      preview: showroomPillCarouselMarkup({singleSelect: true}),
      codeId: 'showroom-pill-group-code',
      filename: 'ShowroomPillGroup.tsx',
      code: sampleShowroomPillGroupCode(),
      stageClassName: 'showroom-pill-example-stage',
    })}
  `;
}

function sampleShowroomHeaderCode() {
  return `export function ShowroomHeader() {
  return (
    <header className="joker-showroom-header" aria-label="Showroom header">
      <img className="joker-showroom-header-logo" src="/assets/jokerLogo.svg" alt="Joker" />
    </header>
  );
}`;
}

function sampleShowroomHeaderLogoutCode() {
  return `import { LogOut } from "lucide-react";

export function ShowroomHeader() {
  return (
    <header className="joker-showroom-header" aria-label="Showroom header">
      <img className="joker-showroom-header-logo" src="/assets/jokerLogo.svg" alt="Joker" />
      <button
        className="joker-showroom-header-logout"
        type="button"
        onClick={handleLogout}
        aria-label="Log out"
      >
        <span className="joker-showroom-header-logout-icon" aria-hidden="true">
          <LogOut />
        </span>
      </button>
    </header>
  );
}`;
}

function sampleShowroomPillCode({selected}) {
  return `import { Package, Sparkles, Star, Trash2 } from "lucide-react";

const showroomPills = [
  { label: "Favourites", icon: Star },
  { label: "Trash", icon: Trash2 },
  { label: "Originals", icon: Sparkles },
  { label: "Providers", icon: Package },
];

export function ShowroomPillExample() {
  return (
    <div className="joker-showroom-pill-carousel" aria-label="Showroom filters">
      {showroomPills.map(({ label, icon: Icon }) => (
        <button
          className="joker-showroom-pill${selected ? ' is-selected' : ''}"
          type="button"
          aria-pressed={${selected ? 'true' : 'false'}}
        >
          <span className="joker-showroom-pill-icon" aria-hidden="true">
            <Icon />
          </span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}`;
}

function sampleShowroomPillGroupCode() {
  return `import { useState } from "react";
import { Package, Sparkles, Star, Trash2 } from "lucide-react";

const showroomPills = [
  { label: "Favourites", icon: Star },
  { label: "Trash", icon: Trash2 },
  { label: "Originals", icon: Sparkles },
  { label: "Providers", icon: Package },
];

export function ShowroomPillGroup() {
  const [selected, setSelected] = useState("Favourites");

  return (
    <div className="joker-showroom-pill-carousel" role="radiogroup" aria-label="Showroom category">
      {showroomPills.map(({ label, icon: Icon }) => {
        const isSelected = selected === label;
        return (
          <button
            key={label}
            className={\`joker-showroom-pill\${isSelected ? " is-selected" : ""}\`}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => setSelected(label)}
          >
            <span className="joker-showroom-pill-icon" aria-hidden="true">
              <Icon />
            </span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}`;
}

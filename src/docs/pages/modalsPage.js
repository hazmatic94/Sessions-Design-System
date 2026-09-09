import {componentExampleWrapper, pageHero, section} from '../shell/pageLayout.js?v=sessions-page-h2-v1';
import {renderSessionsCalendar, renderSessionsDate, renderSessionsDualMonthCalendar} from '../../components/calendar/index.js';
import {renderSessionsModal} from '../../components/modal/index.js';
import {
  renderSessionsMenuDivider,
  renderSessionsMenuItem,
  renderSessionsMenuPanel,
  renderSessionsMenuUserHeader,
} from '../../components/menu/index.js';

export function renderModalsPage(page) {
  return `
    ${pageHero(page)}
    ${section('Date', '', dateExamples(), 'button-example-section card-example-section')}
    ${section('Modal', '', modalExamples(), 'button-example-section card-example-section')}
    ${section('Menu panel', '', menuPanelExamples(), 'button-example-section card-example-section')}
    ${section('Calendar', '', calendarExamples(), 'button-example-section card-example-section')}
  `;
}

function menuPanelExamples() {
  return `
    ${componentExampleWrapper({
      id: 'sessions-menu-item-example',
      tocTitle: 'Selector states',
      preview: `
        <div class="sessions-menu-item-preview" data-sessions-menu-item-cycle>
          ${renderSessionsMenuItem({ label: 'Add appointment', state: 'default' })}
          <span class="sessions-menu-item-preview__state" data-menu-item-state-label>default</span>
        </div>
      `,
      codeId: 'sessions-menu-item-code',
      filename: 'MenuItem.tsx',
      code: sampleMenuItemCode(),
      className: 'is-sessions-menu-panel',
    })}
    ${componentExampleWrapper({
      id: 'sessions-menu-user-header-example',
      tocTitle: 'User header',
      preview: renderSessionsMenuPanel({
        children: `
          ${renderSessionsMenuUserHeader()}
          ${renderSessionsMenuDivider()}
          ${renderSessionsMenuItem({ label: 'Account settings', icon: 'settings' })}
          ${renderSessionsMenuItem({ label: 'Help & support', icon: 'help' })}
        `,
      }),
      codeId: 'sessions-menu-user-header-code',
      filename: 'MenuUserHeader.tsx',
      code: sampleMenuUserHeaderCode(),
      className: 'is-sessions-menu-panel',
    })}
    ${componentExampleWrapper({
      id: 'sessions-menu-divider-example',
      tocTitle: 'Divider',
      preview: renderSessionsMenuPanel({
        children: `
          ${renderSessionsMenuItem({ label: 'Add appointment' })}
          ${renderSessionsMenuDivider()}
          ${renderSessionsMenuItem({ label: 'Add blocked time', icon: 'time' })}
        `,
      }),
      codeId: 'sessions-menu-divider-code',
      filename: 'MenuDivider.tsx',
      code: sampleMenuDividerCode(),
      className: 'is-sessions-menu-panel',
    })}
    ${componentExampleWrapper({
      id: 'sessions-menu-panel-example',
      tocTitle: 'Shell',
      preview: renderSessionsMenuPanel({
        children: `
          ${renderSessionsMenuItem({ label: 'Add appointment' })}
          ${renderSessionsMenuItem({ label: 'Add blocked time', icon: 'time' })}
          ${renderSessionsMenuItem({ label: 'Day', icon: 'day' })}
        `,
      }),
      codeId: 'sessions-menu-panel-code',
      filename: 'MenuPanel.tsx',
      code: sampleMenuPanelCode(),
      className: 'is-sessions-menu-panel',
    })}
  `;
}

function modalExamples() {
  return componentExampleWrapper({
    id: 'sessions-modal-example',
    tocTitle: 'Unsaved changes',
    preview: renderSessionsModal({
      title: 'You have unsaved changes.',
      body: 'If you close the appointment now, the changes will be lost. Do you want to exit?',
      secondaryLabel: 'Cancel',
      primaryLabel: 'Yes exit',
    }),
    codeId: 'sessions-modal-code',
    filename: 'Modal.tsx',
    code: sampleModalCode(),
    className: 'is-sessions-modal',
  });
}

function dateExamples() {
  return componentExampleWrapper({
    id: 'calendar-date-example',
    tocTitle: 'Variants',
    preview: `
      <div class="sessions-date-preview-row">
        ${renderSessionsDate({variant: 'selected'})}
        ${renderSessionsDate({variant: 'current'})}
        ${renderSessionsDate({variant: 'hover'})}
        ${renderSessionsDate({variant: 'default'})}
      </div>
    `,
    codeId: 'calendar-date-code',
    filename: 'Date.tsx',
    code: sampleDateCode(),
  });
}

function calendarExamples() {
  return `
    ${componentExampleWrapper({
      id: 'calendar-modal-example',
      tocTitle: 'Default',
      preview: renderSessionsCalendar(),
      codeId: 'calendar-modal-code',
      filename: 'Calendar.tsx',
      code: sampleCalendarCode(),
      className: 'is-calendar',
    })}
    ${componentExampleWrapper({
      id: 'calendar-dual-month-example',
      tocTitle: 'Dual month',
      preview: renderSessionsDualMonthCalendar({ startMonth: 8, startYear: 2026 }),
      codeId: 'calendar-dual-month-code',
      filename: 'DualMonthCalendar.tsx',
      code: sampleDualMonthCalendarCode(),
      className: 'is-calendar is-calendar-dual',
    })}
  `;
}

function sampleModalCode() {
  return `import { Modal } from "@sessions/design-system";

export function UnsavedChangesModal() {
  return (
    <Modal
      title="You have unsaved changes."
      body="If you close the appointment now, the changes will be lost. Do you want to exit?"
      secondaryLabel="Cancel"
      primaryLabel="Yes exit"
    />
  );
}`;
}

function sampleMenuItemCode() {
  return `import { MenuItem } from "@sessions/design-system";
import { useState } from "react";

const MENU_ITEM_STATES = ["default", "hover", "pressed", "selected", "disabled"];

export function MenuItemStates() {
  const [stateIndex, setStateIndex] = useState(0);
  const state = MENU_ITEM_STATES[stateIndex];

  return (
    <MenuItem
      label="Add appointment"
      state={state}
      onClick={() => setStateIndex((index) => (index + 1) % MENU_ITEM_STATES.length)}
    />
  );
}`;
}

function sampleMenuUserHeaderCode() {
  return `import { MenuDivider, MenuItem, MenuPanel, MenuUserHeader } from "@sessions/design-system";

export function ProfileMenuPanel() {
  return (
    <MenuPanel>
      <MenuUserHeader
        user={{
          name: "Larry June",
          email: "goodjoblarry@gmail.com",
          avatar: { src: "/assets/user.png", alt: "Larry June" },
        }}
      />
      <MenuDivider />
      <MenuItem label="Account settings" icon="settings" />
      <MenuItem label="Help & support" icon="help" />
    </MenuPanel>
  );
}`;
}

function sampleMenuDividerCode() {
  return `import { MenuDivider, MenuItem, MenuPanel } from "@sessions/design-system";

export function ExampleMenuDivider() {
  return (
    <MenuPanel>
      <MenuItem label="Add appointment" />
      <MenuDivider />
      <MenuItem label="Add blocked time" icon="time" />
    </MenuPanel>
  );
}`;
}

function sampleMenuPanelCode() {
  return `import { MenuItem, MenuPanel } from "@sessions/design-system";

export function ExampleMenuPanel() {
  return (
    <MenuPanel>
      <MenuItem label="Add appointment" />
      <MenuItem label="Add blocked time" icon="time" />
      <MenuItem label="Day" icon="day" />
    </MenuPanel>
  );
}`;
}

function sampleDateCode() {
  return `import { Date } from "@sessions/design-system";

export function CalendarDateVariants() {
  return (
    <>
      <Date day={25} variant="selected" />
      <Date day={25} variant="current" />
      <Date day={25} variant="hover" />
      <Date day={25} />
    </>
  );
}`;
}

function sampleCalendarCode() {
  return `import { Calendar } from "@sessions/design-system";

export function CalendarModalExample() {
  const today = new Date();
  const [range, setRange] = useState({ start: null, end: null });

  function handleDaySelect(day) {
    if (range.start == null || range.end != null) {
      setRange({ start: day, end: null });
      return;
    }

    setRange({
      start: Math.min(range.start, day),
      end: Math.max(range.start, day),
    });
  }

  return (
    <Calendar
      month={today.getMonth()}
      year={today.getFullYear()}
      currentDay={today.getDate()}
      rangeStart={range.start}
      rangeEnd={range.end}
      onDaySelect={handleDaySelect}
    />
  );
}`;
}

function sampleDualMonthCalendarCode() {
  return `import { DualMonthCalendar } from "@sessions/design-system";

export function CalendarDesktopExample() {
  const [range, setRange] = useState({ start: null, end: null });

  return (
    <DualMonthCalendar
      startMonth={8}
      startYear={2026}
      rangeStart={range.start}
      rangeEnd={range.end}
      onDaySelect={(date) => {
        if (range.start == null || range.end != null) {
          setRange({ start: date, end: null });
          return;
        }

        setRange({
          start: date < range.start ? date : range.start,
          end: date < range.start ? range.start : date,
        });
      }}
    />
  );
}`;
}

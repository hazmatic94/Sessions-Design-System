# Sessions Design System

Docs site and npm package for the Sessions design system — tokens, vanilla JS components, and styles you can pull into another app.

## Run the docs site

```bash
npm run dev
# or: python3 serve-dev.py 4173
```

Open `http://localhost:4173`.

## Install in another repo

From your app repo (sibling folder example):

```bash
npm install ../Sessions-Design-System
```

Or add to `package.json`:

```json
{
  "dependencies": {
    "@sessions/design-system": "file:../Sessions-Design-System"
  }
}
```

Copy packaged assets into your app's public folder (icons, fonts, avatars):

```bash
cp -R node_modules/@sessions/design-system/assets ./public/assets
```

## Use in your app

Import styles once (order matters — this bundle includes fonts, tokens, and all component CSS):

```js
import "@sessions/design-system/styles";
```

Import components:

```js
import {
  renderSessionsButton,
  renderSessionsHourColumn,
  renderSessionsHourBooking,
  renderSessionsAvatar,
  renderSessionsCalendarHeaderRow,
} from "@sessions/design-system";

document.querySelector("#calendar").innerHTML = renderSessionsHourColumn({
  hour: 11,
  bookings: [{
    startMinute: 0,
    span: 3,
    customerName: "Jack Doe",
    serviceType: "Skin Fade",
  }],
});
```

Optional — if your assets are not served from `/assets`:

```js
import { setSessionsAssetBase } from "@sessions/design-system";

setSessionsAssetBase("/static/sessions");
```

Call that before rendering any component that references icons or images.

## Package exports

| Import | What you get |
|--------|----------------|
| `@sessions/design-system` | All `renderSessions*` components and helpers |
| `@sessions/design-system/styles` | Full CSS bundle (`sessions.css`) |
| `@sessions/design-system/assets/*` | Icons, fonts, images |

## Verify the package

```bash
npm run verify
npm run pack:check
```

## What's in the docs site

- **Foundations** — colour, type, spacing, radius, shadows, motion, icons
- **Components** — button, avatar, input, navigation, modals, chips, cards
- **Patterns** — page header, metrics, charts, calendar, hour block, and more

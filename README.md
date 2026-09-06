# Sessions Design System

Docs site and workshop for the Sessions design system. The sidebar, page chrome, and foundations stay. The old JokerPlus games, betting UI, and showroom demos are gone so new components can be built here.

## Run locally

```bash
python3 serve-dev.py 4173
```

Or `npm run dev`. Open `http://localhost:4173`.

## What’s here

- **Getting Started** — introduction and how to add a component
- **Foundations** — colour, type, spacing, radius, shadows, motion, icons
- **Components** — empty library. Add the next Sessions component here

## Add a component

1. Create the source in `src/components/`
2. Add a docs page in `src/docs/pages/`
3. Register the route in `src/system-data.js` under the Components group

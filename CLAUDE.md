@AGENTS.md

# Auto commit & push

After completing a set of code changes for a task, automatically commit them (using a clear message describing the change) and push to the current branch's remote — do not wait for explicit "commit and push" instructions each time.

## UI
This is a neutral demo copy of a client hiring-assessments app (copied 2026-10-23): the brand is the placeholder "PT Example" (blue `#1D4ED8`, a "PT" square in `public/logo.png`), so it shows clearly as a dummy. The brand theme is the top block of `app/tokens.css`.

The UI is the blank-slate redesign, released 2026-10-19. `redesign/design/design.md` (v1.0) is the spec, and `redesign/design/tokens.css` holds the tokens (copied to `app/tokens.css`). Change the UI to match the spec. If you need something the spec doesn't cover, ask the owner before inventing it.
- **Board** (`/`, `components/board/`): the candidates grouped by level, with search, role, level and order filters, and By level or List view. The narrowing lives in the URL (`lib/boardQuery.ts`); the way back to the board is remembered in `lib/boardMemory.ts`.
- **Report** (`/report/<ref>`, `components/candidate/`): queue bar, verdict band, competency chart and details, written insight from authored demo text (`lib/demoInsights.ts`; there's no live AI), risks, Save PDF and Copy link.
- **PDF** (`/report/<ref>/preview`, `components/document/`): A4 pages, made on the device as a real-text jsPDF file with static Archivo fonts (`public/fonts`).
- **Shell** (`components/shell/`): top bar, offline bar, install offer, skeletons and toasts. `public/sw.js` keeps the board and opened reports for offline use. `proxy.ts` sends unknown references to a 404 page.
- **Checks:** `npm run test:smoke` and `redesign/old-names.sh`.
- Don't save memories that describe the UI.

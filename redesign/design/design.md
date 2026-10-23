# Design: PT Example hiring assessments

**v1.0 (2026-10-19). Frozen: approved by the owner.** Later changes bump the version and are logged in `decisions.md`. Direction: D Scoreboard mix (see `decisions.md`).
Tokens: `tokens.css` (the prototype stays with the original client copy). Light mode only (brief).

## 1. Principles
- **The verdict is the loudest thing on the page, and nothing else is loud.** The brand blue is spent on one band per screen: the group's standing on the board, the candidate's verdict on the report. Everything below it is ink on white.
- **Numbers do the talking.** Archivo's width axis carries the hierarchy: expanded for headings, condensed for numerals, so a score reads at a glance and columns of numbers line up (tabular figures everywhere).
- **Colour means something or it isn't there.** Green = above what the role expects, amber = below, grey = within 3 points. No decorative colour, gradients or shadows on the page itself.
- **Written insight is set as type, not boxed.** The summary is a run-in lead paragraph; lists and risks are rules and text.
- **One motion moment.** Opening a report counts the score up and slides the level pin. Everything else moves only in answer to a person's action.

## 2. Tokens
All values are in `tokens.css`; names below match it.

### Colour (light only)
**Brand theme** (the only layer a client copy changes; decisions P2):

| Token | Value | Use |
|---|---|---|
| `--brand` | #1D4ED8 | Mark area, active level on the PDF, app theme colour |
| `--brand-text` | #1D4ED8 | Brand colour used as text on white (6.7:1) |
| `--band` | #1D4ED8 | Verdict band and group band |
| `--band-ink` | #FFFFFF | All text on the band (6.7:1). Never dim small text on the band with opacity: any tint below white fails 4.5:1 |
| `--band-accent` | #FFFFFF | Score numeral, active level segment, pin |
| `--band-soft` | white 32% | Inactive level segments |
| `--strip` | transparent | Accent strip above a neutral band, for brands where white text fails |

**Product colours** (same for every client):

| Token | Value | Contrast on white | Use |
|---|---|---|---|
| `--ink` | #0F172A | 17.9:1 | Text, primary buttons, active filters, focus ring |
| `--ink-2` | #475569 | 7.6:1 | Secondary text |
| `--ink-3` | #5F6B7E | 5.4:1 (5.0:1 on shade) | Tertiary text, axis labels |
| `--line` / `--line-2` | #E5E9F0 / #D3D9E2 | — | Hairlines / control outlines |
| `--shade` / `--shade-2` | #F4F6F9 / #EAEEF3 | — | Fields, hover, queue bar / skeletons, disabled |
| `--canvas` | #E2E7EE | — | Behind A4 pages in the preview |
| `--above` / `--above-text` / `--above-t` | #0B8A5C / #08703F / #DDF3EA | 4.4 / 6.2 / — | Bar, figure, tile for "above" |
| `--below` / `--below-text` / `--below-t` | #CF7A00 / #8F5208 / #FDEBCB | 3.3 / 6.2 / — | Bar, figure, tile for "below" |
| `--meet` | #C3CAD5 | — | Bar within 3 points (always labelled "Meeting") |
| `--danger-text` | #B3261E | 6.5:1 | Failed actions |

### Type
Archivo (Google Fonts, variable: width 62–125, weight 400–900), falling back to Noto Sans and the system UI font for other scripts. Tabular lining figures everywhere.

| Token | Size | Weight / width | Use |
|---|---|---|---|
| `--n-hero` | 200px (phone 128) | 850 / 68% | The score |
| `--n-xl` | 112px (phone 64) | 850 / 68% | Group counts on the board |
| `--t-h1` | 48px (phone 32) | 750 / 112%, −0.025em | Candidate name |
| `--t-h1-board` | 44px (phone 30) | 750 / 112% | Board headline |
| `--n-lg` | 34px (phone 28) | 800 / 80% | Percentile, difference from the role average |
| `--n-md` | 32px | 850 / 68% | Score on a board row |
| `--t-h2` | 24px (phone 21) | 750 / 112%, −0.015em | Section headings |
| `--t-lead` | 21px (phone 18) | 420, line height 1.5 | "In short" summary, max 36em |
| `--t-lg` | 17px | 500–750 | Lane headings, sub-lines on the band |
| `--t-md` | 15px | 400–650, line height 1.5 (1.6 for insight) | Body |
| `--t-sm` / `--t-xs` | 13.5 / 12.5px | 400–600 | Meta, captions, axis labels |

Reading text is capped at 56–62 characters per line. Long words and names break anywhere (`overflow-wrap:anywhere`); names sit in `<bdi>` so right-to-left names don't disturb the line.

### Space, radius, elevation
- Space: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64px (`--s1` to `--s16`). Page gutter 32px (phone 18px), content width 1376px.
- Radius: 4px bars and tags, 12px stand-out tiles and notices, 16px install card, pill for buttons, fields and chips.
- Elevation: none on the page. `--e-1` for the active segment of the view switch; `--e-2` for toasts, the install card and A4 pages in the preview.

### Motion
- `--d-fast` 120ms: hover and press. `--d-mid` 220ms with `--ease`: opening a competency, toasts. `--d-moment` 900ms: the score moment.
- **The score moment:** on opening a report (including stepping to the next one), the numeral counts from 0 to the score with an ease-out curve while the pin slides along the level scale; the active segment brightens as it lands. Not replayed when coming back from the PDF preview.
- `prefers-reduced-motion`: no count, no slide, no fade; skeleton pulsing stops; the spinner slows.

### Breakpoints
Phone < 760px, tablet 760–1179px, desktop ≥ 1180px, print A4 portrait.

## 3. Components and their states

| Component | States and behaviour |
|---|---|
| **Top bar** | Brand (dashed square = room for the real mark, then the name in type) links to the board as it was left. "Hiring assessments" and "Confidential, internal HR use" hide on smaller screens. The right end leaves room for an account menu when sign-in arrives. Optional "Install app" button. |
| **Offline bar** | Ink bar under the top bar on every screen while offline: "You're offline. Reports you've opened before still work. Anything else waits for a connection." |
| **Group band** (board) | Headline with the group's standing ("7 of 10 candidates are recommended"), a sub-line with how many need a closer look and the newest assessment date, four level counts and a spread bar. Each count is a toggle that filters to that level (pressed: white underline). Considered and Not Recommended counts are dimmed (large text, 3.1:1). Variants: everyone recommended, nobody recommended, nothing yet (no numbers at all). |
| **Search field** | Filters as you type, by name (accents ignored) or reference. `/` focuses it; Esc clears it. Matches are highlighted in the results. |
| **Filter pills** (Role, Level, Order) | Native selects under a pill, so phones get their own picker. Default: outlined. Active filter: filled ink. Order is never shown as "active" because it doesn't hide anyone. Order options: newest first (default), oldest first, highest score first, lowest score first, name A to Z, name Z to A. |
| **View switch** | By level (default) or List. |
| **Filter status** | Unfiltered: "Showing all 10 candidates" in grey. Filtered: "Showing **3** of 10 candidates" in ink, with one ink chip per filter (tap to remove) and "Clear all" when there are two or more. |
| **Lane** (By level) | Heading with level mark, name and count. Shows the first 6 candidates, then "Show all 23" / "Show fewer". Empty lane: "None at this level" (or "None match at this level" when filtered). With a level filter, only that lane shows, uncapped, in columns. |
| **Candidate row** | Name, role and assessment date, score. Hover: shade. Tags: "Opened" (seen this session; offline, it means available), "Needs a connection" (offline and not opened: greyed, still opens a message). Focus returns to this row when coming back from the report. |
| **List view** | Table: candidate and reference, role, level, score, date. Whole row opens the report. 50 rows per page, then "Show 50 more" with "Showing 50 of 240". On phones each row folds into two lines. |
| **No matches** | Says what was searched or filtered, and offers the one-step undo as the primary button ("Clear search", "Show all levels", "Show all roles"; "Clear search" and "Clear filters" when both). |
| **Queue bar** (report) | "All candidates" back link (returns to the board with the same filters, order, view, open lanes and scroll position), the context ("Shift Manager, Recommended, highest score first"), position ("4 of 10") and previous / next with first names. At either end the button is shown disabled. Opened from a link that doesn't fit the saved filters: steps through everyone, newest first. |
| **Verdict band** | Name, role, reference; facts (client company, HR contact only when there is one, assessed, report produced); score /100; level chip; percentile with the norm group spelt out; difference from the role average ("+8 above", "Level with", "−6 below"); level scale with four segments sized to the score ranges and a pin at the score. Phone: facts move under the scale, and the scale shows only the active level's name. |
| **Level mark** | Four rising bars, filled up to the level (4 = Highly Recommended). Always next to the level's name, never alone. |
| **"In short" lead** | Run-in bold "In short." then the summary, at lead size. Demo notice under it. |
| **Actions** | Save PDF (primary), Copy link, "Preview the PDF" text link, "Confidential, for internal HR use only". Save PDF states: idle; saving ("Saving PDF…", spinner, can't be started again, note "This takes a few seconds."); failed (red note "The PDF didn't save. Check there's space on this device, then try again.", button reads "Try again"). The PDF is made on the device, so Save PDF works offline too (decisions Q2). Success: toast with the file name. Copy link works offline; toast "Link copied. It opens Rizky Aditya Pratama's report directly." |
| **Stand-out tiles** | Biggest strength (green tile) and biggest gap (amber tile), each with the difference, competency and both figures. When there's no strength above +3: grey tile "No strengths. Strongest result, 61 against 70 expected". When there's no gap below −3: grey tile "No gaps. Closest to the line, 90 against 78 expected". |
| **Competency chart** | One row per competency, sorted from biggest strength to biggest gap. Each row is a button: name, "86, role expects 72, 88th percentile", a bar left (below) or right (above) of the centre line, the difference or "Meeting". Bars scale to the largest difference (at least 20 points). States: default, hover (shade), focus (inset ring), open (shade, chevron turned). "Open all details" / "Close all details" for long lists. Phone: the name sits above the bars. |
| **Competency detail** | Four figures (score, percentile, role expects, result: "Above by 14"); "What it measures."; "On the job." with a role example; a 0–100 track with the role's expectation marked and the candidate's dot; the distance in words; the three behaviour bands in order, each named with its range and description: **Needs Improvement** (under 50), **Average** (50 to 74), **Strong** (75 and over) (decisions Q1). The candidate's band is in ink with a "This score, 86" tag; the other two are grey, showing what a weaker or stronger score looks like. |
| **Strengths and shortfalls** | Two lists with a green or amber dash, plain behaviour only. Heading carries the "Simulated demo data" tag. |
| **Risks** | Rows of risk and how to reduce it, side by side (stacked with small labels on phones). Heading carries the demo tag. |
| **Message page** | Large heading, plain explanation, primary way back. Used for "No candidate with reference …" (with a search field) and "This report needs a connection" (with "Try again"). |
| **Skeletons** | Board and report keep their real shape (band, tools, lanes / band, body) with blocks, gently pulsing; screen readers hear "Loading candidates" / "Loading the report". |
| **Toast** | Ink, bottom centre, 4 seconds, announced politely. |
| **Install offer** | Desktop: "Install app" in the top bar. Phone: a card at the bottom of the board, "Keep it one tap away", with Install / Not now. Only shown when the browser offers installation; dismissed for the session. iPhone (no install prompt): the card says "Tap Share, then Add to Home Screen" instead (build note). |
| **Buttons** | Primary (ink), secondary (outlined), ghost, on-dark (white). States: hover, focus ring, disabled (grey fill), busy (spinner). Minimum height 44px. |

## 4. Screens × states

| Screen | Normal | Loading | Nothing yet | No matches | Offline | Saving PDF | Unknown | Stress |
|---|---|---|---|---|---|---|---|---|
| Board, By level | ✓ | skeleton | band says so, levels explained, no zeros | message + one-step undo | bar; unopened rows "Needs a connection" | — | — | 240 candidates, lanes capped at 6 |
| Board, List | ✓ | skeleton | as above | as above | as above | — | — | 50 per page |
| Report | ✓ | skeleton | — | — | works if opened before, Save PDF included | saving / failed / done | message page | 24 competencies, 93-character norm group, 627-word insight, unbroken 41-letter name, no HR contact |
| Report, not opened before | — | — | — | — | "This report needs a connection" | — | — | — |
| PDF preview | ✓ | — | — | — | works, Save PDF included | as report | message page | pages flow on |
| A4 PDF (print) | ✓ | — | — | — | — | — | — | headings never orphaned, rows never split |

## 5. The A4 document (S1, S2, S5)
- **Named** "Rizky Aditya Pratama - Shift Manager - 15 Oct 2026.pdf" (candidate, role, report date).
- **Page:** A4 portrait, 12mm top, 16mm sides, 10mm bottom. Running head from page 2 (name, role, reference; brand on the right). Foot on every page: "Confidential, for internal HR use only" and "Page 2 of 4".
- **Page 1:** brand line with a blue rule and room for the mark, "Hiring assessment report"; name 26pt; role and reference; facts; score 76pt in brand blue with level, percentile sentence and difference from the average; the level scale with score ranges.
- **Then:** In short (11pt lead + demo notice) → competency table (name, score / expected, percentile, diverging bar, difference) → competency detail, one block each (figures, what it measures, what a score like this means, on the job) → Does well → Where they fall short → Risks and how to reduce them → About this report (demo data, what the numbers mean, confidentiality).
- **Type:** 9.5pt body, 1.45 leading, real text throughout (selectable, searchable, sharp at any zoom). Colours print exactly.
- **Breaks:** content is laid out as unbreakable blocks; a heading always travels with the first block after it; a list item, table row, competency detail or risk is never split. In the prototype the pages are built by measuring those blocks; the build may use a print engine with the same rules (`break-inside: avoid`, `break-after: avoid` on headings).
- **Only the report:** no app controls, queue bar, toasts or prototype panel. The preview screen and Ctrl+P print exactly these pages.

## 6. Install and offline (A2, A3)
- Installable web app: manifest (`app/manifest.ts`) with the brand's theme colour; standalone display. The icon is the placeholder "PT" mark.
- Offline: the candidate list and every report opened on the device are kept and work fully (search, filters, report, preview, Save PDF, copy link). The PDF is made on the device, so the app caches the typeface with everything else. Only unopened reports say they need a connection. The offline bar shows on every screen until the connection returns.

## 7. Copy and tone
- Plain, friendly-professional, British spelling, sentence case, no exclamation marks. Dates as 14 Oct 2026.
- People are "candidates"; the four levels are always written in full with capitals: Highly Recommended, Recommended, Considered, Not Recommended. "Need a closer look" = Considered + Not Recommended.
- Insight text uses "they" for candidates; it never guesses gender.
- Actions say what happens and keep their name: Save PDF → "Saving PDF…" → "Saved …pdf"; Copy link → "Link copied".
- Errors say what happened and what to do, without apologising: "The PDF didn't save. Check there's space on this device, then try again." / "No candidate with reference PH-2026-9999".
- The demo notice appears with every part of the written insight: under the summary, on both insight headings and at the end of the PDF.

## 8. Accessibility
- **Contrast:** all text meets 4.5:1 (large numerals on the band meet 3:1). Small text on the band is always pure white. Bars are never the only signal: every bar has its number or "Meeting" beside it, and the side of the centre line repeats the meaning.
- **Focus:** a 3px ink ring with 2px offset everywhere, white on the blue band and dark bars; inset on chart rows. Focus moves to the page heading on every screen change and back to the candidate's row when returning to the board.
- **Keyboard:** everything is a link, button or native select. `/` focuses search, Esc clears it. A skip link leads to the content.
- **Screen readers:** landmarks (header, nav, main), one h1 per screen, headings for every section, chart rows announce the full figures ("+14 points above what the role expects"), live regions for filter results, PDF progress and toasts, `aria-pressed` on level counts and the view switch, `aria-expanded` on competencies and "Show all".
- **Touch:** targets are at least 44px (previous / next become 44px circles on phones). Native pickers for filters.
- **Text:** layouts survive 200% zoom and the longest names; names in other scripts are isolated with `<bdi>`.

## 9. Decisions taken in stage 2
See `decisions.md`. Q1: competency behaviour bands are Needs Improvement (under 50), Average (50 to 74) and Strong (75 and over). Q2: the PDF is made on the device and works offline. Q3: "Preview the PDF" stays.

## 10. Coverage
Prototype routes: board `#/`, report `#/c/PH-2026-0147`, PDF preview `#/c/PH-2026-0147/print`. States come from the prototype panel (bottom left) or the URL switches `?stress`, `?empty`, `?offline`, `?slow`, `?pdf=fail`, `?install`. `shots/` holds screenshot entry points.

| ID | Where the prototype shows it |
|---|---|
| F1 | Board: every candidate, grouped by level in lanes; List view |
| F2 | Candidate row: name, role, assessment date, score, grouped under its level; List adds reference and level |
| F3 | Board search field (name or reference, live, highlighted); also on the unknown-candidate page |
| F4 | Role and Level pills, the band's level counts, chips to remove each filter; combined filters work together |
| F5 | Order pill: newest (default), oldest, highest, lowest, A to Z, Z to A |
| F6 | Filter status: "Showing 3 of 10 candidates" with active filter chips; active pills filled ink; queue bar context on the report |
| F7 | Group band: "7 of 10 candidates are recommended", "3 need a closer look", counts per level, spread bar |
| J1 | Verdict band: name, reference, role, client company, HR contact (omitted for Made Wirawan), assessed, report produced |
| J2 | Verdict band: score /100, level chip, level scale with pin |
| J3 | Verdict band: "74th percentile: outscores 74% of" + norm group |
| J4 | Verdict band: "+8 above the role average of 70" (also "Level with", "−18 below") |
| C1 | Competency chart: every competency against what the role expects, one view |
| C2 | Stand-out tiles (biggest strength, biggest gap, and their no-strength / no-gap variants) and the chart sorted by difference |
| C3 | Competency detail figures: score, percentile, role expects, result (above / meeting / below, by how much) |
| U1 | Competency detail: "What it measures." |
| U2 | Competency detail: the three behaviour bands (Needs Improvement, Average, Strong) with ranges and descriptions, the candidate's band tagged "This score, 86", the track and "14 points above what the role expects." |
| U3 | Competency detail: "On the job." with a role example |
| X1 | "In short." lead under the band |
| X2 | Strengths and shortfalls: "Does well", "Where they fall short" |
| X3 | Risks in this role, and how to reduce them |
| X4 | Demo notice under the summary, demo tags on both insight headings, footer, and "About this report" in the PDF |
| S1 | Save PDF (named file, toast); PDF preview |
| S2 | Print and the preview show only the A4 pages, no app controls |
| S3 | "Confidential, internal HR use" in the top bar, under the actions, report footer, every PDF page foot, PDF end note |
| S4 | Copy link (opens `#/c/<reference>` directly, works for a colleague with no saved filters) |
| S5 | A4 pages: real text, measured blocks, headings kept with what follows, running head and page numbers |
| M1 | "All candidates" in the queue bar and the brand: same filters, order, view, open lanes, list pages and scroll; focus returns to the row; previous / next through the same list |
| M2 | `#/c/PH-2026-9999`: "No candidate with reference PH-2026-9999", way back and a search field |
| A1 | Every screen at phone width (390px): stacked lanes, scrolling filter pills, folded list rows, phone verdict band, stacked detail and risks |
| A2 | `?install`: "Install app" in the top bar (desktop) and the install card (phone); manifest |
| A3 | `?offline`: offline bar, "Opened" / "Needs a connection" rows, opened reports work (Save PDF and Copy link included), unopened report message |

| State | Where |
|---|---|
| Nothing yet | `?empty`: band "No candidates assessed yet", levels explained, no counts or zeros, no tools |
| No matches | Search "zzz", or Role Shift Manager + Level Highly Recommended: message with one-step undo |
| Loading | `?slow`: board and report skeletons with a status message; Save PDF spinner |
| Saving the PDF | Save PDF: saving (blocked double start), done (toast), `?pdf=fail`: failed with "Try again" |
| No connection | `?offline`, see A3 |
| Unknown candidate | See M2 |
| Stress data | `?stress`: 240 candidates; unbroken 41-letter name, a 58-character name, Chinese and Arabic names; missing HR contacts; 24 competencies with names up to 48 characters; 93-character norm group; 6 strengths, 6 shortfalls, 4 risks, 627 words of insight |

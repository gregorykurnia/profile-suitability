# Generic positions: 15 reports across six roles

Turns the demo from a pizza-restaurant reskin (Service Crew, Pizza Cook, Shift Manager, plus one Bank Teller) into a
general hiring demo for "PT Example": 15 candidates across six positions in different job families, each position
with its own six competencies built from the 24 base competencies.

Working branch: `generic-roles`. Every task commits and pushes there. `main` deploys to production and moves only on
the owner's release line (O1).

## What was asked, and the smallest design

Owner, 2026-11-13: "make this as a generic covering several diff positions … not just 10 reports but 15 reports but
from varied position and content to adjust accordingly as well and the competency choices".

- **The app already handles any role.** Roles, competencies and insights are data (`lib/reportMock.ts`,
  `lib/demoInsights.ts`); the board's Role filter is built from the reports, and the report and PDF were designed
  for up to 24 competencies. So this is a content change plus a small refactor, with no UI work.
- **One file per role** under `lib/roles/`: its six competencies (definition, sources, the three behaviour bands,
  the three "On the job" examples) and its norm group. Adding a position later means adding one file.
- **Authored scores for every candidate** (the Bank Teller sample already works this way) instead of a random
  shuffle hunted for a good seed. That lets the plan fix each candidate's level below. Role norms, benchmarks and
  percentiles stay simulated from a seed.
- **Six competencies per role**, as now. The existing insight guards (no numbers, status words or competency names
  in the prose; the profile signature must match the scores) stay as they are.
- Kept out (follow-ups the owner can pick): a different client company per role, more than six competencies for
  some roles, more than 15 candidates.

## Decisions (defaults, so no task stops to ask)

- **Client company** stays "PT Example" for everyone, as a group with offices, sales, finance, IT and projects.
- **Bank Teller goes.** Customer Service Officer covers front-line service; Hendra Gunawan moves to it with a
  similar strong profile.
- **Voice** follows the current Bank Teller text: "On the job" examples use `{firstName}` and "the candidate", with
  everyday Indonesian working context (payday, month-end, Lebaran) where it fits. Insights use "they".
- **Dates:** new assessment dates fall between 2026-09-22 and 2026-10-10, before the report date (2026-10-12).
- **Seed:** new roles use the seed `pt-example-demo-v1`. Nothing pizza-named is left once 1.5 is done.

## Positions and competencies

Each competency combines three of the 24 base competencies (`docs/default-competencies.md`; spell them exactly).

| Position | Six competencies (base sources) |
|---|---|
| **Customer Service Officer** (front line: counter, phone and chat) | Customer Care & Ownership (Quality Client Delivery, Supporting Others, Being Accountable) · Clear & Empathetic Communication (Adaptive Communication, Supporting Others, Building Connections) · Accurate Case Handling (Following Directions, Distilling Information, Being Accountable) · Complaint Resolution & Escalation (Lateral Problem Solving, Taking Initiative, Adaptive Communication) · Product & Process Knowledge (Applying Expertise, Active Learning, Distilling Information) · Composure Under Customer Pressure (Resilience Under Pressure, Operational Flexibility, Forward Planning) |
| **Sales Executive** (B2B, field and key accounts) | Prospecting & Pipeline Building (Taking Initiative, Building Connections, Forward Planning) · Consultative Selling & Negotiation (Persuading Others, Adaptive Communication, Business Acumen) · Client Relationship Management (Building Connections, Quality Client Delivery, Supporting Others) · Target Ownership & Drive (Being Accountable, Optimizing Performance, Resilience Under Pressure) · Market & Competitor Insight (Trend Identification, Business Acumen, Distilling Information) · Bouncing Back from Setbacks (Resilience Under Pressure, Self Development Focused, Lateral Problem Solving) |
| **Finance Officer** (accounting, reporting, month-end close) | Accuracy & Attention to Detail (Following Directions, Being Accountable, Optimizing Performance) · Compliance & Control Discipline (Following Directions, Being Accountable, Applying Expertise) · Analytical Reporting (Distilling Information, Trend Identification, Applying Expertise) · Deadline & Close Management (Forward Planning, Resilience Under Pressure, Optimizing Performance) · Reconciliation & Problem Investigation (Lateral Problem Solving, Distilling Information, Taking Initiative) · Business Partnering (Adaptive Communication, Business Acumen, Building Connections) |
| **Software Engineer** (product development team) | Technical Problem Solving (Lateral Problem Solving, Applying Expertise, Distilling Information) · Code Quality & Ownership (Being Accountable, Quality Client Delivery, Following Directions) · Continuous Learning (Active Learning, Self Development Focused, Trend Identification) · Collaborative Delivery (Enabling Teamwork, Adaptive Communication, Supporting Others) · Adapting to Changing Requirements (Operational Flexibility, Strategic Agility, Championing Change) · Planning & Estimation (Forward Planning, Being Accountable, Optimizing Performance) |
| **Project Manager** (runs cross-functional projects from kick-off to handover) | Planning & Scheduling (Forward Planning, Distilling Information, Optimizing Performance) · Stakeholder Management (Building Connections, Adaptive Communication, Persuading Others) · Team Leadership & Delegation (Providing Directions, Enabling Teamwork, Coaching Others) · Risk & Issue Management (Lateral Problem Solving, Taking Initiative, Trend Identification) · Delivery Ownership (Being Accountable, Quality Client Delivery, Following Directions) · Leading Through Change & Pressure (Championing Change, Resilience Under Pressure, Strategic Agility) |
| **Management Trainee** (graduate programme, rotating across functions) | Learning Agility (Active Learning, Self Development Focused, Operational Flexibility) · Initiative & Ownership (Taking Initiative, Being Accountable, Championing Change) · Analytical Thinking (Distilling Information, Lateral Problem Solving, Trend Identification) · Commercial Awareness (Business Acumen, Strategic Agility, Trend Identification) · Influence & Collaboration (Persuading Others, Enabling Teamwork, Building Connections) · Leadership Potential (Providing Directions, Coaching Others, Resilience Under Pressure) |

## Candidates (15) and their target levels

Levels: Highly Recommended 85+, Recommended 65–84, Considered 45–64, Not Recommended under 45. Spread: 3 / 6 / 4 / 2.
Existing candidates keep their reference numbers; 09621–09625 are new.

| Position | Candidates (reference, target level) |
|---|---|
| Customer Service Officer | Hendra Gunawan (09615, Highly Recommended) · Ayu Lestari (09616, Recommended) · Gilang Pratama (09621, Considered) |
| Sales Executive | Rina Marlina (09612, Highly Recommended, all six above what the role expects, so the "No gaps" tile shows) · Bayu Ramadhan (09617, Recommended) · Nadia Kusuma (09622, Not Recommended, nothing above, so the "No strengths" tile shows) |
| Finance Officer | Intan Permatasari (09614, Recommended) · Reza Firmansyah (09623, Considered) |
| Software Engineer | Dimas Saputra (09613, Recommended) · Sari Wulandari (09624, Considered) |
| Project Manager | Eko Prasetyo (09619, Recommended) · Agus Wibowo (09611, Considered) |
| Management Trainee | Citra Ayuningtyas (09618, Highly Recommended) · Fitri Rahmawati (09620, Recommended) · Yoga Aditya (09625, Not Recommended) |

Apart from Rina and Nadia, each candidate has at least one competency above and one below what the role expects,
with a different shape from the others in the same role.

## Before the run

- [x] Branch `generic-roles` created from `main` and pushed with upstream (2026-11-13).

## Phase 1: roles, candidates and checks

| # | Task | Pick | Why | Done |
|---|---|---|---|---|
| 1.1 | **Role registry** [no look]. Split `lib/reportMock.ts` into `lib/roles/<role-slug>.ts` (each exports its competency definitions, norm group description, population centre and its seed) plus a role registry, and replace the shuffle with an explicit candidate table where every row names its role and authored scores (keep today's generated scores as authored numbers). Hash benchmarks and norms with the role's own seed, so today's four roles keep `pizzahut-qsr-demo-v6` until 1.5 removes them. Turn the hard-coded guards (exactly ten candidates in `lib/demoInsights.ts`, the role counts at the end of `lib/reportMock.ts`) into checks that every candidate has a fixture and a registered role. Read: this plan's "smallest design" and "Decisions". **Done when** `npm run build` and `npx tsc --noEmit` pass; all ten current reports are unchanged (every insight profile signature still matches, the fixture files have no changes); `npm run test:smoke` passes. | Sol Max | Refactor of the score generator with a pass/fail check | |
| 1.2 | **Customer Service Officer and Sales Executive** [no look]. Write `lib/roles/customer-service-officer.ts` and `lib/roles/sales-executive.ts` from "Positions and competencies" (definition, low / mid / high descriptors and the three "On the job" examples per competency; norm group such as "Simulated Indonesian customer service candidates (demo)"). Move Hendra, Ayu, Rina and Bayu to these roles and add Gilang and Nadia, with authored scores that hit their target level and shape; write their six insight fixtures in `lib/demoInsights.ts` (drop the old fixtures of the four moved candidates). Read: one existing role (Bank Teller) and one fixture as the model for voice and length. **Done when** build and type check pass; the six reports open with the right role and level; nothing in the new text names a restaurant, pizza, crew or store. | Opus 5.5 High | Text people read closely, written in the domain without inventing facts | |
| 1.3 | **Finance Officer and Software Engineer** [no look]. As 1.2 for `lib/roles/finance-officer.ts` and `lib/roles/software-engineer.ts`: move Intan and Dimas, add Reza and Sari, write their four fixtures. **Done when** build and type check pass; the four reports open with the right role and level. | Opus 5.5 High | As 1.2 | |
| 1.4 | **Project Manager and Management Trainee** [no look]. As 1.2 for `lib/roles/project-manager.ts` and `lib/roles/management-trainee.ts`: move Eko, Agus, Citra and Fitri, add Yoga, write their five fixtures. **Done when** build and type check pass; all 15 candidates are on the new roles; the level spread is 3 / 6 / 4 / 2. | Opus 5.5 High | As 1.2 | |
| 1.5 | **Remove the restaurant roles and update the docs and tests** [no look]. Delete the Service Crew, Pizza Cook, Shift Manager and Bank Teller role files and their seed. Rewrite `docs/example-competencies.md` from the six role files (one table per role, as today, plus the demo-data notes). Update the "store candidates" descriptions in `app/manifest.ts` and `app/layout.tsx`, the example strings in `lib/boardQuery.ts` and `redesign/design/design.md` (Shift Manager examples become Project Manager), bump the `PAGES` cache name in `public/sw.js` so old cached reports go, and add the old role names and `pizzahut` to `redesign/old-names.sh`. In `tests/smoke.spec.ts`: 15 candidates, and Agus's PDF name becomes "Agus Wibowo - Project Manager - 12 Oct 2026.pdf". One line in `CHANGELOG.md`. **Done when** build, type check and lint pass; `redesign/old-names.sh` passes; a case-insensitive grep over `app components lib tests public` finds none of pizza, restaurant, iftar, halal, make-line or crew. | Sol Max | Clean-up and test changes checked by build, grep and scripts | |
| 1.6 | **End-to-end and look check** [look]. Run `npm run test:smoke` and `redesign/old-names.sh`. Take screenshots at 1440px and 390px into `docs/screenshots/generic-roles/`: the board By level and List, the Role filter open, one report per role, and the PDF preview for Hendra (Customer Service Officer, the longest role name). Stop any server you started, by its PID. **Done when** both checks pass; shots show 15 candidates spread over four level lanes with "Show all" where a lane has more than six; the Role filter lists exactly the six new positions; each report's verdict band, chart and "On the job" text name that position's work; Rina's report shows the "No gaps" tile and Nadia's the "No strengths" tile; "Customer Service Officer" fits in the verdict band, queue bar and PDF running head without overlap at both widths. Fix only quick problems; list the rest. | Sol Max | Pass/fail checks plus screenshots | |
| R1 | **Phase 1 review**: the diff from `main`; read every role file and fixture for text that doesn't fit its job or contradicts the scores (a strength the chart shows as a gap); levels match the candidate table; no restaurant wording left; the 1.6 shots. Fix what's quick; split the rest into `1.F1`… rows under this one. | Sol Max | Other family from most of the build (1.2–1.4 on Opus) | |
| O1 | *owner*: look through the branch locally (`npm run preview`), then say "release" (the release command is `git push origin generic-roles:main`). | — | — | |

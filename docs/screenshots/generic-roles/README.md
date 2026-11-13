# Generic roles: task 1.6 look check

2026-11-13. All 22 gallery checks pass; 42 key images plus four before/after crops.
The original 10 smoke tests passed, and each of the two added regressions passed after its fix.
Webpack production build, TypeScript, changed-file lint and `redesign/old-names.sh` pass.

| Screen | 1440px | 390px |
|---|---|---|
| Board, By level | [Board](board-by-level-1440.png) | [Board](board-by-level-390.png) |
| Board, List | [List](board-list-1440.png) | [List](board-list-390.png) |
| Native Role menu | [Menu](role-filter-open-1440.png) | [Menu](role-filter-open-390.png) |
| Hendra, Customer Service Officer | [Report](report-customer-service-officer-1440.png), [detail](report-customer-service-officer-1440-detail.png) | [Report](report-customer-service-officer-390.png), [detail](report-customer-service-officer-390-detail.png) |
| Rina, Sales Executive | [Report](report-sales-executive-1440.png), [detail](report-sales-executive-1440-detail.png) | [Report](report-sales-executive-390.png), [detail](report-sales-executive-390-detail.png) |
| Intan, Finance Officer | [Report](report-finance-officer-1440.png), [detail](report-finance-officer-1440-detail.png) | [Report](report-finance-officer-390.png), [detail](report-finance-officer-390-detail.png) |
| Dimas, Software Engineer | [Report](report-software-engineer-1440.png), [detail](report-software-engineer-1440-detail.png) | [Report](report-software-engineer-390.png), [detail](report-software-engineer-390-detail.png) |
| Eko, Project Manager | [Report](report-project-manager-1440.png), [detail](report-project-manager-1440-detail.png) | [Report](report-project-manager-390.png), [detail](report-project-manager-390-detail.png) |
| Citra, Management Trainee | [Report](report-management-trainee-1440.png), [detail](report-management-trainee-1440-detail.png) | [Report](report-management-trainee-390.png), [detail](report-management-trainee-390-detail.png) |
| Nadia, Sales Executive | [Report](report-nadia-1440.png), [detail](report-nadia-1440-detail.png) | [Report](report-nadia-390.png), [detail](report-nadia-390-detail.png) |
| Hendra PDF preview | [Cover](hendra-pdf-1440.png), [running head](hendra-pdf-running-head-1440.png) | [Cover](hendra-pdf-390.png), [running head](hendra-pdf-running-head-390.png) |
| First lane | [Highly Recommended](board-lane-first-1440.png) | [Highly Recommended](board-lane-first-390.png) |
| Last lane | [Not Recommended](board-lane-last-1440.png) | [Not Recommended](board-lane-last-390.png) |

The board shows all 15 candidates in lanes of 3 / 6 / 4 / 2. None exceeds six, so no “Show all” button is due.
The native menu contains “All” plus exactly six positions. Report frames show the verdict; detail crops show
all six chart rows and an expanded job example. Hendra's report is reached through a direct role-filtered link
and reloaded. Rina's detail includes “No gaps”; Nadia's includes “No strengths”.

Two quick fixes: phone summary labels exceeded their buttons ([before](before-board-labels.png),
[after](after-board-labels.png)); the phone PDF fit included the container padding and lost its right gutter
([before](before-pdf-gutter.png), [after](after-pdf-gutter.png)). The label regression failed before the fix;
the gallery audit caught the PDF overflow. Direct preview navigation and 390 → 1440 → 390 resize now pass.
No unresolved defects from this check.

The phone filter rail scrolls horizontally. Queue context is hidden on phones by the existing design;
the role remains whole in Hendra's verdict band. PDF pages retain their A4 proportions and scale down on phones;
their small preview text can be enlarged with browser zoom. Content continuing below a viewport frame scrolls.

Reproduce locally after `npm run build -- --webpack`:

```sh
xvfb-run -a -s '-screen 0 1600x1400x24' node tests/generic-roles-look.mjs
```

The script starts port 3201, blocks browser requests to other origins, records checks in `audit.json`,
and stops its own server by PID in `finally`, including on failures. `GENERIC_ROLES_ONLY=pdf` narrows a rerun;
other groups are `board`, `menus`, and `reports`. Build again after application changes before capturing them.

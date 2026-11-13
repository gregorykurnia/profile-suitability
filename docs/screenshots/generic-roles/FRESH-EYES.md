# Task 1.6: fresh-eyes follow-up

2026-11-13. All 12 supplied images were opened at original resolution. The following numbers refer to the
checker copies, not additional files in this gallery. No unresolved implementation defects remain from this review.

| Checker item | Finding and disposition |
|---|---|
| 01 and 10, Agus highlight | Real capture fault: an invisible pointer left a row hovered. Captures now move the pointer away, deliberately exercise a hover first, and assert that no candidate remains hovered. The app's normal hover behaviour stays available. |
| 02 and 11, cut Order pill | Real discoverability fault: the phone filter rail now shows a fading edge and chevron where content is hidden. The cue disappears on reaching that end and updates for long role names and viewport changes. |
| 02, menu covering Citra and the heading | Expected native picker overlay, as specified in design.md §3. Dismissing it restores the unobstructed heading and name; changing the board layout for the OS popup would defeat the native control. Recorded in approved-looks.md. |
| 03, 95 th and capital Simulated | Real typography and grammar faults: removed the extra suffix spacing and lowercased the comparison phrase in the verdict, PDF cover and PDF About paragraph. Authored norm-group labels remain unchanged. |
| 04, black bottom line | Real capture artifact: the root-display grab included two pixels of Xvfb window border. Cropped them out and added a pixel check against a full-width black bottom row. |
| 05 and 07, tiny PDF overview | Expected fitted A4 overview from design.md §5. A live 3× browser-zoom capture shows sharp text; exporting and extracting real text verifies the role, competency heading and confidentiality footer. Enlarging the copied low-resolution PNG cannot recreate those source glyphs. Recorded in approved-looks.md. |
| 06, after-board-labels | No fault was specified or visible: all four count labels are whole, separated and inside their columns. The original defect remains visible only in the labelled before comparison. |
| 08, clipped and crowded before labels | Historical evidence of the defect already fixed in b4b8622. Kept for comparison; the current board and after crop have whole, separated labels. Recorded in approved-looks.md. |
| 09, before PDF gutter and fine print | Historical gutter defect already fixed in b4b8622; current paper has both gutters. Kept the before image as evidence. Fine print follows the A4 overview decision above. |
| 10, duplicate image | The checker received the same source image twice. The repository and gallery index contain one `board-by-level-1440.png`; no repository duplication needed removal. |
| 12, lane icon on crop edge | Real framing fault: all first/last lane crops now include an eight-pixel margin, retaining the complete icon and row edges. |

Shared-view verification at both 1440px and 390px: List, the Customer Service Officer filter and the Recommended
filter in addition to the default board; every role's verdict, including Rina, Intan and Dimas; PDF covers and
About pages for Hendra plus Rina, Intan and Dimas. Existing competency-detail images were regenerated and are
unchanged. The phone PDF also has a live zoom capture. The temporary exported PDF was removed after extraction.

Checks: 14 smoke tests; the final PDF regression rechecked after the About correction; 32 gallery cases;
Webpack build; TypeScript and changed-file lint; old-name scan. Two new regressions failed before the fixes.
The screenshot script stops its owned server by PID in `finally`; no test server remains on ports 3200 or 3201.

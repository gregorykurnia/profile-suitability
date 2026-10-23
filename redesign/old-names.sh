#!/usr/bin/env bash
# Old-name scan for the rebuilt UI (task B5, run again in the Step 5 review).
# Fails if any component, module, dependency, style hook or visible label of the old UI is still in the code.
# Only the code and tests are scanned, never redesign/, docs/ or CHANGELOG.md, which may name the old things.
# The names come from the files deleted in B2-B4 (see `git ls-tree fb9cffe`); the labels from the banned list in
# the original redesign plan, minus the ones the new design reuses ("Not Recommended" is still a level name).
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

SCAN=()
for p in app components lib public scripts tests proxy.ts package.json; do [ -e "$p" ] && SCAN+=("$p"); done
GREP=(-r --exclude-dir=node_modules --exclude-dir=.next --exclude=package-lock.json)

# Old components, modules and files, matched as whole words and case-sensitively.
NAMES='BrandLockup|AIInsightsSection|CompetencyBarChart|CompetencyBreakdownSection|CompetencyDetailCard|CompetencyDetailSection|CompetencyHorizontalBarChart|CompetencyRadarChart|CompetencySummaryTable|DownloadPdfButton|OverallSuitabilitySection|ReportHeader|SuitabilityGauge|firebaseAdmin|generate-insights|insightsMode'
# Dependencies and styles of the old UI.
STACK='html2canvas|html2canvas-pro|recharts|lucide-react|firebase-admin|@ai-sdk/anthropic|streamObject|no-print|Roboto_Mono'
# Old visible labels, in the exact casing the old UI used (case-sensitive: the design's own "Competency detail"
# differs from the old "Competency Detail" only by case and is allowed).
LABELS='Highly Suitable|Needs Development|Role Benchmark|Role Norm Comparison|Role Fit Risks|Individual Profile Suitability Report|Candidate Assessments|Total Assessed|Needs Attention|Position Applied|Overall Suitability|Competency Breakdown|Competency Detail|AI-Generated Insights|Key Strengths|Development Areas|Mitigations|What This Means in Practice|Reference No|Report Generated|Back to candidates|Norm Average|Candidate Score|Demo sample|Regenerate|Download PDF|Exporting'

hits=0
grep "${GREP[@]}" -nwE "($NAMES|$STACK)" "${SCAN[@]}" && hits=1
grep "${GREP[@]}" -nE "($LABELS)" "${SCAN[@]}" && hits=1
# Whole-word "Suitable" was the old name of the second level; the new levels never use it.
grep "${GREP[@]}" -nwE 'Suitable' "${SCAN[@]}" && hits=1
# Old files that must stay gone.
for f in app/api components/BrandLockup.tsx components/report lib/firebaseAdmin.ts app/page.tsx app/report; do
  if [ -e "$f" ]; then echo "$f should be deleted"; hits=1; fi
done
if [ "$hits" = 1 ]; then echo "✋ Old names found above. Remove or rename them."; exit 1; fi
echo "✅ No old names left."

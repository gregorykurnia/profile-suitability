import type { AIInsights, SuitabilityReport } from "./types";
import { aiInsightsSchema } from "./types";

type DemoRole = "Service Crew" | "Pizza Cook" | "Shift Manager" | "Bank Teller";

const DEMO_SEED_VERSION = "pizzahut-qsr-demo-v6";

interface DemoInsightFixture {
  candidateId: string;
  role: DemoRole;
  seedVersion: string;
  profileSignature: string;
  /** Internal evidence note for reviewing the authored copy; never rendered. */
  evidenceNote: string;
  insights: AIInsights;
}

const fixtures: Record<string, DemoInsightFixture> = {
  "DEUS-2026-09611": {
    candidateId: "DEUS-2026-09611",
    role: "Shift Manager",
    seedVersion: DEMO_SEED_VERSION,
    profileSignature: "fnv1a:7c2dc981",
    evidenceNote:
      "crew-coaching-development 71/69 and operational-standards-compliance 70/71 meet target; shift-leadership-crew-deployment 71/79 and composure-decision-making 65/79 are below; guest-experience-service-recovery 54/73 and shift-performance-cost-control 52/68 are the clearest gaps. Overall 64, Considered.",
    insights: {
      executiveSummary:
        "Agus shows a workable base in coaching crew and keeping routine shift controls in place, but their profile points to clear gaps in leading the guest experience and using shift data to steer results. They are likely to run a familiar shift adequately while needing support when complaints escalate or performance drifts mid-shift. A structured recovery framework, a simple mid-shift review routine, and close coaching from the restaurant manager could help them grow into the full shift leadership role.",
      keyStrengths: [
        "They are likely to explain routine standards to crew and give practical feedback when a task is done incorrectly.",
        "Opening and closing checklists and routine cash procedures appear to give them a dependable structure for running the shift.",
        "With a forecast in hand, they can set a workable crew deployment for a familiar weekday shift.",
        "They may be a steady presence for newer crew members who need a clear demonstration before working a station alone.",
      ],
      developmentAreas: [
        "Escalated complaints may receive inconsistent remedies, and the underlying cause may not be followed up once the guest leaves.",
        "They may review sales, labour, and waste only at close rather than adjusting while the shift is still running.",
        "When several problems arise together, they may hesitate or wait for direction rather than choosing a practical workaround.",
        "Redeploying crew early as demand moves between dine-in and delivery is an area to strengthen through planning and practice.",
      ],
      roleFitRisks: [
        {
          risk: "A guest complaint during a busy peak could be resolved inconsistently, leading to repeat issues or negative online reviews.",
          mitigation: "Introduce a simple recovery framework with agreed remedies, and review logged complaints weekly with the restaurant manager.",
        },
        {
          risk: "Labour hours or waste could drift during a slow period without being corrected until the end-of-day report.",
          mitigation: "Set two or three indicators to check at fixed points in the shift, with an agreed action for each.",
        },
        {
          risk: "An equipment failure combined with a staff shortage could stall decisions at a critical moment.",
          mitigation: "Rehearse common disruption scenarios and agree clear decision rights before they lead peak shifts alone.",
        },
      ],
    },
  },
  "DEUS-2026-09612": {
    candidateId: "DEUS-2026-09612",
    role: "Shift Manager",
    seedVersion: DEMO_SEED_VERSION,
    profileSignature: "fnv1a:bf06ddf8",
    evidenceNote:
      "All six competencies exceed target, from guest-experience-service-recovery 86/73 to crew-coaching-development, operational-standards-compliance, and composure-decision-making at 95. Overall 92, Highly Recommended.",
    insights: {
      executiveSummary:
        "Rina's profile is consistently strong across crew leadership, coaching, standards, commercial awareness, and composure under pressure. They are likely to run organised, audit-ready shifts while developing crew and acting early on performance data. Exposure to store-level challenges, together with a deliberate focus on guest feedback themes, could help them prepare for wider restaurant management responsibility.",
      keyStrengths: [
        "They are likely to develop crew through timely, well-adapted feedback and help new starters become productive quickly.",
        "Food safety, halal handling, and cash procedures appear well embedded in how they run the shift, even under pressure.",
        "They can read sales, speed-of-service, and waste indicators in real time and adjust labour or prep before results drift.",
        "When several problems arise at once, they are likely to stay calm, weigh options quickly, and keep the crew focused.",
      ],
      developmentAreas: [
        "Turning guest feedback and online review themes into pre-shift priorities could further strengthen their service leadership.",
        "Rina may benefit from delegating more decisions to developing crew so that strong personal control does not limit their growth.",
        "Sharing their planning approach with peers could help lift deployment standards beyond Rina's own shifts.",
        "Exposure to store-level targets and multi-shift planning would help them prepare for broader management responsibility.",
      ],
      roleFitRisks: [
        {
          risk: "Their high standards and quick decisions could leave less experienced crew relying on Rina rather than building their own judgement.",
          mitigation: "Agree specific decisions that crew leaders own during Rina's shifts and debrief them afterwards.",
        },
        {
          risk: "Without new stretch, a strong performer in this role may disengage or look for advancement elsewhere.",
          mitigation: "Discuss a development path toward assistant restaurant manager and set clear milestones.",
        },
      ],
    },
  },
  "DEUS-2026-09613": {
    candidateId: "DEUS-2026-09613",
    role: "Service Crew",
    seedVersion: DEMO_SEED_VERSION,
    profileSignature: "fnv1a:57a93897",
    evidenceNote:
      "order-accuracy-payment-handling 65/68 is the relative foundation, then guest-recovery-escalation 59/72; menu-knowledge-suggestive-selling 35/78 and front-kitchen-coordination 38/74 are the clearest gaps. All six are below target. Overall 50, Considered.",
    insights: {
      executiveSummary:
        "Dimas's relative foundation is following the order and payment routine, while most other parts of their service profile point to substantial support needs. They may work best on a clearly defined task such as counter ordering, with close guidance when they need to recommend products, coordinate with the kitchen, or cope with a peak. Structured onboarding, role-played guest conversations, and a buddy during busy shifts could help them build a more complete service base.",
      keyStrengths: [
        "A clear order routine gives them a useful starting point for capturing details and processing payment correctly.",
        "With a read-back habit, they may be able to confirm key details before an order is sent to the kitchen.",
        "When a guest concern is simple and clearly stated, they can listen and pass it to the shift manager with the essential facts.",
        "A defined station and a clear task list may help them stay productive while they build wider service skills.",
      ],
      developmentAreas: [
        "They may need significant coaching to explain menu options and suggest bundles or add-ons that suit the guest.",
        "Updates to the kitchen and delivery riders may be incomplete, leaving colleagues working from different information.",
        "Warm greetings and check-backs with guests may need deliberate practice so requests are not left open.",
        "They may become flustered during peaks and need help deciding which task to handle first.",
      ],
      roleFitRisks: [
        {
          risk: "During a lunch or dinner peak, open guest requests and unclear kitchen updates could combine to slow service.",
          mitigation: "Start them on quieter shifts with a buddy, and introduce peaks gradually with a clear task sequence.",
        },
        {
          risk: "Limited product knowledge could lead to missed promotions or orders that do not match what the guest wanted.",
          mitigation: "Provide promotion-sheet training and role-play common recommendation scenarios before they work the counter alone.",
        },
        {
          risk: "A rider waiting for a changed order could leave with incorrect information.",
          mitigation: "Use a standard call-out for order changes and confirm it with the make-line before updating the rider.",
        },
      ],
    },
  },
  "DEUS-2026-09614": {
    candidateId: "DEUS-2026-09614",
    role: "Shift Manager",
    seedVersion: DEMO_SEED_VERSION,
    profileSignature: "fnv1a:3144c86d",
    evidenceNote:
      "operational-standards-compliance 91/71, composure-decision-making 89/79, and crew-coaching-development 86/69 lead; guest-experience-service-recovery 76/73 and shift-performance-cost-control 71/68 exceed target; shift-leadership-crew-deployment 71/79 is the one gap. Overall 81, Recommended.",
    insights: {
      executiveSummary:
        "Intan's profile shows strong standards discipline, composure under pressure, and a natural coaching style, with sound guest and commercial foundations. They are likely to run a controlled, audit-ready shift and stay calm when problems arise. A more deliberate approach to pre-shift planning and early redeployment could help them lead peak periods as confidently as they handle routine ones.",
      keyStrengths: [
        "They are likely to keep food safety, cash, and checklist routines consistent even when the shift is under pressure.",
        "When several problems arise at once, they can stay calm and choose a practical course of action.",
        "They are likely to coach crew in the moment and adapt their explanation to how each person learns.",
        "They appear able to resolve routine escalated complaints fairly and keep an eye on key shift indicators.",
      ],
      developmentAreas: [
        "Turning the sales forecast into a clear deployment plan before the shift starts is their main area to strengthen.",
        "They may move crew between stations later than ideal when delivery orders surge or someone is absent.",
        "Using guest feedback themes to set service priorities in pre-shift briefings could lift their guest leadership further.",
        "Interpreting less familiar performance trends, such as a change in channel mix, may still benefit from manager input.",
      ],
      roleFitRisks: [
        {
          risk: "A late reaction to a demand surge could leave one station overloaded during a peak.",
          mitigation: "Use a pre-shift planning template and agree redeployment triggers, such as queue length or order-screen backlog.",
        },
        {
          risk: "Strong personal control of standards could take their attention away from the floor during the busiest periods.",
          mitigation: "Delegate routine checks to a trained crew leader during peaks and verify them afterwards.",
        },
      ],
    },
  },
  "DEUS-2026-09615": {
    candidateId: "DEUS-2026-09615",
    role: "Bank Teller",
    seedVersion: DEMO_SEED_VERSION,
    profileSignature: "fnv1a:e553f11c",
    evidenceNote:
      "customer-service-at-the-counter 95/80, cash-handling-transaction-accuracy 93/75, complaint-handling-service-recovery 92/75, compliance-fraud-vigilance 88/71, and product-awareness-referral 84/71 exceed target; composure-peak-queues 72/70 is the lowest and only at target. Overall 87, Highly Recommended.",
    insights: {
      executiveSummary:
        "Hendra's profile is strong across accurate cash handling, warm and clear service, careful controls, complaint handling, and well-judged product referrals. They are likely to run a clean, trusted counter that customers return to and the head teller can rely on at the end-of-day close. Preparing them for the longest queues, such as paydays and the days before Lebaran, and giving them early senior-teller responsibilities could help them grow toward a head teller or customer service path.",
      keyStrengths: [
        "They are likely to count, confirm, and post every transaction exactly, and to correct a difference before the customer leaves the counter.",
        "Customers are likely to feel welcomed and well informed, including elderly or first-time customers who need more patience.",
        "They are likely to apply identity and signature checks every time and to report unusual cash patterns discreetly.",
        "Upset customers are likely to be calmed and given a clear next step, with interested customers referred to customer service or a relationship manager.",
      ],
      developmentAreas: [
        "Exceptional peaks, such as payday, month-end, or the cash rush before Lebaran, may test their pace and composure more than routine busy days.",
        "Preparing the drawer, forms, and receipts before the doors open on known peak days could help them hold the same standard for longer.",
        "They may take extra time with each customer during long queues, so balancing personal care with a steady pace is worth practising.",
        "Early exposure to senior-teller tasks, such as vault counts and supporting new tellers, would help them turn strong personal work into team results.",
      ],
      roleFitRisks: [
        {
          risk: "During an extended peak, they could slow down to give every customer full attention and let the queue grow.",
          mitigation: "Agree a peak-day routine with the head teller, including preparation before opening and an early call to open an extra counter.",
        },
        {
          risk: "A strong teller without a visible growth path may lose motivation over time.",
          mitigation: "Discuss a senior teller or customer service path and give them a small role in coaching new tellers.",
        },
      ],
    },
  },
  "DEUS-2026-09616": {
    candidateId: "DEUS-2026-09616",
    role: "Service Crew",
    seedVersion: DEMO_SEED_VERSION,
    profileSignature: "fnv1a:c3b471ce",
    evidenceNote:
      "order-accuracy-payment-handling 75/68 is the one result exceeding target; guest-welcome-service-ownership 60/77 and guest-recovery-escalation 57/72 follow; front-kitchen-coordination 44/74 is the clearest gap. Overall 57, Considered.",
    insights: {
      executiveSummary:
        "Ayu shows a clear strength in accurate order taking and payment handling, while the wider guest service and team coordination parts of the role need substantial development. They are likely to be reliable at the till but may find it harder to recommend products, coordinate with the kitchen, and stay organised during peaks. A focused onboarding plan that builds on their accuracy while coaching guest conversations and call-outs could help them become a more complete crew member.",
      keyStrengths: [
        "They are likely to capture orders accurately across counter, phone, and delivery-app channels and read back key details.",
        "Vouchers and payments are likely to be handled carefully and according to store procedures.",
        "Their attention to detail may help reduce remakes caused by missed modifiers or special requests.",
        "A clear routine at the till gives them a dependable base from which to build wider service skills.",
      ],
      developmentAreas: [
        "Updates to the kitchen and riders may be incomplete when orders change, so structured call-outs should be a priority.",
        "They may need coaching to explain menu options and suggest relevant bundles or add-ons.",
        "Peaks may leave them unsure which task to handle first, especially when guests, riders, and delivery orders compete.",
        "Complaints may need clearer steps for listening, offering a standard remedy, and involving the shift manager.",
      ],
      roleFitRisks: [
        {
          risk: "A changed order could be captured correctly at the till but not communicated clearly to the make-line or rider.",
          mitigation: "Pair their accurate order entry with a standard call-out and a quick confirmation from the kitchen.",
        },
        {
          risk: "During an iftar or weekend peak, they may become overwhelmed if moved away from the counter.",
          mitigation: "Keep them on the till during early peaks and introduce other stations gradually with a buddy.",
        },
        {
          risk: "A guest complaint could be passed on without the details the shift manager needs.",
          mitigation: "Practise a short listen, clarify, and escalate routine through role-play.",
        },
      ],
    },
  },
  "DEUS-2026-09617": {
    candidateId: "DEUS-2026-09617",
    role: "Pizza Cook",
    seedVersion: DEMO_SEED_VERSION,
    profileSignature: "fnv1a:5268e826",
    evidenceNote:
      "make-line-speed-rush-handling 79/68 and kitchen-teamwork-station-support 77/68 exceed target; recipe-build-standards 63/75, prep-planning-stock-rotation 61/68, product-quality-checks 60/80, and food-safety-hygiene-discipline 57/77 are below. Overall 66, Recommended.",
    insights: {
      executiveSummary:
        "Bayu brings strong pace on the make-line and a helpful team attitude, which makes them a useful presence during busy service. Their results also point to gaps in food safety discipline, final quality checks, and consistent builds, where speed may be coming at the expense of standards. Pairing their rush strength with firm checklists and regular quality coaching could help them become a reliable all-round cook.",
      keyStrengths: [
        "They are likely to keep pizzas moving steadily from the order screen to the oven when orders stack up.",
        "They can stay composed and adjust their sequence when a large order arrives mid-peak.",
        "They are likely to support colleagues at other stations and share updates about shortages or delays.",
        "Their willingness to help may make them a positive influence on newer crew during busy shifts.",
      ],
      developmentAreas: [
        "Temperature logs, date labels, and sanitation steps may slip when the kitchen is busy, so verification is needed.",
        "They may box pizzas without a careful final check, letting bake or topping faults reach the guest.",
        "Topping portions and build steps may vary when they work quickly, so recipe-card prompts would help.",
        "Planning prep against the forecast and rotating stock correctly are areas to strengthen with a lead.",
      ],
      roleFitRisks: [
        {
          risk: "Speed during a rush could come at the cost of food safety checks, creating risk during an audit.",
          mitigation: "Schedule shift manager verification of logs at fixed times and keep the checklist visible at the station.",
        },
        {
          risk: "Faulty pizzas could reach guests, increasing complaints and refunds.",
          mitigation: "Introduce a short visual standard at the cut table and coach them to check each pizza against the order slip.",
        },
        {
          risk: "Inconsistent portions could raise food cost and create variation between orders.",
          mitigation: "Use portion cups and periodic build checks until their consistency is established.",
        },
      ],
    },
  },
  "DEUS-2026-09618": {
    candidateId: "DEUS-2026-09618",
    role: "Pizza Cook",
    seedVersion: DEMO_SEED_VERSION,
    profileSignature: "fnv1a:84aeeebe",
    evidenceNote:
      "prep-planning-stock-rotation 81/68 is the clear strength; make-line-speed-rush-handling 67/68 and kitchen-teamwork-station-support 66/68 meet target; product-quality-checks 71/80, food-safety-hygiene-discipline 67/77, and recipe-build-standards 66/75 are below. Overall 70, Recommended.",
    insights: {
      executiveSummary:
        "Citra stands out for planning prep against demand and keeping the kitchen stocked, with a steady base in rush handling and teamwork. Their build consistency, food safety routines, and final product checks need further development to reach the standard the role requires. Structured build coaching and verified food safety routines could help them match their planning strength with consistent product quality.",
      keyStrengths: [
        "They are likely to check the forecast and prepare dough and toppings so the make-line does not run short.",
        "Stock rotation and waste control appear to be natural parts of how they plan the shift.",
        "They can keep pace with a normal lunch or dinner peak and follow the order screen sequence.",
        "They are likely to share routine updates with nearby stations and help colleagues when asked.",
      ],
      developmentAreas: [
        "Topping portions and build steps may vary, especially with newer or less familiar products.",
        "Temperature checks and labelling may need reminders when production timing is tight.",
        "They may need to treat the cut table as a firmer quality gate before boxing.",
        "During sustained weekend or iftar rushes, they may need extra support to protect both speed and quality.",
      ],
      roleFitRisks: [
        {
          risk: "Inconsistent builds could lead to guest complaints about pizzas that look or taste different between visits.",
          mitigation: "Coach builds against recipe cards and check their first products after each new menu launch.",
        },
        {
          risk: "Food safety logs could be missed on compressed shifts.",
          mitigation: "Add scheduled verification by the shift manager until the routine is consistent.",
        },
      ],
    },
  },
  "DEUS-2026-09619": {
    candidateId: "DEUS-2026-09619",
    role: "Pizza Cook",
    seedVersion: DEMO_SEED_VERSION,
    profileSignature: "fnv1a:ae3cf8af",
    evidenceNote:
      "make-line-speed-rush-handling and kitchen-teamwork-station-support 95/68, food-safety-hygiene-discipline 86/77, recipe-build-standards 82/75; prep-planning-stock-rotation 69/68 meets target; product-quality-checks 77/80 is just below. Overall 84, Recommended.",
    insights: {
      executiveSummary:
        "Eko's profile is strong across make-line speed, teamwork, food safety, and build consistency, making them a likely anchor for busy kitchen shifts. Their final product checks and prep planning are sound but less developed than their other strengths. A consistent cut-table routine and more ownership of prep planning could round out their profile and prepare them for a kitchen leader role.",
      keyStrengths: [
        "They are likely to stay quick and composed when the order screen is full, keeping the oven loaded steadily.",
        "They can keep stations aligned with clear call-outs and help newer crew learn routines.",
        "Food safety and halal handling procedures appear well embedded, even under time pressure.",
        "They are likely to build pizzas to specification and notice when a dough batch behaves differently.",
      ],
      developmentAreas: [
        "Final checks at the cut table may be rushed when they are focused on speed, letting occasional faults through.",
        "They may rely on the prep chart rather than adjusting quantities ahead of promotions or holiday weekends.",
        "Turning their speed into team results will mean explaining their sequencing approach to colleagues.",
        "Taking ownership of prep planning for a shift would help prepare them for broader kitchen responsibility.",
      ],
      roleFitRisks: [
        {
          risk: "A focus on speed could let an under-baked pizza or wrong topping reach the guest.",
          mitigation: "Agree a short cut-table check that every pizza passes, even during peaks.",
        },
        {
          risk: "Prep could run short during an unexpected promotion surge.",
          mitigation: "Have them review the forecast with the shift manager before promotional days and adjust dough pulls together.",
        },
      ],
    },
  },
  "DEUS-2026-09620": {
    candidateId: "DEUS-2026-09620",
    role: "Pizza Cook",
    seedVersion: DEMO_SEED_VERSION,
    profileSignature: "fnv1a:c13716d3",
    evidenceNote:
      "food-safety-hygiene-discipline 81/77, make-line-speed-rush-handling 80/68, and kitchen-teamwork-station-support 76/68 exceed target; recipe-build-standards 77/75 meets; product-quality-checks 77/80 and prep-planning-stock-rotation 64/68 are below. Overall 76, Recommended.",
    insights: {
      executiveSummary:
        "Fitri offers a solid all-round kitchen profile, with particular strengths in food safety discipline, rush handling, and supporting colleagues. Their prep planning and final product checks are the main areas to tighten. With guidance on forecasting prep and a firmer cut-table routine, they are likely to become a dependable member of the kitchen team.",
      keyStrengths: [
        "They are likely to complete temperature checks and labelling on time and raise concerns before product reaches the make-line.",
        "They can keep pace during busy peaks and adjust their sequence when demand changes.",
        "They are likely to support colleagues at other stations and share updates clearly.",
        "They follow recipe cards and portion guides reliably for familiar products.",
      ],
      developmentAreas: [
        "Planning prep against the forecast may need support, especially ahead of promotions or holiday weekends.",
        "They may need to slow down at the cut table to catch bake or topping faults before boxing.",
        "Newer menu items may benefit from a short demonstration and a check of their first builds.",
        "Reviewing waste at close could help them connect prep decisions with food cost.",
      ],
      roleFitRisks: [
        {
          risk: "Under-prepared items could run short during a dinner peak and stop the make-line.",
          mitigation: "Review the prep chart and forecast with a lead before busy shifts.",
        },
        {
          risk: "An occasional faulty pizza could reach a guest during a rush.",
          mitigation: "Use a short visual standard at the cut table and spot checks from the shift manager.",
        },
      ],
    },
  },
};

function profileSignature(report: SuitabilityReport): string {
  const profile = [
    report.suitabilityScore,
    report.suitabilityLabel,
    ...report.competencies.map(
      (competency) =>
        `${competency.id}:${competency.score}:${competency.benchmarkScore}:${competency.status}`
    ),
  ].join("|");

  let hash = 2166136261;
  for (let index = 0; index < profile.length; index += 1) {
    hash ^= profile.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return `fnv1a:${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

export function assertDemoInsightCoverage(
  candidateIds: string[],
  seedVersion: string
): void {
  const expected = [...candidateIds].sort();
  const actual = Object.keys(fixtures).sort();

  if (seedVersion !== DEMO_SEED_VERSION) {
    throw new Error(`Demo insight seed mismatch: expected ${DEMO_SEED_VERSION}, received ${seedVersion}.`);
  }
  if (expected.length !== 10 || new Set(expected).size !== expected.length) {
    throw new Error("The PT Example demo must contain exactly ten unique candidate reports.");
  }
  if (actual.length !== expected.length || actual.some((id, index) => id !== expected[index])) {
    throw new Error("Demo insight fixtures must cover exactly the current candidate IDs.");
  }
}

export function getDemoInsightsForReport(
  report: SuitabilityReport,
  seedVersion: string
): AIInsights {
  const fixture = fixtures[report.candidateId];
  if (!fixture) {
    throw new Error(`Missing demo insight fixture for ${report.candidateId}.`);
  }
  if (fixture.candidateId !== report.candidateId) {
    throw new Error(`Demo insight candidate mismatch for ${report.candidateId}.`);
  }
  if (fixture.seedVersion !== seedVersion) {
    throw new Error(`Demo insight seed mismatch for ${report.candidateId}.`);
  }
  if (fixture.role !== report.positionApplied) {
    throw new Error(`Demo insight role mismatch for ${report.candidateId}.`);
  }
  const currentSignature = profileSignature(report);
  if (fixture.profileSignature !== currentSignature) {
    throw new Error(
      `Demo insight profile mismatch for ${report.candidateId}: expected ${fixture.profileSignature}, received ${currentSignature}.`
    );
  }

  const parsed = aiInsightsSchema.safeParse(fixture.insights);
  if (!parsed.success) {
    throw new Error(`Invalid demo insights for ${report.candidateId}: ${parsed.error.message}`);
  }
  if (
    parsed.data.roleFitRisks.length < 2 ||
    parsed.data.roleFitRisks.length > 4 ||
    parsed.data.roleFitRisks.some(({ risk, mitigation }) => !risk.trim() || !mitigation.trim())
  ) {
    throw new Error(`Demo insight risks must contain two to four complete pairs for ${report.candidateId}.`);
  }

  const visibleCopy = [
    parsed.data.executiveSummary,
    ...parsed.data.keyStrengths,
    ...parsed.data.developmentAreas,
    ...parsed.data.roleFitRisks.flatMap(({ risk, mitigation }) => [risk, mitigation]),
  ].join(" ");
  const summarySentenceCount = parsed.data.executiveSummary.match(/[.!?](?:\s|$)/g)?.length ?? 0;
  if (summarySentenceCount < 2 || summarySentenceCount > 3) {
    throw new Error(`Demo insight summary must contain two or three sentences for ${report.candidateId}.`);
  }
  if (/\d|\b(?:above|below|meets|percentile)\b/i.test(visibleCopy)) {
    throw new Error(`Demo insight prose contains a numeric result or status term for ${report.candidateId}.`);
  }
  const normalizedCopy = visibleCopy.toLocaleLowerCase();
  if (report.competencies.some((competency) => normalizedCopy.includes(competency.name.toLocaleLowerCase()))) {
    throw new Error(`Demo insight prose contains a competency name for ${report.candidateId}.`);
  }

  return parsed.data;
}

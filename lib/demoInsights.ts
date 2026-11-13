import type { AIInsights, SuitabilityReport } from "./types";
import { aiInsightsSchema } from "./types";
import type { RoleName } from "./roles";

const DEMO_SEED_VERSION = "pizzahut-qsr-demo-v6";
const PT_EXAMPLE_SEED_VERSION = "pt-example-demo-v1";

interface DemoInsightFixture {
  candidateId: string;
  role: RoleName;
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
    role: "Sales Executive",
    seedVersion: PT_EXAMPLE_SEED_VERSION,
    profileSignature: "fnv1a:7ed9333d",
    evidenceNote:
      "All six competencies exceed target, from bouncing-back-from-setbacks 89/79 and client-relationship-management 88/75 to consultative-selling-negotiation 93/69 and target-ownership-drive 94/77. Overall 90, Highly Recommended.",
    insights: {
      executiveSummary:
        "Rina's profile is consistently strong across finding new business, selling on value, building lasting client relationships, owning the target, reading the market, and recovering from setbacks. They are likely to keep a full pipeline, win profitable deals with senior buyers, and grow key accounts without needing pressure from the sales manager. Larger and more complex accounts, together with a chance to share their approach with newer colleagues, could help them prepare for a key account or sales leadership role.",
      keyStrengths: [
        "They are likely to build new opportunities every week and reach decision-makers through referrals and their own network.",
        "They can uncover a client's real business problem and negotiate terms that work for the client while protecting the margin.",
        "Key accounts are likely to see them as a trusted adviser who keeps every promise after the sale.",
        "Lost deals and slow months are likely to be treated as lessons, with a quick return to customers and a better approach.",
      ],
      developmentAreas: [
        "Their strong personal results may rely on doing much of the work themselves, so handing more to support teams is worth practising.",
        "Sharing their prospecting and negotiation approach with newer colleagues could lift results beyond their own territory.",
        "Exposure to larger, multi-site accounts and formal tenders would stretch their strategic selling further.",
        "Turning what they hear in the field into written input for the sales plan could increase their influence on the wider business.",
      ],
      roleFitRisks: [
        {
          risk: "Their high standards and quick decisions could leave colleagues and support teams relying on Rina rather than building their own judgement.",
          mitigation: "Agree which client tasks the support teams own, and review handovers together each month.",
        },
        {
          risk: "Without new stretch, a strong performer in this role may disengage or look for advancement elsewhere.",
          mitigation: "Discuss a path toward key account management or sales leadership and set clear milestones.",
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
    role: "Customer Service Officer",
    seedVersion: PT_EXAMPLE_SEED_VERSION,
    profileSignature: "fnv1a:c296ecfd",
    evidenceNote:
      "clear-empathetic-communication 96/77, customer-care-ownership 94/77, complaint-resolution-escalation 93/79, accurate-case-handling 90/82, and product-process-knowledge 88/70 exceed target; composure-under-customer-pressure 75/82 is the one gap. Overall 89, Highly Recommended.",
    insights: {
      executiveSummary:
        "Hendra's profile is strong across owning customer problems, warm and clear explanations, accurate case records, fair complaint resolution, and product knowledge. They are likely to give customers correct answers the first time and see each case through until it is closed, whether the contact comes in at the counter, on the phone, or in chat. Building their composure for the most demanding contacts and the busiest periods, such as service disruptions and the weeks before Lebaran, could help them hold that standard every day and prepare for a senior officer or team leader path.",
      keyStrengths: [
        "They are likely to treat each customer's problem as their own, keep promised call-backs, and update customers before they have to ask.",
        "Customers are likely to feel heard and well informed, whether the conversation happens at the counter, on the phone, or in chat.",
        "Case records are likely to be complete and precise, so the teams that pick up a case can act without contacting the customer again.",
        "They can trace the cause of a complaint, offer a fair fix within their authority, and explain new products and policies correctly.",
      ],
      developmentAreas: [
        "Very angry customers or long disruptions may unsettle them more than routine busy days, and their usual warmth could become strained.",
        "When the phone queue and open chats build up together, they may find it harder to keep their usual pace and precision.",
        "A clear plan for known peaks, such as month-end billing and the weeks before Lebaran, could help them hold the same standard for longer.",
        "Their care for each customer may lead them to spend extra time on every contact, so balancing thoroughness with queue pace is worth practising.",
      ],
      roleFitRisks: [
        {
          risk: "During a major service disruption, a run of angry contacts could wear down their composure and slow their handling of the queue.",
          mitigation: "Agree a disruption routine with the team leader, including fewer parallel chats, short breaks after very difficult calls, and an early call for support.",
        },
        {
          risk: "A strong officer without a visible growth path may lose motivation over time.",
          mitigation: "Discuss a senior officer or team leader path and give them a small role in coaching new officers.",
        },
      ],
    },
  },
  "DEUS-2026-09616": {
    candidateId: "DEUS-2026-09616",
    role: "Customer Service Officer",
    seedVersion: PT_EXAMPLE_SEED_VERSION,
    profileSignature: "fnv1a:014d1824",
    evidenceNote:
      "accurate-case-handling 88/82 and product-process-knowledge 80/70 exceed target; customer-care-ownership 76/77 is at target; clear-empathetic-communication 72/77 is below; complaint-resolution-escalation 66/79 and composure-under-customer-pressure 70/82 are the clearest gaps. Overall 75, Recommended.",
    insights: {
      executiveSummary:
        "Ayu shows clear strengths in accurate case records and in knowing products and procedures, with a dependable approach to following routine cases through. They are likely to give correct answers and leave a clean record behind every contact, but may find it harder to calm an upset customer, resolve complaints that fall outside the standard remedies, or stay steady when pressure rises. Coaching on difficult conversations and a clear plan for peak days could help them turn their accuracy into a more complete service role.",
      keyStrengths: [
        "They are likely to verify customers, record each contact precisely, and route cases to the right team the first time.",
        "Their knowledge of products, prices, and policies is likely to be correct and up to date, including after announced changes.",
        "Routine cases are likely to be followed through to a clear outcome, with promised call-backs kept.",
        "Colleagues may come to rely on them to check a procedure or find the right answer in the knowledge base.",
      ],
      developmentAreas: [
        "Complaints that need judgement beyond the standard remedies may be escalated early or handled by repeating policy.",
        "Their explanations may be correct but brief, so anxious or confused customers could need more warmth and patience.",
        "Angry customers and high-volume periods may unsettle them and affect their pace.",
        "Longer cases that pass through several departments may need a reminder so the customer is updated along the way.",
      ],
      roleFitRisks: [
        {
          risk: "A business customer with a repeated problem could receive a correct but standard answer that does not address the real cause.",
          mitigation: "Practise a listen, clarify, and resolve routine through role-play, and review complex complaints with the team leader each week.",
        },
        {
          risk: "During month-end or a service disruption, a growing queue could leave them flustered and slow.",
          mitigation: "Start them with fewer parallel chats on peak days and agree when to call the team leader for support.",
        },
        {
          risk: "Customers on the phone may find their answers accurate but impersonal.",
          mitigation: "Review recorded calls together and build plain, warm versions of the most common answers.",
        },
      ],
    },
  },
  "DEUS-2026-09617": {
    candidateId: "DEUS-2026-09617",
    role: "Sales Executive",
    seedVersion: PT_EXAMPLE_SEED_VERSION,
    profileSignature: "fnv1a:099e8b68",
    evidenceNote:
      "prospecting-pipeline-building 82/69 and target-ownership-drive 84/77 exceed target; client-relationship-management 74/75 and bouncing-back-from-setbacks 78/79 are at target; consultative-selling-negotiation 62/69 and market-competitor-insight 60/70 are the gaps. Overall 73, Recommended.",
    insights: {
      executiveSummary:
        "Bayu shows clear strengths in finding new business and owning the target, with a sound base in looking after clients and recovering from lost deals. They are likely to keep plenty of opportunities moving and push hard for results, but may rely on price rather than value when negotiating and know too little about the client's industry and competitors. Coaching on discovery questions, negotiation practice, and regular market briefings could help them turn their energy into larger, more profitable deals.",
      keyStrengths: [
        "They are likely to prospect steadily and book first meetings with new business customers without waiting for leads.",
        "They can track progress against the target every week and act early when results slip.",
        "Assigned accounts are likely to hear from them regularly, with routine after-sales issues followed up.",
        "Routine rejections are unlikely to slow them for long, and they are likely to move on to the next opportunity quickly.",
      ],
      developmentAreas: [
        "When a buyer pushes on price, they may offer a discount before understanding what the client needs or showing the value of the offer.",
        "They may present a similar pitch to different clients rather than shaping the proposal around each client's business.",
        "Knowledge of competitor offers and the client's industry may be thin, so comparisons could catch them unprepared.",
        "Market signals heard in the field may not be passed on to the team or turned into new sales ideas.",
      ],
      roleFitRisks: [
        {
          risk: "Pressure to hit the target could lead to discounts that win deals at a weak margin.",
          mitigation: "Set clear discount approval limits and review larger quotations with the sales manager before they go out.",
        },
        {
          risk: "A client comparing PT Example with a competitor could find their answers unconvincing.",
          mitigation: "Give them a short competitor summary to study and include a monthly market discussion in the sales meeting.",
        },
        {
          risk: "Larger deals with several decision-makers could stall without a clear selling strategy.",
          mitigation: "Pair them with an experienced colleague on their first larger opportunities and plan each meeting together.",
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
  "DEUS-2026-09621": {
    candidateId: "DEUS-2026-09621",
    role: "Customer Service Officer",
    seedVersion: PT_EXAMPLE_SEED_VERSION,
    profileSignature: "fnv1a:9f255d63",
    evidenceNote:
      "clear-empathetic-communication 82/77 is the one result exceeding target; customer-care-ownership 68/77 and composure-under-customer-pressure 64/82 follow; accurate-case-handling 52/82, product-process-knowledge 54/70, and complaint-resolution-escalation 58/79 are the clearest gaps. Overall 63, Considered.",
    insights: {
      executiveSummary:
        "Gilang's clearest strength is warm, clear communication that helps customers feel listened to, while accurate records, product knowledge, and complaint handling need substantial development. They are likely to build good rapport on calls and in chat but may give incomplete answers, leave gaps in case notes, or pass problems on without a complete summary. A structured onboarding with checklists for common request types, a knowledge-base routine, and close support from the team leader could help them build a reliable service base.",
      keyStrengths: [
        "They are likely to listen patiently and explain things in plain, friendly language that suits each customer.",
        "Customers may feel at ease with them, which can help calm a worried caller early in the conversation.",
        "Their chat replies are likely to sound personal rather than copied from a template.",
        "Their rapport with customers gives them a useful base from which to build case and product skills.",
      ],
      developmentAreas: [
        "Case notes may be incomplete or filed under the wrong category, leaving the next officer to contact the customer again.",
        "They may give outdated or partial answers about products and policies and need to check with colleagues often.",
        "Complaints may be passed on without the facts the next person needs, or settled with a remedy that does not fit the problem.",
        "Busy periods and demanding customers may affect their accuracy and pace, and promised call-backs could slip.",
      ],
      roleFitRisks: [
        {
          risk: "A friendly conversation could end with the customer satisfied for now but the request not recorded or routed correctly.",
          mitigation: "Use a short checklist for each common request type and audit a sample of their case notes every week in the first months.",
        },
        {
          risk: "Incorrect product or policy information could lead to complaints or refunds later.",
          mitigation: "Pair them with a buddy, give short weekly knowledge checks, and make the knowledge base the first stop for any question.",
        },
        {
          risk: "During a disruption, a growing queue could lead to rushed answers and mixed-up cases.",
          mitigation: "Keep them on a single channel during peaks and introduce parallel chats gradually.",
        },
      ],
    },
  },
  "DEUS-2026-09622": {
    candidateId: "DEUS-2026-09622",
    role: "Sales Executive",
    seedVersion: PT_EXAMPLE_SEED_VERSION,
    profileSignature: "fnv1a:d0e88bd6",
    evidenceNote:
      "All six are below target. client-relationship-management 56/75 is the relative foundation; market-competitor-insight 44/70 and consultative-selling-negotiation 40/69 follow; prospecting-pipeline-building 34/69, bouncing-back-from-setbacks 36/79, and target-ownership-drive 38/77 are the clearest gaps. Overall 41, Not Recommended.",
    insights: {
      executiveSummary:
        "Nadia's relative foundation is looking after clients they already know, while most other parts of their sales profile point to substantial support needs. They may find it hard to build new business, negotiate on value, keep up the effort toward a target, and recover after a lost deal. If they were hired, a narrower account support role with close guidance would suit them better than independent field sales at first.",
      keyStrengths: [
        "Existing clients they already know may find them helpful and willing to follow up on routine requests.",
        "With a clear contact plan, they may be able to keep in regular touch with a small set of assigned accounts.",
        "When a client raises a simple delivery problem, they can pass it to the right internal team.",
        "A defined account list and clear weekly activities may help them stay productive while they build wider sales skills.",
      ],
      developmentAreas: [
        "They may wait for leads to arrive and start prospecting only when the pipeline is already empty.",
        "When a buyer asks for a lower price, they may give way quickly rather than explore what the client values.",
        "They may lose sight of the target until late in the period and find it hard to close the gap.",
        "A rejection or lost deal may leave them discouraged and slow to contact new prospects for some time.",
      ],
      roleFitRisks: [
        {
          risk: "An empty pipeline could leave the target out of reach well before the end of the quarter.",
          mitigation: "Set a weekly prospecting block and a target number of first meetings, reviewed with the sales manager every week.",
        },
        {
          risk: "Deals could be closed only through discounts that hurt the margin.",
          mitigation: "Keep pricing decisions with the sales manager until negotiation practice shows steady progress.",
        },
        {
          risk: "A series of lost deals could lower their confidence and activity further.",
          mitigation: "Review each lost deal together, focus feedback on activities within their control, and pair them with an experienced colleague.",
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

export function assertDemoInsightCoverage(candidateIds: string[]): void {
  const normalizedIds = candidateIds.map((id) => id.trim().toLowerCase());
  if (normalizedIds.some((id) => !id) || new Set(normalizedIds).size !== candidateIds.length) {
    throw new Error("Demo candidate IDs must be non-empty and unique.");
  }
  for (const candidateId of candidateIds) {
    if (!Object.hasOwn(fixtures, candidateId)) {
      throw new Error(`Missing demo insight fixture for ${candidateId}.`);
    }
  }
}

export function getDemoInsightsForReport(
  report: SuitabilityReport,
  seedVersion: string
): AIInsights {
  if (!Object.hasOwn(fixtures, report.candidateId)) {
    throw new Error(`Missing demo insight fixture for ${report.candidateId}.`);
  }
  const fixture = fixtures[report.candidateId];
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

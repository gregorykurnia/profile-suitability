import type { AIInsights, SuitabilityReport } from "./types";
import { aiInsightsSchema } from "./types";
import type { RoleName } from "./roles";

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
    role: "Project Manager",
    seedVersion: PT_EXAMPLE_SEED_VERSION,
    profileSignature: "fnv1a:122b17a6",
    evidenceNote:
      "planning-scheduling 78/71 and delivery-ownership 80/75 exceed target; team-leadership-delegation 62/68 and risk-issue-management 58/71 are behind; stakeholder-management 52/77 and leading-through-change-pressure 50/80 are the clearest gaps. Overall 63, Considered.",
    insights: {
      executiveSummary:
        "Agus builds dependable plans and takes the delivery of agreed work seriously, following the company's process through to handover. Their profile points to clear gaps in winning support across departments, leading people through change, and acting early on what could go wrong. They are likely to run a well-defined project with a supportive sponsor, but would need close backing and coaching before leading a large or contested one.",
      keyStrengths: [
        "They are likely to turn a project goal into a clear plan of tasks, owners and dates, and keep it current as work moves.",
        "Dependencies such as permits, equipment and training are likely to be mapped before dates are promised.",
        "They can be expected to hold the work to the agreed standard and complete sign-off steps properly.",
        "Open items at handover are likely to be passed on with a named owner rather than left behind.",
      ],
      developmentAreas: [
        "When a department pushes back, they may press ahead without meeting them or send updates that do not suit senior readers.",
        "Changes may be presented as instructions, and tighter deadlines may be passed straight to the team without deciding what to drop.",
        "Early warning signs, such as a vendor missing small deliveries, may be noted without asking what they mean for the main date.",
        "They may keep difficult tasks for themselves and give team members from other departments vague direction.",
      ],
      roleFitRisks: [
        {
          risk: "A department that was not won over could object late and delay a decision or go-live.",
          mitigation: "Map stakeholders at kick-off with the sponsor and have the sponsor join the first difficult conversations.",
        },
        {
          risk: "A sudden change in scope or date could unsettle the team and stall progress.",
          mitigation: "Agree with the sponsor in advance how priorities will be cut when dates move, and coach them on explaining changes to users.",
        },
        {
          risk: "Problems could surface only once they have already caused delay.",
          mitigation: "Hold a short fortnightly risk review with the sponsor that asks what the latest signs mean for the key dates.",
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
    role: "Software Engineer",
    seedVersion: PT_EXAMPLE_SEED_VERSION,
    profileSignature: "fnv1a:6660f78f",
    evidenceNote:
      "technical-problem-solving 86/81 and continuous-learning 82/72 exceed target; code-quality-ownership 78/80 and adapting-changing-requirements 66/68 are at target; collaborative-delivery 70/81 and planning-estimation 68/78 are the clearest gaps. Overall 75, Recommended.",
    insights: {
      executiveSummary:
        "Dimas brings strong technical depth and a real appetite for new skills, backed by a dependable standard of tested code. They are likely to find the cause of difficult defects and pick up unfamiliar tools quickly, but may work too much on their own and give estimates that prove optimistic. Regular pairing, short daily check-ins, and estimating together with the team lead could help them turn individual strength into reliable team delivery.",
      keyStrengths: [
        "They are likely to break difficult problems into parts and find the real cause rather than patching symptoms.",
        "New languages, frameworks, and parts of the system are likely to be learned quickly when the work needs them.",
        "They can be expected to bring well-judged ideas about tools and practices back to the team.",
        "Their code is likely to be tested and to follow the team's standards for routine work.",
      ],
      developmentAreas: [
        "They may spend too long on a task alone before mentioning that they are blocked.",
        "Technical trade-offs may be explained in terms that product managers and testers find hard to follow.",
        "Estimates may leave out testing time or dependencies on other teams, so delays surface late in the sprint.",
        "Larger changes in technical direction may take them some time to accept.",
      ],
      roleFitRisks: [
        {
          risk: "A feature that depends on another team could slip without warning because the dependency was not planned for.",
          mitigation: "Review estimates and dependencies with the team lead at sprint planning, and agree a mid-sprint check-in.",
        },
        {
          risk: "Working alone on hard problems could leave teammates unaware of progress or blockers.",
          mitigation: "Pair them with a teammate on complex tasks and ask for a short daily update in stand-up.",
        },
        {
          risk: "Product managers could lose confidence if technical delays are hard to understand.",
          mitigation: "Practise plain-language updates that say what changed, why, and what it means for the release.",
        },
      ],
    },
  },
  "DEUS-2026-09614": {
    candidateId: "DEUS-2026-09614",
    role: "Finance Officer",
    seedVersion: PT_EXAMPLE_SEED_VERSION,
    profileSignature: "fnv1a:3a0e7b03",
    evidenceNote:
      "compliance-control-discipline 88/76, accuracy-attention-to-detail 84/70 and deadline-close-management 78/70 exceed target; analytical-reporting 70/72 and reconciliation-problem-investigation 74/72 are at target; business-partnering 66/82 is the clearest gap. Overall 77, Recommended.",
    insights: {
      executiveSummary:
        "Intan shows clear strengths in accurate, well-controlled work and in planning the month-end close, with a dependable approach to reports and reconciliations. They are likely to deliver clean figures on time and keep records ready for audit, but may find it harder to explain the numbers to colleagues outside finance or advise budget holders. Joint budget reviews with the supervisor and plain-language report templates could help them become a stronger partner to the business.",
      keyStrengths: [
        "Entries and payments are likely to be right the first time, with small inconsistencies caught before review.",
        "They are likely to follow approval limits and policies consistently, even when a deadline is close.",
        "Close tasks are likely to be planned days ahead, with late inputs chased before they hold up the team.",
        "Routine reconciliations and standard reports are likely to be complete and on time.",
      ],
      developmentAreas: [
        "Explanations to department heads may rely on account codes rather than plain descriptions of what was spent and why.",
        "They may respond to formal requests from other teams rather than building working relationships ahead of need.",
        "Slower trends that build over several months may need a prompt before they are raised.",
        "Differences that span several months or come from a system error may still need escalation.",
      ],
      roleFitRisks: [
        {
          risk: "Budget holders could find their reports correct but hard to act on.",
          mitigation: "Review the first few monthly reports together and add a short plain-language commentary to each.",
        },
        {
          risk: "A firm stance on controls could be read as unhelpful by colleagues under time pressure.",
          mitigation: "Coach them to explain the reason behind each control and offer the quickest compliant route.",
        },
        {
          risk: "Limited contact with other departments could mean early warnings about cost changes are missed.",
          mitigation: "Join the supervisor in monthly meetings with the departments they support.",
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
    role: "Management Trainee",
    seedVersion: PT_EXAMPLE_SEED_VERSION,
    profileSignature: "fnv1a:178cba64",
    evidenceNote:
      "learning-agility 94/79, analytical-thinking 92/81, initiative-ownership 90/78, influence-collaboration 86/71 and commercial-awareness 84/77 exceed target; leadership-potential 74/79 is the one gap. Overall 87, Highly Recommended.",
    insights: {
      executiveSummary:
        "Citra is a fast, self-driven learner who becomes useful quickly in a new team, reads data sharply, and links everyday work to how the business makes money. They are likely to find improvements nobody asked for, see them through, and win colleagues' support along the way. Their one area to build is leading a group under pressure, which planned chances to lead with a mentor's feedback should develop during the programme.",
      keyStrengths: [
        "They are likely to settle into each new function quickly, ask for feedback without prompting, and carry lessons into the next rotation.",
        "Complex information is likely to be turned into a clear recommendation that managers can act on.",
        "They can be expected to spot useful work, take responsibility for it, and follow it through to a measurable result.",
        "They are likely to build relationships across departments early and bring colleagues behind a well-prepared idea.",
      ],
      developmentAreas: [
        "They may hold back from organising a group and wait for someone else to take charge.",
        "As a deadline nears, they may become less settled and find it harder to keep others calm.",
        "Coaching peers who are struggling may come less naturally than doing the work themselves.",
        "Giving clear direction to more experienced colleagues is likely to need practice.",
      ],
      roleFitRisks: [
        {
          risk: "Their pace could lead them to take on too much work themselves rather than share it out.",
          mitigation: "Give them one group task to lead in each rotation, with the mentor reviewing how the work was shared.",
        },
        {
          risk: "A tight group deadline could test their composure in front of peers.",
          mitigation: "Plan an early leadership assignment with a clear deadline and debrief it with the programme manager.",
        },
      ],
    },
  },
  "DEUS-2026-09619": {
    candidateId: "DEUS-2026-09619",
    role: "Project Manager",
    seedVersion: PT_EXAMPLE_SEED_VERSION,
    profileSignature: "fnv1a:307ede58",
    evidenceNote:
      "team-leadership-delegation 88/68, leading-through-change-pressure 86/80 and stakeholder-management 84/77 exceed target; risk-issue-management 72/71 is at target; planning-scheduling 66/71 and delivery-ownership 70/75 are behind. Overall 78, Recommended.",
    insights: {
      executiveSummary:
        "Eko is a confident people leader who builds committed project teams, earns the support of other departments, and stays steady when scope or deadlines change. They are likely to keep a project moving and keep people on side, but their schedules and follow-through at handover may be looser than the role needs. A plan review at each milestone and a firm closure checklist could pair well with their leadership.",
      keyStrengths: [
        "They are likely to build a committed team from people who report elsewhere and delegate real ownership.",
        "Newer team members are likely to be given stretching work with the support to succeed.",
        "Departments with different interests are likely to be brought to an agreement the project can work with.",
        "When priorities shift or pressure peaks, they can be expected to reshape the plan and keep morale steady.",
      ],
      developmentAreas: [
        "Dates may be set before dependencies are checked, so the schedule may need to change more than once.",
        "The plan may fall out of date while their attention is on the people side of the project.",
        "A project may be closed with some items unfinished and no clear owner for them.",
        "Agreed sign-off steps may be shortened when the team is keen to move on.",
      ],
      roleFitRisks: [
        {
          risk: "Sponsors could receive optimistic dates that later slip.",
          mitigation: "Review each new schedule and its dependencies with the programme lead before dates are shared.",
        },
        {
          risk: "Users could be left with unfinished features after go-live.",
          mitigation: "Agree acceptance criteria at kick-off and use a handover checklist signed off by the receiving team.",
        },
      ],
    },
  },
  "DEUS-2026-09620": {
    candidateId: "DEUS-2026-09620",
    role: "Management Trainee",
    seedVersion: PT_EXAMPLE_SEED_VERSION,
    profileSignature: "fnv1a:539d1619",
    evidenceNote:
      "influence-collaboration 88/71 and leadership-potential 86/79 exceed target; learning-agility 80/79 and initiative-ownership 76/78 are at target; analytical-thinking 66/81 and commercial-awareness 64/77 are behind. Overall 77, Recommended.",
    insights: {
      executiveSummary:
        "Fitri connects easily with people across the business and naturally takes the lead in a group, staying calm and supportive when deadlines tighten. They settle into new teams steadily and complete what they are given, but their analysis of data and their grasp of how decisions affect the business are less developed. Structured practice with analysis and regular time with commercial teams could round out a promising people leader.",
      keyStrengths: [
        "They are likely to build friendly working relationships quickly and win colleagues' support for their ideas.",
        "In group tasks, they can be expected to organise the work, give clear direction and keep others positive under pressure.",
        "Peers who are struggling are likely to receive practical help and encouragement from them.",
        "They are likely to settle into each rotation at a reasonable pace and complete assigned work reliably.",
      ],
      developmentAreas: [
        "Analyses may present many figures without a clear conclusion about which factor matters most.",
        "Recommendations may focus on price or convenience without weighing the wider effect on cost and revenue.",
        "Developments among customers and competitors may go unnoticed unless someone points them out.",
        "They may wait to be invited before proposing improvements to how things are done.",
      ],
      roleFitRisks: [
        {
          risk: "Proposals could win support on goodwill while resting on weak analysis.",
          mitigation: "Have the supervisor review their analyses before they are shared, using strong past reports as examples.",
        },
        {
          risk: "Decisions could overlook their commercial effect on the business.",
          mitigation: "Schedule a rotation in sales or finance early and discuss the monthly management report with their mentor.",
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
  "DEUS-2026-09623": {
    candidateId: "DEUS-2026-09623",
    role: "Finance Officer",
    seedVersion: PT_EXAMPLE_SEED_VERSION,
    profileSignature: "fnv1a:cddd04a6",
    evidenceNote:
      "reconciliation-problem-investigation 78/72 exceeds target; analytical-reporting 70/72 is at target; accuracy-attention-to-detail 52/70, compliance-control-discipline 50/76, deadline-close-management 48/70 and business-partnering 62/82 are under target, with close and compliance the clearest gaps. Overall 60, Considered.",
    insights: {
      executiveSummary:
        "Reza's clearest strength is digging into differences until the real cause is found, supported by a sound grasp of what the figures show. They may bring useful curiosity to reconciliations and variance questions, but are likely to need close support with accuracy, approval rules, and fixed deadlines. A structured close checklist, review of their entries during the first months, and guidance on controls could help them build a reliable base for the role.",
      keyStrengths: [
        "They are likely to trace differences to their source rather than carry them forward or force an account to balance.",
        "When a reconciliation will not clear, they can be expected to look at several sources of evidence and take the initiative to fix the cause.",
        "Standard reports are likely to be correct, with the main variances against budget explained.",
        "Their curiosity about why the numbers move may make them useful on one-off investigations.",
      ],
      developmentAreas: [
        "Entries may contain wrong amounts, accounts, or periods when they are not checked before submission.",
        "Approval steps and supporting documents may be missed when a request feels urgent.",
        "Close tasks may start late, especially when the month-end falls in the same week as a tax filing.",
        "Explanations to managers outside finance may be hard to follow and could need more preparation.",
      ],
      roleFitRisks: [
        {
          risk: "Errors and missing approvals could lead to audit findings or a payment made without proper authority.",
          mitigation: "Have a senior colleague review and sign off their entries and payment requests until accuracy is steady.",
        },
        {
          risk: "The month-end close could be held up if their schedules arrive late or need correcting.",
          mitigation: "Agree a personal close checklist with dates and hold a mid-week progress check with the supervisor.",
        },
        {
          risk: "Time spent on interesting investigations could crowd out routine deadline work.",
          mitigation: "Agree priorities each week and schedule investigation time after the close tasks are done.",
        },
      ],
    },
  },
  "DEUS-2026-09624": {
    candidateId: "DEUS-2026-09624",
    role: "Software Engineer",
    seedVersion: PT_EXAMPLE_SEED_VERSION,
    profileSignature: "fnv1a:74f55990",
    evidenceNote:
      "collaborative-delivery 85/81 and adapting-changing-requirements 73/68 exceed target; continuous-learning 69/72 is at target; technical-problem-solving 46/81, code-quality-ownership 54/80 and planning-estimation 50/78 are the clearest gaps. Overall 63, Considered.",
    insights: {
      executiveSummary:
        "Sari is a natural team player who stays positive when priorities shift, with a steady willingness to learn what the work needs. They are likely to help the team communicate and keep moving through changes, but may need substantial support with difficult defects, testing discipline, and realistic estimates. Pairing with a senior engineer, a clear definition of done, and estimating together could help them build the technical base the role needs.",
      keyStrengths: [
        "They are likely to keep teammates connected and explain progress in terms that product managers and testers follow.",
        "Newer teammates are likely to find them approachable and willing to help.",
        "When requirements change mid-sprint, they can be expected to adjust their work calmly and help others see the reason.",
        "New tools and unfamiliar parts of the system are likely to be learned when a task needs them.",
      ],
      developmentAreas: [
        "Difficult defects may be approached by trial and error, with fixes that hide the real cause.",
        "Tests for unusual cases may be skipped when a release is close, so defects could reach users.",
        "Estimates may be optimistic and delays may surface only at the end of the sprint.",
        "Keeping ahead of wider developments in the field may need encouragement.",
      ],
      roleFitRisks: [
        {
          risk: "Untested changes could reach users and take others time to trace.",
          mitigation: "Agree a definition of done that includes tests, and give their changes careful review from a senior engineer.",
        },
        {
          risk: "Complex technical tasks could stall without a clear way forward.",
          mitigation: "Start them on well-described tasks and pair them with a senior engineer on defect investigations.",
        },
        {
          risk: "Commitments made at sprint planning could slip without warning.",
          mitigation: "Break work into smaller pieces with the team lead and compare estimates with actual time each sprint.",
        },
      ],
    },
  },
  "DEUS-2026-09625": {
    candidateId: "DEUS-2026-09625",
    role: "Management Trainee",
    seedVersion: PT_EXAMPLE_SEED_VERSION,
    profileSignature: "fnv1a:5e2987c3",
    evidenceNote:
      "influence-collaboration 76/71 exceeds target; learning-agility 38/79, initiative-ownership 30/78, analytical-thinking 44/81, commercial-awareness 36/77 and leadership-potential 32/79 are well behind. Overall 43, Not Recommended.",
    insights: {
      executiveSummary:
        "Yoga is friendly and cooperative and is likely to get on well with each team they join. Their profile, however, points to substantial gaps in learning quickly, acting without instruction, analysing information, understanding the business, and taking the lead. The programme's pace and rotation demands are likely to be a difficult fit at present, and a more structured entry-level role may suit them better.",
      keyStrengths: [
        "They are likely to build friendly working relationships with colleagues in each new team.",
        "In group work, they can be expected to take on their share and keep others informed.",
        "Colleagues are likely to find them approachable and easy to work with.",
        "Straightforward suggestions they make are likely to be received with goodwill.",
      ],
      developmentAreas: [
        "They may take a long time to become useful in a new function and repeat errors already pointed out.",
        "Tasks may wait for detailed instructions and be left unfinished when no one checks.",
        "Information may be presented without a clear conclusion, or with conclusions the evidence does not support.",
        "They may avoid organising a group and become unsettled as deadlines approach.",
      ],
      roleFitRisks: [
        {
          risk: "Each rotation could end before they are able to contribute on their own.",
          mitigation: "If hired, set a written learning plan with a named buddy and fortnightly feedback in every rotation.",
        },
        {
          risk: "Work could stall without close direction, putting the programme's milestones behind.",
          mitigation: "Give them one small owned task at a time with agreed check-in points and a clear finish line.",
        },
        {
          risk: "Recommendations could overlook cost and customer effects.",
          mitigation: "Pair them with a mentor from the sales or finance team to discuss how daily decisions affect results.",
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

import type { DefaultCompetencyName } from "./competencyFramework";
import type {
  BenchmarkStatus,
  Competency,
  SuitabilityLabel,
  SuitabilityReport,
} from "./types";
import {
  assertDemoInsightCoverage,
  getDemoInsightsForReport,
} from "./demoInsights";

// Seed version picked for a balanced spread of results within and across roles.
export const DEMO_SEED = "pizzahut-qsr-demo-v6";

const REFERENCE_SAMPLE_SIZE = 1000;
const SCORE_MIN = 35;
const SCORE_MAX = 95;
const REPORT_GENERATED_DATE = "2026-10-12";

const ROLE_NAMES = ["Service Crew", "Pizza Cook", "Shift Manager"] as const;
type RoleName = (typeof ROLE_NAMES)[number];

type PracticalInterpretations = Record<BenchmarkStatus, string>;

interface CompetencyDef {
  id: string;
  name: string;
  definition: string;
  sourceCompetencies: DefaultCompetencyName[];
  lowDescriptor: string;
  midDescriptor: string;
  highDescriptor: string;
  practicalInterpretations: PracticalInterpretations;
}

const serviceCrewCompetencyDefs: CompetencyDef[] = [
  {
    id: "guest-welcome-service-ownership",
    name: "Guest Welcome & Service Ownership",
    definition:
      "The tendency to greet guests warmly, notice what they need at the counter or table, and take ownership of each order or request until it is delivered or clearly handed over.",
    sourceCompetencies: ["Quality Client Delivery", "Supporting Others", "Being Accountable"],
    lowDescriptor:
      "May wait for guests to repeat a request or leave open needs for colleagues instead of checking back once the order is served.",
    midDescriptor:
      "Greets guests courteously, responds to routine requests, and checks that familiar dine-in and takeaway needs have been met.",
    highDescriptor:
      "Anticipates guest needs, offers help before being asked, and stays with each request until it is resolved or handed over.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support keeping track of guest requests when the counter and dining area are busy at the same time. For example, a family asking for extra plates or a missing dipping sauce could need to ask twice before the request is completed. A simple table-check routine, visible request notes, and coached check-backs would help the candidate close requests reliably.",
      Meets:
        "{firstName} is likely to welcome guests courteously and follow familiar requests through to completion. During a weekend lunch, the candidate can bring a missing side to the table and confirm that the order is now complete. When several tables and takeaway guests need attention at once, help from the shift manager on priorities may still keep follow-through consistent.",
      Above:
        "{firstName} is likely to notice guest needs early and stay responsible until each request is closed. During a busy family dinner, the candidate can spot a table waiting for drinks, set a clear expectation, and return before the guest needs to ask again. This ownership should support a warm dine-in experience and reduce repeated requests.",
    },
  },
  {
    id: "menu-knowledge-suggestive-selling",
    name: "Menu Knowledge & Suggestive Selling",
    definition:
      "The ability to explain pizzas, sides, and current promotions clearly and suggest relevant add-ons or bundles that fit the guest's group size, budget, and preferences without creating pressure.",
    sourceCompetencies: ["Persuading Others", "Applying Expertise", "Adaptive Communication"],
    lowDescriptor:
      "May give limited explanations of menu items or promotions and offer the same suggestion to every guest without checking what they need.",
    midDescriptor:
      "Explains familiar menu items and current promotions clearly and suggests suitable add-ons after asking about the guest's preferences.",
    highDescriptor:
      "Adapts explanations to each guest, recommends well-matched bundles or add-ons, and keeps suggestions helpful rather than pushy.",
    practicalInterpretations: {
      Below:
        "{firstName} may need coaching when guests ask which bundle suits a family or office group. A quick or generic answer could miss a better-value promotion or leave a crust or topping preference unclear. Practice with the current promotion sheet, two or three preference questions, and role-played recommendations would help the candidate make suggestions that feel relevant and confident.",
      Meets:
        "{firstName} is likely to explain familiar pizzas and current promotions clearly and suggest a suitable add-on when the guest seems open to it. When a family is choosing between two bundles, the candidate can compare portions and price before confirming the order. Newly launched products or less common dietary questions may still need a quick check with the shift manager.",
      Above:
        "{firstName} is likely to read the guest's situation and turn menu knowledge into helpful recommendations. For an office group ordering for a meeting, the candidate can suggest a bundle that fits the headcount, add a suitable side, and confirm crust preferences without rushing the conversation. This should support average check growth while keeping guest trust intact.",
    },
  },
  {
    id: "order-accuracy-payment-handling",
    name: "Order Accuracy & Payment Handling",
    definition:
      "The ability to capture dine-in, takeaway, and delivery-app orders accurately, confirm modifiers and special requests, and handle payments and vouchers according to store procedures.",
    sourceCompetencies: ["Following Directions", "Distilling Information", "Being Accountable"],
    lowDescriptor:
      "May skip read-backs or miss order modifiers and payment steps when the queue is long or several channels are active at once.",
    midDescriptor:
      "Follows the usual order and payment routine, confirms key modifiers, and corrects familiar errors before the order leaves the counter.",
    highDescriptor:
      "Captures orders precisely across channels, consistently reads back key details, and owns any correction through to completion.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support keeping orders accurate when counter, phone, and delivery-app tickets arrive together. A missed crust change or an incorrectly applied voucher could only be noticed when the guest checks the box or the receipt. A consistent read-back habit, a short payment checklist, and shift manager spot checks would help the candidate reduce avoidable corrections.",
      Meets:
        "{firstName} is likely to follow the store's order and payment routine and confirm familiar modifiers before sending the order to the kitchen. If a voucher does not apply as expected, the candidate can check the promotion terms and involve the shift manager when needed. During a heavy rush, extra structure may help maintain the same accuracy across every channel.",
      Above:
        "{firstName} is likely to protect order accuracy from the first entry through payment. During a busy dinner period, the candidate can confirm a half-and-half pizza, apply the correct promotion, and flag a delivery-app note to the kitchen before the order starts. This reliability should reduce remakes and refunds and help keep cash and voucher reconciliation clean.",
    },
  },
  {
    id: "guest-recovery-escalation",
    name: "Guest Recovery & Escalation",
    definition:
      "The ability to listen to guest complaints, clarify what went wrong, offer a fair remedy within store guidelines, and involve the shift manager promptly when a decision falls outside crew authority.",
    sourceCompetencies: ["Lateral Problem Solving", "Taking Initiative", "Adaptive Communication"],
    lowDescriptor:
      "May avoid complaints, pass them on without clarifying the issue, or promise a fix before understanding what the guest needs.",
    midDescriptor:
      "Listens to routine complaints, offers standard remedies within guidelines, and involves the shift manager when a case is unusual.",
    highDescriptor:
      "Stays calm with upset guests, proposes a fair remedy quickly, and escalates early while keeping the guest informed.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support when a guest complains about a late or incorrect order during a busy shift. The candidate could hand the issue over without fully understanding it, leaving the guest to explain it again. A simple listen-clarify-act routine, clear remedy guidelines, and practice escalating to the shift manager would help the candidate respond with more confidence.",
      Meets:
        "{firstName} is likely to handle familiar complaints by clarifying the issue and offering a standard remedy within store guidelines. If a pizza arrives with the wrong topping, the candidate can apologise, arrange a remake, and update the guest on timing. Complaints involving refunds, delivery partners, or upset groups may still need the shift manager to step in.",
      Above:
        "{firstName} is likely to turn a complaint into a recovered visit by staying calm and acting quickly. When a delivery-app order arrives incomplete, the candidate can confirm what is missing, propose a fair remedy, and bring in the shift manager for decisions outside crew authority. This should protect guest loyalty and reduce escalations that reach online reviews.",
    },
  },
  {
    id: "front-kitchen-coordination",
    name: "Front & Kitchen Coordination",
    definition:
      "The ability to keep the counter, dining area, kitchen, and delivery riders aligned through clear handoffs, and to support colleagues at other stations when service needs shift.",
    sourceCompetencies: ["Enabling Teamwork", "Supporting Others", "Adaptive Communication"],
    lowDescriptor:
      "May share incomplete updates with the kitchen or riders and overlook colleagues who need help when stations become busy.",
    midDescriptor:
      "Communicates routine order updates clearly and helps colleagues at nearby stations when asked or when a familiar gap appears.",
    highDescriptor:
      "Keeps every station informed through clear handoffs and steps in to support colleagues before service gaps develop.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support keeping the counter and kitchen aligned when an order changes after it has been sent. During a weekend rush, an unclear update about a cancelled side or a rider waiting for pickup could leave colleagues working from different information. Short, structured call-outs and practice repeating critical details would help the candidate support a steadier service flow.",
      Meets:
        "{firstName} is likely to communicate familiar updates to the kitchen and help colleagues with routine tasks when the counter is quieter. If the make-line reports a delay, the candidate can pass it on to the waiting guest or rider and agree the next handoff. When several stations need help at once, a clear priority from the shift manager may still be useful.",
      Above:
        "{firstName} is likely to keep the front and back of the store connected during busy periods. When a large takeaway order and several delivery pickups land together, the candidate can confirm timings with the make-line, update guests and riders, and help pack orders. This should reduce duplicated work and keep service messages consistent across stations.",
    },
  },
  {
    id: "composure-peak-hours",
    name: "Composure at Peak Hours",
    definition:
      "The capacity to stay calm and organised during lunch, dinner, weekend, and Ramadan iftar peaks, reprioritising tasks as queues, delivery orders, and staffing levels change.",
    sourceCompetencies: ["Resilience Under Pressure", "Operational Flexibility", "Forward Planning"],
    lowDescriptor:
      "May become flustered when the queue builds and need help deciding what to handle first when orders, guests, and riders compete.",
    midDescriptor:
      "Stays steady through normal peaks and adjusts familiar tasks when the shift manager changes priorities.",
    highDescriptor:
      "Anticipates peak demand, reorganises tasks quickly, and keeps guest interactions calm and friendly under sustained pressure.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support deciding what to do first when an iftar peak brings a full dining room, a long counter queue, and a wave of delivery orders. The candidate could lose time switching between tasks without a clear sequence. A simple peak-hour routine, short check-ins with the shift manager, and rehearsed rush scenarios would help build steadier responses.",
      Meets:
        "{firstName} is likely to stay composed through a normal lunch or dinner peak and adjust familiar tasks when priorities change. If delivery orders suddenly increase, the candidate can move from table checks to packing and return when the queue settles. An unusually long peak or a short-staffed shift may still need clear direction from the shift manager.",
      Above:
        "{firstName} is likely to anticipate pressure points and keep service calm when demand rises. Before an iftar peak, the candidate can prepare packaging and condiments, then reorganise tasks as the queue builds while keeping a friendly tone with guests. This adaptability should help the store absorb peak volume without letting speed of service or guest warmth slip.",
    },
  },
];

const pizzaCookCompetencyDefs: CompetencyDef[] = [
  {
    id: "recipe-build-standards",
    name: "Recipe & Build Standards",
    definition:
      "The ability to follow approved dough, sauce, topping, and bake specifications so every pizza matches the brand standard for portion, appearance, and taste across shifts.",
    sourceCompetencies: ["Following Directions", "Applying Expertise", "Optimizing Performance"],
    lowDescriptor:
      "May estimate topping portions or skip build steps when busy, producing pizzas that vary from the recipe card.",
    midDescriptor:
      "Follows recipe cards and portion guides consistently for familiar products and corrects routine build errors when they are pointed out.",
    highDescriptor:
      "Builds every product precisely to specification, notices drift early, and refines technique to keep output consistent at speed.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support keeping pizza builds consistent when the make-line is under pressure. Toppings could be spread unevenly or cheese portions estimated rather than measured, so pizzas vary between orders. Recipe-card prompts at the station, portion-cup practice, and regular build checks by the shift manager would help the candidate develop repeatable habits.",
      Meets:
        "{firstName} is likely to follow recipe cards and portion guides for familiar pizzas and sides. When the shift manager points out uneven cheese coverage, the candidate can adjust technique on the next build. New menu launches or less familiar crusts may still benefit from a short demonstration and a check of the first few products.",
      Above:
        "{firstName} is likely to combine accurate portioning with a good eye for the finished product. During a dinner rush, the candidate can keep topping placement and portions consistent, notice when a dough batch behaves differently, and adjust within the approved method. This should support consistent pizzas for guests and reduce remakes at the cut table.",
    },
  },
  {
    id: "food-safety-hygiene-discipline",
    name: "Food Safety & Hygiene Discipline",
    definition:
      "The tendency to follow food safety, halal handling, and sanitation procedures consistently, including temperature checks, date labelling, and stock rotation, and to report any departure promptly.",
    sourceCompetencies: ["Following Directions", "Being Accountable", "Applying Expertise"],
    lowDescriptor:
      "May skip temperature checks, labelling, or sanitation steps during busy periods and need reminders to complete required logs.",
    midDescriptor:
      "Follows food safety and sanitation procedures during routine production and completes required checks and logs.",
    highDescriptor:
      "Applies food safety procedures consistently under pressure, owns required checks, and flags departures immediately.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support maintaining every food safety step when the kitchen is busy. A missed temperature log, an unlabelled container, or rushed stock rotation could create avoidable risk during an audit. Visible checklists, scheduled verification by the shift manager, and clear coaching on how to report a missed step would help make the routine more reliable.",
      Meets:
        "{firstName} is likely to follow familiar food safety and hygiene procedures and complete routine logs during normal production. If a date label is unclear, the candidate can check with the shift manager and correct it before the product is used. On a compressed or short-staffed shift, a quick verification would help reinforce the same discipline under pressure.",
      Above:
        "{firstName} is likely to apply food safety procedures consistently, even when orders are stacking up on the screen. The candidate can complete temperature checks on time, rotate stock correctly, and raise a concern before the product reaches the make-line. This discipline should support audit readiness and give the team confidence that controls are being followed.",
    },
  },
  {
    id: "make-line-speed-rush-handling",
    name: "Make-Line Speed & Rush Handling",
    definition:
      "The capacity to keep pizzas moving from the order screen through the oven at target speed, staying composed and reprioritising when dine-in, takeaway, and delivery orders peak together.",
    sourceCompetencies: ["Resilience Under Pressure", "Operational Flexibility", "Optimizing Performance"],
    lowDescriptor:
      "May slow down or lose track of order sequence when the screen fills, causing ticket times to grow during peaks.",
    midDescriptor:
      "Keeps pace through normal peaks, follows the order screen sequence, and adjusts when the shift manager reassigns tasks.",
    highDescriptor:
      "Sustains speed and accuracy through heavy peaks, sequences orders smartly, and adapts quickly when demand shifts.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support keeping pace when dinner and delivery orders fill the order screen at the same time. The candidate could build orders out of sequence or pause to decide what comes next, so ticket times grow. A clear screen-reading routine, practice during quieter periods, and a lead positioned nearby at peaks would help build speed and confidence.",
      Meets:
        "{firstName} is likely to keep up with a normal lunch or dinner peak and follow the order screen sequence reliably. When delivery orders increase, the candidate can adjust to the shift manager's direction and keep pizzas moving to the oven. A sustained weekend or iftar rush may still need extra support to protect both speed and build quality.",
      Above:
        "{firstName} is likely to stay composed and quick when the order screen is full. During a weekend dinner peak, the candidate can group similar builds, keep the oven loaded steadily, and adjust the sequence when a large order arrives. This should help protect delivery promise times while keeping build quality consistent.",
    },
  },
  {
    id: "prep-planning-stock-rotation",
    name: "Prep Planning & Stock Rotation",
    definition:
      "The ability to plan dough, sauce, and topping preparation against forecast demand, rotate stock correctly, and adjust prep during the shift to avoid both shortages and waste.",
    sourceCompetencies: ["Forward Planning", "Optimizing Performance", "Being Accountable"],
    lowDescriptor:
      "May prepare reactively, run short of key items during peaks, or over-prepare and create avoidable waste.",
    midDescriptor:
      "Follows the prep chart for routine shifts and adjusts quantities when familiar changes in demand occur.",
    highDescriptor:
      "Anticipates demand from forecasts and promotions, adjusts prep early, and keeps waste low without running short.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support planning prep ahead of a busy period. Dough or toppings could run short during dinner, forcing the make-line to stop, while other items are over-prepared and wasted at close. Working from the prep chart with a lead, checking the forecast before the shift, and reviewing waste at close would help build planning habits.",
      Meets:
        "{firstName} is likely to follow the prep chart and keep familiar items stocked during a routine shift. If a promotion drives higher demand than expected, the candidate can top up prep and let the shift manager know. Larger changes, such as a new product launch or a holiday weekend, may still need the manager to set quantities.",
      Above:
        "{firstName} is likely to think ahead about what the shift will need. Before a weekend promotion, the candidate can check the forecast, adjust dough pulls and topping prep, and rotate stock so older product is used first. This planning should reduce mid-peak shortages and keep waste and food cost under control.",
    },
  },
  {
    id: "product-quality-checks",
    name: "Product Quality Checks",
    definition:
      "The tendency to check every pizza and side at the cut table against brand standards for bake, cut, toppings, and order accuracy, and to remake or flag products that fall short before they reach the guest.",
    sourceCompetencies: ["Quality Client Delivery", "Being Accountable", "Taking Initiative"],
    lowDescriptor:
      "May send out products with visible faults or wrong toppings, relying on others to catch problems later.",
    midDescriptor:
      "Checks routine products against standards before boxing and remakes familiar faults when they are noticed.",
    highDescriptor:
      "Treats the final check as non-negotiable, catches faults early, and takes initiative to fix the cause rather than only the product.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support treating the cut table as a final quality gate. During a rush, a pizza with an uneven bake or a missing topping could be boxed and sent without a second look. A short visual standard at the cut table, a habit of checking against the order slip, and feedback from the shift manager would help strengthen this step.",
      Meets:
        "{firstName} is likely to check familiar products before boxing and remake pizzas with obvious faults. If a pizza comes out under-baked, the candidate can hold it and let the make-line know. When faults repeat, the candidate may still need the shift manager's help to identify and fix the underlying cause.",
      Above:
        "{firstName} is likely to treat every box as the guest's first impression. At the cut table, the candidate can catch a wrong topping or uneven bake, arrange a remake quickly, and let the make-line know what to correct. This ownership should reduce complaints and refunds while helping the kitchen fix recurring faults.",
    },
  },
  {
    id: "kitchen-teamwork-station-support",
    name: "Kitchen Teamwork & Station Support",
    definition:
      "The ability to communicate clearly across prep, make-line, oven, and cut-table stations, share workload during peaks, and help newer crew learn station routines.",
    sourceCompetencies: ["Enabling Teamwork", "Supporting Others", "Adaptive Communication"],
    lowDescriptor:
      "May stay focused on a single station and give unclear updates when colleagues need help or information during service.",
    midDescriptor:
      "Communicates routine updates with nearby stations and helps colleagues when asked or when a familiar gap appears.",
    highDescriptor:
      "Keeps stations aligned with clear call-outs, moves to support colleagues before gaps grow, and helps newer crew learn routines.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support communicating with other stations when the kitchen is busy. A missed call-out about a dough shortage or an oven delay could leave colleagues working on the wrong priority. Agreed kitchen call-outs, pairing with an experienced crew member, and short debriefs after peaks would help the candidate contribute more to team flow.",
      Meets:
        "{firstName} is likely to share routine updates with nearby stations and help a colleague when asked. If the cut table falls behind, the candidate can step across to help box orders once the make-line is clear. When several stations need support at once, the shift manager may still need to direct where help goes first.",
      Above:
        "{firstName} is likely to keep the kitchen working as one team during busy periods. The candidate can call out an upcoming shortage early, move to support the oven or cut table before a backlog forms, and show a newer crew member the station routine. This should keep orders flowing and help new starters become productive sooner.",
    },
  },
];

const shiftManagerCompetencyDefs: CompetencyDef[] = [
  {
    id: "shift-leadership-crew-deployment",
    name: "Shift Leadership & Crew Deployment",
    definition:
      "The ability to plan the shift, deploy crew to the right stations based on forecast and skill, give clear direction, and redeploy people quickly as demand changes.",
    sourceCompetencies: ["Providing Directions", "Forward Planning", "Operational Flexibility"],
    lowDescriptor:
      "May start shifts without a clear deployment plan and react late when stations become overloaded or crew are absent.",
    midDescriptor:
      "Prepares a workable deployment for routine shifts and adjusts positions when familiar changes in demand occur.",
    highDescriptor:
      "Plans deployment from forecasts and crew strengths, gives clear direction, and redeploys early to stay ahead of demand.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support turning the sales forecast into a clear deployment plan before the shift starts. When a crew member calls in sick or delivery orders surge, positions could be changed late, leaving one station overloaded. A pre-shift planning template, a structured huddle, and coaching from the restaurant manager on redeployment would help build steadier shift leadership.",
      Meets:
        "{firstName} is likely to set a workable deployment for routine shifts and brief the crew on priorities. If delivery orders climb during dinner, the candidate can move a crew member from the dining area to packing. Unusual situations, such as a large catering order alongside a staff shortage, may still need support from the restaurant manager.",
      Above:
        "{firstName} is likely to plan each shift around the forecast and the strengths of the crew on duty. Ahead of a weekend iftar peak, the candidate can position the strongest crew on the make-line, brief everyone on the promotion, and redeploy early as orders shift between channels. This should keep speed of service steady and make the shift feel organised for the team.",
    },
  },
  {
    id: "crew-coaching-development",
    name: "Crew Coaching & Development",
    definition:
      "The ability to train new crew, give timely feedback on the floor, and build each crew member's confidence and skill so the store's standards hold on every shift.",
    sourceCompetencies: ["Coaching Others", "Supporting Others", "Adaptive Communication"],
    lowDescriptor:
      "May correct mistakes without explaining the standard and give limited support to new crew learning station routines.",
    midDescriptor:
      "Explains routine standards clearly, gives feedback when problems arise, and supports new crew through familiar tasks.",
    highDescriptor:
      "Coaches in the moment, adapts feedback to each person, and builds crew capability and confidence over time.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support turning everyday corrections into coaching. When a new crew member makes a build or order error, the candidate could fix it personally rather than showing how to prevent it. Short coaching scripts, regular one-to-one check-ins, and feedback from the restaurant manager on coaching conversations would help strengthen this part of the role.",
      Meets:
        "{firstName} is likely to explain routine standards and give practical feedback when a problem appears. If a new crew member struggles with the order screen, the candidate can demonstrate the steps and check back later in the shift. Longer-term development planning and more difficult performance conversations may still benefit from the restaurant manager's guidance.",
      Above:
        "{firstName} is likely to develop crew steadily through feedback given in the moment. During a quieter period, the candidate can coach a new starter on cut-table checks, adapt the explanation to how that person learns, and recognise progress. This should help new crew become productive sooner and support retention in a high-turnover environment.",
    },
  },
  {
    id: "guest-experience-service-recovery",
    name: "Guest Experience & Service Recovery",
    definition:
      "The ability to set and model service standards on the shift, resolve escalated complaints fairly, and use guest feedback and online reviews to prevent repeat problems.",
    sourceCompetencies: ["Quality Client Delivery", "Lateral Problem Solving", "Adaptive Communication"],
    lowDescriptor:
      "May focus on kitchen tasks rather than the guest experience and handle escalated complaints inconsistently.",
    midDescriptor:
      "Models routine service standards, resolves common escalated complaints fairly, and follows up on familiar feedback.",
    highDescriptor:
      "Sets a visible service tone, resolves difficult complaints calmly and fairly, and uses feedback to fix root causes.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support handling escalated complaints when the shift is busy. A guest unhappy about a late delivery could receive an inconsistent remedy, or the cause could go unaddressed once the guest leaves. A clear recovery framework, examples of fair remedies, and a habit of logging complaints for follow-up would help the candidate respond more consistently.",
      Meets:
        "{firstName} is likely to model routine service standards and resolve common escalated complaints within store guidelines. When a guest reports a cold delivery, the candidate can apologise, offer an appropriate remedy, and check the delivery time records. Recurring issues spanning several shifts may still need the restaurant manager to lead the fix.",
      Above:
        "{firstName} is likely to make guest experience visible on every shift. When a large family order goes wrong, the candidate can calm the situation, agree a fair remedy quickly, and then trace the cause back to the make-line or dispatch. Using online review themes in pre-shift briefings should help prevent repeat problems and lift guest satisfaction.",
    },
  },
  {
    id: "operational-standards-compliance",
    name: "Operational Standards & Compliance",
    definition:
      "The tendency to run the shift to brand and regulatory standards, including food safety, halal compliance, cash handling, and opening and closing checklists, and to take ownership of any gaps found.",
    sourceCompetencies: ["Following Directions", "Being Accountable", "Applying Expertise"],
    lowDescriptor:
      "May let checklists, cash procedures, or food safety checks slip when the shift is busy and rely on others to catch gaps.",
    midDescriptor:
      "Completes routine checklists and cash procedures and corrects familiar compliance gaps when they are identified.",
    highDescriptor:
      "Holds standards consistently under pressure, verifies critical checks personally, and closes gaps before they become audit findings.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support holding standards when the shift is under pressure. Opening checklists, temperature logs, or a cash drop could be delayed or completed without verification. A simple shift-control calendar, spot checks by the restaurant manager, and a clear process for recording and closing gaps would help the candidate run a more audit-ready shift.",
      Meets:
        "{firstName} is likely to complete routine checklists and cash procedures and follow the store's food safety routine. If a temperature log is missed, the candidate can follow up with the crew and record the correction. Preparing for a full brand audit or handling an unusual compliance issue may still benefit from the restaurant manager's support.",
      Above:
        "{firstName} is likely to treat standards as part of running the shift rather than an extra task. The candidate can verify critical food safety checks personally, reconcile cash accurately at close, and coach crew when a step is missed. This consistency should keep the store audit-ready and reduce cash variances and compliance risks.",
    },
  },
  {
    id: "shift-performance-cost-control",
    name: "Shift Performance & Cost Control",
    definition:
      "The ability to track sales, speed of service, labour, and waste during the shift, interpret what the numbers show, and act quickly to keep results on target.",
    sourceCompetencies: ["Business Acumen", "Optimizing Performance", "Distilling Information"],
    lowDescriptor:
      "May review shift results only at close and miss chances to adjust labour, prep, or service during the shift.",
    midDescriptor:
      "Monitors routine shift indicators and takes familiar actions, such as adjusting labour or prep, when results drift.",
    highDescriptor:
      "Reads shift data quickly, spots the few numbers that matter, and acts early to protect sales, speed, and cost.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support using shift data while the shift is still running. Speed of service or labour hours could drift during a slow afternoon without being noticed until the end-of-day report. A short mid-shift review routine, two or three key indicators to watch, and coaching on what action each one calls for would help build stronger commercial habits.",
      Meets:
        "{firstName} is likely to monitor familiar indicators such as sales against forecast and speed of service. On a quiet afternoon, the candidate can release a crew member early or reduce prep to protect labour and waste. Interpreting less familiar trends, such as a change in delivery-app mix, may still need the restaurant manager's input.",
      Above:
        "{firstName} is likely to read shift performance in real time and act on it. If delivery times start to climb during dinner, the candidate can identify the bottleneck, redeploy crew, and adjust prep to protect both speed and food cost. This commercial awareness should help the store hit its targets more consistently.",
    },
  },
  {
    id: "composure-decision-making",
    name: "Composure & Decision-Making Under Pressure",
    definition:
      "The capacity to stay calm and decisive when several problems arise at once, such as equipment failure, staff shortages, or a sudden surge in orders, and to choose practical solutions quickly.",
    sourceCompetencies: ["Resilience Under Pressure", "Taking Initiative", "Lateral Problem Solving"],
    lowDescriptor:
      "May become visibly stressed when problems stack up and delay decisions while waiting for direction.",
    midDescriptor:
      "Stays calm through routine disruptions and makes reasonable decisions for familiar problems.",
    highDescriptor:
      "Remains calm and decisive under heavy pressure, weighs options quickly, and finds practical workarounds that keep the store running.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support making decisions when several problems hit the shift at once. If an oven goes down during a dinner peak while two crew members are absent, the candidate could hesitate or wait for the restaurant manager. Practising common disruption scenarios, agreed decision guidelines, and debriefs after difficult shifts would help build confidence.",
      Meets:
        "{firstName} is likely to stay calm through routine disruptions and make sensible decisions on familiar problems. If the delivery-app tablet stops working, the candidate can switch to the backup process and keep orders moving. More complex combinations of problems may still need input from the restaurant manager before the candidate commits to a course of action.",
      Above:
        "{firstName} is likely to stay composed and decisive when the shift becomes difficult. If an oven fails during a busy weekend, the candidate can quickly reroute production, pause affected menu items, update delivery partners, and keep the crew focused. This calm decision-making should reduce disruption for guests and give the crew confidence in the shift.",
    },
  },
];

const competencyDefsByPosition: Record<RoleName, CompetencyDef[]> = {
  "Service Crew": serviceCrewCompetencyDefs,
  "Pizza Cook": pizzaCookCompetencyDefs,
  "Shift Manager": shiftManagerCompetencyDefs,
};

interface CandidateSeed {
  candidateName: string;
  candidateId: string;
  assessmentDate: string;
  clientCompany: string;
  hrContact?: string;
}

const candidateSeeds: CandidateSeed[] = [
  {
    candidateName: "Agus Wibowo",
    candidateId: "DEUS-2026-09611",
    assessmentDate: "2026-09-28",
    clientCompany: "PT Example",
    hrContact: "Mega Puspita, HR Business Partner",
  },
  {
    candidateName: "Rina Marlina",
    candidateId: "DEUS-2026-09612",
    assessmentDate: "2026-09-29",
    clientCompany: "PT Example",
    hrContact: "Mega Puspita, HR Business Partner",
  },
  {
    candidateName: "Dimas Saputra",
    candidateId: "DEUS-2026-09613",
    assessmentDate: "2026-09-30",
    clientCompany: "PT Example",
    hrContact: "Bambang Setiawan, Talent Acquisition Lead",
  },
  {
    candidateName: "Intan Permatasari",
    candidateId: "DEUS-2026-09614",
    assessmentDate: "2026-09-30",
    clientCompany: "PT Example",
    hrContact: "Ratna Sari, Area HR Manager",
  },
  {
    candidateName: "Hendra Gunawan",
    candidateId: "DEUS-2026-09615",
    assessmentDate: "2026-10-01",
    clientCompany: "PT Example",
    hrContact: "Mega Puspita, HR Business Partner",
  },
  {
    candidateName: "Ayu Lestari",
    candidateId: "DEUS-2026-09616",
    assessmentDate: "2026-10-02",
    clientCompany: "PT Example",
    hrContact: "Ratna Sari, Area HR Manager",
  },
  {
    candidateName: "Bayu Ramadhan",
    candidateId: "DEUS-2026-09617",
    assessmentDate: "2026-10-05",
    clientCompany: "PT Example",
    hrContact: "Bambang Setiawan, Talent Acquisition Lead",
  },
  {
    candidateName: "Citra Ayuningtyas",
    candidateId: "DEUS-2026-09618",
    assessmentDate: "2026-10-06",
    clientCompany: "PT Example",
    hrContact: "Mega Puspita, HR Business Partner",
  },
  {
    candidateName: "Eko Prasetyo",
    candidateId: "DEUS-2026-09619",
    assessmentDate: "2026-10-08",
    clientCompany: "PT Example",
    hrContact: "Bambang Setiawan, Talent Acquisition Lead",
  },
  {
    candidateName: "Fitri Rahmawati",
    candidateId: "DEUS-2026-09620",
    assessmentDate: "2026-10-09",
    clientCompany: "PT Example",
    hrContact: "Ratna Sari, Area HR Manager",
  },
];

assertDemoInsightCoverage(
  candidateSeeds.map((candidate) => candidate.candidateId),
  DEMO_SEED
);

const roleSettings: Record<
  RoleName,
  {
    populationCenter: number;
    normGroupDescription: string;
  }
> = {
  "Service Crew": {
    populationCenter: 67,
    normGroupDescription: "Simulated Indonesian quick-service restaurant front-of-house candidates (demo)",
  },
  "Pizza Cook": {
    populationCenter: 69,
    normGroupDescription: "Simulated Indonesian quick-service restaurant kitchen candidates (demo)",
  },
  "Shift Manager": {
    populationCenter: 71,
    normGroupDescription: "Simulated Indonesian restaurant shift-leadership candidates (demo)",
  },
};

function hashSeed(parts: Array<string | number>): number {
  let hash = 2166136261;
  const input = [DEMO_SEED, ...parts].join("|");

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function randomUnit(...parts: Array<string | number>): number {
  let value = (hashSeed(parts) + 0x6d2b79f5) >>> 0;
  value = Math.imul(value ^ (value >>> 15), value | 1);
  value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
  return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
}

function randomInt(min: number, max: number, ...parts: Array<string | number>): number {
  return min + Math.floor(randomUnit(...parts) * (max - min + 1));
}

function centeredVariation(
  magnitude: number,
  ...parts: Array<string | number>
): number {
  const draws = Array.from({ length: 6 }, (_, index) =>
    randomUnit(...parts, index)
  );
  const centeredMean = draws.reduce((sum, value) => sum + value, 0) / draws.length - 0.5;
  return Math.round(centeredMean * magnitude * 2);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function shuffle<T>(items: readonly T[], ...parts: Array<string | number>): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index, ...parts, index);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function buildRoleAssignments(): Record<string, RoleName> {
  const extraRole = ROLE_NAMES[randomInt(0, ROLE_NAMES.length - 1, "extra-role-slot")];
  const roleSlots = ROLE_NAMES.flatMap((role) => [
    role,
    role,
    role,
    extraRole === role ? role : null,
  ]).filter((role): role is RoleName => role !== null);
  const shuffledCandidates = shuffle(candidateSeeds, "candidate-order");
  const shuffledRoleSlots = shuffle(roleSlots, "role-slots");

  return Object.fromEntries(
    shuffledCandidates.map((candidate, index) => [
      candidate.candidateId,
      shuffledRoleSlots[index],
    ])
  );
}

export const demoRoleAssignments = buildRoleAssignments();

interface ReferenceProfile {
  overallScore: number;
  competencyScores: Record<string, number>;
}

interface RoleReferenceData {
  normAverage: number;
  competencyBenchmarks: Record<string, number>;
  overallScores: number[];
  scoresByCompetency: Record<string, number[]>;
}

function roleDefinitions(role: RoleName): CompetencyDef[] {
  return competencyDefsByPosition[role];
}

function buildRoleReferenceData(role: RoleName): RoleReferenceData {
  const definitions = roleDefinitions(role);
  const competencyBenchmarks = Object.fromEntries(
    definitions.map((definition) => [
      definition.id,
      randomInt(68, 82, "competency-benchmark", role, definition.id),
    ])
  );
  const sample: ReferenceProfile[] = Array.from(
    { length: REFERENCE_SAMPLE_SIZE },
    (_, profileIndex) => {
      const profileCenter = clamp(
        roleSettings[role].populationCenter +
          centeredVariation(45, "reference-profile", role, profileIndex),
        30,
        95
      );
      const competencyScores = Object.fromEntries(
        definitions.map((definition) => {
          const roleVariation = centeredVariation(
            8,
            "reference-competency",
            role,
            definition.id
          );
          const profileVariation = centeredVariation(
            24,
            "reference-profile-competency",
            role,
            profileIndex,
            definition.id
          );
          return [
            definition.id,
            clamp(Math.round(profileCenter + roleVariation + profileVariation), 0, 100),
          ];
        })
      );
      const scores = Object.values(competencyScores);

      return {
        competencyScores,
        overallScore: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
      };
    }
  );

  const scoresByCompetency = Object.fromEntries(
    definitions.map((definition) => [
      definition.id,
      sample.map((profile) => profile.competencyScores[definition.id]),
    ])
  );
  const overallScores = sample.map((profile) => profile.overallScore);

  return {
    normAverage: Math.round(
      overallScores.reduce((sum, score) => sum + score, 0) / overallScores.length
    ),
    competencyBenchmarks,
    overallScores,
    scoresByCompetency,
  };
}

const roleReferenceData = ROLE_NAMES.reduce(
  (data, role) => {
    data[role] = buildRoleReferenceData(role);
    return data;
  },
  {} as Record<RoleName, RoleReferenceData>
);

function candidateScoresFor(candidate: CandidateSeed, role: RoleName): Record<string, number> {
  const definitions = roleDefinitions(role);
  const candidateCenter = clamp(
    roleSettings[role].populationCenter +
      centeredVariation(55, "candidate-tendency", candidate.candidateId, role),
    SCORE_MIN,
    SCORE_MAX
  );

  return Object.fromEntries(
    definitions.map((definition) => [
      definition.id,
      clamp(
        Math.round(
          candidateCenter +
            centeredVariation(
              38,
              "candidate-competency",
              candidate.candidateId,
              role,
              definition.id
            )
        ),
        SCORE_MIN,
        SCORE_MAX
      ),
    ])
  );
}

// "Meeting" means within 3 points of the benchmark either way.
function statusFor(score: number, benchmark: number): BenchmarkStatus {
  if (score - benchmark > 3) return "Above";
  if (score - benchmark < -3) return "Below";
  return "Meets";
}

function percentileFor(value: number, referenceScores: number[]): number {
  let below = 0;
  let equal = 0;

  for (const referenceScore of referenceScores) {
    if (referenceScore < value) below += 1;
    if (referenceScore === value) equal += 1;
  }

  return clamp(
    Math.round((100 * (below + 0.5 * equal)) / referenceScores.length),
    1,
    99
  );
}

function renderPracticalInterpretation(template: string, firstName: string): string {
  return template.replace(/\{firstName\}/g, firstName);
}

function buildCompetencies(
  role: RoleName,
  candidateFirstName: string,
  scores: Record<string, number>,
  referenceData: RoleReferenceData
): Competency[] {
  return roleDefinitions(role).map((definition) => {
    const score = scores[definition.id];
    const benchmarkScore = referenceData.competencyBenchmarks[definition.id];
    const status = statusFor(score, benchmarkScore);

    return {
      id: definition.id,
      name: definition.name,
      definition: definition.definition,
      sourceCompetencies: [...definition.sourceCompetencies],
      score,
      percentile: percentileFor(score, referenceData.scoresByCompetency[definition.id]),
      benchmarkScore,
      status,
      behavioralDescriptor: renderPracticalInterpretation(
        definition.practicalInterpretations[status],
        candidateFirstName
      ),
      lowDescriptor: definition.lowDescriptor,
      midDescriptor: definition.midDescriptor,
      highDescriptor: definition.highDescriptor,
    };
  });
}

function labelFor(score: number): SuitabilityLabel {
  if (score >= 85) return "Highly Recommended";
  if (score >= 65) return "Recommended";
  if (score >= 45) return "Considered";
  return "Not Recommended";
}

function buildReport(seed: CandidateSeed): SuitabilityReport {
  const role = demoRoleAssignments[seed.candidateId];
  const referenceData = roleReferenceData[role];
  const scores = candidateScoresFor(seed, role);
  const competencies = buildCompetencies(
    role,
    seed.candidateName.split(" ")[0],
    scores,
    referenceData
  );
  const suitabilityScore = Math.round(
    competencies.reduce((sum, competency) => sum + competency.score, 0) /
      competencies.length
  );

  const report: SuitabilityReport = {
    candidateName: seed.candidateName,
    candidateId: seed.candidateId,
    positionApplied: role,
    assessmentDate: seed.assessmentDate,
    reportGeneratedDate: REPORT_GENERATED_DATE,
    clientCompany: seed.clientCompany,
    hrContact: seed.hrContact,
    suitabilityScore,
    suitabilityLabel: labelFor(suitabilityScore),
    normativePercentile: percentileFor(suitabilityScore, referenceData.overallScores),
    normGroupDescription: roleSettings[role].normGroupDescription,
    // Compatibility field: this is the shared role norm average, not the mean of targets.
    roleBenchmarkScore: referenceData.normAverage,
    competencies,
  };

  report.insights = getDemoInsightsForReport(report, DEMO_SEED);
  return report;
}

export const mockReports: SuitabilityReport[] = candidateSeeds.map(buildReport);

const demoRoleCounts = mockReports.reduce(
  (counts, report) => {
    counts[report.positionApplied] = (counts[report.positionApplied] ?? 0) + 1;
    return counts;
  },
  {} as Record<string, number>
);
if (
  demoRoleCounts["Pizza Cook"] !== 4 ||
  demoRoleCounts["Service Crew"] !== 3 ||
  demoRoleCounts["Shift Manager"] !== 3
) {
  throw new Error("PT Example demo role assignments must remain four Pizza Cooks, three Service Crew, and three Shift Managers.");
}

export const reportRoles: string[] = [...new Set(mockReports.map((report) => report.positionApplied))];

export const mockReport: SuitabilityReport = mockReports[0];

export function getReportByCandidateId(candidateId: string): SuitabilityReport | undefined {
  return mockReports.find((report) => report.candidateId === candidateId);
}

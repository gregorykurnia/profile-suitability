import type { CompetencyDef } from "./types";

export const competencies: CompetencyDef[] = [
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

export const normGroupDescription = "Simulated Indonesian quick-service restaurant front-of-house candidates (demo)";
export const populationCenter = 67;
export const seed = "pizzahut-qsr-demo-v6";

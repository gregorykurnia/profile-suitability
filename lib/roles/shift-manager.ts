import type { CompetencyDef } from "./types";

export const competencies: CompetencyDef[] = [
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

export const normGroupDescription = "Simulated Indonesian restaurant shift-leadership candidates (demo)";
export const populationCenter = 71;
export const seed = "pizzahut-qsr-demo-v6";

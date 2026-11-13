import type { CompetencyDef } from "./types";

export const competencies: CompetencyDef[] = [
  {
    id: "planning-scheduling",
    name: "Planning & Scheduling",
    definition:
      "The ability to turn a project's goal into a realistic plan of tasks, owners, dependencies and dates, and to keep that plan current so the team always knows what comes next.",
    sourceCompetencies: ["Forward Planning", "Distilling Information", "Optimizing Performance"],
    lowDescriptor:
      "May start work without a clear plan, set dates without checking dependencies, or let the schedule drift out of date once the project is under way.",
    midDescriptor:
      "Builds a workable plan for a familiar project, tracks progress against it, and adjusts dates when tasks slip.",
    highDescriptor:
      "Builds plans that anticipate dependencies and busy periods, keeps them current without fuss, and spots early where time can be saved or lost.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support turning a project goal into a realistic plan. When asked to move a department to a new office floor, the candidate could set a moving date before checking when the network cabling and furniture will be ready, so the date has to change twice. A plan template with dependencies, a review of each new schedule with the programme lead, and weekly progress checks would help the candidate plan with more confidence.",
      Meets:
        "{firstName} is likely to build a workable plan for a familiar project and track it week by week. When rolling out a new expense system to two departments, the candidate can list the tasks, assign owners, and move dates when training takes longer than expected. Large projects with many teams and tight dependencies may still need a senior project manager's review.",
      Above:
        "{firstName} is likely to build plans that hold up under real conditions. When setting up a new regional branch office before Lebaran, the candidate can map every dependency from permits to IT, schedule around the holiday slowdown, and show early where the opening date is at risk. Sponsors should find their schedules dependable and easy to follow.",
    },
  },
  {
    id: "stakeholder-management",
    name: "Stakeholder Management",
    definition:
      "The ability to identify everyone with an interest in a project, keep each of them informed in a way that suits them, and win their support for decisions, even when interests conflict.",
    sourceCompetencies: ["Building Connections", "Adaptive Communication", "Persuading Others"],
    lowDescriptor:
      "May overlook people affected by the project, send the same update to everyone, or struggle to win support when a department pushes back.",
    midDescriptor:
      "Keeps the main stakeholders informed with regular updates and handles routine disagreements through the project sponsor.",
    highDescriptor:
      "Builds trust with stakeholders at every level, tailors each message to its audience, and brings conflicting departments to an agreement the project can live with.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support keeping stakeholders informed and on side. When the finance team objects to a change in the purchasing process, the candidate could press ahead without meeting them, or send a long technical update that leaves senior managers unsure what is being asked. A stakeholder map at kick-off, help from the sponsor with difficult conversations, and feedback on written updates would help the candidate build stronger working relationships.",
      Meets:
        "{firstName} is likely to keep the main stakeholders informed and handle routine disagreements. When a new customer portal affects both sales and customer service, the candidate can hold regular check-ins with each team, share a short weekly update, and raise disputes with the sponsor. Senior stakeholders with strongly opposed views may still need the sponsor's direct involvement.",
      Above:
        "{firstName} is likely to win and keep the support of stakeholders across the business. When operations and sales disagree on the launch date for a new delivery service, the candidate can understand what each side needs, propose a phased launch that meets both, and gain the directors' agreement in one meeting. Projects should face fewer late objections and faster decisions.",
    },
  },
  {
    id: "team-leadership-delegation",
    name: "Team Leadership & Delegation",
    definition:
      "The ability to give a project team clear direction, delegate work to the right people with the authority to do it, and help team members grow while the project is delivered.",
    sourceCompetencies: ["Providing Directions", "Enabling Teamwork", "Coaching Others"],
    lowDescriptor:
      "May keep too much work for themselves, give unclear instructions, or leave team members from other departments unsure of their role.",
    midDescriptor:
      "Assigns tasks clearly, holds regular team check-ins, and gives practical guidance when team members get stuck.",
    highDescriptor:
      "Builds a committed team from people who do not report to them, delegates real ownership, and develops team members' skills as the project runs.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support leading and delegating within a project team. When a team drawn from IT, finance and HR forms for a new payroll system, the candidate could take on the hardest tasks personally and give others vague instructions, so work piles up and team members disengage. Coaching on delegation, a clear role chart for each project, and feedback from team members at each milestone would help.",
      Meets:
        "{firstName} is likely to give a project team clear direction and keep it working together. When leading a small team to update the company's document templates, the candidate can assign tasks to the right people, hold short weekly check-ins, and help anyone who is stuck. Larger teams with members on competing priorities may still need support from line managers.",
      Above:
        "{firstName} is likely to build a committed team even from people who report elsewhere. When a project to digitise supplier invoices draws staff from three departments, the candidate can agree clear ownership with each person, give newer members stretching tasks with support, and keep the team motivated through a busy month-end. Team members should grow during the project and want to work with them again.",
    },
  },
  {
    id: "risk-issue-management",
    name: "Risk & Issue Management",
    definition:
      "The ability to spot what could go wrong on a project before it happens, act early to reduce it, and solve issues practically when they do arise.",
    sourceCompetencies: ["Lateral Problem Solving", "Taking Initiative", "Trend Identification"],
    lowDescriptor:
      "May treat the risk log as paperwork, notice problems only once they cause delays, or wait for others to propose a fix.",
    midDescriptor:
      "Keeps a current list of risks and issues, raises them at the right meetings, and resolves routine problems with the team.",
    highDescriptor:
      "Reads the early signs of trouble, acts before risks become issues, and finds practical ways around problems that others see as blockers.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support managing risks and issues before they cause delays. When a vendor misses two small deliveries early in a system rollout, the candidate could note them without asking whether the main delivery is also at risk, and only react once go-live is missed. A regular risk review with the sponsor, simple early-warning measures for each project, and coaching on contingency planning would help.",
      Meets:
        "{firstName} is likely to keep risks and issues visible and deal with routine problems. When a key team member is due to go on leave during testing, the candidate can log the risk, agree cover with their manager, and report the arrangement at the weekly meeting. Unusual or fast-moving issues may still need a senior project manager's input.",
      Above:
        "{firstName} is likely to see trouble coming and act before it lands. When early test results for a new warehouse system show slower scanning than planned, the candidate can recognise the risk to the peak season, arrange extra testing with the vendor, and prepare a fallback before anyone asks. Projects should meet fewer surprises late in delivery.",
    },
  },
  {
    id: "delivery-ownership",
    name: "Delivery Ownership",
    definition:
      "The tendency to take personal responsibility for delivering what was promised, to the agreed standard and process, and to see the project through handover until users are well supported.",
    sourceCompetencies: ["Being Accountable", "Quality Client Delivery", "Following Directions"],
    lowDescriptor:
      "May accept a late or incomplete result as good enough, skip agreed sign-off steps, or step away once the go-live date passes.",
    midDescriptor:
      "Delivers what was agreed through the company's project process and follows up issues raised at handover.",
    highDescriptor:
      "Owns the outcome as well as the plan, holds the work to the agreed standard, and stays with the handover until the users and the receiving team are confident.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support taking full ownership of what the project delivers. When a new meeting-room booking system goes live with some features unfinished, the candidate could close the project without agreeing who will complete them, leaving users to raise complaints with IT. Clear acceptance criteria agreed at kick-off, a formal handover checklist, and a review with the sponsor before closure would help.",
      Meets:
        "{firstName} is likely to deliver what was agreed and follow the company's project process. When finishing a move to a new travel booking supplier, the candidate can complete sign-off with each department, hand open items to the support team, and check in after the first month. Projects with unclear success criteria may still need the sponsor's help to agree what counts as done.",
      Above:
        "{firstName} is likely to own the result, not just the plan. After a new customer onboarding process goes live, the candidate can follow the first weeks of real use, notice that one branch is still using the old forms, and work with its manager until the change has fully landed. Sponsors should be able to trust that a project they close is truly finished.",
    },
  },
  {
    id: "leading-through-change-pressure",
    name: "Leading Through Change & Pressure",
    definition:
      "The ability to lead people through the changes a project brings, stay composed when scope, budget or deadlines come under pressure, and adjust the approach when the business's priorities move.",
    sourceCompetencies: ["Championing Change", "Resilience Under Pressure", "Strategic Agility"],
    lowDescriptor:
      "May present change as an instruction from above, become visibly stressed when deadlines tighten, or hold to the original plan after priorities have moved.",
    midDescriptor:
      "Explains why a change is needed, stays steady under normal deadline pressure, and adapts the plan when the sponsor redirects the project.",
    highDescriptor:
      "Makes the case for change in terms people care about, keeps the team calm when pressure peaks, and reshapes the project quickly when the business's priorities shift.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support leading people through change and pressure. When directors bring a system launch forward by a month, the candidate could pass the pressure straight to the team without deciding what to drop, and present the new process to users as a rule they must accept. Coaching on change communication, support from the sponsor when scope is cut, and planned breaks after intense periods would help.",
      Meets:
        "{firstName} is likely to explain changes clearly and stay steady under normal pressure. When a new approval workflow changes how managers sign off purchases, the candidate can explain the reasons, answer common worries, and keep the rollout on track through a busy month-end. Sudden large changes in direction may still need the sponsor's help to reset the plan.",
      Above:
        "{firstName} is likely to lead people confidently through change and pressure. When the company decides mid-project to open the new service in two cities instead of one, the candidate can reshape the plan, explain to the team what changes and why, and keep morale steady through the extra weeks. Teams should come through difficult projects with energy and trust intact.",
    },
  },
];

export const normGroupDescription = "Simulated Indonesian project manager candidates (demo)";
export const populationCenter = 70;
export const seed = "pt-example-demo-v1";

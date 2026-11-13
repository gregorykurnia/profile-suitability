import type { CompetencyDef } from "./types";

export const competencies: CompetencyDef[] = [
  {
    id: "learning-agility",
    name: "Learning Agility",
    definition:
      "The ability to learn quickly in unfamiliar settings, take lessons from each rotation into the next, and adjust to new teams, tasks and ways of working.",
    sourceCompetencies: ["Active Learning", "Self Development Focused", "Operational Flexibility"],
    lowDescriptor:
      "May take a long time to become useful in a new rotation, repeat the same mistakes, or prefer to stay with tasks they already know.",
    midDescriptor:
      "Settles into a new rotation within a reasonable time, learns the main tasks, and acts on feedback from their supervisor.",
    highDescriptor:
      "Becomes productive quickly in each new function, seeks feedback without being asked, and carries lessons from one rotation into the next.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support learning quickly in each new rotation. When moving from the finance team to a regional sales office, the candidate could spend weeks relying on colleagues for routine tasks and repeat errors already pointed out by the supervisor. A clear learning plan for each rotation, a named buddy in every team, and short fortnightly feedback sessions would help the candidate settle in faster.",
      Meets:
        "{firstName} is likely to settle into each rotation and learn the main tasks within a reasonable time. When joining the procurement team, the candidate can learn the purchase approval steps, ask sensible questions, and act on the supervisor's feedback. Rotations in very technical functions may still need a longer induction.",
      Above:
        "{firstName} is likely to become useful quickly wherever they are placed. In the first weeks of a rotation in the IT project office, the candidate can learn the planning tools, ask for feedback after each task, and apply what they learned in finance to tighten a project budget. Supervisors should find them contributing well before the rotation ends.",
    },
  },
  {
    id: "initiative-ownership",
    name: "Initiative & Ownership",
    definition:
      "The tendency to act without waiting to be told, take responsibility for results, and propose improvements to how things are done, even as a newcomer to the team.",
    sourceCompetencies: ["Taking Initiative", "Being Accountable", "Championing Change"],
    lowDescriptor:
      "May wait for detailed instructions, leave tasks half finished when no one checks, or keep quiet about problems they notice.",
    midDescriptor:
      "Completes assigned work reliably, asks for more when they finish early, and mentions improvement ideas when invited.",
    highDescriptor:
      "Spots useful work no one has asked for, follows it through to a result, and makes a convincing case for better ways of working.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support taking initiative and owning results. When a rotation supervisor asks for a summary of customer feedback, the candidate could deliver the raw comments late without noticing a recurring complaint, and wait to be told what to do next. Clear ownership of one small project per rotation, regular progress check-ins, and encouragement to bring one idea to each team meeting would help.",
      Meets:
        "{firstName} is likely to complete assigned work reliably and ask for more when they have capacity. When given a list of overdue supplier contracts to chase, the candidate can follow each one up, keep the tracker current, and mention that a reminder template would save time. Taking on larger improvements without a clear request may still need encouragement.",
      Above:
        "{firstName} is likely to find useful work and see it through without being asked. During a rotation in customer service, the candidate can notice that many calls ask the same billing question, draft a clearer explanation for the website with the team leader, and track whether call numbers fall. Managers should see them as someone who leaves each team better than they found it.",
    },
  },
  {
    id: "analytical-thinking",
    name: "Analytical Thinking",
    definition:
      "The ability to make sense of data and information, separate what matters from what does not, and reach sound conclusions that others can act on.",
    sourceCompetencies: ["Distilling Information", "Lateral Problem Solving", "Trend Identification"],
    lowDescriptor:
      "May present data without a conclusion, miss the pattern behind the numbers, or reach conclusions the evidence does not support.",
    midDescriptor:
      "Analyses routine data accurately, summarises the main points, and draws reasonable conclusions for familiar questions.",
    highDescriptor:
      "Finds the pattern that matters in complex information, tests their conclusions, and presents clear recommendations that are easy to act on.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support turning information into clear conclusions. When asked why sales fell in one region last quarter, the candidate could produce many charts without saying which factor mattered most, or blame one large customer without checking the other accounts. Practice with structured problem-solving methods, review of their analyses by the supervisor, and examples of strong past reports would help.",
      Meets:
        "{firstName} is likely to analyse routine data accurately and summarise the main points. When comparing travel costs across departments, the candidate can build a clear table, highlight the largest differences, and suggest reasonable next steps. Open-ended questions with incomplete data may still need guidance on where to start.",
      Above:
        "{firstName} is likely to find what matters in complex information and turn it into a clear recommendation. When reviewing why new customers leave in their first three months, the candidate can combine sales, service and billing data, show that most leave after one delayed first invoice, and propose a fix. Managers should find their analyses quick to act on.",
    },
  },
  {
    id: "commercial-awareness",
    name: "Commercial Awareness",
    definition:
      "The understanding of how the business makes money, what its customers and competitors are doing, and how day-to-day decisions affect cost, revenue and the company's longer-term direction.",
    sourceCompetencies: ["Business Acumen", "Strategic Agility", "Trend Identification"],
    lowDescriptor:
      "May see tasks only in terms of their own team, overlook the cost of a decision, or show little interest in customers and competitors.",
    midDescriptor:
      "Understands how their current team contributes to the business and considers cost and customer impact in routine decisions.",
    highDescriptor:
      "Connects daily work to the company's results and direction, follows market changes, and weighs the commercial effect of options before recommending one.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support linking their work to the business's results. When proposing a new supplier for office equipment, the candidate could recommend the lowest price without considering delivery reliability or the cost of switching, or be unaware that a competitor recently changed its prices. Regular discussion of the business's performance with their mentor, reading the monthly management report, and time with the sales team would help.",
      Meets:
        "{firstName} is likely to understand how their team contributes to the business and weigh cost in routine decisions. When planning a training event, the candidate can compare venues on cost and convenience and explain the choice to the budget holder. Strategic questions about markets or competitors may still need a manager's perspective.",
      Above:
        "{firstName} is likely to connect everyday decisions to the company's results and direction. During a rotation in sales, the candidate can notice that a competitor is offering longer payment terms to small business customers, estimate the revenue at risk, and suggest a response for the sales director to consider. Leaders should find them thinking like a business owner early in their career.",
    },
  },
  {
    id: "influence-collaboration",
    name: "Influence & Collaboration",
    definition:
      "The ability to build working relationships quickly across functions, work well in teams, and persuade others to support an idea without relying on formal authority.",
    sourceCompetencies: ["Persuading Others", "Enabling Teamwork", "Building Connections"],
    lowDescriptor:
      "May work mostly alone, find it hard to gain support from more senior colleagues, or leave a rotation with few working relationships.",
    midDescriptor:
      "Works cooperatively with each new team, builds friendly working relationships, and can win support for straightforward suggestions.",
    highDescriptor:
      "Builds a wide network across the business quickly, brings people together around shared goals, and persuades senior colleagues with well-prepared arguments.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support building relationships and winning support for ideas. When suggesting a change to how the marketing team tracks campaign costs, the candidate could send the idea by email without discussing it first, and drop it when a senior colleague raises an objection. Coaching on preparing a case, introductions to key people at the start of each rotation, and joining cross-team meetings would help.",
      Meets:
        "{firstName} is likely to work cooperatively with each team and build friendly working relationships. When joining a group planning the annual sales conference, the candidate can take on their share of the work, keep others informed, and gain agreement for small changes to the agenda. Persuading senior leaders on contested issues may still need a manager's support.",
      Above:
        "{firstName} is likely to build relationships quickly and bring people with them. When proposing a shared customer contact list for sales and customer service, the candidate can talk to people in both teams first, answer their concerns, and win the heads of both departments' support. Teams should welcome them in each rotation and stay in touch afterwards.",
    },
  },
  {
    id: "leadership-potential",
    name: "Leadership Potential",
    definition:
      "The early signs of being able to lead others: giving clear direction, helping colleagues develop, and staying steady and constructive when the pressure is on.",
    sourceCompetencies: ["Providing Directions", "Coaching Others", "Resilience Under Pressure"],
    lowDescriptor:
      "May avoid taking the lead in a group, struggle to explain what others should do, or become unsettled when deadlines tighten.",
    midDescriptor:
      "Takes the lead on small group tasks when asked, helps peers with things they know well, and copes with normal deadline pressure.",
    highDescriptor:
      "Steps forward to organise a group, gives clear direction, helps others improve, and stays calm and positive when pressure rises.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support developing early leadership habits. When a group of trainees is asked to prepare a proposal for the board in two weeks, the candidate could wait for someone else to organise the work and become anxious as the deadline nears. Leading one small group task in each rotation with a mentor's guidance, feedback after each one, and practice in planning under time pressure would help.",
      Meets:
        "{firstName} is likely to take the lead on small group tasks when asked and cope with normal pressure. When the trainee group organises a staff volunteering day, the candidate can coordinate one part, give others clear tasks, and help a peer who is unfamiliar with the booking system. Leading larger groups or more experienced colleagues may still need guidance.",
      Above:
        "{firstName} is likely to show clear signs of leadership early. When the trainee group's project for the directors falls behind with a week to go, the candidate can reorganise the tasks, give each person a clear part, coach a struggling peer, and keep the group calm through the final days. Programme managers should see them as a strong candidate for a team leader role after the programme.",
    },
  },
];

export const normGroupDescription = "Simulated Indonesian graduate management trainee candidates (demo)";
export const populationCenter = 68;
export const seed = "pt-example-demo-v1";

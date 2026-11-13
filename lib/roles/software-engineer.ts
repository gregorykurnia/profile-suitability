import type { CompetencyDef } from "./types";

export const competencies: CompetencyDef[] = [
  {
    id: "technical-problem-solving",
    name: "Technical Problem Solving",
    definition:
      "The ability to break a technical problem into parts, find the real cause of defects, and apply sound engineering knowledge to choose a solution that works now and stays workable later.",
    sourceCompetencies: ["Lateral Problem Solving", "Applying Expertise", "Distilling Information"],
    lowDescriptor:
      "May try fixes by trial and error, treat symptoms rather than causes, or get stuck without a way to narrow the problem down.",
    midDescriptor:
      "Solves routine defects and well-described tasks methodically, and asks for help when a problem crosses unfamiliar parts of the system.",
    highDescriptor:
      "Isolates the cause of difficult problems quickly, weighs several solutions, and picks one that fits the wider design of the system.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support working through technical problems in a structured way. When a report page becomes slow after a release, the candidate could change several things at once without measuring which change helps, or add a workaround that hides the real cause. Pairing with a senior engineer on defect investigations, a simple habit of writing down what has been tried, and regular review of their fixes would help the candidate build a more methodical approach.",
      Meets:
        "{firstName} is likely to solve routine defects and well-described tasks methodically. When a form stops saving one field, the candidate can reproduce the problem, trace it to a recent change, and fix it with a test. Problems that cross several services or only appear under heavy load may still need a senior engineer's guidance.",
      Above:
        "{firstName} is likely to find the real cause of difficult problems quickly. When customers report occasional failed payments that no one can reproduce, the candidate can study the logs, notice that failures cluster around a timeout in one service, and propose a fix that also prevents similar failures elsewhere. The team should spend less time on repeat incidents.",
    },
  },
  {
    id: "code-quality-ownership",
    name: "Code Quality & Ownership",
    definition:
      "The tendency to write clear, tested code that follows the team's standards, take responsibility for how it behaves once released, and care about the experience of the people who use it.",
    sourceCompetencies: ["Being Accountable", "Quality Client Delivery", "Following Directions"],
    lowDescriptor:
      "May skip tests or reviews when rushed, leave unclear code for others to untangle, or treat a released feature as someone else's problem.",
    midDescriptor:
      "Writes tested code that follows the team's standards, responds to review comments, and fixes defects in their own work promptly.",
    highDescriptor:
      "Leaves code clearer than they found it, tests the cases others miss, and follows their features into use to make sure they work for real users.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support keeping code quality high. Close to a release, the candidate could merge a change without tests for the unusual cases, leaving a defect that reaches users and takes others time to trace. A clear definition of done for each task, careful code reviews from a senior engineer, and joining the follow-up when their changes cause issues would help the candidate take fuller ownership.",
      Meets:
        "{firstName} is likely to write tested code that follows the team's standards. When adding a new filter to a customer list, the candidate can cover the main cases with tests, respond to review comments, and fix any defect found after release. Changes to older, untested parts of the system may still need extra review.",
      Above:
        "{firstName} is likely to take full ownership of the code they deliver. After releasing a new checkout step, the candidate can watch the error logs and usage data, notice that some users on older phones drop out, and fix the cause before the issue grows. Their care should raise the team's standards and reduce defects that reach users.",
    },
  },
  {
    id: "continuous-learning",
    name: "Continuous Learning",
    definition:
      "The tendency to keep building technical skills, pick up new tools and languages when the work needs them, and follow developments in the field to judge which are worth adopting.",
    sourceCompetencies: ["Active Learning", "Self Development Focused", "Trend Identification"],
    lowDescriptor:
      "May rely on familiar tools even when they no longer fit, avoid unfamiliar parts of the codebase, or wait to be trained before learning something new.",
    midDescriptor:
      "Learns new tools and parts of the system when a task needs them, and keeps their core skills up to date.",
    highDescriptor:
      "Seeks out new skills ahead of need, learns unfamiliar technology quickly, and shares useful developments with the team after judging them carefully.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support growing their skills beyond what they already know. When the team moves a service to a new framework, the candidate could stay with tasks in the old code and fall behind as the change continues. A personal learning plan agreed with the team lead, protected time for study, and pairing on the first tasks in the new framework would help.",
      Meets:
        "{firstName} is likely to learn new tools and parts of the system when a task needs them. When assigned to a service written in a language they have not used, the candidate can work through the documentation and deliver a small change within a reasonable time. Keeping ahead of wider developments in the field may still need encouragement.",
      Above:
        "{firstName} is likely to keep building their skills and bring useful ideas to the team. When the team struggles with slow automated tests, the candidate can research a newer testing approach, try it on a small part of the code, and present the results with an honest view of the trade-offs. The team should benefit from steady, well-judged improvement in its tools and practices.",
    },
  },
  {
    id: "collaborative-delivery",
    name: "Collaborative Delivery",
    definition:
      "The ability to work closely with other engineers, designers, testers, and product managers, explain technical points in terms each person understands, and help teammates so the whole team delivers.",
    sourceCompetencies: ["Enabling Teamwork", "Adaptive Communication", "Supporting Others"],
    lowDescriptor:
      "May work in isolation, explain issues in technical terms others cannot follow, or give little time to helping teammates.",
    midDescriptor:
      "Shares progress openly, explains their work clearly to the team, and helps colleagues when asked.",
    highDescriptor:
      "Keeps the team connected, makes technical choices understandable to non-engineers, and actively unblocks and supports teammates.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support working more openly with the team. During a sprint, the candidate could spend days on a task without mentioning that they are blocked, or explain a delay to the product manager in terms that leave them unsure what it means for the release. Short daily check-ins, pairing sessions with teammates, and practice explaining technical trade-offs in plain language would help.",
      Meets:
        "{firstName} is likely to share progress openly and help colleagues when asked. When a tester finds a defect in their feature, the candidate can discuss it constructively and agree how to fix it. Taking the lead in bringing designers, testers, and other engineers together on a difficult feature may still develop with experience.",
      Above:
        "{firstName} is likely to strengthen the way the team works together. When a feature depends on work from two other teams, the candidate can set up a short working session, explain the technical options in plain terms to the product manager, and help a newer teammate with their part. This should keep work flowing and make the team more than the sum of its members.",
    },
  },
  {
    id: "adapting-changing-requirements",
    name: "Adapting to Changing Requirements",
    definition:
      "The tendency to respond constructively when priorities, requirements, or technical direction change, adjust plans and code without losing momentum, and help the team move forward with the change.",
    sourceCompetencies: ["Operational Flexibility", "Strategic Agility", "Championing Change"],
    lowDescriptor:
      "May become frustrated when requirements change mid-sprint, resist new approaches, or keep building to the old plan.",
    midDescriptor:
      "Accepts reasonable changes in requirements, adjusts their work, and raises concerns about the impact constructively.",
    highDescriptor:
      "Handles shifting priorities calmly, designs work so it can change easily, and helps colleagues see the reasons behind a new direction.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support adjusting when plans change. When the product manager changes a feature halfway through the sprint after customer feedback, the candidate could keep building the original version or struggle to restart, delaying the release. Involving the candidate early in discussions about why a change is needed, breaking work into smaller pieces, and talking through the impact with the team lead would help.",
      Meets:
        "{firstName} is likely to accept reasonable changes and adjust their work. When a regulation update means a sign-up form needs new fields, the candidate can rework the plan and raise any effect on the deadline. Larger shifts, such as a change in the team's technical direction, may take them longer to embrace.",
      Above:
        "{firstName} is likely to stay productive and positive when requirements change. When a new partner integration suddenly becomes the top priority, the candidate can pause current work cleanly, reshape the design to fit the new need, and help the team understand why the change matters. This should keep the team responsive to the business without losing pace.",
    },
  },
  {
    id: "planning-estimation",
    name: "Planning & Estimation",
    definition:
      "The ability to break work into manageable pieces, give realistic estimates, plan for dependencies and risks, and keep commitments to the team or raise slippage early.",
    sourceCompetencies: ["Forward Planning", "Being Accountable", "Optimizing Performance"],
    lowDescriptor:
      "May underestimate tasks, overlook dependencies, or report a delay only when the deadline has already passed.",
    midDescriptor:
      "Gives reasonable estimates for familiar work, plans the main steps, and tells the team when a task is slipping.",
    highDescriptor:
      "Estimates reliably even for unfamiliar work, anticipates dependencies and risks, and keeps commitments or replans early and openly.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support planning and estimating their work. When asked how long an integration with a partner's system will take, the candidate could give an optimistic figure without allowing for testing or for waiting on the partner, then report the delay only at the end of the sprint. Breaking tasks into smaller pieces with the team lead, comparing estimates with actual time, and agreed check-in points would help.",
      Meets:
        "{firstName} is likely to give reasonable estimates for familiar work and tell the team when a task is slipping. When planning a new report screen, the candidate can list the main steps and allow time for review and testing. Larger or less familiar pieces of work, especially those depending on other teams, may still need a senior engineer's input.",
      Above:
        "{firstName} is likely to plan their work realistically and keep their commitments. When the team prepares for a year-end sales campaign, the candidate can break their part into clear steps, flag early that a dependency on the payments team is at risk, and agree a fallback. Product managers should find their plans dependable.",
    },
  },
];

export const normGroupDescription = "Simulated Indonesian software engineer candidates (demo)";
export const populationCenter = 69;
export const seed = "pt-example-demo-v1";

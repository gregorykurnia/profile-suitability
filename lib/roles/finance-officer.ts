import type { CompetencyDef } from "./types";

export const competencies: CompetencyDef[] = [
  {
    id: "accuracy-attention-to-detail",
    name: "Accuracy & Attention to Detail",
    definition:
      "The tendency to get figures, entries, and supporting documents right the first time, check their own work before it moves on, and keep improving the routines that prevent errors in journals, invoices, and payments.",
    sourceCompetencies: ["Following Directions", "Being Accountable", "Optimizing Performance"],
    lowDescriptor:
      "May post entries with wrong amounts, accounts, or periods, skip self-checks when busy, and rely on reviewers to catch mistakes.",
    midDescriptor:
      "Records routine transactions accurately, checks totals and supporting documents, and corrects errors once they are pointed out.",
    highDescriptor:
      "Produces clean, well-supported work consistently, catches small inconsistencies before review, and tightens routines so the same error does not return.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support producing accurate work without close review. When entering a batch of supplier invoices, the candidate could key a wrong amount or post one to the wrong cost centre, leaving the difference to surface weeks later in a reconciliation. A short self-check list before each batch is submitted, a reviewer who signs off their entries for the first months, and feedback on each error found would help the candidate build reliable habits.",
      Meets:
        "{firstName} is likely to record routine transactions accurately and check their own totals. When posting the month's accruals, the candidate can match each entry to its support and confirm the totals before passing them on. Unusual entries, such as a correction that spans two periods, may still benefit from a quick check with a senior colleague.",
      Above:
        "{firstName} is likely to produce clean, well-supported work consistently. When preparing a payment run, the candidate can notice that one supplier's bank details differ from the master file, hold the payment, and confirm the change before any money leaves the account. This care should reduce rework at month-end and give reviewers confidence in their figures.",
    },
  },
  {
    id: "compliance-control-discipline",
    name: "Compliance & Control Discipline",
    definition:
      "The tendency to follow accounting policies, approval limits, and tax rules every time, keep the evidence that auditors and reviewers need, and apply technical knowledge to recognise when a transaction needs special treatment.",
    sourceCompetencies: ["Following Directions", "Being Accountable", "Applying Expertise"],
    lowDescriptor:
      "May process items without the right approval, file support incompletely, or treat a transaction the familiar way when the policy calls for something different.",
    midDescriptor:
      "Follows approval limits and documented policies for routine work, keeps support on file, and asks when a transaction looks unusual.",
    highDescriptor:
      "Applies policies and controls consistently even under time pressure, spots transactions that need special treatment, and keeps records ready for audit at any time.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support applying controls consistently. Near a deadline, the candidate could process a payment request that is missing a second approval, or file a reimbursement without the original receipt, creating findings in the next internal audit. A clear approval matrix at hand, a simple document checklist for each transaction type, and regular review of their files by a senior colleague would help.",
      Meets:
        "{firstName} is likely to follow approval limits and documented policies for routine work. When processing staff reimbursements, the candidate can check each claim against the policy and attach the right support. Less common transactions, such as a prepayment that spans the year end or an unusual tax treatment, may still need guidance from the finance supervisor.",
      Above:
        "{firstName} is likely to apply policies and controls consistently, even when time is short. When a request arrives to pay a new vendor urgently, the candidate can make sure the vendor is properly set up and approved before payment, and explain the reason calmly to the requester. Audit preparation should be smoother because their records are complete throughout the year.",
    },
  },
  {
    id: "analytical-reporting",
    name: "Analytical Reporting",
    definition:
      "The ability to turn ledger data into clear reports, explain the movements behind the numbers, and spot trends or unusual changes that managers should know about.",
    sourceCompetencies: ["Distilling Information", "Trend Identification", "Applying Expertise"],
    lowDescriptor:
      "May produce reports that list figures without explanation, miss significant changes from last month, or struggle to say what drove a variance.",
    midDescriptor:
      "Prepares standard reports correctly, explains the main variances against budget, and notices clear changes from the previous period.",
    highDescriptor:
      "Builds reports that tell a clear story, explains what drove each important movement, and flags emerging trends before managers ask.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support turning figures into useful explanations. When asked why operating costs rose this month, the candidate could send the ledger detail without saying which items drove the increase or whether it is likely to continue. A standard variance template, examples of good commentary, and review of their first reports with the finance supervisor would help the candidate explain the numbers.",
      Meets:
        "{firstName} is likely to prepare standard reports correctly and explain the main variances against budget. In the monthly cost report, the candidate can show that a rise in utilities came from a new office opening and note it as a lasting change. Slower trends that build over several months may still need a prompt from a senior analyst.",
      Above:
        "{firstName} is likely to turn ledger data into clear, useful insight. While preparing the quarterly report, the candidate can notice that customer payments have been arriving a few days later each month, show the effect on cash, and raise it with the finance manager before it becomes a problem. Managers should find their reports easier to act on.",
    },
  },
  {
    id: "deadline-close-management",
    name: "Deadline & Close Management",
    definition:
      "The ability to plan the month-end close, tax filings, and reporting deadlines in advance, keep work moving when several deadlines meet, and stay accurate under that pressure.",
    sourceCompetencies: ["Forward Planning", "Resilience Under Pressure", "Optimizing Performance"],
    lowDescriptor:
      "May leave close tasks until the last day, miss inputs needed from other teams, or lose accuracy and composure when deadlines pile up.",
    midDescriptor:
      "Completes their part of the close on schedule, follows the close calendar, and asks for help early when a task is at risk.",
    highDescriptor:
      "Plans the close days ahead, chases inputs before they are late, and keeps quality and composure high when several deadlines fall in the same week.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support planning around fixed deadlines. When the month-end close falls in the same week as the monthly tax filing, the candidate could start late on the accrual schedules, wait for missing inputs instead of chasing them, and hand in work that needs correcting. A personal close checklist with dates, a mid-week progress check with the supervisor, and fewer parallel tasks at first would help.",
      Meets:
        "{firstName} is likely to complete their part of the close on schedule. During a normal month-end, the candidate can work through the close calendar, send reminders for late inputs, and deliver reconciliations on time. Unusually heavy periods, such as the year-end audit or the weeks when holiday allowances are paid before Lebaran, may still call for extra support.",
      Above:
        "{firstName} is likely to plan the close days ahead and keep it moving under pressure. Before the year end, the candidate can list what each department must provide, chase the late items early, and still deliver accurate schedules when the auditors' requests start arriving. This should shorten the close and reduce last-minute pressure on the whole team.",
    },
  },
  {
    id: "reconciliation-problem-investigation",
    name: "Reconciliation & Problem Investigation",
    definition:
      "The tendency to reconcile accounts thoroughly, dig into differences until the real cause is found, and take the initiative to fix the source so the same problem does not return.",
    sourceCompetencies: ["Lateral Problem Solving", "Distilling Information", "Taking Initiative"],
    lowDescriptor:
      "May carry unexplained differences forward, accept a plug figure to make an account balance, or stop investigating once the first possible cause is found.",
    midDescriptor:
      "Reconciles routine accounts on time, explains common differences, and escalates the ones they cannot resolve.",
    highDescriptor:
      "Clears differences to their root cause, uses several sources of evidence to find what went wrong, and fixes the process behind recurring breaks.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support resolving differences rather than carrying them forward. When the bank reconciliation is out by a small amount, the candidate could record it as a sundry difference instead of tracing the payment that caused it. A clear rule that every difference has an owner and a reason, a guide to the most common causes, and working through difficult reconciliations with a senior colleague would help.",
      Meets:
        "{firstName} is likely to reconcile routine accounts on time and explain the common differences. When the supplier statement does not match the ledger, the candidate can find the invoices in transit and the payment that crossed at month-end. Differences that come from a system error or span several months may still need escalation.",
      Above:
        "{firstName} is likely to dig into differences until the real cause is clear. When an intercompany account has been out of balance for several months, the candidate can trace each break to its source, find that one entity posts in a different period, and agree a fix with both teams. This should keep the balance sheet clean and stop the same problems returning.",
    },
  },
  {
    id: "business-partnering",
    name: "Business Partnering",
    definition:
      "The ability to explain financial information in plain language to people outside finance, understand what drives each department's costs and income, and build working relationships that help the business make better decisions.",
    sourceCompetencies: ["Adaptive Communication", "Business Acumen", "Building Connections"],
    lowDescriptor:
      "May explain figures in accounting terms that others do not follow, respond only to formal requests, or see the numbers without the business activity behind them.",
    midDescriptor:
      "Answers questions from other departments clearly, understands the main cost drivers of the areas they support, and keeps a helpful working relationship.",
    highDescriptor:
      "Becomes a trusted contact for budget holders, links the numbers to what is happening in the business, and offers practical suggestions that improve results.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support working with colleagues outside finance. When a department head asks why their budget report shows an overspend, the candidate could reply with account codes and journal references rather than a plain explanation of what was spent and why. Meeting budget holders together with the supervisor, plain-language report templates, and learning how each department runs would help the candidate become a more useful partner.",
      Meets:
        "{firstName} is likely to answer questions from other departments clearly and helpfully. When the sales team asks how a new commission plan will affect their cost report, the candidate can walk through the numbers in plain terms. Advising managers on business decisions, such as whether a cost saving is worth pursuing, may still need support from a senior colleague.",
      Above:
        "{firstName} is likely to become a trusted finance contact for the departments they support. In a budget review with the operations manager, the candidate can explain which costs are rising and why, suggest where spending could be timed better, and follow up with a simple summary. This should help managers make better-informed decisions and raise the standing of the finance team.",
    },
  },
];

export const normGroupDescription = "Simulated Indonesian finance officer candidates (demo)";
export const populationCenter = 71;
export const seed = "pt-example-demo-v1";

import type { CompetencyDef } from "./types";

export const competencies: CompetencyDef[] = [
  {
    id: "cash-handling-transaction-accuracy",
    name: "Cash Handling & Transaction Accuracy",
    definition:
      "The tendency to count, record, and post every deposit, withdrawal, and transfer exactly as instructed, and to keep the cash drawer balanced from opening through the end-of-day close.",
    sourceCompetencies: ["Following Directions", "Being Accountable", "Quality Client Delivery"],
    lowDescriptor:
      "May skip a recount or a check of the account number when the queue is long, leaving small differences to be found at the end-of-day close.",
    midDescriptor:
      "Counts and posts routine transactions accurately, follows the cash limit, and balances the drawer on familiar days.",
    highDescriptor:
      "Keeps every transaction and the drawer exact even at high volume, and finds and corrects a difference before the customer leaves the counter.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support keeping transactions exact when the queue builds. For example, a large cash deposit could be counted only once, or a transfer posted without reading the account number back to the customer, leaving a difference at the end-of-day close. A fixed count-and-confirm routine, a second count for large amounts, and close review by the head teller would help the candidate balance reliably.",
      Meets:
        "{firstName} is likely to handle routine deposits, withdrawals, and transfers accurately and balance the drawer on a normal day. The candidate can count a cash deposit in front of the customer, confirm the amount and account, and file the slip correctly. On payday or month-end, when volumes and large amounts increase, a mid-day cash check with the head teller may still help keep the close clean.",
      Above:
        "{firstName} is likely to keep every transaction and the drawer exact, even on the busiest days. When a customer's deposit slip does not match the cash counted, the candidate can recount openly, explain the difference calmly, and correct the slip before posting. This discipline should mean clean end-of-day closes and fewer corrections for the back office.",
    },
  },
  {
    id: "customer-service-at-the-counter",
    name: "Customer Service at the Counter",
    definition:
      "The tendency to greet each customer warmly, explain each step of the transaction in plain language, and make sure the customer leaves with what they came for or a clear next step.",
    sourceCompetencies: ["Quality Client Delivery", "Supporting Others", "Adaptive Communication"],
    lowDescriptor:
      "May process transactions correctly but with little explanation, so customers leave unsure what was done or what to do next.",
    midDescriptor:
      "Greets customers courteously, explains familiar transactions clearly, and checks that routine needs are met before closing.",
    highDescriptor:
      "Adapts to each customer, from elderly savers to business depositors, explains clearly, and makes every visit feel personal and complete.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support turning accurate transactions into a good customer experience. An elderly customer withdrawing a pension could leave unsure whether the passbook was updated, or a first-time customer may not be told how long a transfer takes. A short greeting-and-close routine, plain-language scripts for common questions, and coached observation at the counter would help the candidate serve with more warmth and clarity.",
      Meets:
        "{firstName} is likely to greet customers courteously and explain familiar transactions clearly. When a customer pays a utility bill, the candidate can confirm the details, hand over the receipt, and mention when the payment will be recorded. Customers who need more patience or a different explanation, such as first-time account holders, may still benefit from the candidate taking a little more time.",
      Above:
        "{firstName} is likely to make each visit feel personal and complete. When an elderly customer is confused by a new passbook format, the candidate can walk through it patiently and check the customer is comfortable before calling the next number. This care should build trust in the branch and encourage customers to return.",
    },
  },
  {
    id: "compliance-fraud-vigilance",
    name: "Compliance & Fraud Vigilance",
    definition:
      "The tendency to apply identity, signature, and authorisation checks every time, recognise counterfeit notes and unusual transactions, and report concerns through the proper channel.",
    sourceCompetencies: ["Following Directions", "Applying Expertise", "Distilling Information"],
    lowDescriptor:
      "May relax identity or signature checks for familiar customers or when busy, and may not notice when a transaction pattern looks unusual.",
    midDescriptor:
      "Applies identity, signature, and authorisation checks on routine transactions and refers clear warning signs to the head teller.",
    highDescriptor:
      "Applies every check consistently, spots subtle warning signs such as split cash deposits, and reports them promptly and discreetly.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support applying controls consistently when the counter is busy. A regular customer's withdrawal could be paid without comparing the signature to the specimen, or several cash deposits just under the reporting threshold might not be recognised as unusual. Refresher training on anti-money-laundering rules, a checklist for transactions needing approval, and spot checks by the head teller would help build steadier vigilance.",
      Meets:
        "{firstName} is likely to apply the standard identity and signature checks and follow approval limits on routine transactions. When a note feels or looks wrong, the candidate can check it under the detector and follow the counterfeit procedure. Less obvious patterns, such as a customer spreading deposits across several days, may still need guidance from the head teller or compliance officer.",
      Above:
        "{firstName} is likely to apply every control consistently and notice warning signs early. If a customer repeatedly deposits cash just under the reporting limit, the candidate can complete the transaction normally, record the details, and report it discreetly to the head teller. This vigilance should help protect the branch and keep audits clean.",
    },
  },
  {
    id: "product-awareness-referral",
    name: "Product Awareness & Referral",
    definition:
      "The ability to notice when a customer could benefit from a savings, time-deposit, or digital banking product, mention it briefly at the counter, and refer interested customers to customer service or a relationship manager.",
    sourceCompetencies: ["Persuading Others", "Applying Expertise", "Building Connections"],
    lowDescriptor:
      "May complete transactions without noticing needs, or mention products in the same way to every customer.",
    midDescriptor:
      "Mentions current products and promotions when a need is clear and refers interested customers to customer service.",
    highDescriptor:
      "Picks up on cues in each transaction, suggests one well-matched product in a sentence or two, and makes warm, well-timed referrals.",
    practicalInterpretations: {
      Below:
        "{firstName} may need coaching to notice when a transaction points to a product need. A customer who regularly keeps a large savings balance or queues every week to pay bills may never hear about time deposits or mobile banking. A short list of common cues, one-line suggestions to practise, and a simple referral slip to customer service would help the candidate support the branch's targets without slowing the queue.",
      Meets:
        "{firstName} is likely to mention current products when a need is clear and refer interested customers to customer service. When a customer asks how to avoid the queue for transfers, the candidate can suggest mobile banking and point them to the right desk. Spotting less obvious needs, such as a business customer who might benefit from a current account, may still develop with experience.",
      Above:
        "{firstName} is likely to connect what they see at the counter with products that genuinely help the customer. When a customer deposits a large bonus, the candidate can briefly mention the current time-deposit rate and arrange a warm introduction to the relationship manager. This should produce quality referrals without making customers feel sold to.",
    },
  },
  {
    id: "complaint-handling-service-recovery",
    name: "Complaint Handling & Service Recovery",
    definition:
      "The ability to stay calm and respectful with an upset customer, understand the problem, resolve what is within the teller's authority, and escalate the rest with a clear handover.",
    sourceCompetencies: ["Resilience Under Pressure", "Adaptive Communication", "Lateral Problem Solving"],
    lowDescriptor:
      "May become defensive, repeat policy without explaining it, or pass the customer on without a clear handover.",
    midDescriptor:
      "Listens to routine complaints, explains policies politely, and escalates issues outside their authority to the right person.",
    highDescriptor:
      "Calms upset customers, explains clearly, finds a practical fix within the rules, and follows up so the customer knows what happens next.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support handling an upset customer without the situation escalating at the counter. When a customer disputes a fee or a transfer that has not arrived, the candidate could repeat the policy or call the supervisor before understanding the problem. Simple listening and explanation steps, role-played complaints, and coaching from the head teller would help build confidence.",
      Meets:
        "{firstName} is likely to listen calmly to routine complaints and explain policies politely. When a customer is unhappy about an administration fee, the candidate can explain what it covers and how to avoid it in future. Complex or emotional complaints, such as a disputed ATM withdrawal, may still be best handed to customer service with a clear summary.",
      Above:
        "{firstName} is likely to calm upset customers and turn complaints into a resolution. When a customer arrives angry about a failed transfer, the candidate can listen fully, check the transaction status, explain the next steps clearly, and arrange a follow-up with customer service. This should protect the customer relationship and reduce repeat complaints.",
    },
  },
  {
    id: "composure-peak-queues",
    name: "Composure & Pace in Peak Queues",
    definition:
      "The tendency to stay calm, focused, and accurate when queues are long, such as on paydays, at month-end, or before public holidays, while keeping a steady pace.",
    sourceCompetencies: ["Resilience Under Pressure", "Operational Flexibility", "Forward Planning"],
    lowDescriptor:
      "May become rushed or flustered when the queue grows, which can slow service or lead to errors.",
    midDescriptor:
      "Keeps a steady pace through routine busy periods and asks for support when the queue becomes unusually long.",
    highDescriptor:
      "Prepares before known peaks, stays composed and accurate in long queues, and helps keep the waiting area calm.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support staying composed when the banking hall fills up on payday or before a long holiday. The candidate could speed up in a way that leads to errors, or slow down when customers in the queue grow impatient. Preparing the drawer and forms before the doors open, practising a steady transaction rhythm, and having the head teller open an extra counter early would help.",
      Meets:
        "{firstName} is likely to keep a steady pace through routine busy periods. On a normal month-end, the candidate can work through the queue accurately and stay polite with waiting customers. Exceptional peaks, such as the days before Lebaran when cash withdrawals surge, may still test the candidate's pace, and an early call for support would help.",
      Above:
        "{firstName} is likely to stay calm, accurate, and courteous even in the longest queues. Before a payday, the candidate can prepare cash, forms, and receipts in advance and keep a steady rhythm while acknowledging waiting customers. This should keep waiting times under control and set a calm tone for the banking hall.",
    },
  },
];

export const normGroupDescription = "Simulated Indonesian retail bank teller candidates (demo)";
export const populationCenter = 70;
export const seed = "pizzahut-qsr-demo-v6";

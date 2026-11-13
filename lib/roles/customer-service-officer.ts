import type { CompetencyDef } from "./types";

export const competencies: CompetencyDef[] = [
  {
    id: "customer-care-ownership",
    name: "Customer Care & Ownership",
    definition:
      "The tendency to treat each customer's problem as their own, see it through to a real answer, and keep the customer informed until the case is closed, whether the contact starts at the counter, on the phone, or in chat.",
    sourceCompetencies: ["Quality Client Delivery", "Supporting Others", "Being Accountable"],
    lowDescriptor:
      "May answer the question asked and move on, leaving the customer to chase progress or explain the problem again to someone else.",
    midDescriptor:
      "Follows routine cases through to a clear outcome, keeps promised call-backs, and checks that the customer's need was met.",
    highDescriptor:
      "Owns every case from first contact to resolution, updates customers before they have to ask, and makes sure nothing is left open at handover.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support carrying a case through to the end. A customer who calls about a missing refund could be told it is being processed, with no case opened and no call-back arranged, and then have to call again a week later. A simple open-case list reviewed at the start and end of each shift, a rule that every promise gets a date, and regular case reviews with the team leader would help the candidate build stronger ownership.",
      Meets:
        "{firstName} is likely to follow routine cases through to a clear outcome. When a customer asks why an invoice has not been corrected, the candidate can log the request, chase the billing team, and call the customer back as promised. Longer cases that pass through several departments may still need a reminder from the team leader so the customer is updated along the way.",
      Above:
        "{firstName} is likely to take full ownership of each customer's problem. When a business customer's order is delayed for the second time, the candidate can find out why, agree a realistic date with the delivery team, and update the customer before they have to ask. This care should reduce repeat contacts and build lasting trust in PT Example's service.",
    },
  },
  {
    id: "clear-empathetic-communication",
    name: "Clear & Empathetic Communication",
    definition:
      "The ability to listen fully, explain things in plain language that suits each customer, and show genuine understanding, adjusting tone and wording across face-to-face, phone, and written chat.",
    sourceCompetencies: ["Adaptive Communication", "Supporting Others", "Building Connections"],
    lowDescriptor:
      "May rely on scripted answers or technical terms, interrupt before the customer has finished, or write chat replies that sound abrupt.",
    midDescriptor:
      "Listens to routine requests, explains familiar processes clearly, and keeps a polite, friendly tone in each channel.",
    highDescriptor:
      "Reads each customer quickly, explains clearly at the right level, and leaves customers feeling understood even when the answer is not what they hoped for.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support making explanations clear and warm. An elderly customer asking on the phone how to reset an online account could be given the steps too quickly, or a chat reply to a worried customer may read as cold and copied from a template. Plain-language versions of common answers, listening to recorded calls with the team leader, and practice rewriting chat replies would help the candidate connect better with customers.",
      Meets:
        "{firstName} is likely to explain familiar processes clearly and keep a polite, friendly tone. When a customer asks how to change a delivery address, the candidate can walk through the steps and confirm the customer is comfortable before ending the call. Customers who are anxious, confused, or writing in a hurry may still need the candidate to slow down and adjust the explanation a little more.",
      Above:
        "{firstName} is likely to make customers feel heard and clearly informed in every channel. When a customer writes in chat that a payment was taken twice, the candidate can acknowledge the worry, explain in two or three plain sentences what will happen next, and confirm when the money will be returned. This should calm difficult contacts early and lift customer satisfaction scores.",
    },
  },
  {
    id: "accurate-case-handling",
    name: "Accurate Case Handling",
    definition:
      "The tendency to verify the customer, record each contact completely and correctly in the case system, follow the agreed procedure for each request type, and route cases to the right team the first time.",
    sourceCompetencies: ["Following Directions", "Distilling Information", "Being Accountable"],
    lowDescriptor:
      "May skip identity checks or case notes when busy, choose the wrong case category, or send cases to the wrong team.",
    midDescriptor:
      "Verifies customers, records routine cases accurately, and follows the procedure for familiar request types.",
    highDescriptor:
      "Keeps every case record complete and precise, picks out the key facts from long conversations, and routes cases correctly even when the request type is unusual.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support keeping case records complete and correct. During a busy afternoon, a request to cancel a service could be logged without the customer's verification or the reason for cancelling, so the next officer has to call the customer again. A short checklist for each common request type, regular case-note audits, and feedback from the quality team would help the candidate record cases reliably.",
      Meets:
        "{firstName} is likely to verify customers and record routine cases accurately. When a customer asks to update the billing address, the candidate can confirm identity, make the change, and write a clear note of what was done. Unusual requests that do not fit a standard category may still need a quick check with the team leader so they reach the right team.",
      Above:
        "{firstName} is likely to keep every case record precise and complete. After a long chat in which a customer describes several problems at once, the candidate can separate them into clear cases, note the key facts for each, and send each one to the right team. This accuracy should mean fewer repeat contacts and faster work for the teams that pick the cases up.",
    },
  },
  {
    id: "complaint-resolution-escalation",
    name: "Complaint Resolution & Escalation",
    definition:
      "The ability to understand what lies behind a complaint, find a practical fix within the officer's authority, and escalate what cannot be solved at the front line with a clear summary and a promised next step.",
    sourceCompetencies: ["Lateral Problem Solving", "Taking Initiative", "Adaptive Communication"],
    lowDescriptor:
      "May repeat policy, offer the same remedy to every complaint, or pass the customer on without explaining the problem to the next person.",
    midDescriptor:
      "Resolves routine complaints with standard remedies and escalates complex ones to the right person with the basic facts.",
    highDescriptor:
      "Finds the real cause of a complaint, offers a fair fix within the rules, and escalates the rest with a complete summary so the customer never has to start again.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support turning a complaint into a resolution. When a customer complains that a technician missed an appointment, the candidate could apologise and rebook without asking whether the same thing has happened before, or transfer the call to a supervisor without explaining the problem. A simple listen, clarify, resolve, or escalate routine, role-played difficult calls, and coaching from the team leader would help build confidence.",
      Meets:
        "{firstName} is likely to resolve routine complaints with the standard remedies. When a customer is unhappy about a late delivery, the candidate can apologise, check the new date, and apply the agreed compensation. Complaints that need judgement outside the usual options, or involve several departments, may still be best escalated with a short written summary.",
      Above:
        "{firstName} is likely to get to the heart of a complaint and resolve it fairly. When a business customer complains about repeated billing errors, the candidate can trace the common cause, correct the account, agree a fair credit within their authority, and flag the pattern to the billing team. This should protect customer relationships and help fix problems at the source.",
    },
  },
  {
    id: "product-process-knowledge",
    name: "Product & Process Knowledge",
    definition:
      "The ability to learn PT Example's products, prices, policies, and internal procedures quickly, keep up with changes, and use that knowledge to give customers correct answers the first time.",
    sourceCompetencies: ["Applying Expertise", "Active Learning", "Distilling Information"],
    lowDescriptor:
      "May give outdated or incomplete answers, rely heavily on colleagues, or miss announced changes to prices and policies.",
    midDescriptor:
      "Answers common questions correctly, uses the knowledge base for less familiar ones, and keeps up with announced changes.",
    highDescriptor:
      "Knows products and procedures in depth, learns changes quickly, and explains even complicated policies correctly and simply.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support building and refreshing product knowledge. After a price change or a new returns policy, the candidate could keep giving customers the old information, or put callers on hold often to ask colleagues. A short weekly update with a few questions to check understanding, a well-organised knowledge base, and a buddy for the first months would help the candidate answer correctly the first time.",
      Meets:
        "{firstName} is likely to answer common questions correctly and use the knowledge base for less familiar ones. When a customer asks which service package suits a small office, the candidate can compare the main options and explain the difference in price. Questions about older products or unusual contract terms may still need a check with a senior officer.",
      Above:
        "{firstName} is likely to know products and procedures in depth and keep up with every change. On the day a new promotion launches, the candidate can explain the terms clearly, point out who is eligible, and spot when a customer would be better served by a different option. Colleagues may also come to rely on the candidate as a source of correct answers.",
    },
  },
  {
    id: "composure-under-customer-pressure",
    name: "Composure Under Customer Pressure",
    definition:
      "The tendency to stay calm, polite, and accurate with angry or demanding customers and through high-volume periods, such as month-end billing, service disruptions, or the weeks before Lebaran, while handling several contacts at once.",
    sourceCompetencies: ["Resilience Under Pressure", "Operational Flexibility", "Forward Planning"],
    lowDescriptor:
      "May become flustered or defensive with an angry customer, or lose accuracy and pace when the queue and open chats build up.",
    midDescriptor:
      "Stays polite and steady through routine busy periods and difficult contacts, and asks for support when volumes become unusual.",
    highDescriptor:
      "Stays calm and courteous in the hardest contacts, keeps a steady pace through peaks, and recovers quickly so the next customer gets full attention.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support staying composed when customer pressure rises. During a service disruption, with the phone queue growing and several chats open at once, the candidate could rush answers, mix up cases, or take an angry customer's words personally. A clear plan for peak days, fewer parallel chats at first, short breaks after very difficult calls, and coaching from the team leader would help.",
      Meets:
        "{firstName} is likely to stay polite and steady through routine busy periods. At month-end, when billing questions increase, the candidate can work through the queue accurately and keep a calm tone. Exceptional peaks, such as a major disruption or the week before Lebaran, may still test the candidate, and an early call for support would help.",
      Above:
        "{firstName} is likely to stay calm, courteous, and accurate even in the most demanding contacts. When a customer shouts on the phone after a long disruption, the candidate can let them finish, acknowledge the frustration, and move steadily to a solution, then turn to the next contact with full attention. This should keep service steady and set a calm tone for the team on difficult days.",
    },
  },
];

export const normGroupDescription = "Simulated Indonesian customer service officer candidates (demo)";
export const populationCenter = 70;
export const seed = "pt-example-demo-v1";

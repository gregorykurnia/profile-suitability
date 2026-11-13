import type { CompetencyDef } from "./types";

export const competencies: CompetencyDef[] = [
  {
    id: "prospecting-pipeline-building",
    name: "Prospecting & Pipeline Building",
    definition:
      "The tendency to find and approach new business customers steadily, open doors through referrals and networks, and keep a pipeline full enough to meet next quarter's target as well as this one.",
    sourceCompetencies: ["Taking Initiative", "Building Connections", "Forward Planning"],
    lowDescriptor:
      "May wait for leads to arrive, prospect only when the pipeline is already empty, or keep working the same few familiar contacts.",
    midDescriptor:
      "Prospects regularly, follows up assigned leads, and keeps enough opportunities in the pipeline for the current target.",
    highDescriptor:
      "Builds new opportunities every week, uses networks and referrals to reach decision-makers, and plans the pipeline several months ahead.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support building new business steadily. The candidate could spend most of the month serving existing accounts and only start calling new prospects when the quarter is nearly over, leaving too little time to close. A weekly prospecting block in the diary, a target number of first meetings, and a pipeline review with the sales manager would help the candidate keep enough opportunities coming.",
      Meets:
        "{firstName} is likely to prospect regularly and follow up assigned leads. After an industry exhibition, the candidate can contact the visitors who showed interest, arrange first meetings with the most promising ones, and record them in the CRM. Planning further ahead, so that next quarter's pipeline is ready before this quarter ends, may still need encouragement.",
      Above:
        "{firstName} is likely to keep a full, well-planned pipeline. When an existing client mentions a partner company that is expanding, the candidate can ask for a warm introduction, reach the right decision-maker, and have a first meeting booked within the week. This steady flow of new opportunities should make targets more predictable from quarter to quarter.",
    },
  },
  {
    id: "consultative-selling-negotiation",
    name: "Consultative Selling & Negotiation",
    definition:
      "The ability to understand a business customer's needs and buying process, shape a proposal around the value it brings, and negotiate price and terms that work for the customer and protect PT Example's margin.",
    sourceCompetencies: ["Persuading Others", "Adaptive Communication", "Business Acumen"],
    lowDescriptor:
      "May present the same product pitch to every customer, move to discounts quickly, or agree terms that hurt the margin.",
    midDescriptor:
      "Asks about the customer's needs, presents relevant options, and negotiates routine deals within the agreed price limits.",
    highDescriptor:
      "Uncovers the customer's real business problem, builds a proposal around its value, and negotiates firmly and fairly with procurement and senior buyers.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support selling on value rather than price. When a purchasing manager says a competitor is cheaper, the candidate could offer a discount straight away instead of asking what the customer needs and showing what the higher price includes. Structured discovery questions, practice negotiations with the sales manager, and clear discount approval limits would help the candidate protect the margin.",
      Meets:
        "{firstName} is likely to ask about the customer's needs and present relevant options. For a routine order from a mid-sized company, the candidate can prepare a clear quotation, explain the main benefits, and agree terms within the approved price range. Larger deals with several decision-makers or a formal tender may still need the sales manager's help with strategy.",
      Above:
        "{firstName} is likely to win business by understanding what the customer is trying to achieve. When a client asks for a lower price, the candidate can explore what matters most to them, offer a different package or payment terms instead of a straight discount, and close the deal at a healthy margin. This should lead to larger, more profitable deals and customers who feel well advised.",
    },
  },
  {
    id: "client-relationship-management",
    name: "Client Relationship Management",
    definition:
      "The tendency to build trusted, long-term relationships with key accounts, deliver on every promise after the sale, and grow each account by understanding the client's business over time.",
    sourceCompetencies: ["Building Connections", "Quality Client Delivery", "Supporting Others"],
    lowDescriptor:
      "May give attention to clients mainly when a sale is in progress, and leave after-sales problems for other teams to sort out.",
    midDescriptor:
      "Keeps in regular contact with assigned accounts, follows up after delivery, and resolves routine client issues with internal teams.",
    highDescriptor:
      "Becomes a trusted adviser to key accounts, anticipates their needs, and coordinates internal teams so every promise is kept.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support keeping relationships strong after the sale. A key account could hear from the candidate only when a contract is due for renewal, or a delivery problem may be left with the operations team without the candidate checking that it was solved. A regular contact plan for each key account, short account reviews with the sales manager, and clear handovers to delivery teams would help.",
      Meets:
        "{firstName} is likely to stay in regular contact with assigned accounts and follow up after delivery. When a client reports a problem with an order, the candidate can bring in the right internal team and confirm with the client once it is fixed. Growing the relationship beyond the main contact, for example to finance or senior management, may still develop with experience.",
      Above:
        "{firstName} is likely to become a trusted partner to key accounts. Before a client's annual budget is set, the candidate can review the past year's orders with them, suggest where PT Example could support next year's plans, and make sure any open issue is closed first. This should lead to strong renewals, repeat orders, and referrals to new customers.",
    },
  },
  {
    id: "target-ownership-drive",
    name: "Target Ownership & Drive",
    definition:
      "The tendency to take personal responsibility for the sales target, track progress against it every week, and keep pushing for results through slow months and difficult quarters.",
    sourceCompetencies: ["Being Accountable", "Optimizing Performance", "Resilience Under Pressure"],
    lowDescriptor:
      "May lose sight of the target until the end of the quarter, or explain a shortfall by market conditions without changing the approach.",
    midDescriptor:
      "Tracks progress against the target, puts in extra effort when behind, and reports results honestly.",
    highDescriptor:
      "Owns the target fully, reviews numbers weekly, acts early when behind, and keeps up the effort without needing pressure from the manager.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support owning the target from the start of each period. The candidate could have a slow first two months of the quarter and only realise in the last weeks how far behind they are, then rely on discounts to catch up. A weekly look at progress with the sales manager, smaller monthly targets, and a simple activity plan would help the candidate keep results on track.",
      Meets:
        "{firstName} is likely to track progress against the target and put in extra effort when behind. In a month when two expected orders are delayed, the candidate can add customer visits and follow up older quotations to close the gap. Over a long, difficult quarter, regular check-ins with the sales manager may still help keep energy and focus high.",
      Above:
        "{firstName} is likely to own the target fully and act early when results slip. When a large order is postponed in the middle of the quarter, the candidate can rework the plan within days, bring forward other opportunities, and keep the manager informed without being asked. This drive should make the candidate a dependable contributor to the team's numbers.",
    },
  },
  {
    id: "market-competitor-insight",
    name: "Market & Competitor Insight",
    definition:
      "The ability to follow the customer's industry, competitor offers, and market trends, and to turn what is heard in the field into useful input for customers, the sales plan, and the business.",
    sourceCompetencies: ["Trend Identification", "Business Acumen", "Distilling Information"],
    lowDescriptor:
      "May know little about the customer's industry or competitor offers, and may not share what customers say about the market.",
    midDescriptor:
      "Knows the main competitors and their offers, follows basic industry news, and passes on clear market signals.",
    highDescriptor:
      "Understands the customer's industry and competitors well, spots trends early, and turns field information into sales opportunities and useful advice for the business.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support building market knowledge. When a client mentions that a competitor has launched a cheaper package, the candidate may not know how it compares, or may not pass the information on to the team. A short competitor summary to study, a monthly market discussion in the sales meeting, and a simple way to log field information would help the candidate sell with more confidence.",
      Meets:
        "{firstName} is likely to know the main competitors and their offers and follow basic industry news. When a client compares PT Example with a competitor, the candidate can explain the key differences clearly. Spotting wider trends, such as a shift in how a whole sector buys, and turning them into new sales ideas may still develop with experience.",
      Above:
        "{firstName} is likely to read the market well and use it to win business. When several clients in the same sector start delaying orders, the candidate can recognise the pattern, find out why, and suggest to the sales manager a package that fits their tighter budgets. This insight should help PT Example respond to market changes earlier than competitors.",
    },
  },
  {
    id: "bouncing-back-from-setbacks",
    name: "Bouncing Back from Setbacks",
    definition:
      "The tendency to recover quickly from lost deals, rejections, and slow periods, learn something useful from each one, and return to customers with renewed energy and a better approach.",
    sourceCompetencies: ["Resilience Under Pressure", "Self Development Focused", "Lateral Problem Solving"],
    lowDescriptor:
      "May lose confidence or energy after a lost deal, avoid calling prospects for a while, or repeat the same approach that did not work.",
    midDescriptor:
      "Recovers from routine rejections, reflects on what went wrong, and gets back to work within a reasonable time.",
    highDescriptor:
      "Treats each setback as information, recovers quickly, tries a different approach, and stays positive through long, difficult sales cycles.",
    practicalInterpretations: {
      Below:
        "{firstName} may need support recovering after setbacks. Losing a large tender after months of work could leave the candidate discouraged and slow to contact new prospects in the following weeks. A short review of each lost deal with the sales manager, a focus on activity rather than only results, and pairing with an experienced colleague would help the candidate bounce back faster.",
      Meets:
        "{firstName} is likely to recover from routine rejections and get back to work. After a prospect declines a proposal, the candidate can ask for feedback, note what to change next time, and move on to the next opportunity. A series of losses in a row, or a very long sales cycle, may still affect the candidate's confidence for a time.",
      Above:
        "{firstName} is likely to treat setbacks as a chance to learn and come back stronger. When a key client chooses a competitor, the candidate can ask openly what made the difference, adjust the approach for similar customers, and stay in touch so the door remains open for the next contract. This resilience should keep the candidate effective through the ups and downs of field sales.",
    },
  },
];

export const normGroupDescription = "Simulated Indonesian B2B sales executive candidates (demo)";
export const populationCenter = 68;
export const seed = "pt-example-demo-v1";

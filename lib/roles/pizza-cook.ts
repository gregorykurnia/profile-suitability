import type { CompetencyDef } from "./types";

export const competencies: CompetencyDef[] = [
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

export const normGroupDescription = "Simulated Indonesian quick-service restaurant kitchen candidates (demo)";
export const populationCenter = 69;
export const seed = "pizzahut-qsr-demo-v6";

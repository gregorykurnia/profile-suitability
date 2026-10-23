# PT Example custom competency mappings

Behavioural composites for three PT Example restaurant roles: Service Crew (front of house, counter and delivery-app orders), Pizza Cook (prep, make-line, oven and cut table) and Shift Manager (runs a shift: crew deployment, standards, guest recovery and shift results). Each role has six custom competencies. Source names match the user-provided default framework exactly. Full Low/Mid/High descriptors and practical interpretations live in `lib/reportMock.ts`.

## Role mappings

### Service Crew

| Custom competency | Default sources | Role behaviour |
| --- | --- | --- |
| Guest Welcome & Service Ownership | Quality Client Delivery; Supporting Others; Being Accountable | The tendency to greet guests warmly, notice what they need at the counter or table, and take ownership of each order or request until it is delivered or clearly handed over. |
| Menu Knowledge & Suggestive Selling | Persuading Others; Applying Expertise; Adaptive Communication | The ability to explain pizzas, sides, and current promotions clearly and suggest relevant add-ons or bundles that fit the guest's group size, budget, and preferences without creating pressure. |
| Order Accuracy & Payment Handling | Following Directions; Distilling Information; Being Accountable | The ability to capture dine-in, takeaway, and delivery-app orders accurately, confirm modifiers and special requests, and handle payments and vouchers according to store procedures. |
| Guest Recovery & Escalation | Lateral Problem Solving; Taking Initiative; Adaptive Communication | The ability to listen to guest complaints, clarify what went wrong, offer a fair remedy within store guidelines, and involve the shift manager promptly when a decision falls outside crew authority. |
| Front & Kitchen Coordination | Enabling Teamwork; Supporting Others; Adaptive Communication | The ability to keep the counter, dining area, kitchen, and delivery riders aligned through clear handoffs, and to support colleagues at other stations when service needs shift. |
| Composure at Peak Hours | Resilience Under Pressure; Operational Flexibility; Forward Planning | The capacity to stay calm and organised during lunch, dinner, weekend, and Ramadan iftar peaks, reprioritising tasks as queues, delivery orders, and staffing levels change. |

### Pizza Cook

| Custom competency | Default sources | Role behaviour |
| --- | --- | --- |
| Recipe & Build Standards | Following Directions; Applying Expertise; Optimizing Performance | The ability to follow approved dough, sauce, topping, and bake specifications so every pizza matches the brand standard for portion, appearance, and taste across shifts. |
| Food Safety & Hygiene Discipline | Following Directions; Being Accountable; Applying Expertise | The tendency to follow food safety, halal handling, and sanitation procedures consistently, including temperature checks, date labelling, and stock rotation, and to report any departure promptly. |
| Make-Line Speed & Rush Handling | Resilience Under Pressure; Operational Flexibility; Optimizing Performance | The capacity to keep pizzas moving from the order screen through the oven at target speed, staying composed and reprioritising when dine-in, takeaway, and delivery orders peak together. |
| Prep Planning & Stock Rotation | Forward Planning; Optimizing Performance; Being Accountable | The ability to plan dough, sauce, and topping preparation against forecast demand, rotate stock correctly, and adjust prep during the shift to avoid both shortages and waste. |
| Product Quality Checks | Quality Client Delivery; Being Accountable; Taking Initiative | The tendency to check every pizza and side at the cut table against brand standards for bake, cut, toppings, and order accuracy, and to remake or flag products that fall short before they reach the guest. |
| Kitchen Teamwork & Station Support | Enabling Teamwork; Supporting Others; Adaptive Communication | The ability to communicate clearly across prep, make-line, oven, and cut-table stations, share workload during peaks, and help newer crew learn station routines. |

### Shift Manager

| Custom competency | Default sources | Role behaviour |
| --- | --- | --- |
| Shift Leadership & Crew Deployment | Providing Directions; Forward Planning; Operational Flexibility | The ability to plan the shift, deploy crew to the right stations based on forecast and skill, give clear direction, and redeploy people quickly as demand changes. |
| Crew Coaching & Development | Coaching Others; Supporting Others; Adaptive Communication | The ability to train new crew, give timely feedback on the floor, and build each crew member's confidence and skill so the store's standards hold on every shift. |
| Guest Experience & Service Recovery | Quality Client Delivery; Lateral Problem Solving; Adaptive Communication | The ability to set and model service standards on the shift, resolve escalated complaints fairly, and use guest feedback and online reviews to prevent repeat problems. |
| Operational Standards & Compliance | Following Directions; Being Accountable; Applying Expertise | The tendency to run the shift to brand and regulatory standards, including food safety, halal compliance, cash handling, and opening and closing checklists, and to take ownership of any gaps found. |
| Shift Performance & Cost Control | Business Acumen; Optimizing Performance; Distilling Information | The ability to track sales, speed of service, labour, and waste during the shift, interpret what the numbers show, and act quickly to keep results on target. |
| Composure & Decision-Making Under Pressure | Resilience Under Pressure; Taking Initiative; Lateral Problem Solving | The capacity to stay calm and decisive when several problems arise at once, such as equipment failure, staff shortages, or a sudden surge in orders, and to choose practical solutions quickly. |

## Demo data

- Seed `pizzahut-qsr-demo-v6` assigns the ten proxy candidates (four Pizza Cooks, three Service Crew, three Shift Managers) and simulates their scores, role norms, per-competency benchmarks and percentiles. The seed version was picked for a balanced spread of results (two Highly Suitable, five Suitable, three Needs Development).
- Scores, benchmarks, norms and percentiles are simulated demo data; custom scores are not calculated from default assessment results. Treat the composites as a proposal subject to review and calibration before assessment use.
- Authored insights in `lib/demoInsights.ts` are tied to each candidate's profile signature, so any change to the seed, definitions or score generator fails the build until the insights are rewritten to match.
- These labels describe role behaviour. They do not establish product knowledge, cooking skill, food-safety certification or cash-handling accuracy; practical tests, training records and observation supply that evidence.

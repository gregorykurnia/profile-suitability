// User-provided default framework. Preserve these names for source-result matching.
export const defaultCompetencyNames = [
  "Taking Initiative",
  "Being Accountable",
  "Providing Directions",
  "Supporting Others",
  "Coaching Others",
  "Enabling Teamwork",
  "Building Connections",
  "Persuading Others",
  "Adaptive Communication",
  "Trend Identification",
  "Distilling Information",
  "Applying Expertise",
  "Active Learning",
  "Strategic Agility",
  "Championing Change",
  "Forward Planning",
  "Following Directions",
  "Quality Client Delivery",
  "Resilience Under Pressure",
  "Lateral Problem Solving",
  "Operational Flexibility",
  "Self Development Focused",
  "Business Acumen",
  "Optimizing Performance",
] as const;

export type DefaultCompetencyName = (typeof defaultCompetencyNames)[number];

import { Competency } from "@/lib/types";
import CompetencyDetailCard from "./CompetencyDetailCard";

export default function CompetencyDetailSection({ competencies }: { competencies: Competency[] }) {
  return (
    <section>
      <h2 className="font-sans font-bold text-navy text-xl tracking-tight mb-4 px-1">
        Competency Detail
      </h2>
      <div className="space-y-4">
        {competencies.map((c) => (
          <CompetencyDetailCard key={c.id} competency={c} />
        ))}
      </div>
    </section>
  );
}

import { Competency } from "@/lib/types";
import CompetencyDetailCard from "./CompetencyDetailCard";

export default function CompetencyDetailSection({ competencies }: { competencies: Competency[] }) {
  return (
    <section>
      <div className="flex items-center gap-2.5 mb-4 px-1">
        <span className="h-6 w-1 rounded-full bg-gradient-to-b from-teal to-navy" />
        <h2 className="font-sans font-bold text-navy text-xl tracking-tight">
          Competency Detail
        </h2>
      </div>
      <div className="space-y-4">
        {competencies.map((c) => (
          <CompetencyDetailCard key={c.id} competency={c} />
        ))}
      </div>
    </section>
  );
}

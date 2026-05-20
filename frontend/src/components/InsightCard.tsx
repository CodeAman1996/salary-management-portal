import { LucideIcon } from "lucide-react";

type InsightCardProps = {
  title: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  accent: "green" | "blue" | "amber" | "rose";
};

export function InsightCard({ title, value, helper, icon: Icon, accent }: InsightCardProps) {
  return (
    <article className={`insight-card insight-${accent}`}>
      <div className="insight-icon">
        <Icon size={20} />
      </div>
      <div>
        <span>{title}</span>
        <strong>{value}</strong>
        <p>{helper}</p>
      </div>
    </article>
  );
}

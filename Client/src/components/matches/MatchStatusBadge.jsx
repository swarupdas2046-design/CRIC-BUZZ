import { matchCategory, CATEGORY_LABEL } from "./matchStatus";

// Same pill pattern as StatusBadge, but with the match-specific palette from Figma
// (red LIVE, blue SCHEDULED, green COMPLETED).
const STYLES = {
  live: "bg-red-50 text-red-600",
  scheduled: "bg-indigo-50 text-indigo-600",
  completed: "bg-green-50 text-green-700",
};

const MatchStatusBadge = ({ status }) => {
  const category = matchCategory(status);

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold uppercase ${STYLES[category]}`}>
      {category === "live" && <span className="h-1.5 w-1.5 rounded-full bg-red-500" />}
      {CATEGORY_LABEL[category]}
    </span>
  );
};

export default MatchStatusBadge;

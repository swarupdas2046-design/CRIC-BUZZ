import { NavLink } from "react-router";
import { Radio } from "lucide-react";

const teamName = (t) => t?.name || t?.shortName || "TBD";
const teamShort = (t) => t?.shortName || teamName(t);

const Home = ({ match }) => {
  if (!match) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
        No live or upcoming matches right now.
      </div>
    );
  }

  const isLive = ["LIVE", "INNINGS_BREAK"].includes(match.status);

  return (
    <div
      className="relative overflow-hidden rounded-xl p-10 text-white"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
      }}
    >
      <div className="relative z-10 text-center">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase ${
            isLive ? "bg-red-500" : "bg-white/20"
          }`}
        >
          {isLive && (
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          )}

          {isLive ? "Live Now" : "Up Next"}
        </span>

        <h1 className="mt-6 text-4xl font-bold">
          {teamShort(match.team1)}
          {" vs "}
          {teamShort(match.team2)}
        </h1>

        <p className="mt-3 text-lg text-white/80">
          {match.seriesId?.name}
        </p>

        <p className="mt-2 text-sm text-white/70">
          {match.venue}
        </p>

        <NavLink
          to="/live-scores"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Radio size={16} />
          {isLive ? "Watch Live" : "View Match"}
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
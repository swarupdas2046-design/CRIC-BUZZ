import MatchStatusBadge from "../matches/MatchStatusBadge";

const teamName = (t) => t?.name || t?.shortName || "TBD";
const teamShort = (t) => t?.shortName || "—";

const PublicMatchCard = ({ match }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-gray-500">
          {match.seriesId?.shortName ||
            match.seriesId?.name ||
            "Match"}

          {match.matchNumber
            ? ` · ${match.matchNumber}`
            : ""}
        </p>

        <MatchStatusBadge status={match.status} />
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex justify-between">
          <span>{teamName(match.team1)}</span>
          <span>{teamShort(match.team1)}</span>
        </div>

        <div className="flex justify-between">
          <span>{teamName(match.team2)}</span>
          <span>{teamShort(match.team2)}</span>
        </div>
      </div>

      {match.venue && (
        <p className="mt-3 text-xs text-gray-400">
          {match.venue}
        </p>
      )}
    </div>
  );
};

export default PublicMatchCard;
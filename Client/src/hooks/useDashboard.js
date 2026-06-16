import { useQuery } from "@tanstack/react-query";
import { getSeriesList } from "../api/series";
import { getTeamsList } from "../api/teams";
import { getPlayersList } from "../api/players";
import { getMatchesList } from "../api/matches";

export const useDashboard = () => {
  const series = useQuery({ queryKey: ["series"], queryFn: getSeriesList });
  const teams = useQuery({ queryKey: ["teams"], queryFn: getTeamsList });
  const players = useQuery({ queryKey: ["players"], queryFn: getPlayersList });
  const matches = useQuery({ queryKey: ["matches"], queryFn: getMatchesList });

  const matchList = matches.data || [];
  const liveMatches = matchList.filter((m) => m.status === "LIVE");

  return {
    isLoading:
      series.isLoading || teams.isLoading || players.isLoading || matches.isLoading,
    stats: {
      tournaments: series.data?.length ?? 0,
      teams: teams.data?.length ?? 0,
      players: players.data?.length ?? 0,
      liveMatches: liveMatches.length,
    },
    liveMatches,
  };
};

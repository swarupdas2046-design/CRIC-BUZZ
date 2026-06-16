import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTeamsList, createTeam, updateTeam, deleteTeam } from "../api/teams";

const TEAMS_KEY = ["teams"];

export const useTeamsList = () =>
  useQuery({ queryKey: TEAMS_KEY, queryFn: getTeamsList });

export const useCreateTeam = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: createTeam, onSuccess: () => qc.invalidateQueries({ queryKey: TEAMS_KEY }) });
};
export const useUpdateTeam = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: updateTeam, onSuccess: () => qc.invalidateQueries({ queryKey: TEAMS_KEY }) });
};
export const useDeleteTeam = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: deleteTeam, onSuccess: () => qc.invalidateQueries({ queryKey: TEAMS_KEY }) });
};

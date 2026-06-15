import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPlayersList, createPlayer, updatePlayer, deletePlayer } from "../api/players";

const PLAYERS_KEY = ["players"];

export const usePlayersList = () =>
  useQuery({ queryKey: PLAYERS_KEY, queryFn: getPlayersList });

export const useCreatePlayer = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: createPlayer, onSuccess: () => qc.invalidateQueries({ queryKey: PLAYERS_KEY }) });
};
export const useUpdatePlayer = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: updatePlayer, onSuccess: () => qc.invalidateQueries({ queryKey: PLAYERS_KEY }) });
};
export const useDeletePlayer = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: deletePlayer, onSuccess: () => qc.invalidateQueries({ queryKey: PLAYERS_KEY }) });
};

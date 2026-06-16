import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMatchesList,
  createMatch,
  updateMatch,
  deleteMatch,
} from "../api/matches";

const MATCHES_KEY = ["matches"];

export const useMatchesList = () =>
  useQuery({
    queryKey: MATCHES_KEY,
    queryFn: getMatchesList,
  });

export const useCreateMatch = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createMatch,
    onSuccess: () =>
      qc.invalidateQueries({
        queryKey: MATCHES_KEY,
      }),
  });
};

export const useUpdateMatch = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateMatch,
    onSuccess: () =>
      qc.invalidateQueries({
        queryKey: MATCHES_KEY,
      }),
  });
};

export const useDeleteMatch = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteMatch,
    onSuccess: () =>
      qc.invalidateQueries({
        queryKey: MATCHES_KEY,
      }),
  });
};
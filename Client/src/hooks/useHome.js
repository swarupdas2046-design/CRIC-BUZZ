import { useQuery } from "@tanstack/react-query";
import { getHomeFeed } from "../api/home";

export const useHomeFeed = () =>
  useQuery({
    queryKey: ["home"],
    queryFn: getHomeFeed,
    refetchInterval: 15000,
  });
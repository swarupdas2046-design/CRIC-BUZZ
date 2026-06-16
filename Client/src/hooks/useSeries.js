import { useQuery } from "@tanstack/react-query";
import { getSeriesList } from "../api/series";

export const useSeriesList = () =>
  useQuery({
    queryKey: ["series"],
    queryFn: async () => {
      const data = await getSeriesList();
      console.log("API SERIES RESPONSE =>", data);
      return data;
    },
  });
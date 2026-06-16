import api from "../lib/axios";

const unwrap = (res) => res.data?.data ?? res.data;

export const getMatchesList = async () => {
  const res = await api.get("/matches");
  return unwrap(res);
};

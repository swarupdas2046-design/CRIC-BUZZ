import api from "../lib/axios";

const unwrap = (res) => res.data?.data ?? res.data;

export const getTeamsList = async () => {
  const res = await api.get("/teams");
  return unwrap(res);
};
export const createTeam = async (payload) => {
  const res = await api.post("/teams", payload);
  return unwrap(res);
};
export const updateTeam = async ({ id, data }) => {
  const res = await api.patch(`/teams/${id}`, data);
  return unwrap(res);
};
export const deleteTeam = async (id) => {
  const res = await api.delete(`/teams/${id}`);
  return unwrap(res);
};

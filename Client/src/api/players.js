import api from "../lib/axios";

const unwrap = (res) => res.data?.data ?? res.data;

export const getPlayersList = async () => {
  const res = await api.get("/players");
  return unwrap(res);
};
export const createPlayer = async (payload) => {
  const res = await api.post("/players", payload);
  return unwrap(res);
};
export const updatePlayer = async ({ id, data }) => {
  const res = await api.patch(`/players/${id}`, data);
  return unwrap(res);
};
export const deletePlayer = async (id) => {
  const res = await api.delete(`/players/${id}`);
  return unwrap(res);
};

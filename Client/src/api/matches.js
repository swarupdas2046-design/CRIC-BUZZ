import api from "../lib/axios";

const unwrap = (res) => res.data?.data ?? res.data;

export const getMatchesList = async () => {
  const res = await api.get("/matches");
  return unwrap(res);
};

export const getMatch = async (id) => {
  const res = await api.get(`/matches/${id}`);
  return unwrap(res);
};

export const createMatch = async (payload) => {
  const res = await api.post("/matches", payload);
  return unwrap(res);
};

export const updateMatch = async ({ id, data }) => {
  const res = await api.patch(`/matches/${id}`, data);
  return unwrap(res);
};

export const deleteMatch = async (id) => {
  const res = await api.delete(`/matches/${id}`);
  return unwrap(res);
};

export const recordToss = async ({ id, data }) => {
  const res = await api.patch(`/matches/${id}/toss`, data);
  return unwrap(res);
};

export const startMatch = async (id) => {
  const res = await api.patch(`/matches/${id}/start`);
  return unwrap(res);
};

export const completeMatch = async ({ id, data }) => {
  const res = await api.patch(`/matches/${id}/complete`, data);
  return unwrap(res);
};
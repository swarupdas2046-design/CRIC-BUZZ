import api from "../lib/axios";

// Backend may return { success, data } or the payload directly.
const unwrap = (res) => res.data?.data ?? res.data;

// NOTE: "Tournaments" in the UI map to the backend "Series" entity (/api/series).
export const getSeriesList = async () => {
  const res = await api.get("/series");
  return unwrap(res); // Array<Series>
};

export const createSeries = async (payload) => {
  const res = await api.post("/series", payload);
  return unwrap(res);
};

export const updateSeries = async ({ id, data }) => {
  const res = await api.patch(`/series/${id}`, data);
  return unwrap(res);
};

export const deleteSeries = async (id) => {
  const res = await api.delete(`/series/${id}`);
  return unwrap(res);
};

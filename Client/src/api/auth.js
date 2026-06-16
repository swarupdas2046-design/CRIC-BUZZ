import api from "../lib/axios";

// Backend returns either { success, data } or the payload directly.
const unwrap = (res) => res.data?.data ?? res.data;

// POST /api/auth/login  -> { token, user: { id, name, email, role } }
export const loginRequest = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  return unwrap(res);
};

// POST /api/auth/register -> { token, user: { id, name, email, role } }
export const registerRequest = async (payload) => {
  const res = await api.post("/auth/register", payload);
  return unwrap(res);
};

import { loginRequest, registerRequest } from "../api/auth";
import {
  setStoredAuth,
  clearStoredAuth,
  getStoredAuth,
} from "../utils/authStorage";

// The service layer sits between the API and the React hooks.
// It calls the API, then persists the session. It does NOT touch Redux or routing.

export const login = async (credentials) => {
  const session = await loginRequest(credentials); // { token, user }
  setStoredAuth(session);
  return session;
};

export const register = async (payload) => {
  const session = await registerRequest(payload); // { token, user }
  setStoredAuth(session);
  return session;
};

export const logout = () => {
  clearStoredAuth();
};

export const getSession = () => getStoredAuth();

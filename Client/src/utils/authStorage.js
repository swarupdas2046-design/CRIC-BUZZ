const STORAGE_KEY = "cricbuzz_auth";

export const getStoredAuth = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const getStoredToken = () => getStoredAuth()?.token ?? null;

export const setStoredAuth = ({ token, user }) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
};

export const clearStoredAuth = () => {
  localStorage.removeItem(STORAGE_KEY);
};

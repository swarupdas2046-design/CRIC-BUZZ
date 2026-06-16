import api from "../lib/axios";

const unwrap = (res) => res.data?.data ?? res.data;

// Public feed
// Returns:
// {
//   liveMatches: [],
//   upcomingMatches: [],
//   recentMatches: []
// }
export const getHomeFeed = async () => {
  const res = await api.get("/home");
  return unwrap(res);
};
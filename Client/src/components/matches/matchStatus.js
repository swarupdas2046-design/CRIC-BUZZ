export const matchCategory = (status) => {
  if (["LIVE", "INNINGS_BREAK"].includes(status))
    return "live";

  if (status === "COMPLETED")
    return "completed";

  return "scheduled";
};

export const CATEGORY_LABEL = {
  scheduled: "Scheduled",
  live: "Live",
  completed: "Completed",
};
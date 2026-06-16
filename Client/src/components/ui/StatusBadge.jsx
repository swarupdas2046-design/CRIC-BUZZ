const STYLES = {
  LIVE: "bg-green-50 text-green-700",
  UPCOMING: "bg-gray-100 text-gray-700",
  COMPLETED: "bg-gray-100 text-gray-600",
};

const labelize = (status) =>
  status ? status.charAt(0) + status.slice(1).toLowerCase() : "Unknown";

const StatusBadge = ({ status }) => {
  const className = STYLES[status] || "bg-gray-100 text-gray-700";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {status === "LIVE" && (
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
      )}
      {labelize(status)}
    </span>
  );
};

export default StatusBadge;

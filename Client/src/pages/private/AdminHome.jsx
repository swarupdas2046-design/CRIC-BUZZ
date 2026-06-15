const AdminHome = () => {
  return (
    <div>
      Admin Home
    </div>
  )
}

export default AdminHome


// import { Trophy, Users, User, Activity } from "lucide-react";
// import { useDashboard } from "../../hooks/useDashboard";
// import StatusBadge from "../../components/ui/StatusBadge";

// const StatCard = ({ icon: Icon, label, value, highlight, loading }) => (
//   <div className={`rounded-lg border bg-white p-5 ${highlight ? "border-blue-300 ring-1 ring-blue-100" : "border-gray-200"}`}>
//     <div className="flex items-center justify-between">
//       <div className={`flex h-9 w-9 items-center justify-center rounded-md ${highlight ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}>
//         <Icon size={18} />
//       </div>
//       {highlight && (
//         <span className="flex items-center gap-1 text-xs font-medium text-red-500">
//           <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Live
//         </span>
//       )}
//     </div>
//     <p className="mt-4 text-sm text-gray-500">{label}</p>
//     <p className="mt-1 text-2xl font-bold text-gray-900">{loading ? "—" : value.toLocaleString()}</p>
//   </div>
// );

// const AdminHome = () => {
//   const { stats, liveMatches, isLoading } = useDashboard();

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
//       <p className="mt-1 text-sm text-gray-500">Real-time metrics and operational status.</p>

//       <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <StatCard icon={Trophy} label="Total Tournaments" value={stats.tournaments} loading={isLoading} />
//         <StatCard icon={Users} label="Active Teams" value={stats.teams} loading={isLoading} />
//         <StatCard icon={User} label="Total Players" value={stats.players} loading={isLoading} />
//         <StatCard icon={Activity} label="Live Matches" value={stats.liveMatches} loading={isLoading} highlight />
//       </div>

//       <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
//         <div className="rounded-lg border border-gray-200 bg-white p-5 lg:col-span-2">
//           <h2 className="text-lg font-semibold text-gray-900">Active Match Control</h2>
//           <div className="mt-4 space-y-3">
//             {!isLoading && liveMatches.length === 0 && (
//               <p className="py-6 text-center text-sm text-gray-500">No live matches right now.</p>
//             )}
//             {liveMatches.map((m) => (
//               <div key={m._id || m.id} className="flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 px-4 py-3">
//                 <div className="flex items-center gap-3">
//                   <span className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">{m.team1?.shortName || "T1"}</span>
//                   <span className="text-xs text-gray-400">vs</span>
//                   <span className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">{m.team2?.shortName || "T2"}</span>
//                   <span className="text-sm text-gray-600">{m.venue}</span>
//                 </div>
//                 <StatusBadge status={m.status} />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="rounded-lg border border-gray-200 bg-white p-5">
//           <h2 className="text-lg font-semibold text-gray-900">System Activity</h2>
//           <p className="mt-6 text-center text-sm text-gray-400">Activity feed is not available from the backend yet.</p>
//         </div>
//       </div>

//       <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5">
//         <h2 className="text-lg font-semibold text-gray-900">Engagement Analytics</h2>
//         <div className="mt-4 flex h-48 items-center justify-center rounded-md border border-dashed border-gray-300 text-sm text-gray-400">
//           User Engagement Chart — data source not yet available
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminHome;

import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

import { useMatchesList, useDeleteMatch } from "../../hooks/useMatches";
import { useTeamsList } from "../../hooks/useTeams";
import { useSeriesList } from "../../hooks/useSeries";
import { matchCategory } from "../../components/matches/matchStatus";
import MatchStatusBadge from "../../components/matches/MatchStatusBadge";
import MatchFormModal from "../../components/matches/MatchFormModal";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";

const PAGE_SIZE = 8;
const TABS = [
  { key: "all", label: "All Matches" },
  { key: "scheduled", label: "Scheduled" },
  { key: "live", label: "Live Now" },
  { key: "completed", label: "Completed" },
];

const formatDateTime = (iso) => {
  if (!iso) return { date: "—", time: "" };
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    time: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
  };
};

const Matches = () => {
  const { data: matches = [], isLoading, isError } = useMatchesList();
  const { data: teams = [] } = useTeamsList();
  const { data: series = [] } = useSeriesList();
  const deleteMatch = useDeleteMatch();

  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(1);
  const [formModal, setFormModal] = useState({ open: false, mode: "create", match: null });
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Lookup maps so names render even when matches return raw ObjectId refs.
  const teamMap = useMemo(() => {
    const m = new Map();
    teams.forEach((t) => m.set(t._id || t.id, t));
    return m;
  }, [teams]);

  const seriesMap = useMemo(() => {
    const m = new Map();
    series.forEach((s) => m.set(s._id || s.id, s));
    return m;
  }, [series]);

  const resolveTeam = (ref) => (ref && typeof ref === "object" ? ref : teamMap.get(ref)) || null;
  const resolveSeries = (ref) => (ref && typeof ref === "object" ? ref : seriesMap.get(ref)) || null;

  const filtered = useMemo(() => {
    return matches.filter((m) => {
      const t1 = resolveTeam(m.team1);
      const t2 = resolveTeam(m.team2);
      const haystack = `${t1?.name || ""} ${t2?.name || ""} ${m.venue || ""}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesTab = tab === "all" || matchCategory(m.status) === tab;
      return matchesSearch && matchesTab;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches, search, tab, teamMap]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const openCreate = () => setFormModal({ open: true, mode: "create", match: null });
  const openEdit = (m) => setFormModal({ open: true, mode: "edit", match: m });

  const confirmDelete = () =>
    deleteMatch.mutate(deleteTarget._id || deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Match Management</h1>
          <p className="mt-1 text-sm text-gray-500">View, schedule, and manage all cricket matches across tournaments.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={openCreate} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Schedule Match</button>
          <button onClick={openCreate} className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus size={16} /> Create Match
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search matches, teams, or venues..." className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm" />
        </div>
        <div className="flex items-center gap-1">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => { setTab(t.key); setPage(1); }} className={`rounded-md px-3 py-1.5 text-sm font-medium ${tab === t.key ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-50"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-5 py-3">Match Details</th>
              <th className="px-5 py-3">Tournament</th>
              <th className="px-5 py-3">Date &amp; Time</th>
              <th className="px-5 py-3">Venue</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-gray-100">
                {Array.from({ length: 6 }).map((__, j) => (
                  <td key={j} className="px-5 py-4"><div className="h-4 w-24 animate-pulse rounded bg-gray-100" /></td>
                ))}
              </tr>
            ))}

            {!isLoading && pageRows.map((m) => {
              const t1 = resolveTeam(m.team1);
              const t2 = resolveTeam(m.team2);
              const s = resolveSeries(m.seriesId);
              const dt = formatDateTime(m.startTime);
              const isLive = matchCategory(m.status) === "live";
              return (
                <tr key={m._id || m.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {isLive && <span className="h-2 w-2 rounded-full bg-red-500" />}
                      <div className="flex flex-col gap-1">
                        <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-600">{t1?.shortName || "T1"}</span>
                        <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-600">{t2?.shortName || "T2"}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{t1?.name || "Team 1"} vs {t2?.name || "Team 2"}</p>
                        {m.matchNumber && <p className="text-xs text-gray-400">{m.matchNumber}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{s?.name || "—"}</td>
                  <td className="px-5 py-4 text-gray-600">
                    <p className="font-medium text-gray-900">{dt.date}</p>
                    <p className="text-xs text-gray-400">{dt.time}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{m.venue}</td>
                  <td className="px-5 py-4"><MatchStatusBadge status={m.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(m)} className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-blue-600" title="Edit"><Pencil size={16} /></button>
                      <button onClick={() => setDeleteTarget(m)} className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-red-600" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {isError && <div className="px-5 py-10 text-center text-sm text-red-600">Failed to load matches. Please try again.</div>}
        {!isLoading && !isError && filtered.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="text-base font-semibold text-gray-900">No matches found</p>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or schedule a new match.</p>
          </div>
        )}
        {!isLoading && !isError && filtered.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3 text-sm text-gray-500">
            <span>Showing {(currentPage - 1) * PAGE_SIZE + 1} to {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} matches</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="rounded border border-gray-300 p-1.5 disabled:opacity-40"><ChevronLeft size={14} /></button>
              <span className="px-2 font-medium text-gray-900">{currentPage} / {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="rounded border border-gray-300 p-1.5 disabled:opacity-40"><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>

      <MatchFormModal open={formModal.open} mode={formModal.mode} match={formModal.match} onClose={() => setFormModal((m) => ({ ...m, open: false }))} />
      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete Match"
        message="Are you sure you want to delete this match? This action cannot be undone."
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
        isPending={deleteMatch.isPending}
        errorMessage={deleteMatch.error?.response?.data?.message}
      />
    </div>
  );
};

export default Matches;

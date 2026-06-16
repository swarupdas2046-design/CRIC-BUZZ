import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, Download, ChevronLeft, ChevronRight } from "lucide-react";

import { useTeamsList, useDeleteTeam } from "../../hooks/useTeams";
import { exportCsv } from "../../utils/exportCsv";
import TeamFormModal from "../../components/teams/TeamFormModal";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";

const PAGE_SIZE = 8;

const Teams = () => {
  const { data: teams = [], isLoading, isError } = useTeamsList();
  const deleteTeam = useDeleteTeam();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [formModal, setFormModal] = useState({ open: false, mode: "create", team: null });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(
    () => teams.filter((t) =>
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.shortName?.toLowerCase().includes(search.toLowerCase())),
    [teams, search]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleExport = () =>
    exportCsv("teams.csv", filtered.map((t) => ({
      name: t.name, shortName: t.shortName,
      squadSize: t.squadPlayers?.length ?? 0, primaryColor: t.primaryColor || "",
    })));

  const confirmDelete = () =>
    deleteTeam.mutate(deleteTarget._id || deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage franchise rosters and team identities.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} /> Export CSV
          </button>
          <button onClick={() => setFormModal({ open: true, mode: "create", team: null })} className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus size={16} /> Add Team
          </button>
        </div>
      </div>

      <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search teams by name or short name..." className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm" />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-5 py-3">Logo</th>
              <th className="px-5 py-3">Team Name</th>
              <th className="px-5 py-3">Short</th>
              <th className="px-5 py-3">Squad Size</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-gray-100">
                {Array.from({ length: 5 }).map((__, j) => (
                  <td key={j} className="px-5 py-4"><div className="h-4 w-20 animate-pulse rounded bg-gray-100" /></td>
                ))}
              </tr>
            ))}
            {!isLoading && pageRows.map((t) => (
              <tr key={t._id || t.id} className="border-b border-gray-100 last:border-0">
                <td className="px-5 py-4">
                  {t.logo ? <img src={t.logo} alt={t.shortName} className="h-8 w-8 rounded object-cover" />
                    : <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100 text-xs font-semibold text-gray-500">{t.shortName?.slice(0, 3)}</div>}
                </td>
                <td className="px-5 py-4 font-medium text-gray-900">{t.name}</td>
                <td className="px-5 py-4 text-gray-600">{t.shortName}</td>
                <td className="px-5 py-4 text-gray-600">{t.squadPlayers?.length ?? 0}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setFormModal({ open: true, mode: "edit", team: t })} className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-blue-600" title="Edit"><Pencil size={16} /></button>
                    <button onClick={() => setDeleteTarget(t)} className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-red-600" title="Delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isError && <div className="px-5 py-10 text-center text-sm text-red-600">Failed to load teams. Please try again.</div>}
        {!isLoading && !isError && filtered.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="text-base font-semibold text-gray-900">No teams found</p>
            <p className="mt-1 text-sm text-gray-500">Add a team to get started.</p>
          </div>
        )}
        {!isLoading && !isError && filtered.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3 text-sm text-gray-500">
            <span>Showing {(currentPage - 1) * PAGE_SIZE + 1} to {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} teams</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="rounded border border-gray-300 p-1.5 disabled:opacity-40"><ChevronLeft size={14} /></button>
              <span className="px-2 font-medium text-gray-900">{currentPage} / {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="rounded border border-gray-300 p-1.5 disabled:opacity-40"><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>

      <TeamFormModal open={formModal.open} mode={formModal.mode} team={formModal.team} onClose={() => setFormModal((m) => ({ ...m, open: false }))} />
      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete Team"
        message={`Are you sure you want to delete '${deleteTarget?.name}'? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
        isPending={deleteTeam.isPending}
        errorMessage={deleteTeam.error?.response?.data?.message}
      />
    </div>
  );
};

export default Teams;

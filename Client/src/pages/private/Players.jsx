import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, Download, ChevronLeft, ChevronRight } from "lucide-react";

import { usePlayersList, useDeletePlayer } from "../../hooks/usePlayers";
import { exportCsv } from "../../utils/exportCsv";
import PlayerFormModal from "../../components/players/PlayerFormModal";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";

const PAGE_SIZE = 10;
const ROLES = ["BATSMAN", "BOWLER", "ALL_ROUNDER", "WICKET_KEEPER"];

const roleLabel = (role) =>
  role ? role.toLowerCase().split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("-") : "";

const Players = () => {
  const { data: players = [], isLoading, isError } = usePlayersList();
  const deletePlayer = useDeletePlayer();

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [page, setPage] = useState(1);
  const [formModal, setFormModal] = useState({ open: false, mode: "create", player: null });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(
    () => players.filter((p) => {
      const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
      const matchesRole = !role || p.role === role;
      const matchesCountry = !country || p.country === country;
      return matchesSearch && matchesRole && matchesCountry;
    }),
    [players, search, role, country]
  );

  const countries = useMemo(() => [...new Set(players.map((p) => p.country).filter(Boolean))], [players]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleExport = () =>
    exportCsv("players.csv", filtered.map((p) => ({
      name: p.name, role: p.role, country: p.country,
      battingStyle: p.battingStyle || "", bowlingStyle: p.bowlingStyle || "",
    })));

  const confirmDelete = () =>
    deletePlayer.mutate(deleteTarget._id || deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Player Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage global player roster and configurations.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} /> Export
          </button>
          <button onClick={() => setFormModal({ open: true, mode: "create", player: null })} className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus size={16} /> Add Player
          </button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 rounded-lg border border-gray-200 bg-white p-4 md:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search players by name..." className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm" />
        </div>
        <select value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
          <option value="">All Roles</option>
          {ROLES.map((r) => <option key={r} value={r}>{roleLabel(r)}</option>)}
        </select>
        <select value={country} onChange={(e) => { setCountry(e.target.value); setPage(1); }} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
          <option value="">All Nationalities</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-5 py-3">Player</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Nationality</th>
              <th className="px-5 py-3">Batting</th>
              <th className="px-5 py-3">Bowling</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="border-b border-gray-100">
                {Array.from({ length: 6 }).map((__, j) => (
                  <td key={j} className="px-5 py-4"><div className="h-4 w-20 animate-pulse rounded bg-gray-100" /></td>
                ))}
              </tr>
            ))}
            {!isLoading && pageRows.map((p) => (
              <tr key={p._id || p.id} className="border-b border-gray-100 last:border-0">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {p.image ? <img src={p.image} alt={p.name} className="h-8 w-8 rounded-full object-cover" />
                      : <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500">{p.name?.charAt(0)}</div>}
                    <span className="font-medium text-gray-900">{p.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4"><span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">{roleLabel(p.role)}</span></td>
                <td className="px-5 py-4 text-gray-600">{p.country}</td>
                <td className="px-5 py-4 text-gray-600">{p.battingStyle || "—"}</td>
                <td className="px-5 py-4 text-gray-600">{p.bowlingStyle || "—"}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setFormModal({ open: true, mode: "edit", player: p })} className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-blue-600" title="Edit"><Pencil size={16} /></button>
                    <button onClick={() => setDeleteTarget(p)} className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-red-600" title="Delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isError && <div className="px-5 py-10 text-center text-sm text-red-600">Failed to load players. Please try again.</div>}
        {!isLoading && !isError && filtered.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="text-base font-semibold text-gray-900">No players found</p>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or add a new player.</p>
          </div>
        )}
        {!isLoading && !isError && filtered.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3 text-sm text-gray-500">
            <span>Showing {(currentPage - 1) * PAGE_SIZE + 1} to {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} entries</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="rounded border border-gray-300 p-1.5 disabled:opacity-40"><ChevronLeft size={14} /></button>
              <span className="px-2 font-medium text-gray-900">{currentPage} / {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="rounded border border-gray-300 p-1.5 disabled:opacity-40"><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>

      <PlayerFormModal open={formModal.open} mode={formModal.mode} player={formModal.player} onClose={() => setFormModal((m) => ({ ...m, open: false }))} />
      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Delete Player"
        message={`Are you sure you want to delete '${deleteTarget?.name}'? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
        isPending={deletePlayer.isPending}
        errorMessage={deletePlayer.error?.response?.data?.message}
      />
    </div>
  );
};

export default Players;

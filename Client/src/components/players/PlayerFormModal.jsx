import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { useCreatePlayer, useUpdatePlayer } from "../../hooks/usePlayers";

const ROLES = ["BATSMAN", "BOWLER", "ALL_ROUNDER", "WICKET_KEEPER"];
const EMPTY = { name: "", role: "BATSMAN", country: "", image: "", battingStyle: "", bowlingStyle: "" };

// Create / edit player. Backend body: { name, role, country, image?, battingStyle?, bowlingStyle? }.
const PlayerFormModal = ({ open, mode, player, onClose }) => {
  const [form, setForm] = useState(EMPTY);
  const isEdit = mode === "edit";
  const createPlayer = useCreatePlayer();
  const updatePlayer = useUpdatePlayer();
  const mutation = isEdit ? updatePlayer : createPlayer;

  useEffect(() => {
    if (!open) return;
    setForm(
      isEdit && player
        ? { name: player.name || "", role: player.role || "BATSMAN", country: player.country || "", image: player.image || "", battingStyle: player.battingStyle || "", bowlingStyle: player.bowlingStyle || "" }
        : EMPTY
    );
    mutation.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isEdit, player]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name: form.name.trim(), role: form.role, country: form.country.trim() };
    if (form.image.trim()) payload.image = form.image.trim();
    if (form.battingStyle.trim()) payload.battingStyle = form.battingStyle.trim();
    if (form.bowlingStyle.trim()) payload.bowlingStyle = form.bowlingStyle.trim();
    const onDone = { onSuccess: onClose };
    if (isEdit) updatePlayer.mutate({ id: player._id || player.id, data: payload }, onDone);
    else createPlayer.mutate(payload, onDone);
  };

  const errorMessage =
    mutation.error?.response?.data?.message ||
    mutation.error?.response?.data?.error ||
    (mutation.isError ? "Something went wrong. Please try again." : "");

  const footer = (
    <>
      <button type="button" onClick={onClose} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
      <button type="submit" form="player-form" disabled={mutation.isPending} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60">
        {mutation.isPending ? "Saving..." : "Save Player"}
      </button>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Edit Player" : "Add New Player"} footer={footer}>
      <form id="player-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
          <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Virat Kohli" className="w-full rounded-md border border-gray-300 p-2.5 text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Role <span className="text-red-500">*</span></label>
            <select name="role" value={form.role} onChange={handleChange} className="w-full rounded-md border border-gray-300 bg-white p-2.5 text-sm">
              {ROLES.map((r) => <option key={r} value={r}>{r.replace("_", " ")}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Country <span className="text-red-500">*</span></label>
            <input name="country" value={form.country} onChange={handleChange} required placeholder="e.g. India" className="w-full rounded-md border border-gray-300 p-2.5 text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Batting Style</label>
            <input name="battingStyle" value={form.battingStyle} onChange={handleChange} placeholder="Right-hand bat" className="w-full rounded-md border border-gray-300 p-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Bowling Style</label>
            <input name="bowlingStyle" value={form.bowlingStyle} onChange={handleChange} placeholder="Right-arm fast" className="w-full rounded-md border border-gray-300 p-2.5 text-sm" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Image URL</label>
          <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." className="w-full rounded-md border border-gray-300 p-2.5 text-sm" />
        </div>
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      </form>
    </Modal>
  );
};

export default PlayerFormModal;

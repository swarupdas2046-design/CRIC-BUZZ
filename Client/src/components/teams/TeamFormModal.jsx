import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { useCreateTeam, useUpdateTeam } from "../../hooks/useTeams";

const EMPTY = { name: "", shortName: "", logo: "", primaryColor: "" };

// Create / edit team. Backend body: { name, shortName, logo, primaryColor? }.
const TeamFormModal = ({ open, mode, team, onClose }) => {
  const [form, setForm] = useState(EMPTY);
  const isEdit = mode === "edit";
  const createTeam = useCreateTeam();
  const updateTeam = useUpdateTeam();
  const mutation = isEdit ? updateTeam : createTeam;

  useEffect(() => {
    if (!open) return;
    setForm(
      isEdit && team
        ? { name: team.name || "", shortName: team.shortName || "", logo: team.logo || "", primaryColor: team.primaryColor || "" }
        : EMPTY
    );
    mutation.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isEdit, team]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name: form.name.trim(), shortName: form.shortName.trim(), logo: form.logo.trim() };
    if (form.primaryColor.trim()) payload.primaryColor = form.primaryColor.trim();
    const onDone = { onSuccess: onClose };
    if (isEdit) updateTeam.mutate({ id: team._id || team.id, data: payload }, onDone);
    else createTeam.mutate(payload, onDone);
  };

  const errorMessage =
    mutation.error?.response?.data?.message ||
    mutation.error?.response?.data?.error ||
    (mutation.isError ? "Something went wrong. Please try again." : "");

  const footer = (
    <>
      <button type="button" onClick={onClose} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
      <button type="submit" form="team-form" disabled={mutation.isPending} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60">
        {mutation.isPending ? "Saving..." : "Save Team"}
      </button>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Edit Team" : "Add New Team"} footer={footer}>
      <form id="team-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Team Name <span className="text-red-500">*</span></label>
          <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Mumbai Indians" className="w-full rounded-md border border-gray-300 p-2.5 text-sm" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Short Name <span className="text-red-500">*</span></label>
          <input name="shortName" value={form.shortName} onChange={handleChange} required placeholder="e.g. MI" className="w-full rounded-md border border-gray-300 p-2.5 text-sm" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Logo URL <span className="text-red-500">*</span></label>
          <input name="logo" value={form.logo} onChange={handleChange} required placeholder="https://..." className="w-full rounded-md border border-gray-300 p-2.5 text-sm" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Primary Color</label>
          <input name="primaryColor" value={form.primaryColor} onChange={handleChange} placeholder="#004BA0" className="w-full rounded-md border border-gray-300 p-2.5 text-sm" />
        </div>
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      </form>
    </Modal>
  );
};

export default TeamFormModal;

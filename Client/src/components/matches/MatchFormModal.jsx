import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import { useCreateMatch, useUpdateMatch } from "../../hooks/useMatches";
import { useSeriesList } from "../../hooks/useSeries";
import { useTeamsList } from "../../hooks/useTeams";

const EMPTY = { seriesId: "", team1: "", team2: "", venue: "", startTime: "", matchNumber: "" };

// Convert an ISO date string to the value a datetime-local input expects.
const toLocalInput = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// Resolve a ref that may be an object or a raw id.
const refId = (ref) => (ref && typeof ref === "object" ? ref._id || ref.id : ref) || "";

// Create / edit (schedule) a match. Backend body: { seriesId, team1, team2, venue, startTime, matchNumber? }.
const MatchFormModal = ({ open, mode, match, onClose }) => {
  const [form, setForm] = useState(EMPTY);
  const [validationError, setValidationError] = useState("");
  const isEdit = mode === "edit";

  const { data: series = [] } = useSeriesList();
  const { data: teams = [] } = useTeamsList();
  console.log("Series Data =>", series);
console.log("Teams Data =>", teams);
  const createMatch = useCreateMatch();
  const updateMatch = useUpdateMatch();
  const mutation = isEdit ? updateMatch : createMatch;

  useEffect(() => {
    if (!open) return;
    setValidationError("");
    setForm(
      isEdit && match
        ? {
            seriesId: refId(match.seriesId),
            team1: refId(match.team1),
            team2: refId(match.team2),
            venue: match.venue || "",
            startTime: toLocalInput(match.startTime),
            matchNumber: match.matchNumber || "",
          }
        : EMPTY
    );
    mutation.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isEdit, match]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (form.team1 && form.team1 === form.team2) {
      setValidationError("Team 1 and Team 2 must be different.");
      return;
    }

    const payload = {
      seriesId: form.seriesId,
      team1: form.team1,
      team2: form.team2,
      venue: form.venue.trim(),
      startTime: new Date(form.startTime).toISOString(),
    };
    if (form.matchNumber.trim()) payload.matchNumber = form.matchNumber.trim();

    const onDone = { onSuccess: onClose };
    if (isEdit) updateMatch.mutate({ id: match._id || match.id, data: payload }, onDone);
    else createMatch.mutate(payload, onDone);
  };

  const errorMessage =
    validationError ||
    mutation.error?.response?.data?.message ||
    mutation.error?.response?.data?.error ||
    (mutation.isError ? "Something went wrong. Please try again." : "");

  const footer = (
    <>
      <button type="button" onClick={onClose} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
      <button type="submit" form="match-form" disabled={mutation.isPending} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60">
        {mutation.isPending ? "Saving..." : isEdit ? "Save Changes" : "Create Match"}
      </button>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Edit Match" : "Create Match"} footer={footer}>
      <form id="match-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Tournament <span className="text-red-500">*</span></label>
          <select name="seriesId" value={form.seriesId} onChange={handleChange} required className="w-full rounded-md border border-gray-300 bg-white p-2.5 text-sm">
            <option value="">Select a tournament</option>
            {series.map((s) => <option key={s._id || s.id} value={s._id || s.id}>{s.name}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Team 1 <span className="text-red-500">*</span></label>
            <select name="team1" value={form.team1} onChange={handleChange} required className="w-full rounded-md border border-gray-300 bg-white p-2.5 text-sm">
              <option value="">Select team</option>
              {teams.map((t) => <option key={t._id || t.id} value={t._id || t.id}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Team 2 <span className="text-red-500">*</span></label>
            <select name="team2" value={form.team2} onChange={handleChange} required className="w-full rounded-md border border-gray-300 bg-white p-2.5 text-sm">
              <option value="">Select team</option>
              {teams.map((t) => <option key={t._id || t.id} value={t._id || t.id}>{t.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Venue <span className="text-red-500">*</span></label>
          <input name="venue" value={form.venue} onChange={handleChange} required placeholder="e.g. Narendra Modi Stadium, Ahmedabad" className="w-full rounded-md border border-gray-300 p-2.5 text-sm" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Start Time <span className="text-red-500">*</span></label>
            <input type="datetime-local" name="startTime" value={form.startTime} onChange={handleChange} required className="w-full rounded-md border border-gray-300 p-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Match Number</label>
            <input name="matchNumber" value={form.matchNumber} onChange={handleChange} placeholder="e.g. 1st Test" className="w-full rounded-md border border-gray-300 p-2.5 text-sm" />
          </div>
        </div>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      </form>
    </Modal>
  );
};

export default MatchFormModal;

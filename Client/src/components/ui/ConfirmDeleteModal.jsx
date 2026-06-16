import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

const ConfirmDeleteModal = ({ open, title = "Delete item", message, onConfirm, onClose, isPending, errorMessage }) => {
  const footer = (
    <>
      <button type="button" onClick={onClose} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
      <button type="button" onClick={onConfirm} disabled={isPending} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50">
        {isPending ? "Deleting..." : "Delete Permanently"}
      </button>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title="" footer={footer}>
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle size={20} className="text-red-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-600">{message}</p>
          {errorMessage && <p className="mt-3 text-sm text-red-600">{errorMessage}</p>}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;

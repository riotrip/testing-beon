import { useState } from "react";

export default function BayarModal({
  isOpen,
  onClose,
  onSubmit,
  targetTagihan,
}) {
  const [status, setStatus] = useState("Lunas");

  if (!isOpen || !targetTagihan) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(targetTagihan.id, { payment_status: status });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-emerald-600 text-white">
          <h3 className="text-lg font-bold">Verifikasi Pembayaran</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white font-bold text-xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-6">
          <div className="mb-4 bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-sm text-slate-700">
            <p>
              <strong>Rumah:</strong> Blok {targetTagihan.rumah?.no_rumah}
            </p>
            <p className="mt-1">
              <strong>Jenis:</strong> {targetTagihan.type}
            </p>
            <p className="mt-1">
              <strong>Nominal:</strong> Rp{" "}
              {Number(targetTagihan.amount).toLocaleString("id-ID")}
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Status Pembayaran
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white"
            >
              <option value="Lunas">Lunas</option>
              <option value="Belum Lunas">Belum Lunas</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold text-sm"
            >
              Simpan Pelunasan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

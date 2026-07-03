import { useState, useEffect } from "react";

export default function EditModal({ isOpen, onClose, onSubmit, targetData }) {
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    if (targetData) {
      queueMicrotask(() => {
        setFormData({
          description: targetData.description || "",
          category: targetData.category || "Perbaikan",
          amount: targetData.amount || "",
          date: targetData.date || "",
        });
      });
    }
  }, [targetData]);

  if (!isOpen || !targetData) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(targetData.id, {
      ...formData,
      amount: Number(formData.amount),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-amber-500 text-white">
          <h3 className="text-lg font-bold">Edit Pengeluaran</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white font-bold text-xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Kategori Pengeluaran
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 bg-white"
            >
              <option value="Perbaikan">Perbaikan Infrastruktur</option>
              <option value="Gaji">Gaji / Honor Operasional</option>
              <option value="Acara">Kegiatan / Acara RT</option>
              <option value="Darurat">Dana Darurat / Sosial</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Keterangan / Deskripsi
            </label>
            <textarea
              required
              rows={2}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Nominal (Rp)
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Tanggal
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800"
              />
            </div>
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
              className="px-4 py-2 text-white bg-amber-500 hover:bg-amber-600 rounded-lg font-semibold text-sm"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

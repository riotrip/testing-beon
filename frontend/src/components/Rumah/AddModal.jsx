export default function AddModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-blue-600 text-white">
          <h3 className="text-lg font-bold">Tambah Rumah Baru</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white font-bold text-xl transition-colors"
          >
            &times;
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Nomor Rumah
            </label>
            <input
              type="text"
              required
              placeholder="Cth: A-01"
              value={formData.no_rumah}
              onChange={(e) =>
                setFormData({ ...formData, no_rumah: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Alamat Lengkap
            </label>
            <textarea
              required
              rows={2}
              placeholder="Cth: Jl. Mawar Blok A No. 1..."
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-sm transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-sm transition-colors shadow-sm"
            >
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

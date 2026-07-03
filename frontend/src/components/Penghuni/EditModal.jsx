import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function EditModal({ isOpen, onClose, onSuccess, penghuni }) {
  const [formData, setFormData] = useState({
    name: "",
    status: "Tetap",
    no_hp: "",
    is_married: false,
  });
  const [fotoFile, setFotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen || !penghuni) return;

    queueMicrotask(() => {
      const newFormData = {
        name: penghuni.name || "",
        status: penghuni.status || "Tetap",
        no_hp: penghuni.no_hp || "",
        is_married: penghuni.is_married === 1 || penghuni.is_married === true,
      };
      setFormData(newFormData);
      setFotoFile(null);
      setErrors({});
    });
  }, [isOpen, penghuni]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const payload = new FormData();
      payload.append("_method", "PUT");
      payload.append("name", formData.name);
      payload.append("status", formData.status);
      payload.append("no_hp", formData.no_hp);
      payload.append("is_married", formData.is_married ? 1 : 0);
      if (fotoFile) payload.append("foto_ktp", fotoFile);

      await api.post(`/penghuni/${penghuni.id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSuccess();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        alert("Terjadi kesalahan. Coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !penghuni) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-amber-500 text-white">
          <h3 className="text-lg font-bold">Edit Data Penghuni</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white font-bold text-xl transition-colors"
          >
            &times;
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[75vh]"
        >
          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Nomor HP <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="no_hp"
              required
              value={formData.no_hp}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800"
            />
            {errors.no_hp && (
              <p className="text-red-500 text-xs mt-1">{errors.no_hp[0]}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Status Penghuni <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800"
            >
              <option value="Tetap">Tetap</option>
              <option value="Kontrak">Kontrak</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_married"
                checked={formData.is_married}
                onChange={handleChange}
                className="w-4 h-4 accent-amber-500"
              />
              <span className="text-sm font-bold text-slate-700">
                Sudah Menikah
              </span>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Ganti Foto KTP
            </label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={(e) => setFotoFile(e.target.files[0])}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700"
            />
            {errors.foto_ktp && (
              <p className="text-red-500 text-xs mt-1">{errors.foto_ktp[0]}</p>
            )}
            <p className="text-xs text-slate-400 mt-1">
              Kosongkan jika tidak ingin mengganti foto.
            </p>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold text-sm transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-white bg-amber-500 hover:bg-amber-600 rounded-lg font-semibold text-sm transition-colors shadow-sm disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

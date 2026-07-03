import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function AddModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    status: "Tetap",
    no_hp: "",
    is_married: false,
    rumah_id: "",
    tgl_masuk: "",
  });
  const [fotoFile, setFotoFile] = useState(null);
  const [rumahList, setRumahList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    const init = async () => {
      if (isMounted) {
        setFormData({
          name: "",
          status: "Tetap",
          no_hp: "",
          is_married: false,
          rumah_id: "",
          tgl_masuk: new Date().toISOString().split("T")[0],
        });
        setFotoFile(null);
        setErrors({});
      }

      try {
        const res = await api.get("/rumah");
        const all = res.data.data || res.data;
        if (isMounted) {
          setRumahList(all.filter((r) => r.status === "Tidak Dihuni"));
        }
      } catch {
        if (isMounted) {
          setRumahList([]);
        }
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

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
      payload.append("name", formData.name);
      payload.append("status", formData.status);
      payload.append("no_hp", formData.no_hp);
      payload.append("is_married", formData.is_married ? 1 : 0);
      if (fotoFile) payload.append("foto_ktp", fotoFile);

      const res = await api.post("/penghuni", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const penghuniId = res.data.data?.id || res.data.id;

      if (formData.rumah_id) {
        try {
          await api.post(`/rumah/${formData.rumah_id}/tambah-penghuni`, {
            penghuni_id: penghuniId,
            tgl_masuk: formData.tgl_masuk,
          });
        } catch {
          alert(
            "Penghuni berhasil ditambahkan, namun gagal assign ke rumah. Silakan assign manual dari halaman Rumah.",
          );
          onSuccess();
          return;
        }
      }

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-blue-600 text-white">
          <h3 className="text-lg font-bold">Tambah Penghuni Baru</h3>
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
              placeholder="Cth: Budi Santoso"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
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
              placeholder="Cth: 08123456789"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
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
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
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
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm font-bold text-slate-700">
                Sudah Menikah
              </span>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Foto KTP <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              required
              onChange={(e) => setFotoFile(e.target.files[0])}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700"
            />
            {errors.foto_ktp && (
              <p className="text-red-500 text-xs mt-1">{errors.foto_ktp[0]}</p>
            )}
            <p className="text-xs text-slate-400 mt-1">
              Format: JPG, PNG. Maks 2MB.
            </p>
          </div>

          <div className="border-t border-slate-200 my-5" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Assign ke Rumah (Opsional)
          </p>

          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Pilih Rumah
            </label>
            <select
              name="rumah_id"
              value={formData.rumah_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            >
              <option value="">-- Tidak assign sekarang --</option>
              {rumahList.map((r) => (
                <option key={r.id} value={r.id}>
                  Blok {r.no_rumah} — {r.address}
                </option>
              ))}
            </select>
            {rumahList.length === 0 && (
              <p className="text-xs text-amber-500 mt-1">
                Semua rumah sedang dihuni. Tidak ada rumah kosong yang tersedia.
              </p>
            )}
          </div>

          {formData.rumah_id && (
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Tanggal Masuk <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="tgl_masuk"
                required
                value={formData.tgl_masuk}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          )}

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
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-sm transition-colors shadow-sm disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Simpan Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

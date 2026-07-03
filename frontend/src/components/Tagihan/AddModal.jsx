import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function AddModal({ isOpen, onClose, onSubmit }) {
  const [rumahs, setRumahs] = useState([]);
  const [siklus, setSiklus] = useState("bulanan");
  const [formData, setFormData] = useState({
    rumah_id: "",
    type: "Satpam",
    amount: 100000,
    bulan_mulai: new Date().getMonth() + 1,
    tahun_mulai: new Date().getFullYear(),
    jumlah_bulan: 1,
    payment_status: "Belum Lunas",
  });

  useEffect(() => {
    if (!isOpen) return;
    const fetchRumahs = async () => {
      try {
        const res = await api.get("/rumah");
        setRumahs(res.data.data || res.data);
      } catch {
        alert("Gagal memuat data daftar rumah.");
      }
    };
    fetchRumahs();
  }, [isOpen]);

  const handleSiklusChange = (val) => {
    setSiklus(val);
    if (val === "bulanan") {
      setFormData((prev) => ({ ...prev, jumlah_bulan: 1 }));
    } else if (val === "tahunan") {
      setFormData((prev) => ({ ...prev, jumlah_bulan: 12 }));
    }
  };

  if (!isOpen) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      rumah_id: Number(formData.rumah_id),
      amount: Number(formData.amount),
      bulan_mulai: Number(formData.bulan_mulai),
      tahun_mulai: Number(formData.tahun_mulai),
      jumlah_bulan: Number(formData.jumlah_bulan),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-blue-600 text-white">
          <h3 className="text-lg font-bold">Tagih Iuran ke Penghuni</h3>
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
              Pilih Rumah Penghuni
            </label>
            <select
              required
              value={formData.rumah_id}
              onChange={(e) =>
                setFormData({ ...formData, rumah_id: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
            >
              <option value="">-- Pilih Rumah --</option>
              {rumahs.map((r) => (
                <option key={r.id} value={r.id}>
                  Blok {r.no_rumah}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Siklus Penagihan
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSiklusChange("bulanan")}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-colors ${
                  siklus === "bulanan"
                    ? "bg-blue-50 border-blue-600 text-blue-600"
                    : "border-slate-300 text-slate-600 bg-white"
                }`}
              >
                Bulanan (1 Bln)
              </button>
              <button
                type="button"
                onClick={() => handleSiklusChange("tahunan")}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-colors ${
                  siklus === "tahunan"
                    ? "bg-blue-50 border-blue-600 text-blue-600"
                    : "border-slate-300 text-slate-600 bg-white"
                }`}
              >
                Tahunan (12 Bln)
              </button>
              <button
                type="button"
                onClick={() => handleSiklusChange("custom")}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-colors ${
                  siklus === "custom"
                    ? "bg-blue-50 border-blue-600 text-blue-600"
                    : "border-slate-300 text-slate-600 bg-white"
                }`}
              >
                Custom
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Jenis Iuran
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
              >
                <option value="Satpam">Satpam</option>
                <option value="Kebersihan">Kebersihan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Nominal Per Bulan
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Mulai Bulan
              </label>
              <select
                value={formData.bulan_mulai}
                onChange={(e) =>
                  setFormData({ ...formData, bulan_mulai: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((b) => (
                  <option key={b} value={b}>
                    Bulan {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Mulai Tahun
              </label>
              <input
                type="number"
                required
                value={formData.tahun_mulai}
                onChange={(e) =>
                  setFormData({ ...formData, tahun_mulai: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Jumlah Bulan
              </label>
              <input
                type="number"
                required
                min="1"
                disabled={siklus !== "custom"}
                value={formData.jumlah_bulan}
                onChange={(e) =>
                  setFormData({ ...formData, jumlah_bulan: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 disabled:bg-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Status Bayar
              </label>
              <select
                value={formData.payment_status}
                onChange={(e) =>
                  setFormData({ ...formData, payment_status: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
              >
                <option value="Belum Lunas">Belum Lunas</option>
                <option value="Lunas">Lunas</option>
              </select>
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
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-sm"
            >
              Generate Tagihan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

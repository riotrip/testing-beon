import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function AddModal({ isOpen, onClose, onSubmit }) {
  const [rumahs, setRumahs] = useState([]);
  const [siklus, setSiklus] = useState("bulanan");
  const [formData, setFormData] = useState({
    rumah_id: "",
    type: "Satpam",
    amount: 100000,
    custom_type: "",
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

  const handleTypeChange = (selectedType) => {
    if (selectedType === "Satpam") {
      setFormData((prev) => ({
        ...prev,
        type: selectedType,
        amount: 100000,
        custom_type: "",
      }));
    } else if (selectedType === "Kebersihan") {
      setFormData((prev) => ({
        ...prev,
        type: selectedType,
        amount: 15000,
        custom_type: "",
      }));
    } else if (selectedType === "Lainnya") {
      setFormData((prev) => ({
        ...prev,
        type: selectedType,
        amount: 0,
        custom_type: "",
      }));
    }
  };

  if (!isOpen) return null;

  // Hitung total amount
  const totalAmount = Number(formData.amount) * Number(formData.jumlah_bulan);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      rumah_id: Number(formData.rumah_id),
      amount: totalAmount,
      bulan_mulai: Number(formData.bulan_mulai),
      tahun_mulai: Number(formData.tahun_mulai),
      jumlah_bulan: Number(formData.jumlah_bulan),
      payment_status: formData.payment_status,
      type:
        formData.type === "Lainnya" && formData.custom_type
          ? `Lainnya (${formData.custom_type})`
          : formData.type,
    };

    onSubmit(submitData);
  };

  const isFixedAmount =
    formData.type === "Satpam" || formData.type === "Kebersihan";

  // Format bulan ke nama
  const getNamaBulan = (bulan) => {
    const namaBulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return namaBulan[bulan - 1];
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

          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Jenis Iuran
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
            >
              <option value="Satpam">Satpam (Rp 100.000/bln)</option>
              <option value="Kebersihan">Kebersihan (Rp 15.000/bln)</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {formData.type === "Lainnya" && (
            <div className="mb-4">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Nama Iuran Lainnya
              </label>
              <input
                type="text"
                required
                placeholder="Masukkan nama iuran..."
                value={formData.custom_type}
                onChange={(e) =>
                  setFormData({ ...formData, custom_type: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Nominal Per Bulan
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                Rp
              </span>
              <input
                type="number"
                required
                min="0"
                disabled={isFixedAmount}
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className={`w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 ${
                  isFixedAmount ? "bg-slate-100 cursor-not-allowed" : "bg-white"
                }`}
              />
            </div>
            {isFixedAmount && (
              <p className="text-xs text-slate-500 mt-1">
                Nominal iuran {formData.type.toLowerCase()} sudah ditentukan
                secara otomatis
              </p>
            )}
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
                    {getNamaBulan(b)}
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

          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-slate-700">
                Ringkasan Tagihan
              </span>
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                {formData.jumlah_bulan} Bulan
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Jenis Iuran:</span>
                <span className="font-semibold text-slate-800">
                  {formData.type === "Lainnya" && formData.custom_type
                    ? `Lainnya (${formData.custom_type})`
                    : formData.type}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">Nominal/Bulan:</span>
                <span className="font-semibold text-slate-800">
                  Rp {Number(formData.amount).toLocaleString("id-ID")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">Periode:</span>
                <span className="font-semibold text-slate-800">
                  {getNamaBulan(formData.bulan_mulai)} {formData.tahun_mulai}
                </span>
              </div>

              <div className="border-t border-blue-200 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-700">
                    Total Tagihan:
                  </span>
                  <span className="text-lg font-bold text-blue-700">
                    Rp {totalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-500 text-right">
                {formData.jumlah_bulan} bulan × Rp{" "}
                {Number(formData.amount).toLocaleString("id-ID")}
              </div>
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

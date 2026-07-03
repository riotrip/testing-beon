import { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";

import AddModal from "../../components/Tagihan/AddModal";
import BayarModal from "../../components/Tagihan/BayarModal";
import ConfirmModal from "../../components/common/ConfirmModal";
import Toast from "../../components/common/Toast";

export default function Tagihan() {
  const [tagihan, setTagihan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showBayarModal, setShowBayarModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(null);

  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const triggerSuccess = (message) => {
    setSuccessMsg(message);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      setSuccessMsg("");
    }, 2500);
  };

  const fetchTagihan = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/tagihan");
      setTagihan(res.data.data || res.data);
      setError(null);
    } catch {
      setError("Gagal memuat data tagihan dari server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => fetchTagihan());
  }, []);

  const handleAddSubmit = async (data) => {
    try {
      await api.post("/tagihan", data);
      setShowAddModal(false);
      triggerSuccess("Penagihan iuran berhasil di-generate!");
      fetchTagihan();
    } catch {
      alert("Gagal membuat tagihan.");
    }
  };

  const handleBayarSubmit = async (id, data) => {
    try {
      await api.put(`/tagihan/${id}`, data);
      setShowBayarModal(false);
      triggerSuccess("Status pembayaran berhasil diupdate!");
      fetchTagihan();
    } catch {
      alert("Gagal memperbarui status pembayaran.");
    } finally {
      setSelectedTarget(null);
    }
  };

  const executeDelete = async () => {
    try {
      await api.delete(`/tagihan/${selectedTarget.id}`);
      setTagihan(tagihan.filter((t) => t.id !== selectedTarget.id));
      setShowDeleteModal(false);
      triggerSuccess("Tagihan berhasil dihapus!");
    } catch {
      alert("Gagal menghapus tagihan.");
    } finally {
      setSelectedTarget(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Penagihan & Pembayaran Iuran
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Generate tagihan bulanan atau tahunan serta kelola pelunasan
            penghuni
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm"
        >
          + Tagih Penghuni
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {loading && (
          <div className="p-8 text-center text-slate-500 font-semibold">
            Memuat tagihan...
          </div>
        )}
        {error && (
          <div className="p-8 text-center text-red-500 font-semibold">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                    Rumah
                  </th>
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                    Jenis Iuran
                  </th>
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                    Periode
                  </th>
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                    Nominal
                  </th>
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                    Status Bayar
                  </th>
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {tagihan.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-800">
                      Blok {item.rumah?.no_rumah}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{item.type}</td>
                    <td className="px-6 py-4 text-slate-600">
                      Bulan {item.bulan_tagihan} / {item.tahun_tagihan}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      Rp {Number(item.amount).toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                          item.payment_status === "Lunas"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTarget(item);
                          setShowBayarModal(true);
                        }}
                        className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-sm font-medium transition-colors"
                      >
                        Bayar / Status
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTarget(item);
                          setShowDeleteModal(true);
                        }}
                        className="px-3 py-1.5 bg-red-500 text-white hover:bg-red-600 rounded-md text-sm font-semibold transition-colors shadow-sm"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}

                {tagihan.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-slate-500 italic"
                    >
                      Belum ada penagihan iuran yang dicatat.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSubmit}
      />
      <BayarModal
        isOpen={showBayarModal}
        onClose={() => {
          setShowBayarModal(false);
          setSelectedTarget(null);
        }}
        onSubmit={handleBayarSubmit}
        targetTagihan={selectedTarget}
      />
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedTarget(null);
        }}
        onConfirm={executeDelete}
        title="Hapus Tagihan Ini?"
        message="Data tagihan beserta riwayat pembayarannya akan dihapus secara permanen."
      />
      <Toast isOpen={showSuccessToast} message={successMsg} />
    </div>
  );
}

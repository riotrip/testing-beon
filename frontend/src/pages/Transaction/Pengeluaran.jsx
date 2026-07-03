import { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";

import AddModal from "../../components/Pengeluaran/AddModal";
import EditModal from "../../components/Pengeluaran/EditModal";
import ConfirmModal from "../../components/common/ConfirmModal";
import Toast from "../../components/common/Toast";

export default function Pengeluaran() {
  const [pengeluaran, setPengeluaran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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

  const fetchPengeluaran = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/pengeluaran");
      setPengeluaran(res.data.data || res.data);
      setError(null);
    } catch {
      setError("Gagal memuat data pengeluaran dari server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => fetchPengeluaran());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddSubmit = async (data) => {
    try {
      await api.post("/pengeluaran", data);
      setShowAddModal(false);
      triggerSuccess("Data pengeluaran berhasil dicatat!");
      fetchPengeluaran();
    } catch {
      alert("Gagal mencatat data pengeluaran baru.");
    }
  };

  const handleEditSubmit = async (id, data) => {
    try {
      await api.put(`/pengeluaran/${id}`, data);
      setShowEditModal(false);
      triggerSuccess("Data pengeluaran berhasil diperbarui!");
      fetchPengeluaran();
    } catch {
      alert("Gagal memperbarui data pengeluaran.");
    } finally {
      setSelectedTarget(null);
    }
  };

  const executeDelete = async () => {
    try {
      await api.delete(`/pengeluaran/${selectedTarget.id}`);
      setPengeluaran(pengeluaran.filter((p) => p.id !== selectedTarget.id));
      setShowDeleteModal(false);
      triggerSuccess("Data pengeluaran berhasil dihapus!");
    } catch {
      alert("Gagal menghapus data pengeluaran.");
    } finally {
      setSelectedTarget(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Transaksi Pengeluaran RT
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola pencatatan biaya operasional lingkungan
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm"
        >
          + Catat Pengeluaran
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {loading && (
          <div className="p-8 text-center text-slate-500 font-semibold">
            Memuat data...
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
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider w-36">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider w-48">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                    Deskripsi
                  </th>
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider w-44">
                    Nominal
                  </th>
                  <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-center w-48">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {pengeluaran.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {new Date(item.date).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-md bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-red-600">
                      Rp {Number(item.amount).toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTarget(item);
                          setShowEditModal(true);
                        }}
                        className="px-3 py-1.5 bg-amber-500 text-white hover:bg-amber-600 rounded-md text-sm font-semibold transition-colors shadow-sm"
                      >
                        Edit
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

                {pengeluaran.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-slate-500 italic"
                    >
                      Belum ada catatan pengeluaran kas.
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
      <EditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedTarget(null);
        }}
        onSubmit={handleEditSubmit}
        targetData={selectedTarget}
      />
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedTarget(null);
        }}
        onConfirm={executeDelete}
        title="Hapus Pengeluaran Ini?"
        message="Catatan pengeluaran yang dihapus tidak dapat dikembalikan."
      />
      <Toast isOpen={showSuccessToast} message={successMsg} />
    </div>
  );
}

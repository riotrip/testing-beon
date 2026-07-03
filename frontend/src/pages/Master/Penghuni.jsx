import { useState, useEffect, useCallback } from "react";
import api from "../../api/axios";

import AddModal from "../../components/Penghuni/AddModal";
import EditModal from "../../components/Penghuni/EditModal";
import DetailModal from "../../components/Penghuni/DetailModal";
import ConfirmModal from "../../components/common/ConfirmModal";
import Toast from "../../components/common/Toast";

export default function Penghuni() {
  const [penghuni, setPenghuni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedPenghuni, setSelectedPenghuni] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

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

  const fetchPenghuni = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/penghuni");
      setPenghuni(res.data.data || res.data);
      setError(null);
    } catch {
      setError("Gagal memuat data penghuni.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get("/penghuni");
        if (isMounted) {
          setPenghuni(res.data.data || res.data);
          setError(null);
        }
      } catch {
        if (isMounted) setError("Gagal memuat data penghuni.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddSuccess = () => {
    setShowAddModal(false);
    fetchPenghuni();
    triggerSuccess("Penghuni berhasil ditambahkan!");
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    fetchPenghuni();
    triggerSuccess("Data penghuni diperbarui!");
  };

  const handleViewDetail = (item) => {
    setSelectedPenghuni(item);
    setShowDetailModal(true);
  };

  const handleEdit = (item) => {
    setSelectedPenghuni(item);
    setShowEditModal(true);
  };

  const executeDelete = async () => {
    try {
      await api.delete(`/penghuni/${deleteTarget.id}`);
      setShowDeleteModal(false);
      fetchPenghuni();
      triggerSuccess("Penghuni dinonaktifkan.");
    } catch {
      alert("Gagal menonaktifkan penghuni.");
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Penghuni</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          + Tambah
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {loading && (
          <div className="p-8 text-center text-slate-500 font-semibold">
            Memuat...
          </div>
        )}
        {error && (
          <div className="p-8 text-center text-red-500 font-semibold">
            {error}
          </div>
        )}
        {!loading && !error && (
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                  No. HP
                </th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">
                  Menikah
                </th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {penghuni.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-slate-400 italic"
                  >
                    Belum ada data penghuni.
                  </td>
                </tr>
              ) : (
                penghuni.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{item.no_hp}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                          item.status === "Tetap"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                          item.is_married
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.is_married ? "Menikah" : "Belum Menikah"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleViewDetail(item)}
                          className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-md font-medium transition-colors text-sm"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-medium transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteTarget(item);
                            setShowDeleteModal(true);
                          }}
                          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-colors text-sm"
                        >
                          Nonaktifkan
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <AddModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
      />
      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleEditSuccess}
        penghuni={selectedPenghuni}
      />
      <DetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        selectedPenghuni={selectedPenghuni}
        loadingDetail={false}
      />
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteTarget(null);
        }}
        onConfirm={executeDelete}
        title="Nonaktifkan Penghuni?"
        message={`Data ${deleteTarget?.name} akan dinonaktifkan. Riwayat hunian tetap tersimpan.`}
      />
      <Toast isOpen={showSuccessToast} message={successMsg} />
    </div>
  );
}
